// Capture the existing homepage, embed its assets, then add a visual-only treatment.
// Run with WIPEBAND_PLAYWRIGHT pointing to an installed Playwright package directory.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.WIPEBAND_PLAYWRIGHT || 'playwright');
const root = path.resolve(__dirname, '../../../..');
const artifactRoot = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(__dirname, file), 'utf8');
const escapeScript = s => s.replace(/<\/script/gi, '<\\/script');
const data = (mime, buffer) => `data:${mime};base64,${buffer.toString('base64')}`;
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.WIPEBAND_CHROMIUM ? { executablePath: process.env.WIPEBAND_CHROMIUM } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto('http://localhost:3010', { waitUntil: 'networkidle' });
    await page.locator('h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    // Finish presentation-only initial states in the captured DOM; never edit app source.
    await page.evaluate(() => {
      document.querySelectorAll('main [style]').forEach(el => {
        if (el.style.opacity !== '') { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
    });
    await page.addStyleTag({ content: 'main,main *{opacity:1!important}' });
    const baseline = await page.evaluate(() => {
      const norm = s => s.replace(/\s+/g, ' ').trim();
      return { sections: [...document.querySelectorAll('main section')].map(s => norm(s.textContent)), links: [...document.querySelectorAll('a')].map(a => ({ text: norm(a.textContent), href: a.getAttribute('href') })) };
    });
    assert.equal(baseline.sections.length, 10);
    const bodies = await page.evaluate(() => {
      const goodImages = new Set([...document.images].filter(el => el.complete && el.naturalWidth > 0).map(el => el.getAttribute('src')));
      const clone = document.body.cloneNode(true);
      clone.querySelectorAll('script,nextjs-portal,[data-nextjs-dialog-overlay]').forEach(el => el.remove());
      clone.querySelectorAll('main [style]').forEach(el => {
        if (el.style.opacity !== '') { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      clone.querySelectorAll('img').forEach(el => { if (!goodImages.has(el.getAttribute('src'))) el.remove(); });
      return { body: clone.outerHTML, css: [...document.querySelectorAll('link[rel="stylesheet"]')].map(el => el.href) };
    });
    let css = '';
    for (const url of bodies.css) css += await (await page.request.get(url)).text();
    css = css.replace(/url\(([^)]+)\)/g, (whole, raw) => {
      const filename = raw.replace(/["']/g, '').split('/').pop().split('?')[0];
      const file = path.join(root, '.next/static/media', filename);
      return fs.existsSync(file) ? `url(${data('font/woff2', fs.readFileSync(file))})` : whole;
    });
    let body = bodies.body;
    body = body.replace(/src="([^\"]+)"/g, (whole, src) => {
      if (!src.startsWith('/')) return whole;
      const file = path.join(root, 'public', src);
      if (!fs.existsSync(file)) return whole;
      const mime = src.endsWith('.svg') ? 'image/svg+xml' : src.endsWith('.webp') ? 'image/webp' : src.endsWith('.png') ? 'image/png' : 'image/jpeg';
      return `src="${data(mime, fs.readFileSync(file))}"`;
    });
    const htmlAttrs = await page.locator('html').getAttribute('class');
    const license = fs.readFileSync(path.join(root, 'node_modules/motion/LICENSE.md'), 'utf8');
    const library = '/*!\n' + license + '\n*/\n' + fs.readFileSync(path.join(root, 'node_modules/motion/dist/motion.js'), 'utf8');
    const document = `<!doctype html><html lang="en" class="${htmlAttrs}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style><style>${read('landing-treatment.css')}</style></head>${body}<script>${escapeScript(library)}</script><script>${escapeScript(read('landing-treatment.js'))}</script></html>`;
    const output = read('landing-review.html').replace('%%MANIFEST%%', escapeScript(JSON.stringify(baseline))).replace('%%DOCUMENT%%', escapeScript(JSON.stringify(document)));
    assert(!output.includes('%%DOCUMENT%%'));
    const target = path.join(artifactRoot, 'storefront-operations.html');
    const archive = path.join(artifactRoot, 'archive/storefront-operations-v1.html');
    if (!fs.existsSync(archive)) { fs.mkdirSync(path.dirname(archive), { recursive: true }); fs.copyFileSync(target, archive); }
    fs.writeFileSync(target, output);
    fs.writeFileSync(path.join(__dirname, 'landing-content-manifest.json'), JSON.stringify(baseline, null, 2) + '\n');
    console.log(`Captured ${baseline.sections.length} original sections and ${baseline.links.length} links. Artifact: ${target}`);
    await page.screenshot({ path: path.join(process.env.TEMP, 'wipeband-baseline-desktop-final.png'), fullPage: true });
  } finally { await browser.close(); }
})();
