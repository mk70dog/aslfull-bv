# ASLFULL(aslfull-bv)引き継ぎ HANDOFF.md

作業の区切りごと・版ごとに更新して push する。最初に SK3_UI_MIGRATION.md(指示書)を読む。

## 0. いまの作業
- 2026-11-17: SK3 アプリ(mk70dog/aslsk_3-exp1)の今の仕様にフル版を移す作業を開始。まだコードは変えていない。
- 現在の版: APP_VERSION "ASLFULL-v0.542"。スポット判定の作り込み(SPOT_JUDGE_ITEMS.md)の 1・2 章が済み。次は 3 章(砲・車両の主砲)、4 章(軽対戦車兵器)。

## 1. ダルマの決定(2026-11-17)
- 移す範囲: マップ中心の画面・上段の盤・対戦モードまで全部(指示書 3-1 の D)。
- 移す順番: Claude に一任。
- **フル版もライト版仕様で作る**(SK3 の nmModeNow()='judge' 相当。リアルの地図とカウンターがメインで、アプリは判定中心。状態は判定画面で聞く)。状態をアプリが持つ online(フル)モードは今回は作らない。
- 対戦モード(BT_*)は Beyond Valor のシナリオ対象。**最後に実施**。
- メインメニューのライト・フル・AI対戦の切替は SK3 と同じ仕様(ダルマ 2026-11-17)。
- 旧タブは消さず、メインメニューから開ける。

## 2. 作業ルール
- 指示書 SK3_UI_MIGRATION.md の 0 章に従う(実施前にサンプル画像 → 「実施」の返事 → 実装。不明な指示は確認。ASL ルール原文厳守。原因は調べてから報告。返信は簡潔な日本語)。
- 見た目は SK3 の実物を Playwright で開いて getComputedStyle で実測した値を使う(SK3 HANDOFF 3.x)。実装後も1項目ずつ突き合わせる。

## 3. フル版と SK3 の差(調査結果 2026-11-17)
- SK3(main 8a18d14): index.html 約77MB・5.4万行。nm* 約1,500・bt* 約660関数。
- フル版: 約30MB・5万行。履歴に ASLSK3M-v11.01 があり、SK3 の旧タブ時代から分かれた版。
- フル版に nmFtMenuHTML・nmFtActFill・nmRMenuItems・nmHqOpen・nmIj*・BT_SCFG・btAI* は無い(丸ごと新規に入れる)。
- SK3 の判定の中身は SK ルール。フル版の画面からはフル版の判定関数につなぐ。ルールが違う所は移す前にダルマに確認。
- SK3 の BT_SCFG/btAI* は SK シナリオ向け。フル版は Beyond Valor 用に作り直し。

## 4. 移す順番(案・Claude 一任)
1. メインマップ+ツールバー+ステータスバー+メインメニュー(旧タブをメインメニューから開く)
2. ヘクスメニュー
3. スポット判定
4. 上段の盤(TACTICAL ELECTRONIC CALCULATOR → LOG/EN/AUTO/HELP と表示窓)
5. マルチ判定ボード
6. 対戦モード(Beyond Valor のシナリオ)

## 5. 版の記録
- v537(2026-11-17 ダルマ「実施」): 順番① メインマップ中心の画面。index.html 末尾に <script id="appFonts">(SK3 v1351 から M PLUS 1 Code/Noto を移植、約3.7MB)・<style id="mfCss">・<script id="mfUi"> を追加。
  - 起動すると MAP(S.tab='los')を全面に表示(html.mf-on)。#stickytop・#ftr・#main のマップ以外は隠す(固定ポップアップ=判定履歴などは出す)。
  - ツールバー #mfTools・ステータスバー #mfBot・メインメニュー #mfMn・旧タブの一覧 #mfOtPop。値は SK3 の #nmFullTabs/#nmFtBot/#nmFtMn を実測(実装後に getComputedStyle で突き合わせ済み)。アイコンは SK3 のものをそのまま。
  - 動くもの: ≡・戻す(UndoLast)・A→B(LosActivateABMode)・早見表/シナリオカード(旧タブの ref/scen を開く)・旧タブ・縮小/拡大/横幅/90°回転・ターン送り(TurnAdj)・勝利条件/SSR の小窓・メニューの判定履歴/シナリオ選択/マップクリア/システムログ/アプリ更新・ライト/フル/AI対戦の切替(localStorage aslfull_nmMode。フル・AI対戦の中身は後)。
  - まだ薄く表示(押すと「順番Nで作ります」): 判定(5)・部隊(2)・やり直す・見える範囲/同期/移動/マップ管理/バックアップ(2)・射撃/照準(3)。
  - 旧タブ: 右の「旧タブ」→ 一覧(MAP(旧)=旧タブ画面の MAP)。旧タブのタブ行「MAP」は「メインマップ」に名前を変え、押すとマップ中心の画面に戻る(NAVTAB を包んで MF.old を解除)。
  - A→B の結果は、スポット判定(順番③)ができるまで旧タブの結果カードを左上に出す(仮)。
  - 関数: mfSync(Draw と NAVTAB の後に毎回)・mfOld(t)・mfMenu・mfOtPop・mfTxtPop・mfTurn・mfLater。
  - 確認: Playwright 1180x820 で起動・BV130・メニュー・旧タブ往復・A→B・ターン送り・判定履歴、ページエラー0(外部フォントの読み込み失敗1件は以前から)。

