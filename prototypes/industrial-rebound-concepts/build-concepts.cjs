const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const W = 1080;
const H = 1350;
const out = __dirname;
const assetRoot = path.join(__dirname, '..', '..', 'assets');
const logoPath = path.join(assetRoot, 'M2.1A-TW1.3-dark.svg');
const geistRegularPath = path.join(assetRoot, 'fonts', 'Geist-Regular.ttf');
const geistMediumPath = path.join(assetRoot, 'fonts', 'Geist-Medium.ttf');
const geistRegular = fs.readFileSync(geistRegularPath).toString('base64');
const geistMedium = fs.readFileSync(geistMediumPath).toString('base64');

const esc = (s) => s.replaceAll('&', '&amp;');
const baseDefs = `
  <defs>
    <style>
      @font-face { font-family: 'Geist'; src: url(data:font/ttf;base64,${geistRegular}); font-weight: 400; }
      @font-face { font-family: 'Geist'; src: url(data:font/ttf;base64,${geistMedium}); font-weight: 600 900; }
    </style>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#06182D"/><stop offset="0.55" stop-color="#0A2B49"/><stop offset="1" stop-color="#071B31"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#C58B18"/><stop offset="0.45" stop-color="#F2B840"/><stop offset="0.72" stop-color="#FFE49A"/><stop offset="1" stop-color="#D79A22"/>
    </linearGradient>
    <linearGradient id="cyan" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#4BB9D8"/><stop offset="1" stop-color="#9DE8F5"/>
    </linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.32"/></filter>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>`;

const common = (title, kicker, body) => {
  const lines = title.split('|');
  const titleSvg = lines.map((line, i) => `<tspan x="68" dy="${i === 0 ? 0 : 74}">${line}</tspan>`).join('');
  return `
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="910" cy="210" r="360" fill="#2E78A2" opacity="0.12"/>
  <circle cx="120" cy="1110" r="330" fill="#F2B840" opacity="0.055"/>
  <text x="68" y="230" fill="#8EABC2" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="3">${kicker}</text>
  <text x="68" y="300" fill="#F8F5EC" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="700" letter-spacing="-2">${titleSvg}</text>
  ${body}
  <text x="68" y="1291" fill="#8EA5B8" font-family="Arial, Helvetica, sans-serif" font-size="22">Source: JLL U.S. Industrial Market Dynamics · Q3 2026</text>
`; };

