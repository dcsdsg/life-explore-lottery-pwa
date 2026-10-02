'use strict';
const $=id=>document.getElementById(id);
const STORAGE_KEY='city-exploration-quests:state:v1';
const APP_ID='city-exploration-quests';
const byId=new Map(QUESTS.map(q=>[q.id,q]));
const escapeHtml=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'?u.href:'#';}catch{return '#';}};
const freshState=()=>({records:{},lastDraw:null});
const recordFor=id=>state.records[id]||{status:'new',checks:byId.get(id).steps.map(()=>false),note:'',completedAt:null,updatedAt:null};
const beijingToday=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
function validDate(v){if(!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;const d=new Date(v+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===v;}
const totalMinutes=q=>q.culture.onsite.map((n,i)=>q.culture.travel?n+2*q.culture.travel[i]+15:n);
const prettyTime=n=>n<60?`${n}分钟`:`${+(n/60).toFixed(1)}小时`;
const timeRange=q=>{const [a,b]=totalMinutes(q);return `${prettyTime(a)}–${prettyTime(b)}`;};
function validateState(s){
 if(!s||typeof s!=='object'||Array.isArray(s)||!s.records||typeof s.records!=='object'||Array.isArray(s.records))throw Error('备份缺少任务记录');
 if(s.lastDraw!==null&&!byId.has(s.lastDraw))throw Error('上次悬赏编号无效');
 const out=freshState();out.lastDraw=s.lastDraw;
 for(const [id,r] of Object.entries(s.records)){
  const q=byId.get(id);if(!q)throw Error('备份包含本任务库没有的编号：'+id);
  if(!r||typeof r!=='object'||!['new','active','done','skipped'].includes(r.status))throw Error('任务状态无效');
  if(!Array.isArray(r.checks)||r.checks.length!==q.steps.length||r.checks.some(x=>typeof x!=='boolean'))throw Error('任务清单格式无效');
  if(typeof r.note!=='string'||r.note.length>6000)throw Error('手记不是文字或超过6000字');
  for(const key of ['completedAt','updatedAt'])if(r[key]!==null&&(typeof r[key]!=='string'||!Number.isFinite(Date.parse(r[key]))))throw Error('记录日期格式无效');
  if(r.status==='done'&&r.completedAt===null)throw Error('已完成任务缺少完成日期');
  out.records[id]={status:r.status,checks:[...r.checks],note:r.note,completedAt:r.completedAt,updatedAt:r.updatedAt};
 }
 return out;
}
function loadState(){try{const raw=localStorage.getItem(STORAGE_KEY);return raw?validateState(JSON.parse(raw)):freshState();}catch(e){$('storage-warning').hidden=false;$('storage-warning').textContent='无法读取本页原有记录；没有清除原数据。请先导出或检查浏览器存储。原因：'+e.message;return freshState();}}
let state=loadState(),view='board',activeId=null,map=null,markers=null,tileLayer=null,installPrompt=null,toastTimer=null,previousFocus=null,readFailure=!$('storage-warning').hidden;
let selectedCity='beijing';
try{const saved=localStorage.getItem(STORAGE_KEY+':city');if(CITY_CONFIG[saved])selectedCity=saved;}catch{}
const requestedCity=new URL(location.href).searchParams.get('city');if(CITY_CONFIG[requestedCity])selectedCity=requestedCity;
const cityQuests=()=>QUESTS.filter(q=>q.city===selectedCity);
function selectCity(city,remember=true){
 if(!CITY_CONFIG[city])return;
 selectedCity=city;const c=CITY_CONFIG[city];$('city').value=city;
 $('temple-day-link').hidden=city!=='beijing';
 const url=new URL(location.href);url.searchParams.set('city',city);history.replaceState(null,'',url.pathname+url.search+url.hash);
 if(remember)try{localStorage.setItem(STORAGE_KEY+':city',city);}catch{}
 $('city-name').textContent=c.name;$('city-kicker').textContent=`城市探索档案 / ${c.name} · ${c.chapter}`;
 $('origin').textContent=`出发点：${c.origin}${city==='qinhuangdao'?'':' · 含公共交通往返的编辑估计'}`;
 $('city-intro').textContent=c.intro;$('map-kicker').textContent=c.name+' / FIELD MAP';$('map').setAttribute('aria-label',c.name+'探索任务参考点地图');
 $('duration-label').textContent=city==='qinhuangdao'?'可用现场时间（不含往返）':'空闲时间（含往返）';
 $('departure-note').textContent=(city==='qinhuangdao'?'秦皇岛尚未设住宿地，时间筛选只比较现场时长；请另加市内往返与缓冲，不能据此保证赶得上。':'按含往返时间上限保守筛选；单程含步行、候车和接驳，另加15分钟缓冲。')+' 不读取实时天气、路况或余票。金额是编辑预留，不是已核实票价；不含餐饮、住宿、跨城车票和打车。预约、闭馆与末班出发前复核。';
 $('region').replaceChildren(new Option('全'+c.name,'all'),...c.regions.map(key=>new Option(REGION_LABELS[key],key)));
 for(const id of ['theme','stars','status'])$(id).value='all';$('search').value='';$('eligible-only').checked=false;
 $('research-portals').innerHTML=RESEARCH_PORTALS[city].map(p=>`<article class="portal"><h3><a target="_blank" rel="noopener noreferrer" href="${escapeHtml(safeUrl(p.url))}">${escapeHtml(p.title)} ↗</a></h3><p>${escapeHtml(p.note)}</p></article>`).join('');
 map?.setView(c.center,c.zoom);render();
}
function toast(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,4500);}
function persist(){
 if(readFailure){$('storage-warning').textContent='原有本页数据读取失败，暂不覆盖存储。当前操作只在内存中；请导出当前备份，确认后用“清空本页记录”重新开始。';return false;}
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$('storage-warning').hidden=true;return true;}
 catch(e){$('storage-warning').hidden=false;$('storage-warning').textContent='浏览器未能保存记录（可能空间不足或禁止存储）。当前变化仅在本次打开期间保留，请立即导出备份。';return false;}
}
function updateRecord(id,patch){state.records[id]={...recordFor(id),...patch,updatedAt:new Date().toISOString()};return persist();}
function conditions(){return {date:$('date').value,duration:Number($('duration').value),budget:Number($('budget').value),energy:Number($('energy').value),weather:$('weather').value,daypart:$('daypart').value};}
function scheduleBlock(q,date){
 if(!validDate(date))return '请先选择有效出行日期';
 const c=q.culture;
 for(const r of c.closedRanges||[])if(date>=r.from&&date<=r.until)return r.reason;
 const day=new Date(date+'T12:00:00Z').getUTCDay();
 if((c.closedWeekdays||[]).includes(day)&&!(c.openDates||[]).includes(date))return '常规周一闭馆；假日开放需另行确认';
 return '';
}
function mismatch(q,c=conditions()){
 const reasons=[],closed=scheduleBlock(q,c.date);if(closed)reasons.push(closed);
 if(!Number.isFinite(c.budget)||c.budget<0)reasons.push('请填写有效预算');else if(q.budget>c.budget)reasons.push('超过预算');
 if(totalMinutes(q)[1]>c.duration)reasons.push('空闲时间不足（按上限预留）');
 if(q.energy>c.energy)reasons.push('较耗精力');
 if(c.weather==='severe')reasons.push('有天气预警，暂不推荐出门');else if(c.weather==='rain'&&!q.rainOk)reasons.push('不适合轻雨');
 if(c.daypart!=='any'&&!q.times.includes(c.daypart))reasons.push('不适合此时段出发');
 return reasons;
}
function visibleQuests(){
 const text=$('search').value.trim().toLowerCase(),theme=$('theme').value,region=$('region').value,stars=$('stars').value,status=$('status').value;
 return QUESTS.filter(q=>{
  if(q.city!==selectedCity)return false;
  const r=recordFor(q.id);
  if(view==='journal'&&!['active','done'].includes(r.status)&&!r.note&&!r.checks.some(Boolean))return false;
  if(theme!=='all'&&q.culture.theme!==theme||region!=='all'&&q.region!==region||stars!=='all'&&q.stars!==Number(stars)||status!=='all'&&r.status!==status)return false;
  if(text&&![q.t,q.hook,q.culture.place,q.culture.why,THEME_LABELS[q.culture.theme],...q.culture.reading.map(x=>x.title)].join(' ').toLowerCase().includes(text))return false;
  return !$('eligible-only').checked||mismatch(q).length===0;
 });
}
const statusLabel={new:'待接取',active:'进行中',done:'已完成',skipped:'暂缓'};
function readingLinkHtml(link,compact=false){
 const url=safeUrl(link.url);if(url==='#')return '';
 const label=compact&&link.kind==='info'?'读这处地点的资料':link.label;
 return `<a class="reading-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(label)} ↗</span>${compact?'':`<small>${escapeHtml(READING_KIND_LABELS[link.kind])} · ${escapeHtml(link.source)}</small>`}</a>`;
}
function readingShortcut(q){
 const resource=readingResourcesFor(q,0);
 return `<div class="reading-shortcut"><span>先读再去</span>${resource.inline?`<button data-reading-jump="0">页内读${escapeHtml(resource.inline.title)} ↓</button>`:readingLinkHtml(resource.links[0],true)}${resource.inline?'':'<button class="quiet" data-reading-jump="0">查看阅读材料 ↓</button>'}</div>`;
}
function renderReading(q,index){
 const item=q.culture.reading[index],resource=readingResourcesFor(q,index),text=resource.inline;
 return `<article class="reading" id="reading-${index}" tabindex="-1">
<h4>${escapeHtml(item.title)}</h4><span class="tag">${escapeHtml(item.relation)}</span>
<p>${escapeHtml(item.note)}</p>
${resource.guide?`<p class="reading-guide"><strong>读的时候留意：</strong>${escapeHtml(resource.guide)}</p>`:''}
<div class="reading-actions">${resource.links.map(link=>readingLinkHtml(link)).join('')}</div>
${resource.links.filter(link=>link.note).map(link=>`<p class="micro">${escapeHtml(link.note)}</p>`).join('')}
${resource.notice?`<p class="reading-notice">${escapeHtml(resource.notice)}</p>`:''}
${text?`<details class="inline-reading"><summary>展开页内文字 · ${escapeHtml(text.extent)} · 可离线</summary><div class="inline-reading-body"><h5>${escapeHtml(text.title)}</h5><p class="micro">${escapeHtml(text.author)} · ${escapeHtml(text.extent)}</p><blockquote class="inline-text">${escapeHtml(text.text)}</blockquote><p class="micro">出处：${escapeHtml(text.source)} · <a href="${escapeHtml(safeUrl(text.url))}" target="_blank" rel="noopener noreferrer">核对原典 ↗</a></p></div></details>`:''}
</article>`;
}
function render(){
 const all=visibleQuests(),local=cityQuests(),name=CITY_CONFIG[selectedCity].name;
 $('board-title').textContent=view==='journal'?name+' · 我的探索档案':name+'悬赏板';
 $('result-count').textContent=`${all.length} / ${local.length} 条线索`;
 $('progress-summary').textContent=`${name} ${local.filter(q=>recordFor(q.id).status==='done').length}/${local.length} 已完成 · 三城 ${QUESTS.filter(q=>recordFor(q.id).status==='done').length}/${QUESTS.length}`;
 $('empty').hidden=all.length>0;
 $('quest-list').innerHTML=all.map(q=>{
  const r=recordFor(q.id),reasons=mismatch(q),closed=scheduleBlock(q,$('date').value);
  const alert=(q.culture.alerts||[]).find(a=>$('date').value>=a.from&&(!a.until||$('date').value<=a.until));
  return `<article class="quest-card ${r.status==='done'?'completed':''}" data-id="${q.id}" data-stars="${q.stars}"><div class="card-top"><span class="stars" aria-label="${q.stars}星探索">${'★'.repeat(q.stars)}</span><span class="status ${r.status}">${statusLabel[r.status]}</span></div><h3>${escapeHtml(q.t)}</h3><p class="card-hook">${escapeHtml(q.hook)}</p><div class="tags"><span class="tag">${THEME_LABELS[q.culture.theme]}</span><span class="tag">${REGION_LABELS[q.region]}</span></div><div class="card-meta"><span>◷ ${q.culture.travel?'含往返':'仅现场'} ${timeRange(q)}</span><span>¥ 预留 ${q.budget}</span><span>清单 ${r.checks.filter(Boolean).length}/${q.steps.length}</span></div>${closed?`<p class="card-warning">⚑ ${escapeHtml(closed)}</p>`:alert?`<p class="card-warning">⚑ ${escapeHtml(alert.text)}</p>`:reasons.length?`<p class="card-warning">这次条件：${escapeHtml(reasons.slice(0,2).join(' · '))}</p>`:''}<div class="card-buttons"><button class="card-action" data-open="${q.id}">展开任务卷宗 <span>↗</span></button><button class="quick-complete ${r.status==='done'?'undo':''}" data-complete="${q.id}" aria-label="${r.status==='done'?'撤销完成':'完成地点'}：${escapeHtml(q.culture.place)}">${r.status==='done'?'↶ 撤销完成':'✓ 完成地点'}</button></div></article>`;
 }).join('');
 updateMarkers(all);
}
function renderDetail(){
 if(!activeId)return;const q=byId.get(activeId),c=q.culture,r=recordFor(activeId),reasons=mismatch(q);
 const alerts=(c.alerts||[]).filter(a=>$('date').value>=a.from&&(!a.until||$('date').value<=a.until));
 $('dialog-kicker').textContent=`${CITY_CONFIG[q.city].name} / ${THEME_LABELS[c.theme]} / ${q.id.toUpperCase()}`;
 $('quest-detail').innerHTML=`<div class="detail-intro">
<span class="stars">${'★'.repeat(q.stars)} · ${q.stars===3?'短途线索':q.stars===4?'半日专题':'专程探索'}</span>
<h2>${escapeHtml(q.t)}</h2>
<p class="hook">${escapeHtml(q.hook)}</p>
<p class="micro">${escapeHtml(c.place)} · ${escapeHtml(c.address)}</p>
</div>
<div class="detail-body">
<p>${escapeHtml(c.why)}</p>
${['bjc_jietai','bjc_tanzhe'].includes(q.id)?'<p class="reading-shortcut"><a class="reading-link" href="./temple-day.html">京西双寺一日行程 · 路线、返程与文化案卷 ↗</a></p>':''}
<p class="detail-question">带着这个问题去：${escapeHtml(c.question)}</p>${reasons.length?`<div class="warning">本次出发需留意：${escapeHtml(reasons.join('；'))}。可先接取，另约合适日期。</div>`:''}${alerts.map(a=>`<p class="warning">${escapeHtml(a.text)}</p>`).join('')}<div class="detail-grid">
<div class="info-box">
<h3>时间预算 · ${c.travel?'从'+escapeHtml(CITY_CONFIG[q.city].origin)+'出发':'仅现场，住宿地未设定'}</h3>
<p>${c.travel?'单程 '+c.travel.join('–')+' 分钟<br>':''}现场 ${c.onsite.join('–')} 分钟<br>${c.travel?'含往返与15分钟缓冲 '+timeRange(q):'未计往返、排队与交通缓冲；出发前按住宿位置另加。'}</p>
</div>
<div class="info-box">
<h3>费用预留 · 成人门票 + 交通</h3>
<p>约 ${q.budget} 元<br>${escapeHtml(c.cost)}</p>
</div>
</div>
<section class="detail-section">
<h3>可选任务清单 <span class="step-counter" id="step-counter">${r.checks.filter(Boolean).length}/${q.steps.length}</span>
</h3>
${readingShortcut(q)}
<div class="step-list">${q.steps.map((s,i)=>`<label class="step">
<input type="checkbox" data-step="${i}" ${r.checks[i]?'checked':''}>
<span>${escapeHtml(s)}</span>
</label>`).join('')}</div>
</section>
<section class="detail-section">
<h3>文化线索 · 点开就能读</h3>
<p class="micro">外站原文、导读与地点资料分别标明；外链需联网。带“页内文字”的古典原文及本页观察提示，首次缓存后可离线读。没有把仍受版权保护的作品全文复制进本页。</p>
${c.reading.map((_,i)=>renderReading(q,i)).join('')}
</section>
<div class="detail-grid">
<div class="info-box">
<h3>怎么到 · 路线线索</h3>
<p>${escapeHtml(c.route)}</p>
<p class="micro">换乘班次与交通价格未实时查询，请在出发前用导航复核。</p>
<p>
<a target="_blank" rel="noopener noreferrer" href="https://uri.amap.com/search?keyword=${encodeURIComponent(c.place)}&city=${encodeURIComponent(CITY_CONFIG[q.city].name)}&view=map">在高德按地点名查路线 ↗</a>
</p>
</div>
<div class="info-box">
<h3>环境与接待</h3>
<p>${escapeHtml(c.environment)}</p>
<p>${escapeHtml(c.access)}</p>
</div>
</div>
<section class="detail-section">
<h3>资料出处 · 核对来路</h3>
<p class="micro">整理于 ${q.checkedAt}。优先核对政府、文物部门与场馆公告；旅游旧页可能过时。精确票价、目标展品、演出和预约以当天公告为准。</p>
<div class="sources-list">${c.sources.map(s=>`<a href="${escapeHtml(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">↗ ${escapeHtml(s.title)}</a>`).join('')}</div>
<details class="detail-section">
<summary>地图参考点与精度</summary>
<p class="micro">${escapeHtml(q.geoNote)}${q.geoSource?`<br>
<a href="${escapeHtml(safeUrl(q.geoSource))}" target="_blank" rel="noopener noreferrer">参考点资料 ↗</a>`:''}</p>
</details>
</section>
<section class="detail-section">
<h3>留下你的发现</h3>
<textarea id="quest-note" class="notes" maxlength="6000" placeholder="我看见的事实：\n资料说了什么（记下出处）：\n我的理解与疑问：">${escapeHtml(r.note)}</textarea>
<p id="note-state" class="micro">本地自动保存 · 最多6000字 · 不上传</p>
<div id="completion" class="completion" ${r.status==='done'?'':'hidden'}>✓ 地点已完成，已留在探索档案中。清单与手记可以继续补充。</div>
<div class="record-actions">
<button id="accept-quest" class="primary" ${r.status==='active'||r.status==='done'?'disabled':''}>${r.status==='active'?'已接取':r.status==='done'?'已完成':'接取任务'}</button>
<button id="finish-quest">${r.status==='done'?'撤销完成':'✓ 完成地点'}</button>
<button id="skip-quest" class="quiet">${r.status==='skipped'?'重新开放':'暂缓这条线索'}</button>
</div>
<p class="micro">点一下“完成地点”就算完成，无需勾完清单、写手记或晒照片。撤销后回到进行中，原清单与手记保留。已完成和暂缓地点不参与随机悬赏。</p>
</section>
</div>`;
}
function syncProgress(){
 const r=recordFor(activeId),q=byId.get(activeId);
 $('step-counter').textContent=`${r.checks.filter(Boolean).length}/${q.steps.length}`;
 $('accept-quest').textContent=r.status==='done'?'已完成':r.status==='active'?'已接取':'接取任务';$('accept-quest').disabled=['active','done'].includes(r.status);
 $('finish-quest').textContent=r.status==='done'?'撤销完成':'✓ 完成地点';$('skip-quest').textContent=r.status==='skipped'?'重新开放':'暂缓这条线索';$('completion').hidden=r.status!=='done';render();
}
function toggleComplete(id){
 const done=recordFor(id).status==='done';
 const saved=updateRecord(id,{status:done?'active':'done',completedAt:done?null:new Date().toISOString()});
 if(activeId===id)syncProgress();else render();
 if(!activeId)document.querySelector(`[data-complete="${id}"]`)?.focus({preventScroll:true});
 toast(saved?(done?'已撤销完成，清单与手记保留':'地点已完成，已保存到本地档案'):'变化只在本次打开中保留，请导出备份');
}
function openQuest(id){
 if(!byId.has(id))return;
 if(byId.get(id).city!==selectedCity)selectCity(byId.get(id).city);
 if(!$('quest-dialog').open)previousFocus=document.activeElement;
 activeId=id;renderDetail();if(!$('quest-dialog').open)$('quest-dialog').showModal();$('quest-dialog').scrollTop=0;
 history.replaceState(null,'','#quest='+encodeURIComponent(id));
}
function closeQuest(){history.replaceState(null,'',location.pathname+location.search);$('quest-dialog').close();}
$('close-quest').onclick=closeQuest;
$('quest-dialog').addEventListener('cancel',e=>{e.preventDefault();closeQuest();});
$('quest-dialog').addEventListener('close',()=>{if($('quest-dialog').open)return;const closedId=activeId;activeId=null;history.replaceState(null,'',location.pathname+location.search);const card=document.querySelector(`[data-open="${closedId}"]`);(previousFocus?.isConnected?previousFocus:card)?.focus();});
$('quest-list').addEventListener('click',e=>{const b=e.target.closest('[data-open]'),c=e.target.closest('[data-complete]');if(b)openQuest(b.dataset.open);else if(c)toggleComplete(c.dataset.complete);});
$('quest-detail').addEventListener('change',e=>{
 if(!e.target.matches('[data-step]'))return;
 const r=recordFor(activeId),checks=[...r.checks];checks[Number(e.target.dataset.step)]=e.target.checked;
 const status=r.status==='done'?'done':'active';
 updateRecord(activeId,{checks,status,completedAt:status==='done'?r.completedAt:null});syncProgress();
});
$('quest-detail').addEventListener('input',e=>{if(e.target.id==='quest-note'){$('note-state').textContent=updateRecord(activeId,{note:e.target.value})?'已保存到本地 · 不上传':'未写入浏览器，请导出备份';}});
$('quest-detail').addEventListener('click',e=>{
 const jump=e.target.closest('[data-reading-jump]');
 if(jump){const reading=$('reading-'+jump.dataset.readingJump);if(reading){const text=reading.querySelector('.inline-reading');if(text)text.open=true;reading.focus({preventScroll:true});reading.scrollIntoView({block:'start'});}return;}
 if(e.target.id==='accept-quest'){const saved=updateRecord(activeId,{status:'active',completedAt:null});syncProgress();toast(saved?'已接取，随时回来继续这份任务':'已在本次打开中接取；请导出备份保管');}
 if(e.target.id==='finish-quest')toggleComplete(activeId);
 if(e.target.id==='skip-quest'){const r=recordFor(activeId);if(r.status==='done'&&!confirm('暂缓会取消这条任务的已完成状态，清单与手记保留。继续吗？'))return;updateRecord(activeId,{status:r.status==='skipped'?'active':'skipped',completedAt:null});syncProgress();}
});
function setView(next){view=next;for(const b of document.querySelectorAll('[data-view]'))b.setAttribute('aria-pressed',String(b.dataset.view===next));$('workspace').hidden=next==='sources';$('filters').hidden=next==='sources';$('source-pane').hidden=next!=='sources';$('workspace').classList.toggle('view-map',next==='map');render();if(map)requestAnimationFrame(()=>map.invalidateSize());}
for(const b of document.querySelectorAll('[data-view]'))b.onclick=()=>setView(b.dataset.view);
for(const [value,label] of Object.entries(THEME_LABELS))$('theme').append(new Option(label,value));
$('city').addEventListener('change',()=>selectCity($('city').value));
$('date').value=beijingToday();
for(const id of ['theme','region','stars','status','date','duration','budget','energy','weather','daypart','eligible-only'])$(id).addEventListener('change',render);
$('search').addEventListener('input',render);
function resetFilters(){for(const id of ['theme','region','stars','status'])$(id).value='all';$('search').value='';$('eligible-only').checked=false;render();}
$('reset-filters').onclick=resetFilters;
$('random').onclick=()=>{
 // Random recommendations respect all current filters AND outing conditions; never return completed/paused tasks.
 const priorView=view;view='board';let pool=visibleQuests().filter(q=>!['done','skipped'].includes(recordFor(q.id).status)&&mismatch(q).length===0);view=priorView;
 if(!pool.length){toast('没有符合当前筛选与出发条件的悬赏。请调整时间、预算或日期；已完成和暂缓任务不参与。');$('filters').hidden=false;return;}
 if(pool.length>1)pool=pool.filter(q=>q.id!==state.lastDraw);
 const q=pool[Math.floor(Math.random()*pool.length)];state.lastDraw=q.id;persist();openQuest(q.id);
};
function initMap(){
 if(!window.L){$('map-message').textContent='本地地图组件未载入，仍可在悬赏板查看全部任务。';return;}
 map=L.map('map',{scrollWheelZoom:false}).setView(CITY_CONFIG[selectedCity].center,CITY_CONFIG[selectedCity].zoom);markers=L.layerGroup().addTo(map);
 L.control.scale({imperial:false}).addTo(map);
}
function updateMarkers(tasks){
 if(!map||!markers)return;markers.clearLayers();
 const colors={3:'#53788a',4:'#b68646',5:'#a65840'};
 for(const q of tasks){
  const r=recordFor(q.id),node=document.createElement('div'),title=document.createElement('strong'),sub=document.createElement('div'),button=document.createElement('button');
  title.textContent=q.culture.place;sub.textContent=`${'★'.repeat(q.stars)} · ${timeRange(q)}`;button.textContent='展开任务卷宗';button.onclick=()=>openQuest(q.id);node.append(title,sub,button);
  L.circleMarker(q.latlng,{radius:q.stars===5?9:7,color:'#fffcf5',weight:2,fillColor:r.status==='done'?'#68885f':colors[q.stars],fillOpacity:.94}).bindPopup(node).bindTooltip(q.culture.place).addTo(markers);
 }
}
$('load-map').onclick=()=>{
 if(!map)return;if(!navigator.onLine){toast('当前离线，仍可查看本地任务参考点；底图需要联网。');return;}
 if(tileLayer){map.invalidateSize();return;}
 tileLayer=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,minZoom:7,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',detectRetina:false,keepBuffer:1});
 tileLayer.on('tileload',()=>{$('map-message').textContent='联网底图已载入。圆点为位置参考，不是准确入口；路线请按地点名核对。';});
 tileLayer.on('tileerror',()=>{$('map-message').textContent='部分底图未能连接。参考点和任务仍可用；国内网络下此底图可能加载较慢或不可用。';});
 tileLayer.addTo(map);$('load-map').textContent='底图已启用';$('map-message').textContent='正在连接联网底图…如果连接失败，可继续用本地参考点。';
};
$('fit-map').onclick=()=>{if(map){const q=visibleQuests();if(q.length)map.fitBounds(q.map(x=>x.latlng),{padding:[28,28],maxZoom:13});}};
$('home-map').onclick=()=>map?.setView(CITY_CONFIG[selectedCity].center,CITY_CONFIG[selectedCity].zoom);
for(const b of document.querySelectorAll('[data-close]'))b.onclick=()=>$(b.dataset.close).close();
$('data-tools').onclick=()=>$('tools-dialog').showModal();
$('export').onclick=()=>{
 const data={app:APP_ID,version:1,exportedAt:new Date().toISOString(),state};
 const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=`城市探索档案-${beijingToday()}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('已生成本页备份，请保管下载的JSON文件');
};
$('import').onchange=async e=>{
 try{const file=e.target.files[0];if(!file)return;if(file.size>3*1024*1024)throw Error('备份超过3MB，无法恢复');
  const data=JSON.parse(await file.text());if(data.app!==APP_ID||data.version!==1)throw Error('这不是城市探索任务表v1备份；不能使用原抽签机的备份');
  const replacement=validateState(data.state),count=Object.keys(replacement.records).length;
  if(!confirm(`恢复将替换本页面当前全部任务进度和手记（备份有${count}条记录）。建议先导出当前备份。是否继续？`))return;
  // Store before swapping UI state. If disk fails, do not discard the current in-memory journal.
  localStorage.setItem(STORAGE_KEY,JSON.stringify(replacement));state=replacement;readFailure=false;$('storage-warning').hidden=true;render();toast(`已恢复${count}条任务记录`);
 }catch(err){toast('未恢复：'+err.message);}finally{e.target.value='';}
};
$('clear').onclick=()=>{
 if(!confirm('只清空城市探索任务表的进度和手记，原抽签机不会受影响。没有备份将无法恢复，确定吗？'))return;
 try{localStorage.removeItem(STORAGE_KEY);state=freshState();readFailure=false;$('storage-warning').hidden=true;render();toast('本页记录已清空；可以用备份恢复');}catch{toast('未清空：浏览器拒绝访问本地存储');}
};
function connectivity(){const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;$('connection').textContent=navigator.onLine?(standalone?'已安装 · 本地保存':'本地保存 · 在线'):'离线 · 本地任务可用';}
addEventListener('online',connectivity);addEventListener('offline',connectivity);
addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('native-install').hidden=false;});
addEventListener('appinstalled',()=>{installPrompt=null;$('native-install').hidden=true;connectivity();toast('已安装，首次联网打开后可离线读任务');});
$('install').onclick=()=>{$('install-state').textContent=matchMedia('(display-mode: standalone)').matches||navigator.standalone?'当前正在已安装应用中使用。':location.hostname==='127.0.0.1'||location.hostname==='localhost'?'这是电脑本地预览。正式手机安装需部署到HTTPS网址后再打开。':'如果没有安装按钮，请按下面对应浏览器的方式添加。';$('install-dialog').showModal();};
$('native-install').onclick=async()=>{if(!installPrompt)return;await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('native-install').hidden=true;};
addEventListener('storage',e=>{if(e.key!==STORAGE_KEY)return;try{state=e.newValue?validateState(JSON.parse(e.newValue)):freshState();render();if(activeId)renderDetail();toast('已同步此浏览器另一页的任务变化');}catch{toast('另一页的记录格式异常，本页未载入');}});
addEventListener('hashchange',()=>{const id=new URLSearchParams(location.hash.slice(1)).get('quest');if(byId.has(id))openQuest(id);});
initMap();selectCity(selectedCity,false);connectivity();
const initialId=new URLSearchParams(location.hash.slice(1)).get('quest');if(byId.has(initialId))openQuest(initialId);
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('./service-worker.js').catch(()=>{toast('离线缓存暂未建立；请先联网使用并保管备份');});
