const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { spawnSync } = require('node:child_process');
const sharp = require('sharp');
const { findNonWebp } = require('./check-images.cjs');

test('finds non-WebP raster files recursively while allowing WebP, SVG and icons', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'wipeband-images-'));
  try {
    fs.mkdirSync(path.join(directory, 'nested'));
    for (const name of ['nested/photo.PNG', 'nested/photo.webp', 'logo.svg', 'favicon.ico']) {
      fs.writeFileSync(path.join(directory, name), '');
    }
    assert.deepEqual(findNonWebp(directory), [path.join(directory, 'nested', 'photo.PNG')]);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('conversion keeps the original, dimensions and transparency and refuses to overwrite', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'wipeband-convert-'));
  try {
    const input = path.join(directory, 'original.png');
    const output = path.join(directory, 'result.webp');
    await sharp({ create: { width: 10, height: 12, channels: 4, background: { r: 20, g: 40, b: 60, alpha: 0.5 } } }).png().toFile(input);
    const run = () => spawnSync(process.execPath, [path.join(__dirname, 'optimize-image.cjs'), input, output]);
    assert.equal(run().status, 0);
    const metadata = await sharp(fs.readFileSync(output)).metadata();
    assert.equal(metadata.format, 'webp');
    assert.equal(metadata.width, 10);
    assert.equal(metadata.height, 12);
    assert.equal(metadata.hasAlpha, true);
    assert.equal(fs.existsSync(input), true);
    const originalOutput = fs.readFileSync(output);
    assert.notEqual(run().status, 0);
    assert.deepEqual(fs.readFileSync(output), originalOutput);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
