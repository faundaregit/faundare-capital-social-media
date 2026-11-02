from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

W, H = 1080, 1350
ROOT = Path(__file__).parent
FONT_DIR = Path(__file__).resolve().parents[2] / "assets" / "fonts"
REG = FONT_DIR / "Geist-Regular.ttf"
NAVY = "#06182D"
MUTED = "#9EB4C4"

img = Image.open(ROOT / "industrial-demand-drivers-v8-1080x1350.png").convert("RGB")
d = ImageDraw.Draw(img)
tick_font = ImageFont.truetype(str(REG), size=28)

# Cycle 2 safe-area correction: redraw only the tick band. Interior ticks remain
# centered; edge ticks align inward so every glyph stays inside the 56 px zone.
d.rectangle((40, 625, 1040, 661), fill=NAVY)
d.text((68, 630), "0%", font=tick_font, fill=MUTED, anchor="la")
d.text((304, 630), "5%", font=tick_font, fill=MUTED, anchor="ma")
d.text((540, 630), "10%", font=tick_font, fill=MUTED, anchor="ma")
d.text((776, 630), "15%", font=tick_font, fill=MUTED, anchor="ma")
d.text((1012, 630), "20%", font=tick_font, fill=MUTED, anchor="ra")

full = ROOT / "industrial-demand-drivers-v9-1080x1350.png"
mobile = ROOT / "industrial-demand-drivers-v9-mobile-360x450.png"
img.save(full, optimize=True)
img.resize((360, 450), Image.Resampling.LANCZOS).save(mobile, optimize=True)
print(full)
print(mobile)
