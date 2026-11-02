from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

W, H = 1080, 1350
ROOT = Path(__file__).parent
FONT_DIR = Path(__file__).resolve().parents[2] / "assets" / "fonts"
REG = FONT_DIR / "Geist-Regular.ttf"
MED = FONT_DIR / "Geist-Medium.ttf"
LOGO = ROOT / "tw13-logo.png"

NAVY = "#06182D"
WHITE = "#F8F5EC"
MUTED = "#9EB4C4"
GOLD = "#F2B840"
CYAN = "#66C5DB"
PALE = "#A8C0D0"
AMBER = "#DCAA55"


def font(size, medium=False):
    return ImageFont.truetype(str(MED if medium else REG), size=size)


def text(draw, xy, value, size, fill, medium=False, anchor=None):
    draw.text(xy, value, font=font(size, medium), fill=fill, anchor=anchor)


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


img = Image.new("RGB", (W, H), NAVY)
d = ImageDraw.Draw(img)

# Cycle 2 keeps the approved Concept C layout and chart mechanism intact.
logo = Image.open(LOGO).convert("RGBA")
img.paste(logo, (68, 48), logo)

text(d, (68, 188), "Four sectors accounted for", 63, WHITE, True)
text(d, (68, 258), "44.7% of industrial leasing.", 63, WHITE, True)
text(d, (68, 328), "Share of U.S. industrial leasing activity · Q3 2026", 29, MUTED, True)

# Whole-market denominator remains the first visual read after the headline.
rounded(d, (68, 397, 1012, 561), 24, "#0A253F", "#28506A", 2)
rounded(d, (92, 421, 492, 537), 15, GOLD)
rounded(d, (492, 421, 988, 537), 15, "#183E5A")
text(d, (118, 459), "THESE FOUR SECTORS", 29, NAVY, True)
text(d, (118, 497), "44.7%", 36, NAVY, True)
text(d, (946, 459), "ALL OTHER SECTORS", 32, PALE, True, "ra")
text(d, (946, 497), "55.3%", 36, WHITE, True, "ra")

text(d, (68, 593), "SHARE OF TOTAL LEASING · 0–20% SCALE", 30, MUTED, True)
for x, tick in zip([68, 304, 540, 776, 1012], ["0%", "5%", "10%", "15%", "20%"]):
    text(d, (x, 630), tick, 28, MUTED, False, "ma")
    d.line((x, 662, x, 1080), fill="#244760", width=1)

rows = [
    ("Third-party logistics", "17.9%", 1.00, GOLD),
    ("Construction materials + fixtures", "14.7%", 14.7 / 17.9, CYAN),
    ("Communications + technology", "7.5%", 7.5 / 17.9, PALE),
    ("Energy + utilities", "4.6%", 4.6 / 17.9, AMBER),
]
start_y = 665
for i, (label, value, ratio, color) in enumerate(rows):
    y = start_y + i * 112
    text(d, (68, y), label, 33, WHITE, True)
    text(d, (1012, y - 8), value, 54, color, True, "ra")
    rounded(d, (68, y + 58, 1012, y + 76), 9, "#1A405A")
    rounded(d, (68, y + 58, 68 + int(845 * ratio), y + 76), 9, color)

# The takeaway is now a two-level conclusion instead of a decorative divider block.
text(d, (68, 1138), "Industrial demand is diversifying.", 38, GOLD, True)
text(d, (68, 1187), "Power, production + infrastructure now matter alongside logistics.", 29, WHITE, True)

# Increased bottom safe area for social-platform overlays and crops.
text(d, (68, 1260), "Source: JLL U.S. Industrial Market Dynamics · Q3 2026", 26, MUTED)

full = ROOT / "industrial-demand-drivers-v7-1080x1350.png"
mobile = ROOT / "industrial-demand-drivers-v7-mobile-360x450.png"
img.save(full, optimize=True)
img.resize((360, 450), Image.Resampling.LANCZOS).save(mobile, optimize=True)
print(full)
print(mobile)
