const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = __dirname;
const out = path.join(root, 'final');
fs.mkdirSync(out, { recursive: true });

const W = 1080, H = 1350;
const fontDir = path.join(__dirname, '..', '..', 'assets', 'fonts');
const regular = fs.readFileSync(path.join(fontDir, 'Geist-Regular.ttf')).toString('base64');
const medium = fs.readFileSync(path.join(fontDir, 'Geist-Medium.ttf')).toString('base64');
const fonts = `<style>
@font-face{font-family:Geist;src:url(data:font/truetype;base64,${regular});font-weight:400}
@font-face{font-family:Geist;src:url(data:font/truetype;base64,${medium});font-weight:600}
text{font-family:Geist,Arial,sans-serif}
</style>`;

const data = {
  WA:51.1, MT:51.1, DC:49.0, ME:45.7, MA:44.7, NE:37.5, VT:37.4, ND:34.9,
  ID:33.3, OK:32.7, RI:31.0, AR:30.8, SD:29.0, NJ:26.1, TN:26.0, TX:25.8,
  NH:25.6, SC:25.1, OR:24.6, AZ:24.2, UT:23.5, CA:22.9, NY:21.7, MD:21.7,
  CO:21.3, VA:21.0, WV:19.9, NC:19.5, KS:18.9, WY:16.7, HI:16.4, PA:16.2,
  KY:16.1, IL:15.6, CT:15.4, FL:14.5, IA:14.0, OH:13.1, DE:13.1, LA:12.7,
  GA:11.8, WI:11.4, NV:10.9, AK:10.7, AL:10.2, NM:10.0, MO:7.2, IN:6.4,
  MN:0.1, MI:-3.7, MS:-3.7
};

// Established Faundare hex-tile U.S. arrangement: 50 states plus Washington, D.C.
const matrix = [
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,1,1,0],
  [0,1,1,1,1,1,0,1,0,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,1,0,0,0],
  [1,0,0,0,1,0,0,1,0,0,0,0]
];
const states = ['AK','ME','VT','NH','WA','MT','ND','MN','WI','MI','NY','MA','RI','ID','WY','SD','IA','IL','IN','OH','PA','NJ','CT','OR','NV','CO','NE','MO','KY','WV','VA','MD','DE','CA','UT','NM','KS','AR','TN','NC','SC','DC','AZ','OK','LA','MS','AL','GA','HI','TX','FL'];

const C = {
  navy:'#061A33', white:'#F7F4EC', gold:'#F2B840', pale:'#BED3E2', muted:'#9CB5C8',
  grid:'#0B2848', negative:'#E57B67', zero:'#C9DBE4', low:'#96BED1', mid:'#5F9FC2',
  high:'#34769E', veryHigh:'#1D567D'
};

function color(v){
  if(v < 0) return C.negative;
  if(v < 10) return C.zero;
  if(v < 20) return C.low;
  if(v < 30) return C.mid;
  if(v < 40) return C.high;
  return C.gold;
}
function textColor(v){
  if(v >= 40 || v < 0) return C.navy;
  return v >= 30 ? C.white : C.navy;
}
function pct(v){ return `${v > 0 ? '+' : ''}${v.toFixed(1)}%`; }

const r = 46.5;
const apo = r * Math.cos(Math.PI/6);
const colStep = apo * 2;
const rowStep = r * 1.5;
const points = (cx,cy) => [[cx,cy-r],[cx+apo,cy-r/2],[cx+apo,cy+r/2],[cx,cy+r],[cx-apo,cy+r/2],[cx-apo,cy-r/2]].map(p=>p.join(',')).join(' ');

