const frame = document.getElementById('site-frame');
let mode = new URLSearchParams(location.search).get('qa') === 'design' ? 'design' : 'package', sale = true, selected = 0, toastTimer;
const escapeText = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function resize() { frame.style.height = `${frame.contentDocument.documentElement.scrollHeight + 16}px`; }
function toast(message) { const el = document.getElementById('toast'); el.textContent = message; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => el.hidden = true, 2800); }
function attachMagnifier(container) {
  const preview = container.querySelector('.kit-design-preview');
  if (!preview) return;
  const image = preview.querySelector('img');
  const lens = preview.querySelector('.kit-lens');
  let x = 0, y = 0, activeTouch = false;
  const showAt = (px, py) => {
    const bounds = preview.getBoundingClientRect();
    x = Math.max(0, Math.min(bounds.width, px));
    y = Math.max(0, Math.min(bounds.height, py));
    const imageWidth = image.naturalWidth || 1, imageHeight = image.naturalHeight || 1;
    const scale = Math.max(bounds.width / imageWidth, bounds.height / imageHeight);
    const renderedWidth = imageWidth * scale, renderedHeight = imageHeight * scale;
    const offsetX = (bounds.width - renderedWidth) / 2, offsetY = (bounds.height - renderedHeight) / 2;
    const zoom = 2.3, radius = lens.offsetWidth / 2;
    lens.style.left = `${x}px`; lens.style.top = `${y}px`;
    lens.style.backgroundImage = `url("${image.src}")`;
    lens.style.backgroundSize = `${renderedWidth * zoom}px ${renderedHeight * zoom}px`;
    lens.style.backgroundPosition = `${radius - (x - offsetX) * zoom}px ${radius - (y - offsetY) * zoom}px`;
    lens.classList.add('visible');
  };
  const pointer = event => { const box = preview.getBoundingClientRect(); showAt(event.clientX - box.left, event.clientY - box.top); };
  preview.addEventListener('pointermove', event => { if (event.pointerType !== 'touch' || activeTouch) pointer(event); });
  preview.addEventListener('pointerdown', event => { if (event.pointerType === 'touch') { activeTouch = true; pointer(event); } });
  preview.addEventListener('pointerup', event => { if (event.pointerType === 'touch') { activeTouch = false; lens.classList.remove('visible'); } });
  preview.addEventListener('pointercancel', () => { activeTouch = false; lens.classList.remove('visible'); });
  preview.addEventListener('pointerleave', () => { activeTouch = false; lens.classList.remove('visible'); });
  preview.addEventListener('focus', () => { const box = preview.getBoundingClientRect(); showAt(box.width / 2, box.height / 2); });
  preview.addEventListener('blur', () => lens.classList.remove('visible'));
  preview.addEventListener('keydown', event => {
    const moves = {ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20]};
    if (moves[event.key]) { event.preventDefault(); showAt(x + moves[event.key][0], y + moves[event.key][1]); }
  });
  if (new URLSearchParams(location.search).has('magnify')) { const box = preview.getBoundingClientRect(); showAt(box.width / 2, box.height / 2); }
}
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
    .kit-card > .mt-8 > div{justify-content:space-between;gap:12px 16px}
    @media(max-width:767px){.kit-card > .mt-8 > div{justify-content:center;gap:16px 20px}}
    .kit-layout{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(28px,4vw,56px);align-items:center}
    .kit-visual{position:relative;min-width:0}.kit-main-image{width:100%;aspect-ratio:1;object-fit:cover;border-radius:24px;display:block}.kit-caption{font-size:12px;color:#557678;margin:10px 4px 0}
    .kit-inset{position:absolute;right:14px;bottom:36px;width:31%;background:white;padding:5px;border-radius:15px;box-shadow:0 8px 24px #05333722}.kit-inset img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:11px}.kit-inset span{display:block;text-align:center;font-size:10px;font-weight:700;color:#06444c;padding:4px 0 1px}
    .kit-heading{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.kit-heading h3{font-size:clamp(24px,2.4vw,32px);line-height:1.1;font-weight:900;letter-spacing:-.025em;color:#052f2f;margin:0}.kit-age{font-size:15px;color:#627d7c;margin:6px 0 0}.kit-price{font-size:29px;font-weight:900;color:#052f2f;white-space:nowrap;line-height:1.05}.kit-price s{display:inline;color:#839b98;font-size:14px;font-weight:600;margin-right:7px}.kit-price .price-top{display:flex;align-items:center;justify-content:flex-end;margin-bottom:6px}.kit-price .sale-tag{font-size:10px;font-weight:800;letter-spacing:.02em;color:#247a67;background:#e2f4ea;border-radius:999px;padding:4px 8px}
    .kit-description{color:#53716f;font-size:15px;line-height:1.5;margin:16px 0}.kit-includes{border-top:1px solid #0a4d5719;border-bottom:1px solid #0a4d5719;padding:14px 0;margin:0 0 18px;display:flex;gap:8px 24px;flex-wrap:wrap;list-style:none;color:#123f40;font-size:14px;font-weight:600}.kit-includes li:before{content:'✓';color:#62b44a;margin-right:8px;font-weight:bold}
    .kit-label{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:10px;color:#123f40;font-size:14px;font-weight:800}.kit-label span{font-weight:500;color:#62807f;font-size:12px}
    .kit-design-picker{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,6fr);gap:16px;align-items:stretch}.kit-design-preview{position:relative;overflow:hidden;border-radius:16px;margin:0;aspect-ratio:1;min-width:0;cursor:zoom-in;touch-action:pan-y}.kit-design-preview img{display:block;width:100%;height:100%;object-fit:cover;border-radius:16px;box-shadow:0 4px 14px #05333712}
    .kit-design-preview:focus-visible{outline:3px solid #3ba59b;outline-offset:3px}.kit-lens{position:absolute;width:96px;height:96px;border:3px solid white;border-radius:50%;box-shadow:0 4px 18px #052a3060;transform:translate(-50%,-50%);pointer-events:none;opacity:0;background-repeat:no-repeat;z-index:2}.kit-lens.visible{opacity:1}.kit-zoom-hint{position:absolute;left:8px;bottom:8px;background:#062f32d9;color:#fff;border-radius:99px;padding:4px 8px;font:600 10px/1.2 system-ui;pointer-events:none}.kit-zoom-hint .touch{display:none}@media(hover:none){.kit-zoom-hint .mouse{display:none}.kit-zoom-hint .touch{display:inline}}
    .kit-variants{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.kit-variant{border:1px solid #d7e5e1;background:#fff;color:#234c4d;border-radius:12px;padding:9px 4px;font-size:12px;line-height:1.15;cursor:pointer;font-weight:600;min-height:44px}.kit-variant[aria-pressed=true]{background:#063b3c;color:white;border-color:#063b3c}.kit-variant:focus-visible,.kit-cta:focus-visible{outline:3px solid #3ba59b;outline-offset:2px}
    .kit-variants.tiles .kit-variant{padding:4px;background:white;overflow:hidden}.kit-variants.tiles .kit-variant[aria-pressed=true]{outline:2px solid #0a4d57;outline-offset:1px;color:#063b3c}.kit-variant img{width:100%;aspect-ratio:1.55;object-fit:cover;border-radius:8px}.kit-variant .name{display:block;padding:5px 2px 3px;min-height:32px}
    .kit-cta{border:0;border-radius:999px;background:#0a4d57;color:#fff;width:100%;padding:15px 20px;font-weight:800;font-size:15px;cursor:pointer;margin-top:18px}.kit-refill{display:block;text-align:center;color:#426a69;font-size:13px;margin:14px 0 0}.kit-refill a{color:inherit}
    @media(max-width:1023px){.kit-layout{grid-template-columns:1fr;gap:24px}.kit-visual{width:min(100%,460px);margin:auto}.kit-heading h3{font-size:25px}}
    @media(max-width:480px){.kit-card{border-radius:26px;padding:18px}.kit-design-picker{grid-template-columns:minmax(0,4fr) minmax(0,6fr);gap:10px}.kit-design-preview{aspect-ratio:auto}.kit-design-preview img{object-fit:cover}.kit-variants{grid-template-columns:repeat(2,minmax(0,1fr))}.kit-variants.tiles{grid-template-columns:repeat(4,minmax(0,1fr))}.kit-variants.tiles .kit-variant{font-size:10px}.kit-variants.tiles .kit-variant .name{min-height:34px}.kit-heading{gap:8px}.kit-price{font-size:25px}.kit-inset{right:10px;bottom:33px}}
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
    replacement.innerHTML = `<div class="kit-layout"><div class="kit-visual"><img class="kit-main-image" src="${main}" alt="${escapeText(mainLabel)}">${imageFirst ? `<div class="kit-inset"><img src="${inset}" alt=""><span>Kit packaging</span></div>` : ''}<p class="kit-caption">${imageFirst ? 'Selected wristband design' : 'Kit packaging - representative render'}</p></div><div><div class="kit-heading"><div><h3>Wipeband Starter Kit</h3><p class="kit-age">Designed for kids ages 2–6</p></div><div class="kit-price">${sale?'<div class="price-top"><s>$30.00</s><span class="sale-tag">Sale</span></div>':''}$19.95</div></div><p class="kit-description">A reusable wristband with soft tissues ready when little noses need them.</p><ul class="kit-includes"><li>1 reusable Wipeband</li><li>5 tissue packs</li><li>6 layers each - 30 fresh wipes total</li></ul><div class="kit-label">Choose a design</div><div class="kit-design-picker" style="${imageFirst ? 'display:block' : ''}">${imageFirst ? '' : `<figure class="kit-design-preview" tabindex="0" aria-label="Magnify selected design: hover, touch and hold, or use arrow keys"><img src="${option.image}" alt="${escapeText(option.name)} Wipeband design"><span class="kit-lens" aria-hidden="true"></span><span class="kit-zoom-hint" aria-hidden="true"><span class="mouse">Hover to zoom</span><span class="touch">Hold to zoom</span></span></figure>`}<div class="kit-variants ${imageFirst?'tiles':''}" aria-label="Choose a design">${choices}</div></div><button class="kit-cta" type="button">Add to Cart - $19.95</button><p class="kit-refill">Already have Wipeband? <a href="/refills">Shop refills ($5.99) →</a></p></div></div>${trust}`;
    card.replaceWith(replacement);
    if (!imageFirst) attachMagnifier(replacement);
    replacement.querySelectorAll('[data-index]').forEach(button => button.addEventListener('click', () => {
      selected = Number(button.dataset.index);
      replacement.querySelectorAll('[data-index]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const preview = replacement.querySelector(imageFirst ? '.kit-main-image' : '.kit-design-preview img');
      preview.src = ITEMS[selected].image;
      preview.alt = `${ITEMS[selected].name} Wipeband design`;
    }));
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
