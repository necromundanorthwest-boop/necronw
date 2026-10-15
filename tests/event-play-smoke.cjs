const {chromium}=require(require.resolve('playwright',{paths:[process.cwd(),process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES].filter(Boolean)}));
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..'),base=process.env.TEST_URL||'http://127.0.0.1:4173',key='n2-necromund-ai-v03';
let server;
(async()=>{
 let browser;
 try{
  if(!process.env.TEST_URL){server=spawn(process.execPath,['scripts/serve.mjs'],{cwd:root,env:{...process.env,PORT:'4173'},stdio:['ignore','pipe','pipe']});await new Promise((resolve,reject)=>{server.stdout.on('data',resolve);server.on('error',reject);server.on('exit',code=>reject(Error('Preview server exited '+code)))})}
  browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage','--no-zygote','--single-process']});
  const context=await browser.newContext({viewport:{width:768,height:1024}}),page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
  const saved=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
  const event=base+'/#/ai?scenario=secundus-dead-signal&event=1';
  await page.goto(event);await page.getByRole('button',{name:'Initialize Dead Signal',exact:true}).waitFor();assert.match(page.url(),/event=1/);
  await page.getByRole('button',{name:'Initialize Dead Signal',exact:true}).click();
  const initial=await saved();assert.equal(initial.fighters.length,4);assert.equal(initial.scenario.reserve.length,4);assert.equal(Object.keys(initial.scenario.objectives).length,2);
  await page.getByRole('button',{name:'Opponent',exact:true}).click();
  await page.getByLabel('Ready player fighter').selectOption(initial.scenario.crew[0].id);
  const mid=await saved();await page.getByRole('button',{name:'Hand off this table',exact:true}).click();assert.deepEqual(await saved(),mid);
  assert.match(await page.locator('.event-play').innerText(),/incomplete/i);
  await page.reload();await page.getByRole('button',{name:'Resume Current Expedition',exact:true}).click();assert.deepEqual(await saved(),mid);
  await page.getByRole('button',{name:'No — eligible friendly within 6″',exact:true}).click();await page.getByRole('button',{name:'Record normal tabletop action (1)',exact:true}).click();assert.equal((await saved()).scenario.crew[0].remaining,1);
  await page.getByRole('button',{name:'Finish player activation',exact:true}).click();await page.getByRole('button',{name:'Confirm Opponent Opportunity Complete',exact:true}).click();
  const aiBefore=await saved();await page.getByLabel('Ready Malstrain fighter').selectOption(aiBefore.fighters[0].id);await page.getByRole('button',{name:'Generate Action',exact:true}).click();
  const beforeResolve=await saved();await page.reload();await page.getByRole('button',{name:'Resume Current Expedition',exact:true}).click();assert.deepEqual(await saved(),beforeResolve);
  await page.getByText('Interrupted action / reload recovery',{exact:true}).click();assert.match(await page.locator('.event-play').innerText(),/not saved across reloads/);
  await page.getByRole('button',{name:'Resume AI activation',exact:true}).click();await page.getByRole('button',{name:'Generate Action',exact:true}).click();
  await page.getByRole('button',{name:'RESOLVE / CONTINUE',exact:true}).click();
  const afterAction=await saved();assert.ok(afterAction.fighters[0].actionHistory.length>0);assert.ok(afterAction.fighters[0].normalActionsRemaining<2);
  await page.goto(base+'/#/scenarios/dead-signal');await page.getByRole('link',{name:'Dead Signal / Event Play',exact:true}).first().click();await page.locator('.event-play').waitFor();assert.deepEqual(await saved(),afterAction);
  for(const width of [390,768,1280]){await page.setViewportSize({width,height:1024});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow at '+width)}
  await page.waitForFunction(async()=>!!(await navigator.serviceWorker.getRegistration())?.active);
  await page.reload();await page.locator('.event-play').waitFor();await context.setOffline(true);await page.reload();await page.locator('.event-play').waitFor();assert.deepEqual(await saved(),afterAction);await context.setOffline(false);
  await page.evaluate(k=>localStorage.setItem(k,'{unreadable'),key);await page.reload();await page.getByRole('heading',{name:'Saved expedition needs recovery',exact:true}).waitFor();assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),'{unreadable');
  assert.deepEqual(errors,[]);
  const report={passed:true,widths:[390,768,1280],checks:['Event option forwarded; two-relay setup','Handoff does not mutate saved state','Player activation survives reload and records normal action cost','AI activation survives interrupted advice; explicit recovery guidance; Resolve/Continue records action and cost','Public briefing navigation preserves active save','Cached app reloads offline with same battle','Unreadable raw save retained without automatic overwrite'],physicalTablet:false};
  fs.writeFileSync(path.join(root,'docs/event-play-validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
 }finally{await browser?.close();server?.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
