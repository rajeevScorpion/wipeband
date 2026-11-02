const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

async function main() {
  const [input, output] = process.argv.slice(2);
  if (!input || !output || process.argv.length !== 4 || path.extname(output).toLowerCase() !== '.webp') {
    throw new Error('Usage: npm run optimize:image -- <original-image> <destination.webp>');
  }
  const metadata = await sharp(input, { animated: true }).metadata();
  if ((metadata.pages || 1) > 1) throw new Error('Animated images need a separate conversion and review.');
  const data = await sharp(input).rotate().webp({ quality: 85, alphaQuality: 100 }).toBuffer();
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, data, { flag: 'wx' });
  console.log(`Created ${output} (${(data.length / 1024).toFixed(0)} KB); original kept at ${input}`);
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
