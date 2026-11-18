const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV127');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(1000);
await p.evaluate(()=>{mfCtrSet('3:16:1','GER','afv','afv_pz4d_ge',1);mfCtrSet('3:18:1','SOV','afv','afv_t26m3739_sov',1);});
await p.click('#mfTools button[title="タップしたヘクスを起点(A)にする"]');await p.waitForTimeout(400);await p.mouse.click(560,470);await p.waitForTimeout(600);await p.mouse.click(640,470);await p.waitForTimeout(2500);
await p.evaluate(()=>{mfIjStep2();mfIjPh('dff');});await p.waitForTimeout(1500);
const sh=async(n,top)=>{await p.evaluate(t=>{document.getElementById('mfIj2').scrollTop=t;},top);await p.waitForTimeout(300);await p.screenshot({path:'/home/claude/aslfull-bv/samples/v543-'+n+'.png'});};
console.log(await p.evaluate(()=>{var afv=AFV_DATA.filter(v=>v.id==='afv_pz4d_ge')[0];return JSON.stringify({bd:afv.breakdownDR,stall:afv.stall,smoke:afv.smoke,av:['GsetMotionAttemptAutoDice','GsetSmokeAutoDice','VehMsaSet:mp'].map(k=>!!MF_IJ.gAv[k])});}));
// hit and TK
await p.evaluate(()=>{var t0=S.tab;try{GclearAmmoDepletedAll();}catch(e){}});
await p.evaluate(()=>{mfIjDie2('th','r',2);mfIjDie2('th','w',3);});await p.waitForTimeout(300);
console.log(await p.evaluate(()=>JSON.stringify({th:S.gun.th_result&&S.gun.th_result.hit,miss:MF_IJ.miss})));
// find dice for possible shock: try all
const r=await p.evaluate(()=>{for(var a=1;a<=6;a++)for(var c=1;c<=6;c++){mfIjDie2('ift','r',a);mfIjDie2('ift','w',c);var ir=S.gun.ift_result;if(ir&&ir.afv&&ir.afv.result==='POSSIBLE_SHOCK')return [a,c,ir.tkNum,ir.dr];}return null;});console.log('ps',JSON.stringify(r));
await p.evaluate(()=>{mfIjG('GsetDRM','vehCE',true);mfIjG('GsetNTC_Nat','SOV');mfIjG('GsetNTC_RD',4);mfIjG('GsetNTC_WD',5);});await p.waitForTimeout(400);
const y=await p.evaluate(()=>{var e=document.getElementById('mfIj2');var x=[...e.querySelectorAll('.ij2Box')][0];return x?x.getBoundingClientRect().top-e.getBoundingClientRect().top+e.scrollTop:0;});
await sh('1-top',0);await sh('2-ntc',y-300);
await p.evaluate(()=>{mfIjMore();});await p.waitForTimeout(400);
await p.evaluate(()=>{mfIjSpR('ma');mfIjG('VehMsaSet','mp',4);mfIjG('VehMsaSet','notInLosAtStart',true);mfIjG('VehMsaDrDie',3);});await p.waitForTimeout(300);
const z=await p.evaluate(()=>{var e=document.getElementById('mfIj2');var x=[...e.querySelectorAll('.ij2Hd')].find(h=>/特別な判定/.test(h.textContent));return x?x.getBoundingClientRect().top-e.getBoundingClientRect().top+e.scrollTop:-1;});console.log('sp',z);
if(z>0){await sh('3-special',z-10);await sh('4-special2',z+600);}
console.log('ERR',E.length,E.join('\n'));await b.close();})();
