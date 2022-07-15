import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  Box,
  Grid,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { v4 } from "uuid";
import { ordinal_suffix } from "../../utils/func/ordinal";

type Props = {
  expanded: boolean;
  onHandleChange: any;
  onValueChange: any;
  teamName: string;
  teamSrc: string;
  teamPlayers: Array<any>;
  teamPosition: number;
  teamKey: string;
  awards: any;
};

export default function MatchTeamItem(props: Props) {
  const theme = useTheme();
  const teamFinishesPoints = props.teamPlayers.reduce(
    (acc: number, player: any) => acc + player.finishes,
    0
  );
  const teamAwardsPoints = props.awards[props.teamPosition] || 0;
  return (
    <Accordion
      elevation={3}
      expanded={props.expanded}
      onChange={props.onHandleChange}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={props.teamSrc}
            alt={props.teamName}
            sx={{
              height: theme.spacing(3),
              width: theme.spacing(3),
              marginRight: theme.spacing(1),
            }}
          />
          <Box>
            <Badge
              invisible={props.teamPosition <= 0}
              badgeContent={ordinal_suffix(props.teamPosition)}
              color="primary"
            >
              <Typography>{props.teamName}</Typography>
            </Badge>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Typography>Team Postion</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              value={props.teamPosition}
              size="small"
              type="number"
              variant="standard"
              placeholder="Ranking"
              onChange={(e: any) =>
                props.onValueChange(
                  parseInt(e.target.value) >= 0
                    ? parseInt(e.target.value)
                    : props.teamPosition,
                  props.teamKey
                )
              }
            />
          </Grid>
          {props.teamPlayers.map((player) => {
            const {
              playerDetail: { name: playerName, src: playerSrc },
              finishes,
              status,
            } = player;
            return (
              <Grid item container xs={12} md={12} key={v4()}>
                <Grid item xs={4} md={4}>
                  <Box display="flex" alignItems="center" overflow="clip">
                    <Avatar
                      src={playerSrc}
                      alt={playerName}
                      sx={{
                        height: theme.spacing(3),
                        width: theme.spacing(3),
                        marginRight: theme.spacing(1),
                      }}
                    />
                    <Typography>{playerName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Switch
                    checked={status}
                    onChange={(e: any) =>
                      props.onValueChange(
                        e.target.checked,
                        props.teamKey,
                        player.playerDetail.key,
                        "status"
                      )
                    }
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <TextField
                    fullWidth
                    value={finishes}
                    size="small"
                    type="number"
                    variant="standard"
                    placeholder="Finishes"
                    onChange={(e: any) =>
                      props.onValueChange(
                        parseInt(e.target.value) >= 0
                          ? parseInt(e.target.value)
                          : finishes,
                        props.teamKey,
                        player.playerDetail.key,
                        "finishes"
                      )
                    }
                  />
                </Grid>
              </Grid>
            );
          })}
          <Grid item xs={8} md={8}>
            <Typography>Total Finishes</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography>{teamFinishesPoints}&nbsp; Finishes</Typography>
          </Grid>
          <Grid item xs={8} md={8}>
            <Typography>Position Points</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography>{teamAwardsPoints}&nbsp; Points</Typography>
          </Grid>
          <Grid item xs={8} md={8}>
            <Typography>Team Total</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography>
              {teamFinishesPoints + teamAwardsPoints}&nbsp; Points
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
