const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,'travel-data.js'),'utf8'),ctx);
const cities=vm.runInContext('TRAVEL_CITIES',ctx),ids=new Set();
assert.equal(cities.length,10);
let places=0,inline=0;
for(const c of cities){
 assert(!ids.has(c.id));ids.add(c.id);assert(c.intro&&c.compressed&&c.environment&&c.access&&c.lowEnergy);
 assert.equal(c.completion.length,3);assert.equal(c.lenses.length,3);assert.equal(c.itinerary.length,3);
 assert(c.places.length>=5&&c.places.length<=8);const pids=new Set();
 for(const p of c.places){assert(!pids.has(p.id));pids.add(p.id);assert(p.why&&p.mission&&p.notice&&p.time);assert(p.sources.length);for(const s of p.sources){assert(s?.title);assert.equal(new URL(s.url).protocol,'https:');}places++;}
 for(const d of c.itinerary){assert(d.plan&&d.travel);assert(d.places.length>0);for(const id of d.places)assert(pids.has(id),c.id+':路线未知地点'+id);}
 assert(c.readings.length>=2);for(const r of c.readings){assert(r.guide&&r.kind&&r.title);assert.equal(new URL(r.url).protocol,'https:');if(r.text){assert(r.author);inline++;}}
 assert(c.sources.length>=3);for(const s of c.sources)assert(s?.title&&new URL(s.url).protocol==='https:');
}
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
for(const asset of ['travel.html','travel.js','travel.css','travel-data.js','城市旅行维护说明.md'])assert(sw.includes('./'+asset)&&fs.existsSync(path.join(root,asset)),asset+'未进入离线包');
assert(sw.includes('ignoreSearch:true'),'多页离线深链接必须匹配请求页面');
const js=fs.readFileSync(path.join(root,'travel.js'),'utf8');assert(!js.includes('localStorage.clear('));assert(!js.includes('city-exploration-quests:state:v1'));
console.log(`通过：10份城市总任务、${places}个稳定地点编号、30条可选认城线索、${inline}份离线古诗/节选、路线引用与来源完整、新旧记录隔离。`);
