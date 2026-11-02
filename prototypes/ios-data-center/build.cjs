const path = require('node:path');
const sharp = require('sharp');

const W = 1080, H = 1350;
const outDir = __dirname;
const assetRoot = path.join(__dirname, '..', '..', 'assets');
const logoPath = path.join(assetRoot, 'M2.1A-TW1.3-dark.svg');
const fontDir = path.join(assetRoot, 'fonts');
const regularFont = path.join(fontDir, 'Geist-Regular.ttf');
const mediumFont = path.join(fontDir, 'Geist-Medium.ttf');

const C = { navy:'#061A34', navy2:'#0A2843', ink:'#132238', gold:'#F2B840',
  ivory:'#F4F1E9', white:'#FFFFFF', cyan:'#63C3E6', blue:'#1E6FA3',
  slate:'#7690A4', pale:'#DDE7EE', asphalt:'#263746', green:'#78A890' };

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
async function textLayer(text,left,top,width,fontSize,color,weight='regular',align='left',height=100){
  const fontfile = weight==='medium'?mediumFont:regularFont;
  const input = await sharp({text:{text:`<span foreground="${color}">${esc(text)}</span>`,font:`Geist ${fontSize}`,fontfile,rgba:true,dpi:96}}).png().toBuffer();
  const m=await sharp(input).metadata(); let x=left;
  if(align==='center') x=left+Math.max(0,Math.round((width-(m.width||0))/2));
  if(align==='right') x=left+Math.max(0,width-(m.width||0));
  return {input,left:x,top:top+Math.max(0,Math.round((height-(m.height||0))/2))};
}

