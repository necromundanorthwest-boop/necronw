import {playerProfiles} from './player-profiles';
import {generateLoadout, type NpoLoadout} from './npo-loadouts';
import {createFighter} from '../data/seed';
import type {BattleState, DecisionResult, Fighter, ResolvedBehaviour, TacticalState} from '../types';
import {resolveAction} from '../engine/resolver';
import {nextRound} from '../engine/state';
import {definitionFor} from './dead-signal';
import type {ActorTemplate,Condition,Effect,ScenarioDefinition,ScenarioRuntime} from './types';
const clone=<T,>(v:T):T=>structuredClone(v);
export const terminal=(s:ScenarioRuntime)=>s.stage==='COMPLETE'||s.stage==='FAILED';
function definition(s:ScenarioRuntime){const d=definitionFor(s.id,s.version);if(!d||d.version!==s.version)throw new Error('This scenario version is unavailable; keep your saved battle and restore the matching app version.');return d}
const note=(s:ScenarioRuntime,text:string)=>{s.log=[...s.log.slice(-49),`Round ${s.round}: ${text}`]};
export function initializeScenario(b:BattleState,d:ScenarioDefinition,crewNames:string[],edge:string,mode:'automatic'|'table'='automatic',random=()=>Math.random()):BattleState{
 if(b.scenario)throw new Error('Reset the current scenario before starting another.');
 if(!crewNames.length||crewNames.some(n=>!n.trim())||!edge.trim())throw new Error('Name at least one player fighter and declare the extraction edge.');
 const runId=crypto.randomUUID();const original=clone(b);delete original.scenario;
 const s:ScenarioRuntime={schemaVersion:1,id:d.id,version:d.version,runId,stage:d.states.initial,round:1,mode,extractionEdge:edge.trim(),objectives:Object.fromEntries(d.objectives.map(o=>[o.id,'UNKNOWN'])),hidden:Object.fromEntries(d.hidden.map(h=>[h.id,mode==='automatic'?d.objectives[Math.min(d.objectives.length-1,Math.max(0,Math.floor(random()*d.objectives.length)))].id:null])),counters:Object.fromEntries(d.counters.map(c=>[c.id,c.initial])),maxima:Object.fromEntries(d.counters.map(c=>[c.id,c.initial])),artifact:{id:d.artifact.id,state:d.artifact.initial,carrier:null,finalCarrier:null},crew:crewNames.map((name,i)=>({id:`${runId}-player-${i}`,name:name.trim(),inPlay:true,spyrer:false,readiness:'READY',remaining:2,history:[],terror:'PENDING',conditionResolved:true})),reserve:clone(d.reserve),queue:[],actors:Object.fromEntries(d.force.map(f=>[f.id,f.kind])),controllers:{},unlocks:{},fired:[],lastEndRound:0,log:[],original};
 if(d.id==='secundus-dead-signal'&&d.version==='1.1.0'){s.npoLoadouts=Object.fromEntries([...d.force,...d.reserve].filter(a=>a.kind==='scum').map(a=>[a.id,generateLoadout(a.behaviour,random)]))}
 if(d.id==='secundus-dead-signal'&&crewNames.length===6&&crewNames.every((name,i)=>name===playerProfiles[i].name))s.crew.forEach((p,i)=>p.profileId=playerProfiles[i].name);
 note(s,'Mission initialized. Relay contents concealed.');
 return {...b,round:1,phase:'PRIORITY',priority:undefined,opportunity:undefined,groupActivation:undefined,fighters:d.force.map(a=>actorFighter(a,s.npoLoadouts?.[a.id])),scenario:s};
}

