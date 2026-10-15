const PREFIX='nwn-underhive-dice-';
const CACHE=PREFIX+'cloudflare-1';
const ROOT=new URL('./',self.location.href);
const ASSETS=['./','index.html','styles.css','app.js','manifest.webmanifest','icon.svg','../../dice.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(x=>new URL(x,ROOT).href)))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==ROOT.origin||(!url.pathname.startsWith(ROOT.pathname)&&url.pathname!='/dice.js'))return;event.respondWith(fetch(event.request).then(response=>{if(response.ok&&!response.redirected&&response.type!=='opaqueredirect'){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)))}return response}).catch(()=>caches.open(CACHE).then(cache=>cache.match(event.request))))});
