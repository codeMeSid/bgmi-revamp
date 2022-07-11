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
import PlayerAddModal from "../Modal/player/PlayerAddModal";
import { v4 } from "uuid";
import { useRequest } from "../../utils/func/useRequest";
import PlayerEditModal from "../Modal/player/PlayerEditModal";
import PlayerDeleteModal from "../Modal/player/PlayerDeleteModal";

export default function PlayerList() {
  const request = useRequest("get");
  const [players, setPlayers] = useState<any>([]);
  const [searchedText, setSearchText] = useState("");
  const [playerAction, setPlayerAction] = useState({ key: "", type: "" });
  useEffect(() => {
    request({ url: "/player/get/all", onSuccess: setPlayers });
  }, []);
  const onChangeHandler = (e: any) => setSearchText(e.target.value);
  const onModalToggle = (e: { key: string; type: string }) =>
    setPlayerAction(e);
  return (
    <>
      <Paper sx={{ height: 440, p: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
            PLAYERS
          </Typography>
          <TextField
            variant="standard"
            placeholder="Search Player"
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
          data={players.filter((player: any) => {
            if (!searchedText) return true;
            return player.name.toLowerCase().match(searchedText);
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
      {playerAction.type === "add" && (
        <PlayerAddModal
          open={playerAction.type === "add"}
          onClose={() => onModalToggle({ key: "", type: "" })}
          onUpdateHandler={(newPlayer) =>
            setPlayers((pP: any) => [...pP, newPlayer])
          }
        />
      )}
      {playerAction.type === "edit" && (
        <PlayerEditModal
          open={playerAction.type === "edit"}
          playerKey={playerAction.key}
          onClose={() => onModalToggle({ key: "", type: "" })}
          onUpdateHandler={(updatedPlayer: any) => {
            const { key, src } = updatedPlayer;
            setPlayers((pP: any) =>
              pP.map((player: any) => {
                if (player.key === key) player.src = src;
                return player;
              })
            );
          }}
        />
      )}
      {playerAction.type === "delete" && (
        <PlayerDeleteModal
          open={playerAction.type === "delete"}
          playerKey={playerAction.key}
          onClose={() => onModalToggle({ key: "", type: "" })}
          onUpdateHandler={(playerKey: string) => {
            setPlayers((pPlayers: any) =>
              pPlayers.filter((pPlayer: any) => pPlayer.key !== playerKey)
            );
          }}
        />
      )}
    </>
  );
}
