import { Download, HelpOutline, PlayArrow, Stop } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { v4 } from "uuid";
import { ordinal_suffix } from "../../utils/func/ordinal";
import { useRequest } from "../../utils/func/useRequest";

type Props = {
  map: { name: string; src: string };
  name: string;
  status: string;
  matchKey: string;
  awards: any;
  onDate: { started: any; stopped: any };
};

export default function MatchTitle(props: Props) {
  const theme = useTheme();
  const matchStatusRequest = useRequest("put");
  const getIconByStatus = (value: any) => {
    switch (value) {
      case "upcoming":
        return <PlayArrow color="success" fontSize="small" />;
      case "started":
        return <Stop color="error" fontSize="small" />;
      case "stopped":
        return <PlayArrow color="success" fontSize="small" />;
      default:
        return <HelpOutline color="error" fontSize="small" />;
    }
  };
  const getStatusChip = (status: string) => {
    let color: any = "default";
    switch (status) {
      case "stopped":
        color = "error";
        break;
      case "upcoming":
        color = "warning";
        break;
      case "started":
        color = "success";
        break;
    }
    return (
      <Chip
        size="small"
        color={color}
        label={status}
        sx={{ textTransform: "capitalize" }}
      />
    );
  };
  return (
    <>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 0.5, height: theme.spacing(25) }}>
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={6} md={6} sx={{ height: "100%" }}>
              <Avatar
                variant="rounded"
                sx={{ width: "100%", height: "100%" }}
                src={props.map.src}
                srcSet={props.map.src}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight="bold">{props.name}</Typography>
                <Box display="flex">
                  <IconButton
                    size="small"
                    onClick={() =>
                      matchStatusRequest({
                        url: `/match/update/status/${props.matchKey}`,
                        onSuccess: () => window.location.reload(),
                      })
                    }
                  >
                    <Download />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() =>
                      matchStatusRequest({
                        url: `/match/update/status/${props.matchKey}`,
                        onSuccess: () => window.location.reload(),
                      })
                    }
                  >
                    {getIconByStatus(props.status)}
                  </IconButton>
                </Box>
              </Box>
              <Box marginTop={1}>Status: {getStatusChip(props.status)}</Box>
              <Typography marginTop={1}>
                Start Date:&nbsp;
                {props?.onDate?.started
                  ? dayjs(props?.onDate?.started).format("DD-MM-YY hh:mm a")
                  : "Time Not Registered"}
              </Typography>
              <Typography marginTop={1}>
                End Date:&nbsp;
                {props?.onDate?.stopped
                  ? dayjs(props.onDate.stopped).format("DD-MM-YY hh:mm a")
                  : "Time Not Registered"}
              </Typography>
              <Typography marginTop={1}>Map: {props.map.name}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 0.5, height: theme.spacing(25) }}>
          <Typography fontWeight="bold">Awards</Typography>
          <TableContainer component={Paper} sx={{ mt: 0.5 }}>
            <Table stickyHeader size="small">
              <TableBody>
                {Object.keys(props.awards).map((pos: any) => {
                  return (
                    <TableRow key={v4()}>
                      <TableCell>{ordinal_suffix(pos)}</TableCell>
                      <TableCell align="center">
                        {props.awards?.[pos]} points
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  );
}
