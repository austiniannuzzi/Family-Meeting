#!/usr/bin/env python3
"""Generate PWA icons (192x192 and 512x512) and apple-touch-icon (180x180)."""
import struct, zlib, base64, os

def make_png(size, bg=(124, 74, 3), fg=(255, 245, 230)):
    """Generate a simple PNG with a rounded rect background and house emoji substitute."""
    w = h = size
    # Create pixel data — solid bg color with a simple house shape
    img = []
    cx, cy = w // 2, h // 2
    roof_top = int(h * 0.18)
    roof_bot = int(h * 0.50)
    body_top = int(h * 0.45)
    body_bot = int(h * 0.82)
    wall_l   = int(w * 0.22)
    wall_r   = int(w * 0.78)
    door_l   = int(w * 0.40)
    door_r   = int(w * 0.60)
    door_top = int(h * 0.60)

    radius = size // 7

    for y in range(h):
        row = []
        for x in range(w):
            # Rounded rect mask
            in_rect = True
            if x < radius and y < radius:
                in_rect = (x - radius)**2 + (y - radius)**2 <= radius**2
            elif x > w - radius and y < radius:
                in_rect = (x - (w - radius))**2 + (y - radius)**2 <= radius**2
            elif x < radius and y > h - radius:
                in_rect = (x - radius)**2 + (y - (h - radius))**2 <= radius**2
            elif x > w - radius and y > h - radius:
                in_rect = (x - (w - radius))**2 + (y - (h - radius))**2 <= radius**2

            if not in_rect:
                row += [0, 0, 0, 0]
                continue

            # House shape
            # Roof: triangle
            if roof_top <= y <= roof_bot:
                slope = (w * 0.5 - w * 0.1) / (roof_bot - roof_top)
                left_edge = cx - slope * (y - roof_top)
                right_edge = cx + slope * (y - roof_top)
                if left_edge <= x <= right_edge:
                    row += [fg[0], fg[1], fg[2], 255]
                    continue

            # Body
            if body_top <= y <= body_bot and wall_l <= x <= wall_r:
                # Door cutout (show bg)
                if door_top <= y <= body_bot and door_l <= x <= door_r:
                    row += [bg[0], bg[1], bg[2], 255]
                else:
                    row += [fg[0], fg[1], fg[2], 255]
                continue

            row += [bg[0], bg[1], bg[2], 255]
        img.append(row)

    # Encode as PNG
    raw = b''
    for row in img:
        raw += b'\x00' + bytes(row)

    def chunk(name, data):
        c = name + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)

    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(raw, 9))
    png += chunk(b'IEND', b'')
    return png

os.makedirs('public/icons', exist_ok=True)

for size, name in [(192, 'public/icons/icon-192.png'), (512, 'public/icons/icon-512.png'), (180, 'public/apple-touch-icon.png')]:
    with open(name, 'wb') as f:
        f.write(make_png(size))
    print(f'Generated {name} ({size}x{size})')

# Also write a tiny favicon.ico (16x16 + 32x32)
ico16 = make_png(16)
ico32 = make_png(32)
# Simple ICO: just write the 32x32 PNG with .ico wrapper
with open('public/favicon.ico', 'wb') as f:
    # ICO header + 1 image
    f.write(b'\x00\x00\x01\x00\x01\x00')  # reserved, type=1, count=1
    f.write(bytes([32, 32, 0, 0, 1, 0, 32, 0]))  # w,h,colors,reserved,planes,bpp
    offset = 6 + 16 + 4
    f.write(struct.pack('<I', len(ico32)))  # size
    f.write(struct.pack('<I', offset))      # offset
    f.write(ico32)
print('Generated public/favicon.ico')
