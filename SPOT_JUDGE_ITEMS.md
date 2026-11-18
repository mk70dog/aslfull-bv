# スポット判定に作り込む設定の一覧(旧タブで対応できたことを全部)

2026-11-17 ダルマ指示「スポット判定は使用頻度が1番高いのでしっかり作り込む。旧タブの貼り付けは NG。SK3 のスポット判定同様に新規で作る。旧タブで対応できたことは全て対応するが貼り付けは禁止」。

旧タブ(射撃・砲撃・装甲戦闘車両・軽対戦車兵器)を状態を変えながら開き、画面に出たボタン・入力を全部集めた(dev/inv2.js 相当、約 320 項目)。
計算は旧タブの関数(状態 S.fire 等 → FJUDGE / GJUDGE_* / LATW_JUDGE_*)をそのまま使い、画面はスポット判定用に新しく作る。

凡例: 【自】=地図・カウンター・LOS から自動で入れる(手で直せる) / 【並】=ステップ2に並べる / 【た】=「その他の修正」(たたむ)に入れる

## 1. 共通(歩兵・砲・主砲・軽対戦車兵器)
| 項目 | 置き場所 | 旧タブの入力 |
|---|---|---|
| フェイズ(準備/臨機/防御/前進) | 【並】 | FIREsub / Gset(phase) / LATWset(phase) |
| 距離 | 【自】 | LOS の結果(手で直す欄も) |
| 地形の TEM(地形の種類: 開豁地・林・木造/石造建物・瓦礫・壁・生垣・たこつぼ・砲弾孔・トーチカ+1〜+7・AFV 同居・墓地/Crag/Debris・麦畑/果樹園/繁み・丘・据付) | 【自】+【並】 | FtemSet / GsetGunTEM / LATWsetTEM |
| LOS の妨害(果樹園・麦畑・繁み・煙幕・拡散煙幕・WP・拡散 WP・自軍の煙)と手入力 +0〜+8 | 【自】+【た】 | FlosI/D・Fset(hinder) / GlosI/D / LATWlosI/D |
| 高さ(同じ・射手が高い・目標が高い) | 【自】+【た】 | Fset(elev) / GsetDRM(elev) / LATWset(elev) |
| 目標の移動(FFMO −1・FFNAM −1・危険移動 −2) | 【並】(臨機) | Ftog / GsetTgtMove / LATWsetTgtMove |
| 目標は隠蔽(?)/HIP | 【た】 | Ftog(tgtHIP) / Gset(hipOpen) / LATWsetDRM(tgtConc, tgtHIP) |
| 目標は砲・目標は車両の乗員(CE)・目標ヘクスに CE の乗員 | 【並】 | Ftog(tgtIsGun, tgtCrewCE)・FselCrewVeh / GsetDRM(tgtIsGun, hexCECrew) |
| 目標の FT 保有数 | 【自】 | カウンターの SW から |
| ダイス(赤・白)・自動で振る | 【並】 | — |

## 2. 歩兵・SW の射撃(射撃タブ)
| 項目 | 置き場所 | 旧タブの入力 |
|---|---|---|
| 部隊ごとの状態 PIN・CX・混乱・負傷 | 【並】(カウンターごと) | FgPickItemPin / CX / Broken / Wound |
| 指揮官(自動/なし/値) | 【自】+【た】 | FsetLdrPresent・FgToggleLdrWith |
| SW の運搬/操作の担当・SW の遠距離 | 【自】+【た】 | FgSetSwOwner・FswLongToggle |
| 臨機の種類 DFF・SFF・FPF・残留 FP 攻撃 | 【並】(臨機) | FsetMode |
| 残留 FP 攻撃(残留 FP 値・目標地形・煙・FFMO/FFNAM・判定) | 【並】(残留 FP 攻撃のとき) | RSD・RSD2・RSD_los・RESID_JUDGE |
| 最終射撃(First Fire 状態からの射撃) | 【並】(防御) | Fset(exFire) |
| 前進射撃の確認(準備射撃の有無・MMG/HMG の移動) | 【並】(前進射) | Fset(afphPfphFired, afphMgMoved) |
| Spraying Fire・Snap Shot・Fire Lane | 【た】 | ASLF_set(aslSpray, aslSnap)・ASLF_lane |
| 乗車中の射撃(撃つ側・目標: トラック/装甲 HT の Passenger・Rider) | 【た】 | ASLFULL_MOUNT_SET |
| 積み重ねの超過(撃つ側・目標) | 【自】+【た】 | FovrSet |
| Bore Sighting(MMG・HMG) | 【た】 | ASLFULL_BORE_FSET |
| 複数ヘクスの FG(ヘクスごとの指揮官) | 【た】 | FmultiHexSet・FmultiHexAddHex |
| ROF(MG)・故障の DR・ROF を続ける | 【並】(結果のあと) | FJUDGE の結果 |

