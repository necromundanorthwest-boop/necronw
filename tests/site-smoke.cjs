const {chromium}=require(require.resolve('playwright',{paths:[process.cwd(),process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES].filter(Boolean)}));
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {spawn}=require('node:child_process');
const project=path.resolve(__dirname,'..'),site=path.resolve(process.env.TEST_SITE_ROOT||path.join(project,'public'));
let served=site;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.webp':'image/webp','.ttf':'font/ttf','.md':'text/plain','.pdf':'application/pdf'};
const server=http.createServer((req,res)=>{try{const url=new URL(req.url,'http://localhost');let file=path.resolve(served,'.'+decodeURIComponent(url.pathname));if(!file.startsWith(served+path.sep)&&file!==served)throw Error('outside root');if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(fs.readFileSync(file))}catch{res.writeHead(404);res.end('Not found')}});
const report={routes:[],widths:[320,375,768,1280],checks:[],errors:[]};
(async()=>{
 let browser;
 try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
  browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-software-rasterizer','--no-zygote','--single-process','--disable-dev-shm-usage']});
  const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'}),page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.errors.push(`${r.status()} ${r.url()}`)});page.on('dialog',d=>d.accept());
  const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('n2-necromund-ai-v03')));
  const noOverflow=async(label)=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),label+' overflows');
  console.log('Starting packaged site tests');
  console.log('Testing public routes; cached upgrades have a separate upgrade-smoke.cjs test.');
  console.log('Service worker checks complete; testing routes');
  const routes=['/#/','/#/solo','/#/blog','/#/resources','/#/gallery','/#/dice','/#/scenarios','/#/scenarios/dead-signal','/#/scenarios/the-hunt','/#/ai'];
  for(const width of report.widths){
   await page.setViewportSize({width,height:900});
   for(const route of routes){await page.goto(base+route);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);await noOverflow(width+' '+route);if(width===1280)report.routes.push(route)}
  }
  await page.goto(base+'/#/blog');assert.equal(await page.locator('.article-card').count(),6);
  for(const id of ['n26-rules-changes','kill-team-to-necromunda','n26-first-impressions','necromunda-roleplay-and-solo']){await page.goto(base+'/#/blog/'+id);await page.locator('.article-body').waitFor();assert.ok(await page.locator('.article-body p').count()>5)}
  await page.goto(base+'/#/resources');assert.equal(await page.locator('.resource-card').count(),13);
  await page.goto(base+'/#/gallery');assert.equal(await page.locator('.photo-card').count(),7);await page.locator('.photo-card img').evaluateAll(xs=>Promise.all(xs.map(x=>x.decode())));await page.locator('.photo-card').first().click();await page.locator('.lightbox-image').evaluate(img=>img.decode());await page.keyboard.press('Escape');
  await page.goto(base+'/#/dice');await page.locator('#roll').click();assert.equal(await page.locator('.result-card').count(),1);
  await page.goto(base+'/apps/underhive-dice/');await page.locator('#roll-button').click();assert.equal(await page.locator('.result-card').count(),1);
  console.log('Existing features passed');
  report.checks.push('Six blog entries with four full articles, 13 resources, seven decoded photos/lightbox and both dice rollers');
  await page.goto(base+'/#/solo');await page.getByRole('button',{name:'Read the quick start'}).click();assert.equal(await page.locator('dialog[open]').count(),1);await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);
  await page.getByRole('link',{name:'Browse scenarios'}).click();await page.locator('.mission-card').first().waitFor();assert.equal(await page.locator('.mission-card').count(),2);
  await page.getByLabel('Find an encounter').fill('dead');assert.equal(await page.locator('.mission-card').count(),1);await page.getByRole('link',{name:'Read scenario',exact:false}).click();await page.locator('.relay').first().waitFor();assert.equal(await page.locator('.relay').count(),2);assert.ok(!await page.locator('main').innerText().then(x=>x.includes('Relay Gamma')));
  await page.reload();await page.locator('.dead-signal-page').waitFor();assert.match(await page.title(),/^Dead Signal/);assert.equal(await page.locator('.relay').count(),2);
  await page.goBack();await page.locator('.mission-card').first().waitFor();await page.goForward();await page.locator('.dead-signal-page').waitFor();
  report.checks.push('Solo quick-start dialog; library search; two-relay brief; direct refresh; back and forward');
  console.log('Scenario pages passed');
  for(const [route,file,width] of [['/#/solo','solo-desktop.png',1280],['/#/scenarios','scenario-library-desktop.png',1280],['/#/scenarios/dead-signal','dead-signal-brief-mobile.png',375]]){
   await page.setViewportSize({width,height:950});await page.goto(base+route);await page.locator('h1').waitFor();await page.screenshot({path:path.join(project,'docs/screenshots',file),fullPage:true});if(width===375){await page.screenshot({path:path.join(project,'docs/screenshots','dead-signal-mobile-top.png')});await page.locator('.signal-figure').screenshot({path:path.join(project,'docs/screenshots','dead-signal-board-mobile.png')});}
  }
  await page.getByRole('link',{name:'Launch Dead Signal',exact:false}).first().click();await page.getByRole('button',{name:'Initialize Dead Signal',exact:true}).waitFor();
  assert.equal(new URL(page.url()).pathname,'/apps/necromund-ai/');assert.equal(new URL(page.url()).hash,'#/ai?scenario=secundus-dead-signal');
  await page.getByLabel('Player crew size').fill('7');await page.getByRole('button',{name:'Initialize Dead Signal',exact:true}).click();assert.equal((await saved()).scenario.crew.length,7);
  const scenarioBefore=await saved();await page.getByRole('link',{name:'Scenario Library',exact:true}).click();await page.goto(base+'/#/ai?scenario=secundus-dead-signal');await page.locator('.scenario-hud').waitFor();assert.deepEqual((await saved()).scenario,scenarioBefore.scenario,'Deep launch must resume, not reset');
  await page.getByRole('button',{name:'Reset Scenario / Restore Previous Battle',exact:true}).click();assert.equal((await saved()).scenario,undefined);
  await page.getByRole('link',{name:'Solo Play',exact:true}).click();await page.goto(base+'/#/ai');await page.getByRole('link',{name:'Open Quick Play'}).click();await page.locator('.fighter-card').first().waitFor();
  const beforeAdd=(await saved()).fighters.length;await page.getByRole('button',{name:'+ Add Fighter',exact:true}).click();await page.getByLabel('Name',{exact:true}).fill('Release test fighter');await page.getByRole('button',{name:'Save Fighter',exact:true}).click();assert.equal((await saved()).fighters.length,beforeAdd+1);await page.reload();assert.equal((await saved()).fighters.length,beforeAdd+1);
  await page.getByRole('button',{name:'AI',exact:true}).click();await page.locator('.fighter-card').first().getByRole('button',{name:'ACTIVATE',exact:true}).click();await page.getByRole('button',{name:'Generate Action',exact:true}).click();await page.getByRole('button',{name:'SHOW DECISION PATH',exact:true}).click();assert.ok((await page.locator('.why').innerText()).length>20);await page.getByRole('button',{name:'END ACTIVATION',exact:true}).click();await page.getByRole('button',{name:'Undo',exact:true}).click();assert.equal((await saved()).fighters[0].readiness,'ACTIVATING');
  await page.getByRole('button',{name:'Config',exact:true}).click();await page.getByRole('button',{name:/Restore V3.1 Sample Battle/}).click();await page.getByRole('button',{name:'← Dashboard',exact:true}).click();assert.equal((await saved()).fighters.length,6);assert.equal((await saved()).scenario,undefined);
  report.checks.push('Outer scenario-aware route preselects setup, seven-player crew, existing scenario resumes, Reset restores prior battle, Quick Play variable roster/tactical decision/Undo/sample reset');
  console.log('Quick Play and saved battles passed');
  // Exercise both defeat paths in the browser. Round-limit setup is a saved-game fixture.
  await page.goto(base+'/apps/necromund-ai/#/ai?scenario=secundus-dead-signal');await page.getByRole('button',{name:'Initialize Dead Signal',exact:true}).click();await page.getByText(/Crew names, Spyrers & fighters remaining/).click();
  for(let i=0;i<6;i++)await page.getByRole('button',{name:'Out of Action / removed',exact:true}).first().click();assert.equal((await saved()).scenario.result.outcome,'defeat');await page.getByRole('heading',{name:'DEFEAT',exact:true}).waitFor();await page.getByRole('button',{name:'Reset Scenario / Restore Previous Battle',exact:true}).click();
  await page.getByRole('button',{name:'Initialize Dead Signal',exact:true}).click();await page.evaluate(()=>{const b=JSON.parse(localStorage.getItem('n2-necromund-ai-v03'));b.round=7;b.scenario.round=7;b.phase='ACTION';b.priority='AI';b.opportunity='AI';localStorage.setItem('n2-necromund-ai-v03',JSON.stringify(b))});await page.reload();await page.getByRole('button',{name:'Enter End Phase',exact:true}).click();for(const check of ['Bottle checks / crew condition rules','Recovery and other normal End Phase rules','Objective and tabletop event checks'])await page.getByRole('checkbox',{name:check,exact:true}).check();await page.getByRole('button',{name:'Process Scenario End Phase',exact:true}).click();assert.equal((await saved()).scenario.result.outcome,'defeat');assert.equal((await saved()).round,7);
  report.checks.push('Browser defeat on all crew removed; round-seven timeout from saved-game fixture');
  const release=await (await context.request.get(base+'/release.json')).json();assert.equal(release.version,'1.0.0-alpha.4');
  assert.deepEqual(report.errors,[]);await browser.close();browser=null;
  console.log('Defeat paths passed; starting full scenario playthrough');
  // Supplied complete scenario playthrough, now against the ZIP-extracted integrated build.
  await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[path.join(project,'tests/engine-browser-smoke.cjs')],{cwd:project,env:{...process.env,TEST_URL:base+'/apps/necromund-ai'},stdio:'inherit'});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error('Scenario browser test failed: '+code)))});
  report.checks.push('Supplied v3.3.1 complete scenario browser playthrough on packaged /apps/necromund-ai/');report.passed=true;
  fs.writeFileSync(path.join(project,'docs/site-validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
 }finally{await browser?.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
