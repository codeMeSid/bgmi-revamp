import { Grid, Paper, Avatar, Typography, Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { v4 } from "uuid";

type Props = { teams: Array<any> };

const useStyles = makeStyles((theme: Theme) => ({
  teamContainer: { height: theme.spacing(5) },
  teamHeadContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));

// TODO bgcolor dynamic
// TODO use theme to filter player src avatar (using status)
// TODO use theme to change player src avatar to theme src avatar
export default function MatchTop4Teams(props: Props) {
  const classes = useStyles();
  const clipPathTeamHead = "polygon(0 0,100% 0,80% 100%,0 100%)";
  return (
    <>
      {props.teams.map((team: any) => {
        return (
          <Grid item key={v4()} xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              className={classes.teamContainer}
              sx={{ bgcolor: "#bacca220" }}
            >
              <Grid container sx={{ height: "100%" }}>
                <Grid item xs={4} md={4} sx={{ clipPath: clipPathTeamHead }}>
                  <Paper elevation={3} className={classes.teamHeadContainer}>
                    <Avatar
                      src={team.teamDetail.src}
                      alt={team.teamDetail.name}
                      sx={{ mx: 1 }}
                    />
                    <Typography fontWeight="bold" textTransform="uppercase">
                      {team.teamDetail.shortName}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item container xs={8} md={8}>
                  <Box width="100%" display="flex" justifyContent="center">
                    {team.players
                      .sort((pA: any, pB: any) => pA.status - pB.status)
                      .map((player: any) => {
                        return (
                          <Avatar
                            key={v4()}
                            sx={{ mx: 0.5 }}
                            src={player.playerDetail.src}
                            alt={player.playerDetail.name}
                          />
                        );
                      })}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      })}
    </>
  );
}
