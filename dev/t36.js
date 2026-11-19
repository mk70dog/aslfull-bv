const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{localStorage.setItem('aslfull_nmMode','judge');SSEL('BV126');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
const sh=async(n)=>{await p.waitForTimeout(500);await p.screenshot({path:'/home/claude/aslfull-bv/samples/sample-ui18-'+n+'.png'});};
await p.evaluate(()=>{mfModeSet('ai');});await p.waitForTimeout(3000);await sh('s1');
// place: SOV group0, GER groups
const pl=(gi,t,c,r)=>p.evaluate(([gi,t,c,r])=>{if(!(MF_BT.arm&&MF_BT.arm.gi===gi&&MF_BT.arm.t===t))mfBtArm(gi,t);return MF_BT_TAP('1',c,r);},[gi,t,c,r]);
const hx=(n)=>p.evaluate((n)=>losHexNameToColRow(n),n);
const X4=await hx('X4');console.log('X4',JSON.stringify(X4));
await pl(0,'4-4-7[1]',X4.col,X4.row);await pl(0,'4-4-7[1]',X4.col,X4.row);await pl(0,'8-1',X4.col,X4.row);await pl(0,'MMG4-10',X4.col,X4.row);await pl(0,'?',X4.col,X4.row);
const bad=await hx('G4');await pl(0,'4-4-7[1]',bad.col,bad.row);
const R5=await hx('R5');await pl(0,'?',R5.col,R5.row);
// GER in woods/building south of N
const G=await p.evaluate(()=>{var A=ASLFULL_SOLO_API,o=[];for(var col=0;col<14;col++)for(var row=1;row<=10;row++){var t=A.terr('1',col,row);if(/Wood|Building|Multiple/.test(t))o.push([col,row,losHexNameFromColRow(col,row),t]);}return o.slice(0,6);});console.log('GERhex',JSON.stringify(G));
await pl(1,'4-6-7[1]',G[0][0],G[0][1]);await pl(1,'4-6-7[1]',G[0][0],G[0][1]);await pl(1,'9-1',G[0][0],G[0][1]);
await pl(2,'8-3-8[E]',G[1][0],G[1][1]);await pl(2,'10-2',G[1][0],G[1][1]);await pl(2,'FT24-1',G[1][0],G[1][1]);
const Op=await hx('E2');await pl(1,'4-6-7[1]',Op.col,Op.row);
await p.evaluate(()=>{MF_BT.arm=null;mfBtSync();});await p.evaluate(()=>{var w=document.getElementById('losScrollWrap');w.scrollTop=w.scrollHeight;w.scrollLeft=0;var s=S.solo.stacks.filter(x=>x.side==='GER')[1];S.solo.sel=s.id;mfBtSync();});await sh('s2');
console.log('stacks',await p.evaluate(()=>JSON.stringify(S.solo.stacks.map(s=>[s.side,ASLFULL_SOLO_API.hexNm(s),s.u.map(x=>x.t+'x'+x.n).join(','),JSON.stringify(s.f)]))));
await p.evaluate(()=>{mfBtStart();});await p.waitForTimeout(300);await sh('s3');
await p.evaluate(()=>{mfBtStart(1);});await p.waitForTimeout(2500);
console.log('battle',await p.evaluate(()=>JSON.stringify({b:ASLFULL_SOLO_API.battle(),ph:S.turn.phase,half:S.turn.half,side:ASLFULL_SOLO_API.side(),solo:S_LOS.soloMode})));
await p.evaluate(()=>{var s=S.solo.stacks.filter(x=>x.side==='GER')[0];mfBtSel(s.id);var w=document.getElementById('losScrollWrap');w.scrollTop=w.scrollHeight;w.scrollLeft=0;});await sh('s4');
await p.evaluate(()=>{mfBtNext();});await p.waitForTimeout(800);await p.evaluate(()=>{mfBtNext();});await p.waitForTimeout(1200);
console.log('ph',await p.evaluate(()=>S.turn.phase+' popups='+[...document.querySelectorAll('#aslfullSoloRph,#aslfullSoloPfp,#aslfullSoloMph')].map(x=>x.id+':'+x.offsetHeight).join(',')));
// move GER stack 1 hex
await p.evaluate(()=>{var s=S.solo.stacks.filter(x=>x.side==='GER')[0];mfBtSel(s.id);});
const mv=await p.evaluate(()=>{var s=ASLFULL_SOLO_API.byId(S.solo.sel);var c=s.col,r=s.row;var tg=[[c,r+1],[c+1,r],[c-1,r],[c,r-1]].filter(q=>losHexRangeColRow(c,r,q[0],q[1])===1)[0];ASLFULL_SOLO_TAP('1',tg[0],tg[1]);var s2=ASLFULL_SOLO_API.byId(S.solo.sel);return JSON.stringify({from:[c,r],to:tg,now:s2&&[s2.col,s2.row,s2.f.mf]});});console.log('move',mv);
await p.evaluate(()=>{var e=document.getElementById('aslfullAlogPop')||[...document.querySelectorAll('button')].find(x=>/^閉じる$/.test(x.textContent.trim())&&x.offsetHeight);if(e&&e.click)e.click();ASLFULL_SOLO('alogclose');mfBtSync();});await p.evaluate(()=>{var w=document.getElementById('losScrollWrap');w.scrollTop=w.scrollHeight;w.scrollLeft=0;});await sh('s5');
await p.evaluate(()=>{mfBtMenu();});await sh('s6');
await p.evaluate(()=>{var mm=document.getElementById('mfMn');if(mm)mm.remove();mfBtLeave();SSEL('ASLA');mfModeSet('ai');});await p.waitForTimeout(2500);await p.evaluate(()=>{ASLFULL_SOLO('setup');});await p.waitForTimeout(2500);await sh('a1');await p.evaluate(()=>{mfBtStart();});await p.waitForTimeout(1500);console.log('ASLA',await p.evaluate(()=>JSON.stringify({b:ASLFULL_SOLO_API.battle(),n:S.solo.stacks.length,dock:!!document.querySelector('#mfBot.mfBtDock')})));await sh('a2');
console.log('ERR',E.length,E.join('\n'),await p.evaluate(()=>window.MF_BT_ERR||''));await b.close();})();
