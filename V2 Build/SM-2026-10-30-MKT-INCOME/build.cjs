const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = __dirname;
const out = path.join(root, 'final');
fs.mkdirSync(out, { recursive: true });

const W = 1080, H = 1350;
const states = [
  ['WASHINGTON', 51.1],
  ['MONTANA', 51.1],
  ['MAINE', 45.7],
  ['MASSACHUSETTS', 44.7],
  ['NEBRASKA', 37.5],
  ['VERMONT', 37.4],
  ['NORTH DAKOTA', 34.9],
  ['IDAHO', 33.3],
  ['OKLAHOMA', 32.7],
  ['RHODE ISLAND', 31.0],
];
const x0 = 330, x1 = 935, max = 55;
const px = v => x0 + (v / max) * (x1 - x0);
const nationalX = px(18.9);

const rows = states.map(([name, val], i) => {
  const y = 455 + i * 66;
  const x = px(val);
  const accent = i < 2 ? '#F2B840' : i < 4 ? '#E9D29A' : '#77B7D8';
  const r = i < 2 ? 12 : 9;
  return `
    <text x="82" y="${y+8}" class="state">${name}</text>
    <line x1="${x0}" y1="${y}" x2="${x}" y2="${y}" stroke="${accent}" stroke-width="${i < 2 ? 8 : 5}" stroke-linecap="round" opacity="${i < 2 ? 1 : .88}"/>
    <circle cx="${x}" cy="${y}" r="${r+7}" fill="${accent}" opacity=".10"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${accent}"/>
    <text x="${Math.min(x+22, 952)}" y="${y+9}" class="value" fill="${accent}">+${val.toFixed(1)}%</text>`;
}).join('\n');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#06172E"/>
    <stop offset="0.56" stop-color="#0A2443"/>
    <stop offset="1" stop-color="#071A32"/>
  </linearGradient>
  <radialGradient id="glow" cx="82%" cy="10%" r="58%">
    <stop offset="0" stop-color="#2D6F98" stop-opacity=".32"/>
    <stop offset=".45" stop-color="#163A5F" stop-opacity=".12"/>
    <stop offset="1" stop-color="#06172E" stop-opacity="0"/>
  </radialGradient>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000A17" flood-opacity=".34"/>
  </filter>
  <style>
    .kicker{font:700 24px Arial,sans-serif;letter-spacing:3.2px;fill:#93C5E2}
    .title{font:800 72px Arial,sans-serif;letter-spacing:-2.4px;fill:#F4F1E9}
    .sub{font:400 27px Arial,sans-serif;fill:#BFD2E2}
    .heroNum{font:800 93px Arial,sans-serif;letter-spacing:-4px;fill:#F2B840}
    .heroText{font:700 25px Arial,sans-serif;letter-spacing:.5px;fill:#F4F1E9}
    .state{font:700 21px Arial,sans-serif;letter-spacing:.8px;fill:#E8EDF2}
    .value{font:800 24px Arial,sans-serif}
    .axis{font:600 17px Arial,sans-serif;fill:#829BB0}
    .benchmark{font:700 18px Arial,sans-serif;fill:#F2B840}
    .source{font:400 15px Arial,sans-serif;fill:#8FA6B8}
  </style>
</defs>

<rect width="1080" height="1350" fill="url(#bg)"/>
<rect width="1080" height="1350" fill="url(#glow)"/>

<!-- restrained editorial texture -->
<g fill="none" stroke="#77B7D8" stroke-opacity=".065" stroke-width="2">
  <circle cx="953" cy="110" r="72"/><circle cx="953" cy="110" r="118"/><circle cx="953" cy="110" r="164"/>
  <path d="M720 0 C790 86 818 192 1060 245"/><path d="M660 0 C760 121 783 246 1080 314"/>
</g>

<text x="82" y="92" class="kicker">REAL HOUSEHOLD INCOME · AFTER INFLATION</text>
<text x="82" y="183" class="title">48 STATES GAINED</text>
<text x="82" y="262" class="title">PURCHASING POWER</text>
<text x="82" y="315" class="sub">Median household income growth, 2000–2025</text>

<rect x="55" y="365" width="970" height="800" rx="30" fill="#0D2949" fill-opacity=".54" stroke="#7EB3D2" stroke-opacity=".13"/>
<text x="82" y="418" class="axis">TOP 10 STATE GAINS</text>
<text x="935" y="418" text-anchor="end" class="axis">CHANGE</text>

<!-- national benchmark -->
<line x1="${nationalX}" y1="430" x2="${nationalX}" y2="1080" stroke="#F2B840" stroke-width="2" stroke-dasharray="6 9" opacity=".62"/>
<rect x="${nationalX-75}" y="1063" width="150" height="34" rx="17" fill="#F2B840"/>
<text x="${nationalX}" y="1087" text-anchor="middle" style="font:800 17px Arial,sans-serif;fill:#071A32">U.S. +18.9%</text>

${rows}

<!-- axis baseline -->
<line x1="${x0}" y1="1112" x2="${x1}" y2="1112" stroke="#7E9BB2" stroke-opacity=".3"/>
${[0,10,20,30,40,50].map(v=>`<line x1="${px(v)}" y1="1107" x2="${px(v)}" y2="1117" stroke="#8AA3B8" stroke-opacity=".45"/><text x="${px(v)}" y="1142" text-anchor="middle" class="axis">${v}%</text>`).join('')}

<text x="82" y="1275" class="source">SOURCE: U.S. CENSUS BUREAU · VISUAL CAPITALIST · 2025 DATA</text>
</svg>`;

fs.writeFileSync(path.join(out, 'post-v2.svg'), svg);

async function render(){
  const logoPath = path.join(root, '..', '..', 'assets', 'M2.1A-TW1.3-dark.svg');
  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  const logo = await sharp(logoPath, { density: 192 }).resize({width: 270, height: 54, fit:'contain'}).png().toBuffer();
  const full = await sharp(base).composite([{input:logo,left:742,top:1234}]).png().toBuffer();
  await sharp(full).toFile(path.join(out, 'post-v2-1080x1350.png'));
  await sharp(full).resize(360,450).toFile(path.join(out, 'post-v2-mobile-proof.png'));
}

render().catch(e=>{console.error(e);process.exit(1)});

