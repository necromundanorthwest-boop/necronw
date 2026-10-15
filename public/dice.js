const face = (label, symbol, extra = {}) => ({label, symbol, ...extra});
export const DICE = {
 d6:{name:'D6',short:'D6',description:'The everyday six-sided die.',faces:[1,2,3,4,5,6].map(n=>face(String(n),String(n),{value:n})),table:'1, 2, 3, 4, 5, 6 — each 1/6.'},
 d3:{name:'D3',short:'D3',description:'Equal chances of one, two or three.',faces:[1,2,3].map(n=>face(String(n),String(n),{value:n})),table:'1, 2, 3 — each 1/3, equivalent to halving a D6 and rounding up.'},
 d66:{name:'D66',short:'D66',description:'Two D6: first digit tens, second digit units.',table:'36 equally likely pairs, 11–66. No digit can be 0 or greater than 6. This is not a sum or a 66-sided die.'},
 scatter:{name:'Scatter',short:'↗',description:'A direct hit or a fresh direction, every roll.',faces:[...Array.from({length:4},()=>face('Arrow','↑')),...Array.from({length:2},()=>face('Hit','⊕',{hit:true}))],table:'4 Arrow faces, 2 Hit faces. All six faces are equally likely. An independent 0–359° arrow is generated on every result, including Hit.'},
 rapid:{name:'Firepower',short:'•••',description:'Rapid Fire hit symbols and Ammo symbols.',faces:[face('1 hit + Ammo','• !',{hits:1,ammo:true,alert:true}),face('1 hit','•',{hits:1}),face('1 hit','•',{hits:1}),face('2 hits','••',{hits:2}),face('2 hits','••',{hits:2}),face('3 hits','•••',{hits:3})],table:'1 hit + Ammo ×1; 1 hit ×2; 2 hits ×2; 3 hits ×1. Shows hit symbols, not automatic successful attacks.'},
 injury:{name:'Injury',short:'✚',description:'Fighter injury results, plainly labelled.',faces:[face('Flesh Wound','+'),face('Flesh Wound','+'),face('Seriously Injured','≋'),face('Seriously Injured','≋'),face('Seriously Injured','≋'),face('Out of Action','×',{alert:true})],table:'Flesh Wound ×2; Seriously Injured ×3; Out of Action ×1.'},
 damage:{name:'Vehicle Damage',short:'╱',description:'Vehicle damage severity.',faces:[face('Glancing','╱'),face('Glancing','╱'),face('Glancing','╱'),face('Penetrating','↘'),face('Penetrating','↘'),face('Catastrophic','×',{alert:true})],table:'Glancing ×3; Penetrating ×2; Catastrophic ×1.'},
 location:{name:'Vehicle Location',short:'▤',description:'The location struck on a vehicle.',faces:[face('Body','▤'),face('Body','▤'),face('Body','▤'),face('Crew','◎'),face('Drive','⚙'),face('Engine','▥')],table:'Body ×3; Crew ×1; Drive ×1; Engine ×1.'},
 control:{name:'Vehicle Control',short:'↱',description:'Vehicle loss-of-control outcomes.',faces:[face('Swerve 45°','↱'),face('Swerve 45°','↱'),face('Swerve 45°','↱'),face('Jack-knife 90°','↪'),face('Jack-knife 90°','↪'),face('Roll','⟳',{alert:true})],table:'Swerve 45° ×3; Jack-knife 90° ×2; Roll ×1. Resolve direction and movement with the applicable rules.'}
};
// Rejection sampling removes modulo bias; cryptographic randomness only.
export function randomInt(max, cryptoSource = globalThis.crypto) {
 if (!Number.isInteger(max) || max < 1 || max > 4294967296) throw new RangeError('Invalid random range');
 if (!cryptoSource?.getRandomValues) throw new Error('Secure randomness is unavailable. Use a current browser over HTTPS.');
 const buffer = new Uint32Array(1); const limit = Math.floor(4294967296/max)*max;
 do { cryptoSource.getRandomValues(buffer); } while (buffer[0] >= limit);
 return buffer[0] % max;
}
export function rollDie(type, rng = randomInt) {
 const die=DICE[type]; if(!die) throw new Error('Unknown die');
 if(type==='d66'){const tens=rng(6)+1, units=rng(6)+1; return face(`${tens}${units}`,`${tens}${units}`,{tens,units,value:tens*10+units,held:false});}
 const result={...die.faces[rng(die.faces.length)],held:false};
 if(type==='scatter') result.angle=rng(360);
 return result;
}
export function rollPool(type,count,previous=[],keepHeld=false,rng=randomInt){
 if(!Number.isInteger(count)||count<1||count>12) throw new RangeError('Choose 1–12 dice');
 return Array.from({length:count},(_,i)=>keepHeld&&previous[i]?.held?{...previous[i]}:rollDie(type,rng));
}
export function summarize(type,results){
 if(type==='rapid')return `${results.reduce((n,r)=>n+r.hits,0)} hit symbols · ${results.filter(r=>r.ammo).length} Ammo symbols`;
 if(type==='d6'||type==='d3')return `Total ${results.reduce((n,r)=>n+r.value,0)}`;
 if(type==='d66')return results.map(r=>r.label).join(' · ');
 const counts={};for(const r of results) counts[r.label]=(counts[r.label]||0)+1;
 return Object.entries(counts).map(([name,n])=>`${n} × ${name}`).join(' · ');
}
