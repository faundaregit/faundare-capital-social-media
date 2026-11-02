const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = __dirname;
const out = path.join(root, 'draft');
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

const rows = fs.readFileSync(path.join(root, 'data-v1.csv'), 'utf8').trim().split(/\r?\n/).slice(1);
const data = {};
for (const line of rows) {
  const [state, abbr, rpp, lower, upper] = line.split(',');
  data[abbr] = { state, rpp:+rpp, lower:+lower, upper:+upper };
}

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
  navy:'#061A33', white:'#F7F4EC', gold:'#F2B840', pale:'#BED3E2', muted:'#95AEC1',
  grid:'#0B2848', b1:'#BFD8E6', b2:'#8DBCD4', b3:'#5D9DBF', b4:'#34769E', b5:'#F2B840'
};

function color(v){
  if(v < 60) return C.b1;
  if(v < 65) return C.b2;
  if(v < 70) return C.b3;
  if(v < 73) return C.b4;
  return C.b5;
}
function textColor(v){ return v >= 70 && v < 73 ? C.white : C.navy; }
function rangeBand(v){
  return { fill:C.white, opacity:.74 };
}

const r = 46.5;
const apo = r * Math.cos(Math.PI/6);
const colStep = apo * 2;
const rowStep = r * 1.5;
const points = (cx,cy) => [[cx,cy-r],[cx+apo,cy-r/2],[cx+apo,cy+r/2],[cx,cy+r],[cx-apo,cy+r/2],[cx-apo,cy-r/2]].map(p=>p.join(',')).join(' ');

function mapTiles(startY=432){
  let i=0, out='';
  for(let row=0; row<matrix.length; row++){
    const offset = row % 2 ? apo : 0;
    for(let col=0; col<matrix[row].length; col++){
      if(!matrix[row][col]) continue;
      const s = states[i++];
      const d = data[s];
      const band = rangeBand(d.lower);
      const cx = 48 + apo + offset + col * colStep;
      const cy = startY + row * rowStep;
      out += `<g>
        <polygon points="${points(cx,cy)}" fill="${color(d.lower)}" stroke="${C.grid}" stroke-width="5"/>
        <text x="${cx}" y="${cy-9}" text-anchor="middle" font-size="24" font-weight="600" fill="${textColor(d.lower)}">${s}</text>
        <rect x="${cx-36}" y="${cy+1}" width="72" height="29" rx="7" fill="${band.fill}" opacity="${band.opacity}"/>
        <text x="${cx}" y="${cy+22}" text-anchor="middle" font-size="24" font-weight="600" letter-spacing="-1" fill="${C.navy}">${d.lower}–${d.upper}</text>
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

const legendItems = [
  ['Under $60K', C.b1], ['$60–64K', C.b2], ['$65–69K', C.b3], ['$70–72K', C.b4], ['$73K+', C.b5]
];
const legend = legendItems.map((d,i)=>{
  const row = i < 3 ? 0 : 1;
  const col = row === 0 ? i : i - 3;
  const x = row === 0 ? 64 + col*305 : 218 + col*305;
  const y = 1044 + row*48;
  return `<g transform="translate(${x} ${y})">
    <rect width="34" height="24" rx="6" fill="${d[1]}"/>
    <text x="48" y="22" font-size="24" fill="${C.white}">${d[0]}</text>
  </g>`;
}).join('');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${fonts}${defs}
<rect width="1080" height="1350" fill="url(#bg)"/>
<rect width="1080" height="1350" fill="url(#grain)"/>

<text x="62" y="77" font-size="21" font-weight="600" letter-spacing="2.6" fill="#8CC5E4">2024 · THREE-PERSON HOUSEHOLD</text>
<text x="62" y="155" font-size="54" font-weight="600" letter-spacing="-1.2" fill="${C.white}">HOW MUCH HOUSEHOLD INCOME</text>
<text x="62" y="222" font-size="58" font-weight="600" letter-spacing="-1.2" fill="${C.gold}">IS “MIDDLE CLASS”?</text>
<text x="62" y="274" font-size="25" fill="${C.pale}">Estimated middle-income range ($K) in every state</text>

<g transform="translate(730 296)">
  <rect width="288" height="76" rx="38" fill="${C.gold}"/>
  <text x="144" y="28" text-anchor="middle" font-size="15" font-weight="600" letter-spacing="1.5" fill="${C.navy}">NATIONAL RANGE</text>
  <text x="144" y="57" text-anchor="middle" font-size="25" font-weight="600" fill="${C.navy}">$66.7K–$200K</text>
</g>

${mapTiles()}

<text x="62" y="1011" font-size="20" font-weight="600" letter-spacing="1.5" fill="${C.muted}">COLOR = LOWER END OF EACH STATE’S RANGE</text>
${legend}

<text x="62" y="1162" font-size="20" fill="${C.pale}">The same annual household income can fall into different income tiers across states.</text>
<text x="62" y="1214" font-size="15.5" fill="${C.muted}">ESTIMATE = PEW 3-PERSON BENCHMARK × 2024 BEA STATE RPP ÷ 100</text>
<text x="62" y="1247" font-size="15.5" fill="${C.muted}">ROUNDED TO NEAREST $1K · D.C. INCLUDED · STATEWIDE AVERAGES</text>
</svg>`;

fs.writeFileSync(path.join(out, 'post-v3.svg'), svg);

async function render(){
  const logoPath = path.join(root, '..', '..', 'assets', 'M2.1A-TW1.3-dark.svg');
  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  const logo = await sharp(logoPath, {density:192}).resize({width:285,height:58,fit:'contain'}).png().toBuffer();
  const full = await sharp(base).composite([{input:logo,left:730,top:1235}]).png({compressionLevel:9}).toBuffer();
  await sharp(full).toFile(path.join(out, 'post-v3-1080x1350.png'));
  await sharp(full).resize(360,450).png({compressionLevel:9}).toFile(path.join(out, 'post-v3-mobile-proof.png'));
}

render().catch(e=>{console.error(e);process.exit(1)});
