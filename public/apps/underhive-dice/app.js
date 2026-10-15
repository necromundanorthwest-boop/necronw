import {randomInt} from '../../dice.js';
const DICE={
 scatter:{name:"Scatter",icon:"➤",description:"Random direction or direct hit",faces:[
  {label:"Arrow",icon:"➤",help:"Scatter in the direction shown"},{label:"Arrow",icon:"➤",help:"Scatter in the direction shown"},{label:"Arrow",icon:"➤",help:"Scatter in the direction shown"},{label:"Arrow",icon:"➤",help:"Scatter in the direction shown"},{label:"Hit (with arrow)",icon:"⊕",help:"Direct hit; direction shown if required"},{label:"Hit (with arrow)",icon:"⊕",help:"Direct hit; direction shown if required"}]},
 rapid:{name:"Ammo / Rapid Fire",icon:"✹",description:"Hits and ammo checks",faces:[
  {label:"1 Hit + Ammo!",icon:"✹ !",hits:1,ammo:true,alert:true},{label:"1 Hit",icon:"✹",hits:1},{label:"1 Hit",icon:"✹",hits:1},{label:"2 Hits",icon:"✹✹",hits:2},{label:"2 Hits",icon:"✹✹",hits:2},{label:"3 Hits",icon:"✹✹✹",hits:3}]},
 injury:{name:"Injury (Fighter)",icon:"✚",description:"Fighter injury outcome",faces:[
  {label:"Flesh Wound",icon:"✚"},{label:"Flesh Wound",icon:"✚"},{label:"Seriously Injured",icon:"⚯"},{label:"Seriously Injured",icon:"⚯"},{label:"Seriously Injured",icon:"⚯"},{label:"Out of Action",icon:"☠",alert:true}]},
 damage:{name:"Damage (Vehicle)",icon:"◢",description:"Vehicle damage severity",faces:[
  {label:"Glancing",icon:"╱"},{label:"Glancing",icon:"╱"},{label:"Glancing",icon:"╱"},{label:"Penetrating",icon:"➘"},{label:"Penetrating",icon:"➘"},{label:"Catastrophic",icon:"☠",alert:true}]},
 location:{name:"Vehicle Location",icon:"▰",description:"Vehicle hit location",faces:[
  {label:"Body",icon:"▰"},{label:"Body",icon:"▰"},{label:"Body",icon:"▰"},{label:"Crew",icon:"◉"},{label:"Drive",icon:"⚙"},{label:"Engine",icon:"▥"}]},
 control:{name:"Control (Vehicle)",icon:"↱",description:"Vehicle control outcome",faces:[
  {label:"Swerve 45°",icon:"↱"},{label:"Swerve 45°",icon:"↱"},{label:"Swerve 45°",icon:"↱"},{label:"Jack-knife 90°",icon:"↪"},{label:"Jack-knife 90°",icon:"↪"},{label:"Roll",icon:"⟳",alert:true}]}
};
function readStore(kind,key,fallback){try{return window[kind].getItem(key)??fallback}catch{return fallback}}
function writeStore(kind,key,value){try{if(value===null)window[kind].removeItem(key);else window[kind].setItem(key,value)}catch{}}
const remembered=readStore('localStorage','uh-selected','scatter');
let selected=Object.hasOwn(DICE,remembered)?remembered:'scatter';
let quantity=Math.min(6,Math.max(1,Math.round(Number(readStore('localStorage','uh-quantity','1'))||1)));
let results=[],history=[];
try{const value=JSON.parse(readStore('sessionStorage','uh-history','[]'));if(Array.isArray(value))history=value.filter(h=>h&&Object.hasOwn(DICE,h.die)&&Array.isArray(h.results)&&h.results.every(r=>typeof r==='string')&&typeof h.time==='string').slice(0,8)}catch{}
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>document.querySelector(s);
function setup(){
 $("#dice-grid").innerHTML=Object.entries(DICE).map(([key,d])=>`<button class="die-button" data-die="${key}" aria-pressed="${key===selected}"><span class="die-icon" aria-hidden="true">${d.icon}</span><span class="die-name">${d.name}</span></button>`).join("");
 $("#quantity-buttons").innerHTML=[1,2,3,4,5,6].map(n=>`<button data-quantity="${n}" class="${n===quantity?"active":""}" aria-label="Roll ${n} dice">${n}</button>`).join("");
 $("#dice-grid").addEventListener("click",e=>{const b=e.target.closest("[data-die]");if(!b)return;selected=b.dataset.die;writeStore("localStorage","uh-selected",selected);document.querySelectorAll("[data-die]").forEach(x=>x.setAttribute("aria-pressed",x===b));results=[];renderReady();updateControls()});
 $("#quantity-buttons").addEventListener("click",e=>{const b=e.target.closest("[data-quantity]");if(!b)return;quantity=Number(b.dataset.quantity);writeStore("localStorage","uh-quantity",String(quantity));document.querySelectorAll("[data-quantity]").forEach(x=>x.classList.toggle("active",x===b));updateControls()});
 $("#roll-button").onclick=roll;$("#reroll-button").onclick=roll;$("#clear-button").onclick=()=>{results=[];renderReady()};
 $("#history-toggle").onclick=()=>{const p=$("#history-panel"),show=p.hidden;p.hidden=!show;$("#history-toggle").setAttribute("aria-expanded",show);if(show)p.scrollIntoView({behavior:"smooth"})};
 $("#clear-history").onclick=()=>{history=[];writeStore("sessionStorage","uh-history",null);renderHistory()};
 updateControls();renderHistory();if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
}
function updateControls(){const d=DICE[selected];$("#die-description").textContent=d.description;$(".scatter-help").hidden=selected!=="scatter";$("#roll-caption").textContent=`${quantity} ${d.name.toUpperCase()} ${quantity===1?"DIE":"DICE"}`}
function roll(){const d=DICE[selected];results=Array.from({length:quantity},()=>{const face={...d.faces[randomInt(6)]};if(selected==="scatter"){face.angle=randomInt(360);face.displayLabel=`${face.label} · ${face.angle}°`}return face});history.unshift({die:selected,results:results.map(r=>r.displayLabel||r.label),time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})});history=history.slice(0,8);writeStore("sessionStorage","uh-history",JSON.stringify(history));renderResults();renderHistory()}
function renderResults(){
 $("#empty-state").hidden=true;$("#result-actions").hidden=false;
 $("#results-grid").innerHTML=results.map((r,i)=>`<article class="result-card ${r.alert?"alert":""}"><span class="result-number">DIE ${String(i+1).padStart(2,"0")}</span>${r.angle===undefined?`<span class="result-icon" aria-hidden="true">${r.icon}</span>`:`<span class="direction-result" aria-hidden="true"><svg viewBox="0 0 100 100" style="transform:rotate(${r.angle}deg)"><path d="M50 8L28 38H43V89H57V38H72Z" fill="currentColor"/></svg>${r.label.startsWith("Hit")?'<span class="hit-marker">⊕</span>':""}</span>`}<span class="result-label">${r.displayLabel||r.label}</span>${r.help?`<small>${r.help}</small>`:""}</article>`).join("");
 const s=$("#summary");if(selected==="rapid"){const hits=results.reduce((n,r)=>n+(r.hits||0),0),ammo=results.filter(r=>r.ammo).length;s.innerHTML=`TOTAL <b>${hits} HIT${hits===1?"":"S"}</b> · AMMO! <b>${ammo?"YES":"NO"}</b>`;s.hidden=false}else{const counts={};results.forEach(r=>counts[r.label]=(counts[r.label]||0)+1);s.innerHTML=Object.entries(counts).map(([k,v])=>`<b>${v}×</b> ${k}`).join(" · ");s.hidden=quantity===1}
}
function renderReady(){$("#empty-state").hidden=false;$("#summary").hidden=true;$("#results-grid").innerHTML="";$("#result-actions").hidden=true}
function renderHistory(){$("#history-count").textContent=history.length;$("#history-empty").hidden=history.length>0;$("#history-list").innerHTML=history.map(h=>{const d=DICE[h.die];return `<li><span class="history-glyph">${d.icon}</span><span class="history-main"><b>${d.name} · ${h.results.length}D</b><small>${h.results.map(escape).join(" · ")}</small></span><span class="history-time">${escape(h.time)}</span></li>`}).join("")}
setup();
