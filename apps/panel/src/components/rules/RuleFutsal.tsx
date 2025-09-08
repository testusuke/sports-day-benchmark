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
- 基本的にフットサルのルールに準ずるが、以下の点に注意する。
- キックオフは各チームの代表者によるじゃんけんで決める。
- ゴールキーパーがボールをキャッチした際、またはゴールキックとなる際は全てフリースローで行う。
- ボールがタッチラインを割ったら、ボールが出たところからキックインを行う。
- ファウルはその場からのフリーキックとする。
- オフサイドなし。
- 通常のゴールは 2 点。
- 選手交代はボールがタッチラインを割ったときや、ファウルでプレーが中断したときのみする。
***
### ⚠️注意事項
- 審判の判定に従う。
- スパイクの使用は禁止する。
`

export const RuleFutsal = () => {
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
            <RuleNumCard title={"会場"} content={"グラウンド"}/>
            <RuleNumCard title={"出場人数"} content={"5~8人"}/>
            <RuleNumCard title={"試合時間"} content={"8分"}/>
            <RuleNumCard title={"担当審判"} content={"サッカー部"}/>
            <RuleNumCard title={"順位決定法"} content={"リーグ戦では勝ち点制"} sub={"リーグに分かれて予選を行った後、 予選上位８チームで決勝トーナメントを行う。リーグ戦では勝ち点制を採用し、 勝ちを３点、引き分けを 1 点、負けを 0 点とし、合計で順位を決定する。"}/>
            <RuleNumCard title={"部員ハンデ"} content={""} sub={"サッカー部のゴールは 1 点とし、サッカー部員はコート内に 2 人までとする。また、部員は識別のためビブスを着用する。"}/>
            <RuleNumCard title={"女子ハンデ"} content={"ゴールすると3点"} sub={"女子サッカー部のゴールは 2 点"}/>
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