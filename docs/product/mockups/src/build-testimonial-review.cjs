// Build a review-only mockup from the current local homepage and supplied icons.
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
  if (!html.includes('Parents get it. Kids love wearing it.') || !html.includes('/assets/images/school-classroom.webp')) {
    throw new Error('The local homepage is not the expected current version.');
  }
  const links = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*\/>/g)];
  for (const match of links) {
    let css = await (await get(match[1])).text();
    for (const font of new Set([...css.matchAll(/url\(["']?(\/_next\/[^)"']+)["']?\)/g)].map(m => m[1]))) {
      const response = await get(font);
      css = css.replaceAll(font, data(response.headers.get('content-type') || 'font/woff2', Buffer.from(await response.arrayBuffer())));
    }
    html = html.replace(match[0], `<style>${css}</style>`);
  }
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<link rel="preload"[^>]*\/>/g, '');
  const imagePaths = new Set([...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(m => m[1]).filter(p => p.startsWith('/')));
  for (const imagePath of imagePaths) {
    const response = await fetch(new URL(imagePath.replaceAll('&amp;', '&'), base));
    const replacement = response.ok ? data(response.headers.get('content-type') || 'image/webp', Buffer.from(await response.arrayBuffer())) : '';
    html = html.replaceAll(`src="${imagePath}"`, `src="${replacement}"`);
  }
  html = html.replace('</head>', `<style>main [style*="opacity"]{opacity:1!important;transform:none!important}main img{opacity:1!important}.review-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.review-card{aspect-ratio:1;min-height:220px;background:white;border:1px solid #d8e8e6;border-radius:16px;padding:20px;display:flex;flex-direction:column;justify-content:space-between}.review-card blockquote{margin:0;color:#092f34;font:italic 18px/1.4 Georgia,serif}.review-person{border-top:1px solid #dce9e8;padding-top:12px;display:flex;align-items:center;gap:10px;color:#123b42;font:700 12px/1.4 system-ui}.review-person img{width:42px;height:42px;border-radius:50%;object-fit:cover;flex:none}.review-person small{display:block;font-weight:400;color:#61777b}.future-card{border:1px dashed #9abdb9;background:#f8fcfb;color:#587773}.future-card p{font:14px/1.4 system-ui}.future-card span{font:700 12px system-ui}@media(max-width:639px){.review-grid{grid-template-columns:1fr}.review-card{min-height:0}}</style></head>`);
  const avatars = {};
  for (const [key, file] of Object.entries({ father: 'Father.png', mother: 'Mother.png', teacher: 'teacher.png', lady: 'Lady Teacher_.png' })) {
    avatars[key] = data('image/webp', await sharp(path.join(root, 'image-inbox', file)).webp({ quality: 85 }).toBuffer());
  }
  const template = await fs.readFile(path.join(__dirname, 'hero-review.html'), 'utf8');
  const head = template.slice(0, template.indexOf('</style></head><body>')).replace('Wipeband · Hero image comparison', 'Wipeband · Testimonial review');
  const output = `${head}</style></head><body>
<header class="review-bar"><div class="review-brand"><strong>WIPEBAND / TESTIMONIAL STUDY</strong><span>Current page with a proposed review-card layout</span></div><div class="segment" aria-label="Preview width"><button data-size="desktop" aria-pressed="true">Desktop</button><button data-size="phone" aria-pressed="false">Phone</button></div><div class="segment" aria-label="Number of reviews"><button data-count="2" aria-pressed="true">2 reviews</button><button data-count="4" aria-pressed="false">4 reviews</button></div><button id="jump">Show testimonials</button><button id="notes-toggle" aria-expanded="false">Design notes</button></header>
<main class="review-stage"><div class="review-frame" id="frame-wrap"><iframe id="site-frame" title="Wipeband homepage with proposed testimonial cards" scrolling="no"></iframe></div></main>
<aside class="review-notes" id="notes" hidden><h2>Reviews with a face.</h2><h3>What changes</h3><p>The two existing reviews get square cards and the supplied parent illustrations. The surrounding page and the two reviews retain their existing text.</p><h3>Try it</h3><p>Switch between desktop and phone, then try four reviews. The extra two cards are clearly marked future slots, not real testimonials. Teacher illustrations are reserved for future teacher feedback.</p><h3>Build notes</h3><p>Square cards expand as needed for longer reviews. Profile illustrations are decorative, not photographs of the reviewers. Links and commerce are disabled in this preview.</p></aside>
<script>
const SOURCE=${safeJSON(html)};
const AVATARS=${safeJSON(avatars)};
const frame=document.getElementById('site-frame');let count=2;
function resize(){const d=frame.contentDocument;frame.style.height=(d.documentElement.scrollHeight+20)+'px'}
function setup(){const d=frame.contentDocument;const heading=[...d.querySelectorAll('h2')].find(h=>h.textContent.trim()==='Parents get it. Kids love wearing it.');if(!heading){document.querySelector('.review-brand span').textContent='Preview error: testimonials not found';return}const grid=heading.nextElementSibling;grid.className='review-grid';[...grid.children].forEach((card,i)=>{card.className='review-card';const quote=card.querySelector('p');const footer=card.querySelector('div');const author=footer.querySelector('span');quote.outerHTML='<blockquote>'+quote.innerHTML+'</blockquote>';footer.className='review-person';footer.querySelectorAll('img').forEach(img=>img.remove());const img=d.createElement('img');img.src=i===0?AVATARS.father:AVATARS.mother;img.alt='';footer.prepend(img);author.innerHTML=i===0?'Henry M.<small>Parent review on Wipeband.com</small>':'Sarah K.<small>Parent review on Wipeband.com</small>'});const original=[...grid.children].map(e=>e.outerHTML);function render(){grid.innerHTML=original.join('');if(count===4){for(const [label,icon] of [['Future teacher review',AVATARS.teacher],['Future teacher review',AVATARS.lady]]){const card=d.createElement('div');card.className='review-card future-card';card.innerHTML='<p>Space for future feedback</p><div class="review-person"><img alt="" src="'+icon+'"><span>'+label+'<small>Example slot</small></span></div>';grid.appendChild(card)}}resize()}window.renderReviews=render;render();d.addEventListener('click',e=>{if(e.target.closest('a,button'))e.preventDefault()},true);d.fonts.ready.then(resize)}
document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{document.getElementById('frame-wrap').classList.toggle('phone',b.dataset.size==='phone');document.querySelectorAll('[data-size]').forEach(x=>x.setAttribute('aria-pressed',x===b));setTimeout(resize,400)});document.querySelectorAll('[data-count]').forEach(b=>b.onclick=()=>{count=Number(b.dataset.count);document.querySelectorAll('[data-count]').forEach(x=>x.setAttribute('aria-pressed',x===b));window.renderReviews?.()});document.getElementById('notes-toggle').onclick=()=>{const n=document.getElementById('notes');n.hidden=!n.hidden;document.getElementById('notes-toggle').setAttribute('aria-expanded',!n.hidden)};document.getElementById('jump').onclick=()=>{const h=[...frame.contentDocument.querySelectorAll('h2')].find(e=>e.textContent.trim()==='Parents get it. Kids love wearing it.');if(h)scrollTo({top:frame.getBoundingClientRect().top+scrollY+h.getBoundingClientRect().top-110,behavior:'smooth'})};frame.addEventListener('load',setup);frame.srcdoc=SOURCE;
</script></body></html>`;
  const target = path.join(__dirname, '../testimonial-review.html');
  await fs.writeFile(target, output);
  console.log(`Created ${target}; embedded ${avatars ? Object.keys(avatars).length : 0} icons and ${imagePaths.size} site image references.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
