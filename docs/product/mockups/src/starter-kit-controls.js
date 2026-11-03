const frame = document.getElementById('site-frame');
let mode = new URLSearchParams(location.search).get('qa') === 'design' ? 'design' : 'package', sale = false, selected = 0, toastTimer;
const escapeText = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function resize() { frame.style.height = `${frame.contentDocument.documentElement.scrollHeight + 16}px`; }
function toast(message) { const el = document.getElementById('toast'); el.textContent = message; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => el.hidden = true, 2800); }
function setup() {
  const doc = frame.contentDocument;
  const section = doc.getElementById('starter-kit');
  if (section && new URLSearchParams(location.search).has('qa')) {
    doc.querySelectorAll('main section').forEach(item => { if (item !== section) item.style.display = 'none'; });
  }
  const card = section?.querySelector('div[class*="rounded-[2.25rem]"]');
  if (!card) { document.getElementById('audit-result').textContent = 'Could not locate the current starter kit section.'; return; }
  const trust = card.lastElementChild.outerHTML;
  const style = doc.createElement('style');
  style.textContent = `
    main [style*="opacity"]{opacity:1!important;transform:none!important}main img{opacity:1!important}
    .kit-card{border:1px solid #0a4d571c;border-radius:36px;background:linear-gradient(125deg,#fff9f0,#fffdf9 50%,#eef9f5);padding:clamp(22px,3vw,40px)}
    .kit-layout{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(28px,4vw,56px);align-items:center}
    .kit-visual{position:relative;min-width:0}.kit-main-image{width:100%;aspect-ratio:1;object-fit:cover;border-radius:24px;display:block}.kit-caption{font-size:12px;color:#557678;margin:10px 4px 0}
    .kit-inset{position:absolute;right:14px;bottom:36px;width:31%;background:white;padding:5px;border-radius:15px;box-shadow:0 8px 24px #05333722}.kit-inset img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:11px}.kit-inset span{display:block;text-align:center;font-size:10px;font-weight:700;color:#06444c;padding:4px 0 1px}
    .kit-heading{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.kit-heading h3{font-size:clamp(24px,2.4vw,32px);line-height:1.1;font-weight:900;letter-spacing:-.025em;color:#052f2f;margin:0}.kit-age{font-size:15px;color:#627d7c;margin:6px 0 0}.kit-price{font-size:29px;font-weight:900;color:#052f2f;white-space:nowrap;line-height:1.05}.kit-price s{display:block;text-align:right;color:#78908d;font-size:14px;font-weight:500;margin-bottom:4px}
    .kit-description{color:#53716f;font-size:15px;line-height:1.5;margin:16px 0}.kit-includes{border-top:1px solid #0a4d5719;border-bottom:1px solid #0a4d5719;padding:14px 0;margin:0 0 18px;display:flex;gap:8px 24px;flex-wrap:wrap;list-style:none;color:#123f40;font-size:14px;font-weight:600}.kit-includes li:before{content:'✓';color:#62b44a;margin-right:8px;font-weight:bold}
    .kit-label{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:10px;color:#123f40;font-size:14px;font-weight:800}.kit-label span{font-weight:500;color:#62807f;font-size:12px}
    .kit-variants{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.kit-variant{border:1px solid #d7e5e1;background:#fff;color:#234c4d;border-radius:12px;padding:9px 4px;font-size:12px;line-height:1.15;cursor:pointer;font-weight:600;min-height:44px}.kit-variant[aria-pressed=true]{background:#063b3c;color:white;border-color:#063b3c}.kit-variant:focus-visible,.kit-cta:focus-visible{outline:3px solid #3ba59b;outline-offset:2px}
    .kit-variants.tiles .kit-variant{padding:4px;background:white;overflow:hidden}.kit-variants.tiles .kit-variant[aria-pressed=true]{outline:2px solid #0a4d57;outline-offset:1px;color:#063b3c}.kit-variant img{width:100%;aspect-ratio:1.55;object-fit:cover;border-radius:8px}.kit-variant .name{display:block;padding:5px 2px 3px;min-height:32px}
    .kit-cta{border:0;border-radius:999px;background:#0a4d57;color:#fff;width:100%;padding:15px 20px;font-weight:800;font-size:15px;cursor:pointer;margin-top:18px}.kit-refill{display:block;text-align:center;color:#426a69;font-size:13px;margin:14px 0 0}.kit-refill a{color:inherit}
    @media(max-width:1023px){.kit-layout{grid-template-columns:1fr;gap:24px}.kit-visual{width:min(100%,460px);margin:auto}.kit-heading h3{font-size:25px}}
    @media(max-width:480px){.kit-card{border-radius:26px;padding:18px}.kit-variants{grid-template-columns:repeat(2,minmax(0,1fr))}.kit-variants.tiles{grid-template-columns:repeat(4,minmax(0,1fr))}.kit-variants.tiles .kit-variant{font-size:10px}.kit-variants.tiles .kit-variant .name{min-height:34px}.kit-heading{gap:8px}.kit-price{font-size:25px}.kit-inset{right:10px;bottom:33px}}
  `;
  doc.head.appendChild(style);
  if (mode !== 'current') {
    const option = ITEMS[selected];
    const imageFirst = mode === 'design';
    const main = imageFirst ? option.image : PACKAGING;
    const inset = imageFirst ? PACKAGING : option.image;
    const mainLabel = imageFirst ? `${option.name} Wipeband design` : 'Starter kit packaging - representative 3D render';
    const choices = ITEMS.map((v,i) => `<button type="button" class="kit-variant" aria-pressed="${i===selected}" data-index="${i}">${imageFirst ? `<img src="${v.image}" alt=""><span class="name">${escapeText(v.name)}</span>` : escapeText(v.name)}</button>`).join('');
    const replacement = doc.createElement('div');
    replacement.className = 'kit-card';
    replacement.innerHTML = `<div class="kit-layout"><div class="kit-visual"><img class="kit-main-image" src="${main}" alt="${escapeText(mainLabel)}"><div class="kit-inset"><img src="${inset}" alt=""><span>${imageFirst ? 'Kit packaging' : escapeText(option.name)}</span></div><p class="kit-caption">${imageFirst ? 'Selected wristband design' : 'Kit packaging - representative render'}</p></div><div><div class="kit-heading"><div><h3>Wipeband Starter Kit</h3><p class="kit-age">Designed for kids ages 2–6</p></div><div class="kit-price">${sale?'<s>$30.00</s>':''}$19.95</div></div><p class="kit-description">A reusable wristband with soft tissues ready when little noses need them.</p><ul class="kit-includes"><li>1 reusable Wipeband</li><li>5 tissue packs</li><li>6 layers each - 30 fresh wipes total</li></ul><div class="kit-label">Choose a design <span>Selected: ${escapeText(option.name)}</span></div><div class="kit-variants ${imageFirst?'tiles':''}" aria-label="Choose a design">${choices}</div><button class="kit-cta" type="button">Add to Cart - $19.95</button><p class="kit-refill">Already have Wipeband? <a href="/refills">Shop refills ($5.99) →</a></p></div></div>${trust}`;
    card.replaceWith(replacement);
    replacement.querySelectorAll('[data-index]').forEach(button => button.addEventListener('click', () => { selected = Number(button.dataset.index); setupFresh(); }));
    replacement.querySelector('.kit-cta').addEventListener('click', () => toast(`Preview only: ${ITEMS[selected].name} selected. Nothing was added to your cart.`));
  }
  doc.addEventListener('click', event => { if (event.target.closest('a,button') && !event.target.closest('.kit-variant, .kit-cta')) event.preventDefault(); }, true);
  document.getElementById('audit-result').textContent = 'Current homepage captured; this is a separate, non-purchasing preview.';
  resize(); doc.fonts.ready.then(resize);

}
function setupFresh(){ const y=window.scrollY; frame.onload=()=>{setup();window.scrollTo(0,y)}; frame.srcdoc=SOURCE; }
function jump(){const section=frame.contentDocument.getElementById('starter-kit');if(section) window.scrollTo({top:frame.getBoundingClientRect().top+window.scrollY+section.getBoundingClientRect().top-document.querySelector('.review-bar').offsetHeight-10,behavior:'instant'});}
document.querySelectorAll('[data-design]').forEach(b=>b.onclick=()=>{ mode=b.dataset.design;document.querySelectorAll('[data-design]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));setupFresh(); });
document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{document.getElementById('frame-wrap').classList.toggle('phone',b.dataset.size==='phone');document.querySelectorAll('[data-size]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));setTimeout(resize,400);});
document.getElementById('sale').onchange=e=>{sale=e.target.checked;setupFresh();};
document.getElementById('jump').onclick=jump;
document.getElementById('notes-toggle').onclick=e=>{const n=document.getElementById('notes');n.hidden=!n.hidden;e.currentTarget.setAttribute('aria-expanded',String(!n.hidden));};
if (new URLSearchParams(location.search).has('phone')) document.getElementById('frame-wrap').classList.add('phone');
window.addEventListener('resize',resize);frame.onload=setup;frame.srcdoc=SOURCE;
