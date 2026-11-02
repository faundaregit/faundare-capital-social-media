const sharp = require('sharp');
const path = require('path');

const dir = __dirname;
const ref = path.join(dir, 'cre-daily-reference.png');
const ours = path.join(dir, 'ios-data-center-v6-1080x1350.png');
const out = path.join(dir, 'ios-data-center-v6-reference-comparison.png');

async function label(text, x, color) {
  return {
    input: Buffer.from(`<svg width="960" height="86"><text x="480" y="58" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="${color}">${text}</text></svg>`),
    left: x,
    top: 38,
  };
}

async function run() {
  const refCrop = await sharp(ref).extract({left:220, top:28, width:476, height:595}).resize(800,1000,{fit:'contain',background:'#061A34'}).png().toBuffer();
  const ourCrop = await sharp(ours).resize(800,1000,{fit:'contain',background:'#061A34'}).png().toBuffer();
  const note = Buffer.from(`<svg width="2040" height="110"><text x="1020" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-size="27" fill="#D9E2E8">Borrowed mechanism: immediate quantified real-estate tension.</text><text x="1020" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="27" fill="#D9E2E8">Original contribution: primary-source verification, comparable-property index, investor decision rule.</text></svg>`);
  await sharp({create:{width:2160,height:1350,channels:4,background:'#061A34'}})
    .composite([
      await label('PROVEN SOCIAL REFERENCE',80,'#F2B840'),
      await label('FAUNDARE ADAPTATION',1120,'#F2B840'),
      {input:refCrop,left:160,top:135},
      {input:ourCrop,left:1200,top:135},
      {input:note,left:60,top:1195},
    ])
    .png({compressionLevel:9})
    .toFile(out);
  console.log(out);
}
run().catch(e=>{console.error(e);process.exit(1)});