function mapTiles(startY=416){
  let i=0, out='';
  for(let row=0; row<matrix.length; row++){
    const offset = row % 2 ? apo : 0;
    for(let col=0; col<matrix[row].length; col++){
      if(!matrix[row][col]) continue;
      const s = states[i++];
      const v = data[s];
      const cx = 48 + apo + offset + col * colStep;
      const cy = startY + row * rowStep;
      out += `<g>
        <polygon points="${points(cx,cy)}" fill="${color(v)}" stroke="${C.grid}" stroke-width="5"/>
        <text x="${cx}" y="${cy-7}" text-anchor="middle" font-size="24" font-weight="600" fill="${textColor(v)}">${s}</text>
        <text x="${cx}" y="${cy+22}" text-anchor="middle" font-size="21" font-weight="600" fill="${textColor(v)}">${pct(v)}</text>
      </g>`;
    }
  }
  return out;
}

const defs = `<defs>
  <radialGradient id="bg" cx="82%" cy="7%" r="96%">
    <stop offset="0" stop-color="#164568"/>
    <stop offset=".48" stop-color="#0A2948"/>
    <stop offset="1" stop-color="#061A33"/>
  </radialGradient>
  <pattern id="grain" width="18" height="18" patternUnits="userSpaceOnUse">
    <circle cx="4" cy="5" r=".7" fill="#FFF" opacity=".022"/>
    <circle cx="14" cy="13" r=".55" fill="#FFF" opacity=".016"/>
  </pattern>
</defs>`;

const legend = [
  ['Decline', C.negative], ['0–10%', C.zero], ['10–20%', C.low],
  ['20–30%', C.mid], ['30–40%', C.high], ['40%+', C.gold]
].map((d,i)=>`<g transform="translate(${62+(i%3)*300} ${1024+Math.floor(i/3)*55})">
  <rect width="34" height="24" rx="6" fill="${d[1]}"/>
  <text x="49" y="22" font-size="24" fill="${C.white}">${d[0]}</text>
</g>`).join('');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${fonts}${defs}
<rect width="1080" height="1350" fill="url(#bg)"/>
<rect width="1080" height="1350" fill="url(#grain)"/>

<text x="62" y="72" font-size="21" font-weight="600" letter-spacing="2.5" fill="#8CC5E4">REAL HOUSEHOLD INCOME · 2000–2025</text>
<text x="62" y="151" font-size="64" font-weight="600" letter-spacing="-1.2" fill="${C.white}">48 STATES GAINED</text>
<text x="62" y="220" font-size="64" font-weight="600" letter-spacing="-1.2" fill="${C.white}">PURCHASING POWER</text>
<text x="62" y="271" font-size="25" fill="${C.pale}">Inflation-adjusted median household income change</text>

<g transform="translate(790 238)">
  <rect width="228" height="62" rx="31" fill="#F2B840"/>
  <text x="114" y="27" text-anchor="middle" font-size="15" font-weight="600" letter-spacing="1.5" fill="${C.navy}">U.S. BENCHMARK</text>
  <text x="114" y="51" text-anchor="middle" font-size="24" font-weight="600" fill="${C.navy}">+18.9%</text>
</g>

${mapTiles()}

<text x="62" y="990" font-size="19" font-weight="600" letter-spacing="1.6" fill="${C.muted}">REAL INCOME CHANGE</text>
${legend}
<text x="62" y="1227" font-size="18" fill="${C.muted}">50 STATES + WASHINGTON, D.C. · VALUES SHOW REAL INCOME CHANGE</text>
<text x="62" y="1272" font-size="16" fill="${C.muted}">SOURCE: U.S. CENSUS BUREAU · VISUAL CAPITALIST · 2025 DATA</text>
</svg>`;

fs.writeFileSync(path.join(out, 'post-v5.svg'), svg);

async function render(){
  const logoPath = path.join(root, '..', '..', 'assets', 'M2.1A-TW1.3-dark.svg');
  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  const logo = await sharp(logoPath, {density:192}).resize({width:270,height:54,fit:'contain'}).png().toBuffer();
  const full = await sharp(base).composite([{input:logo,left:742,top:1233}]).png({compressionLevel:9}).toBuffer();
  await sharp(full).toFile(path.join(out, 'post-v5-1080x1350.png'));
  await sharp(full).resize(360,450).png({compressionLevel:9}).toFile(path.join(out, 'post-v5-mobile-proof.png'));
}

render().catch(e=>{console.error(e);process.exit(1)});