const conceptA = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${baseDefs}
${common('Modern big-box|is pulling ahead', 'INDUSTRIAL MARKET · Q3 2026', `
  <g transform="translate(68 420)">
    <rect width="944" height="650" rx="34" fill="#0B223B" stroke="#35536C" stroke-width="2"/>
    <path d="M472 30V620" stroke="#38536A" stroke-width="2" stroke-dasharray="8 12"/>

    <g transform="translate(36 52)">
      <text x="0" y="0" fill="#F2B840" font-family="Arial" font-size="21" font-weight="800" letter-spacing="2">MODERN CLASS A · 1M+ SF</text>
      <g transform="translate(8 72)" filter="url(#shadow)">
        <path d="M0 124L186 28L394 116L206 212Z" fill="#F2B840"/>
        <path d="M0 124L206 212V344L0 256Z" fill="#D39620"/>
        <path d="M206 212L394 116V246L206 344Z" fill="#B77B12"/>
        <g fill="#071B31"><rect x="233" y="221" width="48" height="75"/><rect x="294" y="190" width="48" height="75"/><rect x="355" y="160" width="30" height="73"/></g>
        <g stroke="#FFF0C1" stroke-width="5" opacity="0.8"><path d="M42 142L208 74"/><path d="M95 165L260 96"/><path d="M148 187L313 119"/></g>
      </g>
      <text x="4" y="468" fill="#F8F5EC" font-family="Georgia" font-size="58" font-weight="700">9.5% → 5.4%</text>
      <text x="6" y="510" fill="#A9BCCB" font-family="Arial" font-size="22" font-weight="700" letter-spacing="1">VACANCY</text>
      <rect x="4" y="544" width="210" height="52" rx="26" fill="#F2B840"/>
      <text x="109" y="579" text-anchor="middle" fill="#06182D" font-family="Arial" font-size="25" font-weight="900">RENTS +12.1%</text>
    </g>

    <g transform="translate(515 52)">
      <text x="0" y="0" fill="#8EABC2" font-family="Arial" font-size="21" font-weight="800" letter-spacing="2">OLDER CLASS B STOCK</text>
      <g transform="translate(14 82)" opacity="0.78">
        <path d="M0 136L166 58L372 130L206 208Z" fill="#7890A1"/>
        <path d="M0 136L206 208V342L0 270Z" fill="#50697E"/>
        <path d="M206 208L372 130V262L206 342Z" fill="#3E576D"/>
        <path d="M56 117L56 273M112 92L112 293M166 66L166 313" stroke="#A9BAC7" stroke-width="4" opacity="0.45"/>
        <g fill="#1A3045"><rect x="232" y="218" width="54" height="76"/><rect x="302" y="185" width="54" height="76"/></g>
      </g>
      <text x="0" y="468" fill="#F8F5EC" font-family="Georgia" font-size="39" font-weight="700">Occupancy declined</text>
      <text x="2" y="510" fill="#A9BCCB" font-family="Arial" font-size="22" font-weight="700" letter-spacing="1">WHILE THE MARKET RECOVERED</text>
      <path d="M2 570H352" stroke="#6E879A" stroke-width="3"/>
    </g>
  </g>
  <text x="540" y="1110" text-anchor="middle" fill="#F8F5EC" font-family="Arial" font-size="34" font-weight="800">The sector average hides two different markets.</text>
  <text x="540" y="1160" text-anchor="middle" fill="#AFC1CF" font-family="Arial" font-size="24">Building functionality now matters more than the label “industrial.”</text>
`) }
</svg>`;

const conceptB = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${baseDefs}
${common('Demand is outrunning|new supply', 'INDUSTRIAL MARKET · Q3 2026', `
  <g transform="translate(68 420)">
    <rect width="944" height="650" rx="34" fill="#F5F0E6"/>
    <text x="56" y="78" fill="#152D43" font-family="Arial" font-size="22" font-weight="800" letter-spacing="2">QUARTERLY U.S. INDUSTRIAL SPACE</text>
    <text x="56" y="119" fill="#677786" font-family="Arial" font-size="18">Million square feet</text>

    <g transform="translate(62 162)">
      <path d="M0 346 C150 338 237 290 350 248 C470 204 596 80 812 32" fill="none" stroke="#F2B840" stroke-width="22" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M0 364 C168 344 292 329 414 300 C552 267 676 232 812 192" fill="none" stroke="#2E7198" stroke-width="18" stroke-linecap="round"/>
      <path d="M0 401H812" stroke="#BCC4C9" stroke-width="2"/>
      <g fill="#152D43" opacity="0.15">
        <path d="M34 400V320h88v80zm106 0V288h118v112zm136 0V260h94v140zm112 0V226h142v174zm160 0V180h108v220zm128 0V128h136v272z"/>
      </g>
      <circle cx="812" cy="32" r="13" fill="#F2B840"/>
      <circle cx="812" cy="192" r="11" fill="#2E7198"/>
      <g transform="translate(490 18)">
        <text x="0" y="0" fill="#9B6A08" font-family="Arial" font-size="20" font-weight="800" letter-spacing="1">NET ABSORPTION</text>
        <text x="0" y="64" fill="#152D43" font-family="Georgia" font-size="67" font-weight="700">71.5M</text>
      </g>
      <g transform="translate(504 210)">
        <text x="0" y="0" fill="#315C77" font-family="Arial" font-size="20" font-weight="800" letter-spacing="1">COMPLETIONS</text>
        <text x="0" y="61" fill="#152D43" font-family="Georgia" font-size="58" font-weight="700">60.7M</text>
      </g>
    </g>
    <rect x="56" y="575" width="832" height="2" fill="#D7D0C5"/>
    <text x="56" y="620" fill="#152D43" font-family="Arial" font-size="28" font-weight="800">Demand exceeded deliveries for a second straight quarter.</text>
  </g>
  <text x="540" y="1138" text-anchor="middle" fill="#F8F5EC" font-family="Arial" font-size="31" font-weight="800">The recovery is beginning to absorb the construction pipeline.</text>
`) }
</svg>`;

