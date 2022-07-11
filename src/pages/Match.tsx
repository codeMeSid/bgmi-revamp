import { PlayArrow, Stop, HelpOutline } from "@mui/icons-material";
import { Box, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchTitle from "../components/Match/MatchTitle";
import { useRequest } from "../utils/func/useRequest";

export default function MatchPage() {
  const { matchKey } = useParams();
  const getMatchRequest = useRequest("get");
  const [match, setMatch] = useState({
    name: "No Match",
    key: "",
    map: { name: "", src: "" },
    status: "stopped",
    awards: {},
    teams: [],
    onDate: { started: "", stopped: "" },
  });
  const [matchAction, setMatchAction] = useState({ type: "", key: "" });
  useEffect(() => {
    getMatchRequest({
      url: `/match/get/${matchKey}`,
      onSuccess: (data: any) => {
        console.log({ data });
        setMatch((pM) => ({ ...pM, ...data }));
      },
    });
  }, []);
  const onModalToggle = (e: any) => setMatchAction(e);
  // const getTitleByStatus = (value: any) => {
  //   switch (value) {
  //     case "started":
  //       return "Stop Match";
  //     case "upcoming":
  //       return "Start Match";
  //     case "stopped":
  //       return "Start Match";
  //     default:
  //       return "Mystery";
  //   }
  // };
  // const getIconByStatus = (value: any) => {
  //   switch (value) {
  //     case "upcoming":
  //       return <PlayArrow fontSize="small" />;
  //     case "started":
  //       return <Stop fontSize="small" />;
  //     case "stopped":
  //       return <PlayArrow fontSize="small" />;
  //     default:
  //       return <HelpOutline fontSize="small" />;
  //   }
  // };
  return (
    <>
      <Box padding={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <MatchTitle
              map={match.map}
              name={match.name}
              status={match.status}
              matchKey={match.key}
              awards={match.awards}
              onDate={match.onDate}
              onModalToggle={onModalToggle}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
