const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
const sh=async(n)=>{await p.waitForTimeout(400);await p.screenshot({path:'/home/claude/aslfull-bv/samples/sample-ui16-'+n+'.png'});};
await p.evaluate(()=>{mfHqOpen();});await sh('hq');
// bog: SPW251/1 half MP woods
let r=await p.evaluate(()=>{mfHqGo('bog');mfBgSet('nat','GER');mfBgSet('v','afv_spw2511_ge');mfBgSet('ter','half');var d=MF_BG.drm();mfBgSet('cr',4);mfBgSet('wh',3);return JSON.stringify({d:d.s,L:d.L.map(x=>x[0]),r:MF_BG.res()});});console.log('bog',r);await sh('b1');
r=await p.evaluate(()=>{mfBgSet('v','afv_psw2318_ge');mfBgSet('ter','stone');mfBgSet('cr',6);mfBgSet('wh',1);return JSON.stringify({d:MF_BG.drm().s,r:MF_BG.res()});});console.log('bog stone',r);
r=await p.evaluate(()=>{mfBgSet('v','afv_spw2511_ge');mfBgSet('mode','un');mfBgSet('mired',true);mfBgSet('ur',3);mfBgSet('uw',4);return JSON.stringify(MF_BG.un());});console.log('unbog',r);await sh('b2');
// smoke
r=await p.evaluate(()=>{mfRyClose();mfHqGo('smk');mfSkSet('nat','GER');mfSkSet('u','4-6-7[1]');mfSkSet('dr',1);return document.querySelector('#mfRy .ij2Res')?document.querySelector('#mfRy .ij2Res').innerText:'none';});console.log('gren',r.replace(/\n/g,' '));await sh('s1');
r=await p.evaluate(()=>{mfSkSet('kind','disp');mfSkSet('v','afv_psw2318_ge');mfSkSet('dr3',6);return document.querySelector('#mfRy .ij2Res').innerText;});console.log('disp',r.replace(/\n/g,' '));await sh('s2');
r=await p.evaluate(()=>{mfSkSet('kind','vgren');mfSkSet('v','afv_psw2318_ge');mfSkSet('ce',false);var a=document.querySelector('#mfRy .ij2Res')?document.querySelector('#mfRy .ij2Res').innerText:'';mfSkSet('ce',true);mfSkSet('dr',2);return a+' | '+document.querySelector('#mfRy .ij2Res').innerText;});console.log('vgren',r.replace(/\n/g,' '));await sh('s3');
// manhandling BV128
await p.evaluate(()=>{mfRyClose();SSEL('BV128');});await p.waitForTimeout(1500);
r=await p.evaluate(()=>{mfHqGo('mh');mfMhSet('nat','GER');var L=MF_MH.g();return JSON.stringify(scenarioMmcListForNat('GER').map(u=>u.lbl));});console.log('units',r);
r=await p.evaluate(()=>{var sq=scenarioMmcListForNat('GER').filter(u=>!u.hs)[0];mfMhCnt(sq.lbl,1);mfMhSet('g','g_37pak3536_ge');return JSON.stringify(MF_MH.calc().main);});console.log('main',r);await sh('m1');
r=await p.evaluate(()=>{mfMhSet('step',2);mfMhSet('ter','woods');var c=MF_MH.calc();mfMhSet('dr',8);return JSON.stringify({drm:c.drm,m:c.m,L:c.L,res:MF_MH.res()});});console.log('mh',r);await sh('m2');
console.log('ERR',E.length,E.join('\n'));await b.close();})();