const conceptC = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${baseDefs}
${common('Industrial demand is|broader than logistics', 'U.S. INDUSTRIAL LEASING · Q3 2026', `
  <g transform="translate(68 420)">
    <rect width="944" height="700" rx="34" fill="#0A233B" stroke="#35536C" stroke-width="2"/>
    <text x="472" y="72" text-anchor="middle" fill="#AFC1CF" font-family="Arial" font-size="30" font-weight="700" letter-spacing="1.5">SHARE OF ALL U.S. INDUSTRIAL LEASING</text>

    <g transform="translate(472 365)">
      <circle r="245" fill="none" stroke="#17374F" stroke-width="92"/>
      <circle r="245" fill="none" stroke="#F2B840" stroke-width="92" stroke-dasharray="276 1264" stroke-dashoffset="0" transform="rotate(-90)"/>
      <circle r="245" fill="none" stroke="#5BC1D7" stroke-width="92" stroke-dasharray="226 1314" stroke-dashoffset="-290" transform="rotate(-90)"/>
      <circle r="245" fill="none" stroke="#92AFC4" stroke-width="92" stroke-dasharray="116 1424" stroke-dashoffset="-530" transform="rotate(-90)"/>
      <circle r="245" fill="none" stroke="#D9A95A" stroke-width="92" stroke-dasharray="71 1469" stroke-dashoffset="-660" transform="rotate(-90)"/>
      <circle r="142" fill="#071B31" stroke="#3D5E76" stroke-width="2"/>
      <text x="0" y="-48" text-anchor="middle" fill="#AFC1CF" font-family="Arial" font-size="32" font-weight="800">OTHER</text>
      <text x="0" y="-10" text-anchor="middle" fill="#AFC1CF" font-family="Arial" font-size="32" font-weight="800">SECTORS</text>
      <text x="0" y="68" text-anchor="middle" fill="#F8F5EC" font-family="Georgia" font-size="58" font-weight="700">55.3%</text>
    </g>

    <g font-family="Arial" font-weight="800">
      <g transform="translate(42 176)">
        <circle cx="26" cy="26" r="26" fill="#F2B840"/>
        <g fill="none" stroke="#071B31" stroke-width="3"><path d="M11 18h24v17H11zM35 24h8l7 7v4H35z"/><circle cx="19" cy="39" r="4" fill="#071B31"/><circle cx="42" cy="39" r="4" fill="#071B31"/></g>
        <text x="70" y="24" fill="#F8F5EC" font-size="32">3PL / LOGISTICS</text><text x="70" y="80" fill="#F2B840" font-family="Georgia" font-size="58">17.9%</text>
      </g>
      <g transform="translate(680 176)">
        <circle cx="26" cy="26" r="26" fill="#5BC1D7"/>
        <g fill="none" stroke="#071B31" stroke-width="3"><rect x="11" y="13" width="30" height="10"/><rect x="16" y="25" width="30" height="10"/><rect x="11" y="37" width="30" height="10"/></g>
        <text x="70" y="8" fill="#F8F5EC" font-size="32"><tspan x="70">BUILDING /</tspan><tspan x="70" dy="37">MATERIALS</tspan></text><text x="70" y="98" fill="#5BC1D7" font-family="Georgia" font-size="58">14.7%</text>
      </g>
      <g transform="translate(42 548)">
        <circle cx="26" cy="26" r="26" fill="#92AFC4"/>
        <g fill="none" stroke="#071B31" stroke-width="3"><rect x="15" y="15" width="22" height="22" rx="2"/><path d="M20 9v6m7-6v6m7-6v6M20 37v6m7-6v6m7-6v6M9 20h6m-6 7h6m-6 7h6m22-14h6m-6 7h6m-6 7h6"/></g>
        <text x="70" y="24" fill="#F8F5EC" font-size="32">TECH / COMMS</text><text x="70" y="80" fill="#B6CBD9" font-family="Georgia" font-size="58">7.5%</text>
      </g>
      <g transform="translate(680 548)">
        <circle cx="26" cy="26" r="26" fill="#D9A95A"/>
        <path d="M29 8L14 29h12l-4 18 18-26H28z" fill="#071B31"/>
        <text x="70" y="8" fill="#F8F5EC" font-size="32"><tspan x="70">ENERGY /</tspan><tspan x="70" dy="37">UTILITIES</tspan></text><text x="70" y="98" fill="#E5B96D" font-family="Georgia" font-size="58">4.6%</text>
      </g>
    </g>
  </g>
  <text x="540" y="1147" text-anchor="middle" fill="#F8F5EC" font-family="Arial" font-size="32" font-weight="800">Data-center supply chains, manufacturing and infrastructure</text>
  <text x="540" y="1190" text-anchor="middle" fill="#F8F5EC" font-family="Arial" font-size="32" font-weight="800">are reshaping the industrial tenant mix.</text>
`) }
</svg>`;

const conceptC4 = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${baseDefs}
  <rect width="${W}" height="${H}" fill="#06182D"/>
  <path d="M0 1050C250 970 410 1110 650 1025C830 960 935 862 1080 890V1350H0Z" fill="#0A2945"/>
  <path d="M780 0H1080V420C1015 350 945 310 850 300C815 205 795 105 780 0Z" fill="#0D3353" opacity=".72"/>
  <g opacity=".14" stroke="#7CA0B8" stroke-width="1">
    <path d="M68 394H1012M68 504H1012M68 614H1012M68 724H1012M68 834H1012M68 944H1012"/>
    <path d="M272 355V980M476 355V980M680 355V980M884 355V980"/>
  </g>

  <text x="68" y="224" fill="#F8F5EC" font-family="Geist" font-size="64" font-weight="700" letter-spacing="-2.4">Four sectors drove</text>
  <text x="68" y="296" fill="#F8F5EC" font-family="Geist" font-size="64" font-weight="700" letter-spacing="-2.4">44.7% of industrial leasing.</text>
  <text x="68" y="344" fill="#9CB3C4" font-family="Geist" font-size="25" font-weight="500">Share of U.S. industrial leasing activity · Q3 2026</text>

  <g transform="translate(68 410)">
    <rect width="944" height="164" rx="24" fill="#0A253F" stroke="#24445E" stroke-width="2"/>
    <rect x="24" y="24" width="400" height="116" rx="15" fill="url(#gold)"/>
    <rect x="424" y="24" width="496" height="116" rx="15" fill="#163A56"/>
    <text x="50" y="79" fill="#06182D" font-family="Geist" font-size="27" font-weight="700">FOUR LEADING SECTORS</text>
    <text x="50" y="122" fill="#06182D" font-family="Geist" font-size="39" font-weight="800">44.7%</text>
    <text x="878" y="79" text-anchor="end" fill="#AFC1CF" font-family="Geist" font-size="25" font-weight="600">ALL OTHER SECTORS</text>
    <text x="878" y="122" text-anchor="end" fill="#F8F5EC" font-family="Geist" font-size="37" font-weight="700">55.3%</text>
  </g>

  <g transform="translate(68 628)" font-family="Geist">
    <g>
      <text x="0" y="30" fill="#F8F5EC" font-size="29" font-weight="650">Third-party logistics</text>
      <text x="944" y="30" text-anchor="end" fill="#F2B840" font-size="34" font-weight="800">17.9%</text>
      <rect x="0" y="54" width="944" height="18" rx="9" fill="#173850"/>
      <rect x="0" y="54" width="845" height="18" rx="9" fill="#F2B840"/>
    </g>
    <g transform="translate(0 126)">
      <text x="0" y="30" fill="#F8F5EC" font-size="29" font-weight="650">Construction materials + fixtures</text>
      <text x="944" y="30" text-anchor="end" fill="#62C5DD" font-size="34" font-weight="800">14.7%</text>
      <rect x="0" y="54" width="944" height="18" rx="9" fill="#173850"/>
      <rect x="0" y="54" width="694" height="18" rx="9" fill="#62C5DD"/>
    </g>
    <g transform="translate(0 252)">
      <text x="0" y="30" fill="#F8F5EC" font-size="29" font-weight="650">Communications + technology</text>
      <text x="944" y="30" text-anchor="end" fill="#B4CCDC" font-size="34" font-weight="800">7.5%</text>
      <rect x="0" y="54" width="944" height="18" rx="9" fill="#173850"/>
      <rect x="0" y="54" width="354" height="18" rx="9" fill="#9DB9CC"/>
    </g>
    <g transform="translate(0 378)">
      <text x="0" y="30" fill="#F8F5EC" font-size="29" font-weight="650">Energy + utilities</text>
      <text x="944" y="30" text-anchor="end" fill="#DCAA55" font-size="34" font-weight="800">4.6%</text>
      <rect x="0" y="54" width="944" height="18" rx="9" fill="#173850"/>
      <rect x="0" y="54" width="217" height="18" rx="9" fill="#DCAA55"/>
    </g>
  </g>

  <g transform="translate(68 1128)">
    <rect width="944" height="104" rx="20" fill="#F5F0E6"/>
    <rect width="12" height="104" rx="6" fill="#F2B840"/>
    <text x="42" y="44" fill="#0A263E" font-family="Geist" font-size="28" font-weight="750">Demand now follows power, production and infrastructure—</text>
    <text x="42" y="79" fill="#0A263E" font-family="Geist" font-size="28" font-weight="750">not logistics alone.</text>
  </g>

  <text x="68" y="1296" fill="#86A0B3" font-family="Geist" font-size="21">Source: JLL U.S. Industrial Market Dynamics · Q3 2026</text>
</svg>`;

async function render(name, svg) {
  const logo = await sharp(logoPath).resize({ width: 440 }).png().toBuffer();
  const full = path.join(out, `${name}-1080x1350.png`);
  const mobile = path.join(out, `${name}-mobile-360x450.png`);
  await sharp(Buffer.from(svg)).composite([{ input: logo, left: 68, top: 48 }]).png({ compressionLevel: 9 }).toFile(full);
  await sharp(full).resize(360, 450).png({ compressionLevel: 9 }).toFile(mobile);
}

(async () => {
  fs.mkdirSync(out, { recursive: true });
  await render('concept-a-flight-to-quality', conceptA);
  await render('concept-b-demand-vs-supply', conceptB);
  await render('concept-c-demand-drivers', conceptC);
  await render('industrial-demand-drivers-v1', conceptC);
  await render('industrial-demand-drivers-v3', conceptC);
  await render('industrial-demand-drivers-v4', conceptC4);
  console.log('Rendered three industrial rebound concepts.');
})().catch((err) => { console.error(err); process.exit(1); });
