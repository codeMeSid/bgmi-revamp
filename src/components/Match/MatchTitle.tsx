import {
  Avatar,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { v4 } from "uuid";
import { ordinal_suffix } from "../../utils/func/ordinal";

type Props = {
  map: { name: string; src: string };
  name: string;
  status: string;
  onModalToggle: any;
  matchKey: string;
  awards: any;
  onDate: { started: any; stopped: any };
};

export default function MatchTitle(props: Props) {
  const theme = useTheme();
  console.log(props);
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
    <Paper sx={{ p: 1, height: theme.spacing(20), display: "flex" }}>
      <Tooltip title={props.map.name}>
        <Avatar
          variant="rounded"
          sx={{ height: "100%", width: theme.spacing(20) }}
          src={props.map.src}
          srcSet={props.map.src}
        />
      </Tooltip>
      <Box marginLeft={theme.spacing(2)} minWidth={theme.spacing(50)}>
        <Typography fontWeight="bold">{props.name}</Typography>
        <Box marginTop={1}>Status: {getStatusChip(props.status)}</Box>
        <Typography marginTop={1}>
          Start Date:&nbsp;
          {props.onDate.started
            ? dayjs(props.onDate.started).format("DD-MM-YYY hh:mm a")
            : "TNR"}
        </Typography>
        <Typography marginTop={1}>
          End Date:&nbsp;
          {props.onDate.stopped
            ? dayjs(props.onDate.stopped).format("DD-MM-YYY hh:mm a")
            : "TNR"}
        </Typography>
      </Box>
      <Box>
        <Typography fontWeight="bold">Awards</Typography>
        <TableContainer
          component={Paper}
          sx={{ height: "84%", width: theme.spacing(30), ml: 2 }}
        >
          <Table stickyHeader size="small">
            <TableBody>
              {Object.keys(props.awards).map((pos: any) => {
                return (
                  <TableRow key={v4()}>
                    <TableCell>{ordinal_suffix(pos)}</TableCell>
                    <TableCell>{props.awards?.[pos]} points</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
}
