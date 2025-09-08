import {
    Stack,
    Typography,
    DialogContentText,
    useTheme
} from "@mui/material";
import {RuleNumCard} from "./rule-elements/RuleNumCard";
import ReactMarkdown from "react-markdown";
import * as React from "react";

const markdown = `
### 📗ルール
- 必ず 1 試合中に 1 人 1 回はフリスビーを投げる。
- 制限時間内に大小 15 枚のフリスビーを用いて 18 枚のパネルを何枚打ち抜けるか競う。各クラスの 1 グループはさらに A と B にわかれる。
> →1 ゲームを A チーム、2 ゲーム目を B チームが行う 2 ゲーム制とする。
- 先攻クラス A チーム→後攻クラス A チーム→先攻クラス B チーム→後攻クラス B チームの順で挑戦する。
- パネルまでの距離は 5ｍとする。
> →5ｍラインを越えてフリスビーを投げた場合、ペナルティとして獲得枚数を 1 枚減らす持ち時間は 1 チーム 30 秒とする。(前半、後半各 30 秒)
- ひとつのゲーム内でチームメンバー全員が必ず投げることとする。
- フリスビーを紛失した場合は、自分で取りに行くこと。
>  見つからなかった場合減点等あり
***
### ⚠️注意事項
- 投げたフリスビーの回収は選手が行う
- 試合時間と終了後に消毒を徹底する。
- 試合終了後にフリスビーを消毒する。
`

export const RuleStrackout = () => {
    const theme = useTheme();
    return(
        <Stack
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            spacing={2}
            py={2}
            sx={{width:"100%"}}
        >
            <Typography color={theme.palette.text.primary}>フィールド図はありません</Typography>
            <RuleNumCard title={"会場"} content={"ラウンジ"}/>
            <RuleNumCard title={"出場人数"} content={"6~8人"}/>
            <RuleNumCard title={"試合時間"} content={"4分"} sub={"試合＋次の試合の準備も含む"}/>
            <RuleNumCard title={"採点方法"} content={""} sub={"試合終了時の得点が多いチームが勝利とする。同点の場合は引き分けとする。"}/>
            <RuleNumCard title={"順位決定法"} content={"リーグ戦では勝ち点制"} sub={"勝ち3点・引き分け1点・負け0点　として合計点で順位を決定し、勝ち点が同じ場合、得失点差で順位を決定する。"}/>
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