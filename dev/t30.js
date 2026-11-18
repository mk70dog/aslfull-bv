const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
await p.evaluate(()=>{mfHqOpen();mfHqGo('cc');});await p.waitForTimeout(500);await p.screenshot({path:'samples/sample-ui14-c0.png'});
// 3 GER squads(4FP) + 9-1 vs 3 SOV 4-2-6 ... use SOV 5-2-7 x2 + 4-2-6
await p.evaluate(()=>{mfCcOpen('inf');mfCcNat('A','GER');mfCcPick('A','mmc|4-6-7[1]',3);mfCcPick('A','smc|9-1',1);mfCcPick('D','mmc|5-2-7[1]',2);mfCcPick('D','mmc|4-2-6[C]',1);mfCcGo();});await p.waitForTimeout(300);
await p.screenshot({path:'samples/sample-ui14-c1.png'});
const r1=await p.evaluate(()=>{var G=MF_CC.g(),A=G.A,D=G.D;mfCcPair('A',A[3].pid,A[0].pid);
 // attack1: A0(+9-1)+A1 vs D0 ; attack2: A2 vs D1
 mfCcTg('A',0,'a',A[0].pid);mfCcTg('A',0,'a',A[1].pid);mfCcTg('A',0,'t',D[0].pid);mfCcAdd('A');mfCcTg('A',1,'a',A[2].pid);mfCcTg('A',1,'t',D[1].pid);
 // defender: all vs A2 group
 mfCcTg('D',0,'a',D[0].pid);mfCcTg('D',0,'a',D[1].pid);mfCcTg('D',0,'a',D[2].pid);mfCcTg('D',0,'t',A[2].pid);
 var c1=MF_CC.calc('A',G.atk.A[0]),c2=MF_CC.calc('A',G.atk.A[1]),c3=MF_CC.calc('D',G.atk.D[0]);
 return JSON.stringify({a1:{a:c1.od.a,d:c1.od.d,r:c1.od.r,k:c1.od.k,drm:c1.drm},a2:{a:c2.od.a,d:c2.od.d,r:c2.od.r,k:c2.od.k,drm:c2.drm},d1:{a:c3.od.a,d:c3.od.d,r:c3.od.r,k:c3.od.k}});});
console.log('split',r1);
await p.evaluate(()=>{mfCcDr('A',0,5);mfCcDr('A',1,5);mfCcDr('D',0,4);});await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-c2.png'});
const r2=await p.evaluate(()=>{var G=MF_CC.g();mfCcCr('A',1,G.D[1].pid);mfCcApply();return JSON.stringify({log:G.log,A:G.A.map(x=>x.lbl+(x.gone?'x':'')),D:G.D.map(x=>x.lbl+(x.gone?'x':''))});});
console.log('apply',r2);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-c3.png'});
// ambush sequential
const r3=await p.evaluate(()=>{var G=MF_CC.g();G.step=1;mfCcGo();G=MF_CC.g();mfCcAmb('on',true);mfCcAmbDr('A',1);mfCcAmbDr('D',5);mfCcSimple();var k=G.atk.A[0];var c=MF_CC.calc('A',k);mfCcDr('A',0,3);mfCcApply();return JSON.stringify({amb:G.amb.res,drm:c.drm,p:c.p,done1:G.done1,datk:G.atk.D.length,D:G.D.map(x=>x.lbl+(x.gone?'x':''))});});
console.log('amb',r3);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-c4.png'});
// CCV
const r4=await p.evaluate(()=>{mfCcOpen('veh');var G=MF_CC.g();mfCcNat('A','SOV');mfCcNat('D','GER');mfCcPick('A','mmc|5-2-7[1]',2);mfCcPick('A','smc|'+scenarioSmcListForNat('SOV')[0].lbl,1);G.veh=MF_CC.afvs('GER')[0].id;mfCcGo();var use=G.A.map(x=>!!x.use);mfCvUse(G.A[1].pid);var use2=G.A.map(x=>!!x.use);mfCvDr(3);return JSON.stringify({use:use,use2:use2,res:G.vres});});
console.log('ccv',r4);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-v1.png'});
const r6=await p.evaluate(()=>{mfCcOpen('pa');mfPaNat('GER');mfPaPick('4-6-7[1]',2);mfPaSet('ldr','9-1');var P=MF_CC.pa();mfPaDr(P.units[0].pid,8);mfPaDr(P.units[1].pid,9);return JSON.stringify(P.units.map(u=>u.res));});
console.log('pa',r6);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-p1.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
