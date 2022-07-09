import {
  Grid,
  useTheme,
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { v4 } from "uuid";
import { ordinal_suffix } from "../../utils/func/ordinal";
import NoData from "../Common/NoData";

export default function AwardsList(props: any) {
  const theme = useTheme();
  const awardsCheck = Boolean(Object.keys(props.awards).length);
  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ minHeight: theme.spacing(30), padding: theme.spacing(1) }}>
        <Box>
          <Typography fontWeight="600">Awards</Typography>
        </Box>
        {awardsCheck ? (
          <TableContainer
            component={Paper}
            sx={{ maxHeight: theme.spacing(40) }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Position</TableCell>
                  <TableCell>Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(props.awards).map((awardPos: any) => {
                  return (
                    <TableRow key={v4()}>
                      <TableCell>{ordinal_suffix(awardPos)}</TableCell>
                      <TableCell>{props.awards[awardPos]} points</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper elevation={3} sx={{ height: theme.spacing(40) }}>
            <NoData message="No Awards Found" />
          </Paper>
        )}
      </Paper>
    </Grid>
  );
}
