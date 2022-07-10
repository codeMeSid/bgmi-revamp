import { Download, Edit, Error } from "@mui/icons-material";
import {
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";

import { theme } from "../../utils/styles/theme";

export default function TournamentTitle(props: any) {
  return (
    <Grid item xs={12} md={12}>
      <Paper
        sx={{
          padding: theme.spacing(1),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography fontWeight="600">{props.name}</Typography>
          <Tooltip title="Edit Tournament" placement="left-start">
            <IconButton
              size="small"
              sx={{ ml: 1 }}
              onClick={() =>
                props.onModalToggle({
                  type: "edit-tournament",
                  key: props.tournamentKey,
                })
              }
            >
              <Edit fontSize="small" color="primary" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center">
          {!props.status && (
            <Tooltip sx={{ mr: 1 }} title="Tournament Deleted/Error">
              <Error fontSize="small" color="error" />
            </Tooltip>
          )}

          <Tooltip title="Download Stats" placement="left-start">
            <IconButton size="small">
              <Download fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Grid>
  );
}
