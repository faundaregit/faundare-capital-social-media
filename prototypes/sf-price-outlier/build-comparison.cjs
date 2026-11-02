const path = require('node:path');
const sharp = require('sharp');

const dir = __dirname;
const reference = path.join(dir, 'reference-resiclub-western-counties.png');
const faundare = path.join(dir, 'sf-price-outlier-cycle1-v6-1080x1350.png');
const output = path.join(dir, 'sf-price-outlier-v6-reference-comparison.png');

(async () => {
  const ref = await sharp(reference).resize({height: 1150, fit: 'inside'}).png().toBuffer();
  const ours = await sharp(faundare).resize({height: 1150, fit: 'inside'}).png().toBuffer();
  const refMeta = await sharp(ref).metadata();
  const oursMeta = await sharp(ours).metadata();
  const label = (text, width) => sharp({
    text: {text, font: 'Arial 34', width, height: 60, align: 'center', rgba: true}
  }).png().toBuffer();
  const leftLabel = await label('REFERENCE — RESICLUB SOURCE TABLE', 920);
  const rightLabel = await label('FAUNDARE ADAPTATION — REDUCED HEATMAP', 1080);
  await sharp({create:{width:2160,height:1350,channels:4,background:'#E9EDF1'}})
    .composite([
      {input:leftLabel,left:40,top:30},
      {input:rightLabel,left:1040,top:30},
      {input:ref,left:Math.round((1000-refMeta.width)/2),top:120},
      {input:ours,left:1040+Math.round((1080-oursMeta.width)/2),top:120}
    ])
    .png({compressionLevel:9})
    .toFile(output);
  console.log(output);
})().catch(e=>{console.error(e);process.exit(1)});
