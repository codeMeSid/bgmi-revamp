import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "../utils/func/useRequest";
import AwardsList from "../components/Tournament/AwardsList";
import PlayerList from "../components/Tournament/PlayerList";
import TeamList from "../components/Tournament/TeamList";
import TournamentTitle from "../components/Tournament/TournamentTitle";
import PhaseTitle from "../components/Tournament/PhaseTitle";
import PhaseList from "../components/Tournament/PhaseList";
import PhaseAddModal from "../components/Modal/phase/PhaseAddModal";
import PhaseDeleteModal from "../components/Modal/phase/PhaseDeleteModal";
import PhaseEditModal from "../components/Modal/phase/PhaseEditModal";

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

// TODO complete download button
// TODO add chip for tournament on going
export default function TournamentPage() {
  const theme = useTheme();
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
  const [tournamentAction, setTournamentAction] = useState({
    key: "",
    type: "",
  });
  const onModalToggle = (e: { key: string; type: string }) =>
    setTournamentAction(e);
  useEffect(() => {
    request({
      url: `/tournament/get/${tournamentKey}`,
      onSuccess: (data) => {
        console.log({ data });
        if (data)
          setTournament((pT) => ({
            ...pT,
            name: data.name,
            key: data.key,
            status: data.status,
            awards: data.awards,
            phases: data.phases,
            players: data.players.map((player: any) => ({
              name: player.name,
              src: player.src,
              key: player.key,
              id: player.id,
            })),
            teams: data.teams.map((team: any) => ({
              name: team.name,
              src: team.src,
              key: team.key,
              id: team.id,
            })),
          }));
      },
    });
  }, []);
  return (
    <>
      <Box padding={1}>
        <Grid container spacing={1}>
          <TournamentTitle name={tournament.name} status={tournament.status} />
          <AwardsList awards={tournament.awards} />
          <Grid item xs={12} md={8}>
            <Paper
              sx={{ minHeight: theme.spacing(30), padding: theme.spacing(1) }}
            >
              <Box>
                <Typography fontWeight="600">Players & Teams</Typography>
              </Box>
              <Box display="flex">
                <PlayerList players={tournament.players} />
                <TeamList teams={tournament.teams} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper
              sx={{ padding: theme.spacing(1), minHeight: theme.spacing(62) }}
            >
              <PhaseTitle
                tournamentKey={tournament.key}
                onModalToggle={onModalToggle}
              />
              <PhaseList
                phases={tournament.phases}
                onModalToggle={onModalToggle}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {tournamentAction.type === "add-phase" && (
        <PhaseAddModal
          open={tournamentAction.type === "add-phase"}
          tournamentKey={tournamentKey}
          teams={tournament.teams}
          players={tournament.players}
          onClose={() => setTournamentAction({ key: "", type: "" })}
        />
      )}
      {tournamentAction.type === "add-match" && <></>}
      {tournamentAction.type === "edit-phase" && (
        <>
          <PhaseEditModal
            open={tournamentAction.type === "edit-phase"}
            tournamentKey={tournamentKey}
            phase={
              tournament?.phases?.filter(
                (phase: any) => phase.key === tournamentAction.key
              )?.[0]
            }
            teams={tournament.teams}
            players={tournament.players}
            onClose={() => setTournamentAction({ key: "", type: "" })}
          />
        </>
      )}
      {tournamentAction.type === "delete-phase" && (
        <>
          <PhaseDeleteModal
            open={tournamentAction.type === "delete-phase"}
            tournamentKey={tournamentKey}
            phase={
              tournament?.phases?.filter(
                (phase: any) => phase.key === tournamentAction.key
              )[0]
            }
            onClose={() => setTournamentAction({ key: "", type: "" })}
          />
        </>
      )}
      {tournamentAction.type === "delete-match" && <></>}
    </>
  );
}
