const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV127');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(1000);
console.log(await p.evaluate(()=>JSON.stringify(scenarioLatwIds())));
await p.evaluate(()=>{mfCtrSet('3:16:1','SOV','latw','atr',1);mfCtrSet('3:18:1','GER','afv','afv_pz4d_ge',1);});
await p.click('#mfTools button[title="タップしたヘクスを起点(A)にする"]');await p.waitForTimeout(400);await p.mouse.click(560,470);await p.waitForTimeout(600);await p.mouse.click(640,470);await p.waitForTimeout(2500);
await p.evaluate(()=>{mfIjStep2();mfIjPh('pfph');});await p.waitForTimeout(1500);
console.log('sh',await p.evaluate(()=>JSON.stringify(MF_IJ.sh)),'avail',await p.evaluate(()=>Object.keys(MF_IJ.gAv||{}).filter(k=>/^LATW|^PFTR/.test(k)).join(' ')));
await p.evaluate(()=>{window.T_l=function(){var L=S.latw;var dr=null;try{dr=latwTotalDRM?latwTotalDRM():null;}catch(e){}return {tem:[L.drm.temId,L.drm.tem],hin:latwHindTotal(),elev:L.elev,tt:L.tgtType,th:L.th_result?[L.th_result.hit,L.th_result.modDr,L.th_result.thNum,L.th_result.drm]:null};};
 window.T_spotL=function(ops,d){MF_IJ.gx={};MF_IJ.gReset=true;MF_IJ.dirty=true;MF_IJ.ltt=null;mfIjPh('pfph');ops.forEach(o=>o());if(d){mfIjDie2('th','r',d[0]);mfIjDie2('th','w',d[1]);}var r=T_l();r.miss=MF_IJ.miss;return r;};
 window.T_oldL=function(ops,d){MF_IJ.gx={};MF_IJ.gReset=true;MF_IJ.dirty=true;MF_IJ.ltt=null;mfIjPh('pfph');var t0=S.tab,oD=window.Draw;S.tab='latw';window.Draw=function(){};var mm=[],oM=showMissingModal,oT=showToast,oA=window.alert;showMissingModal=function(a){mm.push(JSON.stringify(a).slice(0,200));};showToast=function(a){mm.push(String(a).slice(0,200));};window.alert=function(a){mm.push(String(a).slice(0,200));};try{ops.forEach(o=>o());try{LATW_PAGE();}catch(e){}if(d){S.latw.rd=d[0];S.latw.wd=d[1];LATW_JUDGE_TH();}}finally{S.tab=t0;window.Draw=oD;showMissingModal=oM;showToast=oT;window.alert=oA;}var r=T_l();r.miss=mm.length?mm:null;return r;};});
const cases=[
 ['素',[],[],[2,3]],
 ['CX+PIN+指揮官-1',["()=>mfIjG('LATWsetDRM','cx',true)","()=>mfIjG('LATWsetDRM','pinned',true)","()=>mfIjG('LATWsetDRM','leader',-1)"],["()=>LATWsetDRM('cx',true)","()=>LATWsetDRM('pinned',true)","()=>LATWsetDRM('leader',-1)"],[3,3]],
 ['林+麦畑1+高さ目標+Case24 +3',["()=>mfIjGx('tem',{id:'woods',v:1})","()=>mfIjGx('los',{id:'wht',d:1})","()=>mfIjGx('elev','target')","()=>mfIjG('LATWsetDRM','vehMoveDrm',3)"],["()=>LATWsetTEM('woods',1)","()=>LATWlosI('wht')","()=>LATWset('elev','target')","()=>LATWsetDRM('vehMoveDrm',3)"],[1,4]],
];
for(const c of cases){
  let A=JSON.parse(await p.evaluate(([o,d])=>JSON.stringify(T_spotL(o.map(x=>eval(x)),d)),[c[1],c[3]]));
  let O=JSON.parse(await p.evaluate(([o,d])=>JSON.stringify(T_oldL(o.map(x=>eval(x)),d)),[c[2],c[3]]));
  const am=A.miss,om=O.miss;delete A.miss;delete O.miss;if(am||om)console.log('  miss',JSON.stringify(am),JSON.stringify(om));
  console.log((JSON.stringify(A)===JSON.stringify(O)?'SAME ':'DIFF ')+c[0]+'\n  spot '+JSON.stringify(A)+(JSON.stringify(A)===JSON.stringify(O)?'':'\n  old  '+JSON.stringify(O)));
}
const sh=async(n,top)=>{await p.evaluate(t=>{document.getElementById('mfIj2').scrollTop=t;},top);await p.waitForTimeout(300);await p.screenshot({path:'/home/claude/aslfull-bv/samples/sample-ui9-'+n+'.png'});};
await p.evaluate(()=>{T_spotL([],[2,3]);var r=S.latw.th_result;if(r&&r.hit){mfIjDie2('ift','r',3);mfIjDie2('ift','w',4);}});await sh('1-top',0);
await p.evaluate(()=>{mfIjMore();});await p.waitForTimeout(300);
const t=await p.evaluate(()=>{var e=document.getElementById('mfIj2'),d=document.getElementById('ij2MoreBody');return d.getBoundingClientRect().top-e.getBoundingClientRect().top+e.scrollTop;});
await sh('2-terrain',t-10);await sh('3-firer-target',t+520);
console.log('ERR',E.length,E.join('\n'));await b.close();})();
