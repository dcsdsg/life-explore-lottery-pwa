'use strict';
const PREFIX='city-quests:'+self.registration.scope+':';
const CACHE=PREFIX+'v2';
const FILES=['./','./index.html','./styles.css','./app.js','./beijing-culture.js','./beijing-outskirts.js','./suzhou-quests.js','./qinhuangdao-quests.js','./quest-data.js','./manifest.webmanifest','./icon.svg','./icon-180.png','./icon-192.png','./icon-512.png','./vendor/leaflet.js','./vendor/leaflet.css','./vendor/coordtransform.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const url=new URL(e.request.url);
 // Do not cache OSM tiles, source pages, navigation providers or any other external requests.
 if(e.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 const known=FILES.map(f=>new URL(f,self.registration.scope).pathname);
 if(!known.includes(url.pathname)&&e.request.mode!=='navigate')return;
 if(e.request.mode==='navigate')e.respondWith(fetch(e.request).catch(()=>caches.match(new URL('./index.html',self.registration.scope))));
 else e.respondWith(caches.open(CACHE).then(c=>c.match(e.request)).then(r=>r||fetch(e.request)));
});
