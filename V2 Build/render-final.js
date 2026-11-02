const path = require('path');
const sharp = require('sharp');
const root = path.join(__dirname, 'SM-2026-11-02-MKT-IOS', 'final');
const src = path.join(root, 'post-v1.svg');
const logo = path.join(__dirname, '..', 'assets', 'M2.1A-TW1.3-dark.svg');

async function render() {
  const base = await sharp(src, { density: 72 }).resize(1080, 1350, { fit: 'fill' }).png().toBuffer();
  const logoFull = await sharp(logo, { density: 192 }).resize({ width: 275, height: 55, fit: 'contain' }).png().toBuffer();
  const full = await sharp(base).composite([{ input: logoFull, left: 742, top: 1201 }]).png().toBuffer();
  await sharp(full).toFile(path.join(root, 'post-v2-1080x1350.png'));
  await sharp(full).resize(360, 450).png().toFile(path.join(root, 'post-v2-mobile-proof.png'));
}
render();
