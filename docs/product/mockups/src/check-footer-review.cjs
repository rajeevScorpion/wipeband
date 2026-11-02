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
console.log('Mockup script, current page, footer links and embedded assets verified.');
