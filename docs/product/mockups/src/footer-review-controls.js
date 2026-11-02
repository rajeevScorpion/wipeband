const frame = document.getElementById('site-frame');
let design = 'proposed';
let pattern = true;
let revealFrame = 0;

function updateReveal() {
  revealFrame = 0;
  const stage = frame.contentDocument?.querySelector('.footer-study');
  if (!stage) return;
  const top = frame.getBoundingClientRect().top + stage.getBoundingClientRect().top;
  const progress = Math.max(0, Math.min(1, (window.innerHeight - top) / (window.innerHeight + stage.offsetHeight * 0.3)));
  const maxLift = Math.min(28, frame.clientWidth * (frame.clientWidth < 640 ? 0.02 : 0.027));
  const lift = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : progress * maxLift;
  stage.style.setProperty('--footer-edge-adjust', '0px');
  stage.style.setProperty('--footer-lift', `${(-lift).toFixed(1)}px`);
  const wordmark = stage.querySelector('.footer-study-wordmark');
  if (wordmark) {
    const image = wordmark.getBoundingClientRect();
    if (image.height > 0) {
      const wBottom = image.top + image.height * 205.52 / 265.91;
      const adjustment = Math.max(0, stage.getBoundingClientRect().bottom - wBottom + 1);
      stage.style.setProperty('--footer-edge-adjust', `${adjustment.toFixed(1)}px`);
    }
  }
}

function scheduleReveal() {
  if (!revealFrame) revealFrame = requestAnimationFrame(updateReveal);
}

function resize() {
  frame.style.height = `${frame.contentDocument.documentElement.scrollHeight + 16}px`;
  scheduleReveal();
}

function setup() {
  const doc = frame.contentDocument;
  const heading = [...doc.querySelectorAll('main h2')].find(el => el.textContent.trim() === 'The tissue little noses can actually reach.');
  const section = heading?.closest('section');
  const footer = doc.querySelector('footer');
  if (!section || !footer) {
    document.getElementById('audit-result').textContent = 'Preview could not find the current closing section or footer.';
    return;
  }
  const style = doc.createElement('style');
  style.textContent = `
    main [style*="opacity"]{opacity:1!important;transform:none!important}
    main img{opacity:1!important}
    .footer-study{position:relative;flex:none;width:100%;margin:0;height:clamp(190px,24vw,350px);overflow:hidden;background:#fff;isolation:isolate}
    .footer-study-pattern{position:absolute;inset:0;background-image:url("${ASSETS.pattern}");background-size:clamp(120px,15vw,200px) auto;background-position:center center;opacity:.13;mask-image:radial-gradient(ellipse 50% 50% at center,#000 30%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 50% 50% at center,#000 30%,transparent 100%)}
    .footer-study-wordmark{position:absolute;display:block;width:min(75%,1100px);height:auto;left:50%;bottom:calc(max(-6.75vw,-99px) - min(1.6vw,22px));transform:translate(-50%,calc(var(--footer-lift,0px) + var(--footer-edge-adjust,0px)))}
    .footer-study[data-pattern="off"] .footer-study-pattern{display:none}
    @media(max-width:639px){.footer-study{height:170px}.footer-study-pattern{background-size:122.5px auto}.footer-study-wordmark{width:94%;bottom:-10.5vw}}
  `;
  doc.head.appendChild(style);
  if (design === 'proposed') {
    const stage = doc.createElement('section');
    stage.className = 'footer-study';
    stage.dataset.pattern = pattern ? 'on' : 'off';
    stage.setAttribute('aria-label', 'Decorative Wipeband wordmark');
    stage.innerHTML = '<div class="footer-study-pattern" aria-hidden="true"></div><img class="footer-study-wordmark" alt="" aria-hidden="true">';
    const wordmark = stage.querySelector('img');
    wordmark.addEventListener('load', scheduleReveal, { once: true });
    wordmark.src = ASSETS.logo;
    section.replaceWith(stage);
    stage.previousElementSibling?.classList.remove('border-b');
    stage.parentElement.classList.remove('pb-14');
    footer.before(stage);
    footer.style.marginTop = '0';
    footer.style.position = 'relative';
    footer.style.zIndex = '2';
    footer.style.boxShadow = '0 -9px 18px -12px rgba(5, 42, 48, 0.38)';
    const logo = footer.querySelector('img[alt="Wipeband"]');
    if (logo) {
      logo.src = ASSETS.insignia;
      logo.style.width = '48px';
      logo.style.height = 'auto';
    }
  }
  doc.addEventListener('click', event => {
    if (event.target.closest('a,button')) event.preventDefault();
  }, true);
  document.getElementById('audit-result').textContent = 'Current page captured locally; preview changes only the closing panel and footer brand mark.';
  resize();
  scheduleReveal();
  doc.fonts.ready.then(resize);
}

function reload() {
  frame.srcdoc = SOURCE;
}

document.querySelectorAll('[data-design]').forEach(button => {
  button.onclick = () => {
    design = button.dataset.design;
    document.querySelectorAll('[data-design]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    reload();
  };
});
document.querySelectorAll('[data-size]').forEach(button => {
  button.onclick = () => {
    document.getElementById('frame-wrap').classList.toggle('phone', button.dataset.size === 'phone');
    document.querySelectorAll('[data-size]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    setTimeout(resize, 400);
  };
});
document.getElementById('pattern-toggle').onclick = event => {
  pattern = !pattern;
  event.currentTarget.setAttribute('aria-pressed', String(pattern));
  event.currentTarget.textContent = `Pattern ${pattern ? 'on' : 'off'}`;
  const stage = frame.contentDocument.querySelector('.footer-study');
  if (stage) stage.dataset.pattern = pattern ? 'on' : 'off';
};
document.getElementById('notes-toggle').onclick = event => {
  const notes = document.getElementById('notes');
  notes.hidden = !notes.hidden;
  event.currentTarget.setAttribute('aria-expanded', String(!notes.hidden));
};
document.getElementById('jump').onclick = () => {
  const target = frame.contentDocument.querySelector('.footer-study') || frame.contentDocument.querySelector('footer');
  if (target) window.scrollTo({ top: frame.getBoundingClientRect().top + window.scrollY + target.getBoundingClientRect().top - document.querySelector('.review-bar').offsetHeight - 10, behavior: 'smooth' });
};
window.addEventListener('scroll', scheduleReveal, { passive: true });
window.addEventListener('resize', scheduleReveal);
frame.addEventListener('load', setup);
reload();
