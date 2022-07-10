import { Box, Grid, Paper, useTheme } from "@mui/material";
import PhaseItemMatches from "./PhaseItemMatches";
import PhaseItemTeams from "./PhaseItemTeams";
import PhaseItemTitle from "./PhaseItemTitle";

export default function PhaseItem(props: any) {
  const { phase, onModalToggle } = props;
  const theme = useTheme();
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} sx={{ height: theme.spacing(25) }}>
        <Grid container>
          <Grid item xs={5} md={5}>
            <Box
              height={theme.spacing(25)}
              padding={theme.spacing(0.5)}
              overflow="scroll"
            >
              <PhaseItemMatches
                matches={phase?.matches || []}
                onModalToggle={onModalToggle}
              />
            </Box>
          </Grid>
          <Grid item xs={7} md={7}>
            <PhaseItemTitle
              phaseKey={phase?.key}
              name={phase?.name}
              onModalToggle={onModalToggle}
            />
            <PhaseItemTeams teams={phase?.teams} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
