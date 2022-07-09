import { Box, Grid, useTheme } from "@mui/material";
import { v4 } from "uuid";
import NoData from "../../Common/NoData";
import PhaseItem from "./PhaseItem";

export default function PhaseList(props: any) {
  const theme = useTheme();
  const phasesCheck = Boolean(props.phases.length);
  return (
    <>
      {phasesCheck ? (
        <Box marginTop={1}>
          <Grid container spacing={2}>
            {props.phases.map((phase: any) => {
              return (
                <PhaseItem
                  key={v4()}
                  phase={phase}
                  onModalToggle={props.onModalToggle}
                />
              );
            })}
          </Grid>
        </Box>
      ) : (
        <Box height={theme.spacing(50)} width="100%">
          <NoData message="Click + To Add Phase" />
        </Box>
      )}
    </>
  );
}
