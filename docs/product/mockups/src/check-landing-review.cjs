// Validate the review artifact, particularly preservation of the source content.
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require(process.env.WIPEBAND_PLAYWRIGHT || 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.WIPEBAND_CHROMIUM ? { executablePath: process.env.WIPEBAND_CHROMIUM } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });
    const errors = [], external = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (/^https?:/.test(r.url()) && !r.url().startsWith('http://localhost:3011/')) external.push(r.url()); });
    await page.goto('http://localhost:3011/storefront-operations.html', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.body.dataset.contentMatch === 'true');
    const site = page.frames().find(f => f.parentFrame());
    await site.evaluate(() => document.fonts.ready);
    assert.equal(await site.locator('main section').count(), 10);
    assert(await site.locator('img[alt="Wipeband"]').first().isVisible());
    const centered = await page.locator('#frame-wrap').boundingBox();
    assert(Math.abs(centered.x - (1600 - centered.width) / 2) < 2);
    assert(centered.width <= 1320);
    for (const state of ['Current', 'Proposed']) {
      await page.getByRole('button', { name: state, exact: true }).click();
      assert.equal(await page.locator('body').getAttribute('data-content-match'), 'true');
      const invisible = await site.locator('main p,main h1,main h2,main h3').evaluateAll(nodes => nodes.filter(e => {
        for (let n = e; n && n !== document.body; n = n.parentElement) {
          const s = getComputedStyle(n);
          if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0) return true;
        }
        return false;
      }).map(e => e.textContent));
      assert.deepEqual(invisible, []);
    }
    const hero = site.locator('[data-wb-section="0"] .wb-media');
    const before = await hero.evaluate(e => getComputedStyle(e).transform);
    const rect = await hero.boundingBox();
    await page.mouse.move(rect.x + rect.width * .85, rect.y + rect.height * .3);
    await page.waitForTimeout(350);
    const after = await hero.evaluate(e => getComputedStyle(e).transform);
    assert.notEqual(before, after, 'Motion library should respond to pointer input');
    await page.locator('#motion').selectOption('off');
    assert.equal(await site.locator('html').getAttribute('data-motion'), 'off');
    await page.mouse.move(20, 200);
    const off = await hero.evaluate(e => getComputedStyle(e).transform);
    await hero.hover();
    await page.waitForTimeout(150);
    assert.equal(await hero.evaluate(e => getComputedStyle(e).transform), off);
    await page.screenshot({ path: path.join(process.env.TEMP, 'wipeband-landing-desktop.png') });
    await page.screenshot({ path: path.join(process.env.TEMP, 'wipeband-landing-full.png'), fullPage: true });
    await page.getByRole('button', { name: 'Phone', exact: true }).click();
    await page.waitForTimeout(550);
    const desktopHeight = centered.height;
    assert((await page.locator('#frame-wrap').boundingBox()).height > desktopHeight);
    await page.screenshot({ path: path.join(process.env.TEMP, 'wipeband-landing-phone.png') });
    assert(await site.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.setViewportSize({ width: 390, height: 844 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert(await site.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#motion').selectOption('on');
    assert.equal(await site.locator('html').getAttribute('data-motion'), 'on');
    assert(await site.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches));
    await page.getByRole('button', { name: 'Design notes', exact: true }).click();
    assert(await page.locator('#audit-result').isVisible());
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    console.log('PASS: original section/link audit in both modes, visible copy, centered 1320px frame, Motion pointer response, motion-off behavior, phone reflow/overflow, reduced-motion preference, zero page errors and no external requests.');
  } finally { await browser.close(); }
})();
