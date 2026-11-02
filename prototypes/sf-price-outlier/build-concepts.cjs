const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const W = 1080;
const H = 1350;
const out = __dirname;
const assetRoot = path.join(__dirname, '..', '..', 'assets');
const logoPath = path.join(assetRoot, 'M2.1A-TW1.3-dark.svg');
const fontDir = path.join(assetRoot, 'fonts');
const regular = fs.readFileSync(path.join(fontDir, 'Geist-Regular.ttf')).toString('base64');
const medium = fs.readFileSync(path.join(fontDir, 'Geist-Medium.ttf')).toString('base64');

const colors = {
  navy: '#06182D', ink: '#0B2943', deep: '#0D3554', gold: '#F2B840',
  ivory: '#F7F2E8', white: '#FFFFFF', blue: '#68B8DF', slate: '#9EB4C4',
  pale: '#DDE7ED', grid: '#24445E', darkGold: '#C9860A'
};

const defs = `
<defs>
  <style>
    @font-face{font-family:Geist;src:url(data:font/ttf;base64,${regular});font-weight:400}
    @font-face{font-family:Geist;src:url(data:font/ttf;base64,${medium});font-weight:600}
    @font-face{font-family:Geist;src:url(data:font/ttf;base64,${medium});font-weight:700}
    @font-face{font-family:Geist;src:url(data:font/ttf;base64,${medium});font-weight:800}
    @font-face{font-family:Geist;src:url(data:font/ttf;base64,${medium});font-weight:900}
  </style>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06182D"/><stop offset="0.6" stop-color="#0A2B48"/><stop offset="1" stop-color="#06182D"/></linearGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#D18C0D"/><stop offset="0.55" stop-color="#F2B840"/><stop offset="1" stop-color="#FFD46D"/></linearGradient>
  <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#000" flood-opacity=".25"/></filter>
</defs>`;

const footer = `
  <text x="68" y="1290" fill="${colors.slate}" font-family="Geist" font-size="22">Source: ResiClub county-level home-price analysis · September 2026</text>`;

const base = (content) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs}<rect width="1080" height="1350" fill="url(#bg)"/>${content}${footer}</svg>`;

const conceptA = base(`
  <text x="68" y="210" fill="${colors.white}" font-family="Geist" font-size="64" font-weight="800" letter-spacing="-2.2">San Francisco pulled away.</text>
  <text x="68" y="264" fill="${colors.pale}" font-family="Geist" font-size="28" font-weight="600">Year-over-year home-price change · regional leaders</text>

  <g transform="translate(68 354)">
    <rect width="944" height="762" rx="34" fill="#F7F2E8" filter="url(#shadow)"/>
    <text x="54" y="74" fill="${colors.ink}" font-family="Geist" font-size="25" font-weight="700">SEPTEMBER 2026</text>
    <text x="890" y="74" text-anchor="end" fill="#617487" font-family="Geist" font-size="23">Largest county markets in each U.S. region</text>

    <g transform="translate(54 118)" font-family="Geist">
      <g transform="translate(0 0)">
        <text x="0" y="42" fill="${colors.ink}" font-size="31" font-weight="800">San Francisco, CA</text>
        <rect x="318" y="9" width="518" height="56" rx="14" fill="url(#gold)"/>
        <text x="866" y="49" text-anchor="end" fill="${colors.ink}" font-size="39" font-weight="900">+15.5%</text>
      </g>
      <g transform="translate(0 112)">
        <text x="0" y="42" fill="${colors.ink}" font-size="29" font-weight="700">Westchester, NY</text>
        <rect x="318" y="12" width="261" height="50" rx="12" fill="${colors.blue}"/>
        <text x="606" y="48" fill="${colors.ink}" font-size="36" font-weight="800">+7.8%</text>
      </g>
      <g transform="translate(0 220)">
        <text x="0" y="42" fill="${colors.ink}" font-size="29" font-weight="700">Waukesha, WI</text>
        <rect x="318" y="12" width="201" height="50" rx="12" fill="#7C9FB4"/>
        <text x="546" y="48" fill="${colors.ink}" font-size="36" font-weight="800">+6.0%</text>
      </g>
      <g transform="translate(0 328)">
        <text x="0" y="42" fill="${colors.ink}" font-size="29" font-weight="700">Jefferson, TX</text>
        <rect x="318" y="12" width="137" height="50" rx="12" fill="#9CB1BE"/>
        <text x="482" y="48" fill="${colors.ink}" font-size="36" font-weight="800">+4.1%</text>
      </g>
      <g transform="translate(0 436)">
        <text x="0" y="42" fill="${colors.ink}" font-size="29" font-weight="700">Pulaski, AR</text>
        <rect x="318" y="12" width="134" height="50" rx="12" fill="#B4C3CC"/>
        <text x="479" y="48" fill="${colors.ink}" font-size="36" font-weight="800">+4.0%</text>
      </g>
    </g>

    <g transform="translate(54 660)">
      <rect width="836" height="2" fill="#D7D0C5"/>
      <text x="0" y="54" fill="${colors.ink}" font-family="Geist" font-size="31" font-weight="800">Nearly 2× the next regional leader.</text>
    </g>
  </g>
