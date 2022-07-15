import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchScoreboard from "../components/Match/MatchScoreboard";
import MatchTeamStatusTable from "../components/Match/MatchTeamStatusTable";
import MatchTitle from "../components/Match/MatchTitle";
import MatchTop4Teams from "../components/Match/MatchTop4Teams";
import { useRequest } from "../utils/func/useRequest";

export default function MatchPage() {
  const { matchKey } = useParams();
  const getMatchRequest = useRequest("get");
  const updateMatchRequest = useRequest("put");
  const [match, setMatch] = useState({
    name: "No Match",
    key: "",
    map: { name: "", src: "" },
    status: "stopped",
    awards: {},
    teams: [],
    onDate: { started: "", stopped: "" },
  });
  useEffect(() => {
    getMatchRequest({
      url: `/match/get/${matchKey}`,
      onSuccess: setMatch,
    });
  }, []);
  const onUpdateHandler = (data: any) =>
    updateMatchRequest({
      url: `/match/update/stats/${match?.key}`,
      payload: data,
      onSuccess: setMatch,
    });
  const top4TeamSort = (teamA: any, teamB: any) => {
    const { position: posA, players: playersA } = teamA;
    const { position: posB, players: playersB } = teamB;
    const posPointsA = (match?.awards as any)?.[posA] || 0;
    const posPointsB = (match?.awards as any)?.[posB] || 0;
    const finishesTeamA = (playersA || []).reduce(
      (acc: any, player: any) => acc + (player?.finishes || 0),
      0
    );
    const finishesTeamB = (playersB || []).reduce(
      (acc: any, player: any) => acc + (player?.finishes || 0),
      0
    );
    return finishesTeamB + posPointsB - (finishesTeamA + posPointsA);
  };
  return (
    <>
      <Box padding={1}>
        <Grid container spacing={1}>
          <MatchTitle
            map={match.map}
            name={match.name}
            status={match.status}
            matchKey={match.key}
            awards={match.awards}
            onDate={match.onDate}
          />
          <MatchTop4Teams teams={match.teams.sort(top4TeamSort).slice(0, 4)} />
          <MatchScoreboard
            onUpdateHandler={onUpdateHandler}
            teams={match.teams}
            awards={match.awards}
          />
          <MatchTeamStatusTable teams={match.teams} />
        </Grid>
      </Box>
    </>
  );
}
