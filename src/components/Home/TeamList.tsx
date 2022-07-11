import {
  Avatar,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import colorHash from "material-color-hash";
import { Add, Delete, Edit, Search, Timeline } from "@mui/icons-material";
import ContextMenu from "../Common/ContextMenu";
import DataContent from "../Common/DataContent";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useRequest } from "../../utils/func/useRequest";
import TeamAddModal from "../Modal/team/TeamAddModal";
import TeamDeleteModal from "../Modal/team/TeamDeleteModal";
import TeamEditModal from "../Modal/team/TeamEditModal";

export default function TeamList() {
  const request = useRequest("get");
  const [teams, setTeams] = useState<any>([]);
  const [searchedText, setSearchText] = useState("");
  const [teamAction, setTeamAction] = useState({ key: "", type: "" });
  useEffect(() => {
    request({ url: "/team/get/all", onSuccess: setTeams });
  }, []);
  const onChangeHandler = (e: any) => setSearchText(e.target.value);
  const onModalToggle = (e: { key: string; type: string }) => setTeamAction(e);
  return (
    <>
      <Paper sx={{ height: 440, p: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>TEAMS</Typography>
          <TextField
            variant="standard"
            placeholder="Search Team"
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
          data={teams.filter((team: any) => {
            if (!searchedText) return true;
            return team.name.toLowerCase().match(searchedText);
          })}
        >
          {({ data }: any) => {
            return (
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                paddingTop={2}
                height="90%"
                sx={{ overflowY: "scroll" }}
              >
                {data.map((player: any) => {
                  return (
                    <ContextMenu
                      key={v4()}
                      menuItems={[
                        {
                          title: "Stats",
                          Icon: Timeline,
                          action: () =>
                            onModalToggle({ key: player.key, type: "stats" }),
                        },
                        {
                          title: "Edit",
                          Icon: Edit,
                          action: () =>
                            onModalToggle({ key: player.key, type: "edit" }),
                        },
                        {
                          title: "Delete",
                          Icon: Delete,
                          color: "red",
                          action: () =>
                            onModalToggle({ key: player.key, type: "delete" }),
                        },
                      ]}
                    >
                      {(prop: any) => {
                        const clr = colorHash(player.name, 500);
                        return (
                          <Chip
                            sx={{
                              mb: 1,
                              mr: 1,
                              bgcolor: clr.backgroundColor,
                              color: clr.color,
                            }}
                            label={player.name}
                            avatar={
                              <Avatar
                                onContextMenu={prop.onContextToggle}
                                src={player.src}
                              >
                                {player.name[0]}
                              </Avatar>
                            }
                          />
                        );
                      }}
                    </ContextMenu>
                  );
                })}
              </Box>
            );
          }}
        </DataContent>
      </Paper>
      {teamAction.type === "add" && (
        <TeamAddModal
          open={teamAction.type === "add"}
          onClose={() => onModalToggle({ key: "", type: "" })}
          onUpdateHandler={(newPlayer) =>
            setTeams((pP: any) => [...pP, newPlayer])
          }
        />
      )}
      {teamAction.type === "edit" && (
        <TeamEditModal
          open={teamAction.type === "edit"}
          teamKey={teamAction.key}
          onClose={() => onModalToggle({ key: "", type: "" })}
          onUpdateHandler={(team: any) => {
            const { key, src } = team;
            setTeams((pP: any) =>
              pP.map((player: any) => {
                if (player.key === key) player.src = src;
                return player;
              })
            );
          }}
        />
      )}
      {teamAction.type === "delete" && (
        <TeamDeleteModal
          open={teamAction.type === "delete"}
          teamKey={teamAction.key}
          onClose={() => onModalToggle({ key: "", type: "" })}
          onUpdateHandler={(teamKey: string) => {
            setTeams((pTeams: any) =>
              pTeams.filter((pTeam: any) => pTeam.key !== teamKey)
            );
          }}
        />
      )}
    </>
  );
}
