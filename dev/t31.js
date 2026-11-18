const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
await p.evaluate(()=>{mfHqOpen();mfHqGo('rout');});await p.waitForTimeout(2500);
await p.evaluate(()=>{mfRtNat();MF_RT_TAP('4',5,3);MF_RT_TAP('4',2,3);mfRtE('rng',6-MF_RT.s().E[0].rng);});await p.waitForTimeout(800);
await p.evaluate(()=>{LosZoom(1);LosZoom(1);LosZoom(1);});await p.waitForTimeout(2000);
await p.evaluate(()=>{var w=document.getElementById('losScrollWrap');var pg=[...document.querySelectorAll('polygon')].find(x=>x.getAttribute('stroke')==='#ffd24a');if(w&&pg){var r=pg.getBoundingClientRect();w.scrollLeft+=r.x-590;w.scrollTop+=r.y-460;}try{losSaveMapScroll();}catch(e){}});await p.waitForTimeout(500);
const a=await p.evaluate(()=>{var R=MF_RT.R();return JSON.stringify({d:R.dests.map(d=>d.name+'/'+d.inter.length),red:R.red.length});});console.log('base',a);
// gun facing away -> no interdiction
const b2=await p.evaluate(()=>{var U=MF_RT.s();U.sel=0;mfRtETab('veh');var t=Object.keys(U);mfRtEPick('veh',0);var e=U.E[0];var res=[];for(var k=0;k<6;k++){mfRtE('fac',k);var R=MF_RT.R();res.push(k+':'+R.red.length);}mfRtE('fac',0);return JSON.stringify({lbl:e.lbl,rng:e.rng,res:res});});console.log('facing',b2);
await p.screenshot({path:'samples/sample-ui14-r1.png'});
// hindrance marker
const c=await p.evaluate(()=>{mfRtE('kind','inf');var e=MF_RT.s().E[0];e.fac=null;e.lbl=null;e.rng=6;mfRtE('rng',0);var r0=MF_RT.R().red.length;mfRtMode('h');MF_RT_TAP('4',3,3);var r1=MF_RT.R().red.length;return JSON.stringify({r0:r0,r1:r1,H:MF_RT.s().H.length});});console.log('hin',c);
await p.screenshot({path:'samples/sample-ui14-r2.png'});
// manual route
const d=await p.evaluate(()=>{var U=MF_RT.s();mfRtMode('r');var R=MF_RT.R();var P=R.dests[0].path;for(var i=1;i<P.length;i++)MF_RT_TAP(P[i].bd,P[i].col,P[i].row);var pk=U.pick;return JSON.stringify({path:P.map(h=>h.col+','+h.row),pick:pk&&{mf:pk.mf,end:pk.endOk,inter:pk.inter.length,man:pk.man}});});console.log('man',d);
await p.waitForTimeout(500);await p.screenshot({path:'samples/sample-ui14-r3.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
