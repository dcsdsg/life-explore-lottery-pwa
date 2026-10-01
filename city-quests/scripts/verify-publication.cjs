// Verify co-hosted apps under a GitHub Pages-style path, in disposable browser storage.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'../..'),mount='/life-explore-lottery-pwa/',base='http://127.0.0.1:8886'+mount;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 let p;try{p=decodeURIComponent(new URL(req.url,base).pathname);}catch{res.writeHead(400);res.end();return;}
 if(!p.startsWith(mount)){res.writeHead(404);res.end();return;}
 const file=path.resolve(root,p.slice(mount.length)+(p.endsWith('/')?'index.html':''));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.stat(file,(e,s)=>{if(e||!s.isFile()){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'text/plain'});fs.createReadStream(file).pipe(res);});
});
(async()=>{
 let browser;
 try{
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(8886,'127.0.0.1',resolve);});
  browser=await chromium.launch({executablePath:process.env.CITY_QUEST_CHROME||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
  const ctx=await browser.newContext({viewport:{width:390,height:844}}),errors=[];
  await ctx.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
  const city=await ctx.newPage();city.on('pageerror',e=>errors.push(e.message));
  await city.goto(base+'city-quests/?city=qinhuangdao');assert.equal(await city.locator('.quest-card').count(),6);
  await city.waitForFunction(async()=>!!(await navigator.serviceWorker.ready));await city.reload();await city.waitForFunction(()=>navigator.serviceWorker.controller?.scriptURL.includes('/city-quests/'));
  await city.locator('[data-complete="qhd_glass"]').click();
  await city.evaluate(async()=>{await caches.open('unrelated-app-keep');await caches.open('life-explore-pwa-v4');});
  const old=await ctx.newPage();old.on('pageerror',e=>errors.push(e.message));await old.goto(base);
  const oldTitle=await old.title();assert(oldTitle.includes('生活探索'));await old.waitForFunction(async()=>!!(await navigator.serviceWorker.ready));await old.reload();await old.waitForFunction(()=>!!navigator.serviceWorker.controller);
  const names=await old.evaluate(()=>caches.keys());assert(names.includes('unrelated-app-keep'));assert(!names.includes('life-explore-pwa-v4'));assert(names.includes('life-explore-pwa-v5'));assert(names.some(n=>n.startsWith('city-quests:')&&n.endsWith(':v2')));
  // A root-scope client requesting the new page must not overwrite its own offline HTML.
  const nested=await old.evaluate(async u=>(await fetch(u)).text(),base+'city-quests/');assert(nested.includes('城市探索任务表'));
  await ctx.setOffline(true);await city.reload();assert.equal(await city.locator('.quest-card').count(),6);assert.equal(await city.evaluate(()=>recordFor('qhd_glass').status),'done');
  await city.locator('#city').selectOption('suzhou');assert.equal(await city.locator('.quest-card').count(),16);
  await city.locator('#city').selectOption('beijing');assert.equal(await city.locator('.quest-card').count(),30);
  await old.reload();assert.equal(await old.title(),oldTitle);assert.equal(await old.locator('.quest-card').count(),0);assert.deepEqual(errors,[]);
  console.log('通过：原首页保留、双PWA缓存隔离、其他缓存保留、旧版本缓存清理、原页面取新页面不污染首页、三城及原抽签机离线重开。');
 }finally{await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
