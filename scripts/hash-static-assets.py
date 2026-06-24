from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
from datetime import datetime
from pathlib import Path


ASSET_DIRS = ("css", "js", "images")
TEXT_EXTS = {".html", ".css", ".js"}
ASSET_EXTS = {
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
}
BANNED_ASSET_NAME_PARTS = ("repair", "fix", "technical-support", "service-center")


def sha8(path: Path) -> str:
    digest = hashlib.sha256()
    digest.update(path.read_bytes())
    return digest.hexdigest()[:8]


def is_external(ref: str) -> bool:
    return ref.startswith(
        ("http://", "https://", "//", "data:", "mailto:", "tel:", "#")
    )


def strip_suffixes(ref: str) -> str:
    return ref.split("?", 1)[0].split("#", 1)[0]


def resolve_local_ref(root: Path, file_path: Path, ref: str) -> str | None:
    clean = strip_suffixes(ref)
    if is_external(clean):
        return None

    candidate = root / clean.lstrip("/") if clean.startswith("/") else file_path.parent / clean

    try:
        return candidate.resolve().relative_to(root.resolve()).as_posix()
    except ValueError:
        return None


def with_suffix_preserved(new_ref: str, old_ref: str) -> str:
    suffix = ""
    if "?" in old_ref:
        suffix = "?" + old_ref.split("?", 1)[1]
        if "#" in suffix:
            query, fragment = suffix.split("#", 1)
            suffix = f"{query}#{fragment}"
    elif "#" in old_ref:
        suffix = "#" + old_ref.split("#", 1)[1]
    return new_ref + suffix


def build_manifest(root: Path, version: str) -> dict[str, str]:
    manifest: dict[str, str] = {}
    output_root = root / "assets" / version

    for asset_dir in ASSET_DIRS:
        source_root = root / asset_dir
        if not source_root.exists():
            continue

        for source in source_root.rglob("*"):
            if not source.is_file() or source.suffix.lower() not in ASSET_EXTS:
                continue
            source_key = source.relative_to(root).as_posix().lower()
            if any(part in source_key for part in BANNED_ASSET_NAME_PARTS):
                print(f"SKIPPED legacy banned-name asset {source.relative_to(root).as_posix()}")
                continue

            digest = sha8(source)
            relative = source.relative_to(root)
            hashed_name = f"{source.stem}-{digest}{source.suffix.lower()}"
            destination = output_root / relative.parent / hashed_name
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, destination)
            manifest[relative.as_posix()] = "/" + destination.relative_to(root).as_posix()

    return manifest


def replace_quoted_refs(root: Path, file_path: Path, text: str, manifest: dict[str, str]) -> str:
    quoted_asset = re.compile(
        r"([\"'])([^\"']+\.(?:css|js|png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|otf)(?:\?[^\"']*)?(?:#[^\"']*)?)\1",
        re.IGNORECASE,
    )

    def repl(match: re.Match[str]) -> str:
        quote = match.group(1)
        ref = match.group(2)
        relative = resolve_local_ref(root, file_path, ref)
        if relative and relative in manifest:
            return f"{quote}{with_suffix_preserved(manifest[relative], ref)}{quote}"
        return match.group(0)

    return quoted_asset.sub(repl, text)


def replace_css_url_refs(root: Path, file_path: Path, text: str, manifest: dict[str, str]) -> str:
    css_url = re.compile(r"url\(\s*([\"']?)([^\"')]+)\1\s*\)", re.IGNORECASE)

    def repl(match: re.Match[str]) -> str:
        quote = match.group(1)
        ref = match.group(2).strip()
        relative = resolve_local_ref(root, file_path, ref)
        if relative and relative in manifest:
            updated = with_suffix_preserved(manifest[relative], ref)
            return f"url({quote}{updated}{quote})"
        return match.group(0)

    return css_url.sub(repl, text)


def add_lcp_attrs(text: str) -> str:
    def repl(match: re.Match[str]) -> str:
        tag = match.group(0)
        if "fetchpriority=" not in tag:
            tag = tag[:-1] + ' fetchpriority="high">'
        if "decoding=" not in tag:
            tag = tag[:-1] + ' decoding="async">'
        if "loading=" not in tag:
            tag = tag[:-1] + ' loading="eager">'
        return tag

    return re.sub(
        r"<img\b(?=[^>]*class=[\"'][^\"']*blog-post-image[^\"']*[\"'])(?=[^>]*src=)[^>]*>",
        repl,
        text,
        flags=re.IGNORECASE,
    )


def text_files(root: Path) -> list[Path]:
    files: list[Path] = []
    for path in root.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_EXTS:
            continue
        parts = set(path.relative_to(root).parts)
        if ".git" in parts or "assets" in parts or "ops" in parts:
            continue
        files.append(path)
    return files


