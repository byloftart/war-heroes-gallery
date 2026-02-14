#!/usr/bin/env python3
"""Regenerate content/names.csv from files in content/photos."""

from __future__ import annotations

import csv
import re
from pathlib import Path

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def clean_display_name(stem: str) -> str:
    value = stem.replace("_", " ").replace("-", " ")
    value = re.sub(r"\s+", " ", value).strip(" ._")
    # Common cleanup for accidental duplicated extension text in names.
    value = re.sub(r"\.(jpe?g|png|webp)$", "", value, flags=re.IGNORECASE)
    return value


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    photos_dir = root / "content" / "photos"
    csv_path = root / "content" / "names.csv"

    if not photos_dir.exists() or not photos_dir.is_dir():
        raise SystemExit(f"Photos folder not found: {photos_dir}")

    rows: list[tuple[str, str]] = []
    for path in sorted(photos_dir.iterdir(), key=lambda p: p.name.lower()):
        if not path.is_file() or path.name.startswith('.'):
            continue
        if path.suffix.lower() not in ALLOWED_EXTENSIONS:
            continue

        display_name = clean_display_name(path.stem)
        rows.append((path.name, display_name))

    if not rows:
        raise SystemExit("No supported images found in content/photos")

    csv_path.parent.mkdir(parents=True, exist_ok=True)
    with csv_path.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.writer(fh)
        writer.writerow(["filename", "name"])
        writer.writerows(rows)

    print(f"Updated {csv_path} with {len(rows)} records")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
