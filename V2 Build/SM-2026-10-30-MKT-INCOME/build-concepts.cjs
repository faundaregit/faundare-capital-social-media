const fs=require('fs');
const path=require('path');
const sharp=require('sharp');
const out=path.join(__dirname,'concepts');
fs.mkdirSync(out,{recursive:true});
const base=(body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="540" height="675"><defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#06172E"/><stop offset="1" stop-color="#0B2B4D"/></linearGradient><style>.t{font:800 34px Arial;fill:#F4F1E9}.s{font:600 13px Arial;fill:#9DC7E2}.l{font:700 14px Arial;fill:#E8EDF2}.v{font:800 14px Arial;fill:#F2B840}</style></defs><rect width="540" height="675" fill="url(#b)"/><text x="35" y="55" class="s">REAL INCOME · 2000–2025</text><text x="35" y="100" class="t">48 STATES GAINED</text><text x="35" y="140" class="t">PURCHASING POWER</text>${body}</svg>`;
const vals=[['WA',51.1],['MT',51.1],['ME',45.7],['MA',44.7],['NE',37.5],['VT',37.4],['ND',34.9],['ID',33.3]];
const rowsA=vals.map((d,i)=>{let y=215+i*46,x=155+d[1]*6.3;return `<text x="40" y="${y+5}" class="l">${d[0]}</text><line x1="155" y1="${y}" x2="${x}" y2="${y}" stroke="${i<2?'#F2B840':'#77B7D8'}" stroke-width="4"/><circle cx="${x}" cy="${y}" r="7" fill="${i<2?'#F2B840':'#77B7D8'}"/><text x="${x+12}" y="${y+5}" class="v">+${d[1]}%</text>`}).join('');
const a=base(`<text x="35" y="183" class="s">A · RANKED LOLLIPOP</text>${rowsA}<line x1="274" y1="190" x2="274" y2="570" stroke="#F2B840" stroke-dasharray="4 7"/><text x="240" y="598" class="v">U.S. +18.9%</text>`);
const rowsB=vals.slice(0,6).map((d,i)=>{let y=225+i*58,a=120+i*8,b=a+d[1]*5.5;return `<text x="35" y="${y+5}" class="l">${d[0]}</text><line x1="${a}" y1="${y}" x2="${b}" y2="${y}" stroke="#77B7D8" stroke-width="5"/><circle cx="${a}" cy="${y}" r="8" fill="#F4F1E9"/><circle cx="${b}" cy="${y}" r="10" fill="#F2B840"/><text x="${b+15}" y="${y+5}" class="v">+${d[1]}%</text>`}).join('');
const b=base(`<text x="35" y="183" class="s">B · 2000 → 2025 DUMBBELLS</text>${rowsB}<text x="120" y="600" class="s">2000</text><text x="360" y="600" class="s">2025</text>`);
const cards=vals.slice(0,5).map((d,i)=>{let x=35+(i%2)*235,y=330+Math.floor(i/2)*90;return `<rect x="${x}" y="${y}" width="205" height="68" rx="16" fill="#12385C"/><text x="${x+18}" y="${y+28}" class="l">${d[0]}</text><text x="${x+18}" y="${y+54}" class="v">+${d[1]}%</text><path d="M${x+128} ${y+50} Q${x+155} ${y+10} ${x+188} ${y+26}" fill="none" stroke="#77B7D8" stroke-width="5"/>`}).join('');
const c=base(`<text x="35" y="183" class="s">C · HERO + SMALL MULTIPLES</text><text x="35" y="292" style="font:800 88px Arial;fill:#F2B840">48/50</text>${cards}`);
async function run(){
  for(const [n,s] of [['concept-a-ranked-lollipop',a],['concept-b-dumbbell',b],['concept-c-hero-multiples',c]]){
    fs.writeFileSync(path.join(out,n+'.svg'),s);
    await sharp(Buffer.from(s)).png().toFile(path.join(out,n+'.png'));
  }
  await sharp({create:{width:1620,height:675,channels:4,background:'#071A32'}})
    .composite(['concept-a-ranked-lollipop','concept-b-dumbbell','concept-c-hero-multiples'].map((n,i)=>({input:path.join(out,n+'.png'),left:i*540,top:0})))
    .png().toFile(path.join(out,'concept-comparison.png'));
}
run().catch(e=>{console.error(e);process.exit(1)});
