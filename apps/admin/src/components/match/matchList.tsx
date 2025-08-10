import Grid from "@mui/material/Grid";
import {Match} from "@/src/models/MatchModel";
import MatchCard from "@/components/match/matchCard";

export type MatchListProps = {
    matches: Match[]
}

export default async function MatchList(props: MatchListProps) {
    const components = props.matches
        //  sort by date in ascending order
        .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
        .map((match) =>
        <MatchCard
            match={match}
            key={match.id}
        />
    )
    return (
        <Grid
            container
            spacing={1}
        >
            {components}
        </Grid>
    )
}