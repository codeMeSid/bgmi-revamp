import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Box,
} from "@mui/material";
import { v4 } from "uuid";
import { theme } from "../../utils/styles/theme";
import NoData from "../Common/NoData";

export default function PlayerList(props: any) {
  const playersCheck = Boolean(Object.keys(props.players).length);
  return playersCheck ? (
    <TableContainer
      component={Paper}
      sx={{ height: theme.spacing(40), mr: 0.5 }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Player</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player: any) => (
            <TableRow key={v4()}>
              <TableCell>
                <Avatar src={player.src}>{player.name[0]}</Avatar>
              </TableCell>
              <TableCell>{player.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box width="50%" marginRight={0.5}>
      <Paper elevation={3} sx={{ height: theme.spacing(40) }}>
        <NoData message="No Players Found" />
      </Paper>
    </Box>
  );
}
