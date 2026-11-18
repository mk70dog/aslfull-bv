const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV128');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(1000);
const info=await p.evaluate(()=>JSON.stringify({g:scenarioGunIds(),a:scenarioAfvIdsByVehId(),sov:scenarioMmcListForNat('SOV').map(x=>x.lbl)}));console.log(info);
const I=JSON.parse(info);const gid=Object.keys(I.g)[0];let aid=null;const fl=o=>{for(const k in o){if(typeof o[k]==='object')return fl(o[k])||k;return k;}};
await p.evaluate(()=>{var b=document.querySelector('#mfTools button[title="タップしたヘクスを起点(A)にする"]');b.click();});await p.waitForTimeout(400);
await p.mouse.click(560,470);await p.waitForTimeout(600);await p.mouse.click(610,500);await p.waitForTimeout(2500);
console.log(await p.evaluate(([gid,mmc])=>{var f=function(px){var i=losHexIdentityAtGlobal(Math.round(px.x),Math.round(px.y));return i.boardId+':'+i.col+':'+i.row;};var A=f(S_LOS.pxA),B=f(S_LOS.pxB);S.mfCtr={};S.mfCtr[A]={nat:'SOV',u:{['mmc|'+mmc]:2},sw:{}};S.mfCtr[B]={nat:'GER',u:{['gun|'+gid]:1},sw:{}};Draw();return A+' '+B+' range '+(S_LOS.result&&S_LOS.result.range);},[gid,I.sov[3]]));
await p.evaluate(()=>mfIjStep2());await p.waitForTimeout(500);
await p.evaluate(()=>{
 window.T_snap=function(){var F=getFireState();return {fp:totalFP(F,F.ph),drm:fireDRM(F),gun:[F.tgtIsGun,F.tgtGunId,F.tgtGunshieldCond],af:F.grps[0].af,res:F.res&&F.res.ift?[F.res.ift.col,F.res.ift.r,F.res.mod]:null};};
 window.T_spot=function(ph,ops,d){MF_IJ.fx={};MF_IJ.fxStk=null;mfIjPh(ph);ops.forEach(function(o){o();});if(d){mfIjDie('rd',d[0]);mfIjDie('wd',d[1]);}return T_snap();};
 window.T_old=function(ph,ops,d){MF_IJ.fx={};MF_IJ.fxStk=null;mfIjPh(ph);var t0=S.tab,oD=window.Draw;S.tab='fire';window.Draw=function(){};try{ops.forEach(function(o){o();});var F=getFireState();if(d){F.rd=d[0];F.wd=d[1];F.res=null;var oT=showToast,oM=showMissingModal;showToast=function(){};showMissingModal=function(){};try{FJUDGE();}finally{showToast=oT;showMissingModal=oM;}}}finally{S.tab=t0;window.Draw=oD;}return T_snap();};
});
const cases=[
 ['目標は砲 防盾', 'pfph',["()=>mfIjFx('tgtIsGun',true)","()=>mfIjFx('gsCond',true)"],["()=>Ftog('tgtIsGun')","()=>FtgtGunSet('"+gid+"')","()=>Ftog('tgtGunshieldCond')"],[3,4]],
 ['AFPh AF なし', 'afph',["()=>mfIjFx('afphPfphFired',false)","()=>mfIjFx('af',false)"],["()=>Fset('afphPfphFired',false)","()=>FgsSet(getFireState().grps[0].id,'af',false)"],[2,3]],
];
for(const c of cases){
  const A=JSON.parse(await p.evaluate(([ph,ops,d])=>JSON.stringify(T_spot(ph,ops.map(o=>eval(o)),d)),[c[1],c[2],c[4]]));
  const O=JSON.parse(await p.evaluate(([ph,ops,d])=>JSON.stringify(T_old(ph,ops.map(o=>eval(o)),d)),[c[1],c[3],c[4]]));
  console.log((JSON.stringify(A)===JSON.stringify(O)?'SAME ':'DIFF ')+c[0]+'\n  spot '+JSON.stringify(A)+(JSON.stringify(A)===JSON.stringify(O)?'':'\n  old  '+JSON.stringify(O)));
}
await p.evaluate(()=>{T_spot('pfph',[()=>mfIjFx('tgtIsGun',true),()=>mfIjFx('gsCond',true)],[3,4]);});await p.waitForTimeout(400);await p.screenshot({path:'/tmp/w/t18_gun.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
