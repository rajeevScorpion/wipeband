// Renders store slides + feature graphic from HTML templates with headless Edge/Chrome, then flattens alpha with Pillow.
// Usage: node render.mjs [path/to/store-kit.config.json]   (default: store-kit.config.json next to this script)
// Needs: Edge or Chrome, Python 3 with Pillow (pip install pillow).
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import os from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const cfgPath = resolve(process.argv[2] ?? join(here, 'store-kit.config.json'));
const base = dirname(cfgPath);
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
const slides = JSON.parse(readFileSync(join(base, cfg.slides ?? 'slides.json'), 'utf8'));
const out = resolve(base, cfg.outDir ?? 'out');
mkdirSync(out, { recursive: true });

const browser = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge',
].filter(Boolean).find(existsSync);
if (!browser) throw new Error('No Edge/Chrome found. Set CHROME_PATH.');
const python = process.platform === 'win32' ? 'python' : 'python3';

const fileUrl = p => pathToFileURL(resolve(base, p)).href;
const fontSrcs = Object.fromEntries(Object.entries(cfg.fonts ?? {}).filter(([, f]) => f.src).map(([k, f]) => {
  if (/^https?:/.test(f.src)) return [k, f.src];
  if (!existsSync(resolve(base, f.src))) { console.warn(`WARN font file missing for ${k}: ${f.src}`); return [k, null]; }
  return [k, fileUrl(f.src)];
}));
const logoSrc = cfg.logo && existsSync(resolve(base, cfg.logo)) ? fileUrl(cfg.logo) : '';
if (!logoSrc) console.warn('WARN logo missing:', cfg.logo);

const missing = [];
const image = rel => { if (!existsSync(resolve(base, rel))) missing.push(rel); return fileUrl(rel); };

function shot(template, data, w, h, file) {
  const url = pathToFileURL(join(here, template)).href + '#' + encodeURIComponent(JSON.stringify(data));
  rmSync(file, { force: true });
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--allow-file-access-from-files', `--user-data-dir=${join(os.tmpdir(), 'store-kit-render')}`,
    `--window-size=${w},${h + 200}`, '--virtual-time-budget=8000', `--screenshot=${file}`, url,
  ], { stdio: 'ignore', timeout: 90000 });
}

const flattenPy = `
import sys
from PIL import Image
f,w,h,bg=sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),sys.argv[4]
im=Image.open(f).convert('RGBA')
c=tuple(int(bg.lstrip('#')[i:i+2],16) for i in (0,2,4)) if bg.startswith('#') and len(bg)==7 else (255,255,255)
b=Image.new('RGB',im.size,c); b.paste(im,mask=im.split()[3]); b.crop((0,0,w,h)).save(f)
`;
const flatten = (f, w, h, bg) => execFileSync(python, ['-c', flattenPy, f, String(w), String(h), bg]);

const { width: W, height: H } = cfg.canvas ?? { width: 1080, height: 1920 };
const files = [];
slides.forEach((s, i) => {
  const file = join(out, `${String(i + 1).padStart(2, '0')}-${s.id}.png`);
  shot('slide.html', { slide: s, config: cfg, logoSrc, imageSrc: image(s.image), fontSrcs }, W, H, file);
  flatten(file, W, H, cfg.tokens[s.mode ?? 'light'].bg);
  files.push(file);
  console.log('rendered', file);
});

if (cfg.feature) {
  const fg = join(out, 'feature-graphic.png');
  shot('feature.html', { config: cfg, logoSrc, imageSrc: image(cfg.feature.image), fontSrcs }, 1024, 500, fg);
  flatten(fg, 1024, 500, cfg.tokens[cfg.feature.mode ?? 'light'].bg);
  console.log('rendered', fg);
}

const sheetPy = `
import sys
from PIL import Image
fs=sys.argv[2:]; w=270; h=int(w*${H}/${W}); g=16
im=Image.new('RGB',(len(fs)*(w+g)+g,h+2*g),(120,120,120))
for i,f in enumerate(fs): im.paste(Image.open(f).convert('RGB').resize((w,h),Image.LANCZOS),(g+i*(w+g),g))
im.save(sys.argv[1])
`;
execFileSync(python, ['-c', sheetPy, join(out, 'contact-sheet.png'), ...files]);
console.log('contact sheet', join(out, 'contact-sheet.png'));
console.log(missing.length ? `MISSING RAW IMAGES (rendered blank):\n  ${missing.join('\n  ')}` : 'All raw images present.');
