'use client';
import { useEffect } from 'react';

export default function Effects() {
  useEffect(() => {
    if (window.__mx) return; // avoid double run in React StrictMode (dev)
    window.__mx = 1;
    const $ = (id) => document.getElementById(id);
    const heroart = $('heroart'), aboutart = $('aboutart'), offart = $('offart'), finalart = $('finalart');
    const tg = $('tg'), ex = $('ex'), ms = $('ms'), rg = $('rg'), mq = $('mq');
const U='https://mountainiax.com/wp-content/uploads/';
// palettes: sky top, sky bottom, sun, [far..near], snow, stars
const P=[
{s:['#f7d89a','#e8855a'],sun:'#fff3c8',m:['#8c8aa0','#5d6f86','#35506a','#183040'],sn:'#fbe9d0'},
{s:['#bcd8ee','#eaf2f7'],sun:'#fff',m:['#c4d4e2','#8aa6bf','#4f7391','#264660'],sn:'#fff'},
{s:['#f6e8b8','#a9d3a0'],sun:'#fffbe0',m:['#9dbb98','#6a9a72','#36704f','#16442f'],sn:'#f4f7ec'},
{s:['#f0b79b','#6d5d9b'],sun:'#ffe2c0',m:['#a58aa6','#745f8a','#443a68','#1f2146'],sn:'#f6d8cf'},
{s:['#d2dbd5','#8fa89e'],sun:'#eef3ef',m:['#b3c3bb','#80988d','#4d6b60','#25423a'],sn:'#eef3ef'},
{s:['#0b1626','#2b4668'],sun:'#e8eefc',m:['#3a5273','#2a3f5e','#1b2c45','#0e1a2b'],sn:'#a9bcd8',st:1}];
let seed=1;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
function ridge(base,amp,step,w,sn){let p=[],ph=rnd()*9,f=.004+rnd()*.004,xs=[];
 for(let x=-40;x<=w+40;x+=step){const y=base-Math.abs(Math.sin(x*f+ph))*amp-Math.sin(x*f*2.7+ph*2)*amp*.35-rnd()*amp*.18;p.push([x,y]);}
 return p}
function scene(pi,sd,hero){seed=sd*977+13;const c=P[pi],W=1600,H=900;let o=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="g${pi}${sd}${hero?'h':''}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.s[0]}"/><stop offset="1" stop-color="${c.s[1]}"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="14"/></filter></defs><rect width="${W}" height="${H}" fill="url(#g${pi}${sd}${hero?'h':''})"/>`;
 if(c.st){for(let i=0;i<90;i++)o+=`<circle cx="${rnd()*W}" cy="${rnd()*H*.55}" r="${rnd()*1.6+.3}" fill="#fff" opacity="${rnd()*.8+.2}">${hero?`<animate attributeName="opacity" values=".2;1;.2" dur="${2+rnd()*4}s" repeatCount="indefinite"/>`:''}</circle>`}
 o+=`<g data-d="0.02"><circle cx="${W*.7}" cy="${H*.36}" r="${hero?120:90}" fill="${c.sun}" opacity=".95"/><circle cx="${W*.7}" cy="${H*.36}" r="260" fill="${c.sun}" opacity=".25" filter="url(#b)"/></g>`;
 if(hero)o+=`<g data-d="0.05" opacity=".55" filter="url(#b)"><ellipse cx="300" cy="260" rx="260" ry="34" fill="#fff"><animate attributeName="cx" values="300;520;300" dur="38s" repeatCount="indefinite"/></ellipse><ellipse cx="1200" cy="200" rx="300" ry="40" fill="#fff"><animate attributeName="cx" values="1200;980;1200" dur="46s" repeatCount="indefinite"/></ellipse></g>`;
 const L=[[.62,300,70],[.72,250,55],[.84,200,45],[1.0,150,34]];
 L.forEach((l,i)=>{const pts=ridge(H*l[0]+40,l[1],l[2],W);let d='M-40 '+H+' '+pts.map(p=>'L'+p[0].toFixed(0)+' '+p[1].toFixed(0)).join(' ')+' L'+(W+40)+' '+H+'Z';
  o+=`<g data-d="${[.08,.16,.26,.4][i]}"><path d="${d}" fill="${c.m[i]}"/>`;
  if(i<2){pts.forEach((p,k)=>{if(k&&k<pts.length-1&&p[1]<pts[k-1][1]&&p[1]<pts[k+1][1]&&p[1]<H*.5){const h=26+rnd()*30;o+=`<path d="M${p[0]-h*.9} ${p[1]+h} L${p[0]} ${p[1]} L${p[0]+h*.9} ${p[1]+h} L${p[0]+h*.4} ${p[1]+h*.7} L${p[0]} ${p[1]+h*1.05} L${p[0]-h*.4} ${p[1]+h*.7}Z" fill="${c.sn}" opacity=".92"/>`}})}
  if(i==3){for(let k=0;k<26;k++){const x=rnd()*W,y=H*.93+rnd()*H*.07,s=26+rnd()*38;o+=`<path d="M${x} ${y-s} L${x+s*.28} ${y-s*.4} L${x+s*.14} ${y-s*.4} L${x+s*.34} ${y} L${x-s*.34} ${y} L${x-s*.14} ${y-s*.4} L${x-s*.28} ${y-s*.4}Z" fill="${c.m[3]}" opacity=".9"/>`}}
  o+=`</g>`;
  if(i==1)o+=`<rect y="${H*.8}" width="${W}" height="140" fill="${c.s[1]}" opacity=".28" filter="url(#b)"/>`});
 return o+'</svg>'}
function fract(N,rough){const h=new Array(N+1).fill(0);h[0]=rnd();h[N]=rnd();let step=N,disp=1;while(step>1){const half=step/2;for(let i=half;i<N;i+=step)h[i]=(h[i-half]+h[i+half])/2+(rnd()-.5)*disp;disp*=rough;step=half}const mn=Math.min(...h),mx=Math.max(...h);return h.map(v=>(v-mn)/(mx-mn))}
function range(base,amp,bumps,rough){const N=128,h=fract(N,rough),o=[];for(let i=0;i<=N;i++){const x=i*1600/N;let y=base-h[i]*amp*.55;bumps.forEach(b=>{y-=b[2]*Math.exp(-Math.pow((x-b[0])/b[1],2))});o.push([x,y])}return o}
function heroScene(){seed=777;const W=1600,H=900,P='M-60 800 Q400 750 800 785 T1660 765';
const pd=a=>'M0 '+H+' '+a.map(p=>'L'+p[0].toFixed(0)+' '+p[1].toFixed(0)).join(' ')+' L'+W+' '+H+'Z';
const L1=pd(range(560,260,[[640,250,240],[1020,190,150],[250,200,90]],.6)),L2=pd(range(655,200,[[900,230,120],[430,190,90]],.55)),L3=pd(range(725,130,[[300,300,60],[1250,260,70]],.5)),F=range(778,70,[[700,300,40]],.5);for(let k=0;k<4;k++)for(let i=1;i<F.length-1;i++)F[i][1]=(F[i-1][1]+F[i][1]*2+F[i+1][1])/4;
const pine=(x,y,s,c)=>`<path fill="${c}" d="M${x} ${y-s} L${x+s*.28} ${y-s*.4} L${x+s*.14} ${y-s*.4} L${x+s*.34} ${y} L${x-s*.34} ${y} L${x-s*.14} ${y-s*.4} L${x-s*.28} ${y-s*.4}Z"/>`;
let st='';for(let i=0;i<110;i++)st+=`<circle cx="${(rnd()*W).toFixed(0)}" cy="${(rnd()*H*.5).toFixed(0)}" r="${(rnd()*1.5+.3).toFixed(1)}" fill="#fff"><animate attributeName="opacity" values=".15;1;.15" dur="${(2+rnd()*3).toFixed(1)}s" repeatCount="indefinite"/></circle>`;
let pf='';F.forEach((p,k)=>{if(k%2==0)pf+=pine(p[0].toFixed(0),(p[1]+16).toFixed(0),26+rnd()*26,'#14403a')});
let fp='';for(let i=0;i<30;i++){const x=rnd()*W;fp+=pine(x.toFixed(0),(802+rnd()*20).toFixed(0),44+rnd()*56,'#0c2619')}
const jk=['#ef5b3f','#f4b93c','#3f8fd2','#e0529a','#4fb07a'];
const fig=c=>`<g><circle cx="0" cy="-34" r="4.4" fill="#2a1d14"/><path d="M-4.5 -29 L4.5 -29 L5.5 -13 L2.5 -13 L0 -4 L2.5 0 L-3 0 L-3 -13 L-6 -13Z" fill="${c}"/><rect x="-11" y="-30" width="8" height="14" rx="2.5" fill="#101c16"/><path d="M8 -23 L11 0" stroke="#101c16" stroke-width="1.6"/></g>`;
let tk='';for(let i=0;i<5;i++)tk+=`<g><animateMotion dur="80s" begin="-${i*13+8}s" repeatCount="indefinite" path="${P}"/><g transform="scale(1.7)"><animateTransform attributeName="transform" type="translate" values="0 0;0 -1.4;0 0" dur=".9s" repeatCount="indefinite" additive="sum"/>${fig(jk[i])}</g></g>`;
let bd='';for(let i=0;i<4;i++){const y=250+i*50+rnd()*30;bd+=`<g><animateTransform attributeName="transform" type="translate" from="-120 ${y.toFixed(0)}" to="1720 ${(y-70).toFixed(0)}" dur="${26+i*7}s" begin="-${i*9}s" repeatCount="indefinite"/><path fill="none" stroke="#10202e" stroke-width="2.6" stroke-linecap="round" d="M0 0 Q7 -7 14 0 Q21 -7 28 0"><animate attributeName="d" values="M0 0 Q7 -7 14 0 Q21 -7 28 0;M0 0 Q7 5 14 0 Q21 5 28 0;M0 0 Q7 -7 14 0 Q21 -7 28 0" dur=".7s" repeatCount="indefinite"/></path></g>`}
let fl='';const cs=['#3a6fb0','#f4f1e8','#c8443c','#4a9a5c','#e8b83c'];for(let i=1;i<=10;i++){const t=i/11,x=(1-t)*(1-t)*1190+2*(1-t)*t*1360+t*t*1530,y=(1-t)*(1-t)*684+2*(1-t)*t*730+t*t*684;fl+=`<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="15" height="11" fill="${cs[i%5]}"><animateTransform attributeName="transform" type="rotate" values="-7 ${x.toFixed(0)} ${y.toFixed(0)};9 ${x.toFixed(0)} ${y.toFixed(0)};-7 ${x.toFixed(0)} ${y.toFixed(0)}" dur="${(1.1+i%3*.3).toFixed(1)}s" repeatCount="indefinite"/></rect>`}
const sun=(r,o,f)=>`<circle cx="1330" cy="900" r="${r}" fill="#ffe3b0" opacity="${o}" ${f||''}><animate attributeName="cy" from="900" to="430" dur="7s" begin=".3s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".25 .1 .2 1"/></circle>`;
const warm=(d,id,o)=>`<clipPath id="${id}"><path d="${d}"/></clipPath><rect width="${W}" height="${H}" clip-path="url(#${id})" fill="url(#wm)" opacity="${o}"/>`;
return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs>
<linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#08101e"><animate attributeName="stop-color" from="#08101e" to="#35547f" dur="7s" begin=".3s" fill="freeze"/></stop><stop offset="1" stop-color="#1b2d4a"><animate attributeName="stop-color" from="#1b2d4a" to="#f7b97a" dur="7s" begin=".3s" fill="freeze"/></stop></linearGradient>
<linearGradient id="s1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".16" stop-color="#e9eff7"/><stop offset=".3" stop-color="#8da2c6"/><stop offset="1" stop-color="#4d6590"/></linearGradient>
<linearGradient id="s2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe6f1"/><stop offset=".14" stop-color="#b4c2da"/><stop offset=".3" stop-color="#54698f"/><stop offset="1" stop-color="#37506f"/></linearGradient>
<linearGradient id="s3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46638c"/><stop offset="1" stop-color="#243c5c"/></linearGradient>
<linearGradient id="wm" x1="0" y1="0" x2="1" y2="0"><stop offset=".25" stop-color="#ffb47a" stop-opacity="0"/><stop offset="1" stop-color="#ff9d5c" stop-opacity="1"/></linearGradient>
<filter id="hb"><feGaussianBlur stdDeviation="18"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#hg)"/><g data-d="0.01"><g>${st}<animate attributeName="opacity" from="1" to="0" dur="6s" begin="1.5s" fill="freeze"/></g></g>
<g data-d="0.02">${sun(240,.3,'filter="url(#hb)"')}${sun(70,1)}</g>
<g data-d="0.05"><path d="${L1}" fill="url(#s1)"/>${warm(L1,'c1',.5)}${bd}</g>
<g data-d="0.08"><path d="${L2}" fill="url(#s2)"/>${warm(L2,'c2',.4)}</g>
<g data-d="0.12"><path d="${L3}" fill="url(#s3)"/></g>
<g data-d="0.14" filter="url(#hb)" opacity=".55"><ellipse cx="500" cy="705" rx="430" ry="30" fill="#fff"><animate attributeName="cx" values="500;780;500" dur="40s" repeatCount="indefinite"/></ellipse><ellipse cx="1250" cy="680" rx="380" ry="26" fill="#ffe9c9"><animate attributeName="cx" values="1250;1000;1250" dur="52s" repeatCount="indefinite"/></ellipse></g>
<g data-d="0.2"><path d="${pd(F)}" fill="#1b4a44"/>${pf}</g>
<g data-d="0.3"><path d="${P} L1660 ${H} L-60 ${H}Z" fill="#0f2c1f"/>${fp}<rect x="1186" y="684" width="5" height="120" fill="#0c2619"/><rect x="1528" y="684" width="5" height="120" fill="#0c2619"/><path d="M1190 684 Q1360 730 1530 684" fill="none" stroke="#0c2619" stroke-width="1.5"/>${fl}${tk}</g></svg>`}
/* Hero video: paste your .mp4/.webm link here (e.g. upload to WordPress Media). Leave empty to keep the animated scene. */
const HERO_VIDEO='';
/* Cinematic YouTube background — muted + looped. Swap the ID with an owned/licensed video when available. */
const HERO_YT='xssNu8NOO1A';
function mount(el,pi,sd,hero){el.insertAdjacentHTML('afterbegin',hero?heroScene():scene(pi,sd,hero));const u=el.dataset.img;if(u){const d=document.createElement('div');d.className='ph';d.style.backgroundImage=`url("${u}")`;el.appendChild(d);const i=new Image();i.onload=()=>d.classList.add('on');i.src=u}if(hero&&HERO_VIDEO){const v=document.createElement('video');v.className='ph';v.src=HERO_VIDEO;v.muted=true;v.loop=true;v.playsInline=true;v.autoplay=true;v.preload='auto';v.style.cssText='width:100%;height:100%;object-fit:cover';v.oncanplay=()=>{v.classList.add('on');v.play().catch(()=>{})};el.appendChild(v)}
if(hero&&HERO_YT&&!HERO_VIDEO){const w=document.createElement('div');w.className='ph';w.style.cssText='overflow:hidden;background:none';const f=document.createElement('iframe');f.src='https://www.youtube.com/embed/'+HERO_YT+'?autoplay=1&mute=1&loop=1&playlist='+HERO_YT+'&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&iv_load_policy=3&enablejsapi=1';f.allow='autoplay; encrypted-media';f.title='Mountainiax trekking video';f.tabIndex=-1;f.setAttribute('aria-hidden','true');f.style.cssText='position:absolute;top:50%;left:50%;width:max(100%,177.78vh);height:max(100%,56.25vw);transform:translate(-50%,-50%);border:0;pointer-events:none';
f.onload=()=>{try{f.contentWindow.postMessage('{"event":"listening","id":1}','*')}catch(_){}};w.appendChild(f);el.appendChild(w);
addEventListener('message',e=>{if(e.source!==f.contentWindow)return;try{const d=JSON.parse(e.data);if((d.event==='onStateChange'&&d.info===1)||(d.event==='infoDelivery'&&d.info&&d.info.playerState===1))w.classList.add('on')}catch(_){}})}}
function art(h,pi,sd,img,hero){const d=document.createElement('div');d.className='art';if(img)d.dataset.img=img;mount(d,pi,sd,hero);return d.outerHTML}
mount(heroart,0,4,true);mount(aboutart,2,7);mount(offart,3,11);mount(finalart,5,5);
// content
const T=[['Kedarkantha Trek','Easy–Moderate','4.9','Snow-laden pine forests and a 360° summit view. The classic winter trek.','6 Days','12,500 ft','₹8,500',1,1,'2026/06/Kedarkantha-Trek.webp','treks/kedarkantha-trek/'],
['Chopta Tungnath Chandrashila','Easy–Moderate','4.9','The world’s highest Shiva temple, across alpine meadows.','5 Days','3,980 m','₹6,500',2,2,'2026/04/chopta-hero-CHV21JRL-1.jpg','treks/chopta-chandrashilla-tungnath/'],
['Dayara Bugyal Trek','Moderate','4.9','Vast open meadows and quiet campsites. Beginner friendly.','5 Days','12,000 ft','₹7,500',2,3,'2025/02/Dayara-Bugyal-Trek-Featued-Image.webp','treks/dayara-bugyal-trek/'],
['Valley of Flowers Trek','Moderate','4.8','A UNESCO valley carpeted in wildflowers every monsoon.','6 Days','14,100 ft','₹12,500',4,4,'2026/07/valley-of-flowers.webp','treks/valley-of-flowers-trek/'],
['Har Ki Dun Trek','Moderate','4.8','An ancient valley trail through remote Garhwali villages.','7 Days','11,700 ft','₹10,500',3,5,'2026/06/Har-Ki-Dun-Trek.webp','all-treks/'],
['Nag Tibba Trek','Easy','4.7','The perfect weekend escape from Dehradun with big views.','2 Days','9,100 ft','₹3,500',0,6,'2026/06/Nag-Tibba-Trek.webp','treks/nag-tibba-trek/']];
tg.innerHTML=T.map(t=>`<article class="card rvl"><div class="im">${art(0,t[7],t[8],U+t[9])}<span class="tag">${t[1]}</span><span class="rt">${t[2]}</span></div><div class="bd"><h3>${t[0]}</h3><p>${t[3]}</p><div class="mt"><span>${t[4]}</span><span>${t[5]}</span></div><div class="ft"><div><small>Starting from</small><b>${t[6]}</b></div><a class="lk" href="https://mountainiax.com/${t[10]}">View Trek →</a></div></div></article>`).join('');
const PX='https://images.weserv.nl/?url=';
const E=[
['Himalayan Treks','Summits, meadows and high passes.','https://mountainiax.com/wp-content/uploads/2024/05/2-2-1024x576.webp',1],
['Spiritual Yatras','Panch Kedar and Char Dham trails.','https://mountainiax.com/wp-content/uploads/2025/12/kedarnath-temple-CWPVtdtP.jpg',1],
['Offbeat Villages','Quiet valleys and warm homestays.','https://mountainiax.com/wp-content/uploads/2026/04/shangarh-valley-view.jpg'],
['Weekend Adventures','Short escapes from Dehradun.','https://mountainiax.com/wp-content/uploads/2026/06/nag-tibba-1.webp'],
['Camping Experiences','Stargazing under open skies.','https://mountainiax.com/wp-content/uploads/2025/03/PXL_20230607_044113015-1-1024x771.webp'],
['Custom Group Trips','Friends, family or office, planned your way.','https://mountainiax.com/wp-content/uploads/2025/04/IMG_6815.webp',1],
['Nepal Expeditions','Annapurna Base Camp and beyond.','https://mountainiax.com/wp-content/uploads/2026/05/annapurna-hero-CNNEFBn1.jpg',1]];
ex.innerHTML=E.map((e,i)=>`<a class="tl ${e[3]?'b':''} rvl" href="#contact"><div class="tlPhoto" style="background-image:url("${PX+encodeURIComponent(e[2])}")"></div><div><h3>${e[0]}</h3><p>${e[1]}</p></div></a>`).join('');
const G=[[1,31,320,'Phulara Ridge','2024/05/2-2-1024x576.webp'],[2,32,430,'Trail to Dayara','2025/04/IMG_6815.webp'],[3,33,300,'Sunset camp','2025/03/PXL_20230607_044113015-1-1024x771.webp'],[4,34,390,'Valley of Flowers','2025/04/IMG20220628125130-1-01-1024x773.webp'],[0,35,340,'Golden hour','2025/04/PSX_20240622_202428.webp'],[5,36,420,'Under the stars','2023/06/IMG_8682-01-01-1024x861.webp'],[1,37,300,'Chandrashila snow','2023/06/IMG_20200604_214753-01-01-1024x682.webp']];
ms.innerHTML=G.map(g=>`<figure class="m rvl" style="height:${g[2]}px">${art(0,g[0],g[1],U+g[4])}<figcaption>${g[3]}</figcaption></figure>`).join('');
const R=[['Ankita Srivastava','Dayara Bugyal Trek','My first trek turned out to be one of the best experiences of my life. Safe, comfortable and so well managed.'],['Bryn James','Dayara Bugyal Trek','Despite the monsoon rain, the guides and cooks kept us warm and fed. Beginner friendly and peaceful.'],['Rahul Gusain','Harsil Group Trip','A group of 10 from Dehradun to Harsil. Zero compromise on quality, routes, food or safety.'],['Ranjana Joshirao','Guided Yatra','We are senior citizens and our guides took care of all of us. An excellent yatra.']];
rg.innerHTML=R.map(r=>`<div class="rv rvl"><div class="stars">★★★★★</div><p>${r[2]}</p><div class="who"><span class="av">${r[0][0]}</span><div><b>${r[0]}</b><small>${r[1]}</small></div></div></div>`).join('');
const names=['Kedarkantha','Chopta Tungnath','Dayara Bugyal','Valley of Flowers','Har Ki Dun','Nag Tibba','Panch Kedar','Annapurna Base Camp'];mq.innerHTML=(names.map(n=>`<span>${n}</span>`).join('')).repeat(2);
// header + menu
const hd=document.getElementById('hd'),nv=document.querySelector('nav'),bg=document.querySelector('.burger');
const tick=()=>{hd.classList.toggle('s',scrollY>60);const y=scrollY;if(y<innerHeight*1.2)heroart.querySelectorAll('svg>g[data-d]').forEach(g=>g.style.transform=`translate(${mx*g.dataset.d*-90}px,${y*g.dataset.d*.9}px)`)};
let mx=0;addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;tick()},{passive:true});addEventListener('scroll',tick,{passive:true});tick();
bg.onclick=()=>{const o=nv.classList.toggle('o');bg.setAttribute('aria-expanded',o)};nv.onclick=e=>{if(e.target.tagName=='A'){nv.classList.remove('o');bg.setAttribute('aria-expanded',false)}};
// reveal + count up
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);e.target.querySelectorAll('[data-n]').forEach(b=>{const n=+b.dataset.n;let t=0;const f=()=>{t+=.04;b.textContent=Math.round(n*Math.min(t,1))+b.dataset.s;if(t<1)requestAnimationFrame(f)};f()})}}),{threshold:.1});
document.querySelectorAll('.rvl').forEach((el,i)=>{el.style.transitionDelay=(i%3)*.08+'s';io.observe(el)});
// snow
const cv=document.getElementById('snow'),cx=cv.getContext('2d');let fl=[];const rs=()=>{cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;fl=Array.from({length:Math.min(90,cv.width/16)},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*2.2+.6,v:Math.random()*.6+.25,a:Math.random()*6}))};rs();addEventListener('resize',rs);
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)(function d(){cx.clearRect(0,0,cv.width,cv.height);cx.fillStyle='rgba(255,255,255,.75)';fl.forEach(f=>{f.y+=f.v;f.a+=.01;f.x+=Math.sin(f.a)*.4+.15;if(f.y>cv.height){f.y=-5;f.x=Math.random()*cv.width}cx.beginPath();cx.arc(f.x,f.y,f.r,0,7);cx.fill()});requestAnimationFrame(d)})();
  }, []);
  return null;
}
