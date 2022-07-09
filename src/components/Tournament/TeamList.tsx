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

export default function TeamList(props: any) {
  const teamCheck = Boolean(Object.keys(props.teams).length);
  return teamCheck ? (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: theme.spacing(50), ml: 0.5 }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.teams.map((team: any) => (
            <TableRow key={v4()}>
              <TableCell>
                <Avatar src={team.src}>{team.name[0]}</Avatar>
              </TableCell>
              <TableCell>{team.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box width="50%" marginLeft={0.5}>
      <Paper elevation={3} sx={{ height: theme.spacing(40) }}>
        <NoData message="No Teams Found" />
      </Paper>
    </Box>
  );
}
