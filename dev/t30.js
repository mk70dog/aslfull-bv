const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
await p.evaluate(()=>{mfHqOpen();mfHqGo('cc');});await p.waitForTimeout(500);await p.screenshot({path:'samples/sample-ui14-c0.png'});
console.log(await p.evaluate(()=>JSON.stringify({g:scenarioMmcListForNat('GER').map(u=>u.lbl+'/'+u.fp),s:scenarioMmcListForNat('SOV').map(u=>u.lbl+'/'+u.fp),gs:scenarioSmcListForNat('GER').map(u=>u.lbl)})));
await p.evaluate(()=>{mfCcOpen('inf');mfCcNat('A','GER');mfCcPick('A','mmc|4-6-7[1]',2);mfCcPick('A','smc|9-1',1);mfCcPick('D','mmc|'+scenarioMmcListForNat('SOV')[0].lbl,1);});await p.waitForTimeout(300);
await p.screenshot({path:'samples/sample-ui14-c1.png'});
const r1=await p.evaluate(()=>{mfCcGo();var a=MF_CC.ctx(0),d=MF_CC.ctx(1);return JSON.stringify({a:{af:a.c.af,good:a.c.afGood,df:a.c.df,ldr:a.c.cc_ldr,odds:ccOddsT(a.c)},d:{af:d.c.af,df:d.c.df,odds:ccOddsT(d.c)}});});
console.log('case1',r1);
await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-c2.png'});
const r2=await p.evaluate(()=>{mfCcDr(0,6);mfCcDr(1,3);var G=MF_CC.g();return JSON.stringify({a0:G.atk[0].R,a1:G.atk[1].R,pick:G.atk[1].pickCr,A:G.A.map(x=>x.lbl+(x.gone?'x':'')),D:G.D.map(x=>x.lbl+(x.gone?'x':''))});});
console.log('case1 res',r2);
await p.evaluate(()=>{var G=MF_CC.g();mfCcCr(1,G.A[0].pid);});await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-c3.png'});
// ambush sequential + pin
const r3=await p.evaluate(()=>{var G=MF_CC.g();G.step=1;mfCcGo();G=MF_CC.g();mfCcT(G.A[0].pid,'pin');mfCcAmb('on',true);mfCcAmbDr('A',1);mfCcAmbDr('D',5);var a=MF_CC.ctx(0);mfCcDr(0,4);var b2=MF_CC.ctx(1);return JSON.stringify({amb:G.amb.res,af:a.c.af,good:a.c.afGood,pin:a.c.cc_atkPin,ambd:a.c.cc_ambush,drm:ccDrm(a.c),res:G.atk[0].R.st,after:{att:b2.att.length,amb:b2.c.cc_ambush}});});
console.log('case2',r3);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-c4.png'});
// CCV
const r4=await p.evaluate(()=>{mfCcOpen('veh');var G=MF_CC.g();mfCcNat('A','SOV');mfCcNat('D','GER');mfCcPick('A','mmc|5-2-7[1]',1);mfCcPick('A','smc|'+scenarioSmcListForNat('SOV')[0].lbl,1);G.veh=MF_CC.afvs('GER')[0].id;mfCcGo();mfCvV('ce',true);var X=MF_CC.cv();mfCvDr(2);return JSON.stringify({veh:G.veh,ccv:X.ccv,drm:X.drm,type:X.c.ccv_unitType,smc:X.c.ccv_smcJoin,res:G.vres});});
console.log('ccv',r4);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-v1.png'});
// VA
const r5=await p.evaluate(()=>{mfCcOpen('va');var G=MF_CC.g();mfCcNat('A','GER');var v=MF_CC.afvs('GER').find(v=>v.mg&&(v.mg.cmg||v.mg.rmg));G.veh=v.id;mfCcPick('D','mmc|'+scenarioMmcListForNat('SOV')[0].lbl,1);mfCcGo();mfCvV('cmg',true);mfCvV('rmg',true);var X=vaCtx_t();mfVaDr(5);return JSON.stringify({v:v.lbl,mg:v.mg,fp:X.fp,df:X.c.df,res:G.vres.R});});
console.log('va',r5);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-a2.png'});
// PAATC
const r6=await p.evaluate(()=>{mfCcOpen('pa');mfPaNat('GER');mfPaPick('4-6-7[1]',2);mfPaSet('ldr','9-1');var P=MF_CC.pa();mfPaDr(P.units[0].pid,8);mfPaDr(P.units[1].pid,9);return JSON.stringify(P.units.map(u=>u.res));});
console.log('pa',r6);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui14-p1.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
