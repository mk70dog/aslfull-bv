const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(1000);
console.log(await p.evaluate(()=>JSON.stringify(scenarioSmcListForNat('GER').map(x=>x.lbl))));
await p.evaluate(()=>{S.mfCtr={'3:16:1':{nat:'GER',u:{'mmc|4-6-7[1]':1,'smc|8-1':1},sw:{mmg512_ge:1}},'3:17:2':{nat:'SOV',u:{'mmc|5-2-7[1]':1},sw:{}}};Draw();});
await p.click('#mfTools button[title="タップしたヘクスを起点(A)にする"]');await p.waitForTimeout(400);
await p.mouse.click(560,470);await p.waitForTimeout(600);await p.mouse.click(610,500);await p.waitForTimeout(2500);
await p.evaluate(()=>mfIjStep2());await p.waitForTimeout(500);
await p.evaluate(()=>{
 window.T_snap=function(){var F=getFireState();return {fp:totalFP(F,F.ph),drm:fireDRM(F),ldr:[F.ldrPresent,F.ldr],bore:F.aslBore,spray:F.aslSpray,res:F.res&&F.res.ift?[F.res.ift.col,F.res.ift.r,F.res.mod,(F.res.swr||[]).map(s=>s.ro),F.res.aslSpray2&&F.res.aslSpray2.mod]:null};};
 window.T_spot=function(ph,ops,d){MF_IJ.fx={};MF_IJ.fxStk=null;mfIjPh(ph);ops.forEach(function(o){o();});if(d){mfIjDie('rd',d[0]);mfIjDie('wd',d[1]);}return T_snap();};
 window.T_old=function(ph,ops,d){MF_IJ.fx={};MF_IJ.fxStk=null;mfIjPh(ph);var t0=S.tab,oD=window.Draw;S.tab='fire';window.Draw=function(){};try{ops.forEach(function(o){o();});var F=getFireState();if(d){F.rd=d[0];F.wd=d[1];F.res=null;var oT=showToast,oM=showMissingModal;showToast=function(){};showMissingModal=function(){};try{FJUDGE();}finally{showToast=oT;showMissingModal=oM;}}}finally{S.tab=t0;window.Draw=oD;}return T_snap();};
});
const cases=[
 ['dff Bore', 'dff',["()=>mfIjFx('bore',true)"],["()=>ASLFULL_BORE_FSET(true)"],[1,3]],
 ['dff Spray', 'dff',["()=>mfIjFx('spray',true)","()=>mfIjFxIn('spray2','tem',2)","()=>mfIjFxIn('spray2','hinder',1)"],["()=>ASLF_set('aslSpray')","()=>ASLF_s2('tem',2)","()=>ASLF_s2('hinder',1)"],[2,4]],
 ['pfph 複数ヘクス 2つ目 0', 'pfph',["()=>mfIjMh('on')","()=>mfIjMh('set',1,'ldr',0)","()=>mfIjMh('set',1,'present',true)"],["()=>FmultiHexToggle(true)","()=>FmultiHexAddHex()","()=>FmultiHexSet(1,true,0)"],[3,4]],
 ['dff Fire Lane', 'dff',["()=>mfIjFxIn('lane',getFireState().grps[0].sw[0],true)"],["()=>ASLF_lane(getFireState().grps[0].sw[0])"],[2,5]],
];
for(const c of cases){
  const A=JSON.parse(await p.evaluate(([ph,ops,d])=>JSON.stringify(T_spot(ph,ops.map(o=>eval(o)),d)),[c[1],c[2],c[4]]));
  const O=JSON.parse(await p.evaluate(([ph,ops,d])=>JSON.stringify(T_old(ph,ops.map(o=>eval(o)),d)),[c[1],c[3],c[4]]));
  console.log((JSON.stringify(A)===JSON.stringify(O)?'SAME ':'DIFF ')+c[0]+'\n  spot '+JSON.stringify(A)+(JSON.stringify(A)===JSON.stringify(O)?'':'\n  old  '+JSON.stringify(O)));
}
// ROF chain
console.log('rof',await p.evaluate(()=>{T_spot('dff',[],[1,4]);var F=getFireState();var s=F.res.swr[0];mfIjRof('start',s.uid);var a=JSON.stringify({act:F.rofActiveUid});mfIjRof('die',['rd',2]);mfIjRof('die',['wd',3]);var c=F.rofChains[F.rofActiveUid];return a+' '+JSON.stringify(c.res&&{r:c.res.ift.r,mod:c.res.mod,roOk:c.res.roOk})+' miss='+JSON.stringify(MF_IJ.miss);}));
await p.waitForTimeout(500);await p.screenshot({path:'/tmp/w/t17_rof.png'});
console.log('end',await p.evaluate(()=>{mfIjRof('end');var F=getFireState();return JSON.stringify({act:F.rofActiveUid,n:Object.keys(F.rofChains||{}).length});}));
await p.evaluate(()=>{T_spot('dff',[()=>mfIjFx('spray',true)],null);MF_IJ.moreOpen=true;});await p.evaluate(()=>{mfIjFx('hip',true);document.getElementById('mfIj2').scrollTop=1300;});await p.waitForTimeout(400);await p.screenshot({path:'/tmp/w/t17_more.png'});
console.log('ERR',E.length,E.join('\n'));await b.close();})();
