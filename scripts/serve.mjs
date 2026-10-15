import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../public');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.webp':'image/webp','.ttf':'font/ttf','.pdf':'application/pdf','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document'};
createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let file=path.resolve(base,'.'+decodeURIComponent(url.pathname));if(file!==base&&!file.startsWith(base+path.sep)){res.writeHead(403);res.end();return}if(['_headers','_redirects'].includes(path.basename(file))){res.writeHead(404);res.end();return}const info=await stat(file);if(info.isDirectory()){if(!url.pathname.endsWith('/')){res.writeHead(301,{Location:url.pathname+'/'+url.search});res.end();return}file=path.join(file,'index.html')}const body=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(body)}catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(path.join(base,'404.html')))}}).listen(port,'127.0.0.1',()=>console.log(`Local preview: http://localhost:${port}/`));
