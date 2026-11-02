const sharp=require('sharp');
const path=require('path');

const dir=__dirname;
const ref=path.join(dir,'reference-cre-daily.png');
const ours=path.join(dir,'retail-traffic-v7-1080x1350.png');
const out=path.join(dir,'retail-traffic-v7-reference-comparison.png');

(async()=>{
  const refPanel=await sharp(ref).extract({left:222,top:29,width:475,height:593}).resize(480,600).png().toBuffer();
  const ourPanel=await sharp(ours).resize(480,600).png().toBuffer();
  const labels=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750">
    <rect width="1200" height="750" fill="#061a34"/>
    <text x="90" y="62" fill="#ffffff" font-family="Arial, sans-serif" font-size="28" font-weight="700">EXACT REFERENCE · CRE DAILY</text>
    <text x="630" y="62" fill="#ffffff" font-family="Arial, sans-serif" font-size="28" font-weight="700">FAUNDARE v7</text>
    <text x="90" y="710" fill="#aec2d8" font-family="Arial, sans-serif" font-size="21">Photo-led carousel cover · Aug. data</text>
    <text x="630" y="710" fill="#aec2d8" font-family="Arial, sans-serif" font-size="21">Direct-label lollipop · Sept. data</text>
  </svg>`);
  await sharp(labels).composite([
    {input:refPanel,left:90,top:85},
    {input:ourPanel,left:630,top:85}
  ]).png().toFile(out);
  console.log(out);
})();
