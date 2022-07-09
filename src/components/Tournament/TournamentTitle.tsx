import { Download, Error } from "@mui/icons-material";
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
        <Typography fontWeight="600">{props.name}</Typography>
        <Box display="flex" alignItems="center">
          {!props.status && (
            <Tooltip sx={{ mr: 1 }} title="Tournament Deleted/Error">
              <Error color="error" />
            </Tooltip>
          )}
          <Tooltip title="Download Stats" placement="left-start">
            <IconButton size="small">
              <Download color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Grid>
  );
}
