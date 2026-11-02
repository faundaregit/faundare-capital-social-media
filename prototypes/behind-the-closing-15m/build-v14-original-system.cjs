const path = require('node:path');
const sharp = require('sharp');

const root = process.env.FAUNDARE_PRIVATE_ASSET_ROOT;
const here = __dirname;
if (!root) throw new Error('Set FAUNDARE_PRIVATE_ASSET_ROOT to the private Faundare Capital asset directory.');
const originalPath = path.join(root, 'Marketing/Just Funded Posts/2026-08 South Carolina Industrial LOC - 15M/south-carolina-industrial-loc-15m-just-funded-1080x1350.png');
const logoPath = path.join(here, '..', '..', 'assets', 'M2.1A-TW1.3-dark.svg');
const outputPath = path.join(here, 'behind-the-closing-15m-industrial-v14-proven-system-1080x1350.png');
const mobilePath = path.join(here, 'behind-the-closing-15m-industrial-v14-proven-system-mobile-360x450.png');

const logoRepair = Buffer.from(`
<svg width="1080" height="190" viewBox="0 0 1080 190" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blend" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#041A32"/>
      <stop offset="0.78" stop-color="#041A32"/>
      <stop offset="1" stop-color="#041A32" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="760" height="190" fill="url(#blend)"/>
</svg>`);

(async () => {
  const logo = await sharp(logoPath).resize({ width: 520 }).png().toBuffer();

  await sharp(originalPath)
    .composite([
      { input: logoRepair, left: 0, top: 0 },
      { input: logo, left: 52, top: 42 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  await sharp(outputPath)
    .resize(360, 450)
    .png({ compressionLevel: 9 })
    .toFile(mobilePath);

  console.log(outputPath);
  console.log(mobilePath);
})();
