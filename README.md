## its a basic clicker game but, added classes and a rebirth tree
# if pc you can add to notebook and paste code, save as a .html file and play
# if mobile find a html code runner and copy and paste it in there



<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Coin Craze</title>
<style>
*{box-sizing:border-box}
:root{--bg:#101827;--panel:#202d45;--card:#172238;--border:#354666;--accent:#ffd447;--text:#fff;--muted:#b7c5df}
body{margin:0;font-family:Arial,sans-serif;background:linear-gradient(135deg,var(--bg),#202c48);color:var(--text);text-align:center;min-height:100vh}
header{padding:24px 12px 10px}
h1{color:var(--accent);margin:0 0 8px;font-size:2.4rem}
.subtitle,.small{color:var(--muted)}
.stats{display:flex;justify-content:center;flex-wrap:wrap;gap:12px;padding:12px}
.stat,.panel{background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:15px}
.stat{min-width:135px}
.stat strong{display:block;color:var(--accent);font-size:1.25rem;margin-top:7px;overflow-wrap:anywhere}
main{display:grid;grid-template-columns:minmax(260px,1fr) minmax(280px,1fr);gap:20px;max-width:1200px;margin:20px auto;padding:0 16px;text-align:left}
.panel{margin-bottom:16px}
.panel h2{margin-top:0;color:var(--accent)}
.center{text-align:center}
#coin{font-size:110px;cursor:pointer;user-select:none;display:inline-block;margin:16px 0;filter:drop-shadow(0 0 18px #ffc92866)}
#coin:active{transform:scale(.88) rotate(-10deg)}
button{background:var(--accent);color:#192238;border:0;border-radius:9px;padding:11px 14px;font-size:14px;font-weight:bold;cursor:pointer;transition:.15s;margin:3px}
button:hover{filter:brightness(1.1);transform:translateY(-1px)}
button:disabled{background:#596477;color:#c6ccda;cursor:not-allowed;transform:none}
input,select{width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:#101827;color:var(--text);margin:4px 0 10px}
label{display:block;text-align:left;font-size:13px;color:var(--muted);margin-top:7px}
.upgrade,.class-card,.tree-node{background:var(--card);border:1px solid var(--border);border-radius:11px;padding:12px;margin:9px 0}
.upgrade{display:flex;gap:12px;align-items:center}
.emoji{font-size:30px}
.info{flex:1;min-width:0}
.info h3,.class-card h3,.tree-node h3{margin:0 0 5px;font-size:16px}
.info p,.class-card p,.tree-node p{font-size:12px;color:var(--muted);margin:5px 0}
.upgrade button{min-width:85px}
.button-row{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin:10px 0}
.button-row button{flex:1 1 125px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:9px}
.class-card{margin:0;text-align:center}
.class-card.selected{border:2px solid #8ef0b0;background:#17352f}
.class-card.locked{opacity:.7}
.class-icon{font-size:35px}
.class-card button,.tree-node button{width:100%;margin-top:7px}
.tree-node.owned{border-color:#8ef0b0;background:#17352f}
.rebirth{background:#3c2861;border-color:#8f63c7}
.rebirth h2{color:#d9b6ff}
#message{min-height:22px;color:#8ef0b0}
#achievements{line-height:1.8}
.locked{color:#8490a8}
.unlocked{color:#8ef0b0}
.progress-track{height:9px;background:#111a2b;border-radius:8px;overflow:hidden;margin:10px 0}
.progress-fill{height:100%;background:linear-gradient(90deg,#ffd447,#d9b6ff)}
.hidden{display:none!important}
#jaximumPanel{border:3px solid #1685ff;background:#eaf5ff;color:#102b50}
#jaximumPanel h2,#jaximumPanel h3{color:#1269cc}
#jaximumPanel p,#jaximumPanel label{color:#244b78}
#jaximumPanel input,#jaximumPanel select{background:#fff;color:#102b50;border-color:#80bdff}
#jaximumPanel .admin-section{background:#fff;border:1px solid #9bcfff;border-radius:10px;padding:12px;margin:10px 0}
.admin-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
body.jaximum-theme{background:linear-gradient(135deg,#d9edff,#fff,#a9d5ff);color:#102b50;--bg:#d9edff;--panel:#fff;--card:#edf6ff;--border:#5ba7ff;--accent:#1677e8;--text:#102b50;--muted:#31577f}
body.jaximum-theme .subtitle,body.jaximum-theme .small{color:#31577f}
body.jaximum-theme .stat strong,body.jaximum-theme .panel h2{color:#1677e8}
body.jaximum-theme button{background:#1677e8;color:white}
body.jaximum-theme .rebirth{background:#e7f2ff;border-color:#5ba7ff}
body.jaximum-theme .class-card.selected,body.jaximum-theme .tree-node.owned{background:#d6ebff;border-color:#1677e8}
footer{padding:10px 12px 28px;color:var(--muted);font-size:12px}
/* Alchemist's separate potion-lab page */
#alchemyPage{max-width:1150px;margin:22px auto;padding:20px;text-align:left;background:linear-gradient(145deg,#172c2c,#202d45);border:2px solid #69d9b2}
#alchemyPage h2{color:#8ef0c4}
#alchemyPage .alchemy-intro{text-align:center;color:var(--muted)}
#alchemyPage .potion-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:18px}
#alchemyPage .potion-card{background:#102323;border:1px solid #397f70;border-radius:14px;padding:16px;text-align:center;display:flex;flex-direction:column;align-items:stretch;gap:7px}
#alchemyPage .potion-icon{font-size:46px}
#alchemyPage .potion-card h3{margin:0;color:#8ef0c4}
#alchemyPage .potion-card p{color:#c5e5dc;font-size:13px;line-height:1.45;margin:4px 0}
#alchemyPage .potion-card button{margin-top:auto;background:#8ef0c4;color:#12312a}
#alchemyPage .potion-card button:disabled{background:#526c65;color:#d2e2dc}
#alchemyPage .potion-owned{border-color:#8ef0c4;box-shadow:0 0 14px #8ef0c422}
#alchemyPage .potion-owned .owned-label{color:#8ef0c4;font-weight:bold}
#openAlchemyButton{background:linear-gradient(135deg,#1d805e,#39c99a);color:#071f19;font-size:16px;padding:14px 20px}
#alchemyEffects{background:#102323;border:1px solid #397f70;border-radius:10px;padding:12px;line-height:1.8}
@media(max-width:700px){#alchemyPage{margin:12px;padding:12px}#alchemyPage .potion-grid{grid-template-columns:1fr}}

/* Main-class specialization paths */
#specialPathsPanel{width:calc(100% - 32px);max-width:1168px;margin:20px auto;padding:18px}
#specialPathsPanel h2,#specialPathsPanel>.small{text-align:center}
.special-path{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px;margin:14px 0}
.special-path.active{border:2px solid #8ef0b0;box-shadow:0 0 15px #8ef0b022}
.special-path-head{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
.special-path-head h3{margin:0;color:var(--accent)}
.path-nodes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px;position:relative}
.path-node{background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center;min-width:0}
.path-node.owned{border-color:#8ef0b0;background:#17352f}
.path-node h4{margin:5px 0;font-size:14px}
.path-node p{font-size:12px;color:var(--muted);min-height:32px}
.path-node .node-rank{font-size:12px;color:var(--accent);font-weight:bold}
.path-node button{width:100%;margin:5px 0 0}
.path-connector{text-align:center;color:var(--accent);font-size:20px;display:none}
@media(max-width:700px){#specialPathsPanel{width:calc(100% - 20px);padding:12px}.path-nodes{grid-template-columns:1fr}.path-node p{min-height:0}.path-connector{display:block}}
/* Bottom class-selection panel */
#classPanel{width:calc(100% - 32px);max-width:1168px;margin:20px auto;padding:18px}
#classPanel h2,#classPanel>p{text-align:center}
#classScroller{display:flex;align-items:center;gap:8px}
#classScroller .class-nav{flex:0 0 42px;height:58px;font-size:24px;padding:6px;margin:0}
#classes{display:flex;flex:1 1 auto;min-width:0;flex-wrap:nowrap;gap:14px;overflow-x:auto;overflow-y:hidden;padding:14px 6px 20px;scroll-snap-type:x mandatory;scrollbar-width:auto;scrollbar-color:var(--accent) var(--card);scroll-behavior:smooth}
#classScrollHint{text-align:center;font-size:12px;color:var(--muted);margin:0 0 8px}
#classes::-webkit-scrollbar{height:12px}
#classes::-webkit-scrollbar-track{background:var(--card);border-radius:10px}
#classes::-webkit-scrollbar-thumb{background:var(--accent);border-radius:10px}
#classes .class-card{flex:0 0 calc((100% - 70px)/6);min-width:145px;min-height:205px;display:flex;flex-direction:column;justify-content:space-between;margin:0;padding:14px 10px;border-radius:14px;scroll-snap-align:start}
#classes .class-card:hover{transform:translateY(-5px);border-color:var(--accent)}
#classes .class-icon{font-size:38px;margin-bottom:8px}
#classes .class-card h3{font-size:13px;overflow-wrap:anywhere}
#classes .class-card p{font-size:11px;line-height:1.4}
#classes .class-card button{width:100%;margin-top:10px}
#classes .class-card.selected{border:2px solid #8ef0b0;box-shadow:0 0 14px #8ef0b033}
body.jaximum-theme #classes{scrollbar-color:#1677e8 #edf6ff}
@media(min-width:701px) and (max-width:950px){
 #classes .class-card{flex-basis:calc((100% - 42px)/4);min-width:135px}
}
@media(max-width:700px){
 main{grid-template-columns:1fr}
 h1{font-size:2rem}
 #coin{font-size:90px}
 .upgrade{flex-wrap:wrap}
 .upgrade button{flex:1}
 #classPanel{width:calc(100% - 20px);padding:12px}
 #classScroller{gap:4px}
 #classScroller .class-nav{flex-basis:32px;width:32px;font-size:18px}
 #classes .class-card{flex-basis:calc((100% - 14px)/2);min-width:145px;min-height:185px}
}
</style>
</head>
<body>
<header>
<h1>🪙 COIN CRAZE</h1>
<div class="subtitle">Build your coin empire, unlock classes, and master the skill tree!</div>
<div style="max-width:330px;margin:14px auto 0">
<label for="playerName">Player name</label>
<input id="playerName" placeholder="Enter your name" maxlength="24">
</div>
</header>

<div class="stats">
<div class="stat">Coins<strong id="coins">0</strong></div>
<div class="stat">Per Click<strong id="power">1</strong></div>
<div class="stat">Coins / Second<strong id="cps">0</strong></div>
<div class="stat">Prestige Stars<strong id="stars">0</strong></div>
<div class="stat">Prestige Level<strong id="prestige">0</strong></div>
</div>

<main id="mainGame">
<section>
<div class="panel center">
<h2>🪙 Your Coin Mine</h2>
<p>Click the coin to earn money!</p>
<div id="coin" role="button" tabindex="0">🪙</div>
<div><button id="clickButton">CLICK FOR COINS!</button></div>
<p id="message">Your empire starts now!</p>
<p class="small">Golden clicks can earn 5× coins.</p>
</div>
<div class="panel"><h2>🏆 Achievements</h2><div id="achievements"></div></div>
<div class="panel rebirth center">
<h2>✨ Prestige / Rebirth</h2>
<p>Earn one star for every 100,000 lifetime coins. Rebirth resets coins and upgrades but keeps stars, classes, and skills.</p>
<div class="progress-track"><div id="rebirthProgress" class="progress-fill"></div></div>
<p id="rebirthInfo" class="small"></p>
<button id="rebirthButton">✨ REBIRTH</button>
</div>
<div class="panel">
<h2>🌳 Permanent Skill Tree</h2>
<p class="small">Spend stars on bonuses that survive rebirth.</p>
<p>Unspent stars: <strong id="treeStars">0</strong></p>
<div id="skillTree" class="grid"></div>
</div>
</section>

<section>
<div class="panel">
<h2>🛒 Upgrade Shop</h2>
<div class="button-row">
<button id="buyModeButton">Buy: ×1</button>
<button id="buyAllButton">Buy All Affordable</button>
</div>
<div class="button-row">
<button id="burstButton">⚡ Coin Burst</button>
<button id="luckyButton">🍀 Lucky Mode: OFF</button>
</div>
<p id="boostInfo" class="small"></p>
<div id="upgrades"></div>
</div>
</section>
</main>

<div id="alchemyPortal" class="panel center hidden" style="max-width:1200px;margin:20px auto">
<h2>⚗️ Alchemist's Portal</h2>
<p>Your Alchemist class unlocks a special potion laboratory. Brew potions for permanent upgrades!</p>
<button id="openAlchemyButton">⚗️ ENTER POTION LAB</button>
</div>

<section id="alchemyPage" class="panel hidden" aria-label="Alchemist potion laboratory">
<div class="center">
<h2>⚗️ THE ALCHEMY LABORATORY</h2>
<p class="alchemy-intro">Welcome, Alchemist! Spend coins to brew powerful potions. Each recipe can be crafted once, and its bonus is permanent—even after rebirth.</p>
<p>Available coins: <strong id="alchemyCoins">0</strong></p>
</div>
<div id="alchemyEffects"><strong>🧪 Permanent potion effects</strong><div id="alchemyEffectList">No potions brewed yet.</div></div>
<div id="potionGrid" class="potion-grid"></div>
<div class="center" style="margin-top:20px"><button id="leaveAlchemyButton">← RETURN TO COIN CRAZE</button></div>
</section>

<section class="panel" id="classPanel">
<h2>🛡️ Class Selection</h2>
<p class="small">Choose a class. Scroll over this bar to browse more classes.</p>
<p>Equipped: <strong id="equippedClass">None</strong></p>
<div id="classScrollHint">Use the arrows, mouse wheel, Shift + wheel, or the scrollbar to browse every class →</div>
<div id="classScroller">
<button class="class-nav" id="classPrev" aria-label="Scroll classes left">◀</button>
<div id="classes"></div>
<button class="class-nav" id="classNext" aria-label="Scroll classes right">▶</button>
</div>
</section>

<section id="specialPathsPanel" class="panel hidden">
<h2>🌟 Main-Class Special Paths</h2>
<p class="small">Choose a specialization for your main class, then unlock its branching upgrades with Prestige Stars. Only the active path's bonuses apply, but unlocked nodes are kept when you switch paths or rebirth.</p>
<div class="center"><p>Active specialization: <strong id="activeSpecialPath">None</strong> · Unspent stars: <strong id="specialPathStars">0</strong></p></div>
<div id="specialPathsContent"></div>
</section>

<section id="jaximumPanel" class="panel hidden" style="max-width:1200px;margin:20px auto">
<h2>🎮 JAXIMUM CONTROL CENTER</h2>
<p>Secret controls are available while your player name is <b>jaximum</b>.</p>
<div class="admin-section">
<h3>💰 Set Player Stats</h3>
<div class="admin-grid">
<div><label for="adminCoins">Current coins</label><input id="adminCoins" type="number" min="0"></div>
<div><label for="adminLifetime">Lifetime coins</label><input id="adminLifetime" type="number" min="0"></div>
<div><label for="adminClicks">Total clicks</label><input id="adminClicks" type="number" min="0"></div>
<div><label for="adminStars">Unspent stars</label><input id="adminStars" type="number" min="0"></div>
<div><label for="adminTotalStars">Total stars earned</label><input id="adminTotalStars" type="number" min="0"></div>
<div><label for="adminPrestige">Prestige level</label><input id="adminPrestige" type="number" min="0"></div>
</div>
<button id="applyStatsButton">Apply Player Stats</button>
<button id="maxStatsButton">Set Stats to Huge Values</button>
</div>
<div class="admin-section">
<h3>🛠️ Edit Any Upgrade</h3>
<label for="adminUpgrade">Choose upgrade</label><select id="adminUpgrade"></select>
<div class="admin-grid">
<div><label for="adminLevel">Upgrade level</label><input id="adminLevel" type="number" min="0"></div>
<div><label for="adminAmount">Amount per level</label><input id="adminAmount" type="number" min="0"></div>
<div><label for="adminBase">Base price</label><input id="adminBase" type="number" min="0"></div>
</div>
<button id="applyUpgradeButton">Apply Upgrade Settings</button>
<button id="maxUpgradeButton">Max Selected Upgrade</button>
<button id="maxAllUpgradesButton">Max All Upgrades</button>
</div>
<div class="admin-section">
<h3>🌟 Class and Skill Controls</h3>
<div class="admin-grid">
<div><label for="adminClass">Choose class</label><select id="adminClass"></select></div>
<div><label for="adminSkill">Choose skill</label><select id="adminSkill"></select></div>
<div><label for="adminSkillRank">Skill rank</label><input id="adminSkillRank" type="number" min="0"></div>
</div>
<button id="unlockClassesButton">Unlock All Classes</button>
<button id="equipAdminClassButton">Equip Selected Class</button>
<button id="applySkillButton">Set Skill Rank</button>
</div>
<div class="admin-section">
<h3>⚡ Quick Actions</h3>
<button id="adminAddCoins">Add 1 Billion Coins</button>
<button id="adminAddStars">Add 1,000 Stars</button>
<button id="adminSave">Save Now</button>
</div>
<p id="adminStatus"></p>
</section>

<footer>
Coin Craze · Progress saves automatically in this browser.<br>
<button id="saveButton">💾 Save Now</button>
<button id="resetButton" style="background:#e66b76">Reset Game</button>
</footer>

<script>
"use strict";
const $=id=>document.getElementById(id);
const upgradeData=[
{id:"finger",name:"Iron Finger",emoji:"👆",desc:"+1 coin per click",base:15,type:"click",amount:1},
{id:"glove",name:"Power Glove",emoji:"🧤",desc:"+5 coins per click",base:100,type:"click",amount:5},
{id:"robot",name:"Auto Clicker",emoji:"🤖",desc:"+1 coin per second",base:50,type:"auto",amount:1},
{id:"miner",name:"Coin Miner",emoji:"⛏️",desc:"+8 coins per second",base:300,type:"auto",amount:8},
{id:"factory",name:"Coin Factory",emoji:"🏭",desc:"+50 coins per second",base:2000,type:"auto",amount:50},
{id:"bank",name:"Golden Bank",emoji:"🏦",desc:"+250 coins per second",base:12000,type:"auto",amount:250},
{id:"multiplier",name:"Lucky Charm",emoji:"🍀",desc:"+25% income per level",base:1000,type:"mult",amount:.25},
{id:"crystal",name:"Crystal Coin",emoji:"💎",desc:"+100 coins per click",base:5000,type:"click",amount:100},
{id:"portal",name:"Money Portal",emoji:"🌀",desc:"+1,500 coins per second",base:60000,type:"auto",amount:1500},
{id:"dragon",name:"Golden Dragon",emoji:"🐉",desc:"+10,000 coins per second",base:500000,type:"auto",amount:10000},
{id:"moon",name:"Moon Mint",emoji:"🌙",desc:"+75,000 coins per second",base:2500000,type:"auto",amount:75000},
{id:"starforge",name:"Star Forge",emoji:"🌟",desc:"+500,000 coins per second",base:15000000,type:"auto",amount:500000},
{id:"goldenTouch",name:"Golden Touch",emoji:"🪙",desc:"+500 coins per click",base:250000,type:"click",amount:500},
{id:"quantum",name:"Quantum Engine",emoji:"⚛️",desc:"+2,500,000 coins per second",base:100000000,type:"auto",amount:2500000}
];
const classData=[
{id:"warrior",name:"WARRIOR",icon:"⚔️",stars:0,prestige:0,desc:"A balanced fighter.",click:1.5,income:1},
{id:"mage",name:"MAGE",icon:"🧙",stars:5,prestige:0,desc:"Magic boosts all income.",click:1.2,income:1.5},
{id:"merchant",name:"MERCHANT",icon:"💰",stars:10,prestige:0,desc:"A master of coin production.",click:1,income:2},
{id:"ranger",name:"RANGER",icon:"🏹",stars:15,prestige:1,desc:"Swift and powerful clicks.",click:2,income:1.2},
{id:"engineer",name:"ENGINEER",icon:"⚙️",stars:25,prestige:1,desc:"Specializes in automatic income.",click:1.2,income:2.5},
{id:"assassin",name:"ASSASSIN",icon:"🗡️",stars:40,prestige:2,desc:"Strong critical clicks.",click:2.5,income:1.3},
{id:"necromancer",name:"NECROMANCER",icon:"💀",stars:60,prestige:3,desc:"Dark magic boosts production.",click:2,income:2},
{id:"paladin",name:"PALADIN",icon:"🛡️",stars:100,prestige:4,desc:"A powerful all-round class.",click:2.5,income:2.5},
{id:"chronomancer",name:"CHRONOMANCER",icon:"⌛",stars:150,prestige:5,desc:"Bends time to improve income.",click:3,income:3},
{id:"dragonknight",name:"DRAGON KNIGHT",icon:"🐉",stars:250,prestige:6,desc:"Draconic production bonuses.",click:4,income:3},
{id:"alchemist",name:"ALCHEMIST",icon:"⚗️",stars:400,prestige:7,desc:"Transforms clicks into wealth.",click:3.5,income:4},
{id:"celestial",name:"CELESTIAL",icon:"🌌",stars:700,prestige:9,desc:"Cosmic power multiplies everything.",click:5,income:5},
{id:"masterClicks",name:"MASTER OF CLICKS",icon:"👑",stars:1e30,prestige:12,clicks:1e30,desc:"The ultimate clicker class.",click:10,income:10},
{id:"gamer",name:"GAMER",icon:"🎮",stars:0,prestige:0,desc:"Secret class reserved for jaximum.",click:5,income:5,secret:true}
];
const skillData=[
{id:"strongHands",name:"💪 Strong Hands",desc:"+25% click power per rank",cost:1,max:10},
{id:"deepMines",name:"⛏️ Deep Mines",desc:"+25% automatic income per rank",cost:1,max:10},
{id:"goldRush",name:"🌟 Golden Rush",desc:"+5% golden click chance per rank",cost:2,max:5},
{id:"starInterest",name:"✨ Star Interest",desc:"+10% all income per rank",cost:3,max:10},
{id:"cheapShop",name:"🏷️ Discount Deal",desc:"Upgrade prices -5% per rank",cost:2,max:10}
];
const specializationData={
warrior:[
{id:"berserker",name:"🔥 Berserker",icon:"🔥",desc:"Turn every click into a heavier strike.",nodes:[
{name:"Rage I",desc:"+20% click power",cost:2,click:1.2},{name:"Rage II",desc:"+30% click power",cost:4,click:1.3},{name:"Unstoppable",desc:"+50% click power",cost:7,click:1.5}]},
{id:"warlord",name:"🛡️ Warlord",icon:"🛡️",desc:"Build a durable, balanced coin empire.",nodes:[
{name:"Battle Stance",desc:"+15% all income",cost:2,all:1.15},{name:"Iron Banner",desc:"+25% all income",cost:4,all:1.25},{name:"Conqueror",desc:"+40% all income",cost:7,all:1.4}]},
{id:"raider",name:"⚡ Raider",icon:"⚡",desc:"Earn more from rapid clicks and production.",nodes:[
{name:"Quick Strike",desc:"+15% click power",cost:2,click:1.15},{name:"War Spoils",desc:"+25% automatic income",cost:4,income:1.25},{name:"Plunder King",desc:"+35% click and automatic income",cost:7,click:1.35,income:1.35}]}
],
mage:[
{id:"archmage",name:"🔮 Archmage",icon:"🔮",desc:"Master spells that amplify every click.",nodes:[
{name:"Spark",desc:"+20% click power",cost:2,click:1.2},{name:"Arcane Wave",desc:"+35% click power",cost:4,click:1.35},{name:"Arcane Mastery",desc:"+55% click power",cost:7,click:1.55}]},
{id:"summoner",name:"🌀 Summoner",icon:"🌀",desc:"Summon magical machines for passive income.",nodes:[
{name:"Mana Helper",desc:"+20% automatic income",cost:2,income:1.2},{name:"Spirit Factory",desc:"+35% automatic income",cost:4,income:1.35},{name:"Infinite Summon",desc:"+55% automatic income",cost:7,income:1.55}]},
{id:"astral",name:"🌌 Astral Sage",icon:"🌌",desc:"Harness cosmic magic for balanced growth.",nodes:[
{name:"Stardust",desc:"+10% all income",cost:2,all:1.1},{name:"Moon Focus",desc:"+25% all income",cost:4,all:1.25},{name:"Astral Ascension",desc:"+45% all income",cost:7,all:1.45}]}
],
merchant:[
{id:"tycoon",name:"🏦 Tycoon",icon:"🏦",desc:"Increase profits from every source.",nodes:[
{name:"Smart Deals",desc:"+15% all income",cost:2,all:1.15},{name:"Market Leader",desc:"+30% all income",cost:4,all:1.3},{name:"Coin Empire",desc:"+50% all income",cost:7,all:1.5}]},
{id:"industrialist",name:"🏭 Industrialist",icon:"🏭",desc:"Make your automatic coin empire unstoppable.",nodes:[
{name:"Efficient Lines",desc:"+20% automatic income",cost:2,income:1.2},{name:"Mass Production",desc:"+40% automatic income",cost:4,income:1.4},{name:"Global Industry",desc:"+60% automatic income",cost:7,income:1.6}]},
{id:"broker",name:"📈 Broker",icon:"📈",desc:"Grow faster through smart clicks and deals.",nodes:[
{name:"Quick Trade",desc:"+15% click power",cost:2,click:1.15},{name:"Better Margins",desc:"Upgrade prices reduced by 5%",cost:4,discount:0.05},{name:"Market Master",desc:"+35% click power and 10% cheaper upgrades",cost:7,click:1.35,discount:0.10}]}
]
};
// Add three themed specialization paths to every remaining playable class.
// Warrior, Mage, and Merchant keep their hand-crafted paths above.
const extraSpecializationThemes={
ranger:{icon:"🏹",paths:[["Sharpshooter","🎯","Make every click hit harder."],["Beastmaster","🐺","Build a loyal passive-income pack."],["Pathfinder","🧭","Find balanced rewards and discounts."]] ,click:"Aim",income:"Hunt"},
engineer:{icon:"⚙️",paths:[["Inventor","💡","Improve your clicking inventions."],["Factory Chief","🏭","Automate the whole coin empire."],["Overclocker","⚡","Tune every machine for more output."]]},
assassin:{icon:"🗡️",paths:[["Shadowblade","🌑","Strike with powerful clicks."],["Night Stalker","👁️","Earn coins while hidden in the shadows."],["Poisoner","☠️","Make every source of income deadlier."]]},
necromancer:{icon:"💀",paths:[["Soul Reaper","👻","Harvest stronger clicks from lost souls."],["Undead Legion","🧟","Raise passive coin-producing minions."],["Lich Lord","🧿","Master all forms of dark income."]]},
paladin:{icon:"🛡️",paths:[["Holy Avenger","⚔️","Deliver radiant, powerful clicks."],["Guardian","🏰","Build a steady defensive economy."],["Saint","✨","Bless all coin production."]]},
chronomancer:{icon:"⌛",paths:[["Time Striker","⏱️","Compress time into stronger clicks."],["Time Loop","🔁","Repeat production every second."],["Time Lord","🕰️","Accelerate all income."]]},
dragonknight:{icon:"🐉",paths:[["Flame Rider","🔥","Unleash devastating fiery clicks."],["Dragon Hoard","💎","Grow a dragon-sized passive hoard."],["Elder Drake","🐲","Unlock balanced ancient power."]]},
alchemist:{icon:"⚗️",paths:[["Transmuter","🧪","Turn clicks into extra gold."],["Homunculus Maker","🧬","Create helpers for passive income."],["Grand Alchemist","🔮","Perfect every coin transmutation."]]},
celestial:{icon:"🌌",paths:[["Starcaller","🌠","Channel stars into click power."],["Galaxy Weaver","🪐","Build an ever-growing cosmic engine."],["Cosmic Deity","☄️","Amplify every kind of income."]]},
masterClicks:{icon:"👑",paths:[["Click Titan","👊","Make every click monumental."],["Combo King","🎯","Keep income rolling automatically."],["Omni Clicker","♾️","Master all sources of coin power."]]},
gamer:{icon:"🎮",paths:[["Speedrunner","🏁","Click faster and earn more per hit."],["Idle Legend","🤖","Let the game earn while you chill."],["Glitch Master","🌀","Exploit every source of coin income."]]}
};
for(const [classId,theme] of Object.entries(extraSpecializationThemes)){
 if(specializationData[classId])continue;
 const [a,b,c]=theme.paths;
 specializationData[classId]=[
  {id:"path_click",name:a[0],icon:a[1],desc:a[2],nodes:[
   {name:"I · " + a[0],desc:"+20% click power",cost:2,click:1.2},
   {name:"II · " + a[0],desc:"+35% click power",cost:4,click:1.35},
   {name:"Master " + a[0],desc:"+55% click power",cost:7,click:1.55}]},
  {id:"path_auto",name:b[0],icon:b[1],desc:b[2],nodes:[
   {name:"I · " + b[0],desc:"+20% automatic income",cost:2,income:1.2},
   {name:"II · " + b[0],desc:"+40% automatic income",cost:4,income:1.4},
   {name:"Master " + b[0],desc:"+60% automatic income",cost:7,income:1.6}]},
  {id:"path_all",name:c[0],icon:c[1],desc:c[2],nodes:[
   {name:"I · " + c[0],desc:"+10% all income",cost:2,all:1.1},
   {name:"II · " + c[0],desc:"+25% all income",cost:4,all:1.25},
   {name:"Master " + c[0],desc:"+45% all income",cost:7,all:1.45}]}
 ];
}
const mainPathClasses=["warrior","mage","merchant"];
function specializationRank(classId,pathId,nodeIndex){
const key=`${classId}:${pathId}`;
return Math.max(0,Math.floor(Number((state.specialPaths||{})[key]?.[nodeIndex]||0)));
}
function activeSpecialization(){
const c=state.playerClass;
const paths=specializationData[c]||[];
return paths.find(p=>p.id===((state.activeSpecialPaths||{})[c]||""))||null;
}
function specializationBonus(kind){
const path=activeSpecialization();if(!path)return 1;
let result=1;
path.nodes.forEach((node,i)=>{if(specializationRank(state.playerClass,path.id,i)>0&&node[kind])result*=node[kind]});
return result;
}
function specializationDiscount(){
const path=activeSpecialization();if(!path)return 0;
return path.nodes.reduce((sum,node,i)=>sum+(specializationRank(state.playerClass,path.id,i)>0?(node.discount||0):0),0);
}
const achievementData=[
{id:"first",text:"🪙 First Coin — Earn 1 coin",test:s=>s.lifetime>=1},
{id:"hundred",text:"💯 Getting Started — Earn 100 coins",test:s=>s.lifetime>=100},
{id:"thousand",text:"💰 Coin Collector — Earn 1,000 coins",test:s=>s.lifetime>=1000},
{id:"million",text:"👑 Millionaire — Earn 1,000,000 coins",test:s=>s.lifetime>=1e6},
{id:"clicks",text:"👆 Click Machine — Click 100 times",test:s=>s.clicks>=100},
{id:"builder",text:"🏭 Tycoon — Own 10 upgrade levels",test:s=>totalLevels()>=10},
{id:"prestige",text:"✨ Reborn — Prestige for the first time",test:s=>s.prestigeCount>=1}
];
function freshState(){return{coins:0,lifetime:0,clicks:0,stars:0,totalStars:0,prestigeCount:0,levels:{},achievements:[],tree:{},playerClass:"",specialPaths:{},activeSpecialPaths:{},unlockedClasses:[],potions:[],dailyClaimDay:"",luckyMode:false,burstUntil:0,burstReadyAt:0}}
let state=freshState(),buyAmount=1;
let currentPage="main";
const potionData=[
{id:"might",name:"Potion of Might",icon:"💪",desc:"Permanently increases coin-click power by 25%.",cost:50000,effect:"+25% click power",click:1.25},
{id:"prosperity",name:"Potion of Prosperity",icon:"💰",desc:"Permanently increases automatic coin income by 25%.",cost:125000,effect:"+25% automatic income",income:1.25},
{id:"fortune",name:"Potion of Fortune",icon:"🍀",desc:"Permanently increases your chance of a golden click by 5 percentage points.",cost:250000,effect:"+5% golden click chance",crit:.05},
{id:"discount",name:"Potion of Frugality",icon:"🏷️",desc:"Permanently makes every upgrade 10% cheaper.",cost:500000,effect:"10% cheaper upgrades",discount:.10},
{id:"alchemy",name:"Grand Alchemist's Elixir",icon:"🌟",desc:"A rare brew that permanently increases both click power and automatic income by 50%.",cost:2000000,effect:"+50% click power and automatic income",click:1.5,income:1.5}
];
const playerNameInput=$("playerName");
function isJaximum(){return playerNameInput.value.trim().toLowerCase()==="jaximum"}
function hasAdminAccess(){const n=playerNameInput.value.trim().toLowerCase();return n==="jaximum"||n==="dev"}
function safeNumber(v,min=0){const n=Number(v);return Number.isFinite(n)?Math.max(min,n):min}
function format(n){
if(!Number.isFinite(n))return"∞";
if(Math.abs(n)<1000)return Number(n.toFixed(1)).toLocaleString();
const units=["K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc"];let i=-1;
while(Math.abs(n)>=1000&&i<units.length-1){n/=1000;i++}
return n.toFixed(2)+units[i];
}
function level(id){return Number(state.levels[id]||0)}
function skillRank(id){return Number(state.tree[id]||0)}
function totalLevels(){return Object.values(state.levels).reduce((s,n)=>s+(Number(n)||0),0)}
function selectedClass(){return classData.find(c=>c.id===state.playerClass)||null}
function classUnlocked(c){
if(c.secret&&!isJaximum())return false;
return state.unlockedClasses.includes(c.id)||(state.stars>=c.stars&&state.prestigeCount>=c.prestige&&(!c.clicks||state.clicks>=c.clicks));
}
function refreshUnlockedClasses(){
for(const c of classData)if((!c.secret||isJaximum())&&classUnlocked(c)&&!state.unlockedClasses.includes(c.id))state.unlockedClasses.push(c.id);
if(!isJaximum()&&state.playerClass==="gamer")state.playerClass="";
}
function potionOwned(id){return (state.potions||[]).includes(id)}
function potionMultiplier(kind){return potionData.filter(p=>potionOwned(p.id)&&p[kind]).reduce((n,p)=>n*p[kind],1)}
function price(item){return Math.max(1,Math.floor(item.base*Math.pow(1.16,level(item.id))*Math.max(.5,1-skillRank("cheapShop")*.05-specializationDiscount())*(1-(potionOwned("discount")?.10:0))))}
function multiplier(){
const c=selectedClass();
return(1+level("multiplier")*.25)*(1+state.stars*.25)*(1+skillRank("starInterest")*.10)*(Date.now()<state.burstUntil?2:1);
}
function clickPower(){
const c=selectedClass();let base=1;
for(const item of upgradeData)if(item.type==="click")base+=level(item.id)*item.amount;
return base*multiplier()*(1+skillRank("strongHands")*.25)*(c?c.click:1)*potionMultiplier("click")*specializationBonus("all")*specializationBonus("click");
}
function coinsPerSecond(){
let base=0;for(const item of upgradeData)if(item.type==="auto")base+=level(item.id)*item.amount;
const c=selectedClass();
return base*multiplier()*(1+skillRank("deepMines")*.25)*(c?c.income:1)*potionMultiplier("income")*specializationBonus("all")*specializationBonus("income");
}
function earn(n){if(Number.isFinite(n)&&n>=0){state.coins+=n;state.lifetime+=n}}
function showMessage(t){$("message").textContent=t}
function saveQuietly(){try{localStorage.setItem("coinCrazeAdvancedSave",JSON.stringify(state))}catch(e){}}
function saveGame(){saveQuietly();showMessage("Progress saved! 💾")}
function loadGame(){
try{
const saved=localStorage.getItem("coinCrazeAdvancedSave");
if(saved){state={...freshState(),...JSON.parse(saved)};state.levels=state.levels||{};state.tree=state.tree||{};state.specialPaths=state.specialPaths||{};state.activeSpecialPaths=state.activeSpecialPaths||{};state.achievements=state.achievements||[];state.unlockedClasses=state.unlockedClasses||[];state.potions=state.potions||[]}
}catch(e){}
}
function clickCoin(){
const chance=Math.min(.75,.05+skillRank("goldRush")*.05+(state.luckyMode?.10:0)+(potionOwned("fortune")?.05:0));
const critical=Math.random()<chance,amount=clickPower()*(critical?5:1);
earn(amount);state.clicks++;
showMessage(critical?"✨ GOLDEN CLICK! 5× coins!":`+${format(amount)} coins!`);
update();
}
function buyUpgrade(id,amount=buyAmount){
const item=upgradeData.find(u=>u.id===id);if(!item)return;
let bought=0;amount=Math.min(10000,Math.max(1,Math.floor(amount)));
for(let i=0;i<amount;i++){const cost=price(item);if(state.coins<cost)break;state.coins-=cost;state.levels[id]=level(id)+1;bought++}
if(bought)showMessage(`${item.name}: bought ${bought} level(s)!`);
update();saveQuietly();
}
function buyAllAffordable(){
let bought=0;
for(const item of upgradeData){let guard=0;while(state.coins>=price(item)&&guard<1000){state.coins-=price(item);state.levels[item.id]=level(item.id)+1;bought++;guard++}}
showMessage(bought?`Bought ${bought} upgrade levels!`:"Not enough coins for upgrades.");update();saveQuietly();
}
function buySkill(id){
const s=skillData.find(x=>x.id===id);if(!s)return;
const rank=skillRank(id);if(rank>=s.max||state.stars<s.cost)return;
state.stars-=s.cost;state.tree[id]=rank+1;showMessage(`${s.name} upgraded!`);update();saveQuietly();
}
function equipClass(id){
const c=classData.find(x=>x.id===id);if(!c||!classUnlocked(c))return;
state.playerClass=id;if(specializationData[id]&&!state.activeSpecialPaths[id])state.activeSpecialPaths[id]=specializationData[id][0].id;showMessage(`${c.name} equipped!`);if(id!=="alchemist"&&currentPage==="alchemy")showMainPage();update();saveQuietly();
}
function rebirth(){
const gain=Math.max(0,Math.floor(state.lifetime/100000)-state.totalStars);
if(gain<=0){showMessage("Earn more lifetime coins to gain a prestige star!");return}
if(!confirm(`Prestige for ${format(gain)} star(s)? Coins and upgrades reset, but stars, classes and skills remain.`))return;
state.stars+=gain;state.totalStars+=gain;state.prestigeCount++;state.coins=0;state.levels={};state.achievements=[];
showMessage(`Prestige complete! +${format(gain)} stars!`);update();saveQuietly();
}
function activateBurst(){
const now=Date.now();
if(now<state.burstReadyAt){showMessage(`Burst ready in ${Math.ceil((state.burstReadyAt-now)/1000)}s.`);return}
state.burstUntil=now+10000;state.burstReadyAt=now+60000;
showMessage("⚡ Coin Burst: 2× income for 10 seconds!");update();saveQuietly();
}
function checkAchievements(){
for(const a of achievementData)if(a.test(state)&&!state.achievements.includes(a.id)){state.achievements.push(a.id);showMessage("Achievement unlocked: "+a.text)}
}
function renderUpgrades(){
$("upgrades").innerHTML=upgradeData.map(item=>{
const cost=price(item),lv=level(item.id);
return`<div class="upgrade"><div class="emoji">${item.emoji}</div><div class="info"><h3>${item.name} <span class="small">Lv. ${format(lv)}</span></h3><p>${item.desc}</p><p>Cost: ${format(cost)} coins</p></div><button data-buy="${item.id}" ${state.coins<cost?"disabled":""}>BUY</button></div>`;
}).join("");
document.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>buyUpgrade(b.dataset.buy));
}
function renderClasses(){
refreshUnlockedClasses();
const visible=classData.filter(c=>!c.secret||isJaximum());
$("classes").innerHTML=visible.map(c=>{
const owned=classUnlocked(c),selected=state.playerClass===c.id;
const req=c.secret?"Secret Jaximum class":`Requires ${format(c.stars)} stars · Prestige ${c.prestige}`+(c.clicks?` · ${format(c.clicks)} clicks`:"");
return`<div class="class-card ${selected?"selected":""} ${owned?"":"locked"}"><div class="class-icon">${c.icon}</div><h3>${c.name}</h3><p>${c.desc}</p><p>Click ×${format(c.click)} · Income ×${format(c.income)}</p><p>${owned?"Unlocked":req}</p><button data-class="${c.id}" ${owned?"":"disabled"}>${selected?"EQUIPPED":owned?"EQUIP":"LOCKED"}</button></div>`;
}).join("");
document.querySelectorAll("[data-class]").forEach(b=>b.onclick=()=>equipClass(b.dataset.class));
$("equippedClass").textContent=selectedClass()?selectedClass().name:"None";
}
function renderSkills(){
$("treeStars").textContent=format(state.stars);
$("skillTree").innerHTML=skillData.map(s=>{
const rank=skillRank(s.id),max=rank>=s.max,canBuy=!max&&state.stars>=s.cost;
return`<div class="tree-node ${rank?"owned":""}"><h3>${s.name} <span class="small">${rank}/${s.max}</span></h3><p>${s.desc}</p><p>Cost: ${s.cost} star(s)</p><button data-skill="${s.id}" ${canBuy?"":"disabled"}>${max?"MAXED":"UPGRADE"}</button></div>`;
}).join("");
document.querySelectorAll("[data-skill]").forEach(b=>b.onclick=()=>buySkill(b.dataset.skill));
}
function activateSpecialPath(classId,pathId){
if(state.playerClass!==classId)return;
const paths=specializationData[classId]||[];if(!paths.some(p=>p.id===pathId))return;
state.activeSpecialPaths[classId]=pathId;
showMessage(`${paths.find(p=>p.id===pathId).name} is now active!`);
update();saveQuietly();
}
function buySpecialNode(classId,pathId,index){
if(state.playerClass!==classId)return;
const path=(specializationData[classId]||[]).find(p=>p.id===pathId);if(!path)return;
const node=path.nodes[index];if(!node)return;
const rank=specializationRank(classId,pathId,index);
if(rank>0)return;
if(index>0&&specializationRank(classId,pathId,index-1)<1){showMessage("Unlock the previous node in this path first.");return}
if(state.stars<node.cost){showMessage("Not enough Prestige Stars for this path upgrade.");return}
state.stars-=node.cost;
const key=`${classId}:${pathId}`;
if(!state.specialPaths[key])state.specialPaths[key]=[];
state.specialPaths[key][index]=1;
state.activeSpecialPaths[classId]=pathId;
showMessage(`${node.name} unlocked! ${path.name} is active.`);
update();saveQuietly();
}
function renderSpecialPaths(){
const panel=$("specialPathsPanel");
const classId=state.playerClass;
if(!classId||!specializationData[classId]){
panel.classList.add("hidden");
$("specialPathsContent").innerHTML="";
$("activeSpecialPath").textContent="None";
return;
}
panel.classList.remove("hidden");
const paths=specializationData[classId];
const active=activeSpecialization();
$("activeSpecialPath").textContent=active?active.name:"None";
$("specialPathStars").textContent=format(state.stars);
$("specialPathsContent").innerHTML=paths.map(path=>{
const isActive=active&&active.id===path.id;
const nodes=path.nodes.map((node,index)=>{
const rank=specializationRank(classId,path.id,index);
const previousReady=index===0||specializationRank(classId,path.id,index-1)>0;
const canBuy=!rank&&previousReady&&state.stars>=node.cost;
return `<div class="path-node ${rank?"owned":""}"><div class="emoji">${path.icon}</div><h4>${node.name}</h4><p>${node.desc}</p><div class="node-rank">${rank?"✓ UNLOCKED":"LOCKED NODE"}</div><p>Cost: ${node.cost} Prestige Stars</p><button data-special-buy="${classId}|${path.id}|${index}" ${canBuy?"":"disabled"}>${rank?"UNLOCKED":previousReady?"UNLOCK":"PREREQUISITE NEEDED"}</button></div>`;
}).join("");
return `<div class="special-path ${isActive?"active":""}"><div class="special-path-head"><div><h3>${path.icon} ${path.name} ${isActive?"✓ ACTIVE":""}</h3><p class="small">${path.desc}</p></div><button data-special-activate="${classId}|${path.id}" ${isActive?"disabled":""}>${isActive?"ACTIVE PATH":"ACTIVATE PATH"}</button></div><div class="path-nodes">${nodes}</div></div>`;
}).join("");
document.querySelectorAll("[data-special-activate]").forEach(b=>b.onclick=()=>{const [c,p]=b.dataset.specialActivate.split("|");activateSpecialPath(c,p)});
document.querySelectorAll("[data-special-buy]").forEach(b=>b.onclick=()=>{const [c,p,i]=b.dataset.specialBuy.split("|");buySpecialNode(c,p,Number(i))});
}
function renderAchievements(){
$("achievements").innerHTML=achievementData.map(a=>{
const done=state.achievements.includes(a.id);
return`<div class="${done?"unlocked":"locked"}">${done?"✓ ":"🔒 "}${a.text}</div>`;
}).join("");
}
function update(){
refreshUnlockedClasses();checkAchievements();
$("coins").textContent=format(state.coins);
$("power").textContent=format(clickPower());
$("cps").textContent=format(coinsPerSecond());
$("stars").textContent=format(state.stars);
$("prestige").textContent=format(state.prestigeCount);
const available=Math.max(0,Math.floor(state.lifetime/100000)-state.totalStars);
$("rebirthInfo").textContent=`Lifetime coins: ${format(state.lifetime)} · Stars available: ${format(available)}`;
$("rebirthProgress").style.width=`${Math.min(100,(state.lifetime%100000)/1000)}%`;
$("buyModeButton").textContent=`Buy: ×${buyAmount}`;
$("luckyButton").textContent=`🍀 Lucky Mode: ${state.luckyMode?"ON":"OFF"}`;
$("burstButton").disabled=Date.now()<state.burstReadyAt;
$("boostInfo").textContent=Date.now()<state.burstUntil?`Coin Burst active for ${Math.ceil((state.burstUntil-Date.now())/1000)} seconds!`:Date.now()<state.burstReadyAt?`Coin Burst cooldown: ${Math.ceil((state.burstReadyAt-Date.now())/1000)}s`:"Coin Burst gives 10 seconds of 2× income (60-second cooldown).";
renderUpgrades();renderSkills();renderClasses();renderSpecialPaths();renderAchievements();
$("alchemyPortal").classList.toggle("hidden",state.playerClass!=="alchemist"||currentPage==="alchemy");
if(currentPage==="alchemy"&&state.playerClass!=="alchemist")showMainPage();
if(currentPage==="alchemy")renderAlchemy();
$("jaximumPanel").classList.toggle("hidden",!hasAdminAccess());
document.body.classList.toggle("jaximum-theme",isJaximum());
$("jaximumPanel").querySelector("h2").textContent=isJaximum()?"🎮 JAXIMUM CONTROL CENTER":"🛠️ DEV CONTROL CENTER";
$("jaximumPanel").querySelector("p").innerHTML=isJaximum()?"Secret controls are available while your player name is <b>jaximum</b>.":"Developer controls are available while your player name is <b>dev</b>.";
}
function showAlchemyPage(){
if(state.playerClass!=="alchemist"){showMessage("You must equip the Alchemist class to enter the potion lab.");return}
currentPage="alchemy";
$("mainGame").classList.add("hidden");
$("classPanel").classList.add("hidden");
$("alchemyPortal").classList.add("hidden");
$("alchemyPage").classList.remove("hidden");
$("jaximumPanel").classList.add("hidden");
renderAlchemy();
window.scrollTo({top:0,behavior:"smooth"});
}
function showMainPage(){
currentPage="main";
$("mainGame").classList.remove("hidden");
$("classPanel").classList.remove("hidden");
$("alchemyPage").classList.add("hidden");
$("alchemyPortal").classList.toggle("hidden",state.playerClass!=="alchemist");
$("jaximumPanel").classList.toggle("hidden",!hasAdminAccess());
window.scrollTo({top:0,behavior:"smooth"});
}
function brewPotion(id){
if(state.playerClass!=="alchemist"){showMessage("Equip Alchemist to brew potions.");showMainPage();return}
const potion=potionData.find(p=>p.id===id);if(!potion||potionOwned(id))return;
if(state.coins<potion.cost){alert(`You need ${format(potion.cost-state.coins)} more coins to brew this potion.`);return}
state.coins-=potion.cost;
state.potions.push(id);
showMessage(`${potion.name} brewed! Its effect is permanent.`);
renderAlchemy();update();saveQuietly();
}
function renderAlchemy(){
if(!$("potionGrid"))return;
$("alchemyCoins").textContent=format(state.coins);
const owned=potionData.filter(p=>potionOwned(p.id));
$("alchemyEffectList").innerHTML=owned.length?owned.map(p=>`<div class="unlocked">✓ ${p.icon} ${p.name}: ${p.effect}</div>`).join(""):"No potions brewed yet. Craft your first potion below!";
$("potionGrid").innerHTML=potionData.map(p=>{
const has=potionOwned(p.id),canBuy=state.coins>=p.cost;
return `<div class="potion-card ${has?"potion-owned":""}"><div class="potion-icon">${p.icon}</div><h3>${p.name}</h3><p>${p.desc}</p><p><strong>Cost: ${format(p.cost)} coins</strong></p>${has?`<div class="owned-label">✓ BREWED — PERMANENT</div>`:`<button data-potion="${p.id}" ${canBuy?"":"disabled"}>${canBuy?"🧪 BREW POTION":"NOT ENOUGH COINS"}</button>`}</div>`;
}).join("");
document.querySelectorAll("[data-potion]").forEach(b=>b.onclick=()=>brewPotion(b.dataset.potion));
}
function refreshAdminOptions(){
$("adminUpgrade").innerHTML=upgradeData.map(u=>`<option value="${u.id}">${u.emoji} ${u.name}</option>`).join("");
$("adminClass").innerHTML=classData.map(c=>`<option value="${c.id}">${c.icon} ${c.name}</option>`).join("");
$("adminSkill").innerHTML=skillData.map(s=>`<option value="${s.id}">${s.name}</option>`).join("");
}
function syncAdminStatsFields(){
$("adminCoins").value=state.coins;$("adminLifetime").value=state.lifetime;
$("adminClicks").value=state.clicks;$("adminStars").value=state.stars;
$("adminTotalStars").value=state.totalStars;$("adminPrestige").value=state.prestigeCount;
}
function syncAdminUpgradeFields(){
const item=upgradeData.find(u=>u.id===$("adminUpgrade").value)||upgradeData[0];
$("adminLevel").value=level(item.id);$("adminAmount").value=item.amount;$("adminBase").value=item.base;
}
function syncAdminSkillField(){
$("adminSkillRank").value=skillRank($("adminSkill").value||skillData[0].id);
}
function syncAdminFields(){
syncAdminStatsFields();syncAdminUpgradeFields();syncAdminSkillField();
}
function requireJaximum(){return hasAdminAccess()}
function adminStatus(t){$("adminStatus").textContent=t;update();syncAdminFields();saveQuietly()}
function applyAdminStats(){
if(!requireJaximum())return;
state.coins=safeNumber($("adminCoins").value);state.lifetime=safeNumber($("adminLifetime").value);
state.clicks=safeNumber($("adminClicks").value);state.stars=Math.floor(safeNumber($("adminStars").value));
state.totalStars=Math.floor(safeNumber($("adminTotalStars").value));state.prestigeCount=Math.floor(safeNumber($("adminPrestige").value));
adminStatus("Player stats updated!");
}
function applyAdminUpgrade(){
if(!requireJaximum())return;
const item=upgradeData.find(u=>u.id===$("adminUpgrade").value);if(!item)return;
state.levels[item.id]=Math.floor(safeNumber($("adminLevel").value));
item.amount=safeNumber($("adminAmount").value);item.base=safeNumber($("adminBase").value);
adminStatus(`${item.name} settings updated!`);
}
function unlockAllClasses(){
if(!requireJaximum())return;
state.unlockedClasses=classData.filter(c=>!c.secret||isJaximum()).map(c=>c.id);
adminStatus("All visible classes unlocked!");
}
function checkName(){
if(!isJaximum()&&state.playerClass==="gamer")state.playerClass="";
document.body.classList.toggle("jaximum-theme",isJaximum());
$("jaximumPanel").classList.toggle("hidden",!hasAdminAccess());
$("jaximumPanel").querySelector("h2").textContent=isJaximum()?"🎮 JAXIMUM CONTROL CENTER":"🛠️ DEV CONTROL CENTER";
$("jaximumPanel").querySelector("p").innerHTML=isJaximum()?"Secret controls are available while your player name is <b>jaximum</b>.":"Developer controls are available while your player name is <b>dev</b>.";
if(hasAdminAccess())syncAdminFields();
update();saveQuietly();
}
$("openAlchemyButton").onclick=showAlchemyPage;
$("leaveAlchemyButton").onclick=showMainPage;
$("coin").onclick=clickCoin;
$("clickButton").onclick=clickCoin;
$("coin").onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();clickCoin()}};
$("rebirthButton").onclick=rebirth;
$("saveButton").onclick=saveGame;
$("buyModeButton").onclick=()=>{buyAmount=buyAmount===1?10:buyAmount===10?100:1;update()};
$("buyAllButton").onclick=buyAllAffordable;
$("burstButton").onclick=activateBurst;
$("luckyButton").onclick=()=>{state.luckyMode=!state.luckyMode;showMessage(`Lucky Mode ${state.luckyMode?"enabled":"disabled"}.`);update();saveQuietly()};
$("playerName").oninput=checkName;
$("adminUpgrade").onchange=syncAdminUpgradeFields;
$("adminSkill").onchange=syncAdminSkillField;
$("applyStatsButton").onclick=applyAdminStats;
$("applyUpgradeButton").onclick=applyAdminUpgrade;
$("maxStatsButton").onclick=()=>{
if(!requireJaximum())return;
state.coins=1e100;state.lifetime=1e100;state.clicks=1e30;state.stars=1e30;state.totalStars=1e30;state.prestigeCount=12;
adminStatus("Huge player stats applied!");
};
$("maxUpgradeButton").onclick=()=>{
if(!requireJaximum())return;
const item=upgradeData.find(u=>u.id===$("adminUpgrade").value);if(!item)return;
state.levels[item.id]=1000000;adminStatus(`${item.name} set to level 1,000,000!`);
};
$("maxAllUpgradesButton").onclick=()=>{
if(!requireJaximum())return;
for(const item of upgradeData)state.levels[item.id]=1000000;
adminStatus("All upgrade levels set to 1,000,000!");
};
$("unlockClassesButton").onclick=unlockAllClasses;
$("equipAdminClassButton").onclick=()=>{
if(!requireJaximum())return;
const id=$("adminClass").value,c=classData.find(x=>x.id===id);
if(c&&(!c.secret||isJaximum())){
if(!state.unlockedClasses.includes(id))state.unlockedClasses.push(id);
state.playerClass=id;adminStatus(`${c.name} equipped!`);
}
};
$("applySkillButton").onclick=()=>{
if(!requireJaximum())return;
const s=skillData.find(x=>x.id===$("adminSkill").value);if(!s)return;
state.tree[s.id]=Math.min(1e9,Math.floor(safeNumber($("adminSkillRank").value)));
adminStatus(`${s.name} rank changed!`);
};
$("adminAddCoins").onclick=()=>{if(requireJaximum()){earn(1e9);adminStatus("Added 1 billion coins!")}};
$("adminAddStars").onclick=()=>{if(requireJaximum()){state.stars+=1000;state.totalStars+=1000;adminStatus("Added 1,000 stars!")}};
$("adminSave").onclick=saveGame;
$("resetButton").onclick=()=>{
if(!confirm("Delete all game progress, including stars and classes?"))return;
state=freshState();saveQuietly();showMessage("Fresh start!");update();
};
loadGame();
refreshAdminOptions();
syncAdminFields();
const savedName=localStorage.getItem("coinCrazePlayerName")||"";
playerNameInput.value=savedName;
checkName();update();

/* Convert vertical mouse-wheel movement to horizontal class scrolling. */
const classScroller=$("classes");
$("classPrev").onclick=()=>classScroller.scrollBy({left:-Math.max(240,classScroller.clientWidth*.8),behavior:"smooth"});
$("classNext").onclick=()=>classScroller.scrollBy({left:Math.max(240,classScroller.clientWidth*.8),behavior:"smooth"});
classScroller.addEventListener("wheel",event=>{
if(classScroller.scrollWidth<=classScroller.clientWidth)return;
if(Math.abs(event.deltaY)>Math.abs(event.deltaX)){
event.preventDefault();
classScroller.scrollLeft+=event.deltaY;
}
},{passive:false});

setInterval(()=>{const income=coinsPerSecond();if(income>0)earn(income);update()},1000);
setInterval(()=>{
saveQuietly();
try{localStorage.setItem("coinCrazePlayerName",playerNameInput.value)}catch(e){}
},5000);
playerNameInput.addEventListener("input",()=>{
try{localStorage.setItem("coinCrazePlayerName",playerNameInput.value)}catch(e){}
});
</script>
</body>
</html>
