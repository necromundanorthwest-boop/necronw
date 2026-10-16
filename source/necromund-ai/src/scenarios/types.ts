import type {BattleState, Behaviour, Fighter, Mission} from '../types';
export type Stage = string;
export interface PlayerActor {id:string; name:string; inPlay:boolean; spyrer:boolean; readiness:'READY'|'ACTIVATING'|'ACTIVATED'; remaining:number; history:string[]; terror:'PENDING'|'CLEAR'|'FAILED'; conditionResolved:boolean}
export interface ActorTemplate {id:string; name:string; kind:string; behaviour:Behaviour; weaponName?:string; role:Fighter['weapons'][number]['role']; unlock?:string; requiresController?:string}
export interface Directive {mission:string; coreMission:Mission; priority:string[]; movement:string}
export type Condition = {kind:'artifact'; state:string} | {kind:'roundLimit'} | {kind:'noPlayers'} | {kind:'searchedAll'} | {kind:'playersAtLeast'; count:number};
export type Effect = {kind:'counter'; id:string; add?:number; min?:number} | {kind:'stage'; stage:Stage} | {kind:'unlock'; id:string} | {kind:'assign'; artifact:string} | {kind:'drop'; artifact:string} | {kind:'extract'; artifact:string};
export interface ScenarioAction {id:string; title:string; label:string; stages:Stage[]; requires:'unsearched'|'dropped'|'carried'|'otherCarrier'; cost:number; effects:Effect[]; eligibility:string}
export interface ScenarioDefinition {
 id:string; version:string; title:string; protocol:string; family:string; description:string; roundLimit:number; recommendedCrew:number;
 setup:string[]; environment:{id:string; title:string; reminder:string}[];
 objectives:{id:string; title:string}[]; hidden:{id:string; kind:'randomObjective'}[];
 counters:{id:string; title:string; initial:number; max:number; labels:string[]}[];
 artifact:{id:string; title:string; initial:string}; actions:ScenarioAction[];
 events:{onDecoy:Effect[]; onLive:Effect[]}; states:{initial:Stage; directives:Record<string, Record<string, Directive>>};
 force:ActorTemplate[]; reserve:ActorTemplate[];
 reinforcement:{recycleKinds?:string[]; counter:string; startRound:number; bands:{at:number; count:number; firstOnly?:boolean; kinds?:string[]}[]; guaranteedUnlock:string; deployment:string};
 victory:Condition[]; defeat:Condition[]; achievements:{id:string; title:string; conditions:Condition[]}[];
}
export interface ScenarioResult {scenarioId:string; scenarioVersion:string; outcome:'victory'|'defeat'; roundsPlayed:number; relaysSearched:number; liveRelay:string|null; maxAlert:number; shardStatus:string; shardExtracted:boolean; carrier:string|null; finalCarrier:string|null; fightersRemaining:number; achievements:string[]; timestamp:string; reason:string}
export interface ScenarioRuntime {
 schemaVersion:1; id:string; version:string; runId:string; stage:Stage; round:number; mode:'automatic'|'table'; extractionEdge:string;
 objectives:Record<string,'UNKNOWN'|'RESOLVED'|'LIVE'>; hidden:Record<string,string|null>; counters:Record<string,number>; maxima:Record<string,number>;
 artifact:{id:string; state:string; carrier:string|null; finalCarrier:string|null}; crew:PlayerActor[]; activePlayerId?:string;
 reserve:ActorTemplate[]; queue:ActorTemplate[]; actors:Record<string,string>; controllers:Record<string,string>; unlocks:Record<string,number>; fired:string[]; lastEndRound:number;
 npoLoadouts?:Record<string,import('./npo-loadouts').NpoLoadout>; recycledProfiles?:Record<string,Fighter>; casualties?:Record<string,number>; log:string[]; result?:ScenarioResult; original:Omit<BattleState,'scenario'>;
}
