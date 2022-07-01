import {
  Add,
  ArrowRight,
  Delete,
  Edit,
  Fireplace,
  Groups,
  Search,
  Timeline,
  VideogameAsset,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { useRequest } from "../../utils/func/useRequest";
import { COLOR } from "../../utils/styles/color";
import ContextMenu from "../Common/ContextMenu";
import DataContent from "../Common/DataContent";
import TournamentAddModal from "../Modal/tournament/TournamentAddModal";

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    // backgroundColor: COLOR.backgroundLight,
    clipPath: "polygon(0 0,95% 0,100% 100%,5% 100%)",
    padding: theme.spacing(1, "5%"),
    marginBottom: theme.spacing(1),
    height: theme.spacing(10),
  },
}));

export default function TournamentList() {
  const classes = useStyles();
  const request = useRequest("get");
  const [tournaments, setTournaments] = useState<Array<any>>([]);
  const [searchedText, setSearchText] = useState("");
  const [tournamentAction, setTournamentAction] = useState({
    key: "",
    type: "",
  });
  useEffect(() => {
    request({ url: "/tournament/get/all", onSuccess: setTournaments });
  }, []);
  const onModalToggle = (e: { key: string; type: string }) =>
    setTournamentAction(e);
  const onChangeHandler = (e: any) => setSearchText(e.target.value);
  return (
    <>
      <Paper sx={{ height: 440, p: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
            TOURNAMENTS
          </Typography>
          <TextField
            variant="standard"
            placeholder="Search Tournament"
            onChange={onChangeHandler}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                  <IconButton
                    size="small"
                    onClick={() => onModalToggle({ key: "", type: "add" })}
                  >
                    <Add />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <DataContent
          data={tournaments.filter((tournament) => {
            if (!searchedText) return true;
            return tournament.name.toLowerCase().match(searchedText);
          })}
        >
          {({ data }: any) => {
            return (
              <Box
                marginTop={1}
                padding={"8px 16px"}
                height="90%"
                overflow="scroll"
              >
                {data.map((tournament: any) => {
                  return (
                    <ContextMenu
                      menuItems={[
                        {
                          title: "Download Stats",
                          Icon: Timeline,
                          action: () =>
                            onModalToggle({
                              key: tournament?.key,
                              type: "stats",
                            }),
                        },
                        {
                          title: "Edit",
                          Icon: Edit,
                          action: () =>
                            onModalToggle({
                              key: tournament?.key,
                              type: "edit",
                            }),
                        },
                        {
                          title: "Delete",
                          Icon: Delete,
                          color: "red",
                          action: () =>
                            onModalToggle({
                              key: tournament?.key,
                              type: "delete",
                            }),
                        },
                      ]}
                      key={v4()}
                    >
                      {(prop: any) => (
                        <Paper
                          onContextMenu={prop.onContextToggle}
                          sx={{ p: 1, mb: 1 }}
                          elevation={5}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography
                              fontSize={18}
                              textTransform="capitalize"
                            >
                              {tournament.name}
                            </Typography>
                            <Link to={`/tournament/${tournament.key}`}>
                              <IconButton size="small">
                                <ArrowRight />
                              </IconButton>
                            </Link>
                          </Box>
                          <Box marginTop={1}>
                            <Chip
                              color="warning"
                              size="small"
                              icon={<Groups />}
                              sx={{ mr: 1 }}
                              label={`Teams: ${tournament.teams.length}`}
                            />
                            <Chip
                              color="info"
                              size="small"
                              icon={<Groups />}
                              sx={{ mr: 1 }}
                              label={`Players: ${tournament.players.length}`}
                            />
                            <Chip
                              color="error"
                              size="small"
                              icon={<Fireplace />}
                              sx={{ mr: 1 }}
                              label={`Phases: ${tournament.phases.length}`}
                            />
                            <Chip
                              color="success"
                              size="small"
                              icon={<VideogameAsset />}
                              label={`Matches: ${tournament.phases.reduce(
                                (acc: number, phase: any) =>
                                  acc + phase.matches.length,
                                0
                              )}`}
                            />
                          </Box>
                        </Paper>
                      )}
                    </ContextMenu>
                  );
                })}
              </Box>
            );
          }}
        </DataContent>
      </Paper>
      {tournamentAction.type === "add" && (
        <TournamentAddModal
          open={tournamentAction.type === "add"}
          onClose={() => onModalToggle({ key: "", type: "" })}
          onUpdateHandler={(newTournament: any) =>
            setTournaments((pT: any) => [...pT, newTournament])
          }
        />
      )}
    </>
  );
}
