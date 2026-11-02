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


src = ROOT / "industrial-demand-drivers-v7-1080x1350.png"
img = Image.open(src).convert("RGB")
d = ImageDraw.Draw(img)

# Cycle 2 preflight correction: preserve the complete layout and redraw only
# the takeaway/footer zone so essential text meets the 32 px minimum.
d.rectangle((0, 1092, W, H), fill=NAVY)
d.text((68, 1138), "Industrial demand is diversifying.", font=font(38, True), fill=GOLD)
d.text((68, 1187), "Power, production + infrastructure now matter too.", font=font(32, True), fill=WHITE)
d.text((68, 1260), "Source: JLL U.S. Industrial Market Dynamics · Q3 2026", font=font(26), fill=MUTED)

full = ROOT / "industrial-demand-drivers-v8-1080x1350.png"
mobile = ROOT / "industrial-demand-drivers-v8-mobile-360x450.png"
img.save(full, optimize=True)
img.resize((360, 450), Image.Resampling.LANCZOS).save(mobile, optimize=True)
print(full)
print(mobile)
