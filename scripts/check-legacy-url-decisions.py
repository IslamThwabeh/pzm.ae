#!/usr/bin/env python3
"""Validate and optionally probe the legacy URL decision register."""

from __future__ import annotations

import argparse
import csv
import re
import sys
import urllib.error
import urllib.request
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin, urlparse


ALLOWED_DECISIONS = {"redirect", "keep_404", "review"}
REQUIRED_COLUMNS = {
    "source_url",
    "category",
    "decision",
    "target_url",
    "rationale",
    "status",
}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, file_pointer, code, message, headers, new_url):
        return None


def load_rows(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        columns = set(reader.fieldnames or [])
        missing = REQUIRED_COLUMNS - columns
        if missing:
            raise ValueError(f"missing required columns: {', '.join(sorted(missing))}")
        return list(reader)


def github_fallback_path(source_url: str) -> Path:
    path = urlparse(source_url).path.lstrip("/")
    if path.endswith("/"):
        return Path(path) / "index.html"
    if Path(path).suffix:
        return Path(path)
    return Path(path) / "index.html"


def validate_rows(rows: list[dict[str, str]]) -> list[str]:
    errors: list[str] = []
    sources = [row["source_url"].strip() for row in rows]

    if len(rows) != 64:
        errors.append(f"expected 64 rows, found {len(rows)}")

    duplicates = sorted(url for url, count in Counter(sources).items() if count > 1)
    if duplicates:
        errors.append("duplicate source URLs: " + ", ".join(duplicates))

    for line_number, row in enumerate(rows, start=2):
        source = row["source_url"].strip()
        decision = row["decision"].strip()
        target = row["target_url"].strip()

        if urlparse(source).scheme != "https" or not urlparse(source).netloc:
            errors.append(f"line {line_number}: invalid HTTPS source URL: {source}")
        if decision not in ALLOWED_DECISIONS:
            errors.append(f"line {line_number}: invalid decision: {decision}")
        if decision == "redirect":
            parsed_target = urlparse(target)
            if parsed_target.scheme != "https" or not parsed_target.netloc:
                errors.append(f"line {line_number}: redirect requires an HTTPS target")
            if source == target:
                errors.append(f"line {line_number}: redirect source and target are identical")
        elif target:
            errors.append(f"line {line_number}: {decision} row must not have a target URL")
        if not row["rationale"].strip():
            errors.append(f"line {line_number}: rationale is required")

    sitemap_path = Path("sitemap.xml")
    if sitemap_path.is_file():
        sitemap = sitemap_path.read_text(encoding="utf-8")
        sitemap_urls = set(re.findall(r"<loc>(.*?)</loc>", sitemap))
        for row in rows:
            if row["decision"] == "redirect" and row["target_url"] not in sitemap_urls:
                errors.append(
                    f"redirect target is not present in sitemap.xml: {row['target_url']}"
                )
            if row["source_url"] in sitemap_urls:
                errors.append(f"legacy source must not be present in sitemap.xml: {row['source_url']}")

    for row in rows:
        if row["decision"] != "redirect" or urlparse(row["source_url"]).netloc != "pzm.ae":
            continue
        fallback_path = github_fallback_path(row["source_url"])
        if not fallback_path.is_file():
            errors.append(
                f"missing GitHub Pages fallback for {row['source_url']}: {fallback_path}"
            )
            continue
        body = fallback_path.read_text(encoding="utf-8")
        noindex, meta_refresh, canonical, refresh_target = html_signals(body)
        if not noindex:
            errors.append(f"fallback must be noindex: {fallback_path}")
        if not meta_refresh:
            errors.append(f"fallback must contain a meta refresh: {fallback_path}")
        if canonical.rstrip("/") != row["target_url"].rstrip("/"):
            errors.append(
                f"fallback canonical mismatch: {fallback_path} -> {canonical or '(missing)'}"
            )
        resolved_refresh = urljoin(row["source_url"], refresh_target)
        if resolved_refresh.rstrip("/") != row["target_url"].rstrip("/"):
            errors.append(
                f"fallback refresh mismatch: {fallback_path} -> {resolved_refresh or '(missing)'}"
            )

    return errors


def request_once(url: str) -> tuple[int | str, str]:
    opener = urllib.request.build_opener(NoRedirect)
    request = urllib.request.Request(url, headers={"User-Agent": "PZM-SEO-QA/1.0"})
    try:
        response = opener.open(request, timeout=20)
        return response.status, response.headers.get("Location", "")
    except urllib.error.HTTPError as error:
        return error.code, error.headers.get("Location", "")
    except Exception as error:  # Network diagnostics should remain visible to the operator.
        return "ERR", f"{type(error).__name__}: {error}"


def request_final(url: str, read_html: bool = False) -> tuple[int | str, str, str]:
    request = urllib.request.Request(url, headers={"User-Agent": "PZM-SEO-QA/1.0"})
    try:
        response = urllib.request.urlopen(request, timeout=20)
        body = response.read(2_000_000).decode("utf-8", errors="ignore") if read_html else ""
        return response.status, response.geturl(), body
    except urllib.error.HTTPError as error:
        return error.code, error.geturl(), ""
    except Exception as error:
        return "ERR", f"{type(error).__name__}: {error}", ""


def html_signals(body: str) -> tuple[bool, bool, str, str]:
    meta_tags = re.findall(r"<meta\b[^>]*>", body, flags=re.IGNORECASE)
    link_tags = re.findall(r"<link\b[^>]*>", body, flags=re.IGNORECASE)
    noindex = any(
        re.search(r"name\s*=\s*['\"]robots['\"]", tag, flags=re.IGNORECASE)
        and re.search(r"content\s*=\s*['\"][^'\"]*noindex", tag, flags=re.IGNORECASE)
        for tag in meta_tags
    )
    meta_refresh = False
    refresh_target = ""
    for tag in meta_tags:
        if re.search(r"http-equiv\s*=\s*['\"]refresh['\"]", tag, flags=re.IGNORECASE):
            meta_refresh = True
            content_match = re.search(
                r"content\s*=\s*['\"]([^'\"]+)", tag, flags=re.IGNORECASE
            )
            if content_match:
                target_match = re.search(
                    r"url\s*=\s*(.+)$", content_match.group(1), flags=re.IGNORECASE
                )
                if target_match:
                    refresh_target = target_match.group(1).strip()
            break
    canonical = ""
    for tag in link_tags:
        if re.search(r"rel\s*=\s*['\"][^'\"]*canonical", tag, flags=re.IGNORECASE):
            match = re.search(r"href\s*=\s*['\"]([^'\"]+)", tag, flags=re.IGNORECASE)
            if match:
                canonical = match.group(1)
                break
    return noindex, meta_refresh, canonical, refresh_target


def probe_row(row: dict[str, str]) -> dict[str, str | int]:
    source_status, location = request_once(row["source_url"])
    source_final_status, source_final_url, _ = request_final(row["source_url"])
    result: dict[str, str | int] = {
        "source_url": row["source_url"],
        "decision": row["decision"],
        "source_status": source_status,
        "location": location,
        "source_final_status": source_final_status,
        "source_final_url": source_final_url,
        "target_status": "",
        "target_final_url": "",
        "target_noindex": False,
        "target_meta_refresh": False,
        "target_canonical": "",
    }
    if row["decision"] == "redirect":
        target_status, target_final_url, target_body = request_final(
            row["target_url"], read_html=True
        )
        target_noindex, target_meta_refresh, target_canonical, _ = html_signals(target_body)
        result["target_status"] = target_status
        result["target_final_url"] = target_final_url
        result["target_noindex"] = target_noindex
        result["target_meta_refresh"] = target_meta_refresh
        result["target_canonical"] = target_canonical
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--csv",
        type=Path,
        default=Path("ops/seo-404-remediation/legacy-url-decisions.csv"),
    )
    parser.add_argument("--production", action="store_true")
    parser.add_argument(
        "--enforce-decisions",
        action="store_true",
        help="Fail unless production matches every approved redirect/retirement decision.",
    )
    parser.add_argument("--workers", type=int, default=12)
    arguments = parser.parse_args()

    try:
        rows = load_rows(arguments.csv)
    except (OSError, ValueError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1

    errors = validate_rows(rows)
    decisions = Counter(row["decision"] for row in rows)
    categories = Counter(row["category"] for row in rows)

    print(f"Rows: {len(rows)}")
    print("Decisions: " + ", ".join(f"{key}={value}" for key, value in sorted(decisions.items())))
    print("Categories: " + ", ".join(f"{key}={value}" for key, value in sorted(categories.items())))

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    if not arguments.production:
        print("Manifest validation: PASS")
        return 0

    with ThreadPoolExecutor(max_workers=arguments.workers) as executor:
        results = list(executor.map(probe_row, rows))

    source_counts = Counter(str(result["source_status"]) for result in results)
    final_source_counts = Counter(str(result["source_final_status"]) for result in results)
    print("Production source statuses: " + ", ".join(
        f"{key}={value}" for key, value in sorted(source_counts.items())
    ))
    print("Production final source statuses: " + ", ".join(
        f"{key}={value}" for key, value in sorted(final_source_counts.items())
    ))

    failed_targets = [
        result
        for result in results
        if result["decision"] == "redirect" and result["target_status"] != 200
    ]
    if failed_targets:
        for result in failed_targets:
            print(
                "ERROR: redirect target did not resolve to 200: "
                f"{result['source_url']} -> {result['target_status']} "
                f"{result['target_final_url']}",
                file=sys.stderr,
            )
        return 1

    redirected_targets = [
        result
        for result in results
        if result["decision"] == "redirect"
        and str(result["target_final_url"]).rstrip("/")
        != next(
            row["target_url"].rstrip("/")
            for row in rows
            if row["source_url"] == result["source_url"]
        )
    ]
    if redirected_targets:
        for result in redirected_targets:
            print(
                "ERROR: proposed target is not the final canonical URL: "
                f"{result['source_url']} -> {result['target_final_url']}",
                file=sys.stderr,
            )
        return 1

    nonindexable_targets = [
        result
        for result in results
        if result["decision"] == "redirect"
        and (result["target_noindex"] or result["target_meta_refresh"])
    ]
    if nonindexable_targets:
        for result in nonindexable_targets:
            print(
                "ERROR: proposed target is noindex or a meta-refresh shell: "
                f"{result['source_url']} -> {result['target_final_url']}",
                file=sys.stderr,
            )
        return 1

    mismatched_canonicals = [
        result
        for result in results
        if result["decision"] == "redirect"
        and result["target_canonical"]
        and str(result["target_canonical"]).rstrip("/")
        != str(result["target_final_url"]).rstrip("/")
    ]
    if mismatched_canonicals:
        for result in mismatched_canonicals:
            print(
                "ERROR: proposed target canonical does not match the final URL: "
                f"{result['source_url']} -> {result['target_canonical']}",
                file=sys.stderr,
            )
        return 1

    print("Proposed redirect targets: PASS (200, indexable, canonical, no meta refresh)")

    if arguments.enforce_decisions:
        rows_by_source = {row["source_url"]: row for row in rows}
        outcome_errors: list[str] = []
        for result in results:
            row = rows_by_source[str(result["source_url"])]
            if row["decision"] == "redirect":
                actual_location = urljoin(row["source_url"], str(result["location"]))
                if result["source_status"] not in {301, 308}:
                    outcome_errors.append(
                        f"{row['source_url']} should return 301/308, got {result['source_status']}"
                    )
                elif actual_location.rstrip("/") != row["target_url"].rstrip("/"):
                    outcome_errors.append(
                        f"{row['source_url']} redirects to {actual_location}, expected {row['target_url']}"
                    )
                if result["source_final_status"] != 200:
                    outcome_errors.append(
                        f"{row['source_url']} ends at {result['source_final_status']}, expected 200"
                    )
            elif row["decision"] == "keep_404" and result["source_final_status"] not in {404, 410}:
                outcome_errors.append(
                    f"{row['source_url']} should end at 404/410, got {result['source_final_status']}"
                )

        if outcome_errors:
            for error in outcome_errors:
                print(f"ERROR: {error}", file=sys.stderr)
            return 1
        print("Production decision enforcement: PASS")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
