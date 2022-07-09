import { Delete } from "@mui/icons-material";
import {
  Box,
  Avatar,
  Typography,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { v4 } from "uuid";
import { theme } from "../../utils/styles/theme";

export default function SelectedTeam(props: any) {
  return (
    <Box marginTop={1} position="relative">
      <Box marginTop={2} display="flex">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            src={props.team.team.src}
            alt={props.team.team.name}
            sx={{
              width: theme.spacing(3),
              height: theme.spacing(3),
            }}
          >
            {props.team.team.name[0]}
          </Avatar>
          <Typography>{props.team.team.name}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          marginTop={1}
        >
          {props.team.players.map((pPlayer: any) => {
            return (
              <Chip
                sx={{ ml: 1, mb: 1 }}
                key={v4()}
                size="small"
                avatar={
                  <Avatar src={pPlayer.src} alt={pPlayer.name}>
                    {pPlayer.name[0]}
                  </Avatar>
                }
                label={pPlayer.name}
              />
            );
          })}
        </Box>
      </Box>
      <IconButton
        size="small"
        onClick={props.onDeleteHandler}
        sx={{
          position: "absolute",
          top: theme.spacing(-2),
          right: 0,
        }}
      >
        <Delete fontSize={"small"} color="error" />
      </IconButton>
      <Divider />
    </Box>
  );
}
