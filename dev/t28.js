const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
console.log(await p.evaluate(()=>JSON.stringify({smc:scenarioSmcListForNat('GER').map(u=>u.lbl+'/'+u.mor+'/'+u.cmd),mmc:scenarioMmcListForNat('GER').map(u=>u.lbl+'/'+u.mor+'/'+u.bm+'/'+!!u.sr),turn:S.turn&&S.turn.half})));
await p.evaluate(()=>{mfHqOpen();mfHqGo('rally');});await p.waitForTimeout(500);
const L=await p.evaluate(()=>{var s=scenarioSmcListForNat('GER').slice().sort((a,b)=>a.cmd-b.cmd)[0],m=scenarioMmcListForNat('GER')[0];mfRyNat('GER');mfRyPick('smc|'+s.lbl,1);mfRyPick('mmc|'+m.lbl,2);return [s.lbl,m.lbl];});
await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui12-r1.png'});
const r1=await p.evaluate(()=>{mfRyGo();var G=MF_RY.g();mfRySet('terr',true);var M=G.units.filter(u=>u.kind==='mmc');mfRyTog(M[1].pid,'dm');var n0=MF_RY.need(M[0]),n1=MF_RY.need(M[1]);mfRySel(M[1].pid);return JSON.stringify({n0:{drm:n0.drm,bm:n0.bm,ok:n0.ok},n1:{drm:n1.drm,bm:n1.bm,ok:n1.ok}});});
console.log('case1',r1);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui12-r2.png'});
const r1b=await p.evaluate(()=>{var G=MF_RY.g(),M=G.units.filter(u=>u.kind==='mmc');mfRyDr(M[0].pid,9);mfRyDr(M[1].pid,12);return JSON.stringify(G.units.map(u=>({l:u.lbl,brk:u.brk,res:u.res&&u.res.st,log:u.log})));});
console.log('case1 res',r1b);await p.evaluate(()=>{var G=MF_RY.g();mfRySel(G.units.filter(u=>u.kind==='mmc')[1].pid);});await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui12-r3.png'});
// case2: broken leader self-rallies, then rallies squad
const r2=await p.evaluate(()=>{var G=MF_RY.g();G.step=1;mfRyGo();G=MF_RY.g();mfRySet('terr',false);var Ld=G.units.find(u=>u.kind==='smc'),M=G.units.filter(u=>u.kind==='mmc');mfRyTog(Ld.pid,'brk',true);
 var o0=MF_RY.opts(M[0]);var nL=MF_RY.need(Ld);mfRyDr(Ld.pid,7);var o1=MF_RY.need(M[0]);return JSON.stringify({sqBefore:{ldrs:o0.ldrs.length,self:o0.self,why:o0.why},ldrNeed:{drm:nL.drm,bm:nL.bm,ok:nL.ok},ldrRes:Ld.res,sqAfter:{drm:o1&&o1.drm,ok:o1&&o1.ok,by:o1&&o1.w.ldr&&o1.w.ldr.lbl}});});
console.log('case2',r2);
// case3: squads only — one self-rally slot
const r3=await p.evaluate(()=>{S.rally.mmcSelfRallyUsed=false;S.turn.half=1-S.turn.half;if(!rallyMmcSelfSideOk({rlPickNat:'GER'}))S.turn.half=1-S.turn.half;mfRyNat('GER');var m=scenarioMmcListForNat('GER').filter(u=>!u.sr)[0];mfRyPick('mmc|'+m.lbl,2);mfRyGo();var G=MF_RY.g(),M=G.units;var a=MF_RY.opts(M[0]);mfRyDr(M[0].pid,5);var b2=MF_RY.opts(M[1]);return JSON.stringify({lbl:m.lbl,a:{self:a.self,slot:a.slot},res:M[0].res,b:{self:b2.self,why:b2.why},used:S.rally.mmcSelfRallyUsed});});
console.log('case3',r3);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui12-r4.png'});
// repair
await p.evaluate(()=>{mfRyMode('repair');var I=null;});await p.waitForTimeout(300);
const r4=await p.evaluate(()=>{var nats=Object.keys(scenarioNats()||{});var out={};nats.forEach(n=>{mfRpNat(n);out[n]=document.querySelectorAll('#mfRy .mcT').length;});return JSON.stringify(out);});
console.log('repair tiles',r4);
const r5=await p.evaluate(()=>{mfRpNat('GER');var t=document.querySelector('#mfRy .mcT');t.click();var rp=MF_RY.rp();mfRpSw(3);return JSON.stringify({kind:rp.kind,id:rp.id,r:S.repair.r,res:S.repair.result});});
console.log('sw repair',r5);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui12-p1.png'});
const r6=await p.evaluate(()=>{var nats=Object.keys(scenarioNats()||{});for(const n of nats){mfRpNat(n);var vt=[...document.querySelectorAll('#mfRy .mcT')].find(b=>/mfRpPick\('veh'/.test(b.getAttribute('onclick'))&&/主砲/.test(b.textContent));if(vt){vt.click();break;}}var rp=MF_RY.rp();if(rp.kind!=='veh')return 'noveh';mfRpMgSt('bmg','malf');mfRpMg('bmg',1);var mgr=MF_RY.rp().mgRes;mfRpMgSt('aamg','malf');mfRpMa(1);mfRpShock('SHOCK');mfRpShockDr(3);return JSON.stringify({mgr:mgr,id:rp.id,gr:S.gunRepair.result&&S.gunRepair.result.t,sh:S.gun.shockRecup});});
console.log('veh',r6);await p.waitForTimeout(300);await p.screenshot({path:'samples/sample-ui12-p2.png'});
await p.evaluate(()=>{mfRyMode('recover');mfRvNat('GER');var t=document.querySelector('#mfRy .mcT');t&&t.click();mfRvCx(true);mfRvDr(4);});await p.waitForTimeout(300);
console.log('recover',await p.evaluate(()=>JSON.stringify(S.recoverSW.result)));
await p.screenshot({path:'samples/sample-ui12-v1.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
