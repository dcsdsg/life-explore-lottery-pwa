// Release checks: stale/offline itinerary HTML, changed checklist order, or storage writes would invalidate this trip handoff.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),vm=require('node:vm'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'../..'),mount='/life-explore-lottery-pwa/',base='http://127.0.0.1:8888'+mount;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 let p;try{p=decodeURIComponent(new URL(req.url,base).pathname);}catch{res.writeHead(400);res.end();return;}
 if(!p.startsWith(mount)){res.writeHead(404);res.end();return;}
 const f=path.resolve(root,p.slice(mount.length)+(p.endsWith('/')?'index.html':''));
 if(!f.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.stat(f,(e,s)=>{if(e||!s.isFile()){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'text/plain; charset=utf-8'});fs.createReadStream(f).pipe(res);});
});
function tasks(source){const ctx=vm.createContext({});vm.runInContext(source,ctx);return JSON.parse(vm.runInContext('JSON.stringify(BEIJING_OUTSKIRT_TASKS)',ctx));}
const old=tasks(execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/'),'-C',root,'show','HEAD:city-quests/beijing-outskirts.js'],{encoding:'utf8'}));
const next=tasks(fs.readFileSync(path.join(root,'city-quests/beijing-outskirts.js'),'utf8'));
assert.deepEqual(next.map(q=>({id:q.id,steps:q.steps})),old.map(q=>({id:q.id,steps:q.steps})),'旧清单顺序或ID变动会损害已有记录');
(async()=>{
 let browser;try{
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(8888,'127.0.0.1',resolve);});
  browser=await chromium.launch({executablePath:process.env.CITY_QUEST_CHROME||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
  const ctx=await browser.newContext({viewport:{width:390,height:844},acceptDownloads:true}),errors=[];
  await ctx.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
  const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'city-quests/temple-day.html');
  const stamp='2026-10-01T12:00:00.000Z',note='保留的原手记 <img src=x onerror=alert(1)>';
  const state={records:{bjc_jietai:{status:'done',checks:[true,false,true,false],note,completedAt:stamp,updatedAt:stamp},bjc_tanzhe:{status:'active',checks:[false,true,false,true],note:'另一份原手记',completedAt:null,updatedAt:stamp}},lastDraw:null};
  const raw=JSON.stringify(state);
  await p.evaluate(raw=>{localStorage.setItem('city-exploration-quests:state:v1',raw);localStorage.setItem('city-travel-quests:state:v1','KEEP_CITY_TRAVEL');localStorage.setItem('lifeExploreSentinel','KEEP_LOTTERY');},raw);
  await p.reload();assert((await p.locator('#jietai-status').innerText()).includes('已完成'));assert((await p.locator('#tanzhe-status').innerText()).includes('进行中'));
  await p.waitForFunction(()=>document.getElementById('temple-offline').textContent.includes('离线正文已准备'));
  await p.waitForFunction(()=>navigator.serviceWorker.controller?.scriptURL.includes('/city-quests/'));
  assert.equal(await p.evaluate(()=>localStorage.getItem('city-exploration-quests:state:v1')),raw);
  const issues=await p.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].map(a=>a.hash.slice(1)).filter(id=>!document.getElementById(id)));assert.deepEqual(issues,[]);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert((await p.locator('#route').innerText()).includes('14:30'));assert((await p.locator('#route').innerText()).includes('15:00'));
  await p.locator('a[href="#reading"]').click();assert((await p.locator('#reading').innerText()).includes('1934'));
  if(process.env.CITY_QUEST_TEMPLE_SCREENSHOT)await p.screenshot({path:process.env.CITY_QUEST_TEMPLE_SCREENSHOT,fullPage:false});
  await ctx.setOffline(true);await p.goto(base+'city-quests/temple-day.html?offline=1#reading');
  assert((await p.locator('h1').innerText()).includes('先看戒坛与松'));assert((await p.locator('#temple-offline').innerText()).includes('离线正文已准备'));
  await p.locator('#jietai .temple-task-link a').click();await p.waitForSelector('#quest-dialog[open]');
  assert.equal(await p.evaluate(()=>recordFor('bjc_jietai').note),note);assert.equal(await p.locator('[data-step]:checked').count(),2);
  assert.equal(await p.locator('#reading-1 .reading-link').first().getAttribute('href'),'https://zh.wikisource.org/zh-hans/%E6%BD%AD%E6%9F%98%E5%AF%BA%E6%88%92%E5%A3%87%E5%AF%BA');
  assert.equal(await p.evaluate(()=>localStorage.getItem(STORAGE_KEY)),raw,'只读打开任务不能重写已有记录');
  await p.locator('#close-quest').click();
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'北京首页入口在手机上不能横向溢出');
  await p.goto(base+'city-quests/?city=beijing#quest=bjc_tanzhe');await p.waitForSelector('#quest-dialog[open]');
  assert.equal(await p.locator('[data-step]:checked').count(),2);assert.equal(await p.locator('#reading-1 .reading-link').count(),2);
  await p.locator('#quest-dialog a[href="./temple-day.html"]').click();assert((await p.locator('#tanzhe-status').innerText()).includes('进行中'));
  assert.equal(await p.evaluate(()=>localStorage.getItem('city-travel-quests:state:v1')),'KEEP_CITY_TRAVEL');
  assert.equal(await p.evaluate(()=>localStorage.getItem('lifeExploreSentinel')),'KEEP_LOTTERY');
  await ctx.setOffline(false);await p.setViewportSize({width:1440,height:1000});await p.reload();assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.evaluate(()=>localStorage.setItem('city-exploration-quests:state:v1','{broken'));await p.reload();
  assert((await p.locator('#jietai-status').innerText()).includes('未改动数据'));assert.equal(await p.evaluate(()=>localStorage.getItem('city-exploration-quests:state:v1')),'{broken');
  assert.deepEqual(errors,[]);console.log('通过：原ID及清单顺序保留、390px/桌面无溢出、新行程与双寺任务Pages子路径离线互跳、朱自清及古籍入口、已有勾选/手记/完成状态保留、读取坏存储不覆盖、旅行与原抽签机数据键不写入。');
 }finally{await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
