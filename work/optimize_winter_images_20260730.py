from pathlib import Path
import shutil
from PIL import Image, ImageOps


SOURCE_DIR = Path("/Users/isabellaschvartz/Desktop/ByeBye/images")
IMAGE_DIR = Path("/Users/isabellaschvartz/Documents/Pagina Web/work/winter-image-batch")
MAX_EDGE = 1800
JPEG_QUALITY = 82

PHOTO_NUMBERS = {
    47: [6, 7], 48: [6, 7], 49: [6, 7, 8], 50: [5, 6, 7, 8],
    51: [7, 8], 52: [2, 3, 4, 5], 53: [6], 54: [4, 5, 6],
    55: [5, 6, 7, 8], 56: [10, 11, 12], 58: [6, 7],
    59: [7, 8, 9], 60: [2, 3, 4, 5], 61: [5, 6], 62: [6, 7],
    63: [5, 6, 7], 64: [6, 7, 8, 9], 65: [8, 9, 10, 11],
    66: [7, 8], 68: [2, 3], 69: [5, 6, 7, 8], 70: [8],
    71: [6, 7, 8, 9, 10], 72: [8, 9, 10], 74: [4, 5, 6, 7],
    75: [4, 5, 6], 76: [4, 5, 6], 77: [1, 2, 3, 4, 5],
    78: [1, 2, 3, 4], 79: [5, 6, 7, 8], 80: [5, 6, 7],
    81: [4, 5, 6, 7], 82: [3, 4, 5, 6],
}


def find_source(product_id: int, photo_number: int) -> Path:
    base = SOURCE_DIR / f"prod_{product_id}_{photo_number}"
    for suffix in (".png", ".jpg", ".jpeg"):
        candidate = base.with_suffix(suffix)
        if candidate.exists():
            return candidate
    raise FileNotFoundError(f"Missing image: prod_{product_id}_{photo_number}")


converted = []
kept = []
before_total = 0
after_total = 0
IMAGE_DIR.mkdir(parents=True, exist_ok=True)

for product_id, photo_numbers in PHOTO_NUMBERS.items():
    for photo_number in photo_numbers:
        source = find_source(product_id, photo_number)
        before_size = source.stat().st_size
        before_total += before_size
        destination = IMAGE_DIR / f"prod_{product_id}_{photo_number}.jpg"

        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            needs_resize = max(image.size) > MAX_EDGE
            needs_conversion = source.suffix.lower() != ".jpg"
            needs_compression = before_size > 900_000

            if needs_resize:
                image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)

            if needs_conversion or needs_resize or needs_compression:
                temporary = destination.with_suffix(".optimized.jpg")
                image.save(
                    temporary,
                    "JPEG",
                    quality=JPEG_QUALITY,
                    optimize=True,
                    progressive=True,
                )
                temporary.replace(destination)
                converted.append((source.name, destination.name, before_size, destination.stat().st_size))
            else:
                shutil.copy2(source, destination)
                kept.append(source.name)

        after_total += destination.stat().st_size

print(f"validated={sum(len(v) for v in PHOTO_NUMBERS.values())}")
print(f"converted={len(converted)}")
print(f"kept={len(kept)}")
print(f"bytes_before={before_total}")
print(f"bytes_after={after_total}")
for source_name, destination_name, old_size, new_size in converted:
    print(f"{source_name} -> {destination_name}: {old_size} -> {new_size}")
