import {
  Delete,
  HelpOutline,
  KeyboardArrowRight,
  PlayArrow,
  Stop,
} from "@mui/icons-material";
import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useRequest } from "../../../../utils/func/useRequest";

export default function PhaseItemMatches(props: any) {
  const { matches, onModalToggle } = props;
  const matchStatusRequest = useRequest("put");
  const navigate = useNavigate();
  const getTitleByStatus = (value: any) => {
    switch (value) {
      case "started":
        return "Stop Match";
      case "upcoming":
        return "Start Match";
      case "stopped":
        return "Start Match";
      default:
        return "Mystery";
    }
  };
  const getIconByStatus = (value: any) => {
    switch (value) {
      case "upcoming":
        return <PlayArrow fontSize="small" />;
      case "started":
        return <Stop fontSize="small" />;
      case "stopped":
        return <PlayArrow fontSize="small" />;
      default:
        return <HelpOutline fontSize="small" />;
    }
  };
  return (
    <TableContainer component={Paper} elevation={3} sx={{ height: "100%" }}>
      <Table size="small">
        <TableBody>
          {matches.map((match: any) => {
            return (
              <TableRow key={v4()}>
                <TableCell>
                  <Avatar variant="rounded" src={match.matchDetail.map.src} />
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">
                    {match?.matchDetail?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete Match">
                    <IconButton
                      size="small"
                      onClick={() =>
                        onModalToggle({
                          type: "delete-match",
                          key: match?.matchDetail?.key,
                        })
                      }
                    >
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={getTitleByStatus(match?.matchDetail?.status)}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        matchStatusRequest({
                          url: `/match/update/status/${match?.matchDetail?.key}`,
                          onSuccess: () => window.location.reload(),
                        })
                      }
                    >
                      {getIconByStatus(match?.matchDetail?.status)}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Go To Match">
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigate(`/match/${match?.matchDetail?.key}`)
                      }
                    >
                      <KeyboardArrowRight fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
