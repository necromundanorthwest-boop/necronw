import type {BattleState} from '../types';
import {terminal} from './runtime';
export function eventRequested(){return new URLSearchParams(location.hash.split('?')[1]??location.search).get('event')==='1'}
export function nextOperation(b:BattleState):{title:string;detail:string;target:string;incomplete:boolean}{
 const s=b.scenario;
 if(!s)return{title:'Prepare the expedition',detail:'The operator sets up the physical table and named crew once. Initialize only when ready.',target:'event-scenario',incomplete:false};
 if(terminal(s))return{title:'Expedition complete',detail:'Review the result. Reset restores the previous battle; initialize deliberately for a new expedition.',target:'event-scenario',incomplete:false};
 if(b.phase==='PRIORITY')return{title:'Resolve Priority at the table',detail:'Record AI or Opponent below to begin this round.',target:'event-opportunity',incomplete:false};
 if(b.phase==='END')return{title:s.queue.length?'Confirm queued deployments':s.lastEndRound===s.round?'Begin the next Priority Phase':'Complete the End Phase checks',detail:'Open Resume End Phase. Verify checks already performed at the table; do not repeat their physical effects after a reload.',target:'event-end',incomplete:!!s.queue.length};
 const ai=b.fighters.find(f=>f.readiness==='ACTIVATING');
 if(ai)return{title:`Resume ${ai.name}`,detail:`Activation incomplete · ${ai.normalActionsRemaining} normal actions remaining. Reconfirm tactical facts before generating advice.`,target:'event-ai',incomplete:true};
 const p=s.crew.find(p=>p.id===s.activePlayerId);
 if(p)return{title:`Resume ${p.name}`,detail:p.terror==='PENDING'?'Activation incomplete — resolve the displayed support / Nerve prompt.':!p.conditionResolved?'Activation incomplete — resolve the reported condition at the table.':`Activation incomplete · ${p.remaining} normal actions remaining. Record actions, finish, then confirm the Opponent opportunity.`,target:'event-scenario',incomplete:true};
 if(b.opportunity==='OPPONENT')return{title:'Choose a Ready explorer',detail:'Select the named model you are taking over. After its activation, finish and confirm the Opponent opportunity.',target:'event-scenario',incomplete:false};
 return{title:b.fighters.some(f=>f.readiness==='READY')?'Choose a Ready Malstrain fighter':'Pass the exhausted AI opportunity',detail:'Use the existing activation or pass controls. Resolve each recommended action physically, then record it with RESOLVE / CONTINUE.',target:'event-opportunity',incomplete:false};
}
