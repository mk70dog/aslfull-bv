const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
await p.evaluate(()=>{mfHqOpen();mfHqGo('dc');});await p.waitForTimeout(500);await p.screenshot({path:'samples/sample-ui15-d0.png'});
// placed vs infantry: 4-6-7 non elite X#10, woods +1, CX
const a=await p.evaluate(()=>{mfDcSet('nat','GER');mfDcSet('u','4-6-7[1]');mfDcSet('cx',true);mfDcSet('surv','ok');DCG.temId='woods';mfDcSet('tem',1);mfDcDr('dr',6);return JSON.stringify(MF_DC.res());});console.log('place',a);
await p.screenshot({path:'samples/sample-ui15-d1.png'});
const a2=await p.evaluate(()=>{mfDcDr('dr',10);return JSON.stringify(MF_DC.res());});console.log('dud',a2);
// thrown in AFPh: target stone +3 ; self TEM +1
const c=await p.evaluate(()=>{mfDcSet('cx',false);mfDcSet('way','throw');mfDcSet('afph',true);DCG.temId='stone_bld';mfDcSet('tem',3);mfDcSet('stem',1);mfDcDr('dr',5);mfDcDr('dr2',5);var r=MF_DC.res();return JSON.stringify({t:r.tgt,s:r.self});});console.log('throw',c);
await p.screenshot({path:'samples/sample-ui15-d2.png'});
// vs AFV placed: SOV unit vs GER SPW, PAATC
const d=await p.evaluate(()=>{mfDcSet('nat','SOV');mfDcSet('way','place');mfDcSet('tgt','veh');mfDcSet('u','5-2-7[1]');mfDcPa(6);var pa=DCG.paatc;mfDcSet('surv','ok');mfDcSet('veh',MF_CC.afvs('GER')[0].id);mfDcSet('face','side');mfDcDr('pdr',7);var P=MF_DC.pos();mfDcDr('tdr',6);return JSON.stringify({pa:pa,P:P,K:MF_DC.tk()});});console.log('afv',d);
await p.screenshot({path:'samples/sample-ui15-d3.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
