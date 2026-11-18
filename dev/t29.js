const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
await p.evaluate(()=>{mfHqOpen();mfHqGo('rout');});await p.waitForTimeout(2500);
await p.screenshot({path:'samples/sample-ui13-o1.png'});
// choose open hex with cover nearby
const pick=await p.evaluate(()=>{var A=ASLFULL_RT_API,bd='4',best=null;for(var c=3;c<20&&!best;c++)for(var r=2;r<9&&!best;r++){var h={bd:bd,col:c,row:r};if(A.terr(h)!=='Open Ground')continue;var e={bd:bd,col:c-3,row:r};if(c-3<1||A.terr(e)!=='Open Ground')continue;var R=A.plan(h,[{bd:bd,col:e.col,row:e.row,rng:6}]);if(R.dests.length>=2&&R.dests.some(d=>d.inter.length))best={h:h,e:e,n:R.dests.length};}return best;});
console.log('pick',JSON.stringify(pick));
await p.evaluate(P=>{MF_RT_TAP(P.h.bd,P.h.col,P.h.row);},pick);await p.waitForTimeout(800);
await p.evaluate(P=>{MF_RT_TAP(P.e.bd,P.e.col,P.e.row);mfRtE('rng',6-MF_RT.s().E[0].rng);},pick);await p.waitForTimeout(800);
// scroll map to start hex
await p.evaluate(()=>{LosZoom(1);LosZoom(1);LosZoom(1);});await p.waitForTimeout(2000);await p.evaluate(()=>{var w=document.getElementById('losScrollWrap');var pg=[...document.querySelectorAll('polygon')].find(x=>x.getAttribute('stroke')==='#ffd24a');if(w&&pg){var r=pg.getBoundingClientRect(),wr=w.getBoundingClientRect();var el=w;while(el&&!(el.scrollWidth>el.clientWidth+5))el=el.parentElement;console.log('sc',el&&el.id,r.x,r.y);if(el){el.scrollLeft+=r.x-590;el.scrollTop+=r.y-420;}try{losSaveMapScroll();}catch(e){}}});await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{var R=MF_RT.R();return JSON.stringify({must:R.must,dests:R.dests.map(d=>d.name+'/'+d.mf+'/i'+d.inter.length),crawl:R.crawl.map(d=>d.name),red:R.red.length,rng:MF_RT.s().E[0].rng});}));
await p.screenshot({path:'samples/sample-ui13-o2.png'});
// pick dest with interdiction
console.log('before',await p.evaluate(()=>{var w=document.getElementById('losScrollWrap');return [w.scrollLeft,w.scrollTop,S_LOS.scrollLeft,S_LOS.zoom];}));await p.evaluate(()=>{var R=MF_RT.R(),d=R.dests.find(x=>x.inter.length)||R.dests[0];MF_RT_TAP(d.to.bd,d.to.col,d.to.row);});await p.waitForTimeout(800);console.log('after',await p.evaluate(()=>{var w=document.getElementById('losScrollWrap');var a=[w.scrollLeft,w.scrollWidth,w.clientWidth,S_LOS.scrollLeft];losRestoreMapScroll();return a.concat([w.scrollLeft]);}));
await p.screenshot({path:'samples/sample-ui13-o3.png'});
await p.evaluate(()=>{mfRtInt();var u=scenarioMmcListForNat(MF_RT.s().nat)[0];mfRtSet('u',u.lbl);var L=scenarioSmcListForNat(MF_RT.s().nat);if(L[0])mfRtSet('ldr',L[0].lbl);});await p.waitForTimeout(500);
console.log(await p.evaluate(()=>{mfRtDr(0,9);return JSON.stringify(MF_RT.s().I.res);}));
await p.waitForTimeout(400);await p.screenshot({path:'samples/sample-ui13-o4.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
