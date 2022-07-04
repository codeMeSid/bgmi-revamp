import { Add, Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ordinal_suffix } from "../../../utils/func/ordinal";
import { useRequest } from "../../../utils/func/useRequest";
import SbModal from "../../Common/Modal";

type Props = {
  open: boolean;
  onClose: any;
  onUpdateHandler?: (data: any) => void;
  tournamentKey: string;
};

export default function TournamentEditModal(props: Props) {
  const theme = useTheme();
  const request = useRequest("put");
  const getPlayersRequest = useRequest("get");
  const getTeamsRequest = useRequest("get");
  const getTournamentRequest = useRequest("get");
  const [tournamentData, setTournamentData] = useState({
    name: "",
    awards: [25, 20, 15, 10],
    teams: [],
    players: [],
  });
  const [teams, setTeams] = useState<any>([]);
  const [players, setPlayers] = useState<any>([]);
  useEffect(() => {
    getPlayersRequest({ url: "/player/get/all", onSuccess: setPlayers });
    getTeamsRequest({ url: "/team/get/all", onSuccess: setTeams });
    getTournamentRequest({
      url: `/tournament/get/${props.tournamentKey}`,
      onSuccess: (data) => {
        setTournamentData({
          name: data.name,
          awards: Object.values(data.awards),
          teams: [],
          players: [],
        });
      },
    });
  }, []);
  const onAddClickHandler = () => {
    setTournamentData((pTD: any) => ({ ...pTD, awards: [...pTD.awards, 0] }));
  };
  const onDeleteClickHandler = () => {
    const uAwards = [...tournamentData.awards];
    if (uAwards.length === 1) return;
    uAwards.pop();
    setTournamentData((pTD: any) => ({ ...pTD, awards: uAwards }));
  };
  return (
    <SbModal
      title="Edit Tournament"
      actions={[]}
      open={props.open}
      onClose={() => {
        setTournamentData({
          name: "",
          awards: [25, 20, 15, 10],
          teams: [],
          players: [],
        });
        props.onClose();
      }}
      onSubmitClick={() =>
        request({
          url: `/tournament/update/${props.tournamentKey}`,
          payload: tournamentData,
          onSuccess: (data: any) => {
            if (props?.onUpdateHandler) props.onUpdateHandler(data);
            setTournamentData({
              name: "",
              awards: [25, 20, 15, 10],
              teams: [],
              players: [],
            });
            props.onClose();
          },
        })
      }
    >
      <Grid container spacing={1} marginTop={theme.spacing(0.5)}>
        <Grid
          item
          xs={12}
          md={12}
          display="flex"
          alignItems="center"
          padding={theme.spacing(1)}
        >
          <TextField
            fullWidth
            disabled
            variant="standard"
            label="Tournament Name"
            value={tournamentData.name}
            helperText="That's some kickass name"
            onChange={(e: any) =>
              setTournamentData((pTD) => ({ ...pTD, name: e?.target?.value }))
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} marginTop={theme.spacing(0.5)}>
        <Grid
          item
          xs={6}
          md={6}
          display="flex"
          alignItems="center"
          padding={theme.spacing(1)}
        >
          <FormControl fullWidth>
            <InputLabel id="players">Players</InputLabel>
            <Select
              multiple
              fullWidth
              label="Players"
              labelId="players"
              value={tournamentData.players}
              variant="standard"
              renderValue={(selected) => (
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
              onChange={(e: any) =>
                setTournamentData((pTD) => ({
                  ...pTD,
                  players: e.target.value,
                }))
              }
            >
              {players.map((player: any) => {
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
        <Grid
          item
          xs={6}
          md={6}
          display="flex"
          alignItems="center"
          padding={theme.spacing(1)}
        >
          <FormControl fullWidth>
            <InputLabel id="teams">Teams</InputLabel>
            <Select
              multiple
              fullWidth
              label="Teams"
              labelId="teams"
              value={tournamentData.teams}
              variant="standard"
              renderValue={(selected) => (
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
              onChange={(e: any) =>
                setTournamentData((pTD) => ({
                  ...pTD,
                  teams: e.target.value,
                }))
              }
            >
              {teams.map((team: any) => {
                return (
                  <MenuItem key={v4()} value={team}>
                    <Avatar
                      src={team.src}
                      srcSet={team.src}
                      alt={team.name}
                      sx={{
                        width: theme.spacing(3),
                        height: theme.spacing(3),
                      }}
                    />
                    &nbsp;
                    <Typography>{team.name}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Typography margin={theme.spacing(0.5, 0)}>Awards</Typography>
      <Grid container spacing={1}>
        {tournamentData.awards.map((award, index) => {
          return (
            <Grid key={v4()} item xs={2} md={2}>
              <TextField
                size="small"
                type="number"
                value={award}
                helperText={`${ordinal_suffix(index + 1)} pos`}
                FormHelperTextProps={{
                  style: { margin: theme.spacing(0.5, 0, 0, 0) },
                }}
                onChange={(e: any) => {
                  const uAwards = tournamentData.awards;
                  uAwards[index] = e.target.value;
                  setTournamentData((pTD: any) => ({
                    ...pTD,
                    awards: uAwards,
                  }));
                }}
              />
            </Grid>
          );
        })}
        <Grid item xs={2} md={2}>
          <IconButton onClick={onAddClickHandler} size="small">
            <Add />
          </IconButton>
          <IconButton onClick={onDeleteClickHandler} size="small">
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </SbModal>
  );
}
