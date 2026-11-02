from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

W, H = 1080, 1350
ROOT = Path(__file__).parent
FONT_DIR = Path(__file__).resolve().parents[2] / "assets" / "fonts"
REG = FONT_DIR / "Geist-Regular.ttf"
MED = FONT_DIR / "Geist-Medium.ttf"
NAVY = "#06182D"
WHITE = "#F8F5EC"
MUTED = "#9EB4C4"
GOLD = "#F2B840"


def font(size, medium=False):
    return ImageFont.truetype(str(MED if medium else REG), size=size)


img = Image.open(ROOT / "industrial-demand-drivers-v9-1080x1350.png").convert("RGB")
d = ImageDraw.Draw(img)

# Cycle 2 claim correction: replace a possible one-quarter trend inference with
# the property-level decision implication, without altering the composition.
d.rectangle((0, 1092, W, H), fill=NAVY)
d.text((68, 1138), "The tenant pool starts with the building.", font=font(38, True), fill=GOLD)
d.text((68, 1187), "Power, access + functionality determine who it can serve.", font=font(32, True), fill=WHITE)
d.text((68, 1260), "Source: JLL U.S. Industrial Market Dynamics · Q3 2026", font=font(26), fill=MUTED)

full = ROOT / "industrial-demand-drivers-v10-1080x1350.png"
mobile = ROOT / "industrial-demand-drivers-v10-mobile-360x450.png"
img.save(full, optimize=True)
img.resize((360, 450), Image.Resampling.LANCZOS).save(mobile, optimize=True)
print(full)
print(mobile)
