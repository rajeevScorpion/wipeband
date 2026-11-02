// Capture the local homepage and create a separate footer-design review artifact.
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '../../../..');
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
  for (const text of ['Cleaner sleeves start here', 'Footer navigation', 'testimonial-father.webp']) {
    if (!html.includes(text)) throw new Error(`Local homepage is missing expected current content: ${text}`);
  }
  const links = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*\/>/g)];
  for (const match of links) {
    let css = await (await get(match[1])).text();
    const fonts = new Set([...css.matchAll(/url\(["']?(\/_next\/[^)"']+)["']?\)/g)].map(found => found[1]));
    for (const font of fonts) {
      const response = await get(font);
      css = css.replaceAll(font, data(response.headers.get('content-type') || 'font/woff2', Buffer.from(await response.arrayBuffer())));
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
  const assets = {
    logo: data('image/svg+xml', await fs.readFile(path.join(root, 'public/assets/branding/wipeband_logo.svg'))),
    insignia: data('image/webp', await sharp(path.join(root, 'image-inbox/insignia_wipeband.png')).webp({ quality: 90 }).toBuffer()),
    pattern: data('image/webp', await sharp(path.join(root, 'image-inbox/Bg_pattern_wipeband.png')).webp({ quality: 90 }).toBuffer()),
  };
  let template = await fs.readFile(path.join(__dirname, 'hero-review.html'), 'utf8');
  const controls = await fs.readFile(path.join(__dirname, 'footer-review-controls.js'), 'utf8');
  const header = `<header class="review-bar"><div class="review-brand"><strong>WIPEBAND / FOOTER STUDY</strong><span>Compare the existing ending with the proposed brand finish</span></div><div class="segment" aria-label="Design"><button data-design="original" aria-pressed="false">Current</button><button data-design="proposed" aria-pressed="true">Proposed</button></div><div class="segment" aria-label="Preview width"><button data-size="desktop" aria-pressed="true">Desktop</button><button data-size="phone" aria-pressed="false">Phone</button></div><button id="pattern-toggle" aria-pressed="true">Pattern on</button><button id="jump">Show footer</button><button id="notes-toggle" aria-expanded="false">Design notes</button></header>`;
  const notes = `<aside class="review-notes" id="notes" hidden><h2>A quieter finish.</h2><div class="audit" id="audit-result">Loading current page…</div><h3>What changes</h3><p>The wordmark sinks further and meets the footer edge. A subtle shadow from the footer adds depth while the W remains recognizable. The wordmark lifts slightly on scroll and stays tucked behind the footer.</p><h3>Try it</h3><p>Compare Current and Proposed, switch between Desktop and Phone, scroll past the footer, and toggle the smaller repeat pattern. Its soft fade keeps the pattern from ending abruptly. The FAQ joins the artwork without a dividing line.</p><h3>Preserved</h3><p>The current footer copy, navigation and destinations are kept. Preview links and purchase buttons do not navigate or place orders. Reduced-motion settings disable the scroll lift.</p><h3>Decision</h3><p>Review the overlap, shadow, scroll lift and pattern before implementation.</p></aside>`;
  template = template.replace('Wipeband · Hero image comparison', 'Wipeband · Footer study');
  template = template.replace(/<header class="review-bar">[\s\S]*?<\/header>/, header);
  template = template.replace(/<aside class="review-notes"[\s\S]*?<\/aside>/, notes);
  template = template.replace(/<script>[\s\S]*?<\/script><\/body>/, () => `<script>const SOURCE=${safeJSON(html)};const ASSETS=${safeJSON(assets)};\n${controls}</script></body>`);
  const target = path.join(__dirname, '../footer-review.html');
  await fs.writeFile(target, template);
  console.log(`Created ${target} from the current local page; embedded ${imagePaths.size} site image references and supplied brand assets.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
