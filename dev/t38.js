const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
const sh=async(n)=>{await p.waitForTimeout(500);await p.screenshot({path:'/home/claude/aslfull-bv/samples/sample-ui20-'+n+'.png'});};
await p.evaluate(()=>{localStorage.setItem('aslfull_nmMode','judge');SSEL('ASLA');mfModeSet('ai');});await p.waitForTimeout(2500);
await p.evaluate(()=>{ASLFULL_SOLO('setup');});await p.waitForTimeout(2000);await p.evaluate(()=>{mfBtStart(1);});await p.waitForTimeout(1500);
await p.evaluate(()=>{var e=document.querySelector('#aslfullAlog .b');if(e)ASLFULL_SOLO('alogclose');mfBtNext();});await p.waitForTimeout(1500);
await p.evaluate(()=>{if(document.getElementById('aslfullAlog'))ASLFULL_SOLO('alogclose');mfBtRd();});
const r=await p.evaluate(()=>{var A=ASLFULL_SOLO_API,me=A.side(),L=S.solo.stacks;for(const a of L.filter(x=>x.side===me))for(const t of L.filter(x=>x.side!==me)){var e=ASLFULL_SOLO_EVAL(a.id,t.id);if(e&&!e.blocked&&e.fp>0){mfBtSel(a.id);ASLFULL_SOLO('aim');ASLFULL_SOLO_TAP(t.bd,t.col,t.row);return A.hexNm(a)+'->'+A.hexNm(t);}}return 'none';});console.log('aim',r);
await p.waitForTimeout(800);
let got=false;
for(let i=0;i<8&&!got;i++){
  await p.evaluate(()=>{S.sniper=S.sniper||{};S.sniper.san={axis:7,allied:7};S.sniper.queue=[];S.sniper.open=false;MF_BT.fr=1;MF_BT.fw=2;mfBtFireDice();});await p.waitForTimeout(1500);
  got=await p.evaluate(()=>!!(S.sniper.queue||[]).length);
  if(!got){await p.evaluate(()=>{ASLFULL_SOLO('autoundo');mfBtRd();var A=ASLFULL_SOLO_API,me=A.side(),L=S.solo.stacks;for(const a of L.filter(x=>x.side===me))for(const t of L.filter(x=>x.side!==me)){var e=ASLFULL_SOLO_EVAL(a.id,t.id);if(e&&!e.blocked&&e.fp>0&&A.canFire(a)){mfBtSel(a.id);ASLFULL_SOLO('aim');ASLFULL_SOLO_TAP(t.bd,t.col,t.row);return;}}});await p.waitForTimeout(1200);}
}
console.log('sniper',got,await p.evaluate(()=>'res='+!!document.querySelector('#mfBtRes .fxCard')+' snpVis='+(function(e){return e?getComputedStyle(e).display:'none';})(document.getElementById('sniperModal'))+' modal='+!!document.querySelector('.modal-popup')));
await sh('s1');
await p.evaluate(()=>{ASLFULL_SOLO('popclose');mfBtRd();});await p.waitForTimeout(800);
console.log('after',await p.evaluate(()=>'snpVis='+(function(e){return e?getComputedStyle(e).display:'none';})(document.getElementById('sniperModal'))));
await sh('s2');
console.log('ERR',E.length,E.join('\n'),await p.evaluate(()=>window.MF_BT_ERR||''));await b.close();})();
