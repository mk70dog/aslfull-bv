const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV128');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(1000);
await p.click('#mfTools button[title="タップしたヘクスを起点(A)にする"]');await p.waitForTimeout(400);await p.mouse.click(560,470);await p.waitForTimeout(600);await p.mouse.click(610,500);await p.waitForTimeout(2000);
await p.evaluate(()=>{var f=function(px){var i=losHexIdentityAtGlobal(Math.round(px.x),Math.round(px.y));return i.boardId+':'+i.col+':'+i.row;};S.mfCtr={};S.mfCtr[f(S_LOS.pxA)]={nat:'GER',u:{'gun|g_50pak38_ge':1},sw:{}};S.mfCtr[f(S_LOS.pxB)]={nat:'SOV',u:{'mmc|5-2-7[1]':1},sw:{}};MF_IJ.gReset=true;MF_IJ.dirty=true;Draw();mfIjStep2();mfIjPh('dff');});await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>{mfIjGmv('ffmo');mfIjGmv('ffnam');var a=JSON.stringify([S.gun.drm.ffmo,S.gun.drm.ffnam,S.gun.tgtType,S.gun.ammoType]);mfIjDie2('th','r',3);mfIjDie2('th','w',2);var t=S.gun.th_result;if(t&&t.hit){mfIjDie2('ift','r',2);mfIjDie2('ift','w',3);}return a+' '+JSON.stringify({th:t&&[t.hit,t.modDr],ift:S.gun.ift_result&&(S.gun.ift_result.result||S.gun.ift_result.res||S.gun.ift_result.type),miss:MF_IJ.miss,sh:MF_IJ.sh});}));
await p.evaluate(()=>{mfIjMore();});await p.waitForTimeout(400);await p.screenshot({path:'/tmp/w/t23.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
