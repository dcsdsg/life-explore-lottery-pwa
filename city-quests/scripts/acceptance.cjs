const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..'),base='http://127.0.0.1:8877/';
const executable=process.env.CITY_QUEST_CHROME||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const passed=[];let second;
(async()=>{
 const browser=await chromium.launch({executablePath:executable,headless:true});
 try{
  // Render repo-native SVG into app icons; generated output, not an edit of an existing image.
  const iconPage=await browser.newPage();const svg=fs.readFileSync(path.join(root,'icon.svg'),'utf8');
  for(const size of [180,192,512]){await iconPage.setViewportSize({width:size,height:size});await iconPage.setContent(`<style>body{margin:0}svg{width:100vw;height:100vh;display:block}</style>${svg}`);await iconPage.screenshot({path:path.join(root,`icon-${size}.png`)});}await iconPage.close();
  const context=await browser.newContext({viewport:{width:1440,height:1050},acceptDownloads:true});
  // Do not scrape or fetch OSM in an automated test. Mock outside requests; test local marker/UI behavior only.
  await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
  await page.goto(base);await page.locator('.quest-card').last().waitFor();assert.equal(await page.locator('.quest-card').count(),30);
  await page.locator('.departure summary').click();await page.locator('#date').fill('2026-10-01');await page.locator('#date').dispatchEvent('change');await page.locator('.departure summary').click();
  assert((await page.locator('[data-id="bjc_bells"]').innerText()).includes('闭馆'));
  const results=await page.evaluate(()=>({badDate:validDate('2026-02-30'),leap:validDate('2028-02-29'),bells:scheduleBlock(byId.get('bjc_bells'),'2026-10-01'),bellsAfter:scheduleBlock(byId.get('bjc_bells'),'2026-10-31'),near:totalMinutes(byId.get('bjc_literature')),rain:mismatch(byId.get('bjc_tanzhe'),{date:'2026-10-01',budget:150,duration:720,energy:3,weather:'rain',daypart:'morning'}),severe:mismatch(byId.get('bjc_literature'),{date:'2026-10-01',budget:150,duration:720,energy:3,weather:'severe',daypart:'morning'})}));
  assert.equal(results.badDate,false);assert.equal(results.leap,true);assert(results.bells);assert.equal(results.bellsAfter,'');assert.deepEqual(results.near,[105,165]);assert(results.rain.includes('不适合轻雨'));assert(results.severe.length);passed.push('30条任务与日期、闭馆、含往返时长、天气规则');
  await page.locator('#search').fill('野草');assert.equal(await page.locator('.quest-card').count(),1);await page.locator('#search').fill('');
  await page.locator('#stars').selectOption('5');assert.equal(await page.locator('.quest-card').count(),7);await page.locator('#stars').selectOption('all');passed.push('作品搜索、星级筛选');
  await page.locator('[data-open="bjc_literature"]').click();await page.locator('#accept-quest').click();
  const note='现场发现：<img src=x onerror=alert(1)> 是测试文字，不应执行。';await page.locator('#quest-note').fill(note);
  // Completion is independent of optional checklist; checking/unchecking later must not cancel it.
  await page.locator('#finish-quest').click();assert.equal(await page.locator('[data-step]:checked').count(),0);
  await page.locator('[data-step]').first().check();await page.locator('[data-step]').first().uncheck();assert.equal(await page.evaluate(()=>recordFor(activeId).status),'done');
  assert(await page.locator('#completion').isVisible());await page.locator('#close-quest').click();await page.reload();
  await page.locator('[data-open="bjc_literature"]').click();assert.equal(await page.locator('#quest-note').inputValue(),note);assert.equal(await page.locator('[data-step]:checked').count(),0);assert.equal(await page.locator('#quest-detail img').count(),0);await page.locator('#close-quest').click();passed.push('不勾清单一键完成，修改清单不取消完成；重开保留，手记HTML按文字处理');
  await page.locator('#city').selectOption('suzhou');assert.equal(await page.locator('.quest-card').count(),16);assert.equal(await page.locator('.leaflet-interactive').count(),16);assert((await page.locator('#origin').innerText()).includes('文昌路站'));assert.equal(await page.locator('#region option[value="oldcity"]').count(),0);
  await page.locator('[data-complete="sz_canli"]').click();assert.equal(await page.evaluate(()=>state.records.sz_canli.status),'done');assert.equal(await page.evaluate(()=>state.records.sz_canli.checks.some(Boolean)),false);
  await page.locator('[data-complete="sz_canli"]').click();assert.equal(await page.evaluate(()=>state.records.sz_canli.status),'active');await page.locator('[data-complete="sz_canli"]').click();
  await page.reload();assert.equal(await page.locator('#city').inputValue(),'suzhou');assert.equal(await page.evaluate(()=>state.records.bjc_literature.note),note);
  await page.locator('#city').selectOption('qinhuangdao');assert.equal(await page.locator('.quest-card').count(),6);assert.equal(await page.locator('.leaflet-interactive').count(),6);assert((await page.locator('#duration-label').textContent()).includes('不含往返'));
  await page.locator('[data-open="qhd_glass"]').click();assert((await page.locator('#quest-detail').innerText()).includes('住宿地未设定'));assert.equal(await page.locator('[data-step]').count(),3);const amap=await page.locator('#quest-detail a[href*="uri.amap"]').getAttribute('href');assert(decodeURIComponent(amap).includes('city=秦皇岛'));await page.locator('#finish-quest').click();await page.locator('#close-quest').click();
  await page.locator('[data-view="sources"]').click();assert((await page.locator('#research-portals').innerText()).includes('河北省文物局'));await page.locator('[data-view="board"]').click();await page.locator('#city').selectOption('beijing');passed.push('三城卡片/区域/地图/资料分离；苏州卡片完成与撤销，秦皇岛不伪造往返');
  await page.locator('#data-tools').click();const downloadEvent=page.waitForEvent('download');await page.locator('#export').click();const downloaded=await downloadEvent;const backup=JSON.parse(fs.readFileSync(await downloaded.path(),'utf8'));assert.equal(backup.app,'city-exploration-quests');assert.equal(backup.state.records.bjc_literature.status,'done');
  await page.evaluate(()=>localStorage.setItem('old-lottery-sentinel','keep'));
  await page.locator('#clear').click();assert.equal(await page.evaluate(()=>localStorage.getItem('old-lottery-sentinel')),'keep');assert.equal(await page.evaluate(()=>state.records.bjc_literature),undefined);
  await page.locator('#import').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.waitForFunction(()=>state.records.bjc_literature?.status==='done');
  const bad={...backup,state:{...backup.state,records:{...backup.state.records,bjc_literature:{...backup.state.records.bjc_literature,checks:[true]}}}};
  await page.locator('#import').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(bad))});await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('未恢复'));assert.equal(await page.evaluate(()=>state.records.bjc_literature.checks.length),4);
  assert.equal(await page.evaluate(()=>state.records.sz_canli.status),'done');assert.equal(await page.evaluate(()=>state.records.qhd_glass.status),'done');
  // Previously exported Beijing v1 record remains valid under the relaxed completion semantics.
  const legacy={records:{bjc_literature:{...backup.state.records.bjc_literature,checks:[true,true,true,true]}},lastDraw:null};
  assert.equal(await page.evaluate(s=>Object.keys(validateState(s).records).length,legacy),1);
  await page.locator('[data-close="tools-dialog"]').click();passed.push('三城统一导出/清空/恢复，兼容旧北京记录；非法备份拒绝、不清其他存储');
  const a=await page.evaluate(()=>QUESTS.filter(q=>!['done','skipped'].includes(recordFor(q.id).status)&&mismatch(q).length===0).length);assert(a>1);
  await page.locator('#random').click();const first=await page.evaluate(()=>activeId);await page.locator('#close-quest').click();await page.locator('#random').click();const next=await page.evaluate(()=>activeId);assert.notEqual(first,next);assert.notEqual(next,'bjc_literature');await page.locator('#close-quest').click();passed.push('随机悬赏不连续重复、不抽已完成任务');
  await page.waitForFunction(async()=>!!(await navigator.serviceWorker.ready));await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await context.setOffline(true);await page.reload();assert.equal(await page.locator('.quest-card').count(),30);await page.locator('[data-open="bjc_literature"]').click();assert.equal(await page.locator('#quest-note').inputValue(),note);await page.locator('#close-quest').click();
  for(const [city,count] of [['suzhou',16],['qinhuangdao',6]]){await page.locator('#city').selectOption(city);assert.equal(await page.locator('.quest-card').count(),count);await page.reload();assert.equal(await page.locator('.quest-card').count(),count);}
  await page.locator('#city').selectOption('beijing');await context.setOffline(false);passed.push('缓存建立后三城离线切换与重开，正文和完成进度保留');
  await page.locator('[data-view="map"]').click();assert.equal(await page.locator('.leaflet-interactive').count(),30);await page.locator('.leaflet-interactive').first().click();await page.locator('.leaflet-popup button').click();assert(await page.locator('#quest-dialog').isVisible());await page.locator('#close-quest').click();passed.push('30个地图参考点与任务联动（未请求真实外网底图）');
  await page.locator('[data-view="board"]').click();await page.locator('#city').selectOption('suzhou');await page.screenshot({path:path.join(root,'验收-桌面.png'),fullPage:false});
  const mobile=await context.newPage();await mobile.setViewportSize({width:390,height:844});await mobile.goto(base);await mobile.locator('.quest-card').last().waitFor();assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await mobile.locator('[data-view="map"]').click();assert(await mobile.locator('#map').isVisible());await mobile.locator('[data-view="board"]').click();await mobile.screenshot({path:path.join(root,'验收-手机.png'),fullPage:false});passed.push('390px手机布局无横向溢出，地图页可见');
  const webkit=require('playwright').webkit;try{const wb=await webkit.launch({headless:true});const wp=await wb.newPage({viewport:{width:390,height:844}});await wp.goto(base);assert.equal(await wp.locator('.quest-card').count(),30);await wp.locator('[data-open="bjc_literature"]').click();assert(await wp.locator('#quest-dialog').isVisible());await wb.close();passed.push('桌面WebKit浏览器打开与任务详情');}catch(e){console.log('WebKit未实测：'+e.message.split('\n')[0]);}
  second=spawn(process.execPath,[path.join(root,'preview-server.cjs')],{env:{...process.env,CITY_QUEST_PORT:'8878',CITY_QUEST_BASE:'/test-repo/'},windowsHide:true,stdio:'pipe'});
  await new Promise((resolve,reject)=>{second.stdout.once('data',resolve);second.once('error',reject);});
  const sub=await browser.newContext({viewport:{width:390,height:844}}),sp=await sub.newPage();await sp.goto('http://127.0.0.1:8878/test-repo/');assert.equal(await sp.locator('.quest-card').count(),30);await sp.waitForFunction(async()=>!!(await navigator.serviceWorker.ready));await sp.reload();await sp.waitForFunction(()=>!!navigator.serviceWorker.controller);await sub.setOffline(true);await sp.reload();assert.equal(await sp.locator('.quest-card').count(),30);await sub.close();passed.push('GitHub Pages式子路径载入与离线复开');
  assert.deepEqual(errors,[]);passed.push('浏览器执行无未捕获错误');
  console.log(passed.map((x,i)=>`${i+1}. 通过：${x}`).join('\n'));
 }finally{second?.kill();await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
