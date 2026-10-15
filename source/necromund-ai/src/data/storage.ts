import {seedBattle} from './seed';
import {migrateBattle} from './migrate';
import type {BattleState} from '../types';
export const SAVE_KEY='n2-necromund-ai-v03';
const OLD=['n2-necromund-ai-v02','n2-necromund-ai-v01'];
export type LoadedBattle={battle:BattleState;error?:string;raw?:string};
export function readBattle(storage?:Pick<Storage,'getItem'>):LoadedBattle{
 let raw:string|null=null;
 try{
  storage??=localStorage;
  raw=storage.getItem(SAVE_KEY);
  if(raw===null)for(const key of OLD){raw=storage.getItem(key);if(raw!==null)break}
  if(raw===null)return{battle:structuredClone(seedBattle)};
  const parsed=JSON.parse(raw);
  if(!parsed||typeof parsed!=='object'||!Array.isArray(parsed.fighters))throw Error('Saved battle is not a supported object.');
  if(parsed.schemaVersion!==undefined&&![1,2,3].includes(parsed.schemaVersion))throw Error('Saved battle uses an unsupported schema.');
  const b=migrateBattle(parsed);
  if(!Number.isInteger(b.round)||b.round<1||!['PRIORITY','ACTION','END'].includes(b.phase)||!b.fighters.every(f=>f&&typeof f.id==='string'&&Array.isArray(f.weapons)&&Array.isArray(f.conditions)&&Array.isArray(f.actionHistory)))throw Error('Saved battle fields are incomplete.');
  if(b.scenario&&(!b.scenario.original||!Array.isArray(b.scenario.crew)||!Array.isArray(b.scenario.reserve)||!Array.isArray(b.scenario.queue)||!b.scenario.objectives||!b.scenario.artifact||!b.scenario.counters))throw Error('Saved mission fields are incomplete.');
  return{battle:b};
 }catch{return{battle:structuredClone(seedBattle),error:'The saved expedition could not be read. Automatic saving is paused so the existing data stays untouched.',raw:raw??undefined}}
}
