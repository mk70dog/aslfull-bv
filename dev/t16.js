const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(1000);
await p.mouse.click(560,470,{button:'right'});await p.waitForTimeout(800);
await p.evaluate(()=>{[...document.querySelectorAll('#mfRm .rmIt')].find(x=>/カウンターを配置/.test(x.textContent)).click();});await p.waitForTimeout(500);
await p.evaluate(()=>{mfPkNat('SOV');var b=[...document.querySelectorAll('#mfPk .rmRow')].find(x=>/5-2-7/.test(x.textContent));b.querySelectorAll('.rmB')[1].click();b=[...document.querySelectorAll('#mfPk .rmRow')].find(x=>/5-2-7/.test(x.textContent));b.querySelectorAll('.rmB')[1].click();var c=[...document.querySelectorAll('#mfPk .rmRow')].find(x=>/LMG/.test(x.textContent));if(c)c.querySelectorAll('.rmB')[1].click();var d=[...document.querySelectorAll('#mfPk .rmRow')].find(x=>/8-0|9-1/.test(x.textContent));if(d)d.querySelectorAll('.rmB')[1].click();});
await p.evaluate(()=>mfPkClose());
await p.mouse.click(610,500,{button:'right'});await p.waitForTimeout(800);
await p.evaluate(()=>{[...document.querySelectorAll('#mfRm .rmIt')].find(x=>/カウンターを配置/.test(x.textContent)).click();});await p.waitForTimeout(400);
await p.evaluate(()=>{mfPkNat('GER');var b=[...document.querySelectorAll('#mfPk .rmRow')].find(x=>/4-6-7/.test(x.textContent));b.querySelectorAll('.rmB')[1].click();mfPkClose();});
await p.click('#mfTools button[title="タップしたヘクスを起点(A)にする"]');await p.waitForTimeout(400);
await p.mouse.click(560,470);await p.waitForTimeout(600);await p.mouse.click(610,500);await p.waitForTimeout(2500);
await p.evaluate(()=>mfIjStep2());await p.waitForTimeout(500);
console.log('ctr',await p.evaluate(()=>JSON.stringify(S.mfCtr)));
// helper in page
await p.evaluate(()=>{
 window.T_snap=function(){var F=getFireState();return {fp:totalFP(F,F.ph),drm:fireDRM(F),hin:fireHindTotal(F),ldr:[F.ldrPresent,F.ldr],tem:[F.temId,F.tem],cx:F.cx,mode:F.fireMode,ffmo:F.ffmo,ffnam:F.ffnam,haz:F.hazardous,hip:F.tgtHIP,snap:F.aslSnap,res:F.res&&F.res.ift?[F.res.ift.col,F.res.ift.r,F.res.mod]:null,miss:MF_IJ.miss};};
 window.T_spot=function(ph,ops,d){MF_IJ.fx={};MF_IJ.fxStk=null;mfIjPh(ph);ops.forEach(function(o){o();});if(d){mfIjDie('rd',d[0]);mfIjDie('wd',d[1]);}return T_snap();};
 window.T_old=function(ph,ops,d){MF_IJ.fx={};MF_IJ.fxStk=null;mfIjPh(ph); /* 既定の状態を作る */
   var t0=S.tab,oD=window.Draw;S.tab='fire';window.Draw=function(){};try{ops.forEach(function(o){o();});var F=getFireState();if(d){F.rd=d[0];F.wd=d[1];F.res=null;var oT=showToast,oM=showMissingModal;showToast=function(){};showMissingModal=function(){};try{FJUDGE();}finally{showToast=oT;showMissingModal=oM;}}}finally{S.tab=t0;window.Draw=oD;}
   return T_snap();};
});
const cases=[
 ['A pfph 素', "pfph", [], [], [3,2]],
 ['B pfph PIN#1 混乱#2 TEM石造 妨害+2 高さ firer 指揮官なし', "pfph",
   ["()=>mfIjUs(0,'pin')","()=>mfIjUs(1,'brk')","()=>mfIjFx('tem',{id:'stone_bld',v:3})","()=>mfIjFx('hin',2)","()=>mfIjFx('elev','firer')","()=>mfIjFx('ldr','none')"],
   ["()=>FgPickItemPin(getFireState().grps[0].id,0)","()=>FgPickItemBroken(getFireState().grps[0].id,1)","()=>FtemSet('stone_bld',3)","()=>Fset('hinder',2)","()=>Fset('elev','firer')","()=>FsetLdrPresent(0,false)"],[4,3]],
 ['C dff FFMO+FFNAM SFF HIP 撃つ側積み重ね+1', "dff",
   ["()=>mfIjFx('ffmo',true)","()=>mfIjFx('ffnam',true)","()=>mfIjFx('mode','SFF')","()=>mfIjFx('hip',true)","()=>mfIjFx('ovrA',1)"],
   ["()=>Ftog('ffmo')","()=>Ftog('ffnam')","()=>FsetMode('SFF')","()=>Ftog('tgtHIP')","()=>FovrSet('ovrAtkAdd',1)"],[2,5]],
 ['D dff 危険移動 FPF CX#1 指揮官-1', "dff",
   ["()=>mfIjFx('haz',true)","()=>mfIjFx('mode','FPF')","()=>mfIjUs(0,'cx')","()=>mfIjFx('ldr',-1)"],
   ["()=>Ftog('hazardous')","()=>FsetMode('FPF')","()=>FgPickItemCX(getFireState().grps[0].id,0)","()=>FsetLdrPresent(-1,true)"],[1,4]],
 ['E dff Snap Shot 壁', "dff",["()=>mfIjFx('snap',true)","()=>mfIjFx('snapHex',2)"],["()=>ASLF_set('aslSnap')","()=>ASLF_num('aslSnapHex',2)"],[3,3]],
 ['F dfph 最終射撃 林 煙幕1 自煙', "dfph",["()=>mfIjFx('exFire',true)","()=>mfIjFx('tem',{id:'woods',v:1})","()=>mfIjLos('smk',1)","()=>mfIjLosOwn('smk')"],
   ["()=>Fset('exFire',true)","()=>FtemSet('woods',1)","()=>FlosI('smk')","()=>FlosOwnSmokeToggle('smk')"],[5,6]],
 ['G pfph CE 乗員 LMG遠距離 Rider', "pfph",["()=>mfIjFx('tgtCrewCE',true)","()=>mfIjFxIn('swLong',getFireState().grps[0].sw[0],true)","()=>mfIjFx('mount','rider')"],
   ["()=>Ftog('tgtCrewCE')","()=>FswLongToggle(getFireState().grps[0].id,getFireState().grps[0].sw[0])","()=>ASLFULL_MOUNT_SET('aslMount','rider')"],[2,2]],
 ['H afph 準備射撃なし 指揮官+1 鹵獲', "afph",["()=>mfIjFx('afphPfphFired',false)","()=>mfIjFx('ldr',1)","()=>mfIjFxIn('cap',getFireState().grps[0].sw[0].replace(/_\\d+$/,''),true)"],
   ["()=>Fset('afphPfphFired',false)","()=>FsetLdrPresent(1,true)","()=>FswCap(getFireState().grps[0].sw[0].replace(/_\\d+$/,''))"],[6,5]],
];
for(const c of cases){
  const a=await p.evaluate(([ph,ops,d])=>JSON.stringify(T_spot(ph,ops.map(o=>eval(o)),d)),[c[1],c[2],c[4]]);
  const o=c[3]===null?null:await p.evaluate(([ph,ops,d])=>JSON.stringify(T_old(ph,ops.map(o=>eval(o)),d)),[c[1],c[3],c[4]]);
  const A=JSON.parse(a),O=JSON.parse(o);delete A.miss;delete O.miss;
  console.log((JSON.stringify(A)===JSON.stringify(O)?'SAME ':'DIFF ')+c[0]+'\n  spot '+JSON.stringify(A)+(JSON.stringify(A)===JSON.stringify(O)?'':'\n  old  '+JSON.stringify(O)));
}
// screenshot with more open
await p.evaluate(()=>{T_spot('dff',[()=>mfIjFx('ffmo',true)],[3,2]);MF_IJ.moreOpen=true;mfIjPh('dff');});await p.waitForTimeout(600);
await p.screenshot({path:'/tmp/w/t16_1.png'});
await p.evaluate(()=>{document.getElementById('mfIj2').scrollTop=900;});await p.waitForTimeout(300);await p.screenshot({path:'/tmp/w/t16_2.png'});
await p.evaluate(()=>{document.getElementById('mfIj2').scrollTop=2000;});await p.waitForTimeout(300);await p.screenshot({path:'/tmp/w/t16_3.png'});
// residual
console.log('resid',await p.evaluate(()=>{MF_IJ.fx={};mfIjPh('dff');mfIjFx('mode','RESID');mfIjRs('rfp',4);mfIjRs('tem',['woods',1]);mfIjRs('rd',2);mfIjRs('wd',3);return JSON.stringify(S.resid.res)+' miss='+JSON.stringify(MF_IJ.miss);}));
await p.waitForTimeout(300);await p.evaluate(()=>{document.getElementById('mfIj2').scrollTop=0;});await p.screenshot({path:'/tmp/w/t16_4.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
