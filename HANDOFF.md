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

## 5. 次の作業
- 順番 1 のサンプル画像(samples/sample-ui1-map.png、ブランチ sample-ui1)を提示済み。「実施」の返事待ち(メインメニュー入りは samples/sample-ui1-menu.png)。サンプルは SK3 の #nmFullTabs(右の縦バー 56px)・#nmFtBot(下のバー 48px)の実測値(背景 rgb(10,12,20)・ボタン角丸3px 縦グラデ・下バーのカード背景 rgb(20,26,34) 枠 rgb(44,54,68) 角丸8px・フォント M PLUS 1 Code)で作成。中身(ボタンの並び・下バーの文言)は仮。
