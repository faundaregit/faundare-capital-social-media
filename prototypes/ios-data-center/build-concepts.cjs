const path=require('node:path');
const sharp=require('sharp');
const out=__dirname;
const W=1500,H=900;

async function run(){
  const selected=await sharp(path.join(out,'ios-data-center-v3-1080x1350.png')).resize({width:410,height:512,fit:'cover'}).png().toBuffer();
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="1500" height="900" fill="#071B34"/>
  <text x="70" y="82" fill="#fff" font-family="Arial" font-size="40" font-weight="700">CURRENT CORRECTION-CYCLE CONCEPT COMPARISON</text>
  <text x="70" y="126" fill="#AFC0CC" font-family="Arial" font-size="23">Rendered after QC v1 to make the concept decision auditable; not represented as a pre-design artifact.</text>
  <g transform="translate(60 180)"><rect width="430" height="610" rx="24" fill="#F4F1E9"/>
   <text x="28" y="50" fill="#132238" font-family="Arial" font-size="27" font-weight="700">A · METRIC FIRST</text>
   <text x="28" y="145" fill="#132238" font-family="Arial" font-size="70" font-weight="700">+9.8%</text>
   <text x="28" y="190" fill="#132238" font-family="Arial" font-size="27">industrial rent premium</text>
   <rect x="28" y="242" width="340" height="30" fill="#DDE7EE"/><rect x="28" y="242" width="275" height="30" fill="#F2B840"/>
   <text x="28" y="335" fill="#7690A4" font-family="Arial" font-size="23">Clear, but visually generic.</text>
  </g>
  <g transform="translate(535 180)"><rect width="430" height="610" rx="24" fill="#0A2843" stroke="#4F7087"/>
   <text x="28" y="50" fill="#fff" font-family="Arial" font-size="27" font-weight="700">B · FLOW DIAGRAM</text>
   <rect x="42" y="146" width="120" height="76" rx="12" fill="#DDE7EE"/><text x="60" y="191" fill="#132238" font-family="Arial" font-size="20">DATA</text>
   <path d="M175 184h76" stroke="#F2B840" stroke-width="8"/><path d="M245 169l25 15-25 15" fill="#F2B840"/>
   <rect x="274" y="146" width="120" height="76" rx="12" fill="#F2B840"/><text x="294" y="191" fill="#132238" font-family="Arial" font-size="20">SPACE</text>
   <text x="28" y="335" fill="#AFC0CC" font-family="Arial" font-size="23">Logical, but too abstract for social.</text>
  </g>
  <g transform="translate(1010 180)"><rect width="430" height="610" rx="24" fill="#061A34" stroke="#F2B840" stroke-width="4"/>
   <text x="28" y="50" fill="#fff" font-family="Arial" font-size="27" font-weight="700">C · PROPERTY MECHANISM</text>
   <text x="28" y="94" fill="#F2B840" font-family="Arial" font-size="22" font-weight="700">SELECTED</text>
  </g>
  </svg>`;
  await sharp(Buffer.from(svg)).composite([{input:selected,left:1020,top:300}]).png().toFile(path.join(out,'ios-data-center-concept-comparison-v2.png'));
  console.log(path.join(out,'ios-data-center-concept-comparison-v2.png'));
}
run().catch(e=>{console.error(e);process.exit(1)});
