import { Add, RotateLeft } from "@mui/icons-material";
import { Avatar, Box, Chip, FormControl, Grid } from "@mui/material";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { v4 } from "uuid";
import { useActionDispatch } from "../../../utils/func/useActionDispatch";
import { useRequest } from "../../../utils/func/useRequest";
import SbModal from "../../Common/Modal";
import NoData from "../../Common/NoData";
import SelectedTeam from "../../Tournament/SelectedTeam";

type Props = {
  open: boolean;
  onClose: any;
  tournamentKey?: string;
  teams: Array<any>;
  players: Array<any>;
  onUpdateHandler?: (data: any) => void;
};

export default function PhaseAddModal(props: Props) {
  const theme = useTheme();
  const dispatchAction = useActionDispatch();
  const [team, setTeam] = useState(props?.teams?.[0]);
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [teams, setTeams] = useState<Array<any>>([]);
  const addPhaseRequest = useRequest("put");
  const resetData = () => {
    setPlayers([]);
    setName("");
    setTeams([]);
  };
  const submitData = () => {
    addPhaseRequest({
      url: `/tournament/add/phase/${props.tournamentKey}`,
      onSuccess: () => window.location.reload(),
      payload: { name, teams },
    });
  };
  const addTeamHandler = () => {
    if (teams.findIndex((value: any) => value.team.key === team.key) !== -1)
      return dispatchAction({
        type: "NOTIFICATION:ADD",
        payload: [{ message: "Team already exists", type: "error" }],
      });
    else {
      if (!Boolean(players.length))
        return dispatchAction({
          type: "NOTIFICATION:ADD",
          payload: [{ message: "Select Players", type: "error" }],
        });
      setTeams((pTeams: any) => [...pTeams, { team, players }]);
      setPlayers([]);
    }
  };
  return (
    <SbModal
      title="Add New Phase"
      actions={[
        {
          title: "add team",
          Icon: Add,
          color: "primary",
          onClick: addTeamHandler,
        },
        {
          title: "reset",
          Icon: RotateLeft,
          color: "warning",
          onClick: resetData,
        },
      ]}
      open={props.open}
      onClose={() => {
        props.onClose();
        resetData();
      }}
      onSubmitClick={submitData}
    >
      <Box marginTop={1}>
        <TextField
          fullWidth
          value={name}
          variant="standard"
          label="Phase Name"
          onChange={(e: any) => setName(e.target.value)}
        />
        <Grid container spacing={1} marginTop={1}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="team">Team</InputLabel>
              <Select
                fullWidth
                labelId="team"
                onChange={(e: any) => setTeam(e.target.value)}
                renderValue={(value: any) => {
                  return (
                    <Box display="flex">
                      <Avatar sx={{ width: 24, height: 24 }} src={value.src}>
                        {value.name[0]}
                      </Avatar>
                      &nbsp; &nbsp;{value.name}
                    </Box>
                  );
                }}
                value={team}
                variant="standard"
              >
                {props.teams.map((team) => {
                  return (
                    <MenuItem key={v4()} value={team}>
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                        alt={team.name}
                        src={team.src}
                      >
                        {team.name[0]}
                      </Avatar>
                      &nbsp; <Typography>{team.name}</Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="players">Players</InputLabel>
              <Select
                multiple
                fullWidth
                onChange={(e: any) => setPlayers(e.target.value)}
                label="Players"
                labelId="players"
                value={players}
                variant="standard"
                renderValue={(selected: any) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {selected.map((value: any) => (
                      <Chip
                        size="small"
                        avatar={
                          <Avatar
                            src={value.src}
                            srcSet={value.src}
                            alt={value.name}
                          />
                        }
                        sx={{ margin: theme.spacing(0, 0.25, 0.25, 0) }}
                        key={v4()}
                        label={value.name}
                      />
                    ))}
                  </Box>
                )}
              >
                {props.players.map((player: any) => {
                  return (
                    <MenuItem key={v4()} value={player}>
                      <Avatar
                        src={player.src}
                        srcSet={player.src}
                        alt={player.name}
                        sx={{
                          width: theme.spacing(3),
                          height: theme.spacing(3),
                        }}
                      />
                      &nbsp;
                      <Typography>{player.name}</Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box marginTop={1}>
              <Typography sx={{ marginTop: 1 }}>Selected Teams</Typography>
              {teams.length > 0 ? (
                teams.map((sTeam: any, sTeamIndex: number) => {
                  return (
                    <SelectedTeam
                      key={v4()}
                      onDeleteHandler={() =>
                        setTeams((pTs) =>
                          pTs.filter((_, i) => i !== sTeamIndex)
                        )
                      }
                      team={sTeam}
                    />
                  );
                })
              ) : (
                <Box height={theme.spacing(15)}>
                  <NoData message="No Teams" />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </SbModal>
  );
}
