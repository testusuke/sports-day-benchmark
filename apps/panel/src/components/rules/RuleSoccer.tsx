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
- 基本的にサッカーのルールに準ずるが、以下の点に注意すること。  
- シューズについて、スパイクは不可とする。ただしトレーニングシューズ(いわゆるトレシュー)やフットサルシューズは可とする。 
- 試合出場者は少ない方に合わせる。開始時に確認を行う。
- ゲーム中の交代は各自で行うこと。
- オフサイドはなしとする。   
- ファール、ハンドに関してはお互いに紳士ルールで動く。 
- フリーキック、PK は通常通り行う。 
- ボールが横（タッチライン）に出た場合は、スローインで始める。 


# 🥇順位決定法
- トーナメント形式で行う。
- 同点で試合が終了した場合は、各チームの代表者3名によるPK戦で勝者を決定する。もしも3人ずつのPK戦で決着がつかなかった場合は、4人目、5人目によるサドンデス方式とする。それでも決着がつかなかった場合は、じゃんけんで勝者を決定する。
（なお、敗者戦に関しては、同点で終了してもPK戦を実施しない。）
- 1回戦の敗者は、別の1回戦の敗者ともう１試合行う。



# ⚠️注意事項
- 審判の判定に従う。
- 試合開始10分前には試合場所に集合する
`

export const RuleSoccer = () => {
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
                <RuleNumCard title={"会場"} content={"グラウンド"} sub={"芝生 学校側"}/>
                <RuleNumCard title={"試合時間"} content={"12分"}/>
                <RuleNumCard title={"チーム人数"} content={"9〜11人"}/>
                <RuleNumCard title={"女子ハンデ"} content={"女子得点　３点"}/>
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