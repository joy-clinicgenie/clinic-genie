"""
Knock out solid backgrounds (near-black and/or near-white) from client logos
using a border-connected flood fill, then autocrop to the artwork.

Per-image config:
  file    : source filename
  mode    : "both" removes near-black AND near-white bg; "black" removes only near-black
  t       : background tolerance
  recolor : optional hex; repaints all opaque pixels (keeps alpha) — used for
            monochrome logos that need to be legible on a light strip
"""
import os
from collections import deque

from PIL import Image

ASSETS = "/Users/cgdesign/.cursor/projects/Users-cgdesign-vsc-cg-revamp1/assets"
OUT = "/Users/cgdesign/vsc/cg-revamp1/public/clients"

CONFIG = {
    "medical-surgical-dermatology": {"file": "msdc-square-67684985-465c-4e43-968f-91270109b53b.png", "mode": "both", "t": 42},
    "stellaris-robotics": {"file": "stellaris-square-70472d6e-5dd1-40fa-a078-ed571697b5a3.png", "mode": "both", "t": 42},
    "time-key": {"file": "timekey-square-544c8d16-48cf-4ca0-be49-749725be5288.png", "mode": "black", "t": 14, "recolor": "#33424A"},
    "sunrise-heart": {"file": "sunrise-square-94d21ae7-e898-4b4d-9a09-bc46fb059c18.png", "mode": "both", "t": 42},
    "cedar-endocrine": {"file": "cedar-square-b6deeeb4-166c-4504-8da9-cd202b17ffce.png", "mode": "both", "t": 42},
    "straits-eye-centre": {"file": "tsec-square-f90248a7-d941-49e9-9e9a-ab89e78e1d58.png", "mode": "both", "t": 42},
    # "the-heart-specialist" omitted: source is a near-black logo (max brightness 53)
    # on a pure-black background — too low-contrast to extract cleanly.
    "clementi-family-aesthetic": {"file": "cfac-square-f2da3bcd-47f6-4100-b3c4-ccdedaae8ae2.png", "mode": "both", "t": 42},
}


def make_is_bg(mode, t):
    def is_bg(px):
        r, g, b = px[0], px[1], px[2]
        near_black = max(r, g, b) < t
        if mode == "black":
            return near_black
        near_white = min(r, g, b) > (255 - t)
        return near_black or near_white
    return is_bg


def process(slug, cfg):
    im = Image.open(os.path.join(ASSETS, cfg["file"])).convert("RGBA")
    w, h = im.size
    px = im.load()
    is_bg = make_is_bg(cfg["mode"], cfg["t"])

    visited = bytearray(w * h)
    dq = deque()

    def seed(x, y):
        i = y * w + x
        if not visited[i] and is_bg(px[x, y]):
            visited[i] = 1
            dq.append((x, y))

    for x in range(w):
        seed(x, 0)
        seed(x, h - 1)
    for y in range(h):
        seed(0, y)
        seed(w - 1, y)

    while dq:
        x, y = dq.popleft()
        px[x, y] = (px[x, y][0], px[x, y][1], px[x, y][2], 0)
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h:
                i = ny * w + nx
                if not visited[i] and is_bg(px[nx, ny]):
                    visited[i] = 1
                    dq.append((nx, ny))

    if cfg.get("recolor"):
        hexv = cfg["recolor"].lstrip("#")
        rc = (int(hexv[0:2], 16), int(hexv[2:4], 16), int(hexv[4:6], 16))
        for y in range(h):
            for x in range(w):
                a = px[x, y][3]
                if a > 0:
                    px[x, y] = (rc[0], rc[1], rc[2], a)

    bbox = im.getbbox()
    if bbox:
        pad = 12
        l, t_, r, b = bbox
        l, t_ = max(0, l - pad), max(0, t_ - pad)
        r, b = min(w, r + pad), min(h, b + pad)
        im = im.crop((l, t_, r, b))

    os.makedirs(OUT, exist_ok=True)
    im.save(os.path.join(OUT, f"{slug}.png"))
    print(f"{slug:30} -> {im.size}")


if __name__ == "__main__":
    for slug, cfg in CONFIG.items():
        process(slug, cfg)
    print("done")
