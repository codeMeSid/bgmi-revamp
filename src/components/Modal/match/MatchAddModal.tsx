import {
  Avatar,
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { v4 } from "uuid";
import { MAPS } from "../../../utils/constantData";
import { useRequest } from "../../../utils/func/useRequest";
import SbModal from "../../Common/Modal";

export default function MatchAddModal(props: any) {
  const theme = useTheme();
  const addMatchRequest = useRequest("post");
  const [name, setName] = useState("");
  const [map, setMap] = useState(MAPS[0]);
  const [teams, setTeams] = useState(props?.phase?.teams || []);
  const resetData = () => {
    setName("");
    setMap(MAPS[0]);
    setTeams(props?.phase?.teams || []);
  };
  return (
    <SbModal
      open={props.open}
      onClose={() => {
        resetData();
        props.onClose();
      }}
      title="Add Match"
      onSubmitClick={() => {
        addMatchRequest({
          url: `/match/add/${props.tournamentKey}/${props?.phase?.key}`,
          payload: { name, map, teams },
          onSuccess: () => window.location.reload(),
        });
      }}
    >
      <Grid container spacing={2} marginTop={theme.spacing(0.5)}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            variant="standard"
            label="Match Name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl fullWidth>
            <InputLabel id="maps">Maps</InputLabel>
            <Select
              fullWidth
              onChange={(e: any) => setMap(e.target.value)}
              label="Maps"
              labelId="maps"
              value={map}
              variant="standard"
              renderValue={(selected: any) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={selected.src}
                    srcSet={selected.src}
                    alt={selected.name}
                  />
                  &nbsp; &nbsp; &nbsp;
                  <Typography>{selected.name}</Typography>
                </Box>
              )}
            >
              {MAPS.map((map: any) => {
                return (
                  <MenuItem key={v4()} value={map}>
                    <Avatar
                      variant="rounded"
                      src={map.src}
                      srcSet={map.src}
                      alt={map.name}
                    />
                    &nbsp; &nbsp; &nbsp;
                    <Typography>{map.name}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl fullWidth>
            <InputLabel id="teams">Teams</InputLabel>
            <Select
              fullWidth
              multiple
              onChange={(e: any) => setTeams(e.target.value)}
              label="Teams"
              labelId="teams"
              value={teams}
              variant="standard"
              renderValue={(selected: any) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {selected?.map((team: any) => (
                    <Chip
                      sx={{ mr: 0.5, mb: 0.5 }}
                      size="small"
                      key={v4()}
                      avatar={
                        <Avatar
                          src={team.teamDetail.src}
                          srcSet={team?.teamDetail?.src}
                          alt={team?.teamDetail?.name}
                        />
                      }
                      label={team?.teamDetail?.name}
                    />
                  ))}
                </Box>
              )}
            >
              {props?.phase?.teams?.map((team: any) => {
                return (
                  <MenuItem key={v4()} value={team}>
                    <Avatar
                      variant="rounded"
                      src={team?.teamDetail?.src}
                      srcSet={team?.teamDetail?.src}
                      alt={team?.teamDetail?.name}
                    />
                    &nbsp; &nbsp; &nbsp;
                    <Typography>{team?.teamDetail?.name}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </SbModal>
  );
}