`);

const conceptB = base(`
  <text x="68" y="205" fill="${colors.white}" font-family="Geist" font-size="64" font-weight="800" letter-spacing="-2.2">A different housing cycle.</text>
  <text x="68" y="260" fill="${colors.pale}" font-family="Geist" font-size="28" font-weight="600">Home-price growth across five regional leaders</text>

  <g transform="translate(68 338)">
    <rect width="944" height="786" rx="34" fill="#0B2943" stroke="#2A4B65" stroke-width="2"/>
    <g opacity=".7" stroke="#34536B" stroke-width="2">
      <path d="M80 642H878"/><path d="M80 500H878"/><path d="M80 358H878"/><path d="M80 216H878"/>
    </g>
    <g fill="#7690A3" font-family="Geist" font-size="19"><text x="34" y="650">0%</text><text x="28" y="508">5%</text><text x="18" y="366">10%</text><text x="18" y="224">15%</text></g>

    <g transform="translate(94 0)" font-family="Geist">
      <g transform="translate(0 0)">
        <rect x="0" y="201" width="142" height="441" rx="22" fill="url(#gold)"/>
        <path d="M16 201V165h34v36M57 201v-82h28v82M91 201v-122h35v122" fill="${colors.gold}" opacity=".82"/>
        <text x="71" y="145" text-anchor="middle" fill="${colors.gold}" font-size="48" font-weight="900">15.5%</text>
        <text x="71" y="690" text-anchor="middle" fill="${colors.white}" font-size="18" font-weight="800">SAN FRANCISCO</text>
        <text x="71" y="720" text-anchor="middle" fill="${colors.slate}" font-size="19">CALIFORNIA</text>
      </g>
      <g transform="translate(171 0)">
        <rect x="0" y="420" width="142" height="222" rx="22" fill="${colors.blue}"/>
        <text x="71" y="398" text-anchor="middle" fill="${colors.blue}" font-size="39" font-weight="900">7.8%</text>
        <text x="71" y="690" text-anchor="middle" fill="${colors.white}" font-size="17" font-weight="800">WESTCHESTER</text>
        <text x="71" y="720" text-anchor="middle" fill="${colors.slate}" font-size="19">NEW YORK</text>
      </g>
      <g transform="translate(342 0)">
        <rect x="0" y="471" width="142" height="171" rx="22" fill="#7597AC"/>
        <text x="71" y="449" text-anchor="middle" fill="#AFC9D8" font-size="36" font-weight="900">6.0%</text>
        <text x="71" y="690" text-anchor="middle" fill="${colors.white}" font-size="18" font-weight="800">WAUKESHA</text>
        <text x="71" y="720" text-anchor="middle" fill="${colors.slate}" font-size="19">WISCONSIN</text>
      </g>
      <g transform="translate(513 0)">
        <rect x="0" y="525" width="142" height="117" rx="22" fill="#8EA8B8"/>
        <text x="71" y="503" text-anchor="middle" fill="#BFD0D9" font-size="34" font-weight="900">4.1%</text>
        <text x="71" y="690" text-anchor="middle" fill="${colors.white}" font-size="18" font-weight="800">JEFFERSON</text>
        <text x="71" y="720" text-anchor="middle" fill="${colors.slate}" font-size="19">TEXAS</text>
      </g>
      <g transform="translate(684 0)">
        <rect x="0" y="528" width="142" height="114" rx="22" fill="#A3B5C0"/>
        <text x="71" y="506" text-anchor="middle" fill="#D1DDE3" font-size="34" font-weight="900">4.0%</text>
        <text x="71" y="690" text-anchor="middle" fill="${colors.white}" font-size="18" font-weight="800">PULASKI</text>
        <text x="71" y="720" text-anchor="middle" fill="${colors.slate}" font-size="19">ARKANSAS</text>
      </g>
    </g>
  </g>
