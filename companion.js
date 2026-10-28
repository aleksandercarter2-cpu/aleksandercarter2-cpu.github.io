"use strict";

const creatureData = [
  {id:"dragon", name:"Moss", species:"Forest dragon", icon:"🐉", color:"#77cfae", shade:"#45a589", pale:"#c0efcf"},
  {id:"phoenix", name:"Ember", species:"Sun phoenix", icon:"🔥", color:"#f6ab68", shade:"#df715e", pale:"#ffe3a2"},
  {id:"unicorn", name:"Nova", species:"Moon unicorn", icon:"🦄", color:"#d4c9f6", shade:"#9b88d0", pale:"#f0e8ff"}
];

// Shop upgrades award permanent cosmetics; each slot can wear one item at a time.
const companionGear = [
  {id:"ironCuffs", name:"Iron cuffs", icon:"🔩", slot:"hands", upgrade:"finger"},
  {id:"powerGloves", name:"Power gauntlets", icon:"🧤", slot:"hands", upgrade:"glove"},
  {id:"clockworkSprite", name:"Clockwork sprite", icon:"🤖", slot:"familiar", upgrade:"robot"},
  {id:"minersPick", name:"Miner's pickaxe", icon:"⛏️", slot:"tool", upgrade:"miner"},
  {id:"forgeArmor", name:"Forge armor", icon:"🛡️", slot:"outfit", upgrade:"factory"},
  {id:"goldCrown", name:"Hoard crown", icon:"👑", slot:"head", upgrade:"bank"},
  {id:"cloverPendant", name:"Clover pendant", icon:"🍀", slot:"charm", upgrade:"multiplier"},
  {id:"crystalStaff", name:"Crystal staff", icon:"💎", slot:"tool", upgrade:"crystal"},
  {id:"portalAura", name:"Portal aura", icon:"🌀", slot:"aura", upgrade:"portal"},
  {id:"dragonArmor", name:"Dragon armor", icon:"🐲", slot:"outfit", upgrade:"dragon"},
  {id:"moonRobe", name:"Moon robes", icon:"🌙", slot:"outfit", upgrade:"moon"},
  {id:"starCrown", name:"Starlight crown", icon:"🌟", slot:"head", upgrade:"starforge"},
  {id:"goldClaws", name:"Gilded claws", icon:"✨", slot:"hands", upgrade:"goldenTouch"},
  {id:"quantumAura", name:"Quantum halo", icon:"⚛️", slot:"aura", upgrade:"quantum"},
  {id:"travelScarf", name:"Wanderer's scarf", icon:"🧣", slot:"outfit", cost:75, description:"A little warmth for a big adventure."},
  {id:"forestCloak", name:"Woodland cloak", icon:"🌿", slot:"outfit", cost:250, description:"Stitched from enchanted forest leaves."},
  {id:"wizardHat", name:"Wizard hat", icon:"🧙", slot:"head", cost:750, description:"Every great spell starts with a hat."},
  {id:"royalRobe", name:"Royal regalia", icon:"👑", slot:"outfit", cost:12000, description:"Velvet, gold, and a little grandeur."}
];
let companionTab = "gear";
let companionVisualKey = "";
let companionListKey = "";

function freshCompanion(){return {type:"dragon", owned:[], equipped:{}}}

function normalizeCompanion(saved){
  const clean=freshCompanion();
  if(!saved || typeof saved!=="object")return clean;
  if(creatureData.some(c=>c.id===saved.type))clean.type=saved.type;
  if(Array.isArray(saved.owned))clean.owned=companionGear.filter(g=>saved.owned.includes(g.id)).map(g=>g.id);
  for(const gear of companionGear){
    if(clean.owned.includes(gear.id) && saved.equipped?.[gear.slot]===gear.id)clean.equipped[gear.slot]=gear.id;
  }
  return clean;
}

