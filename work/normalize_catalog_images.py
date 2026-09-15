#!/usr/bin/env python3
"""Build a reversible local catalog preview with consistently framed product images."""

from __future__ import annotations

import json
import re
import shutil
from collections import defaultdict
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps


SOURCE = Path("/Users/isabellaschvartz/Desktop/ByeBye")
SOURCE_IMAGES = Path(__file__).resolve().parent / "original-images-6cabe51" / "images"
PREVIEW = Path(__file__).resolve().parent / "catalog-normalized-preview"
CANVAS_SIZE = (1200, 1500)
TARGET_BOX = (1008, 1260)  # 84% of the canvas in each direction.
PRODUCT_RE = re.compile(r"^prod_(\d+)(?:_|\.)")
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def border_background(image: Image.Image) -> tuple[int, int, int]:
    rgb = np.asarray(image.convert("RGB"), dtype=np.uint8)
    h, w = rgb.shape[:2]
    band = max(3, min(h, w) // 80)
    border = np.concatenate(
        [
            rgb[:band].reshape(-1, 3),
            rgb[-band:].reshape(-1, 3),
            rgb[:, :band].reshape(-1, 3),
            rgb[:, -band:].reshape(-1, 3),
        ]
    )
    return tuple(int(v) for v in np.median(border, axis=0))


def garment_bbox(image: Image.Image, background: tuple[int, int, int]):
    """Find a conservative foreground box on studio backgrounds."""
    rgb = np.asarray(image.convert("RGB"), dtype=np.int16)
    h, w = rgb.shape[:2]
    # Model a gentle studio-background gradient from the four corners. This
    # keeps model photography detectable without mistaking the backdrop for
    # foreground.
    patch = max(4, min(h, w) // 25)
    corners = np.asarray(
        [
            np.median(rgb[:patch, :patch], axis=(0, 1)),
            np.median(rgb[:patch, -patch:], axis=(0, 1)),
            np.median(rgb[-patch:, :patch], axis=(0, 1)),
            np.median(rgb[-patch:, -patch:], axis=(0, 1)),
        ],
        dtype=np.float32,
    )
    y = np.linspace(0.0, 1.0, h, dtype=np.float32)[:, None, None]
    x = np.linspace(0.0, 1.0, w, dtype=np.float32)[None, :, None]
    top_bg = corners[0][None, None, :] * (1 - x) + corners[1][None, None, :] * x
    bottom_bg = corners[2][None, None, :] * (1 - x) + corners[3][None, None, :] * x
    expected_bg = top_bg * (1 - y) + bottom_bg * y
    distance = np.max(np.abs(rgb.astype(np.float32) - expected_bg), axis=2)

    # A firmer threshold removes studio-gradient and JPEG noise. Garment edges,
    # seams, texture and shadows still provide a complete conservative outline.
    mask = Image.fromarray((distance > 27).astype(np.uint8) * 255)
    mask = mask.filter(ImageFilter.MedianFilter(5))
    mask = np.asarray(mask) > 0

    row_counts = mask.sum(axis=1)
    col_counts = mask.sum(axis=0)
    rows = np.flatnonzero(row_counts > max(3, int(w * 0.006)))
    cols = np.flatnonzero(col_counts > max(3, int(h * 0.006)))
    if not len(rows) or not len(cols):
        return None

    top, bottom = int(rows[0]), int(rows[-1] + 1)
    left, right = int(cols[0]), int(cols[-1] + 1)
    box_w, box_h = right - left, bottom - top
    area_ratio = (box_w * box_h) / (w * h)
    touches = left <= 2 or top <= 2 or right >= w - 2 or bottom >= h - 2

    # Full-background/editorial photography is not safe to silhouette automatically.
    if area_ratio > 0.94 or (touches and area_ratio > 0.82) or area_ratio < 0.025:
        return None

    pad_x = max(3, int(box_w * 0.018))
    pad_y = max(3, int(box_h * 0.018))
    return (
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(w, right + pad_x),
        min(h, bottom + pad_y),
    )


def save_optimized(image: Image.Image, destination: Path):
    destination.parent.mkdir(parents=True, exist_ok=True)
    suffix = destination.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        image.convert("RGB").save(
            destination, "JPEG", quality=84, optimize=True, progressive=True, subsampling=1
        )
    elif suffix == ".webp":
        image.convert("RGB").save(destination, "WEBP", quality=84, method=6)
    else:
        image.convert("RGB").save(destination, "PNG", optimize=True, compress_level=9)


def normalize_group(paths: list[Path], destination_dir: Path):
    opened = [(path, ImageOps.exif_transpose(Image.open(path)).convert("RGB")) for path in paths]
    backgrounds = [border_background(image) for _, image in opened]
    common_background = tuple(int(v) for v in np.median(np.asarray(backgrounds), axis=0))
    records = []

    for (path, image), detected_background in zip(opened, backgrounds):
        box = garment_bbox(image, detected_background)
        destination = destination_dir / path.name
        if box is None:
            # Never crop a fallback. Preserve the complete photograph inside the
            # same 4:5 canvas; editorial/model shots intentionally keep context.
            fitted = ImageOps.contain(image, (1080, 1350), Image.Resampling.LANCZOS)
            result = Image.new("RGB", CANVAS_SIZE, common_background)
            x = (CANVAS_SIZE[0] - fitted.width) // 2
            y = (CANVAS_SIZE[1] - fitted.height) // 2
            result.paste(fitted, (x, y))
            mode = "safe-full-frame"
        else:
            garment = image.crop(box)
            scale = min(TARGET_BOX[0] / garment.width, TARGET_BOX[1] / garment.height)
            new_size = (
                max(1, round(garment.width * scale)),
                max(1, round(garment.height * scale)),
            )
            garment = garment.resize(new_size, Image.Resampling.LANCZOS)
            result = Image.new("RGB", CANVAS_SIZE, common_background)
            x = (CANVAS_SIZE[0] - garment.width) // 2
            y = (CANVAS_SIZE[1] - garment.height) // 2
            result.paste(garment, (x, y))
            mode = "silhouette"
        save_optimized(result, destination)
        records.append({"file": path.name, "mode": mode, "box": box})
    return records


def prepare_preview_tree():
    if PREVIEW.exists():
        shutil.rmtree(PREVIEW)
    PREVIEW.mkdir(parents=True)
    for source in SOURCE.iterdir():
        if source.name in {".git", "images", "work", ".DS_Store"}:
            continue
        destination = PREVIEW / source.name
        if source.is_dir():
            shutil.copytree(source, destination)
        else:
            shutil.copy2(source, destination)
    (PREVIEW / "images").mkdir()


def main():
    prepare_preview_tree()
    groups = defaultdict(list)
    passthrough = []
    for path in sorted(SOURCE_IMAGES.iterdir()):
        if not path.is_file():
            continue
        match = PRODUCT_RE.match(path.name)
        if match and path.suffix.lower() in IMAGE_EXTENSIONS:
            groups[int(match.group(1))].append(path)
        else:
            passthrough.append(path)

    for path in passthrough:
        shutil.copy2(path, PREVIEW / "images" / path.name)

    report = {"canvas": CANVAS_SIZE, "products": {}, "summary": {}}
    silhouettes = fallbacks = 0
    for product_id, paths in sorted(groups.items()):
        records = normalize_group(paths, PREVIEW / "images")
        report["products"][str(product_id)] = records
        silhouettes += sum(record["mode"] == "silhouette" for record in records)
        fallbacks += sum(record["mode"] != "silhouette" for record in records)

    report["summary"] = {
        "product_groups": len(groups),
        "normalized_images": silhouettes,
        "safe_full_frame_images": fallbacks,
        "total_images": silhouettes + fallbacks,
    }
    report_path = PREVIEW / "normalization-report.json"
    report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report["summary"], ensure_ascii=False))
    print(PREVIEW)


if __name__ == "__main__":
    main()
