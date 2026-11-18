const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
await p.evaluate(()=>{mfHqOpen();mfHqGo('mc');});await p.waitForTimeout(600);
await p.evaluate(()=>{mfMgNat('GER');mfMgPick('smc|9-1',1);mfMgPick('mmc|4-6-7[1]',2);});await p.waitForTimeout(300);
await p.screenshot({path:'/home/claude/aslfull-bv/samples/sample-ui11-g1.png'});
const r1=await p.evaluate(()=>{var MCG=MF_MG.g();mfMgGo();MCG=MF_MG.g();mfMgSet('type','2MC');if(MCG.elr==null)mfMgSet('elr',3);var U=MCG.units;var L=U.find(u=>u.kind==='smc');mfMgDr(L.pid,6);var S1=U.filter(u=>u.kind==='mmc');var need=MF_MG.need(S1[0]);mfMgDr(S1[0].pid,7);mfMgDr(S1[1].pid,8);return JSON.stringify({elr:MCG.elr,L:L.res,need:need,s1:S1[0].res,s1st:MF_MG.st(S1[0]),s2:S1[1].res,s2st:MF_MG.st(S1[1]),log:S1[1].log});});
console.log(r1);
await p.evaluate(()=>{var MCG=MF_MG.g();mfMgSel(MCG.units[1].pid);});await p.waitForTimeout(300);
await p.screenshot({path:'/home/claude/aslfull-bv/samples/sample-ui11-g2.png'});
// leader breaks -> LLTC
const r2=await p.evaluate(()=>{var MCG=MF_MG.g();MCG.step=1;mfMgGo();MCG=MF_MG.g();mfMgSet('type','1MC');var U=MCG.units,L=U.find(u=>u.kind==='smc');mfMgDr(L.pid,10);var S1=U.filter(u=>u.kind==='mmc');mfMgDr(S1[0].pid,5);mfMgDr(S1[1].pid,4);return JSON.stringify({L:L.res,Lst:MF_MG.st(L),ll:MCG.ll.map(e=>({k:e.k,rev:e.rev,mor:e.mor})),t:MCG.ll.length?MF_MG.tg(MCG.ll[0]).map(x=>x.lbl+':'+MF_MG.st(x)):[],s1:S1[0].res});});
console.log(r2);
await p.evaluate(()=>{mfMgLLAll(0);});await p.waitForTimeout(300);
console.log(await p.evaluate(()=>JSON.stringify(MF_MG.g().ll[0]&&MF_MG.g().ll[0].done)));
await p.screenshot({path:'/home/claude/aslfull-bv/samples/sample-ui11-g3.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
