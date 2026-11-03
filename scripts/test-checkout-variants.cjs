const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync('app/api/checkout/route.ts', 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021, esModuleInterop: true } }).outputText;
const productExports = {};
const productJs = ts.transpileModule(fs.readFileSync('lib/products.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 } }).outputText;
vm.runInNewContext(productJs, { exports: productExports });
const ids = Array.from(productExports.STARTER_KIT_PRODUCT.variants, variant => variant.id);
assert.equal(ids.length, 8);
let params;
class FakeStripe { constructor() { this.checkout = { sessions: { create: async value => { params = value; return { url: 'https://checkout.invalid/test' }; } } }; } }
const routeExports = {};
vm.runInNewContext(js, { exports: routeExports, process: { env: { STRIPE_SECRET_KEY: 'test', STRIPE_PRICE_STARTER_KIT: 'price_test', STRIPE_PRICE_REFILLS: 'price_refill' } }, console, require(name) {
  if (name === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } };
  if (name === 'stripe') return FakeStripe;
  if (name === '@/lib/products') return { STARTER_KIT_PRODUCT: productExports.STARTER_KIT_PRODUCT };
  throw Error(`Unexpected import: ${name}`);
} });
(async () => {
  const request = items => ({ json: async () => ({ items }) });
  const items = ids.map(variantId => ({ slug: 'wipeband-starter-kit', variantId, quantity: 1 }));
  items.push({ slug: 'wipeband-starter-kit', variantId: 'under-the-sea', quantity: 2 });
  const ok = await routeExports.POST(request(items));
  assert.equal(ok.status, 200);
  for (const id of ids) assert.equal(params.metadata[`starter_${id.replaceAll('-', '_')}`], id === 'under-the-sea' ? '3' : '1');
  const bad = await routeExports.POST(request([{ slug: 'wipeband-starter-kit', variantId: 'unknown', quantity: 1 }]));
  assert.equal(bad.status, 400);
  const missing = await routeExports.POST(request([{ slug: 'wipeband-starter-kit', quantity: 1 }]));
  assert.equal(missing.status, 400);
  console.log('All eight designs are accepted and preserved with quantities in checkout metadata; invalid and missing designs are rejected.');
})().catch(error => { console.error(error); process.exitCode = 1; });
