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
import { v4 } from "uuid";

export default function PhaseItemTeams(props: any) {
  const { teams } = props;
  const theme = useTheme();
  return (
    <>
      <Typography align="center">Teams ({teams?.length})</Typography>
      <TableContainer component={Paper} sx={{ height: theme.spacing(18) }}>
        <Table>
          <TableBody>
            {teams?.map((team: any) => {
              return (
                <TableRow key={v4()}>
                  <TableCell>
                    <Avatar
                      sx={{
                        height: theme.spacing(3),
                        width: theme.spacing(3),
                        mr: 1,
                      }}
                      src={team?.teamDetail?.src}
                      alt={team?.teamDetail?.name}
                    >
                      {team?.teamDetail?.name?.[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell>{team?.teamDetail?.name}</TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="wrap">
                      {team?.players?.map((player: any) => {
                        return (
                          <Chip
                            key={v4()}
                            size="small"
                            avatar={
                              <Avatar
                                src={player?.playerDetail?.src}
                                alt={player?.playerDetail?.name}
                              />
                            }
                            label={player?.playerDetail?.name}
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        );
                      })}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box
        height={}
        padding={theme.spacing(0.5)}
        overflow="scroll"
      >
        {teams?.map((team: any) => {
          return (
           
            // <Tooltip key={v4()} title={team?.teamDetail?.name}>
            //   <Paper
            //     elevation={3}
            //     sx={{
            //       mb: 1,
            //       p: 0.5,
            //       display: "flex",
            //       alignItems: "center",
            //     }}
            //   >
         
            //      
          
            //   </Paper>
            // </Tooltip>
          );
        })}
      </Box> */}
    </>
  );
}