def update_text_files(root: Path, manifest: dict[str, str], write: bool) -> None:
    for path in text_files(root):
        original = path.read_text(encoding="utf-8", errors="ignore")
        updated = replace_quoted_refs(root, path, original, manifest)
        updated = replace_css_url_refs(root, path, updated, manifest)
        if "blog-post-image" in updated:
            updated = add_lcp_attrs(updated)

        if updated != original:
            print(f"UPDATED {path.relative_to(root).as_posix()}")
            if write:
                path.write_text(updated, encoding="utf-8", newline="\n")


def source_code_assets(root: Path) -> dict[str, Path]:
    assets: dict[str, Path] = {}
    for directory in ("css", "js"):
        base = root / directory
        if not base.exists():
            continue
        for path in base.glob("*"):
            if path.is_file() and path.suffix.lower() in {".css", ".js"}:
                assets[path.relative_to(root).as_posix()] = path
    return assets


def refresh_code_asset_hashes(root: Path, version: str, manifest: dict[str, str]) -> None:
    asset_root = root / "assets" / version
    image_manifest = {
        key: value
        for key, value in manifest.items()
        if not (key.startswith("css/") or key.startswith("js/"))
    }
    source_assets = source_code_assets(root)
    path_to_rel = {path: rel for rel, path in source_assets.items()}
    text_map = {
        path: path.read_text(encoding="utf-8", errors="ignore")
        for path in text_files(root)
    }

    def code_manifest() -> dict[str, str]:
        output: dict[str, str] = {}
        for rel, path in source_assets.items():
            content = text_map.get(path, path.read_text(encoding="utf-8", errors="ignore"))
            digest = hashlib.sha256(content.encode("utf-8")).hexdigest()[:8]
            destination = asset_root / Path(rel).parent / f"{path.stem}-{digest}{path.suffix.lower()}"
            output[rel] = "/" + destination.relative_to(root).as_posix()
        return output

    def replace_code_refs(text: str, code_refs: dict[str, str], own_rel: str | None) -> str:
        for rel, new_ref in sorted(code_refs.items(), key=lambda item: len(item[0]), reverse=True):
            if rel == own_rel:
                continue
            text = text.replace('"/' + rel + '"', '"' + new_ref + '"')
            text = text.replace("'/" + rel + "'", "'" + new_ref + "'")
            text = text.replace('"' + rel + '"', '"' + new_ref + '"')
            text = text.replace("'" + rel + "'", "'" + new_ref + "'")

        for rel, new_ref in code_refs.items():
            if rel == own_rel:
                continue
            path = Path(rel)
            pattern = re.compile(
                r"/assets/"
                + re.escape(version)
                + r"/"
                + re.escape(path.parent.as_posix())
                + r"/"
                + re.escape(path.stem)
                + r"-[0-9a-f]{8}"
                + re.escape(path.suffix.lower()),
                re.IGNORECASE,
            )
            text = pattern.sub(new_ref, text)
        return text

    last_snapshot = None
    for _ in range(12):
        current_refs = code_manifest()
        changed = False
        for path, text in list(text_map.items()):
            updated = replace_code_refs(text, current_refs, path_to_rel.get(path))
            if updated != text:
                text_map[path] = updated
                changed = True
        snapshot = json.dumps(current_refs, sort_keys=True)
        if snapshot == last_snapshot and not changed:
            break
        last_snapshot = snapshot
    else:
        raise RuntimeError("Code asset hash references did not stabilize")

    final_code_refs = code_manifest()
    source_paths = set(source_assets.values())
    for path, text in text_map.items():
        if path in source_paths:
            continue
        path.write_text(text, encoding="utf-8", newline="\n")

    for rel, new_ref in final_code_refs.items():
        source = root / rel
        destination = root / new_ref.lstrip("/")
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(text_map[source], encoding="utf-8", newline="\n")

    final_manifest = {**final_code_refs, **image_manifest}
    manifest_path = asset_root / "asset-manifest.json"
    manifest_path.write_text(json.dumps(final_manifest, indent=2), encoding="utf-8", newline="\n")
    print(f"Refreshed {len(final_code_refs)} CSS/JS hashes after internal reference updates")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".")
    parser.add_argument("--version", default=datetime.now().strftime("v%Y%m%d%H%M"))
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    manifest = build_manifest(root, args.version)
    manifest_path = root / "assets" / args.version / "asset-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8", newline="\n")

    print(f"Generated {len(manifest)} hashed assets in assets/{args.version}/")
    print(f"Manifest: {manifest_path.relative_to(root).as_posix()}")
    update_text_files(root, manifest, args.write)
    if args.write:
        refresh_code_asset_hashes(root, args.version, manifest)

    if not args.write:
        print("DRY RUN ONLY. Re-run with --write after reviewing the output.")


if __name__ == "__main__":
    main()