- v538(2026-11-17 ダルマ「実施」・煙幕は「種類から選ぶ形」): 順番② ヘクスメニュー #mfRm(<style id="mfRmCss">・<script id="mfRmUi">)。マップを右クリック/長押し(550ms、8px 以上動いたら取り消し)で開く。開いた直後のクリックはマップに渡さない。
  - タップ位置のヘクスは LosMapClick の計算をそのまま使う(冒頭で window.MF_PROBE があれば {b,cr,gx,gy} を返して終わる 1 行を追加)。
  - 項目: カウンター配置(順番③まで薄く)・▸LOS・移動(起点A/目標B=S_LOS.pxA/pxB+LosRunPixel・取り消し・行軍=LosToggleRouteMode+同じ座標で LosMapClick・敵軍=losToggleEnemyHexAt)・残骸 −/＋(0〜3、S_LOS.wreckHexes)・煙幕(種類から)・火災(ASLFULL_FIRE_TAP: なし→Flame→Blaze→Blaze(上の階も))・マーク(S_LOS.buildingMarks)・情報(地形・高さ・LOS の扱い・残骸/煙/火災/敵軍)。
  - 煙幕: 対戦モード用にあった種類つきの煙(S_LOS.smk2、SMK_TYPES: 煙幕手榴弾+2・WP手榴弾+1・砲/OBA の煙 表+3/Dispersed+2・WP 表+2/Dispersed+1・車両の煙幕・車両の煙幕手榴弾、A24.1/24.3/24.5・C8.51・D13)を window.ASLFULL_SMK_API で外から使えるようにした。合計 +3 まで(A24.2、smkRebuild)。own は null(取り除く時期は手で)。
  - 見た目は SK3 #btRm .rmBox を実測(実装後に getComputedStyle で突き合わせ済み)。用語リンクで文字が縦に割れるので題名は .rmT で包む。
  - 確認: Playwright で BV130・右クリック/長押し・残骸・煙(手榴弾+2 → S_LOS.smoke に agg)・火災・マーク・A/B の LOS 判定・行軍・敵軍、ページエラー0。

- v539(2026-11-17 ダルマ「実施」・段取り ③-1/③-2・DRM は B=よく使う物+たたむ): ③-1 スポット判定(歩兵・SW の射撃)とカウンター配置。<style id="mfIjCss">・<script id="mfIjUi">。
  - カウンター配置: ヘクスメニュー「ヘクスにカウンターを配置」→ #mfPk(国籍・MMC・SMC・SW を −/＋)。S.mfCtr={'盤:col:row':{nat,u:{'mmc|5-2-7[1]':2},sw:{lmg26_so:1}}}(S と一緒に保存)。部隊はシナリオの OB(scenarioMmcListForNat・scenarioSmcListForNat・scenarioSWIds)、絵は ASLFULL_VASL_CNT。地図には losWreckHexOverlaySVG を包んで描く。ライト版なので状態(射撃済など)は持たない。
  - スポット判定: A→B が決まると自動で開く(閉じた A/B の組はもう一度は開かない)。ツールバーの射撃・照準ボタンからも開く。ステップ1 #mfIj(A/B のカウンター・国籍・地形のみ・入れ替え・マップを確認・A→B解除・クリア)→ ステップ2 #mfIj2(フェイズ・TEM・妨害・FP→列 DRM と内訳・赤白の目・🎲・CX・目標は砲/CE・DFF の目標の移動と射撃モード・DFPh の最終射撃・AFPh の確認・その他の修正=射撃タブで開く)。
  - 判定は射撃タブそのもの: S.fireSub=フェイズ、grps[0] に FgAddPickItem・SW は f.swc+FtogSW・担当は対戦モードと同じ割り当て(A7.35)・目標の FT 数・losAutoApplyToAllTabs → FJUDGE。足りない入力は showMissingModal を受けてパネルに出す。結果は res.ift(目標の MC などは盤上で)。
  - 確認: BV130 ソ 5-2-7×2+LMG(3盤Q2)→ 独 4-6-7(R2) PFPh: FP24(PBF)・LV+1 → DR3+2+1 = 4MC。DFF+FFMO: DRM 0(LV は FFMO を消さない E3.1)・DR4+4 畏縮で 20列 2MC。入れ替え・マップを確認・射撃タブで開く(同じ値)、ページエラー0。

