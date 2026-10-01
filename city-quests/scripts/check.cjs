// 内容结构检查：新增任务后运行。不会改写应用或用户记录。
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx=vm.createContext({coordtransform:require(path.join(root,'vendor/coordtransform.js'))});
for(const f of ['beijing-culture.js','beijing-outskirts.js','suzhou-quests.js','qinhuangdao-quests.js','quest-data.js','reading-resources.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const quests=vm.runInContext('QUESTS',ctx),ids=new Set();
assert.equal(quests.length,52,'三城版应为52条');
for(const [city,count] of Object.entries({beijing:30,suzhou:16,qinhuangdao:6}))assert.equal(quests.filter(q=>q.city===city).length,count);
const bounds={beijing:[39.4,41.1,115.5,117.6],suzhou:[31.1,31.5,120.3,121.0],qinhuangdao:[39.7,40.2,119.3,120.0]};
for(const q of quests){
 assert(!ids.has(q.id),'ID重复：'+q.id);ids.add(q.id);assert.equal(q.steps.length,q.city==='qinhuangdao'?3:4);
 assert(q.steps.every(s=>typeof s==='string'&&s.length>5));assert([3,4,5].includes(q.stars));
 const b=bounds[q.city];assert(q.latlng[0]>b[0]&&q.latlng[0]<b[1]&&q.latlng[1]>b[2]&&q.latlng[1]<b[3],'点位超出城市参考范围：'+q.id);
 assert(q.budget>=0&&Number.isFinite(q.budget));assert([1,2,3].includes(q.energy));
 for(const a of [q.culture.travel,q.culture.onsite]){if(a===null){assert.equal(q.city,'qinhuangdao');continue;}assert(a.length===2&&a[0]>0&&a[1]>=a[0]);}
 assert(q.culture.sources.length>=2);for(const s of q.culture.sources)assert.equal(new URL(s.url).protocol,'https:');
 assert(q.hook&&q.culture.question&&q.culture.access&&q.culture.environment&&q.culture.reading.length);
}
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));assert.equal(manifest.scope,'./');assert.equal(manifest.start_url,'./');
for(const i of manifest.icons)assert(fs.existsSync(path.join(root,i.src)),'缺少图标：'+i.src);
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');assert(sw.includes("url.origin!==self.location.origin"));assert(!sw.includes('tile.openstreetmap'));
const resources=vm.runInContext('READING_RESOURCES',ctx),kinds=vm.runInContext('READING_KIND_LABELS',ctx),read=vm.runInContext('readingResourcesFor',ctx);
for(const [key,entry] of Object.entries(resources)){
 const [id,index]=key.split(':'),q=quests.find(q=>q.id===id);assert(q,'阅读入口对应任务不存在：'+key);
 assert.equal(q.culture.reading[Number(index)]?.title,entry.expectedTitle,'阅读材料序号或标题改变：'+key);
 assert(entry.links.length>0);for(const link of entry.links){assert(kinds[link.kind]&&link.label&&link.source);assert.equal(new URL(link.url).protocol,'https:');}
 if(entry.inline){assert(entry.inline.extent&&entry.inline.author&&entry.inline.text&&entry.inline.source);assert.equal(new URL(entry.inline.url).protocol,'https:');assert(!/巴金|汪曾祺/.test(entry.expectedTitle),'不应内置现代作品全文');}
}
let readingCount=0;for(const q of quests)q.culture.reading.forEach((_,i)=>{const entry=read(q,i);assert(entry.links.length);readingCount++;});
assert(sw.includes('./reading-resources.js'),'阅读材料没有加入离线包');
const steps=quests.reduce((n,q)=>n+q.steps.length,0);
console.log(`通过：${quests.length}个唯一任务（北京30/苏州16/秦皇岛6）、${steps}个可选清单步骤、${readingCount}项阅读材料入口（${Object.keys(resources).length}项专配）、各城参考点、资料链接、费用时长与独立PWA资源。`);
