// Builds the review webpage (review/index.html + downloadable PNGs + JPG previews) from the rendered outputs.
// Usage: node build-review.mjs [path/to/store-kit.config.json]
// Then publish review/index.html with the Artifact tool, every other file in review/ in `files`,
// and capabilities {"downloads": true}. The script prints the exact `files` map.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, rmSync } from 'node:fs';
import { dirname, resolve, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cfgPath = resolve(process.argv[2] ?? join(here, 'store-kit.config.json'));
const base = dirname(cfgPath);
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
const slides = JSON.parse(readFileSync(join(base, cfg.slides ?? 'slides.json'), 'utf8'));
const listing = JSON.parse(readFileSync(join(base, cfg.listing ?? 'listing.json'), 'utf8'));
const out = resolve(base, cfg.outDir ?? 'out');
const review = resolve(base, cfg.reviewDir ?? 'review');
rmSync(review, { recursive: true, force: true });
mkdirSync(review, { recursive: true });
const python = process.platform === 'win32' ? 'python' : 'python3';

const previewPy = `
import sys
from PIL import Image
src,dst,w=sys.argv[1],sys.argv[2],int(sys.argv[3])
im=Image.open(src).convert('RGB'); h=round(im.height*w/im.width)
im.resize((w,h),Image.LANCZOS).save(dst,quality=86,optimize=True)
`;
const add = (src, name, previewWidth) => {
  if (!existsSync(src)) { console.warn('WARN missing', src); return null; }
  copyFileSync(src, join(review, name));
  const preview = name.replace(/\.png$/i, '.preview.jpg');
  execFileSync(python, ['-c', previewPy, src, join(review, preview), String(previewWidth)]);
  return { file: name, preview };
};

const slug = (cfg.product || 'app').toLowerCase().replace(/[^a-z0-9]+/g, '-');
const manifest = {
  product: cfg.product, store: listing.store ?? 'Google Play', where: listing.where ?? '',
  tokens: cfg.tokens, fonts: { display: cfg.fonts?.display?.family, body: cfg.fonts?.body?.family },
  canvas: cfg.canvas ?? { width: 1080, height: 1920 }, slug,
  slides: [], feature: null, extras: [], fields: listing.fields ?? [], checklist: listing.checklist ?? [],
  generated: new Date().toISOString().slice(0, 10),
};
slides.forEach((s, i) => {
  const n = String(i + 1).padStart(2, '0');
  const a = add(join(out, `${n}-${s.id}.png`), `${slug}-screenshot-${n}-${s.id}.png`, 720);
  if (a) manifest.slides.push({ n, id: s.id, headline: s.headline, mode: s.mode ?? 'light', ...a });
});
const fg = add(join(out, 'feature-graphic.png'), `${slug}-feature-graphic.png`, 1024);
if (fg) manifest.feature = fg;
for (const x of listing.extraFiles ?? []) {
  const a = add(resolve(base, x.path), `${slug}-${basename(x.path)}`, 256);
  if (a) manifest.extras.push({ label: x.label, ...a });
}

const tpl = readFileSync(join(here, 'review-template.html'), 'utf8');
const json = JSON.stringify(manifest).replace(/</g, '\\u003c');
writeFileSync(join(review, 'index.html'), tpl.replace('/*__MANIFEST__*/null', json).replace('__TITLE__', `${cfg.product} Store Listing`));

const filesMap = Object.fromEntries(readdirSync(review).filter(f => f !== 'index.html').map(f => [f, join(review, f).replace(/\\/g, '/')]));
console.log('review page:', join(review, 'index.html'));
console.log('Artifact files map:\n' + JSON.stringify(filesMap, null, 1));
