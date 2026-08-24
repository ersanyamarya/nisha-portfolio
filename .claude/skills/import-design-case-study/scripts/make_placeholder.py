#!/usr/bin/env python3
"""
Generate a valid placeholder raster image at an exact target path/extension.

Why this exists: DesignSync's get_file caps reads at 256 KiB. Any asset larger
than that comes back with `truncated: true` and a base64 blob that decodes to
garbage (usually a PNG/JPEG header followed by a truncated data stream). That
garbage is NOT a usable placeholder -- it's a corrupted file that will render
as a broken image, and worse, some tooling (image processing plugins, browsers
sniffing content) may behave unpredictably on it.

Instead: throw away the truncated bytes entirely and synthesize a small, valid,
neutral-colored image using pure Python (no dependencies) so:
  1. The file is valid and renders as a plain rectangle, not a broken-image icon.
  2. The filename and extension match EXACTLY what the source design declared,
     so the user can drop their real screenshot in later with zero code changes.
  3. If the target extension is .jpg/.jpeg, the actual bytes are a real JPEG
     (via macOS `sips`, when available) -- not PNG bytes wearing a .jpg name,
     which can cause a browser/CDN Content-Type mismatch in production.

Usage:
    python3 make_placeholder.py <output_path> [--width 1600] [--height 900] [--color RRGGBB]

Color defaults to a neutral warm-cream matching this site's default-100 token.
Pass --color to match a different case study's palette if useful.
"""
import argparse
import os
import shutil
import struct
import subprocess
import zlib


def make_png(path: str, w: int, h: int, rgb: tuple[int, int, int]) -> None:
    def chunk(tag: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
    row = bytes([0] + list(rgb) * w)
    raw = row * h
    idat = chunk(b"IDAT", zlib.compress(raw, 9))
    iend = chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(sig + ihdr + idat + iend)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("output_path", help="Exact path/filename the placeholder must have (extension matters).")
    parser.add_argument("--width", type=int, default=1600)
    parser.add_argument("--height", type=int, default=900)
    parser.add_argument("--color", default="e9e0d5", help="Hex RGB, no #. Default matches a neutral warm-cream tone.")
    args = parser.parse_args()

    rgb = tuple(int(args.color[i : i + 2], 16) for i in (0, 2, 4))
    ext = os.path.splitext(args.output_path)[1].lower()
    os.makedirs(os.path.dirname(args.output_path) or ".", exist_ok=True)

    if ext in (".jpg", ".jpeg"):
        tmp_png = args.output_path + ".tmp.png"
        make_png(tmp_png, args.width, args.height, rgb)
        if shutil.which("sips"):
            subprocess.run(["sips", "-s", "format", "jpeg", tmp_png, "--out", args.output_path], check=True, capture_output=True)
            os.remove(tmp_png)
        else:
            # No sips (non-macOS). Fall back to PNG bytes under the .jpg name --
            # renders fine via <img> content-sniffing, but flag the mismatch.
            os.replace(tmp_png, args.output_path)
            print(f"WARNING: no `sips` available -- {args.output_path} contains PNG bytes, not a real JPEG.")
    else:
        make_png(args.output_path, args.width, args.height, rgb)

    print(f"wrote {args.output_path} ({os.path.getsize(args.output_path)} bytes)")


if __name__ == "__main__":
    main()
