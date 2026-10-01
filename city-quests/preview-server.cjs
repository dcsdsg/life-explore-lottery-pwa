// 仅服务本任务文件夹；不接受上传，也不读取原抽签机。
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,port=Number(process.env.CITY_QUEST_PORT||8877);
const mount=process.env.CITY_QUEST_BASE||'';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.md':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
 let requestPath;try{requestPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
 if(mount){if(!requestPath.startsWith(mount)){res.writeHead(404);res.end();return;}requestPath='/'+requestPath.slice(mount.length);}
 const file=path.resolve(root,'.'+requestPath+(requestPath.endsWith('/')?'index.html':''));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.stat(file,(error,stat)=>{if(error||!stat.isFile()){res.writeHead(404);res.end('Not found');return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
  if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
 });
}).listen(port,'127.0.0.1',()=>console.log(`城市探索任务表预览：http://127.0.0.1:${port}/`));