`);

const conceptC = base(`
  <text x="68" y="206" fill="${colors.white}" font-family="Geist" font-size="64" font-weight="800" letter-spacing="-2.2">One market stands alone.</text>
  <text x="68" y="262" fill="${colors.pale}" font-family="Geist" font-size="28" font-weight="600">Year-over-year home-price growth · September 2026</text>

  <g transform="translate(68 353)">
    <rect width="944" height="764" rx="34" fill="${colors.ivory}" filter="url(#shadow)"/>
    <text x="54" y="74" fill="${colors.ink}" font-family="Geist" font-size="24" font-weight="800">REGIONAL LEADERS</text>

    <g transform="translate(64 142)" font-family="Geist">
      <path d="M0 252H806" stroke="#B9C5CB" stroke-width="5" stroke-linecap="round"/>
      <g stroke="#D8DFE3" stroke-width="2"><path d="M0 225V279"/><path d="M252 225V279"/><path d="M504 225V279"/><path d="M756 225V279"/></g>
      <g fill="#738695" font-size="19"><text x="0" y="316" text-anchor="middle">0%</text><text x="252" y="316" text-anchor="middle">5%</text><text x="504" y="316" text-anchor="middle">10%</text><text x="756" y="316" text-anchor="middle">15%</text></g>

      <g>
        <circle cx="781" cy="252" r="36" fill="${colors.gold}"/>
        <path d="M781 216V98" stroke="${colors.gold}" stroke-width="5"/>
        <rect x="556" y="0" width="250" height="104" rx="20" fill="${colors.ink}"/>
        <text x="580" y="40" fill="${colors.white}" font-size="25" font-weight="800">SAN FRANCISCO</text>
        <text x="580" y="82" fill="${colors.gold}" font-size="40" font-weight="900">+15.5%</text>
      </g>

      <g>
        <circle cx="393" cy="252" r="21" fill="${colors.blue}"/>
        <path d="M393 273V390" stroke="${colors.blue}" stroke-width="4"/>
        <text x="393" y="430" text-anchor="middle" fill="${colors.ink}" font-size="23" font-weight="800">WESTCHESTER</text>
        <text x="393" y="466" text-anchor="middle" fill="#2B789E" font-size="31" font-weight="900">+7.8%</text>
      </g>

      <g>
        <circle cx="302" cy="252" r="18" fill="#7A9CAF"/>
        <path d="M302 231V155" stroke="#7A9CAF" stroke-width="4"/>
        <text x="302" y="123" text-anchor="middle" fill="${colors.ink}" font-size="19" font-weight="800">WAUKESHA</text>
        <text x="302" y="88" text-anchor="middle" fill="#587B8F" font-size="28" font-weight="900">+6.0%</text>
      </g>

      <g>
        <circle cx="207" cy="252" r="16" fill="#97ABB7"/>
        <path d="M207 273V365" stroke="#97ABB7" stroke-width="4"/>
        <text x="178" y="405" text-anchor="middle" fill="${colors.ink}" font-size="19" font-weight="800">JEFFERSON</text>
        <text x="178" y="440" text-anchor="middle" fill="#6E8796" font-size="28" font-weight="900">+4.1%</text>
      </g>

      <g>
        <circle cx="202" cy="252" r="11" fill="#C2CDD3" stroke="${colors.ivory}" stroke-width="4"/>
        <path d="M202 231V178" stroke="#B2C0C7" stroke-width="3"/>
        <text x="172" y="149" text-anchor="middle" fill="${colors.ink}" font-size="19" font-weight="800">PULASKI</text>
        <text x="172" y="116" text-anchor="middle" fill="#7F929E" font-size="27" font-weight="900">+4.0%</text>
      </g>
    </g>

    <g transform="translate(54 632)">
      <rect width="836" height="78" rx="18" fill="#E9E1D3"/>
      <text x="34" y="50" fill="${colors.ink}" font-family="Geist" font-size="30" font-weight="800">The gap is the story—not the national average.</text>
    </g>
  </g>
