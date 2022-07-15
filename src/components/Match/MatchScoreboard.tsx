import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import DataContent from "../Common/DataContent";
import MatchTeamItem from "./MatchTeamItem";

type Props = { onUpdateHandler: any; teams: Array<any>; awards: any };

export default function MatchScoreboard(props: Props) {
  const theme = useTheme();
  const [teams, setTeams] = useState<Array<any>>([]);
  const [searchName, setSearchName] = useState("");
  const [activeTeam, setActiveTeam] = useState<string>("");
  useEffect(() => {
    if (props.teams.length > 0) setTeams(props.teams as any);
  }, [props.teams]);
  const onModalChangeHandler = (teamId: string) => {
    setActiveTeam((pAT: string) => {
      if (pAT === teamId) return "";
      return teamId;
    });
  };
  const onValueChange = (
    value: any,
    teamIndex: string,
    playerIndex?: string,
    type?: string
  ) => {
    setTeams((pTs) =>
      pTs.map((pT) => {
        const {
          teamDetail: { key: tKey },
          players,
        } = pT;
        if (!playerIndex && tKey === teamIndex) {
          pT.position = value;
        } else if (tKey === teamIndex && playerIndex) {
          pT.players = players.map((pPlayer: any) => {
            const player = { ...pPlayer };
            if (player.playerDetail.key === playerIndex && type) {
              player[type] = value;
              if (type === "status" && !value)
                player.onDate = { dead: new Date() };
              else if (type === "status" && value)
                player.onDate = { dead: undefined };
            }
            return player;
          });
        }
        return pT;
      })
    );
  };
  return (
    <Grid item xs={12} md={3}>
      <Paper elevation={3} sx={{ height: theme.spacing(80) }}>
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
          padding={1}
        >
          <Typography fontWeight="bold">Scoreboard</Typography>
          <TextField
            variant="standard"
            size="small"
            placeholder="Search Team/Player"
            value={searchName}
            onChange={(e: any) => setSearchName(e.target.value)}
          />
        </Box>
        <Box height={`calc(100% - ${theme.spacing(12)})`} overflow="scroll">
          <DataContent
            message="No Team Found"
            data={teams.filter((team) => {
              if (!searchName) return true;
              return (
                team.teamDetail.name.toLowerCase().match(searchName) ||
                team.players.filter((player: any) => {
                  return player.playerDetail.name
                    .toLowerCase()
                    .match(searchName);
                }).length > 0
              );
            })}
          >
            {({ data }: any) =>
              data.map((team: any) => {
                return (
                  <MatchTeamItem
                    key={v4()}
                    teamKey={team.teamDetail.key}
                    expanded={team._id === activeTeam}
                    teamName={team.teamDetail.name}
                    teamSrc={team.teamDetail.src}
                    teamPosition={team.position}
                    teamPlayers={team.players}
                    awards={props.awards}
                    onHandleChange={() => onModalChangeHandler(team._id)}
                    onValueChange={onValueChange}
                  />
                );
              })
            }
          </DataContent>
        </Box>
        <Box
          height={theme.spacing(6)}
          display="flex"
          justifyContent="flex-end"
          padding={theme.spacing(0.5)}
        >
          <Button
            fullWidth
            onClick={() => props.onUpdateHandler(teams)}
            variant="contained"
            color="error"
            size="small"
          >
            Update
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
