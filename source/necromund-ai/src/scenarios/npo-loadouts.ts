import type {BehaviourWeaponRole} from '../types';
export const catalogVersion='dead-signal-demo-1';
export interface DemoWeapon {id:string;name:string;cost:number;role:BehaviourWeaponRole;profile:string}
export const demoWeapons:DemoWeapon[]=[
 {id:'autogun',name:'Autogun',cost:15,role:'RANGED',profile:'8″ / 24″ · S3 · AP – · L1 · Rapid Fire (1)'},
 {id:'lasgun',name:'Lasgun',cost:15,role:'RANGED',profile:'16″ / 24″ · S3 · AP – · L1'},
 {id:'stub',name:'Stub gun',cost:5,role:'SIDEARM',profile:'6″ / 12″ · S3 · AP – · L1 · Light'},
 {id:'knife',name:'Fighting knife',cost:10,role:'MELEE',profile:'E · S user · AP – · L1 · Backstab, Melee'},
 {id:'axe',name:'Axe',cost:10,role:'MELEE',profile:'E · S user · AP -1 · L1 · Melee'},
 {id:'maul',name:'Maul',cost:10,role:'MELEE',profile:'E · S+1 · AP – · L1 · Concussive (6+), Melee'},
 {id:'auto-pistol',name:'Autopistol',cost:10,role:'SIDEARM',profile:'4″ / 12″ · S3 · AP – · L1 · Light, Rapid Fire (1)'},
 {id:'las-pistol',name:'Laspistol',cost:10,role:'SIDEARM',profile:'8″ / 12″ · S3 · AP – · L1 · Light'},
 {id:'sawn',name:'Sawn-off shotgun',cost:15,role:'SIDEARM',profile:'Scatter: 4″ / 8″ · S2 · AP – · L1 · Light, Rapid Fire (2). Solid: 4″ / 8″ · S4 · AP – · L1 · Light, Knockback (6+)'}
];
export const loadoutTemplates=[
 {id:'rifle-knife',role:'MARKSMAN',weapons:['autogun','knife']},
 {id:'laser-backup',role:'MARKSMAN',weapons:['lasgun','stub']},
 {id:'scatter-knife',role:'MARKSMAN',weapons:['sawn','knife']},
 {id:'axe-pistol',role:'BRAWLER',weapons:['axe','auto-pistol']},
 {id:'maul-pistol',role:'BRAWLER',weapons:['maul','las-pistol']},
 {id:'knife-pistol',role:'BRAWLER',weapons:['knife','auto-pistol']}
] as const;
export interface NpoLoadout {catalogVersion:string;templateId:string;weapons:DemoWeapon[];total:number}
export function validateLoadout(weapons:DemoWeapon[]){
 if(!weapons.length||weapons.length>3||weapons.some(w=>!demoWeapons.some(x=>x.id===w.id&&x.cost===w.cost)||!Number.isInteger(w.cost)||w.cost<0)||new Set(weapons.map(w=>w.id)).size!==weapons.length)throw Error('Invalid demo loadout');
 const total=weapons.reduce((n,w)=>n+w.cost,0);if(total>25)throw Error('Weapons exceed 25 credits');return total;
}
export function generateLoadout(role:string,random:()=>number):NpoLoadout{
 const options=loadoutTemplates.filter(t=>t.role===role);if(!options.length)throw Error('Unsupported Brood Scum role');
 const value=random();if(!Number.isFinite(value)||value<0||value>=1)throw Error('Random value must be in [0,1)');
 const template=options[Math.floor(value*options.length)],weapons=template.weapons.map(id=>({...demoWeapons.find(w=>w.id===id)!}));
 return {catalogVersion,templateId:template.id,weapons,total:validateLoadout(weapons)};
}
