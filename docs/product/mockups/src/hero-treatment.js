const hero=document.querySelector('main section');
hero.className='hero-study';
const old=hero.cloneNode(true);
const title=old.querySelector('h1').outerHTML;
const description=old.querySelector('p').outerHTML;
const selectors=[...old.querySelectorAll('button')].filter(b=>!b.textContent.includes('Add to Cart'));
const purchase=[...old.querySelectorAll('button')].find(b=>b.textContent.includes('Add to Cart'));
purchase.textContent=purchase.textContent.replace(/\s*[\u2014\u2013_-]\s*/, ' ');
hero.innerHTML='<div class="scene" role="img" aria-label="Child wearing Wipeband in a classroom"></div><div class="hero-inner"><div class="hero-copy">'+title+description+'<div class="selector">'+selectors.map(b=>b.outerHTML).join('')+'</div><div class="purchase">'+purchase.outerHTML+'</div>'+'</div></div><svg class="wave" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70 C280 180 530 120 760 66 S1150 165 1310 80 Q1390 35 1440 48 L1440 200 L0 200 Z" fill="#EEF7EA"/><path d="M0 168 Q420 205 760 165 T1440 172 L1440 200 L0 200 Z" fill="#F3FAF0"/></svg><div class="product-wrap"><img class="product" src="%%PRODUCT%%" alt="Wipeband with fresh tissue layers"></div>';
const options=[...hero.querySelectorAll('.selector button')];options.forEach((b,i)=>{b.className='';b.setAttribute('aria-pressed',i===0);b.onclick=()=>options.forEach(x=>x.setAttribute('aria-pressed',x===b))});
window.setReviewMode=(option,motion)=>{hero.dataset.option=option;hero.dataset.motion=motion;if(motion==='off'){hero.style.setProperty('--mx','0px');hero.style.setProperty('--my','0px')}};
hero.onpointermove=e=>{if(hero.dataset.motion==='off'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5)*12+'px');hero.style.setProperty('--my',((e.clientY-r.top)/r.height-.5)*8+'px')};
hero.onpointerleave=()=>{hero.style.setProperty('--mx','0px');hero.style.setProperty('--my','0px')};
hero.querySelector('.purchase button').onclick=()=>parent.reviewToast('Preview only — the selected pattern would be added to your bag.');
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();if(a.getAttribute('href')==='#how-it-works'){const target=document.querySelector('#how-it-works');if(target){parent.scrollBy({top:target.getBoundingClientRect().top-90,behavior:'smooth'});return}}parent.reviewToast('Navigation is paused in this design preview.')});
document.querySelectorAll('button').forEach(b=>{if(hero.contains(b))return;b.onclick=e=>{e.preventDefault();parent.reviewToast('Preview only — no live cart or checkout action.')}});
window.auditContent=()=>{const norm=s=>s.replace(/\s+/g,' ').trim();return {sections:[...document.querySelectorAll('main section')].map(s=>norm(s.textContent)),links:[...document.querySelectorAll('a')].map(a=>({text:norm(a.textContent),href:a.getAttribute('href')}))}};
function resize(){parent.document.getElementById('site-frame').style.height=document.documentElement.scrollHeight+'px'}
new ResizeObserver(resize).observe(document.body);document.fonts.ready.then(resize);setTimeout(resize,500);
