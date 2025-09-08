import {
    Stack,
    DialogContentText,
    useTheme
} from "@mui/material";
import {RuleNumCard} from "./rule-elements/RuleNumCard";
import ReactMarkdown from "react-markdown";
import * as React from "react";

const markdown = `
### 📗ルール
- 必ず 1 試合中に 1 人 1 回はボールに触れる。
- 先攻後攻は試合開始前にじゃんけんで決める。
- サーブはコートの右前の人が打つ。（アンダーサーブのみ）
- サーブがネットに当たった場合は、失点とする。
- ボールに触れる回数は 1 回の攻撃で 3 回までとし、同じ人が連続してボールに触れてはならない。
- 相手コートに入れると 1 点。
- ラリーポイント制。時間内に獲得した点数で勝敗を決定する。
- タッチネット、ブロックアウト、オーバーネットの判定が出た時は相手チームに１点。
- インかアウトかは真上から見てボールがラインにかかっているかどうかで判断する。
- チームの人数が 5 人以上の場合、得点が決まりサーブを打つまでの間のみ選手の交代を認める。
- 指定された試合で審判をする。（各チーム 2 人以上）
***
### ⚠️注意事項
- 審判の判定に従う。
- 次の試合が当たっているチームは第一体育館二階などで待機するようにすること。
`

export const RuleBeachball = () => {
    const theme = useTheme();
    return(
        <Stack
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            spacing={1}
            py={2}
            sx={{width:"100%"}}
        >
            <RuleNumCard title={"会場"} content={"第一体育館"}/>
            <RuleNumCard title={"試合時間"} content={"10分"}/>
            <RuleNumCard title={"順位決定法"} content={"勝ち点制"} sub={"勝ち3点・引き分け1点・負け0点　として合計点で順位を決定し、勝ち点が同じ場合、総得点数で順位を決定する。"}/>
            <RuleNumCard title={"部員ハンデ"} content={"1チームに2人まで"}/>
            <RuleNumCard title={"女子ハンデ"} content={"試合開始時に1人1点加算"}/>
            <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
                color={theme.palette.text.primary}
                lineHeight={"27px"}
            >
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </DialogContentText>
        </Stack>
    )
}