`);

const heatRows = [
  { county: 'San Francisco', values: [-0.4, -9.6, 0.2, -0.9, 15.5] },
  { county: 'Anchorage, AK', values: [5.6, 3.4, 1.2, 3.7, 5.4] },
  { county: 'San Mateo, CA', values: [6.6, -5.0, 3.1, -0.7, 4.4] },
  { county: 'Santa Barbara, CA', values: [17.7, 2.4, 8.1, -1.5, 4.2] },
  { county: 'Orange, CA', values: [16.4, 3.0, 9.9, 0.5, 3.2] },
  { county: 'Honolulu, HI', values: [11.2, -2.8, 0.1, -1.8, 2.6] }
];

function heatFill(v, latest, sf) {
  if (latest && sf) return '#F2B840';
  if (v >= 10) return '#0B4F7B';
  if (v >= 5) return '#3B87AE';
  if (v >= 2) return '#75B4D1';
  if (v >= 0) return '#DCE5DF';
  if (v >= -2) return '#F2D8A2';
  if (v >= -5) return '#E99872';
  return '#C94A4A';
}

const years = ['2021→22', '2022→23', '2023→24', '2024→25', '2025→26'];
const heatCells = heatRows.map((row, ri) => {
  const y = 130 + ri * 102;
  const bg = ri === 0 ? '<rect x="40" y="-12" width="864" height="92" rx="16" fill="#FFF0C9"/>' : '';
  const label = `<text x="54" y="45" fill="${colors.ink}" font-family="Geist" font-size="28" font-weight="${ri===0?800:700}">${row.county}</text>`;
  const cells = row.values.map((v, ci) => {
    const x = 336 + ci * 110;
    const fill = heatFill(v, ci===4, ri===0);
    const t = (ci===4 && ri===0) || v >= 5 || v <= -4 ? colors.white : colors.ink;
    const stroke = ci===4 ? ` stroke="${ri===0?colors.darkGold:'#AABBC5'}" stroke-width="${ri===0?4:2}"` : '';
    return `<rect x="${x}" y="0" width="104" height="70" rx="10" fill="${fill}"${stroke}/><text x="${x+52}" y="46" text-anchor="middle" fill="${t}" font-family="Geist" font-size="28" font-weight="800" letter-spacing="-0.8">${v>0?'+':''}${v.toFixed(1)}%</text>`;
  }).join('');
  return `<g transform="translate(0 ${y})">${bg}${label}${cells}</g>`;
}).join('');

const conceptD = base(`
  <text x="68" y="198" fill="${colors.white}" font-family="Geist" font-size="64" font-weight="800" letter-spacing="-2">San Francisco broke out.</text>
  <text x="68" y="252" fill="${colors.pale}" font-family="Geist" font-size="27" font-weight="600">Five years of annual home-price shifts · selected Western counties</text>

  <g transform="translate(68 326)">
    <rect width="944" height="826" rx="32" fill="${colors.ivory}" filter="url(#shadow)"/>
    <text x="54" y="65" fill="${colors.ink}" font-family="Geist" font-size="23" font-weight="800">COUNTY</text>
    ${years.map((year,i)=>`<text x="${388+i*110}" y="50" text-anchor="middle" fill="${i===4?colors.darkGold:'#5F7484'}" font-family="Geist" font-size="20" font-weight="800"><tspan x="${388+i*110}">SEPT.</tspan><tspan x="${388+i*110}" dy="23">${year}</tspan></text>`).join('')}
    <path d="M40 96H904" stroke="#CBC4B8" stroke-width="2"/>
    ${heatCells}
    <g transform="translate(40 751)">
      <text x="0" y="0" fill="${colors.ink}" font-family="Geist" font-size="28" font-weight="800">The 2026 jump followed four uneven years.</text>
      <text x="0" y="42" fill="#5E7281" font-family="Geist" font-size="22" font-weight="600">Local cycles can separate sharply from the regional narrative.</text>
    </g>
  </g>
`);

async function render(name, svg) {
  const logo = await sharp(logoPath).resize({ width: 420 }).png().toBuffer();
  const full = path.join(out, `${name}-1080x1350.png`);
  const mobile = path.join(out, `${name}-mobile-360x450.png`);
  await sharp(Buffer.from(svg)).composite([{ input: logo, left: 68, top: 48 }]).png({ compressionLevel: 9 }).toFile(full);
  await sharp(full).resize(360, 450).png({ compressionLevel: 9 }).toFile(mobile);
  return full;
}

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const files = [];
  files.push(await render('concept-a-ranked-bars', conceptA));
  files.push(await render('concept-b-city-columns', conceptB));
  files.push(await render('concept-c-outlier-line', conceptC));
  files.push(await render('concept-d-reference-heatmap', conceptD));
  const thumbs = await Promise.all(files.map(f => sharp(f).resize(324, 405).toBuffer()));
  const sheet = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="540"><rect width="1080" height="540" fill="#E9EDF0"/><text x="54" y="55" fill="#06182D" font-family="Arial" font-size="27" font-weight="700">SAN FRANCISCO PRICE OUTLIER · CONCEPT COMPARISON</text><text x="54" y="92" fill="#536A7B" font-family="Arial" font-size="20">A · ranked bars   B · city columns   C · outlier line</text></svg>`);
  await sharp(sheet).composite(thumbs.map((input,i)=>({input,left:54+i*342,top:112}))).png().toFile(path.join(out,'concept-comparison.png'));
  console.log(files.join('\n'));
}

main().catch(e => { console.error(e); process.exit(1); });
