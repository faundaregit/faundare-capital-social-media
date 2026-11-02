const path = require('node:path');
const sharp = require('sharp');

const W=1080,H=1350,dir=__dirname;
const assetRoot=path.join(__dirname,'..','..','assets');
const logoPath=path.join(assetRoot,'M2.1A-TW1.3-dark.svg');
const fontDir=path.join(assetRoot,'fonts');
const regular=path.join(fontDir,'Geist-Regular.ttf');
const medium=path.join(fontDir,'Geist-Medium.ttf');
const C={navy:'#061A34',navy2:'#0A2843',gold:'#F2B840',amberDark:'#765000',ivory:'#F4F1E9',ink:'#11253D',blue:'#357DA8',cyan:'#74BCD5',red:'#C85B55',white:'#FFFFFF',muted:'#65748A',line:'#D7D0C4'};
const rows=[
  {name:'HOBBIES + CRAFTS',val:19.9},
  {name:'DEPARTMENT STORES',val:11.7},
  {name:'THEATERS + MUSIC',val:7.2},
  {name:'CLOTHING',val:7.2},
  {name:'FITNESS',val:5.7},
  {name:'FURNITURE',val:2.9},
  {name:'ELECTRONICS',val:1.2}
];
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
async function textLayer(text,left,top,width,size,color,weight='regular',align='left',height=90){
  const fontfile=weight==='medium'?medium:regular;
  const input=await sharp({text:{text:`<span foreground="${color}">${esc(text)}</span>`,font:`Geist ${size}`,fontfile,rgba:true,dpi:96}}).png().toBuffer();
  const m=await sharp(input).metadata(); let x=left;
  if(align==='center')x=left+Math.max(0,Math.round((width-(m.width||0))/2));
  if(align==='right')x=left+Math.max(0,width-(m.width||0));
  return {input,left:x,top:top+Math.max(0,Math.round((height-(m.height||0))/2))};
}
async function build(){
  const svg=[];
  svg.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020914"/><stop offset=".62" stop-color="#061A34"/><stop offset="1" stop-color="#0A2843"/></linearGradient></defs><rect width="1080" height="1350" fill="url(#bg)"/><rect x="58" y="330" width="964" height="820" rx="32" fill="${C.ivory}"/>`);
  // One common origin and one linear scale keep every category comparable.
  svg.push(`<line x1="570" y1="416" x2="570" y2="1077" stroke="${C.line}" stroke-width="3"/><text x="570" y="398" text-anchor="middle" fill="${C.muted}" font-family="Geist" font-size="30" font-weight="700">0%</text>`);
  const y0=455,gap=86;
  rows.forEach((r,i)=>{
    const y=y0+i*gap; const positive=r.val>=0; const dot=i<2?C.gold:(positive?C.blue:C.red);
    // One linear scale for every category: 12 px per percentage point.
    const dx=Math.round(r.val*12);
    const end=570+dx;
    svg.push(`<line x1="570" y1="${y}" x2="${end}" y2="${y}" stroke="${dot}" stroke-width="10" stroke-linecap="round" opacity=".28"/><circle cx="${end}" cy="${y}" r="24" fill="${dot}"/>`);
  });
  svg.push(`</svg>`);
  const comps=[{input:Buffer.from(svg.join('')),left:0,top:0}];
  comps.push(await textLayer("RETAIL TRAFFIC DIDN'T",68,72,944,61,C.white,'medium','left',72));
  comps.push(await textLayer('MOVE AS ONE MARKET',68,142,944,61,C.gold,'medium','left',72));
  comps.push(await textLayer('Seven selected categories · U.S. visits · Sept. 2026 YoY',70,228,900,27,'#B6C8D9','regular','left',52));
  const labelY0=455,labelGap=86;
  for(let i=0;i<rows.length;i++){
    const r=rows[i],y=labelY0+i*labelGap,positive=r.val>=0;
    comps.push(await textLayer(r.name,106,y-31,360,29,C.ink,'medium','left',62));
    const label=(r.val>0?'+':'')+(r.val===0.12?'0.1':r.val.toFixed(1))+'%';
    const dx=Math.round(r.val*12);
    const end=570+dx;
    comps.push(await textLayer(label,end+36,y-38,150,42,i<2?C.amberDark:(positive?C.blue:C.red),'medium','left',76));
  }
  comps.push(await textLayer('National screening signal—not property-level proof.',70,1174,780,30,C.white,'medium','left',48));
  comps.push(await textLayer('Verify local visits, sales and occupancy costs.',70,1218,740,25,'#B6C8D9','regular','left',42));
  comps.push(await textLayer('Source: Colliers Retail Market Intelligence, Sept. 2026.',70,1260,650,18,'#9CB0C2','regular','left',32));
  const logo=await sharp(logoPath,{density:220}).png().resize({width:250}).toBuffer();
  comps.push({input:logo,left:762,top:1237});
  const full=path.join(dir,'retail-traffic-v7-1080x1350.png');
  const mobile=path.join(dir,'retail-traffic-v7-mobile-360x450.png');
  await sharp({create:{width:W,height:H,channels:4,background:'#061A34'}}).composite(comps).png().toFile(full);
  await sharp(full).resize(360,450).png().toFile(mobile);
  console.log(full); console.log(mobile);
}
build().catch(e=>{console.error(e);process.exit(1)});
