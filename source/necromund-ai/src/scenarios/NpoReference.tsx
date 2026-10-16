import type {BattleState} from '../types';
import {definitionFor} from './dead-signal';
export function NpoStatCard({battle,id}:{battle:BattleState;id:string}){
 const s=battle.scenario;if(!s)return null;
 const d=definitionFor(s.id,s.version),actor=[...(d?.force??[]),...(d?.reserve??[])].find(a=>a.id===id);if(!actor)return null;
 const loadout=s.npoLoadouts?.[id],fighter=battle.fighters.find(f=>f.id===id)??s.recycledProfiles?.[id];
 return <details className="npo-card"><summary>View stat card — {fighter?.name??actor.name}</summary>
 <p><strong>{actor.kind==='scum'?'Brood Scum':actor.kind==='genestealer'?'Malstrain Genestealer':'Malstrain Tyramite'}</strong> · {actor.behaviour}</p>
 {actor.kind==='scum'?<><p>M 5″ · WS 4+ · BS 4+ · S 3 · T 3 · W 1 · I 3 · A 1 · Sv 6+</p><p>Ld 6 · Cl 6 · Wil 6 · Int 6</p><p>Special rule: “There’s Only So Many I Can Handle” — resolve using your rules.</p></>:actor.kind==='genestealer'?<><p>M 6″ · WS 3+ · BS 6+ · S 4 · T 4 · W 3 · I 5 · A 3 · Sv 5+</p><p>Ld 7 · Cl 9 · Wil 8 · Int 5</p><p>Razor-sharp claws: E · S+1 · AP -1 · L2 · Breaching (5+), Melee, Paired (2)</p><p>Venomous bite: E · AP -2 · L1 · Additional Attacks (1), Melee, Toxin (3+)</p><p>Berserker, Clamber, Dodge, Inspiring, Juggernaut, Nerves of Steel, Rain of Blows. Xenos Abomination.</p></>:<p>Tyramite profile not supplied. Consult the physical card; no substitute profile is used.</p>}
 {loadout?<><p><strong>Weapons: {loadout.total} / 25 credits</strong> · Demo house prices</p>{loadout.weapons.map(w=><p key={w.id}><strong>{w.name} ({w.cost})</strong><br/>{w.profile}</p>)}<small>{loadout.catalogVersion} · {loadout.templateId}. Equipment stays with this actor when recycled.</small>{fighter&&fighter.weapons.map(w=>w.name).join('|')!==loadout.weapons.map(w=>w.name).join('|')&&<p role="status">Operator-edited equipment differs from the generated card. Use the current fighter equipment and verify its cost separately.</p>}</>:actor.kind==='scum'&&<p>Existing expedition: no generated loadout. Current equipment: {fighter?.weapons.map(w=>w.name).join(', ')??actor.weaponName}. Confirm its weapon profile with your physical reference.</p>}
 <p className="muted">Reference: supplied Malstrain roster/cards, 14 October 2026. Range: short / long; E: engaged; L label retained from supplied cards. This is a reference, not a live wounds tracker. Resolve rolls, skills and traits at the table.</p>
 </details>
}
export function NpoReference({battle}:{battle:BattleState}){
 const s=battle.scenario;if(!s)return null;
 const d=definitionFor(s.id,s.version);if(!d)return null;
 return <details className="panel npo-reference"><summary>NPO reference cards — deployed and reserves</summary><p>Opening cards does not spend actions or advance play. Demo Brood Scum weapon budget: 25 credits, excluding fighter cost.</p>{[...d.force,...d.reserve].map(a=><NpoStatCard key={a.id} battle={battle} id={a.id}/>)}</details>
}
