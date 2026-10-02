'use strict';
const TRAVEL_KEY='city-travel-quests:state:v1';
const TRAVEL_APP='city-travel-quests';
const tripStatuses={new:'未计划',planned:'已计划',done:'已完成'};
const tripById=new Map(TRAVEL_CITIES.map(c=>[c.id,c]));
const tripEl=id=>document.getElementById(id);
const tripEscape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function tripSafeUrl(value){try{const u=new URL(value);return u.protocol==='https:'?u.href:'#';}catch{return '#';}}
function tripLink(title,url){return `<a href="${tripEscape(tripSafeUrl(url))}" target="_blank" rel="noopener noreferrer">${tripEscape(title)} ↗</a>`;}
function tripBlank(c){return {status:'new',visited:Object.fromEntries(c.places.map(p=>[p.id,false])),clues:c.completion.map(()=>false),note:'',completedAt:null};}
let travelRecords={},travelStorageBlocked=false,travelActiveId=null,travelReturnFocus=null,travelToastTimer;
function tripRecord(id){return travelRecords[id]||tripBlank(tripById.get(id));}
// Fail closed: do not silently replace corrupt, foreign or future-version records.
function validateTravelRecords(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('记录不是有效对象');
 const output={};
 for(const [id,r] of Object.entries(input)){
  const c=tripById.get(id);if(!c)throw new Error('含未知城市编号：'+id);
  if(!r||typeof r!=='object'||Array.isArray(r)||!Object.hasOwn(tripStatuses,r.status))throw new Error('城市状态不合法');
  if(typeof r.note!=='string'||r.note.length>6000)throw new Error('手记缺失或超过6000字');
  if(!r.visited||typeof r.visited!=='object'||Array.isArray(r.visited))throw new Error('到访记录不合法');
  const ids=c.places.map(p=>p.id);if(Object.keys(r.visited).some(k=>!ids.includes(k)))throw new Error('含未知地点编号');
  for(const v of Object.values(r.visited))if(typeof v!=='boolean')throw new Error('到访值不合法');
  if(!Array.isArray(r.clues)||r.clues.length!==c.completion.length||r.clues.some(v=>typeof v!=='boolean'))throw new Error('认城线索不合法');
  if(r.completedAt!==null&&(typeof r.completedAt!=='string'||!Number.isFinite(Date.parse(r.completedAt))))throw new Error('完成时间不合法');
  if(r.status==='done'&&r.completedAt===null)throw new Error('已完成记录缺少时间');
  output[id]={status:r.status,visited:{...tripBlank(c).visited,...r.visited},clues:[...r.clues],note:r.note,completedAt:r.status==='done'?r.completedAt:null};
 }
 return output;
}
function travelWarn(message){tripEl('travel-storage-warning').textContent=message;tripEl('travel-storage-warning').hidden=false;}
function loadTravel(){try{const raw=localStorage.getItem(TRAVEL_KEY);if(raw!==null)travelRecords=validateTravelRecords(JSON.parse(raw));}catch{travelStorageBlocked=true;travelWarn('旅行记录无法读取。为保护原数据，本页暂不保存、导出或覆盖；可在备份说明里恢复已知有效备份，或由你确认清空本页记录。原探索与抽签记录不受影响。');}}
function storeTravel(next,allowRecovery=false){
 if(travelStorageBlocked&&!allowRecovery){travelToast('记录读取异常，请先恢复有效备份或确认清空。');return false;}
 try{localStorage.setItem(TRAVEL_KEY,JSON.stringify(next));travelRecords=next;travelStorageBlocked=false;tripEl('travel-storage-warning').hidden=true;return true;}
 catch{travelWarn('未能保存：设备存储可能已满或被浏览器禁止。刚才的修改没有记入本地，请不要当作已保存。');travelToast('未能保存，请检查存储权限或导出已有记录。');return false;}
}
function editTravel(id,patch){const next={...travelRecords,[id]:{...tripRecord(id),...patch}};if(!storeTravel(next))return false;renderTravelCards();return true;}
function travelToast(message){clearTimeout(travelToastTimer);tripEl('toast').textContent=message;tripEl('toast').hidden=false;travelToastTimer=setTimeout(()=>tripEl('toast').hidden=true,4200);}
function travelCount(r){return Object.values(r.visited).filter(Boolean).length;}
function renderTravelCards(){
 const search=tripEl('travel-search').value.trim().toLowerCase(),region=tripEl('travel-region').value,status=tripEl('travel-status').value,days=tripEl('travel-days').value;
 const cities=TRAVEL_CITIES.filter(c=>{const r=tripRecord(c.id);return (!region||c.region===region)&&(!status||r.status===status)&&(!search||[c.name,c.province,c.title,c.theme,c.hook,...c.places.map(p=>p.title)].join(' ').toLowerCase().includes(search));});
 tripEl('travel-count').textContent=`${cities.length} / ${TRAVEL_CITIES.length} 份城市总任务 · ${days==='2'?'显示2天取舍提示，不代表能玩完全部地点':days==='4'?'主线之外可自选一条支线，不必全选':'每天通常一至两个主项，含休息与换区'}`;
 tripEl('travel-progress').textContent=`${TRAVEL_CITIES.filter(c=>tripRecord(c.id).status==='done').length} / 10 城已完成 · 本地记录`;
 tripEl('travel-cards').innerHTML=cities.length?cities.map(c=>{
  const r=tripRecord(c.id),index=TRAVEL_CITIES.indexOf(c)+1;
  return `<article class="travel-card ${r.status==='done'?'completed':''}"><div class="card-top"><span class="trip-number">CITY ${String(index).padStart(2,'0')} / ${tripEscape(c.region)}</span><span class="status ${r.status==='done'?'done':r.status==='planned'?'active':''}">${tripStatuses[r.status]}</span></div><h3>${tripEscape(c.name)}<span class="micro"> · ${tripEscape(c.province)}</span></h3><h4>${tripEscape(c.title)}</h4><div class="tags"><span class="tag">${tripEscape(c.theme)}</span><span class="tag">${days==='2'?'2天需取舍':tripEscape(c.days)}</span></div><p class="card-hook">${tripEscape(c.hook)}</p><p class="places-preview">${c.places.filter(p=>!p.optional).map(p=>tripEscape(p.title.split(' / ')[0].split(' · ')[0])).join(' · ')}</p><div class="card-meta"><span>门票＋当地交通 ${tripEscape(c.budget)}</span><span>${travelCount(r)} / ${c.places.length} 地点到访 · 不影响整城完成</span></div><div class="record-actions"><button data-trip-open="${c.id}" class="primary">展开城市总任务 →</button><button data-trip-done="${c.id}" class="${r.status==='done'?'quiet':'quick-complete'}">${r.status==='done'?'撤销完成':'完成这座城'}</button></div></article>`;
 }).join(''):'<div class="empty"><p>没有符合筛选的城市，换个线索或清空筛选试试。</p></div>';
}
function tripSourceList(sources){return `<div class="sources-list">${sources.map(s=>tripLink(s.title,s.url)).join('')}</div>`;}
function renderTravelDetail(){
 const c=tripById.get(travelActiveId);if(!c)return;const r=tripRecord(c.id),short=tripEl('travel-days').value==='2';
 tripEl('travel-dialog-label').textContent=`${c.name} · 一城一份总任务`;
 tripEl('travel-detail').innerHTML=`<div class="detail-intro"><p class="eyebrow">${tripEscape(c.province)} / ${tripEscape(c.theme)}</p><h2 id="travel-title">${tripEscape(c.name)}：${tripEscape(c.title)}</h2><p class="hook">${tripEscape(c.hook)}</p><p>${tripEscape(c.intro)}</p><div class="travel-status-row"><span>${tripStatuses[r.status]} · ${travelCount(r)} / ${c.places.length} 地点到访</span><button data-trip-plan class="quiet">${r.status==='planned'?'撤销计划':'设为想去'}</button><button data-trip-complete class="primary">${r.status==='done'?'撤销整城完成':'完成这座城'}</button></div></div>
 <div class="detail-body">
 ${r.status==='done'?'<p class="completion">已由你标记完成。到访与线索可继续补写，不需要全部勾满。</p>':''}
 <section class="travel-lenses detail-section"><h3>先用这三条线认识城市</h3><ul class="trip-summary">${c.lenses.map(x=>`<li>${tripEscape(x)}</li>`).join('')}</ul></section>
 <div class="detail-grid"><section class="info-box"><h3>游玩时间 · 不含到达 / 离开城市的半天</h3><p>${tripEscape(c.days)}</p><p class="trip-budget">${short?'你选择仅2天，先看下方取舍方案。':'路线有休息留白；每个支线都是可选项。'}</p></section><section class="info-box"><h3>成人门票＋当地交通规划余量</h3><p>${tripEscape(c.budget)}</p><p class="trip-budget">不是实时票价；不含跨城交通、住宿、餐饮。收费支线、演出、包车会另增费用。</p></section></div>
 <section class="detail-section"><h3>只有两天，怎么取舍？</h3><p class="trip-plan-selected">${tripEscape(c.compressed)}</p></section>
 <section class="detail-section"><h3>三天主线 · 点地点名查看任务</h3><div class="trip-days">${c.itinerary.map(day=>`<article class="trip-day"><h4>${tripEscape(day.title)}</h4><div class="trip-route">${day.places.map((id,i)=>`${i?'<span aria-hidden="true">'+(day.choice?'或':'→')+'</span>':''}<button data-trip-jump="${id}">${tripEscape(c.places.find(p=>p.id===id).title)}</button>`).join('')}</div><p>${tripEscape(day.plan)}</p><p class="micro">交通估算：${tripEscape(day.travel)}</p></article>`).join('')}</div><p class="micro">地点并列可能表示二选一，按文字取舍。时长是编辑估算，未调用实时导航；别把到达日、离开日都算作完整游玩日。</p></section>
 <section class="detail-section"><h3>出发前核对</h3><div class="info-box"><p><strong>预约与开放：</strong>${tripEscape(c.access)}</p><p><strong>天气与环境：</strong>${tripEscape(c.environment)}</p><p><strong>雨天 / 低精力：</strong>${tripEscape(c.lowEnergy)}</p></div></section>
 <section class="detail-section"><h3>文化阅读 · 先读，再去</h3>${c.readings.map(read=>`<article class="reading trip-reading"><h4>${tripEscape(read.title)}</h4><span class="tag">${tripEscape(read.kind)}</span><p class="reading-guide">${tripEscape(read.guide)}</p><div class="reading-actions">${tripLink('打开对应材料',read.url)}</div>${read.text?`<details class="inline-reading"><summary>展开页内原文${read.title.includes('节选')?'节选':''} · 可离线</summary><div class="inline-reading-body"><p class="micro">${tripEscape(read.author)} · 古典作品，现代标点由本页整理；来源见上方链接</p><div class="inline-text">${tripEscape(read.text)}</div></div></details>`:''}</article>`).join('')}<p class="micro">“资料 / 解读”不等于所提作品全文；没有内置全文的材料需联网打开，链接暂不可用时仍可读本页任务摘要。</p></section>
 <section class="detail-section travel-places-title"><h3>地点清单 <span class="step-counter">${travelCount(r)} / ${c.places.length} 已到访</span></h3><p class="micro">一城总任务里的地点。核心与支线是编辑取舍，不是官方星级；现场任务都可选做。</p><div class="trip-places">${c.places.map(p=>`<article id="trip-place-${p.id}" tabindex="-1" class="trip-place trip-jump ${p.optional?'optional':''}"><span class="tag">${tripEscape(p.role)}</span> <span class="micro">${tripEscape(p.time)}</span><h4>${tripEscape(p.title)}</h4><p>${tripEscape(p.why)}</p><p class="trip-mission">现场可选任务：${tripEscape(p.mission)}</p><p class="micro">${tripEscape(p.notice)}</p><label class="place-check"><input data-trip-visited="${p.id}" type="checkbox" ${r.visited[p.id]?'checked':''}>我到访过这个地点</label><div class="travel-detail-links">${tripLink('在高德地图检索地点','https://uri.amap.com/search?keyword='+encodeURIComponent(p.title.split(' / ')[0].split(' · ')[0].split('—')[0])+'&city='+encodeURIComponent(c.name))}</div><details><summary class="micro">地点资料与出处</summary>${tripSourceList(p.sources)}</details></article>`).join('')}</div></section>
 <section class="detail-section trip-takeaway"><h3>带回这些认城线索 · 可选</h3><div class="step-list">${c.completion.map((x,i)=>`<label class="step"><input data-trip-clue="${i}" type="checkbox" ${r.clues[i]?'checked':''}><span>${tripEscape(x)}</span></label>`).join('')}</div><p class="micro">做一条也算有收获；它们不是“真正去过”的资格考试。</p></section>
 <section class="detail-section"><label for="travel-note" class="travel-note-label">我的城市手记</label><textarea id="travel-note" class="notes" maxlength="6000" placeholder="哪两处地方连成了一条线？哪件事改变了你对这座城的想象？">${tripEscape(r.note)}</textarea><p id="travel-note-state" class="micro">文字修改即时保存到本机，最多6000字；读材料不会改动进度。</p></section>
 <section class="detail-section"><h3>本城资料入口</h3>${tripSourceList(c.sources)}<p class="micro">整理日期 ${TRAVEL_META.checkedAt}。政府规划、地方志目录与名录用于查找线索，不表示已内置或逐页通读整本报告。史实来自链接资料；串联路线、问题与预算是本页编辑建议。</p></section>
 </div>`;
}
function openTravel(id,updateUrl=true){if(!tripById.has(id))return;travelReturnFocus=document.activeElement;travelActiveId=id;renderTravelDetail();if(!tripEl('travel-dialog').open)tripEl('travel-dialog').showModal();tripEl('travel-dialog').scrollTop=0;tripEl('travel-close').focus();if(updateUrl){const u=new URL(location.href);u.searchParams.set('city',id);history.replaceState(null,'',u);}}
function closeTravel(){tripEl('travel-dialog').close();}
function finishTravel(id){const r=tripRecord(id),done=r.status!=='done';if(editTravel(id,{status:done?'done':'planned',completedAt:done?new Date().toISOString():null})){if(travelActiveId===id&&tripEl('travel-dialog').open)renderTravelDetail();travelToast(done?'已完成这座城；不要求地点全部勾满。':'已撤销整城完成，到访与手记仍保留。');}}
function travelBackup(){if(travelStorageBlocked)throw new Error('当前记录无法读取，请先恢复有效备份。');return {app:TRAVEL_APP,version:1,exportedAt:new Date().toISOString(),records:travelRecords};}
function parseTravelBackup(raw){if(raw.length>2*1024*1024)throw new Error('备份文件超过2MB');const p=JSON.parse(raw);if(p.app!==TRAVEL_APP||p.version!==1)throw new Error('这不是本页十城旅行的v1备份；请勿用原探索或抽签机备份。');return validateTravelRecords(p.records);}
async function importTravel(file){
 try{if(file.size>2*1024*1024)throw new Error('备份文件超过2MB');const next=parseTravelBackup(await file.text());if(!confirm('恢复将替换本页十城旅行记录；原探索与抽签机不受影响。建议先导出当前备份。继续吗？'))return;if(!storeTravel(next,true))return;renderTravelCards();if(travelActiveId)renderTravelDetail();travelToast('十城旅行记录已恢复。');}
 catch(e){travelToast('未恢复：'+(e instanceof SyntaxError?'文件不是合法JSON':e.message));}
 finally{tripEl('travel-import').value='';}
}
function exportTravel(){try{const payload=JSON.stringify(travelBackup(),null,2),url=URL.createObjectURL(new Blob([payload],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='十城旅行备份-'+new Date().toISOString().slice(0,10)+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);travelToast('已生成备份，请确认文件已保存。');}catch(e){travelToast(e.message);}}
function clearTravel(){if(!confirm('只清空本页十城旅行的计划、到访、线索和手记。不会清空北京、苏州、秦皇岛探索与原抽签机。已导出备份可恢复。确定吗？'))return;try{localStorage.removeItem(TRAVEL_KEY);travelRecords={};travelStorageBlocked=false;tripEl('travel-storage-warning').hidden=true;renderTravelCards();if(travelActiveId)renderTravelDetail();travelToast('已清空十城旅行记录；已有备份仍可恢复。');}catch{travelToast('清空失败，原记录仍保留。');}}
loadTravel();tripEl('travel-date').textContent=TRAVEL_META.checkedAt;renderTravelCards();
for(const id of ['travel-search','travel-region','travel-days','travel-status'])tripEl(id).addEventListener(id==='travel-search'?'input':'change',renderTravelCards);
tripEl('travel-cards').addEventListener('click',e=>{const open=e.target.closest('[data-trip-open]'),done=e.target.closest('[data-trip-done]');if(open)openTravel(open.dataset.tripOpen);else if(done)finishTravel(done.dataset.tripDone);});
tripEl('travel-detail').addEventListener('click',e=>{
 if(e.target.closest('[data-trip-complete]'))finishTravel(travelActiveId);
 else if(e.target.closest('[data-trip-plan]')){const r=tripRecord(travelActiveId);if(r.status==='done'){travelToast('请先撤销整城完成，再修改计划。');return;}if(editTravel(travelActiveId,{status:r.status==='planned'?'new':'planned'}))renderTravelDetail();}
 else{const jump=e.target.closest('[data-trip-jump]');if(jump){const target=tripEl('trip-place-'+jump.dataset.tripJump);target.scrollIntoView({block:'start'});target.focus({preventScroll:true});}}
});
tripEl('travel-detail').addEventListener('change',e=>{const r=tripRecord(travelActiveId);let ok=true;if(e.target.matches('[data-trip-visited]'))ok=editTravel(travelActiveId,{visited:{...r.visited,[e.target.dataset.tripVisited]:e.target.checked}});else if(e.target.matches('[data-trip-clue]')){const clues=[...r.clues];clues[Number(e.target.dataset.tripClue)]=e.target.checked;ok=editTravel(travelActiveId,{clues});}else return;if(!ok)e.target.checked=!e.target.checked;else{const c=tripById.get(travelActiveId),count=travelCount(tripRecord(travelActiveId));tripEl('travel-detail').querySelector('.step-counter').textContent=`${count} / ${c.places.length} 已到访`;tripEl('travel-detail').querySelector('.travel-status-row>span').textContent=`${tripStatuses[tripRecord(travelActiveId).status]} · ${count} / ${c.places.length} 地点到访`;}});
tripEl('travel-detail').addEventListener('input',e=>{if(e.target.id==='travel-note'){const ok=editTravel(travelActiveId,{note:e.target.value});tripEl('travel-note-state').textContent=ok?'已保存到本机 · '+e.target.value.length+' / 6000字':'未能保存，此文字尚未记入本地；请先复制保留。';}});
tripEl('travel-close').addEventListener('click',closeTravel);
tripEl('travel-dialog').addEventListener('close',()=>{travelActiveId=null;const u=new URL(location.href);u.searchParams.delete('city');history.replaceState(null,'',u);if(travelReturnFocus?.isConnected)travelReturnFocus.focus();else tripEl('travel-board').scrollIntoView({block:'nearest'});});
tripEl('travel-tools').addEventListener('click',()=>tripEl('travel-tools-dialog').showModal());tripEl('travel-tools-close').addEventListener('click',()=>tripEl('travel-tools-dialog').close());
tripEl('travel-export').addEventListener('click',exportTravel);tripEl('travel-import').addEventListener('change',e=>{if(e.target.files[0])importTravel(e.target.files[0]);});tripEl('travel-clear').addEventListener('click',clearTravel);
tripEl('travel-random').addEventListener('click',()=>{const candidates=TRAVEL_CITIES.filter(c=>tripRecord(c.id).status!=='done');const pool=candidates.length?candidates:TRAVEL_CITIES;openTravel(pool[Math.floor(Math.random()*pool.length)].id);});
const initialCity=new URL(location.href).searchParams.get('city');if(tripById.has(initialCity))openTravel(initialCity,false);
window.addEventListener('popstate',()=>{const id=new URL(location.href).searchParams.get('city');if(tripById.has(id))openTravel(id,false);else if(tripEl('travel-dialog').open)closeTravel();});
async function checkTravelOffline(){
 try{
  const scope=new URL('./',location.href).href,cacheName='city-quests:'+scope+':v4';
  if(!navigator.serviceWorker.controller||!(await caches.has(cacheName)))return;
  const cache=await caches.open(cacheName),files=['travel.html','travel.js','travel-data.js','travel.css'];
  if((await Promise.all(files.map(f=>cache.match(new URL(f,scope))))).every(Boolean))tripEl('travel-offline-note').textContent='离线资源已准备：页面、路线、摘要与内置古诗可离线重开。外部阅读、导航和当日公告仍需联网。';
 }catch{/* A failed readiness check must never claim offline success. */}
}
if('serviceWorker' in navigator){
 navigator.serviceWorker.addEventListener('controllerchange',checkTravelOffline);
 navigator.serviceWorker.register('./service-worker.js',{scope:'./'}).then(reg=>{
  if(reg.installing)reg.installing.addEventListener('statechange',()=>{if(reg.active)checkTravelOffline();});
  return navigator.serviceWorker.ready;
 }).then(checkTravelOffline).catch(()=>{tripEl('travel-offline-note').textContent='本次未能确认离线准备完成；请联网用HTTPS重新打开，再测试断网使用。文字本地保存与离线缓存是两件事。';});
}
