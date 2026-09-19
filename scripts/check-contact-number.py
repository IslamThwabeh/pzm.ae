"""Reject unapproved UAE mobile numbers on publishable site surfaces."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
APPROVED = "971528026677"
INCLUDED_SUFFIXES = {".html", ".js", ".json", ".xml", ".txt"}
EXCLUDED_PARTS = {".git", ".venv", "ops"}

phone_pattern = re.compile(
    r"(?<!\d)(?:\+?971[\s-]*5\d(?:[\s-]*\d){7}|05\d(?:[\s-]*\d){7})(?!\d)"
)
violations = []
matches = 0

for path in ROOT.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in INCLUDED_SUFFIXES:
        continue
    if any(part in EXCLUDED_PARTS for part in path.relative_to(ROOT).parts):
        continue

    source = path.read_text(encoding="utf-8", errors="ignore")
    for match in phone_pattern.finditer(source):
        digits = re.sub(r"\D", "", match.group(0))
        if digits.startswith("0"):
            digits = "971" + digits[1:]
        matches += 1
        if digits != APPROVED:
            line = source.count("\n", 0, match.start()) + 1
            violations.append(f"{path.relative_to(ROOT)}:{line}: {match.group(0)}")

if violations:
    print("Unapproved customer contact numbers found:")
    print("\n".join(violations))
    raise SystemExit(1)

if not matches:
    print("No customer contact numbers found; expected the approved number.")
    raise SystemExit(1)

print(f"Contact number check passed: {matches} references use +971 52 802 6677.")
