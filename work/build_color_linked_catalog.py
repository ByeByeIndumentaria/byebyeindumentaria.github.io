#!/usr/bin/env python3
"""Build a preview where only color-button images are normalized."""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path


REPO = Path("/Users/isabellaschvartz/Desktop/ByeBye")
WORK = Path(__file__).resolve().parent
ORIGINAL_IMAGES = WORK / "original-images-6cabe51" / "images"
NORMALIZED_IMAGES = WORK / "catalog-normalized-preview" / "images"
OUTPUT = WORK / "color-linked-preview"


def mapped_color_files(script: str) -> set[str]:
    extension_block = re.search(
        r"const productImageExtensionByKey = \{(.*?)\n\};",
        script,
        re.S,
    ).group(1)
    extensions = dict(re.findall(r'"(\d+_\d+)"\s*:\s*"(\w+)"', extension_block))

    map_block = re.search(
        r"const colorImageByProductId = \{(.*?)\n\};\n\nfunction normalizeColorName",
        script,
        re.S,
    ).group(1)

    files: set[str] = set()
    for product_id, body in re.findall(r"^\s*(\d+)\s*:\s*\{([^}]+)\}", map_block, re.M):
        for photo_number in set(re.findall(r":\s*(\d+)", body)):
            key = f"{product_id}_{photo_number}"
            extension = extensions.get(key, "jpg")
            files.add(f"prod_{key}.{extension}")

    # Include explicit per-product colorImages maps used by custom products.
    for block in re.findall(r"colorImages\s*(?:=|:)\s*\{(.*?)\}", script, re.S):
        files.update(re.findall(r'images/(prod_\d+_\d+\.(?:jpg|jpeg|png|webp))', block, re.I))
    return files


def main():
    script = (REPO / "script.js").read_text(encoding="utf-8")
    linked = mapped_color_files(script)

    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir(parents=True)

    for source in REPO.iterdir():
        if source.name in {".git", "images", "work", ".DS_Store"}:
            continue
        destination = OUTPUT / source.name
        if source.is_dir():
            shutil.copytree(source, destination)
        else:
            shutil.copy2(source, destination)

    destination_images = OUTPUT / "images"
    shutil.copytree(ORIGINAL_IMAGES, destination_images)

    missing = []
    for filename in sorted(linked):
        source = NORMALIZED_IMAGES / filename
        destination = destination_images / filename
        if not source.exists() or not destination.exists():
            missing.append(filename)
            continue
        shutil.copy2(source, destination)

    manifest = {
        "linked_normalized_count": len(linked) - len(missing),
        "unlinked_original_count": len(list(ORIGINAL_IMAGES.glob("prod_*"))) - len(linked),
        "missing": missing,
        "linked_files": sorted(linked),
    }
    (OUTPUT / "color-linked-manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(json.dumps({k: v for k, v in manifest.items() if k != "linked_files"}, ensure_ascii=False))
    print(OUTPUT)


if __name__ == "__main__":
    main()
