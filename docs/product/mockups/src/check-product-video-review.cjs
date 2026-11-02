const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '../product-video-review.html'), 'utf8');
const script = html.match(/<script>([\s\S]*)<\/script><\/body>/)?.[1];
assert(script, 'Mockup script is missing');
new Function(script);
const prefix = script.slice(0, script.indexOf('const frame ='));
const { source, poster } = vm.runInNewContext(`${prefix};({source:SOURCE,poster:POSTER})`);
for (const text of ['One little pack.', 'of 6 ready on wrist', 'Footer navigation', 'FooterBrandFinish_finish', '/track-order']) {
  assert(source.includes(text), `Current page is missing ${text}`);
}
assert(poster.startsWith('data:image/webp;'));
const bytes = fs.readFileSync(path.join(__dirname, '../media/wipeband-loading-preview.mp4'));
assert(bytes.indexOf('moov') > 0 && bytes.indexOf('moov') < bytes.indexOf('mdat'), 'MP4 must be fast-start');

const state = { reduced: false, videos: [], replacements: [] };
const makeElement = tag => ({
  tag, dataset: {}, style: {}, children: [],
  appendChild(child) { this.children.push(child); },
  setAttribute(name, value) { this[name] = value; },
  getBoundingClientRect() { return { top: 100, bottom: 500 }; },
  load() { this.loadCount = (this.loadCount || 0) + 1; },
  play() { this.playCount = (this.playCount || 0) + 1; return Promise.resolve(); },
  pause() { this.pauseCount = (this.pauseCount || 0) + 1; },
});
const panel = { replaceWith(element) { state.replacements.push(element); } };
const section = { querySelector(selector) { assert.equal(selector, 'div[class*="rounded-[2rem]"]'); return panel; } };
const heading = { textContent: 'One little pack. Six fresh wipes.', closest() { return section; } };
const doc = {
  head: makeElement('head'), documentElement: { scrollHeight: 1200 },
  fonts: { ready: { then(fn) { fn(); } } },
  querySelectorAll() { return [heading]; },
  createElement(tag) { const el = makeElement(tag); if (tag === 'video') state.videos.push(el); return el; },
  addEventListener() {},
};
const frame = { contentDocument: doc, style: {}, getBoundingClientRect() { return { top: 0 }; }, addEventListener(name, fn) { if (name === 'load') this.onload = fn; } };
Object.defineProperty(frame, 'srcdoc', { set() { frame.onload(); } });
const button = (key, value) => ({ dataset: { [key]: value }, setAttribute() {} });
const designs = [button('design', 'current'), button('design', 'video')];
const sizes = [button('size', 'desktop'), button('size', 'phone')];
const nodes = { 'site-frame': frame, 'audit-result': {}, 'frame-wrap': { classList: { toggle() {} } }, 'notes-toggle': {}, notes: {}, jump: {} };
const document = { getElementById(id) { return nodes[id]; }, querySelectorAll(selector) { return selector === '[data-design]' ? designs : sizes; } };
const window = { location: { href: 'http://127.0.0.1:3011/product-video-review.html' }, innerHeight: 900, matchMedia() { return { matches: state.reduced }; }, addEventListener() {} };
vm.runInNewContext(script, { document, window, URL, setTimeout(fn) { fn(); } });
assert.equal(state.replacements.length, 1, 'Video panel must replace the original panel');
const first = state.videos[0];
assert(first.controls && first.muted && first.loop && first.playsInline);
assert(first.src.endsWith('/media/wipeband-loading-preview.mp4'));
assert(first.loadCount > 0 && first.playCount > 0, 'Visible video should load and play');
designs[0].onclick();
assert.equal(state.replacements.length, 1, 'Current view must retain the original panel');
state.reduced = true;
designs[1].onclick();
assert.equal(state.replacements.length, 2);
assert.equal(state.videos[1].playCount || 0, 0, 'Reduced motion must not autoplay');
console.log('Mockup content, fast-start video, placement, playback and reduced-motion behavior verified.');
