import { RotateLeft } from "@mui/icons-material";
import { Grid, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import SbModal from "../../Common/Modal";
import { useRequest } from "../../../utils/func/useRequest";
import FileUpload from "../../Common/Input/FileUpload";

type Props = {
  open: boolean;
  onClose: any;
  onUpdateHandler?: (data: any) => void;
};

export default function PlayerAddModal(props: Props) {
  const theme = useTheme();
  const request = useRequest("post");
  const [playerData, setPlayerData] = useState({ name: "", src: "" });
  return (
    <SbModal
      title="Add New Player"
      actions={[
        {
          title: "reset",
          Icon: RotateLeft,
          color: "warning",
          onClick: () => setPlayerData({ name: "", src: "" }),
        },
      ]}
      open={props.open}
      onClose={() => {
        setPlayerData({ name: "", src: "" });
        props.onClose();
      }}
      onSubmitClick={() =>
        request({
          url: "/player/add",
          payload: playerData,
          onSuccess: (data) => {
            if (props?.onUpdateHandler) props.onUpdateHandler(data);
            setPlayerData({ name: "", src: "" });
            props.onClose();
          },
        })
      }
    >
      <Grid container spacing={1} marginTop={theme.spacing(0.5)}>
        <Grid item xs={6} md={6}>
          <FileUpload
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
            variant="standard"
            label="Player Name"
            value={playerData.name}
            helperText="Let's use some kickass name"
            onChange={(e: any) =>
              setPlayerData((pPD) => ({ ...pPD, name: e?.target?.value }))
            }
          />
        </Grid>
      </Grid>
    </SbModal>
  );
}
