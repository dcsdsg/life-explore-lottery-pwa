'use strict';
// This itinerary only reads the existing completion badges. It never writes progress or creates another database.
function showTempleProgress(){
 const labels={new:'尚未接取',active:'进行中',done:'已完成',skipped:'暂缓'};
 let records={};
 try{
  const raw=localStorage.getItem('city-exploration-quests:state:v1');
  if(raw){const state=JSON.parse(raw);if(!state||!state.records||Array.isArray(state.records)||typeof state.records!=='object')throw Error('bad records');records=state.records;}
  for(const [id,node] of [['bjc_jietai','jietai-status'],['bjc_tanzhe','tanzhe-status']]){
   const status=Object.hasOwn(records,id)?records[id]?.status:'new';
   if(!Object.hasOwn(labels,status))throw Error('bad status');
   document.getElementById(node).textContent='原任务 · '+labels[status];
  }
 }catch{
  for(const id of ['jietai-status','tanzhe-status'])document.getElementById(id).textContent='原记录暂不能读取；未改动数据';
 }
}
showTempleProgress();
addEventListener('pageshow',showTempleProgress);
addEventListener('storage',e=>{if(e.key==='city-exploration-quests:state:v1')showTempleProgress();});
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
if(today>'2026-10-03'){
 const note=document.getElementById('temple-date-note');note.hidden=false;
 note.textContent='这是2026年10月3日的行程快照，日期已过。文化任务仍可参考，但天气、票价、班次、修缮与开园必须重新核对；本页不会自动更新这些信息。';
}
async function prepareTempleOffline(){
 const node=document.getElementById('temple-offline');
 if(!('serviceWorker' in navigator)||!('caches' in window)||!/^https?:$/.test(location.protocol)){node.textContent='当前打开方式未建立离线缓存；请用正式HTTPS网址联网打开。';return;}
 const scope=new URL('./',location.href).href,cacheName='city-quests:'+scope+':v6';
 const required=['./temple-day.html','./temple-day.css','./temple-day.js','./styles.css','./index.html','./app.js','./beijing-culture.js','./beijing-outskirts.js','./suzhou-quests.js','./qinhuangdao-quests.js','./quest-data.js','./reading-resources.js','./vendor/coordtransform.js','./vendor/leaflet.js','./vendor/leaflet.css'];
 try{
  await navigator.serviceWorker.register('./service-worker.js');
  await navigator.serviceWorker.ready;
  // A former worker can already be active while the new guide is still installing. Read readiness from the actual cache.
  const ready=(await caches.keys()).includes(cacheName)&& (await Promise.all(required.map(async f=>!!(await caches.match(new URL(f,scope),{cacheName}))))).every(Boolean);
  node.textContent=ready?'离线正文已准备 · 本页及原任务正文可复开；外站全文、天气与导航需联网。':'离线资源尚未全部准备 · 保持联网，稍后重开本页检查；外站全文不会自动缓存。';
 }catch{node.textContent='离线缓存暂未建立或无法检查；保留联网阅读，原任务记录未改动。';}
}
prepareTempleOffline();
if('serviceWorker' in navigator)navigator.serviceWorker.addEventListener('controllerchange',prepareTempleOffline);
addEventListener('online',prepareTempleOffline);