function unlockCompanionGear(announce=false){
  const unlocked=[];
  for(const gear of companionGear){
    if(gear.upgrade && level(gear.upgrade)>0 && !state.companion.owned.includes(gear.id)){
      state.companion.owned.push(gear.id);
      state.companion.equipped[gear.slot]=gear.id;
      unlocked.push(gear.name);
    }
  }
  if(announce && unlocked.length){
    $("companionStatus").textContent=unlocked.length===1?`${unlocked[0]} unlocked and equipped!`:`${unlocked.length} new pieces added to your companion!`;
  }
}

function chooseCreature(id){
  const creature=creatureData.find(c=>c.id===id);
  if(!creature || state.companion.type===id)return;
  state.companion.type=id;
  $("companionStatus").textContent=`${creature.name} is ready for adventure. Your gear comes along!`;
  renderCompanion();saveQuietly();
}

function equipCompanionGear(id){
  const gear=companionGear.find(g=>g.id===id);
  if(!gear || !state.companion.owned.includes(id))return;
  const equipped=state.companion.equipped[gear.slot]===id;
  if(equipped)delete state.companion.equipped[gear.slot];
  else state.companion.equipped[gear.slot]=id;
  $("companionStatus").textContent=`${gear.name} ${equipped?"removed":"equipped"}.`;
  renderCompanion();saveQuietly();
}

function buyCompanionGear(id){
  const gear=companionGear.find(g=>g.id===id);
  if(!gear || !gear.cost || state.companion.owned.includes(id))return;
  if(state.coins<gear.cost){$("companionStatus").textContent=`You need ${format(gear.cost-state.coins)} more coins.`;return}
  state.coins-=gear.cost;
  state.companion.owned.push(id);
  state.companion.equipped[gear.slot]=id;
  $("companionStatus").textContent=`${gear.name} purchased and equipped!`;
  update();saveQuietly();
}

function companionUpgradeHint(upgradeId){
  const gear=companionGear.find(g=>g.upgrade===upgradeId);
  if(!gear)return "";
  return `<p class="companion-unlock">${gear.icon} ${state.companion.owned.includes(gear.id)?"Wardrobe unlocked:":"Companion unlock:"} ${gear.name}</p>`;
}

