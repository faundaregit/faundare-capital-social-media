const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const W = 1080, H = 1350;
const outDir = __dirname;
const assetRoot = path.join(__dirname, '..', '..', 'assets');
const logoPath = path.join(assetRoot, 'M2.1A-TW1.3-dark.svg');
const fontDir = path.join(assetRoot, 'fonts');
const regularFont = path.join(fontDir, 'Geist-Regular.ttf');
const mediumFont = path.join(fontDir, 'Geist-Medium.ttf');

const C = {
  navy: '#061A34', navy2: '#0A2843', ink: '#132238', gold: '#F2B840',
  darkGold: '#9A6200', ivory: '#F4F1E9', pale: '#F3F7FA', slate: '#617087',
  white: '#FFFFFF', line: '#C9C1B4'
};

const rows = [
  { county: 'San Francisco', values: [-0.4, -9.6, 0.2, -0.9, 15.5] },
  { county: 'Anchorage, AK', values: [5.6, 3.4, 1.2, 3.7, 5.4] },
  { county: 'San Mateo, CA', values: [6.6, -5.5, 3.1, -0.7, 4.4] },
  { county: 'Santa Barbara', values: [17.7, 2.4, 5.3, -1.5, 4.3] },
  { county: 'Orange, CA', values: [16.4, 3.0, 9.8, 0.5, 3.2] },
  { county: 'Honolulu, HI', values: [13.7, -2.5, 0.1, -1.8, 2.6] }
];
// Compact end-year labels prevent the five columns from merging at mobile size.
// The subtitle and footer define these as September-to-September annual changes.
const years = ["'22","'23","'24","'25","'26"];

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
async function textLayer(text, left, top, width, fontSize, color, weight='regular', align='left', height=100) {
  const fontfile = weight === 'medium' ? mediumFont : regularFont;
  const font = `Geist ${fontSize}`;
  const markup = `<span foreground="${color}">${esc(text)}</span>`;
  // Do not pass width/height to Sharp's Pango renderer. Supplying a box enables
  // content-dependent autofit, which made equal-priority values render at
  // different sizes. Render at one fixed DPI, then position the raster inside
  // the requested box so every label of a given role has identical typography.
  const input = await sharp({ text: { text: markup, font, fontfile, rgba: true, dpi: 96 } }).png().toBuffer();
  const meta = await sharp(input).metadata();
  const renderedWidth = meta.width || 0;
  const renderedHeight = meta.height || 0;
  let positionedLeft = left;
  if (align === 'center') positionedLeft = left + Math.max(0, Math.round((width - renderedWidth) / 2));
  if (align === 'right') positionedLeft = left + Math.max(0, width - renderedWidth);
  const positionedTop = top + Math.max(0, Math.round((height - renderedHeight) / 2));
  return { input, left: positionedLeft, top: positionedTop };
}

function heatFill(v, latest, sf) {
  if (latest && sf) return C.gold;
  if (v >= 10) return '#0D527E';
  if (v >= 5) return '#3E8DB5';
  if (v >= 2) return '#78B7D4';
  if (v >= 0) return '#DCE6E2';
  if (v >= -2) return '#F1D79A';
  if (v >= -5) return '#EA9872';
  return '#C9484D';
}
function heatText(v, latest, sf) {
  if (latest && sf) return C.ink;
  return (v >= 5 || v <= -4) ? C.white : C.ink;
}

async function build() {
  const shapes = [];
  shapes.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#020812"/><stop offset="0.6" stop-color="#061A34"/><stop offset="1" stop-color="#020812"/></linearGradient>
      <radialGradient id="halo" cx="75%" cy="20%" r="60%"><stop offset="0" stop-color="#185FCF" stop-opacity=".16"/><stop offset="1" stop-color="#020812" stop-opacity="0"/></radialGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity=".24"/></filter>
    </defs>
    <rect width="1080" height="1350" fill="url(#bg)"/><rect width="1080" height="1350" fill="url(#halo)"/>
    <rect x="68" y="346" width="944" height="838" rx="30" fill="${C.ivory}" filter="url(#shadow)"/>
    <path d="M108 454H972" stroke="${C.line}" stroke-width="2"/>
    <rect x="108" y="478" width="864" height="100" rx="17" fill="#FFF0C9"/>
    ${rows.map((row,ri)=>row.values.map((v,ci)=>{
      const x=394+ci*115, y=493+ri*104;
      const latest=ci===4, sf=ri===0;
      return `<rect x="${x}" y="${y}" width="112" height="70" rx="11" fill="${heatFill(v,latest,sf)}"${latest?` stroke="${sf?C.darkGold:'#A8BAC5'}" stroke-width="${sf?4:2}"`:''}/>`;
    }).join('')).join('')}
  </svg>`);
  const comps = [{input:Buffer.from(shapes.join('')),left:0,top:0}];
  const logo = await sharp(logoPath).resize({width:420}).png().toBuffer();
  comps.push({input:logo,left:68,top:48});

  comps.push(await textLayer('San Francisco home values', 68, 158, 944, 54, C.white, 'medium', 'left', 68));
  comps.push(await textLayer('jumped 15.5% in one year.', 68, 220, 944, 58, C.gold, 'medium', 'left', 72));
  comps.push(await textLayer('Zillow Home Value Index · annual change to Sept. 2026', 68, 294, 944, 24, C.pale, 'regular', 'left', 36));

  comps.push(await textLayer('COUNTY',108,394,250,23,C.ink,'medium','left',36));
  for(let i=0;i<years.length;i++) comps.push(await textLayer(years[i],392+i*115,391,116,23,i===4?C.darkGold:C.slate,'medium','center',40));

  for(let ri=0;ri<rows.length;ri++){
    const y=493+ri*104;
    comps.push(await textLayer(rows[ri].county,121,y+18,258,26,C.ink,'medium','left',40));
    for(let ci=0;ci<5;ci++){
      const v=rows[ri].values[ci];
      const label=`${v>0?'+':''}${v.toFixed(1)}%`;
      comps.push(await textLayer(label,394+ci*115,y+19,112,24,heatText(v,ci===4,ri===0),'medium','center',40));
    }
  }

  comps.push(await textLayer('Source: ResiClub analysis of Zillow ZHVI · smoothed, seasonally adjusted.',68,1238,944,20,'#9CB1C0','regular','left',30));
  comps.push(await textLayer('All homes · Annual Sept.-to-Sept. change · Selected counties',68,1272,944,20,'#9CB1C0','regular','left',30));

  const full = path.join(outDir,'sf-price-outlier-cycle1-v6-1080x1350.png');
  const mobile = path.join(outDir,'sf-price-outlier-cycle1-v6-mobile-360x450.png');
  await sharp({create:{width:W,height:H,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite(comps).png({compressionLevel:9}).toFile(full);
  await sharp(full).resize(360,450).png({compressionLevel:9}).toFile(mobile);
  console.log(full+'\n'+mobile);
}
build().catch(e=>{console.error(e);process.exit(1)});
