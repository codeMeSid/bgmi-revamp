import { Delete, KeyboardArrowRight } from "@mui/icons-material";
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
export default function PhaseItemMatches(props: any) {
  const { matches, onModalToggle } = props;
  const navigate = useNavigate();
  const getColorByStatus = (value: any) => {
    switch (value) {
      case "started":
        return "success";
      case "upcoming":
        return "primary";
      case "stopped":
        return "error";
      default:
        return "secondary";
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
                    {match?.matchDetail?.name}&nbsp;
                  </Typography>
                  <Chip
                    size="small"
                    color={getColorByStatus(match.matchDetail?.status)}
                    label={match.matchDetail?.status}
                  />
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
