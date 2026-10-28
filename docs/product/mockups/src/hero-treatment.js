const hero=document.querySelector('main section');
const scene=hero.querySelector('img');
const approvedScene=scene.src;
window.setReviewMode=(option,motion)=>{
  scene.src=option==='two'?'%%SCENE_TWO%%':approvedScene;
  document.documentElement.dataset.motion=motion;
};
const options=[...hero.querySelectorAll('[aria-pressed]')];
options.forEach(button=>button.onclick=()=>options.forEach(other=>other.setAttribute('aria-pressed',other===button)));
document.querySelectorAll('button').forEach(button=>{
  if(options.includes(button))return;
  button.onclick=event=>{event.preventDefault();parent.reviewToast('Preview only - no live cart or checkout action.');};
});
document.addEventListener('click',event=>{const link=event.target.closest('a');if(!link)return;event.preventDefault();parent.reviewToast('Navigation is paused in this preview.');});
window.auditContent=()=>{const norm=s=>s.replace(/\s+/g,' ').trim();return {sections:[...document.querySelectorAll('main section')].map(s=>norm(s.textContent)),links:[...document.querySelectorAll('a')].map(a=>({text:norm(a.textContent),href:a.getAttribute('href')}))};};
function resize(){parent.document.getElementById('site-frame').style.height=document.documentElement.scrollHeight+'px';}
new ResizeObserver(resize).observe(document.body);document.fonts.ready.then(resize);setTimeout(resize,500);
