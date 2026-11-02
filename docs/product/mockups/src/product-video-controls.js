const frame = document.getElementById('site-frame');
let design = 'video';
let video;
let inRange = false;

function resize() {
  frame.style.height = `${frame.contentDocument.documentElement.scrollHeight + 16}px`;
  updatePlayback();
}

function updatePlayback() {
  if (!video) return;
  const bounds = video.getBoundingClientRect();
  const frameTop = frame.getBoundingClientRect().top;
  const nearby = frameTop + bounds.bottom >= -200 && frameTop + bounds.top <= window.innerHeight + 200;
  const entered = nearby && !inRange;
  const exited = !nearby && inRange;
  inRange = nearby;
  if (entered && !video.dataset.loaded) {
    video.dataset.loaded = 'true';
    video.src = new URL('media/wipeband-loading-preview.mp4', window.location.href).href;
    video.load();
  }
  if (entered && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.play().catch(() => {});
  } else if (exited) {
    video.pause();
  }
}

function setup() {
  const doc = frame.contentDocument;
  const heading = [...doc.querySelectorAll('main h2')].find(el => el.textContent.replace(/\s+/g, ' ').trim().startsWith('One little pack.'));
  const section = heading?.closest('section');
  const panel = section?.querySelector('div[class*="rounded-[2rem]"]');
  if (!section || !panel) {
    document.getElementById('audit-result').textContent = 'Preview could not find the current product section.';
    return;
  }
  const style = doc.createElement('style');
  style.textContent = `
    main [style*="opacity"]{opacity:1!important;transform:none!important}
    main img{opacity:1!important}
    .product-video-panel{display:flex;justify-content:center}
    .product-video-frame{width:min(100%,440px);aspect-ratio:4/5;overflow:hidden;border-radius:20px;background:#e7f4ef;box-shadow:0 10px 28px rgba(5,42,48,.13),0 2px 6px rgba(5,42,48,.08)}
    .product-video-frame video{display:block;width:100%;height:100%;object-fit:contain}
    @media(max-width:639px){.product-video-frame{border-radius:16px}}
  `;
  doc.head.appendChild(style);
  video = null;
  inRange = false;
  if (design === 'video') {
    const replacement = doc.createElement('div');
    replacement.className = 'product-video-panel';
    const windowElement = doc.createElement('div');
    windowElement.className = 'product-video-frame';
    video = doc.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = POSTER;
    video.setAttribute('aria-label', 'Wipeband tissue pack animation');
    windowElement.appendChild(video);
    replacement.appendChild(windowElement);
    panel.replaceWith(replacement);
  }
  doc.addEventListener('click', event => {
    if (event.target.closest('a,button')) event.preventDefault();
  }, true);
  document.getElementById('audit-result').textContent = 'Current local page captured; only the layer demonstration is replaced in the video option.';
  resize();
  doc.fonts.ready.then(resize);
}

function reload() { frame.srcdoc = SOURCE; }
document.querySelectorAll('[data-design]').forEach(button => {
  button.onclick = () => {
    if (video) video.pause();
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
document.getElementById('notes-toggle').onclick = event => {
  const notes = document.getElementById('notes');
  notes.hidden = !notes.hidden;
  event.currentTarget.setAttribute('aria-expanded', String(!notes.hidden));
};
document.getElementById('jump').onclick = () => {
  const heading = [...frame.contentDocument.querySelectorAll('h2')].find(el => el.textContent.replace(/\s+/g, ' ').trim().startsWith('One little pack.'));
  if (heading) window.scrollTo({ top: frame.getBoundingClientRect().top + window.scrollY + heading.getBoundingClientRect().top - document.querySelector('.review-bar').offsetHeight - 20, behavior: 'smooth' });
};
window.addEventListener('scroll', updatePlayback, { passive: true });
window.addEventListener('resize', resize);
frame.addEventListener('load', setup);
reload();