export function applyVanSaarCrew(b:BattleState):BattleState{
 const out=clone(b),s=out.scenario;
 if(!s||terminal(s)||s.crew.length!==playerProfiles.length)throw new Error('A live expedition with six player fighters is required.');
 s.crew=s.crew.map((p,i)=>({...p,name:playerProfiles[i].name,profileId:playerProfiles[i].name,spyrer:false}));
 note(s,'Supplied six-fighter Van Saar roster assigned; player identities and recorded mission progress retained.');
 return out;
}
export function actorFighter(a:ActorTemplate,loadout?:NpoLoadout):Fighter{return {...createFighter(a.id,a.name,'Malstrain'),behaviour:a.behaviour,weapons:loadout?loadout.weapons.map(w=>({id:`${a.id}-${w.id}`,name:w.name,role:w.role,traits:[],outOfAmmo:false})):[{id:`${a.id}-weapon`,name:a.weaponName??'Player-configured equipment',role:a.role,traits:[],outOfAmmo:false}],notes:'Scenario test actor. Configure from your own rules; no profile is supplied.'}}
function conditionsMet(s:ScenarioRuntime,conditions:Condition[],d:ScenarioDefinition,end=false){return conditions.every(c=>{
 switch(c.kind){case 'artifact':return s.artifact.state===c.state;case 'noPlayers':return !s.crew.some(p=>p.inPlay);case 'roundLimit':return end&&s.round>=d.roundLimit;case 'searchedAll':return Object.values(s.objectives).every(v=>v!=='UNKNOWN');case 'playersAtLeast':return s.crew.filter(p=>p.inPlay).length>=c.count;}
})}
function checkOutcome(s:ScenarioRuntime,d:ScenarioDefinition,end=false){if(s.result)return;const won=conditionsMet(s,d.victory,d);const lost=d.defeat.some(c=>conditionsMet(s,[c],d,end));if(!won&&!lost)return;s.stage=won?'COMPLETE':'FAILED';s.queue=[];
 s.result={scenarioId:s.id,scenarioVersion:s.version,outcome:won?'victory':'defeat',roundsPlayed:s.round,relaysSearched:Object.values(s.objectives).filter(x=>x!=='UNKNOWN').length,liveRelay:s.hidden[d.hidden[0].id]??null,maxAlert:s.maxima.alert??0,shardStatus:s.artifact.state,shardExtracted:s.artifact.state==='EXTRACTED',carrier:s.artifact.carrier,finalCarrier:s.artifact.finalCarrier,fightersRemaining:s.crew.filter(p=>p.inPlay).length,achievements:d.achievements.filter(a=>conditionsMet(s,a.conditions,d)).map(a=>a.title),timestamp:new Date().toISOString(),reason:won?'Data Shard extracted.':!s.crew.some(p=>p.inPlay)?'No eligible player fighters remain.':`Round ${d.roundLimit} ended without extraction.`};note(s,s.result.reason);
}
function effects(s:ScenarioRuntime,list:Effect[],actorId?:string){const d=definition(s);for(const e of list){switch(e.kind){
 case 'counter':{const c=d.counters.find(c=>c.id===e.id);if(!c)throw new Error('Unknown counter');s.counters[e.id]=Math.min(c.max,Math.max(0,Math.max((s.counters[e.id]??0)+(e.add??0),e.min??0)));s.maxima[e.id]=Math.max(s.maxima[e.id]??0,s.counters[e.id]);break}
 case 'stage':s.stage=e.stage;break;case 'unlock':s.unlocks[e.id]??=s.round;break;
 case 'assign':if(!actorId)throw new Error('Actor required');s.artifact={id:e.artifact,state:'CARRIED',carrier:actorId,finalCarrier:actorId};break;
 case 'drop':s.artifact={...s.artifact,state:'DROPPED',carrier:null};break;
 case 'extract':s.artifact={...s.artifact,state:'EXTRACTED'};break;
 }} }
