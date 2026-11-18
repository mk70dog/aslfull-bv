const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV127');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
await p.click('#mfTools button[title="マルチ判定"]');await p.waitForTimeout(600);
await p.screenshot({path:'/home/claude/aslfull-bv/samples/sample-ui10-hq.png'});
console.log(await p.evaluate(()=>{var e=document.querySelector('#mfHq .hqT');var c=getComputedStyle(e);var r=e.getBoundingClientRect();var P=getComputedStyle(document.getElementById('mfHq'));return JSON.stringify({tile:[c.backgroundColor,c.borderRadius,c.boxShadow,c.fontSize,c.color,Math.round(r.width),r.height],panel:[P.backgroundColor,P.borderRadius,P.padding,P.width]});}));
console.log('ERR',E.length,E.join('\n'));await b.close();})();
