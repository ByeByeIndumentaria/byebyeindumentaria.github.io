#!/usr/bin/env python3
"""Create compact QA contact sheets for the normalized catalog preview."""

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent / "catalog-normalized-preview"
REPORT = json.loads((ROOT / "normalization-report.json").read_text(encoding="utf-8"))
THUMB = (180, 225)
CELL = (200, 255)
COLS = 6


def make_sheet(records, destination):
    rows = (len(records) + COLS - 1) // COLS
    sheet = Image.new("RGB", (COLS * CELL[0], rows * CELL[1]), "#dedede")
    draw = ImageDraw.Draw(sheet)
    for index, (product_id, record) in enumerate(records):
        image = Image.open(ROOT / "images" / record["file"]).convert("RGB")
        image.thumbnail(THUMB, Image.Resampling.LANCZOS)
        x = (index % COLS) * CELL[0] + (CELL[0] - image.width) // 2
        y = (index // COLS) * CELL[1] + 4
        sheet.paste(image, (x, y))
        draw.text((index % COLS * CELL[0] + 8, y + THUMB[1] + 8), f"{product_id} · {record['file']}", fill="black")
    sheet.save(destination, "JPEG", quality=88, optimize=True)


fallbacks = []
silhouettes = []
for product_id, records in REPORT["products"].items():
    for record in records:
        target = fallbacks if record["mode"] == "safe-full-frame" else silhouettes
        target.append((product_id, record))

make_sheet(fallbacks[:96], ROOT / "qa-fallbacks.jpg")
make_sheet(silhouettes[::max(1, len(silhouettes) // 96)][:96], ROOT / "qa-silhouettes.jpg")
print(ROOT / "qa-fallbacks.jpg")
print(ROOT / "qa-silhouettes.jpg")
