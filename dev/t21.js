const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV127');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(1000);
await p.evaluate(()=>{mfCtrSet('3:16:1','GER','afv','afv_pz4d_ge',1);mfCtrSet('3:18:1','SOV','afv','afv_kv2_sov',1);});
await p.click('#mfTools button[title="タップしたヘクスを起点(A)にする"]');await p.waitForTimeout(400);await p.mouse.click(560,470);await p.waitForTimeout(600);await p.mouse.click(640,470);await p.waitForTimeout(2500);
await p.evaluate(()=>{mfIjStep2();mfIjPh('pfph');});await p.waitForTimeout(1500);
console.log('avail',await p.evaluate(()=>Object.keys(MF_IJ.gAv||{}).filter(k=>k.indexOf(':')>0||/^(Gset[A-Z]|Veh|ASLFULL|GRC|Gclear)/.test(k)).join(' ')));
const sh=async(n,top)=>{await p.evaluate(t=>{document.getElementById('mfIj2').scrollTop=t;},top);await p.waitForTimeout(300);await p.screenshot({path:'/home/claude/aslfull-bv/samples/sample-ui8-'+n+'.png'});};
await p.evaluate(()=>{window.T_g=function(){var g=S.gun;return {tem:[g.drm.temId,g.drm.tem],hin:gunHindTotal(),drm:gunTotalDRM(),th:g.th_result?[g.th_result.hit,g.th_result.modDr,g.th_result.thNum]:null};};
 window.T_clr=function(){var t0=S.tab,oD=window.Draw;S.tab='afv';window.Draw=function(){};try{GclearAmmoDepletedAll();}catch(e){}S.tab=t0;window.Draw=oD;};window.T_spotG=function(ops,d){T_clr();MF_IJ.gx={};MF_IJ.gReset=true;MF_IJ.dirty=true;mfIjPh('pfph');ops.forEach(o=>o());var pre=T_g();if(d){mfIjDie2('th','r',d[0]);mfIjDie2('th','w',d[1]);}pre.th=T_g().th;pre.miss=MF_IJ.miss;return pre;};
 window.T_oldG=function(ops,d){T_clr();MF_IJ.gx={};MF_IJ.gReset=true;MF_IJ.dirty=true;mfIjPh('pfph');var t0=S.tab,oD=window.Draw;S.tab='afv';window.Draw=function(){};var pre,mm=[];var oM=showMissingModal,oT=showToast;showMissingModal=function(a){mm.push(JSON.stringify(a).slice(0,200));};showToast=function(a){mm.push(String(a).slice(0,200));};try{ops.forEach(o=>o());try{GUN_PAGE();}catch(e){}pre=T_g();if(d){S.gun.rd=d[0];S.gun.wd=d[1];GJUDGE_TH();}}finally{S.tab=t0;window.Draw=oD;showMissingModal=oM;showToast=oT;}pre.th=T_g().th;pre.miss=mm.length?mm:null;return pre;};});
const cases=[
 ['素',[],[],[3,4]],
 ['集中+BU+CA1(TCA)+捕捉-1',["()=>mfIjG('GsetDRM','intensive',true)","()=>mfIjG('GsetDRM','firerBU',true)","()=>mfIjG('GsetDRM','ca_hex',1)","()=>mfIjAcq(-1)"],["()=>GsetDRM('intensive',true)","()=>GsetDRM('firerBU',true)","()=>GsetDRM('ca_hex',1)","()=>GACQ_SET(-1)"],[4,4]],
 ['地形 石造+妨害 煙+2+高さ',["()=>mfIjGx('tem',{id:'stone_bld',v:3})","()=>mfIjGx('los',{id:'smk',d:1})","()=>mfIjGx('elev','firer')"],["()=>GsetGunTEM('stone_bld',3)","()=>GlosI('smk')","()=>GsetDRM('elev','firer')"],[2,5]],
 ['恒久+1 未熟 国籍ソ',["()=>mfIjG('GsetDRM','firerStunPlus1',true)","()=>mfIjG('ASLFULL_INEXP',true)","()=>mfIjG('GsetDRM','firerNat','SOV')"],["()=>GsetDRM('firerStunPlus1',true)","()=>ASLFULL_INEXP(true)","()=>GsetDRM('firerNat','SOV')"],[3,3]],
];
for(const c of cases){
  let A=JSON.parse(await p.evaluate(([o,d])=>JSON.stringify(T_spotG(o.map(x=>eval(x)),d)),[c[1],c[3]]));
  await p.evaluate(()=>{S.aslInexp=false;});
  let O=JSON.parse(await p.evaluate(([o,d])=>JSON.stringify(T_oldG(o.map(x=>eval(x)),d)),[c[2],c[3]]));
  await p.evaluate(()=>{S.aslInexp=false;});
  const am=A.miss,om=O.miss;delete A.miss;delete O.miss;if(am||om)console.log('  miss spot',JSON.stringify(am),'old',JSON.stringify(om));
  console.log((JSON.stringify(A)===JSON.stringify(O)?'SAME ':'DIFF ')+c[0]+'\n  spot '+JSON.stringify(A)+(JSON.stringify(A)===JSON.stringify(O)?'':'\n  old  '+JSON.stringify(O)));
}
await p.evaluate(()=>{T_spotG([()=>mfIjG('GsetDRM','ca_hex',1),()=>mfIjAcq(-1)],[2,4]);});await sh('1-top',0);
await p.evaluate(()=>{mfIjMore();});await p.waitForTimeout(400);
const t=await p.evaluate(()=>{var e=document.getElementById('mfIj2'),d=document.getElementById('ij2MoreBody');return d.getBoundingClientRect().top-e.getBoundingClientRect().top+e.scrollTop;});
await sh('2-terrain',t-10);await sh('3-firer-target',t+520);
console.log('ERR',E.length,E.join('\n'));await b.close();})();
