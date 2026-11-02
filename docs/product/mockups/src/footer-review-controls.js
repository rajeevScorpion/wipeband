const frame = document.getElementById('site-frame');
let design = 'proposed';
let pattern = true;

function resize() {
  frame.style.height = `${frame.contentDocument.documentElement.scrollHeight + 16}px`;
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
    .footer-study{position:relative;height:clamp(190px,24vw,350px);overflow:hidden;background:#fff;isolation:isolate}
    .footer-study-pattern{position:absolute;inset:0;background-image:url("${ASSETS.pattern}");background-size:clamp(240px,30vw,400px) auto;background-position:center center;opacity:.13;mask-image:radial-gradient(ellipse 50% 50% at center,#000 30%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 50% 50% at center,#000 30%,transparent 100%)}
    .footer-study-wordmark{position:absolute;display:block;width:min(75%,1100px);height:auto;left:50%;bottom:-11%;transform:translateX(-50%)}
    .footer-study[data-pattern="off"] .footer-study-pattern{display:none}
    @media(max-width:639px){.footer-study{height:170px}.footer-study-pattern{background-size:245px auto}.footer-study-wordmark{width:94%;bottom:-5%}}
  `;
  doc.head.appendChild(style);
  if (design === 'proposed') {
    const stage = doc.createElement('section');
    stage.className = 'footer-study';
    stage.dataset.pattern = pattern ? 'on' : 'off';
    stage.setAttribute('aria-label', 'Decorative Wipeband wordmark');
    stage.innerHTML = '<div class="footer-study-pattern" aria-hidden="true"></div><img class="footer-study-wordmark" alt="" aria-hidden="true">';
    stage.querySelector('img').src = ASSETS.logo;
    section.replaceWith(stage);
    stage.parentElement.classList.remove('pb-14');
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
frame.addEventListener('load', setup);
reload();
