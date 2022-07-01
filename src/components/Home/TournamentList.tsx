import { Add, Delete, Edit, Search, Timeline } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useRequest } from "../../utils/func/useRequest";
import ContextMenu from "../Common/ContextMenu";
import DataContent from "../Common/DataContent";
import TournamentAddModal from "../Modal/tournament/TournamentAddModal";

export default function TournamentList() {
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
              <Box>
                {data.map((tournament: any) => {
                  return (
                    <ContextMenu
                      menuItems={[
                        {
                          title: "Stats",
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
                        <Box onContextMenu={prop.onContextToggle}>T</Box>
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