function truck(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="0" y="18" width="56" height="28" rx="4" fill="#F7F9FA"/><rect x="56" y="25" width="25" height="21" rx="3" fill="#F2B840"/>
  <path d="M61 25h11l8 9H61z" fill="#18344F"/><circle cx="17" cy="49" r="7" fill="#061A34"/><circle cx="66" cy="49" r="7" fill="#061A34"/>
  <circle cx="17" cy="49" r="3" fill="#AFC0CC"/><circle cx="66" cy="49" r="3" fill="#AFC0CC"/></g>`}

async function build(){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#020812"/><stop offset=".56" stop-color="#061A34"/><stop offset="1" stop-color="#0A2843"/></linearGradient>
    <radialGradient id="glow" cx="72%" cy="34%" r="62%"><stop offset="0" stop-color="#1680BA" stop-opacity=".24"/><stop offset="1" stop-color="#061A34" stop-opacity="0"/></radialGradient>
    <linearGradient id="land" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#36505E"/><stop offset="1" stop-color="#182C3B"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000" flood-opacity=".32"/></filter>
    <filter id="soft"><feGaussianBlur stdDeviation="30"/></filter>
  </defs>
  <rect width="1080" height="1350" fill="url(#bg)"/><rect width="1080" height="1350" fill="url(#glow)"/>
  <circle cx="874" cy="196" r="142" fill="#1A6C9B" opacity=".12" filter="url(#soft)"/>

  <!-- primary illustrated property scene -->
  <g filter="url(#shadow)">
    <path d="M76 528 L534 338 L1007 546 L548 795 Z" fill="url(#land)" stroke="#5D7787" stroke-width="2"/>
    <path d="M81 691 L548 934 L1006 690 L548 795 Z" fill="#0B1824" opacity=".58"/>
    <!-- data center building -->
    <path d="M532 426 L846 554 L846 718 L532 586 Z" fill="#DDE7EE"/>
    <path d="M846 554 L952 509 L952 670 L846 718 Z" fill="#AFC1CD"/>
    <path d="M532 426 L638 380 L952 509 L846 554 Z" fill="#F5F8FA"/>
    <g fill="#21445E"><rect x="579" y="498" width="42" height="64" rx="3"/><rect x="638" y="523" width="42" height="64" rx="3"/><rect x="697" y="547" width="42" height="64" rx="3"/><rect x="756" y="571" width="42" height="64" rx="3"/></g>
    <g fill="#63C3E6"><rect x="585" y="506" width="30" height="5"/><rect x="644" y="531" width="30" height="5"/><rect x="703" y="555" width="30" height="5"/><rect x="762" y="579" width="30" height="5"/></g>
    <g fill="#728A99"><ellipse cx="671" cy="423" rx="38" ry="15"/><ellipse cx="760" cy="459" rx="38" ry="15"/><ellipse cx="849" cy="495" rx="38" ry="15"/></g>
    <path d="M825 401V468" stroke="#63C3E6" stroke-width="3"/>
    <circle cx="825" cy="468" r="6" fill="#63C3E6"/>
    <rect x="700" y="350" width="250" height="54" rx="27" fill="#061A34" stroke="#63C3E6" stroke-width="2"/>
    <!-- nearby industrial building -->
    <path d="M130 591 L405 478 L579 552 L300 679 Z" fill="#D8E3E9"/>
    <path d="M300 679 L579 552 L579 661 L300 793 Z" fill="#A9BCC8"/>
    <path d="M130 591 L300 679 L300 793 L130 704 Z" fill="#C8D6DE"/>
    <g fill="#173A55"><rect x="169" y="628" width="37" height="69"/><rect x="222" y="655" width="37" height="69"/></g>
    <g fill="#63C3E6"><rect x="176" y="637" width="23" height="5"/><rect x="229" y="664" width="23" height="5"/></g>
    <!-- no vehicles are placed on the building facade; road traffic appears below -->
    <!-- road and flow -->
    <path d="M89 782 C302 874 458 893 687 810 C809 765 900 731 1004 712" fill="none" stroke="#09131C" stroke-width="82" opacity=".84"/>
    <path d="M89 782 C302 874 458 893 687 810 C809 765 900 731 1004 712" fill="none" stroke="#F2B840" stroke-width="4" stroke-dasharray="20 20" opacity=".75"/>
    <!-- simplified road: decorative vehicles removed because they do not explain the finding -->
  </g>

  <!-- proximity label -->
  <rect x="93" y="480" width="390" height="58" rx="29" fill="#F2B840"/>

  <!-- indexed rent comparison panel -->
  <rect x="68" y="936" width="944" height="273" rx="30" fill="#F4F1E9"/>
  <rect x="108" y="1010" width="650" height="30" rx="15" fill="#B8C8D3"/>
  <rect x="108" y="1098" width="714" height="30" rx="15" fill="#F2B840"/>
  <line x1="758" y1="1005" x2="758" y2="1045" stroke="#45657B" stroke-width="2" stroke-dasharray="7 7"/>
  <line x1="758" y1="1093" x2="758" y2="1133" stroke="#45657B" stroke-width="2" stroke-dasharray="7 7"/>
  </svg>`;

  const comps=[{input:Buffer.from(svg),left:0,top:0}];
  comps.push({input:await sharp(logoPath).resize({width:430}).png().toBuffer(),left:68,top:46});
  comps.push(await textLayer('NEAR DATA CENTER CLUSTERS,',68,154,944,47,C.white,'medium','left',60));
  comps.push(await textLayer('INDUSTRIAL RENTS: +9.8%',68,211,944,52,C.gold,'medium','left',64));
  comps.push(await textLayer('CBRE compared nearby properties with industrial space elsewhere.',68,278,944,24,C.pale,'regular','left',44));
  comps.push(await textLayer('NEARBY INDUSTRIAL',108,488,360,27,C.ink,'medium','center',44));
  comps.push(await textLayer('DATA CENTER',710,356,230,27,C.white,'medium','center',42));

  comps.push(await textLayer('OTHER INDUSTRIAL',108,964,650,32,C.navy2,'medium','left',42));
  comps.push(await textLayer('100',858,998,104,34,C.ink,'medium','right',44));
  comps.push(await textLayer('NEAR 21+ OPERATING DATA CENTERS',108,1052,760,32,C.navy2,'medium','left',42));
  comps.push(await textLayer('109.8',858,1086,104,34,C.ink,'medium','right',44));
  comps.push(await textLayer('RENT INDEX · OTHER INDUSTRIAL = 100',108,1150,820,32,C.slate,'regular','left',40));
  comps.push(await textLayer('Source: CBRE Research, Q3 2026.',68,1218,944,32,'#C5D1D9','regular','left',40));
  comps.push(await textLayer('Comparison shows proximity—not causation.',68,1260,944,32,'#C5D1D9','regular','left',40));

  const full=path.join(outDir,'ios-data-center-v6-1080x1350.png');
  const mobile=path.join(outDir,'ios-data-center-v6-mobile-360x450.png');
  for (let i=0;i<comps.length;i++) {
    const m=await sharp(comps[i].input).metadata();
    if ((comps[i].left||0)+(m.width||0)>W || (comps[i].top||0)+(m.height||0)>H) console.log('overflow',i,comps[i].left,comps[i].top,m.width,m.height);
  }
  await sharp({create:{width:W,height:H,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite(comps).png({compressionLevel:9}).toFile(full);
  await sharp(full).resize(360,450).png({compressionLevel:9}).toFile(mobile);
  console.log(full+'\n'+mobile);
}
build().catch(e=>{console.error(e);process.exit(1)});
