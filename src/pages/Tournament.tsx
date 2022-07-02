import { Download, Error } from "@mui/icons-material";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "../utils/func/useRequest";

type TournamentStateType = {
  name: string;
  key: string;
  awards: any;
  teams: Array<any>;
  players: Array<any>;
  status: boolean;
  phases: Array<{
    name: string;
    key: string;
    teams: {
      teamDetail: any;
      players: Array<{ playerDetail: any }>;
    };
    matches: Array<{ matchDetail: any }>;
  }>;
};

// TODO completedownload button
export default function TournamentPage() {
  const { tournamentKey } = useParams();
  const request = useRequest("get");
  const [tournament, setTournament] = useState<TournamentStateType>({
    name: "Tournament Not Found",
    awards: {},
    key: "NOT_FOUND",
    phases: [],
    players: [],
    status: false,
    teams: [],
  });
  return (
    <Box padding={1}>
      <Paper
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontWeight="600">{tournament.name}</Typography>
        <Box display="flex" alignItems="center">
          {!tournament.status && (
            <Tooltip sx={{ mr: 1 }} title="Tournament Deleted/Error">
              <Error color="error" />
            </Tooltip>
          )}
          <IconButton size="small">
            <Download color="error" />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