- v540(2026-11-17 ダルマ「実施」・向きは「SK3 と同じ(地図から読み取り)」): ③-2 スポット判定(車両の主砲・車載機銃・砲・軽対戦車兵器)。
  - カウンター配置に 車両(scenarioAfvIdsByVehId)・砲(scenarioGunIds)・軽対戦車兵器(scenarioLatwIds) を追加。S.mfCtr の u に 'afv|afv_pz4d_ge'・'gun|g_50pak38_ge'・'latw|atr'。絵は vSrc(ASLFULL_VASL_CTR/TAB/CNT の map → どの表の imgs でも探す)。
  - 向き: S.mfCtr[hex].face[afvId]={v:VCA,t:TCA}(ヘクスの頂点 0〜5。spines() で頂点の角度を求める)。#mfFc で地図の見た目どおりの 6 頂点から選ぶ。地図のカウンターは VCA に回して描き、TCA は金の線。
  - 面は D3.2 どおり自動: LOS が通る辺で前面(±60°)/側面/後面、頂点に沿う時は撃つ側に一番不利な面(前面/側面)、同じヘクスは命中 DR の色付きの目(1-2 後面・3-4 側面・5-6 前面)。砲塔への命中は TCA で(D3.1)。未設定は前面として判定+警告(SK3 と同じ)。
  - 判定: 主砲・砲=S.gun(Gset('gunId')・GselTgtVeh・tgtVehFacing・vehMoveDrm(Case 24)・boundingFire → GJUDGE_TH → 命中の場所 C3.9 の面を入れて GJUDGE_TK/GJUDGE_HE_HEAT_TK/GJUDGE_IFT)、車載機銃=fireGroupWeapons → GJUDGE_FIRE_GROUP_MG(歩兵が目標のときだけ。車両への MG の TK はタブで)、軽対戦車兵器=S.latw(LATWset・LATWselTgtVeh → LATW_JUDGE_TH → LATW_JUDGE_IFT、PF は LATW_PF_CHECK)。
  - タブの画面を作る関数(GUN_PAGE/LATW_PAGE)を表示せずに呼んで、タブと同じ状態(目標の大きさ・装甲など)にしてから判定する。その間は S.tab を一時的に変え、window.Draw を止める(withTab。止めないとマップ中心の画面が外れる)。alert・showMissingModal は受け取ってパネルに出す(quiet)。
  - 確認(Playwright・ページエラー0): BV127 Ⅳ号D→KV-2 AP 砲塔前面 AF11 TK#−1 効果なし・HE 車体・KV-2 の機銃→歩兵 FP8 1MC・ソ ATR→Ⅳ号D 砲塔 TK#4 DR3 撃破、BV128 PaK38→T-26 車体前面 TK#11 DR6 撃破。頂点に沿う LOS(Q2→S2)で 6 方向の面=前前前側後側(D3.2 の不利な方)。
  - 一度閉じた A/B の組は自動で開かない(ツールバーの射撃で開く)。A→B を消すとその記録も消す。

