const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const checks = [
  {
    file: path.join(root, 'V2 Build', 'SM-2026-11-02-MKT-IOS', 'final', 'post-v2-1080x1350.png'),
    width: 1080,
    height: 1350,
  },
  {
    file: path.join(root, 'V2 Build', 'SM-2026-11-02-MKT-IOS', 'final', 'post-v2-mobile-proof.png'),
    width: 360,
    height: 450,
  },
];

async function main() {
  for (const check of checks) {
    if (!fs.existsSync(check.file)) {
      throw new Error(`Missing output: ${path.relative(root, check.file)}`);
    }
    const metadata = await sharp(check.file).metadata();
    if (metadata.width !== check.width || metadata.height !== check.height) {
      throw new Error(
        `Wrong dimensions for ${path.relative(root, check.file)}: ` +
          `${metadata.width}x${metadata.height}; expected ${check.width}x${check.height}`,
      );
    }
    console.log(`PASS ${path.relative(root, check.file)} ${metadata.width}x${metadata.height}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

