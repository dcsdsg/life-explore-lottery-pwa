// Disposable storage only. Exercises decisions that can lose data or break offline Pages routes.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'../..'),mount='/life-explore-lottery-pwa/',base='http://127.0.0.1:8887'+mount;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.md':'text/plain; charset=utf-8','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 let p;try{p=decodeURIComponent(new URL(req.url,base).pathname);}catch{res.writeHead(400);res.end();return;}
 if(!p.startsWith(mount)){res.writeHead(404);res.end();return;}
 const f=path.resolve(root,p.slice(mount.length)+(p.endsWith('/')?'index.html':''));if(!f.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.stat(f,(e,s)=>{if(e||!s.isFile()){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'text/plain'});fs.createReadStream(f).pipe(res);});
});
(async()=>{
 let browser;try{
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(8887,'127.0.0.1',resolve);});
  browser=await chromium.launch({executablePath:process.env.CITY_QUEST_CHROME||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
  const ctx=await browser.newContext({viewport:{width:390,height:844},acceptDownloads:true}),errors=[];
  await ctx.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
  const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  await p.goto(base+'city-quests/travel.html');assert.equal(await p.locator('.travel-card').count(),16);
  assert((await p.locator('#travel-progress').innerText()).includes('/ 16'));assert.equal(await p.locator('#travel-new-cities button').count(),6);
  await p.locator('#travel-new-cities [data-trip-open="zhanjiang"]').click();assert((await p.locator('#travel-title').innerText()).includes('湛江'));await p.locator('#travel-close').click();
  // The native close event clears the deep link asynchronously; wait before testing a fresh board reload.
  await p.waitForFunction(()=>!new URL(location.href).searchParams.has('city'));
  await p.waitForFunction(async()=>!!(await navigator.serviceWorker.ready));await p.reload();await p.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await p.evaluate(()=>{localStorage.setItem('city-exploration-quests:state:v1','KEEP_EXPLORATION');localStorage.setItem('lifeExploreSentinel','KEEP_LOTTERY');});
  await p.locator('[data-trip-done="xian"]').click();assert.equal(await p.evaluate(()=>tripRecord('xian').status),'done');assert.equal(await p.evaluate(()=>travelCount(tripRecord('xian'))),0);
  await p.locator('[data-trip-done="xian"]').click();assert.equal(await p.evaluate(()=>tripRecord('xian').status),'planned');
  await p.locator('[data-trip-open="xian"]').click();await p.locator('[data-trip-visited="museum"]').check();await p.locator('[data-trip-clue="0"]').check();
  const note='回坊并不是整个唐长安。 </textarea><img src=x onerror="window.INJECTED=true">';await p.locator('#travel-note').fill(note);await p.locator('#travel-close').click();
  await p.locator('#travel-tools').click();const event=p.waitForEvent('download');await p.locator('#travel-export').click();const dl=await event,stream=await dl.createReadStream();let raw='';for await(const chunk of stream)raw+=chunk.toString('utf8');const backup=JSON.parse(raw);assert.equal(backup.app,'city-travel-quests');assert.equal(backup.records.xian.note,note);
  await p.locator('#travel-clear').click();assert.equal(await p.evaluate(()=>localStorage.getItem(TRAVEL_KEY)),null);assert.equal(await p.evaluate(()=>localStorage.getItem('city-exploration-quests:state:v1')),'KEEP_EXPLORATION');assert.equal(await p.evaluate(()=>localStorage.getItem('lifeExploreSentinel')),'KEEP_LOTTERY');
  await p.locator('#travel-import').setInputFiles({name:'旅行.json',mimeType:'application/json',buffer:Buffer.from(raw)});await p.waitForFunction(()=>tripRecord('xian').visited.museum);
  assert.equal(await p.evaluate(()=>tripRecord('xian').clues[0]),true);const restored=await p.evaluate(()=>localStorage.getItem(TRAVEL_KEY));
  await p.locator('#travel-import').setInputFiles({name:'错页.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...backup,app:'city-exploration-quests'}))});await p.waitForFunction(()=>document.getElementById('toast').textContent.startsWith('未恢复'));assert.equal(await p.evaluate(()=>localStorage.getItem(TRAVEL_KEY)),restored);
  const bad=JSON.parse(raw);bad.records.xian.visited.unknown=true;await p.locator('#travel-import').setInputFiles({name:'坏编号.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(bad))});await p.waitForFunction(()=>document.getElementById('toast').textContent.includes('未知地点'));assert.equal(await p.evaluate(()=>localStorage.getItem(TRAVEL_KEY)),restored);
  await p.locator('#travel-tools-close').click();await p.locator('[data-trip-open="xian"]').click();assert.equal(await p.locator('#travel-note').inputValue(),note);assert.equal(await p.evaluate(()=>window.INJECTED),undefined);assert.equal(await p.locator('#travel-detail img').count(),0);
  assert(await p.locator('#travel-dialog').evaluate(e=>e.scrollWidth<=e.clientWidth));await p.locator('#travel-close').click();
  await p.locator('#travel-search').fill('开元寺');assert.equal(await p.locator('.travel-card').count(),1);await p.locator('#travel-search').fill('');await p.locator('#travel-days').selectOption('2');assert((await p.locator('#travel-count').innerText()).includes('取舍'));
  const issues=await p.evaluate(()=>{const result=[];for(const c of TRAVEL_CITIES){openTravel(c.id);if(document.querySelectorAll('.trip-place').length!==c.places.length)result.push(c.id+':places');if(document.querySelector('#travel-dialog').scrollWidth>document.querySelector('#travel-dialog').clientWidth)result.push(c.id+':overflow');for(const a of document.querySelectorAll('#travel-detail a'))if(!a.href.startsWith('https:')||a.target!=='_blank')result.push(c.id+':link');}closeTravel();return result;});assert.deepEqual(issues,[]);
  await ctx.setOffline(true);await p.goto(base+'city-quests/travel.html?city=guilin');assert((await p.title()).includes('城市旅行'));assert((await p.locator('#travel-title').innerText()).includes('桂林'));
  await p.locator('.inline-reading summary').click();assert((await p.locator('.inline-text').innerText()).includes('江作青罗带'));await p.locator('#travel-close').click();
  assert.equal(await p.evaluate(()=>tripRecord('xian').note),note);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(process.env.TRAVEL_SCREENSHOT)await p.screenshot({path:process.env.TRAVEL_SCREENSHOT,fullPage:false});
  await p.goto(base+'city-quests/travel.html?city=wuhan');assert((await p.locator('#travel-title').innerText()).includes('武汉'));await p.locator('.inline-reading summary').click();assert((await p.locator('.inline-text').innerText()).includes('晴川历历汉阳树'));await p.locator('#travel-close').click();
  await p.goto(base+'city-quests/travel.html?city=zhanjiang');assert((await p.locator('#travel-title').innerText()).includes('湛江'));await p.locator('[data-trip-visited="chikan"]').check();await p.locator('[data-trip-complete]').click();assert.equal(await p.evaluate(()=>tripRecord('zhanjiang').status),'done');await p.locator('#travel-close').click();
  await p.goto(base+'city-quests/travel.html?city=shenzhen');assert((await p.locator('#travel-detail').innerText()).includes('闭展公告'));await p.locator('#travel-close').click();
  await ctx.setOffline(false);await p.setViewportSize({width:1440,height:1000});await p.reload();assert.equal(await p.locator('.travel-card').count(),16);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  // An old ten-city v1 backup still restores; it must not be rejected as a different app.
  await p.locator('#travel-tools').click();await p.locator('#travel-import').setInputFiles({name:'原十城v1.json',mimeType:'application/json',buffer:Buffer.from(raw)});await p.waitForFunction(()=>tripRecord('zhanjiang').status==='new');assert.equal(await p.evaluate(()=>tripRecord('xian').note),note);await p.locator('#travel-tools-close').click();
  // Corrupt old state is not overwritten; denied writes do not claim success.
  await p.evaluate(()=>localStorage.setItem(TRAVEL_KEY,'{bad'));await p.reload();assert(await p.locator('#travel-storage-warning').isVisible());await p.locator('[data-trip-done="xian"]').click();assert.equal(await p.evaluate(()=>localStorage.getItem(TRAVEL_KEY)),'{bad');
  await p.locator('#travel-tools').click();await p.locator('#travel-import').setInputFiles({name:'恢复.json',mimeType:'application/json',buffer:Buffer.from(raw)});await p.waitForFunction(()=>!travelStorageBlocked);assert.equal(await p.evaluate(()=>tripRecord('xian').note),note);await p.locator('#travel-tools-close').click();
  await p.evaluate(()=>Storage.prototype.setItem=()=>{throw new DOMException('Quota exceeded','QuotaExceededError');});await p.locator('[data-trip-done="xian"]').click();assert.equal(await p.evaluate(()=>tripRecord('xian').status),'planned');assert(await p.locator('#travel-storage-warning').isVisible());
  assert.deepEqual(errors,[]);console.log('通过：16城渲染与六城快捷入口、家乡完成/到访、旧十城v1备份兼容、地点与整城完成独立、真实备份恢复及坏文件拒绝、旧数据键保留、390px/桌面无溢出、武汉/湛江/深圳深链接离线及古诗、闭展提示、坏存储及写入失败保护。');
 }finally{await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
