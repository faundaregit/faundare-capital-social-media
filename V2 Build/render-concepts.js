const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, 'SM-2026-11-02-MKT-IOS', 'concepts');
for (const name of ['concept-a','concept-b','concept-c']) {
  const src = path.join(root, `${name}.svg`);
  const out = path.join(root, `${name}.png`);
  sharp(src, { density: 192 }).png().toFile(out);
}