function renderCompanion(){
  const companion=state.companion;
  const creature=creatureData.find(c=>c.id===companion.type)||creatureData[0];
  const visualKey=JSON.stringify([companion.type,companion.equipped]);
  const equipped=companionGear.filter(g=>companion.equipped[g.slot]===g.id);
  if(visualKey!==companionVisualKey){
    companionVisualKey=visualKey;
    $("companionArt").innerHTML=drawCompanion(creature,companion.equipped);
    $("companionName").textContent=creature.name;
    $("companionSpecies").textContent=creature.species;
    $("companionEquipment").innerHTML=equipped.length?equipped.map(g=>`<span>${g.icon} ${g.name}</span>`).join(""):'<span>Just a little mythical magic</span>';
    document.querySelectorAll("[data-creature]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.creature===companion.type)));
  }
  $("companionCollection").textContent=`${companion.owned.length} / ${companionGear.length} collected`;
  $("companionProgress").style.width=`${companion.owned.length/companionGear.length*100}%`;
  const listKey=JSON.stringify([companion.owned,companion.equipped,companionTab,companionGear.filter(g=>g.cost).map(g=>state.coins>=g.cost)]);
  // Keep focused wardrobe buttons and the illustration intact during the one-second game tick.
  if(listKey!==companionListKey){
    companionListKey=listKey;
    const focusedId=document.activeElement?.closest("#companionItems button")?.dataset.gear;
    const scrollTop=$("companionItems").scrollTop;
    const items=companionTab==="gear"?companionGear.filter(g=>companion.owned.includes(g.id)):companionGear.filter(g=>g.cost);
    $("companionItems").innerHTML=items.length?items.map(gear=>{
      const owned=companion.owned.includes(gear.id),wearing=companion.equipped[gear.slot]===gear.id;
      return `<div class="companion-item"><span class="companion-item-icon" aria-hidden="true">${gear.icon}</span><div class="companion-item-info"><h3>${gear.name}</h3><p>${companionTab==="shop"?`${gear.description}<br>${owned?"Owned forever":`${format(gear.cost)} coins`}`:gear.slot[0].toUpperCase()+gear.slot.slice(1)}</p></div><button type="button" data-gear="${gear.id}" data-action="${owned?"equip":"buy"}" class="${wearing?"is-equipped":""}" ${owned?`aria-pressed="${wearing}"`:state.coins<gear.cost?"disabled":""} aria-label="${owned?(wearing?"Remove":"Equip"):"Buy"} ${gear.name}${owned?"":` for ${gear.cost} coins`}">${owned?(wearing?"✓ On":"Equip"):"Buy"}</button></div>`;
    }).join(""):'<div class="companion-empty"><strong>A legend in the making</strong>Buy your first Iron Finger upgrade to give your companion a pair of iron cuffs.</div>';
    $("companionItems").scrollTop=scrollTop;
    if(focusedId)$("companionItems").querySelector(`[data-gear="${focusedId}"]`)?.focus({preventScroll:true});
    const next=companionGear.filter(g=>g.upgrade && !companion.owned.includes(g.id)).sort((a,b)=>upgradeData.find(u=>u.id===a.upgrade).base-upgradeData.find(u=>u.id===b.upgrade).base)[0];
    $("companionNext").innerHTML=next?`${next.icon} <strong>Next discovery: ${next.name}</strong><br>Buy ${upgradeData.find(u=>u.id===next.upgrade).name} in the Upgrade Shop.`:'✦ <strong>Every upgrade reward discovered!</strong><br>Mix and match your collection to make your own legend.';
  }
}

function initCompanion(){
  document.querySelectorAll("[data-creature]").forEach(button=>button.addEventListener("click",()=>chooseCreature(button.dataset.creature)));
  const tabs=[...document.querySelectorAll("[data-companion-tab]")];
  tabs.forEach((button,index)=>{
    button.addEventListener("click",()=>{
      companionTab=button.dataset.companionTab;
      tabs.forEach(tab=>{tab.setAttribute("aria-selected",String(tab===button));tab.tabIndex=tab===button?0:-1});
      $("companionItems").setAttribute("aria-labelledby",button.id);
      renderCompanion();
    });
    button.addEventListener("keydown",event=>{
      if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
      event.preventDefault();
      const next=event.key==="Home"?0:event.key==="End"?tabs.length-1:(index+(event.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
      tabs[next].focus();tabs[next].click();
    });
  });
  $("companionItems").addEventListener("click",event=>{
    const button=event.target.closest("button[data-gear]");
    if(!button || button.disabled)return;
    if(button.dataset.action==="buy")buyCompanionGear(button.dataset.gear);
    else equipCompanionGear(button.dataset.gear);
  });
}

// Shared body anchors let every outfit fit all three illustrated creatures.
function drawCompanion(creature,gear){
  const {color,shade,pale,id:type}=creature;
  const wearing=companionGear.filter(g=>gear[g.slot]===g.id).map(g=>g.name).join(", ");
  let aura="",back="",face="",outfit="",head="",hands="",tool="",charm="",familiar="";
  if(gear.aura==="portalAura")aura='<ellipse cx="160" cy="158" rx="105" ry="118" fill="none" stroke="#a191ff" stroke-width="5" opacity=".65" stroke-dasharray="12 8"/><ellipse cx="160" cy="158" rx="112" ry="125" fill="none" stroke="#8971d8" opacity=".35"/>';
  if(gear.aura==="quantumAura")aura='<g fill="none" stroke="#8eeeff" stroke-width="2" opacity=".75"><ellipse cx="160" cy="156" rx="123" ry="45" transform="rotate(-48 160 156)"/><ellipse cx="160" cy="156" rx="123" ry="45" transform="rotate(48 160 156)"/><ellipse cx="160" cy="156" rx="109" ry="126"/></g><g fill="#c7fcff"><circle cx="78" cy="67" r="5"/><circle cx="269" cy="153" r="5"/><circle cx="75" cy="243" r="5"/></g>';
  if(type==="dragon"){
    back=`<path d="M119 157Q81 88 41 116L53 174 74 159 86 190 115 186M201 157Q239 88 279 116L267 174 246 159 234 190 205 186" fill="${shade}"/><path d="M112 165L52 126 73 152 87 175M208 165L268 126 247 152 233 175" fill="none" stroke="${pale}" stroke-width="3" opacity=".55"/><path d="M191 228Q255 250 259 201Q281 252 235 263L185 250" fill="${shade}"/><path d="M258 213L247 203 263 188 272 205Z" fill="${pale}"/>`;
    face=`<path d="M120 70L113 39Q136 44 140 65M180 65Q184 44 207 39L200 70" fill="#f3e0ad"/><path d="M111 90L90 73 100 113 118 120M209 90L230 73 220 113 202 120" fill="${shade}"/>`;
  }else if(type==="phoenix"){
    back=`<path d="M125 164Q80 102 44 93Q47 130 66 146L45 136Q57 167 79 172L65 175Q87 201 120 192M195 164Q240 102 276 93Q273 130 254 146L275 136Q263 167 241 172L255 175Q233 201 200 192" fill="${shade}"/><path d="M112 172L61 114M208 172L259 114" stroke="#ffd99a" stroke-width="5" stroke-linecap="round"/><path d="M139 232Q105 274 143 287L160 266 177 287Q215 274 181 232" fill="${shade}"/><path d="M150 238L160 281 170 238" fill="#ffd17e"/>`;
    face=`<path d="M134 68Q119 38 142 31L152 48Q159 20 178 28L174 48Q196 32 201 51L183 72" fill="${shade}"/><path d="M143 53L141 38M164 49L172 34" stroke="#ffda8d" stroke-width="4" stroke-linecap="round"/>`;
  }else{
    back=`<path d="M193 228Q240 215 252 242Q260 268 225 274Q247 250 216 252L193 251" fill="#c095df"/><path d="M226 235Q251 239 238 263" fill="none" stroke="#f2bedf" stroke-width="7"/><path d="M116 99Q90 160 112 202L134 175 137 99" fill="#c095df"/>`;
    face=`<path d="M119 82Q98 32 125 46L144 75M176 75L195 46Q222 32 201 82" fill="${color}"/><path d="M123 68L117 51 135 73M185 73L203 51 197 68" fill="#ebafd4"/><path d="M146 68L160 16 174 68Z" fill="#f7dfa5"/><path d="M153 41L167 47M149 55L171 61" stroke="#c9a674" stroke-width="3"/>`;
  }
  const robeColors={forestCloak:["#386f60","#97d4a7"],royalRobe:["#8f487d","#ffd88f"],moonRobe:["#464b8b","#d7d4ff"]};
  if(robeColors[gear.outfit]){
    const [fabric,trim]=robeColors[gear.outfit];
    outfit=`<path d="M123 150Q160 135 197 150L211 248Q160 265 109 248Z" fill="${fabric}" stroke="${trim}" stroke-width="3"/><path d="M128 150L160 178 192 150M160 178V254" fill="none" stroke="${trim}" stroke-width="4"/><path d="M139 219L145 211 151 219 145 227Z M177 235L183 227 189 235 183 243Z" fill="${trim}"/>`;
    if(gear.outfit==="moonRobe")outfit+='<path d="M176 186A14 14 0 1 0 190 204A11 11 0 0 1 176 186" fill="#fff0ba"/>';
  }
  if(["forgeArmor","dragonArmor"].includes(gear.outfit)){
    const dragon=gear.outfit==="dragonArmor",metal=dragon?"#8e5b65":"#6d859e",edge=dragon?"#ffc27a":"#c4e1ec";
    outfit=`<path d="M125 155L160 148 195 155 191 226 160 243 129 226Z" fill="${metal}" stroke="${edge}" stroke-width="3"/><path d="M130 164L160 176 190 164M160 176V230M130 210L160 220 190 210" fill="none" stroke="${edge}" stroke-width="3"/><path d="M160 182L174 196 160 211 146 196Z" fill="${dragon?"#ffbd6d":"#a1ede3"}"/>`;
  }
  if(gear.outfit==="travelScarf")outfit='<path d="M122 148Q160 160 198 148L194 167Q160 179 126 165Z" fill="#e79483"/><path d="M181 165L200 163 207 218 187 214Z" fill="#d77871"/><path d="M187 204L205 207" stroke="#ffc2a0" stroke-width="5"/>';
  if(gear.head==="wizardHat")head='<path d="M109 69L147 8Q159 4 177 24L194 65Z" fill="#7461aa" stroke="#c8acef" stroke-width="2"/><ellipse cx="157" cy="67" rx="62" ry="11" fill="#65539b" stroke="#c8acef" stroke-width="2"/><path d="M125 50L188 50 194 62 117 62Z" fill="#c99f64"/><path d="M158 25L162 33 171 34 164 40 166 49 158 44 150 49 152 40 145 34 154 33Z" fill="#ffe3a0"/>';
  if(["goldCrown","starCrown"].includes(gear.head)){
    const star=gear.head==="starCrown";
    head=`<path d="M120 68L113 37 139 50 160 24 181 50 207 37 200 68Z" fill="${star?"#b7a3ef":"#eabc61"}" stroke="${star?"#eee2ff":"#ffe8a2"}" stroke-width="3"/><path d="M123 63H197" stroke="${star?"#eee2ff":"#ffe8a2"}" stroke-width="4"/><path d="M160 41L167 49 160 57 153 49Z" fill="${star?"#f5f1ff":"#8acdaf"}"/>`;
  }
  if(gear.hands){
    const gold=gear.hands==="goldClaws",power=gear.hands==="powerGloves",metal=gold?"#e9bc60":power?"#9f86d5":"#94a6ba";
    hands=`<g fill="${metal}" stroke="${gold?"#fff0b7":"#d7e0f5"}" stroke-width="2"><path d="M102 201L122 205 119 ${power?233:220} 99 215Z"/><path d="M198 205L218 201 221 215 201 ${power?233:220}Z"/></g>`;
    if(power)hands+='<g fill="#b8f4f0"><circle cx="110" cy="213" r="4"/><circle cx="210" cy="213" r="4"/></g>';
    if(gold)hands+='<path d="M100 214L96 227 105 222 109 233 114 221M220 214L224 227 215 222 211 233 206 221" fill="#ffe6a6"/>';
  }
  if(gear.tool==="minersPick")tool='<g transform="rotate(14 236 196)"><path d="M236 155V259" stroke="#976e59" stroke-width="9" stroke-linecap="round"/><path d="M205 165Q235 129 266 165L242 155 231 155Z" fill="#a9c1d5" stroke="#dde8ef" stroke-width="2"/></g>';
  if(gear.tool==="crystalStaff")tool='<path d="M237 156V260" stroke="#b898d8" stroke-width="7" stroke-linecap="round"/><path d="M237 112L254 135 237 163 220 135Z" fill="#a3eff7" stroke="#e2fcff" stroke-width="2"/><path d="M237 112V163L227 135Z" fill="#6cbdd9"/><path d="M223 159Q237 176 251 159" fill="none" stroke="#ead1a3" stroke-width="5"/>';
  if(gear.charm==="cloverPendant")charm='<path d="M133 147Q160 199 187 147" fill="none" stroke="#e6c97f" stroke-width="3"/><g fill="#96e0a7" stroke="#d1ffd8" stroke-width="1"><circle cx="155" cy="177" r="6"/><circle cx="165" cy="177" r="6"/><circle cx="155" cy="186" r="6"/><circle cx="165" cy="186" r="6"/></g><path d="M160 183L164 195" stroke="#96e0a7" stroke-width="3"/>';
  if(gear.familiar==="clockworkSprite")familiar='<g transform="translate(262 92)"><ellipse cy="37" rx="20" ry="5" fill="#80e5de" opacity=".15"/><path d="M0-10V-19" stroke="#dac896" stroke-width="3"/><circle cy="-21" r="4" fill="#a5f1e3"/><rect x="-18" y="-10" width="36" height="29" rx="10" fill="#9babbc" stroke="#dce7e9" stroke-width="2"/><rect x="-12" y="-3" width="24" height="13" rx="5" fill="#32465a"/><g fill="#9ff0dd"><circle cx="-5" cy="3" r="3"/><circle cx="5" cy="3" r="3"/></g><path d="M-24 0L-18 7M24 0L18 7" stroke="#dac896" stroke-width="4" stroke-linecap="round"/></g>';
  return `<svg viewBox="0 0 320 310" role="img" aria-labelledby="creatureArtTitle" xmlns="http://www.w3.org/2000/svg">
    <title id="creatureArtTitle">${creature.name}, ${creature.species}${wearing?`, wearing ${wearing}`:", ready for their first outfit"}</title>
    <g class="creature-spark" fill="#c7bce8"><path d="M59 56L61 63 68 65 61 67 59 74 57 67 50 65 57 63Z"/><path d="M255 219L257 224 262 226 257 228 255 233 253 228 248 226 253 224Z"/><circle cx="252" cy="52" r="2"/><circle cx="39" cy="205" r="2"/></g>
    <ellipse cx="160" cy="281" rx="82" ry="12" fill="#0d1327" opacity=".5"/><ellipse cx="160" cy="277" rx="67" ry="8" fill="none" stroke="#abb4d4" opacity=".17"/>
    <g class="creature-float" stroke-linejoin="round">${aura}${back}
    <ellipse cx="160" cy="203" rx="51" ry="62" fill="${color}"/><ellipse cx="160" cy="212" rx="32" ry="43" fill="${pale}"/>
    <path d="M118 244Q108 255 117 265L144 265 145 247M175 247L176 265 203 265Q212 255 202 244" fill="${shade}"/>
    ${outfit}
    <path d="M118 165Q99 175 99 205Q102 222 114 219L127 183M202 165Q221 175 221 205Q218 222 206 219L193 183" fill="${color}"/>
    ${hands}${face}
    <path d="M111 91Q111 61 160 62Q209 61 209 91L207 119Q204 151 160 154Q116 151 113 119Z" fill="${color}"/>
    ${type==="unicorn"?'<path d="M118 84Q134 55 174 63Q195 63 205 86Q180 76 163 90L153 76Q140 92 118 93Z" fill="#b797de"/>':""}
    <ellipse cx="160" cy="129" rx="31" ry="19" fill="${pale}"/>
    <g fill="#283e4a"><ellipse cx="138" cy="105" rx="6" ry="9"/><ellipse cx="182" cy="105" rx="6" ry="9"/></g><g fill="#fff"><circle cx="140" cy="102" r="2.3"/><circle cx="184" cy="102" r="2.3"/></g>
    <g fill="#edaaa5" opacity=".55"><ellipse cx="126" cy="119" rx="8" ry="4"/><ellipse cx="194" cy="119" rx="8" ry="4"/></g>
    ${type==="phoenix"?'<path d="M149 121Q160 115 171 121L160 137Z" fill="#b56b46"/><path d="M149 121L160 125 171 121" fill="#ffd780"/>':'<path d="M151 135Q160 141 169 135" fill="none" stroke="#46645e" stroke-width="2.5" stroke-linecap="round"/><g fill="#46645e" opacity=".5"><circle cx="150" cy="124" r="2"/><circle cx="170" cy="124" r="2"/></g>'}
    ${charm}${head}${tool}${familiar}</g></svg>`;
}
