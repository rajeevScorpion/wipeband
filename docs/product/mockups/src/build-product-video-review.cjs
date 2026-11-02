// Capture the current homepage into a separate product-video review.
const fs = require('node:fs/promises');
const path = require('node:path');

const base = 'http://127.0.0.1:3000';
const data = (type, bytes) => `data:${type};base64,${bytes.toString('base64')}`;
const safeJSON = value => JSON.stringify(value).replace(/<\/script/gi, '<\\/script');
async function get(url) {
  const response = await fetch(new URL(url, base));
  if (!response.ok) throw new Error(`Could not load ${url}: ${response.status}`);
  return response;
}

async function main() {
  let html = await (await get('/')).text();
  for (const text of ['One little pack.', 'of 6 ready on wrist', 'Footer navigation', 'footer-insignia.webp']) {
    if (!html.includes(text)) throw new Error(`Local homepage is missing expected current content: ${text}`);
  }
  const links = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*\/>/g)];
  for (const match of links) {
    let css = await (await get(match[1])).text();
    const resources = new Set([...css.matchAll(/url\(["']?(\/(?:_next|assets)\/[^)"']+)["']?\)/g)].map(found => found[1]));
    for (const resource of resources) {
      const response = await get(resource);
      css = css.replaceAll(resource, data(response.headers.get('content-type') || 'application/octet-stream', Buffer.from(await response.arrayBuffer())));
    }
    html = html.replace(match[0], `<style>${css}</style>`);
  }
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<link rel="preload"[^>]*\/>/g, '');
  const imagePaths = new Set([...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(found => found[1]).filter(src => src.startsWith('/')));
  for (const imagePath of imagePaths) {
    const response = await fetch(new URL(imagePath.replaceAll('&amp;', '&'), base));
    const embedded = response.ok ? data(response.headers.get('content-type') || 'image/webp', Buffer.from(await response.arrayBuffer())) : '';
    html = html.replaceAll(`src="${imagePath}"`, `src="${embedded}"`);
  }
  const poster = data('image/webp', await fs.readFile(path.join(__dirname, '../media/wipeband-loading-poster.webp')));
  let template = await fs.readFile(path.join(__dirname, 'hero-review.html'), 'utf8');
  const controls = await fs.readFile(path.join(__dirname, 'product-video-controls.js'), 'utf8');
  const header = `<header class="review-bar"><div class="review-brand"><strong>WIPEBAND / PRODUCT VIDEO</strong><span>Current section and proposed video placement</span></div><div class="segment" aria-label="Design"><button data-design="current" aria-pressed="false">Current</button><button data-design="video" aria-pressed="true">Video</button></div><div class="segment" aria-label="Preview width"><button data-size="desktop" aria-pressed="true">Desktop</button><button data-size="phone" aria-pressed="false">Phone</button></div><button id="jump">Show section</button><button id="notes-toggle" aria-expanded="false">Design notes</button></header>`;
  const notes = `<aside class="review-notes" id="notes" hidden><h2>A closer look.</h2><div class="audit" id="audit-result">Loading current page…</div><h3>What changes</h3><p>The six-layer interactive graphic is replaced by a larger rounded video with a subtle shadow. The outer card is removed and the surrounding copy stays as it is.</p><h3>Try it</h3><p>Select Video, then Show section. Compare desktop and phone. The video plays silently and loops when visible, without playback controls. Reduced-motion settings show the still poster instead.</p><h3>Loading</h3><p>The preview uses a 720 × 900 H.264 copy, approximately 1.05 MB instead of 14.9 MB. A small poster appears before the video loads; the video is fetched near the section.</p><h3>Decision</h3><p>Review the video fit, crop and playback before implementation. This preview does not change the website.</p></aside>`;
  template = template.replace('Wipeband · Hero image comparison', 'Wipeband · Product video study');
  template = template.replace(/<header class="review-bar">[\s\S]*?<\/header>/, header);
  template = template.replace(/<aside class="review-notes"[\s\S]*?<\/aside>/, notes);
  template = template.replace(/<script>[\s\S]*?<\/script><\/body>/, () => `<script>const SOURCE=${safeJSON(html)};const POSTER=${safeJSON(poster)};\n${controls}</script></body>`);
  const target = path.join(__dirname, '../product-video-review.html');
  await fs.writeFile(target, template);
  console.log(`Created ${target}; embedded ${imagePaths.size} current site images and linked the optimized preview video.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
