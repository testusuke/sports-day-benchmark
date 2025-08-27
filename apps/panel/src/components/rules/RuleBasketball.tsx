import {
    Stack,
    DialogContentText,
    useTheme
} from "@mui/material";
import {RuleNumCard} from "./rule-elements/RuleNumCard";
import ReactMarkdown from "react-markdown";
import * as React from "react";

const markdown = `
# 📗ルール
- 基本的にバスケットボールのルールに準ずるが、以下の点に注意すること。 
- フリースローはなしとする。
- ファールの場合、一番近いエンドラインからプレーを再開する。
- バスケットボール部は試合中、男女問わずビブスを着る。
- 24 秒ルール、8 秒ルールの秒数に関するルールはなしとするが、明らかな遅延行為（勝っているチームが自コートで長い時間ボールを回し合っているなど）があった場合、相手チームは最も近いエンドラインからプレーを再開する。
- トラベリング（3 歩以上ボールを持った状態で歩くこと）について、試合進行に支障をきたすため明らかに多いもの以外は反則をとらない場合がある。 
- ダブルドリブル(ドリブル中に両手が同時にボールに触れること、一度ドリブルをした後 再びドリブルをすること)について、試合進行に支障をきたすため明らかなもの以外は反則をとらない場合がある。 
- 前半と後半で陣地を交代する。


# 🥇順位決定法
- A,Bリーグに分かれて予選を行った後、両リーグ1位のチームで決勝戦を行う。
- 勝ち点制を採用し、勝ちを2点、引き分けを1点、負けを0点とし、合計点で順位を決定する。
- ＊各リーグで勝ち点が同じチームが複数あった場合＊
- 2チーム：両チームで試合を行う。(試合数:1)
- 3チーム：三つ巴で試合を行う。(試合数:3)s
- 4チーム以上：じゃんけんで試合する2チームを決める。


# ⚠️注意事項
- 審判の判定に従う。
- 試合開始10分前には試合場所に集合する
`

export const RuleBasketball = () => {
    const theme = useTheme();
    return(
        <>
            <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                spacing={1}
                py={2}
                sx={{maxWidth:"100%"}}
            >
                <RuleNumCard title={"会場"} content={"第二体育館"}/>
                <RuleNumCard title={"試合時間"} content={"10分"}/>
                <RuleNumCard title={"チーム人数"} content={"5人"}/>
                <RuleNumCard title={"部員ハンデ"} content={"通常　１点"} sub={"スリー　２点"}/>
                <RuleNumCard title={"女子ハンデ"} content={"通常　３点"} sub={"スリー　４点"}/>
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                    color={theme.palette.text.primary}
                    lineHeight={"27px"}
                >
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </DialogContentText>
            </Stack>
        </>
    )
}