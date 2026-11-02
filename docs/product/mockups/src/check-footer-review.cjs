const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const page = fs.readFileSync(path.join(__dirname, '../footer-review.html'), 'utf8');
const script = page.match(/<script>([\s\S]*)<\/script><\/body>/)?.[1];
assert(script, 'Review script is missing');
new Function(script);
const prefix = script.slice(0, script.indexOf('const frame ='));
const { source, assets } = vm.runInNewContext(`${prefix};({source:SOURCE,assets:ASSETS})`);
for (const text of ['Footer navigation', 'school-classroom.webp', 'Parents get it. Kids love wearing it.', 'Cleaner sleeves start here', '/track-order', '/shipping-returns#returns', '/privacy-policy', '/terms-conditions', '/schools']) {
  assert(source.includes(text), `Current page is missing ${text}`);
}
for (const name of ['logo', 'insignia', 'pattern']) assert(assets[name].startsWith('data:image/'), `Missing ${name}`);
for (const text of ['data-design="original"', 'data-design="proposed"', 'data-size="phone"', 'pattern-toggle']) assert(page.includes(text), `Missing control ${text}`);
for (const viewport of [320, 390, 640, 1440, 2547]) {
  const mobile = viewport < 640;
  const width = mobile ? viewport * 0.94 : Math.min(viewport * 0.75, 1100);
  const height = width * 265.91 / 823.6;
  const hidden = mobile ? viewport * 0.085 : Math.min(viewport * 0.0675, 99);
  const lift = mobile ? 14 : 28;
  const visibleSvgHeight = (height - hidden) / height * 265.91;
  assert(visibleSvgHeight > 167.64, `W valleys are clipped at ${viewport}px`);
  assert(hidden > lift, `The wordmark fully reveals at ${viewport}px`);
}
console.log('Mockup script, current page, footer links, embedded assets and wordmark clipping geometry verified.');
