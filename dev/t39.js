// v555: BV126 の勝利条件・SSR(二階家・1X4 要塞化・突撃工兵・設置の分離)・狙撃兵パネルの順番
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{localStorage.setItem('aslfull_nmMode','judge');SSEL('BV126');});await p.waitForTimeout(1500);
const sh=async(n)=>{await p.waitForTimeout(500);await p.screenshot({path:'/home/claude/aslfull-bv/samples/sample-ui20-'+n+'.png'});};
await p.evaluate(()=>{mfModeSet('ai');});await p.waitForTimeout(3500);
const pl=(gi,t,c,r)=>p.evaluate(([gi,t,c,r])=>{if(!(MF_BT.arm&&MF_BT.arm.gi===gi&&MF_BT.arm.t===t))mfBtArm(gi,t);return MF_BT_TAP('1',c,r);},[gi,t,c,r]);
const hx=(n)=>p.evaluate((n)=>losHexNameToColRow(n),n);
const X4=await hx('X4'),X3=await hx('X3');
await pl(0,'4-4-7[1]',X4.col,X4.row);await pl(0,'8-1',X4.col,X4.row);
const G=await p.evaluate(()=>{var A=ASLFULL_SOLO_API,o=[];for(var col=0;col<14;col++)for(var row=1;row<=10;row++){var t=A.terr('1',col,row);if(/Wood|Building|Multiple/.test(t))o.push([col,row]);}return o.slice(0,4);});
await pl(1,'4-6-7[1]',G[0][0],G[0][1]);
let tt=await p.evaluate(()=>{window.__t=[];var o=window.mfBtToast;window.mfBtToast=function(m){window.__t.push(m);return o(m);};var e=document.getElementById('mfBtToast');return 1;});
await pl(2,'8-3-8[E]',G[0][0],G[0][1]);
console.log('sep',await p.evaluate(()=>{var e=document.getElementById('mfBtToast');return e&&e.textContent;}),await p.evaluate(()=>S.solo.stacks.map(s=>s.gi+':'+s.u.map(x=>x.t).join(',')).join(' | ')));
await pl(2,'8-3-8[E]',G[1][0],G[1][1]);
// SSR2・SSR3
console.log('floor',await p.evaluate(()=>{var r=[];['X4','X3','Y8','G3','BB4'].forEach(h=>{var c=losHexNameToColRow(h),g=losColRowToGlobalCanon('1',c.col,c.row),id=losHexIdentityAtGlobal(Math.round(g.x),Math.round(g.y));r.push(h+'='+ASLFULL_UPPER_MAXFLOOR(id));});return r.join(' ')+' ov='+losHexOverrideAt('1',losHexNameToColRow('Y4').col,losHexNameToColRow('Y4').row)+' / '+losHexOverrideAt('1',losHexNameToColRow('Y8').col,losHexNameToColRow('Y8').row);}));
await p.evaluate(()=>{MF_BT.arm=null;mfBtStart(1);});await p.waitForTimeout(1500);
await p.evaluate(()=>{if(document.getElementById('aslfullAlog'))ASLFULL_SOLO('alogclose');});
// GER の 8-3-8 を X4 の隣へ動かして撃つ(準備射撃)
const W3=await hx('W3');
const adjH=await p.evaluate(([tc,tr])=>{var o=[];for(var c=tc-2;c<=tc+2;c++)for(var r=tr-2;r<=tr+2;r++){if(losHexRangeColRow(c,r,tc,tr)===1)o.push([c,r,losHexNameFromColRow(c,r)]);}return o;},[X4.col,X4.row]);console.log('adj',JSON.stringify(adjH));
const W=adjH.filter(x=>x[2]!=='X3'&&x[2]!=='X5')[0];
await p.evaluate(([c,r,tc,tr])=>{var L=S.solo.stacks,g=L.filter(x=>x.side==='GER'&&x.u.some(z=>z.t==='8-3-8[E]'))[0];g.col=c;g.row=r;for(var i=0;i<12&&S.turn.phase!=='pfph';i++){ASLFULL_SOLO('next');if(document.getElementById('aslfullAlog'))ASLFULL_SOLO('alogclose');}mfBtSel(g.id);ASLFULL_SOLO('aim');ASLFULL_SOLO_TAP('1',tc,tr);},[W[0],W[1],X4.col,X4.row]);
await p.waitForTimeout(2500);await p.evaluate(()=>mfBtRd());
const fire=await p.evaluate(()=>JSON.stringify(ASLFULL_SOLO_API.mfp())+' R='+JSON.stringify({temB:S_LOS.result&&S_LOS.result.temB,tB:S_LOS.result&&S_LOS.result.terrainB,flB:S_LOS.result&&S_LOS.result.floorB,fl:S_LOS.floorB})+' F='+JSON.stringify(Object.keys(S.fire).filter(k=>/tem|Tem|fort|Fort|bld/.test(k)).map(k=>k+':'+JSON.stringify(S.fire[k]))));
console.log('fire',fire);await sh('b1');
await p.evaluate(()=>{ASLFULL_SOLO('mfclose');mfBtRd();});
// APh: 要塞化 Location へ前進できない
const ap=await p.evaluate(([tc,tr])=>{for(var i=0;i<12&&S.turn.phase!=='aph';i++){ASLFULL_SOLO('next');if(document.getElementById('aslfullAlog'))ASLFULL_SOLO('alogclose');}if(document.getElementById('aslfullAlog'))ASLFULL_SOLO('alogclose');var g=S.solo.stacks.filter(x=>x.side==='GER'&&x.u.some(z=>z.t==='8-3-8[E]'))[0];g.f.fired=false;S.solo.sel=g.id;window.__tt=[];var tO=window.showToast;ASLFULL_SOLO_TAP('1',tc,tr);return 'busy='+S.solo.busy+' dff='+!!S.solo.dff+' pq='+(S.solo.popQ||[]).length+' pre='+!!S.solo.pre+' ph='+S.turn.phase+' half='+S.turn.half+' adv='+g.f.adv+' at='+ASLFULL_SOLO_API.hexNm(g)+' toast='+(document.getElementById('mfBtToast')||{}).textContent;},[X4.col,X4.row]);
console.log('aph',ap);await sh('b2');
// 勝利条件: ソ連を 1X4 から消して、GER の 4-6-7 を X3 に置き、Player Turn を終える
const vc=await p.evaluate(([c,r])=>{var L=S.solo.stacks;S.solo.stacks=L.filter(x=>x.side!=='SOV'||!(ASLFULL_SOLO_API.hexNm(x).match(/^1(X4|X3|Y4|Y5|W4|W5|X5|Y3|X2)/)));var g=S.solo.stacks.filter(x=>x.side==='GER'&&x.u.some(z=>z.t==='4-6-7[1]'))[0];g.col=c;g.row=r;var before=JSON.stringify(ASLFULL_SOLO_VC());for(var i=0;i<12&&S.turn.phase!=='ccph';i++){ASLFULL_SOLO('next');if(document.getElementById('aslfullAlog'))ASLFULL_SOLO('alogclose');}ASLFULL_SOLO('next');mfBtRd();return before+' => '+JSON.stringify(ASLFULL_SOLO_VC())+' ended='+S.turn.ended+' log='+S.solo.log[0];},[X3.col,X3.row]);
console.log('vc',vc);await p.waitForTimeout(600);await p.evaluate(()=>{if(document.getElementById('aslfullAlog'))ASLFULL_SOLO('alogclose');mfBtRd();});await sh('b3');console.log('win',await p.evaluate(()=>!!document.getElementById('mfBtWin')));
// 煙幕指数(マルチ判定)
console.log('smk',await p.evaluate(()=>{var r=[];['8-3-8[E]','4-6-7[1]'].forEach(l=>{var u=(UNITS.GER.mmc||[]).filter(x=>x.lbl===l)[0];r.push(l+' '+(u&&u.smk)+'→'+scenSmk('GER',l,u&&u.smk));});return r.join(' ');}));
console.log('ERR',E.length,E.join('\n'),await p.evaluate(()=>window.MF_BT_ERR||''));await b.close();})();
