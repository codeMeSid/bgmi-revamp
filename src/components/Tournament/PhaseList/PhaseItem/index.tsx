import { Edit, Delete, Add } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { v4 } from "uuid";
import PhaseItemTeams from "./PhaseItemTeams";
import PhaseItemTitle from "./PhaseItemTitle";

export default function PhaseItem(props: any) {
  const { phase, onModalToggle } = props;
  const theme = useTheme();
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} sx={{ height: theme.spacing(25) }}>
        <Grid container>
          <Grid item xs={4} md={4}>
            <Box
              height={theme.spacing(25)}
              padding={theme.spacing(0.5)}
              overflow="scroll"
            >
              <Paper
                elevation={3}
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  overflowY: "scroll",
                }}
              >
                {/* {phase?.matches?.map((match: any) => {
              return <Box key={v4()}></Box>;
            })} */}
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={8} md={8}>
            <PhaseItemTitle
              phaseKey={phase?.key}
              name={phase?.name}
              onModalToggle={onModalToggle}
              isDisabled={Boolean(phase?.matches?.length)}
            />
            <PhaseItemTeams teams={phase?.teams} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
