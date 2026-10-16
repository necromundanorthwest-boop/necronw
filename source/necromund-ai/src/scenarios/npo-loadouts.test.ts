import {readBattle} from '../data/storage';
import {describe,it,expect} from 'vitest';
import {demoWeapons,generateLoadout,loadoutTemplates,validateLoadout} from './npo-loadouts';
import {initializeScenario,recordMalstrainOutOfAction,deployQueued} from './runtime';
import {deadSignal} from './dead-signal';
import {seedBattle} from '../data/seed';
describe('demo NPO equipment',()=>{
 it('validates every template within budget',()=>{for(const t of loadoutTemplates)expect(validateLoadout(t.weapons.map(id=>demoWeapons.find(w=>w.id===id)!))).toBeLessThanOrEqual(25)});
 it('rejects unknown, negative, duplicate and over-budget equipment',()=>{for(const ws of [[{...demoWeapons[0],id:'unknown'}],[{...demoWeapons[0],cost:-1}],[demoWeapons[0],demoWeapons[0]],[demoWeapons[0],demoWeapons[1]]])expect(()=>validateLoadout(ws)).toThrow()});
 it('keeps old expeditions without generating equipment',()=>{const b=initializeScenario(structuredClone(seedBattle),deadSignal,['Player'],'Entry','automatic',()=>.2);delete b.scenario!.npoLoadouts;const raw=JSON.stringify(b),loaded=readBattle({getItem:()=>raw});expect(loaded.error).toBeUndefined();expect(loaded.battle).toEqual(b);expect(loaded.battle.scenario!.npoLoadouts).toBeUndefined()});
 it('selects each role pool',()=>{for(const role of ['BRAWLER','MARKSMAN'])for(const r of [0,.34,.99])expect(loadoutTemplates.find(t=>t.id===generateLoadout(role,()=>r).templateId)?.role).toBe(role)});
 it('preserves six generated loadouts through serialization and recycling',()=>{let calls=0;let b=initializeScenario(structuredClone(seedBattle),deadSignal,['Player'],'Entry','automatic',()=>{calls++;return .2});expect(calls).toBe(7);expect(Object.keys(b.scenario!.npoLoadouts!)).toHaveLength(6);const original=structuredClone(b.scenario!.npoLoadouts),weapons=structuredClone(b.fighters[0].weapons),id=b.fighters[0].id;b=JSON.parse(JSON.stringify(b));b=recordMalstrainOutOfAction(b,id);b.scenario!.queue.push(b.scenario!.reserve.find(a=>a.id===id)!);b.scenario!.reserve=b.scenario!.reserve.filter(a=>a.id!==id);b=deployQueued(b,id,true);expect(b.scenario!.npoLoadouts).toEqual(original);expect(b.fighters.find(f=>f.id===id)!.weapons).toEqual(weapons);expect(calls).toBe(7)});
});
