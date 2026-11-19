const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,300)));
await p.goto('file:///home/claude/aslfull-bv/index.html',{timeout:240000});await p.waitForTimeout(6000);
await p.evaluate(()=>{SSEL('BV130');});await p.waitForTimeout(1500);await p.evaluate(()=>LosFitWidth());await p.waitForTimeout(800);
const chk=async(name)=>await p.evaluate((name)=>{var bad={};var KW={event:1,this:1,true:1,false:1,null:1,undefined:1,var:1,function:1,return:1,if:1,else:1,new:1,typeof:1,Math:1,document:1,window:1,parseInt:1,String:1,Number:1,JSON:1};
  document.querySelectorAll('[onclick]').forEach(function(el){var c=el.getAttribute('onclick')||'';c=c.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,'""');var dec={};c.replace(/var\s+([\w$]+)/g,function(_,v){dec[v]=1;});var re=/(^|[^.\w$])([A-Za-z_$][\w$]*)/g,m;while((m=re.exec(c))){var id=m[2];if(KW[id]||dec[id])continue;if(/^\d/.test(id))continue;if(typeof window[id]==='undefined'){bad[id]=(bad[id]||0)+1;if(!window._ex)window._ex={};if(!window._ex[id])window._ex[id]=c.slice(0,120);}}});return name+': '+JSON.stringify(bad)+' '+JSON.stringify(window._ex||{});},name);
const steps=[
 ['hq',()=>{mfHqOpen();}],
 ['spot',()=>{mfHqGo('spot');}],
 ['mc',()=>{mfIjClose&&mfIjClose();mfHqGo('mc');}],
 ['mc2',()=>{mfMgPick('mmc|4-6-7[1]',1);mfMgPick('smc|9-1',1);mfMgGo();}],
 ['rally',()=>{mfMcClose&&mfMcClose();mfHqGo('rally');}],
 ['rally2',()=>{mfRyPick('mmc|4-6-7[1]',1);mfRyPick('smc|9-1',1);mfRyGo();}],
 ['repair',()=>{mfRyMode('repair');}],['recover',()=>{mfRyMode('recover');}],
 ['ccm',()=>{mfCcOpen();}],['cc',()=>{mfCcOpen('inf');mfCcNat('A','GER');mfCcPick('A','mmc|4-6-7[1]',2);mfCcPick('A','smc|9-1',1);mfCcPick('D','mmc|5-2-7[1]',1);mfCcGo();}],
 ['veh',()=>{mfCcOpen('veh');}],['va',()=>{mfCcOpen('va');}],['pa',()=>{mfCcOpen('pa');mfPaNat('GER');mfPaPick('4-6-7[1]',1);}],['ve',()=>{mfVeOpen();}],
 ['dc',()=>{mfDcOpen();mfDcSet('u','4-6-7[1]');mfDcSet('surv','ok');}],
 ['rout',()=>{mfRyClose();mfHqGo('rout');MF_RT_TAP('4',5,3);MF_RT_TAP('4',2,3);}],['routP',()=>{mfRtInt();}],['bog',()=>{mfRyClose();mfHqGo('bog');mfBgSet('cr',4);mfBgSet('wh',3);}],['unbog',()=>{mfBgSet('mode','un');}],['smk',()=>{mfRyClose();mfHqGo('smk');mfSkSet('nat','GER');mfSkSet('u','4-6-7[1]');}],['smk2',()=>{mfSkSet('kind','disp');mfSkSet('v','afv_psw2318_ge');}],['smk3',()=>{mfSkSet('kind','vgren');}],['mh',()=>{mfRyClose();mfHqGo('mh');mfMhCnt('4-6-7[1]',1);}],['mh2',()=>{mfMhSet('step',2);}],['oba',()=>{mfRyClose();SSEL('BV132');mfHqGo('oba');mfObCt(5);mfOb('DRAW',0,'B');mfOb('AR',0);}],['oba2',()=>{var s=MF_OB.s();s.m.st='FFE1';mfObSet('i',0);}],['bt',()=>{mfRyClose();localStorage.setItem('aslfull_nmMode','judge');SSEL('BV126');mfModeSet('ai');mfBtArm(0,'4-4-7[1]');MF_BT_TAP('1',23,4);mfBtSync();}],['bt2',()=>{mfBtStart(1);var s=S.solo.stacks[0];mfBtSel(s.id);mfBtMenu();}]];
for(const [n,f] of steps){try{await p.evaluate(f);}catch(e){console.log(n,'ERR',String(e).slice(0,120));}await p.waitForTimeout(400);console.log(await chk(n));}
console.log('ERR',E.length,E.join('\n'));await b.close();})();
