import { Grid, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import SbModal from "../../Common/Modal";
import { useRequest } from "../../../utils/func/useRequest";
import FileUpload from "../../Common/Input/FileUpload";

type Props = {
  open: boolean;
  onClose: any;
  playerKey: string;
  onUpdateHandler?: (data: any) => void;
};

export default function PlayerEditModal(props: Props) {
  const theme = useTheme();
  const request = useRequest("put");
  const playerFetchRequest = useRequest("get");
  useEffect(() => {
    playerFetchRequest({
      url: `/player/get/${props.playerKey}`,
      onSuccess: (player: any) =>
        setPlayerData({ name: player.name, src: player.src }),
      onError: props.onClose,
    });
  }, []);
  const [playerData, setPlayerData] = useState({ name: "", src: "" });
  return (
    <SbModal
      title="Edit Player"
      open={props.open}
      onClose={props.onClose}
      onSubmitClick={() =>
        request({
          url: `/player/update/${props.playerKey}`,
          payload: playerData,
          onSuccess: (data) => {
            if (props?.onUpdateHandler) props.onUpdateHandler(data);
            props.onClose();
          },
        })
      }
    >
      <Grid container spacing={1} marginTop={theme.spacing(0.5)}>
        <Grid item xs={6} md={6}>
          <FileUpload
            src={playerData.src}
            onChange={(fileUrl) =>
              setPlayerData((pPD) => ({ ...pPD, src: fileUrl }))
            }
          />
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          display="flex"
          alignItems="center"
          padding={theme.spacing(1)}
        >
          <TextField
            fullWidth
            disabled
            variant="standard"
            label="Player Name"
            value={playerData.name}
            helperText="That's A kickass name"
            onChange={(e: any) =>
              setPlayerData((pPD) => ({ ...pPD, name: e?.target?.value }))
            }
          />
        </Grid>
      </Grid>
    </SbModal>
  );
}