- v541(2026-11-17 ダルマ「スポット判定は使用頻度が1番高いのでしっかり作り込む。旧タブの貼り付けは NG。旧タブでできたことは全部」→ 一覧 SPOT_JUDGE_ITEMS.md とサンプル sample-ui6 に「実施」): スポット判定の 1・2 章(歩兵・SW の射撃)。
  - 「その他の修正」の「射撃タブで開く」を外し、旧射撃タブの設定を全部スポット判定の画面で新しく作った(旧タブの HTML は使っていない)。計算は旧タブの関数のまま(FJUDGE・RCJUDGE・RESID_JUDGE)。
  - 状態: 選んだ値は MF_IJ.fx(絶対値)。A→B・A のカウンター・フェイズが変わるたび prep() → applyFx() で射撃の状態を作り直す。入れ方は旧タブの設定関数と同じ排他・解除(危険移動⇔FFMO/FFNAM、CE 乗員⇔砲・FT、FFMO が使えない地形、Snap⇔Spray、FsetMode の FPF/SFF の付随の動き)。新しい A→B・入れ替えで MF_IJ.fx を空に。
  - ステップ2 左: 臨機の種類(DFF/SFF/FPF/残留 FP 攻撃)・最終射撃・AFPh の確認と突撃射撃・部隊ごとの PIN/CX/混乱/負傷(SMC)・目標の移動(FFMO と FFNAM は重ねられる。v539 は 1 つしか選べなかったのを直した)・目標の地形(よく使う 4 つ)。
  - 右: FP→列・DRM と内訳・結果・故障/除去・ROF(続けて撃つ/放棄/まとめて続ける → ROF の続きのパネル: ダイス・もう一度・ここで放棄・終える)・残留 FP・Fire Lane・Spraying の 2 つ目・目標が砲(KIA/K/至近弾は防盾で再判定)・HIP 維持。
  - 「その他の修正」(たたむ、選んでいる物を見出しに表示): 地形・LOS(TEM_LIST 全部・トーチカ +1〜+7・LOS_OBS の数と自分のヘクスの煙・手で足す妨害 +0〜+8・高さ・稜線越えの例外)/撃つ側(指揮官 自動/なし/−3〜+1・SW ごとの担当/遠距離/鹵獲・Snap Shot とヘクス辺・Spraying Fire と 2 つ目・Fire Lane・乗車中 D6・積み重ねの超過・Bore Sighting・複数ヘクスの FG)/目標(隠蔽/HIP・A9.4 の ½なし・目標は砲(B の砲を自動)と防盾・CE の乗員(B の車両を自動)と砲塔後面・FT の数・乗っている目標 D6)。
  - 残留 FP 攻撃: S.resid(残留 FP 値・目標の地形・煙幕・FFMO/FFNAM)→ RESID_JUDGE。
  - 旧タブの不具合を 1 つ直した: ROF の続き(swEffectiveSh)が自動モードで隣接でも PBF にならなかった。隣接 PBF・同ヘクス TPBF(A7.21・A7.211、通常の射撃の fgRangeSuggestSh と同じ)。
  - 確認(Playwright・ページエラー0): 同じ設定を旧タブの設定関数で入れた結果と FP・DRM・妨害・指揮官・列・結果が一致(BV130 ソ 5-2-7×2+9-1+LMG→独 4-6-7: 素/PIN+混乱+石造+妨害+2+高さ+指揮官なし/FFMO+FFNAM+SFF+HIP+積み重ね/危険移動+FPF+CX+指揮官−1/Snap+壁/最終射撃+林+煙+自煙/CE 乗員+LMG 遠距離+Rider/AFPh+指揮官+1+鹵獲。独 4-6-7+8-1+MMG: Spraying・複数ヘクス・Fire Lane・Bore(このシナリオは使えない=どちらも DRM 変わらず)。BV128 ソ→PaK38: 目標は砲+防盾・AFPh 突撃射撃なし)。ROF の続き MMG 隣接 FP10 DR5 2MC。残留 FP 4・林・DR2+3 → MC。
  - 道具: dev/inv_tabs.js(旧タブのボタンを集める)・SPOT_JUDGE_ITEMS.md(一覧)を main に入れた。

- v542(2026-11-18 ダルマ「目標の地形・LOS 妨害が見にくい。まとめて操作しやすく」→ サンプル sample-ui7 に「実施」): スポット判定(歩兵・SW)の「その他の修正」の見た目。
  - 「その他の修正」: 右の列(ダイスの下)のボタン mfIjMore() で開閉。選んでいる修正を見出しに ●。開くとパネルの全幅に #ij2MoreBody を出して、そこまでスクロール。
  - 目標の地形: 枠 .ij2Box にタイル .ij2Tl(TEM_LIST 全部・自動(地図)・トーチカ等は −/＋)。見出しに今の値(地図から/手で選んだ)。
  - LOS の妨害: 枠に 3 列のタイル .ij2St(LOS_OBS ごとに −/数/＋・煙は「自」・そのほか(LV など)も −/＋)。数が入ると金の枠。見出しに合計(fireHindTotal)。手で変えると「↺ 自動に戻す」。高さ・稜線越えも同じ枠。関数 terrLosHTML。
  - 撃つ側・目標は左右 2 列。計算は v541 と同じ(Playwright の旧タブとの一致テストは同じ結果)。

## 6. 次の作業
- スポット判定の作り込み 3 章(砲・車両の主砲): ordHTML の「その他の修正」(今はタブへのリンク)を、SPOT_JUDGE_ITEMS.md 3 章の設定で新しく作る。同じやり方(IJ.fx 相当 → gPrep の後に入れる、旧タブの設定関数と一致を Playwright で確認)。
- 4 章(軽対戦車兵器)。車載機銃で車両を撃つ(MG の TK)もここで。
- ④ 上段の盤はダルマ「旧タブは基本使わない・いずれ非表示」により取りやめ。
- 残り: 判定ボード(⑤)、対戦モード(⑥・最後)。旧タブの非表示はダルマの指示のあとで。
