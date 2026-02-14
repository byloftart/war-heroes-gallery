#!/usr/bin/env python3
"""Build and validate gallery data from content/names.csv."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import subprocess
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import quote

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


@dataclass
class Entry:
    filename: str
    name: str


class DataError(Exception):
    pass


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build gallery JSON from CSV")
    parser.add_argument("--csv", default="content/names.csv", help="CSV path with filename,name")
    parser.add_argument("--photos-dir", default="content/photos", help="Source photos directory")
    parser.add_argument("--public-photos-dir", default="client/public/photos", help="Destination public photos directory")
    parser.add_argument("--output", default="client/src/data/heroes.json", help="Output JSON file")
    parser.add_argument("--max-dim", type=int, default=1400, help="Max image dimension in pixels")
    parser.add_argument("--jpeg-quality", type=int, default=78, help="JPEG quality (1-100)")
    parser.add_argument("--check", action="store_true", help="Validate only, do not write files")
    return parser.parse_args()


def load_entries(csv_path: Path) -> list[Entry]:
    if not csv_path.exists():
        raise DataError(f"CSV file not found: {csv_path}")

    entries: list[Entry] = []
    seen_filenames: set[str] = set()

    with csv_path.open("r", encoding="utf-8", newline="") as fh:
        reader = csv.DictReader(fh)
        required_columns = {"filename", "name"}
        if not reader.fieldnames or not required_columns.issubset(set(reader.fieldnames)):
            raise DataError("CSV must contain columns: filename,name")

        for row_index, row in enumerate(reader, start=2):
            filename = (row.get("filename") or "").strip()
            name = (row.get("name") or "").strip()

            if not filename:
                raise DataError(f"Row {row_index}: filename is empty")
            if not name:
                raise DataError(f"Row {row_index}: name is empty")
            if "/" in filename or "\\" in filename:
                raise DataError(f"Row {row_index}: filename must not contain path separators: {filename}")
            if Path(filename).suffix.lower() not in ALLOWED_EXTENSIONS:
                raise DataError(f"Row {row_index}: unsupported extension in '{filename}'. Allowed: {sorted(ALLOWED_EXTENSIONS)}")
            if filename in seen_filenames:
                raise DataError(f"Row {row_index}: duplicate filename '{filename}'")

            seen_filenames.add(filename)
            entries.append(Entry(filename=filename, name=name))

    if not entries:
        raise DataError("CSV contains no rows")

    return entries


def validate_files(entries: list[Entry], photos_dir: Path) -> None:
    if not photos_dir.exists() or not photos_dir.is_dir():
        raise DataError(f"Photos directory not found: {photos_dir}")

    missing = [entry.filename for entry in entries if not (photos_dir / entry.filename).exists()]
    if missing:
        details = "\n".join(f"- {item}" for item in missing[:10])
        suffix = "\n..." if len(missing) > 10 else ""
        raise DataError(f"Missing files in photos directory ({len(missing)}):\n{details}{suffix}")


def normalized_jpeg_name(filename: str) -> str:
    stem = Path(filename).stem
    safe_stem = "".join(ch for ch in stem if ch.isalnum() or ch in (" ", "-", "_", "(", ")")).strip(" ._")
    safe_stem = " ".join(safe_stem.split())
    return f"{safe_stem or 'photo'}.jpg"


def make_record(entry: Entry) -> dict[str, str]:
    digest = hashlib.sha1(entry.filename.encode("utf-8")).hexdigest()[:12]
    encoded_filename = quote(normalized_jpeg_name(entry.filename), safe="-_.~()")
    return {
        "id": digest,
        "name": entry.name,
        "imageUrl": f"/photos/{encoded_filename}",
    }


def ensure_unique_ids(records: list[dict[str, str]]) -> None:
    seen: set[str] = set()
    for record in records:
        rid = record["id"]
        if rid in seen:
            raise DataError("ID collision detected while generating records")
        seen.add(rid)


def copy_files(entries: list[Entry], src_dir: Path, dst_dir: Path, max_dim: int, jpeg_quality: int) -> None:
    dst_dir.mkdir(parents=True, exist_ok=True)
    for old_file in dst_dir.glob("*"):
        if old_file.is_file():
            old_file.unlink()

    for entry in entries:
        source = src_dir / entry.filename
        target = dst_dir / normalized_jpeg_name(entry.filename)
        target.parent.mkdir(parents=True, exist_ok=True)
        cmd = [
            "sips",
            "-s",
            "format",
            "jpeg",
            "-s",
            "formatOptions",
            str(jpeg_quality),
            "--resampleHeightWidthMax",
            str(max_dim),
            str(source),
            "--out",
            str(target),
        ]
        try:
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except FileNotFoundError as exc:
            raise DataError("sips command is required on macOS for image conversion") from exc
        except subprocess.CalledProcessError as exc:
            raise DataError(f"failed to convert image '{entry.filename}' to JPEG") from exc


def write_json(records: list[dict[str, str]], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as fh:
        json.dump(records, fh, ensure_ascii=False, indent=2)
        fh.write("\n")


def main() -> int:
    args = parse_args()

    csv_path = Path(args.csv).resolve()
    photos_dir = Path(args.photos_dir).resolve()
    public_photos_dir = Path(args.public_photos_dir).resolve()
    output = Path(args.output).resolve()

    entries = load_entries(csv_path)
    validate_files(entries, photos_dir)
    records = [make_record(entry) for entry in entries]
    ensure_unique_ids(records)

    if args.check:
        print(f"OK: {len(records)} records validated")
        return 0

    copy_files(entries, photos_dir, public_photos_dir, args.max_dim, args.jpeg_quality)
    write_json(records, output)
    print(f"Built {len(records)} records -> {output}")
    print(f"Copied photos -> {public_photos_dir}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except DataError as exc:
        raise SystemExit(f"Error: {exc}")
