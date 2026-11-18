const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push(String(x).slice(0,200)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{window.__acc={};window.__harv=function(tab,ctx){var cur='';document.querySelectorAll('#main *').forEach(function(e){
  if(e.classList&&(e.classList.contains('sh')||e.classList.contains('lbl')||e.classList.contains('plbl')||/^H[2-5]$/.test(e.tagName))&&e.textContent.trim().length<70&&e.textContent.trim())cur=e.textContent.trim().replace(/\s+/g,' ');
  var oc=e.getAttribute('onclick')||e.getAttribute('onchange')||e.getAttribute('oninput');if(!oc||!e.offsetWidth)return;var o2=oc.replace(/event\.stopPropagation\(\);?/g,'');
  var m=o2.match(/([A-Za-z_][A-Za-z0-9_.]*)\(([^)]*)\)/);if(!m)return;var fn=m[1],a0=(m[2].split(',')[0]||'').replace(/['"\\]/g,'').trim();var key=/^[A-Za-z_]+$/.test(a0)?a0:'';
  var k=tab+'|'+fn+'|'+key;var lbl=(e.textContent||'').trim().replace(/\s+/g,' ').slice(0,40);if(!__acc[k])__acc[k]={tab:tab,fn:fn,key:key,sec:{},lbl:{},ctx:{}};__acc[k].sec[cur]=1;if(lbl)__acc[k].lbl[lbl]=1;__acc[k].ctx[ctx]=1;});};
 window.__go=async function(tab){if(S.tab!==tab){NAVTAB(tab);}else Draw();await new Promise(r=>setTimeout(r,250));};});
await p.evaluate(()=>{SSEL('BV127');mfOld('fire');});await p.waitForTimeout(1500);
await p.evaluate(async()=>{
 var units=[['GER','mmc','4-6-7[1]'],['GER','mmc','4-6-7[1]'],['GER','smc','8-1']];
 for(const ph of ['pfph','dff','dfph','afph']){FIREsub(ph);await new Promise(r=>setTimeout(r,200));var f=getFireState();var g=f.grps[0];g.pickerItems=[];g.sw=[];g.swOwner={};f.swc={};g.pickerNat='GER';units.forEach(u=>FgAddPickItem(g.id,u[0],u[1],u[2]));f.swc['lmg38_ge']=1;f.swc['mmg512_ge']=1;FtogSW(g.id,'lmg38_ge_0');FtogSW(g.id,'mmg512_ge_0');g.range=2;
   ['terrainDrmOpen','hazNoteOpen','thSettingsOpen'].forEach(k=>f[k]=true);
   for(const m of [null,'SFF','FPF','RESID']){f.fireMode=m;await __go('fire');__harv('fire',ph+'/'+m);}
   f.fireMode=null;f.tgtCrewCE=true;await __go('fire');__harv('fire',ph+'/ce');f.tgtCrewCE=false;f.tgtIsGun=true;await __go('fire');__harv('fire',ph+'/gun');f.tgtIsGun=false;
   f.rd=2;f.wd=3;try{FJUDGE();}catch(e){}await __go('fire');__harv('fire',ph+'/res');f.res=null;f.rd=0;f.wd=0;}
 NAVTAB('afv');await new Promise(r=>setTimeout(r,400));
 var afvs=['veh_ma_afv_pz4d_ge','veh_ma_afv_kv2_sov','veh_ma_afv_pz3f_ge','veh_ma_afv_t3440_sov','veh_ma_afv_ba6_sov'];
 for(const gid of afvs){Gset('gunId',gid);var gd=gunData();if(!gd)continue;['terrainDrmOpen','thSettingsOpen','hazNoteOpen'].forEach(k=>S.gun[k]=true);
   for(const ph of ['PFPh','DFF','DFPh','AFPh']){S.gun.phase=ph;S.gun.range=3;for(const tt of ['inf','area','ve']){Gset('tgtType',tt);if(tt==='ve')GselTgtVeh('afv_kv2_sov');
     for(const am of gd.ammo.map(a=>a.type)){S.gun.ammoType=am;S.gun.th_result=null;await __go('afv');__harv('afv',ph+'/'+tt+'/'+am);S.gun.rd=2;S.gun.wd=3;try{GJUDGE_TH();}catch(e){}await __go('afv');__harv('afv',ph+'/'+tt+'/'+am+'/th');S.gun.ift_rd=3;S.gun.ift_wd=3;try{if(tt==='ve')GJUDGE_TK();else GJUDGE_IFT();}catch(e){}await __go('afv');__harv('afv',ph+'/'+tt+'/'+am+'/tk');S.gun.th_result=null;S.gun.ift_result=null;S.gun.rd=0;S.gun.wd=0;S.gun.ift_rd=0;S.gun.ift_wd=0;}}}}
 NAVTAB('gun');await new Promise(r=>setTimeout(r,400));
 for(const gid of ['g_50pak38_ge','g_37pak3536_ge','g_76inf','g_150sig33_ge','g_50mm','g_45ptp32_so','g_88flak18_ge']){Gset('gunId',gid);var gd=gunData();if(!gd)continue;['terrainDrmOpen','thSettingsOpen','hazNoteOpen'].forEach(k=>S.gun[k]=true);
   for(const ph of ['PFPh','DFF','AFPh']){S.gun.phase=ph;S.gun.range=3;for(const tt of ['inf','area','ve']){Gset('tgtType',tt);if(tt==='ve')GselTgtVeh('afv_kv2_sov');
     for(const am of gd.ammo.map(a=>a.type)){S.gun.ammoType=am;S.gun.th_result=null;await __go('gun');__harv('gun',ph+'/'+tt+'/'+am);S.gun.rd=2;S.gun.wd=3;try{GJUDGE_TH();}catch(e){}await __go('gun');__harv('gun',ph+'/'+tt+'/'+am+'/th');S.gun.th_result=null;S.gun.rd=0;S.gun.wd=0;}}}}
 NAVTAB('latw');await new Promise(r=>setTimeout(r,400));
 for(const w of LATW_DATA.map(x=>x.id)){LATWset('wepId',w);['terrainDrmOpen','thSettingsOpen','hazNoteOpen'].forEach(k=>S.latw[k]=true);
   for(const ph of ['PFPh','DFF','AFPh']){LATWset('phase',ph);S.latw.range=2;for(const tt of ['vehicle','infantry','gun']){LATWset('tgtType',tt);if(tt==='vehicle')LATWselTgtVeh('afv_kv2_sov');await __go('latw');__harv('latw',w+'/'+ph+'/'+tt);
     S.latw.rd=2;S.latw.wd=3;S.latw.pf_result={canFire:true,dr:1,drm:0,modDr:1};try{LATW_JUDGE_TH();}catch(e){}await __go('latw');__harv('latw',w+'/'+ph+'/'+tt+'/th');S.latw.th_result=null;S.latw.pf_result=null;S.latw.rd=0;S.latw.wd=0;}}}
});
const res=await p.evaluate(()=>Object.values(__acc).map(o=>({tab:o.tab,fn:o.fn,key:o.key,sec:Object.keys(o.sec).filter(Boolean).slice(0,3),lbl:Object.keys(o.lbl).slice(0,10),n:Object.keys(o.ctx).length})));
fs.writeFileSync('/tmp/w/inventory2.json',JSON.stringify(res,null,1));console.log('items',res.length,'errors',E.length,E.slice(0,3));await b.close();})();
