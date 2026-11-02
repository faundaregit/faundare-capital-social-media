const path = require('node:path');
const fs = require('node:fs');
const sharp = require('sharp');

const root = process.env.FAUNDARE_PRIVATE_ASSET_ROOT;
const here = __dirname;
if (!root) throw new Error('Set FAUNDARE_PRIVATE_ASSET_ROOT to the private Faundare Capital asset directory.');
const bgPath = path.join(root, 'Marketing/Just Funded Posts/2026-08 South Carolina Industrial LOC - 15M/industrial-manufacturing-generic-background.png');
const logoPath = path.join(here, '..', '..', 'assets', 'M2.1A-TW1.3-dark.svg');
const outputPath = path.join(here, 'behind-the-closing-15m-industrial-v13-cinematic-editorial-1080x1350.png');
const mobilePath = path.join(here, 'behind-the-closing-15m-industrial-v13-cinematic-editorial-mobile-360x450.png');

fs.mkdirSync(here, { recursive: true });

const overlay = Buffer.from(`
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="topShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#02162B" stop-opacity="0.96"/>
      <stop offset="0.58" stop-color="#02162B" stop-opacity="0.48"/>
      <stop offset="1" stop-color="#02162B" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="storyBand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#02172C"/>
      <stop offset="0.62" stop-color="#05213A"/>
      <stop offset="1" stop-color="#0A2B49"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFE69A"/>
      <stop offset="0.38" stop-color="#F4B92F"/>
      <stop offset="0.66" stop-color="#FFF0BB"/>
      <stop offset="1" stop-color="#C58A13"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.42"/>
    </filter>
  </defs>

  <rect width="1080" height="560" fill="url(#topShade)"/>
  <path d="M0 910 L1080 820 V1350 H0 Z" fill="url(#storyBand)"/>
  <path d="M0 910 L1080 820" stroke="#F3B62C" stroke-width="3" stroke-opacity="0.78"/>
  <text x="1010" y="1045" text-anchor="end" fill="#FFFFFF" fill-opacity="0.035" font-family="Arial, Helvetica, sans-serif" font-size="178" font-weight="900" letter-spacing="4">CLOSED</text>

  <g transform="translate(70 176)">
    <rect width="232" height="56" rx="5" fill="#F3B62C"/>
    <text x="116" y="38" text-anchor="middle" fill="#03182E" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="800" letter-spacing="2.5">JUST FUNDED</text>
  </g>

  <text x="66" y="410" fill="url(#gold)" font-family="Georgia, 'Times New Roman', serif" font-size="164" font-weight="700" letter-spacing="-7" filter="url(#shadow)">$15M</text>
  <text x="72" y="470" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="37" font-weight="800" letter-spacing="1.15">INDUSTRIAL LINE OF CREDIT</text>

  <g transform="translate(70 952)">
    <text x="0" y="0" fill="#F3C251" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" letter-spacing="2.3">BEHIND THE CLOSING</text>

    <g transform="translate(0 72)">
      <text x="0" y="0" fill="#AFC0D0" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="1.8">CHALLENGE</text>
      <text x="0" y="42" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700">Short operating history</text>
      <text x="0" y="76" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700">+ bank policy limits</text>
    </g>

    <g transform="translate(362 72)">
      <text x="0" y="0" fill="#AFC0D0" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="1.8">CAPITAL MATCH</text>
      <text x="0" y="42" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700">Aligned bank</text>
      <text x="0" y="76" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700">+ negotiated terms</text>
    </g>

    <g transform="translate(742 72)">
      <text x="0" y="0" fill="#AFC0D0" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="1.8">OUTCOME</text>
      <text x="0" y="38" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700">CLOSED AT</text>
      <text x="0" y="94" fill="url(#gold)" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="700">6.45%</text>
    </g>
  </g>

  <text x="70" y="1238" fill="#F3C251" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" letter-spacing="2">SOUTH CAROLINA</text>
  <text x="292" y="1238" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" letter-spacing="1.6">INDUSTRIAL MANUFACTURING</text>
  <text x="70" y="1300" fill="#9CB0C2" font-family="Arial, Helvetica, sans-serif" font-size="15">Terms reflect this completed transaction only.</text>
  <text x="1010" y="1300" text-anchor="end" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700">faundarecapital.com</text>
</svg>`);

(async () => {
  const logo = await sharp(logoPath).resize({ width: 520 }).png().toBuffer();

  await sharp(bgPath)
    .resize(1080, 1350, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 1.20, saturation: 1.02 })
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: logo, left: 66, top: 52 },
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
