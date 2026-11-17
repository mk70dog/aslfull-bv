# ASLFULL(aslfull-bv)引き継ぎ HANDOFF.md

作業の区切りごと・版ごとに更新して push する。最初に SK3_UI_MIGRATION.md(指示書)を読む。

## 0. いまの作業
- 2026-11-17: SK3 アプリ(mk70dog/aslsk_3-exp1)の今の仕様にフル版を移す作業を開始。まだコードは変えていない。
- 現在の版: APP_VERSION "ASLFULL-v0.536"(旧タブ画面)。

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

## 6. 次の作業
- 順番③(スポット判定)。SK3 の nmIj* を読み、フル版の判定関数につなぐ所を確認してからサンプル画像。カウンター配置もここ。
