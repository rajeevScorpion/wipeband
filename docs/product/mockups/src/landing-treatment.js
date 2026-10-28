/* Runs only inside the standalone mockup. Never sends commerce/API requests. */
(() => {
  const sections = [...document.querySelectorAll('main section')];
  const ns = 'http://www.w3.org/2000/svg';
  const svg = (viewBox, content) => `<svg xmlns="${ns}" viewBox="${viewBox}" fill="none" aria-hidden="true">${content}</svg>`;
  function art(el, content, cls = '') {
    const node = document.createElement('div');
    node.className = 'wb-art ' + cls;
    node.setAttribute('aria-hidden', 'true');
    node.innerHTML = content;
    el.prepend(node);
    return node;
  }
  sections.forEach((section, index) => section.dataset.wbSection = index);
  const medias = [...document.querySelectorAll('[data-asset-id]')];
  medias.forEach(el => el.classList.add('wb-media'));
  const hero = sections[0];
  hero.querySelector('[data-asset-id]').parentElement.lastElementChild.classList.add('wb-hero-aside');
  art(hero, svg('0 0 1320 650', `<path d="M710 -120C1070 0 890 275 1220 410s180 300 80 370" stroke="#66C5CD" stroke-width="65" opacity=".15"/><path d="M690 560C800 660 1210 590 1200 235S965 80 1020 205" stroke="#62B44A" stroke-width="2" stroke-dasharray="5 8" opacity=".4"/><path d="M20 490q-40 150 150 110" stroke="#FDB515" stroke-width="32" opacity=".16"/><g stroke="#F36F6B" stroke-width="3" stroke-linecap="round"><path d="m1260 150 14-16m-7 38 23-4m-22 27 14 11"/><path d="m630 74 8-17m7 26 17-6"/></g><g fill="#66C5CD"><circle cx="75" cy="70" r="4"/><circle cx="95" cy="87" r="2"/><circle cx="1203" cy="537" r="5"/></g>`));
  sections[1].querySelectorAll('.w-14').forEach(el => el.classList.add('wb-ribbon-icon'));
  const steps = [...sections[2].querySelector('.grid').children];
  steps.forEach(el => el.classList.add('wb-step-card'));
  art(sections[2], svg('0 0 1320 640', `<path class="wb-ink-path" d="M-30 370c150-170 320-280 490-120s300 300 490 40 240-60 400-100" stroke="#66C5CD" stroke-width="2" opacity=".6"/><g stroke="#FDB515" stroke-width="2"><circle cx="75" cy="120" r="16"/><path d="m1125 80 12 24 24-12-12-24z"/></g>`), 'wb-desktop-art');
  sections[3].querySelectorAll('.group').forEach(el => el.classList.add('wb-feature'));
  const layerNodes = [...sections[3].querySelectorAll('[style]')].filter(el => el.style.transform.includes('rotate('));
  layerNodes.forEach((el, i) => el.dataset.layer = i);
  const layerTransforms = layerNodes.map(el => el.style.transform);
  art(sections[3], svg('0 0 1320 560', `<circle cx="660" cy="280" r="195" stroke="#0A4D57" stroke-width="1" opacity=".13"/><circle cx="660" cy="280" r="220" stroke="#0A4D57" stroke-width="1" stroke-dasharray="4 8" opacity=".2"/><path d="m470 100 17-28m-26 19 35-5M838 440l20 20m-25 0 31-18" stroke="#62B44A" stroke-width="3" stroke-linecap="round"/><circle cx="453" cy="369" r="7" fill="#FDB515"/><circle cx="880" cy="190" r="5" fill="#F36F6B"/>`), 'wb-desktop-art');
  const adventureCards = [...sections[4].querySelector('.grid').children];
  const sceneArt = [
    `<path d="M40 255V95l50-25 50 25v160M60 255V120h20v30H60m40 0h20v-30h-20m-40 60h20v30H60m40 0h20v-30h-20m55 75V130h140v125M165 140h120m-110 25h25v35h-25m40 0h25v-35h-25" stroke="#0A4D57" stroke-width="2" opacity=".22"/><path d="M15 255h310" stroke="#62B44A" stroke-width="4"/><circle cx="285" cy="55" r="20" stroke="#FDB515" stroke-width="10" opacity=".5"/>`,
    `<path d="M40 245q110-200 240 0M55 245q110-160 210 0M175 115v140M40 255h260" stroke="#62B44A" stroke-width="2" opacity=".38"/><path d="m255 50 25 30-25 35-25-35zM255 115q-35 35-6 60t-5 55" stroke="#F36F6B" stroke-width="2"/><path d="M20 80q20-15 40 0m20-25q15-15 30 0" stroke="#66C5CD" stroke-width="3" opacity=".6"/>`,
    `<path d="M-20 235q110-210 210-60t170-20M-15 255q130-170 235-50t140-10" stroke="#66C5CD" stroke-width="2" opacity=".5"/><path d="M-20 255q210-60 390 10" stroke="#0A4D57" stroke-width="3" stroke-dasharray="12 12" opacity=".2"/><path d="m240 100 15-50 35 10-15 50zm7-25 33 9m-28 10-13 20m35-14 1 25" stroke="#FDB515" stroke-width="3" opacity=".7"/>`
  ];
  adventureCards.forEach((el, i) => {
    el.classList.add('wb-adventure');
    const media = el.querySelector('[data-asset-id]');
    art(media, svg('0 0 340 280', sceneArt[i]));
  });
  const productCards = [...sections[5].querySelector('.grid').children];
  productCards.forEach(el => {
    el.classList.add('wb-product-card');
    el.querySelector('.shadow-inner')?.classList.add('wb-product-art');
  });
  sections[6].querySelector('.rounded-3xl').classList.add('wb-refill-banner');
  [...sections[7].querySelector('.grid').children].forEach(el => el.classList.add('wb-story-card'));
  [...sections[8].querySelector('.grid').children].forEach(el => el.classList.add('wb-faq'));
  art(sections[9], svg('0 0 1320 440', `<g stroke="#66C5CD" stroke-width="2" opacity=".5"><path d="M-150 360q180-430 370-190T300 510"/><path d="M-120 350q180-430 370-190T330 500"/><path d="M-90 340q180-430 370-190T360 490"/></g><g stroke="#62B44A" stroke-width="2" opacity=".55"><path d="M1150-80q-220 220 50 280t180 220M1170-65q-220 220 50 280t180 220M1190-50q-220 220 50 280t180 220"/></g><path d="m1130 330 18-22m-8 42 30-2M160 70l10 20m-22-10 32 2" stroke="#FDB515" stroke-width="4" stroke-linecap="round"/>`));
  const matchMediaReduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = [];
  const entrances = [];
  const noMotion = () => document.documentElement.dataset.design !== 'proposed' || document.documentElement.dataset.motion === 'off' || matchMediaReduced.matches;
  function resetMotion() {
    animations.splice(0).forEach(a => a.stop());
    entrances.splice(0).forEach(a => a.stop());
    document.querySelectorAll('.wb-step-card,.wb-adventure,.wb-faq').forEach(el=>el.style.removeProperty('transform'));
    const heroMedia = hero.querySelector('.wb-media');
    heroMedia.style.removeProperty('transform');
    layerNodes.forEach((el,i) => el.style.transform=layerTransforms[i]);
  }
  let lastPointer = {x:0,y:0};
  hero.addEventListener('pointermove', event => {
    if (noMotion() || event.pointerType === 'touch') return;
    const r = hero.getBoundingClientRect();
    const x = (event.clientX-r.left)/r.width-.5;
    const y = (event.clientY-r.top)/r.height-.5;
    if(Math.abs(x-lastPointer.x)+Math.abs(y-lastPointer.y)<.035)return;
    lastPointer={x,y};
    animations.splice(0).forEach(a=>a.stop());
    animations.push(Motion.animate(hero.querySelector('.wb-media'), { rotate:2+x*3, x:x*11, y:y*9 }, {type:'spring',stiffness:95,damping:22}));
  });
  hero.addEventListener('pointerleave', () => {if(!noMotion()){animations.splice(0).forEach(a=>a.stop());animations.push(Motion.animate(hero.querySelector('.wb-media'),{rotate:2,x:0,y:0},{duration:.6}))}});
  let enterDone = new Set();
  function tick() {
    const frame = parent.document.getElementById('site-frame');
    if(!frame)return;
    const top = frame.getBoundingClientRect().top;
    sections.forEach((section, i) => {
      const r=section.getBoundingClientRect();
      const localTop=top+r.top;
      const p=Math.max(0,Math.min(1,(parent.innerHeight-localTop)/(parent.innerHeight+r.height)));
      section.style.setProperty('--wb-path',noMotion()?1:p);
      if(!noMotion()&&localTop<parent.innerHeight*.86&&localTop+r.height>0&&!enterDone.has(i)){
        enterDone.add(i);
        const targets=section.querySelectorAll('.wb-step-card,.wb-adventure,.wb-faq');
        if(targets.length)entrances.push(Motion.animate([...targets],{y:[14,0]},{duration:.65,delay:Motion.stagger(.075),ease:[.22,1,.36,1]}));
      }
      if(i===3&&!noMotion())layerNodes.forEach((el,j)=>el.style.transform=`translate(${j*3+p*j*3}px,${-p*j*4}px) rotate(${j*1.5-4-p*j}deg)`);
    });
  }
  let queued=false;
  parent.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;tick()})}},{passive:true});
  window.setReviewMode = (design,motion) => {document.documentElement.dataset.design=design;document.documentElement.dataset.motion=motion;resetMotion();enterDone=new Set();tick();resize()};
  matchMediaReduced.addEventListener('change',()=>{resetMotion();tick()});
  const norm=s=>s.replace(/\s+/g,' ').trim();
  window.auditContent=()=>({sections:sections.map(s=>norm(s.textContent)),links:[...document.querySelectorAll('a')].map(a=>({text:norm(a.textContent),href:a.getAttribute('href')}))});
  function resize(){parent.document.getElementById('site-frame').style.height=Math.ceil(document.body.scrollHeight)+'px'}
  new ResizeObserver(resize).observe(document.body);
  const originalButtons=[...sections[5].querySelectorAll('button')];
  const patternButtons=originalButtons.slice(0,3);
  patternButtons.forEach((b,i)=>b.addEventListener('click',()=>{patternButtons.forEach((el,j)=>{el.setAttribute('aria-pressed',i===j);el.style.outline=i===j?'2px solid #0A4D57':''});parent.reviewToast('Pattern selection preview only. Storefront copy and catalog are unchanged.')}));
  originalButtons.slice(3).forEach(b=>b.addEventListener('click',()=>parent.reviewToast('Visual prototype: no cart, payment or fulfillment request is created.')));
  document.querySelector('header button')?.addEventListener('click',()=>parent.reviewToast('Cart is outside this landing-page visual review.'));
  document.querySelectorAll('a').forEach(a=>a.addEventListener('click',event=>{event.preventDefault();const href=a.getAttribute('href');if(href?.startsWith('#')){document.querySelector(href)?.scrollIntoView();return}parent.reviewToast('Original destination preserved: '+href+'. Navigation is paused in this visual review.')}));
  document.documentElement.dataset.design='proposed';document.documentElement.dataset.motion='on';tick();document.fonts.ready.then(resize);
})();