## 3. 砲・車両の主砲(砲撃・装甲戦闘車両タブ)
| 項目 | 置き場所 | 旧タブの入力 |
|---|---|---|
| 弾種(AP・APCR・APDS・HE・HEAT・Smoke・WP。欠乏・未供給の表示) | 【並】 | Gset(ammoType) |
| 目標の種類 ITT・VTT・ATT・ATT で目標ヘクスに AFV・空ヘクスを狙う +2 | 【並】 | Gset(tgtType)・GsetAttVeh・GsetDRM(areaEmptyHex) |
| 目標の車両・向き(地図から)・目標の移動(Case 24) | 【自】+【並】 | GselTgtVeh・GsetVehSel・GsetDRM(vehMoveDrm) |
| 射手: 停止・Bounding Fire・AFPh に移動した・Motion 状態 | 【並】 | GsetBoundingFire・GsetAfphMoved・VehSetMotion |
| CA の変更(ヘクス数 0〜3・砲塔/車体を回す) | 【並】 | GsetDRM(ca_hex, ca_vca) |
| Acquisition(なし・−1・−2)・Bore Sighting −2 | 【並】 | GsetDRM(acq)・ASLFULL_BORE_GSET |
| 集中射撃 | 【た】 | GsetDRM(intensive) |
| ハッチ(BU +1・CE)・恒久 +1(Stun の経験) | 【た】 | GsetDRM(firerBU)・GsetDRM(firerStunPlus1) |
| 射手の位置(開豁地など・林/建物の中=Case 2 倍) | 【自】+【た】 | GsetDRM(ca_terrain2x) |
| 無線なし AFV(D14)・MSA(使った MP・発射済み・LOS 外) | 【た】 | VehMsaSet |
| 乗員: Elite・未熟な乗員 +1・鹵獲使用・非正規操作・未熟兵 MMC・釘付け・CX・指揮官(砲) | 【た】 | ASLFULL_ELITE・ASLFULL_INEXP・GsetDRM(captured, non_qual, green_mtr, pinned, cx, leader)・GsetDRM(firerNat) |
| 迫撃砲: SMC 単独で撃つ・建物内(撃てない) | 【た】 | Gset(smcSoleMtr, inBuilding) |
| 牽引砲: Limbered Fire | 【た】 | ASLFULL_LF_SET |
| IFE(直接射撃・TH なし) | 【並】(撃つ武器の選択肢) | GsetIFEmode |
| 空中炸裂(目標は林/密林)・据付 | 【自】+【た】 | GsetDRM(tgtInWoods)・GsetGunTEM(emplaced) |
| 撃破判定: 乗員は CE(付随攻撃)・目標車両の装甲帯/OT(ATT の IFT) | 【自】+【並】 | GsetDRM(vehCE, vehAF, vehOT) |
| 車載機銃(CMG・BMG・RMG・AAMG の選択) | 【並】 | GsetFireGroupMg |
| ROF を続ける/放棄・弾薬欠乏・煙幕発射済みの手動解除 | 【並】(結果のあと)+【た】 | GRCcontinue・GRCwaive・GclearAmmoDepletedAll・Gset(nonSmokeFiredThisPhase) |
| 煙幕の発射装置の展張・始動判定(Motion Attempt) | 【た】 | GsetSmoke*・GsetMotionAttempt* |
| 結果のあとの MC(付随攻撃など) | 【並】(結果のあと) | MJUDGE・MS |

## 4. 軽対戦車兵器(軽対戦車兵器タブ)
| 項目 | 置き場所 | 旧タブの入力 |
|---|---|---|
| 武器(BAZ・PSK・PIAT・PF・ATR・FT など) | 【並】(撃つ武器) | LATWset(wepId) |
| 目標の種類(歩兵・砲・車両)・目標の車両・向き・目標の移動 | 【自】+【並】 | LATWset(tgtType)・LATWselTgtVeh・LATWsetVehSel・LATWsetDRM(vehMoveDrm) |
| 撃つ部隊(分隊/HS・SMC 2 名・SMC 単独は不可) | 【自】+【た】 | LATWset(firingUnit) |
| PF チェック(撃つ部隊・CX・すでに釘付け・dr)・PF のクラス(通常・新兵・徴集兵)・PF の数(ドイツ軍分隊数) | 【並】(PF のとき) | LATWset(pfUnit, pfCX, pfAlreadyPinned)・LATWpf_dr・LATWsetPFClass・PFTRset |
| 建物内(バックブラスト) | 【た】 | LATWset(inBuilding) |
| 鹵獲使用・CX・釘付け・指揮官 | 【た】 | LATWsetDRM(captured, cx, pinned, leader) |
| 目標が砲: 防盾(AT/INF・射界内・操作班が統制・非正規操作/人力移動中でない)・HIP | 【並】(目標が砲のとき) | LATWsetGunshield・LATWsetDRM(tgtHIP) |