export function scenarioAction(b:BattleState,id:string,actorId:string,confirmed:boolean,relayId?:string,roll?:number):BattleState{
 const out=clone(b),s=out.scenario;if(!s||terminal(s))throw new Error('No active scenario');const d=definition(s),a=d.actions.find(a=>a.id===id),p=s.crew.find(p=>p.id===actorId);
 if(!a||!a.stages.includes(s.stage)||!p?.inPlay||s.activePlayerId!==actorId||p.readiness!=='ACTIVATING'||b.phase!=='ACTION'||b.opportunity!=='OPPONENT')throw new Error('Begin this player fighter’s activation during an Opponent opportunity.');
 if(p.terror!=='CLEAR'||!p.conditionResolved)throw new Error('Resolve the reported Nerve / condition outcome with your rules first.');
 if(!confirmed||p.remaining<a.cost||p.history.includes(id))throw new Error('Confirm eligibility and action cost. A scenario Basic action cannot repeat in this activation.');
 if(a.requires==='unsearched'&&(!relayId||s.objectives[relayId]!=='UNKNOWN'))throw new Error('Choose an unresolved relay.');
 if(a.requires==='dropped'&&s.artifact.state!=='DROPPED')throw new Error('No dropped shard to recover.');
 if(a.requires==='carried'&&(s.artifact.state!=='CARRIED'||s.artifact.carrier!==actorId))throw new Error('Only the carrier can extract.');
 if(a.requires==='otherCarrier'&&(s.artifact.state!=='CARRIED'||s.artifact.carrier===actorId))throw new Error('Select a different fighter to receive the shard.');
 if(a.requires==='unsearched'&&relayId){
  if(s.mode==='table'&&!s.hidden[d.hidden[0].id]){const unknown=Object.values(s.objectives).filter(v=>v==='UNKNOWN').length;if(unknown===1)s.hidden[d.hidden[0].id]=relayId;else {if(!Number.isInteger(roll)||roll!<1||roll!>6)throw new Error('Report a physical D6 result (1–6).');if(roll!<=6/unknown)s.hidden[d.hidden[0].id]=relayId}}
  const live=s.hidden[d.hidden[0].id]===relayId;s.objectives[relayId]=live?'LIVE':'RESOLVED';effects(s,live?d.events.onLive:d.events.onDecoy,actorId);note(s,`${d.objectives.find(o=>o.id===relayId)?.title}: ${live?'SIGNAL LOCATED — shard recovered.':'DEAD SIGNAL — echo resolved.'}`);
 }else{effects(s,a.effects,actorId);note(s,`${p.name}: ${a.title}.`)}
 p.remaining-=a.cost;p.history.push(id);checkOutcome(s,d);return out;
}
export function beginPlayer(b:BattleState,id:string):BattleState{const out=clone(b),s=out.scenario,p=s?.crew.find(p=>p.id===id);if(!s||terminal(s)||!p?.inPlay||p.readiness!=='READY'||s.activePlayerId||out.phase!=='ACTION'||out.opportunity!=='OPPONENT')throw new Error('Choose a Ready player fighter during the Opponent opportunity.');p.readiness='ACTIVATING';p.remaining=2;p.history=[];p.terror=p.spyrer?'CLEAR':'PENDING';s.activePlayerId=id;return out}
export function reportTerror(b:BattleState,isolated:boolean,result?:'pass'|'fail'):BattleState{const out=clone(b),s=out.scenario,p=s?.crew.find(p=>p.id===s.activePlayerId);if(!s||terminal(s)||!p||p.terror!=='PENDING')throw new Error('No pending Terror check.');if(isolated&&!result)throw new Error('Report the Nerve test result.');p.terror=isolated&&result==='fail'?'FAILED':'CLEAR';p.conditionResolved=p.terror!=='FAILED';note(s,`${p.name}: ${p.terror==='FAILED'?'Nerve test failed; resolve Broken with your rules.':isolated?'Nerve test passed.':'Eligible friendly support confirmed.'}`);return out}
export function resolvePlayerCondition(b:BattleState):BattleState{const out=clone(b),s=out.scenario,p=s?.crew.find(p=>p.id===s.activePlayerId);if(p&&s&&!terminal(s)){p.terror='CLEAR';p.conditionResolved=true;note(s,`${p.name}: player confirms condition resolution permits scenario actions.`)}return out}
export function finishPlayer(b:BattleState):BattleState{const out=clone(b),s=out.scenario,p=s?.crew.find(p=>p.id===s.activePlayerId);if(p){p.readiness='ACTIVATED';p.remaining=0}if(s)s.activePlayerId=undefined;return out}
export function updatePlayer(b:BattleState,id:string,patch:Partial<Pick<ScenarioRuntime['crew'][number],'name'|'inPlay'|'spyrer'>>):BattleState{const out=clone(b),s=out.scenario,p=s?.crew.find(p=>p.id===id);if(!s||terminal(s)||!p)throw new Error('Player fighter unavailable');Object.assign(p,patch);if(!p.inPlay){if(s.activePlayerId===id)s.activePlayerId=undefined;if(s.artifact.carrier===id){effects(s,[{kind:'drop',artifact:s.artifact.id}]);note(s,'Carrier removed: place dropped shard at the last legal location.')}}checkOutcome(s,definition(s));return out}
export function dropArtifact(b:BattleState):BattleState{const out=clone(b),s=out.scenario;if(!s||terminal(s)||s.artifact.state!=='CARRIED')throw new Error('No carried shard');effects(s,[{kind:'drop',artifact:s.artifact.id}]);note(s,'Shard dropped. Place marker at the carrier’s last legal location.');return out}
export function changeCounter(b:BattleState,id:string,add:number):BattleState{const out=clone(b),s=out.scenario;if(!s||terminal(s))throw new Error('No active scenario');effects(s,[{kind:'counter',id,add}]);note(s,`${id} adjusted by player-confirmed event (${add>0?'+':''}${add}).`);return out}
export function processScenarioEnd(b:BattleState):BattleState{
 const out=clone(b),s=out.scenario;if(!s||terminal(s)||s.lastEndRound===s.round)return out;if(out.phase!=='END')throw new Error('Enter End Phase first');if(s.activePlayerId||out.fighters.some(f=>f.readiness==='ACTIVATING'))throw new Error('Finish active fighter activations first.');const d=definition(s);s.lastEndRound=s.round;checkOutcome(s,d,true);if(terminal(s))return out;
 const r=d.reinforcement;if(s.round<r.startRound)return out;const value=s.counters[r.counter],band=r.bands.find(b=>b.at===value),burstKey=`burst:${r.counter}:${value}`;let slots=band?.count??0;
 if(band?.firstOnly){if(s.fired.includes(burstKey))slots=1;else s.fired.push(burstKey)}
 // A guaranteed unlocked actor occupies a wave slot, not an extra wave.
 const guaranteeKey=`guaranteed:${r.guaranteedUnlock}`;
 const guaranteed=!s.fired.includes(guaranteeKey)?s.reserve.find(a=>a.unlock===r.guaranteedUnlock&&s.unlocks[a.unlock]!==undefined):undefined;
 const available=(a:ActorTemplate)=>(!a.unlock||s.unlocks[a.unlock]!==undefined)&&(!band?.kinds||band.kinds.includes(a.kind));
 const chosen:ActorTemplate[]=[];if(guaranteed){chosen.push(guaranteed);s.fired.push(guaranteeKey)}
 for(const a of s.reserve)if(chosen.length<slots&&available(a)&&!chosen.some(c=>c.id===a.id))chosen.push(a);
 s.reserve=s.reserve.filter(a=>!chosen.some(c=>c.id===a.id));s.queue.push(...chosen);s.fired.push(`end:${s.round}`);note(s,chosen.length?`Reinforcements queued: ${chosen.map(a=>a.name).join(', ')}.`:'No eligible reinforcements remain.');return out;
}
export function deployQueued(b:BattleState,id:string,confirmed:boolean,controller?:string):BattleState{const out=clone(b),s=out.scenario,a=s?.queue.find(a=>a.id===id);if(!s||terminal(s)||!a||!confirmed)throw new Error('Confirm legal deployment.');if(a.requiresController&&(!controller||s.actors[controller]!==a.requiresController||!out.fighters.some(f=>f.id===controller)))throw new Error('Assign a deployed Brood Scum controller using your rules.');if(controller)s.controllers[id]=controller;s.queue=s.queue.filter(a=>a.id!==id);s.actors[a.id]=a.kind;const profile=s.recycledProfiles?.[id]??actorFighter(a,s.npoLoadouts?.[id]);out.fighters.push({...clone(profile),status:'ACTIVE',conditions:[],readiness:'ACTIVATED',normalActionsRemaining:0,actionHistory:[],freeOpportunity:undefined,weapons:profile.weapons.map(w=>({...w,outOfAmmo:false}))});note(s,`${a.name} deployed${controller?`; assigned to ${controller}`:''}.`);return out}
export function canRecycleActor(b:BattleState,id:string){const s=b.scenario;if(!s||terminal(s))return false;const d=definitionFor(s.id,s.version);return !!d?.reinforcement.recycleKinds?.includes(s.actors[id])}
export function recordMalstrainOutOfAction(b:BattleState,id:string):BattleState{
 const out=clone(b),s=out.scenario,f=out.fighters.find(f=>f.id===id);
 if(!s||terminal(s)||!f)throw new Error('Select a deployed scenario fighter.');
 const d=definition(s),template=[...d.force,...d.reserve].find(a=>a.id===id);
 if(!template||!d.reinforcement.recycleKinds?.includes(template.kind))throw new Error('This scenario does not recycle this fighter type.');
 if(s.reserve.some(a=>a.id===id)||s.queue.some(a=>a.id===id))throw new Error('This actor is already waiting to return.');
 s.recycledProfiles??={};s.recycledProfiles[id]=clone(f);s.casualties??={};s.casualties[id]=(s.casualties[id]??0)+1;
 s.reserve.push({...clone(template),name:f.name,behaviour:f.behaviour});
 const group=out.groupActivation;
 if(group?.participantIds.includes(id)){
  const removed=group.participantIds.indexOf(id),ids=group.participantIds.filter(x=>x!==id);
  if(removed===group.currentIndex){
   const next=ids[removed];
   if(next){out.groupActivation={...group,participantIds:ids,currentIndex:removed};out.opportunity='AI';out.fighters=out.fighters.map(x=>x.id===next?{...x,readiness:'ACTIVATING',normalActionsRemaining:2,actionHistory:[],freeOpportunity:undefined}:x)}
   else{out.groupActivation=undefined;out.opportunity='OPPONENT'}
  }else out.groupActivation={...group,participantIds:ids,currentIndex:group.currentIndex-(removed<group.currentIndex?1:0)};
 }else if(f.readiness==='ACTIVATING')out.opportunity='OPPONENT';
 out.fighters=out.fighters.filter(x=>x.id!==id);
 note(s,`${f.name}: Out of Action; returned to reserve for a later wave.`);
 if(Object.values(s.controllers).includes(id))note(s,'A Tyramite controller was removed. Resolve its applicable controller/leash rules at the table.');
 return out;
}
export function advanceScenarioRound(b:BattleState):BattleState{const s=b.scenario;if(!s)return nextRound(b);if(terminal(s))return b;if(b.phase!=='END'||s.lastEndRound!==s.round||s.queue.length)throw new Error('Process the End Phase and deploy queued reinforcements before advancing.');const out=nextRound(b);out.scenario=clone(s);out.scenario.round=out.round;out.scenario.activePlayerId=undefined;out.scenario.crew=out.scenario.crew.map(p=>({...p,readiness:'READY',remaining:2,history:[],terror:'PENDING'}));return out}
export function resetScenario(b:BattleState):BattleState{return b.scenario?clone(b.scenario.original):b}
export function publicScenario(s:ScenarioRuntime){const {hidden,original,...publicState}=s;return {...publicState,liveRelay:s.result?.liveRelay??Object.entries(s.objectives).find(([,v])=>v==='LIVE')?.[0]??null}}
export function scenarioDirective(b:BattleState,f:Fighter){const s=b.scenario;if(!s||terminal(s))return;return definition(s).states.directives[s.stage]?.[s.actors[f.id]]}
export function resolveWithScenario(f:Fighter,t:TacticalState,b:BattleState,manual?:ResolvedBehaviour):DecisionResult{
 const directive=scenarioDirective(b,f);if(!directive)return resolveAction(f,t,b,manual);const s=b.scenario!,result=resolveAction(f,t,{...b,mission:directive.coreMission},manual);
 const carrier=s.crew.find(p=>p.id===s.artifact.carrier);const restriction=(f.weapons.find(w=>w.id===t.selectedWeaponId)??f.weapons[0])?.traits.includes('RECKLESS');return {...result,targetCriteria:result.targetCriteria.length?[...(restriction?['Apply the confirmed Reckless targeting restriction first.']:[]),...directive.priority]:[],movementIntent:result.movementIntent?directive.movement:undefined,reason:`Scenario ${s.stage}: ${directive.mission}. ${result.reason}`,decisionPath:[`Scenario State: ${s.stage}`,`Mission Directive: ${directive.mission}`,`Carrier: ${carrier?.name??s.artifact.state}`,`Unresolved relays: ${Object.entries(s.objectives).filter(([,v])=>v==='UNKNOWN').map(([id])=>id).join(', ')||'none'}`,`Target priority: ${directive.priority.join(' → ')}`,...result.decisionPath]};
}
