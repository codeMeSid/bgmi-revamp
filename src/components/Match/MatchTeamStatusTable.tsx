import {
  Avatar,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { v4 } from "uuid";

type Props = { teams: Array<any> };
// TODO change player status stick using theme
export default function MatchTeamStatusTable(props: Props) {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={3}>
      <TableContainer component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell size="small">
                <Typography fontWeight="bold" textTransform="uppercase">
                  Team
                </Typography>
              </TableCell>
              <TableCell size="small">
                <Typography
                  align="center"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.teams.map((team) => {
              return (
                <TableRow key={v4()}>
                  <TableCell size="small">
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={team.teamDetail.src}
                        alt={team.teamDetail.name}
                        sx={{
                          mx: 1,
                          height: theme.spacing(4),
                          width: theme.spacing(4),
                        }}
                      />
                      <Typography fontWeight="bold" textTransform="uppercase">
                        {team.teamDetail.shortName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell size="small">
                    <Box display="flex" justifyContent="center">
                      {team.players.map((player: any) => (
                        <Paper
                          key={v4()}
                          elevation={3}
                          sx={{
                            mx: 0.5,
                            bgcolor: "#777ab2",
                            height: theme.spacing(5),
                            width: theme.spacing(1),
                            border: "1px solid black",
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
