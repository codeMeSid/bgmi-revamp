import { Add } from "@mui/icons-material";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";

export default function PhaseTitle(props: any) {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="600">Phases</Typography>
        <Box display="flex">
          <Tooltip title="Add Phase">
            <IconButton
              size="small"
              onClick={() =>
                props.onModalToggle({
                  key: props.tournamentKey,
                  type: "add-phase",
                })
              }
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
}
