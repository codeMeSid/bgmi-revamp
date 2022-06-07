import { Grid, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import SbModal from "../../Common/Modal";
import { useRequest } from "../../../utils/func/useRequest";
import FileUpload from "../../Common/Input/FileUpload";

type Props = {
  open: boolean;
  onClose: any;
  teamKey: string;
  onUpdateHandler?: (data: any) => void;
};

export default function TeamEditModal(props: Props) {
  const theme = useTheme();
  const request = useRequest("put");
  const teamFetchRequest = useRequest("get");
  useEffect(() => {
    teamFetchRequest({
      url: `/team/get/${props.teamKey}`,
      onSuccess: (team: any) =>
        setTeamData({ name: team.name, src: team.src }),
      onError: props.onClose,
    });
  }, []);
  const [teamData, setTeamData] = useState({ name: "", src: "" });
  return (
    <SbModal
      title="Edit Team"
      open={props.open}
      onClose={props.onClose}
      onSubmitClick={() =>
        request({
          url: `/team/update/${props.teamKey}`,
          payload: teamData,
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
            src={teamData.src}
            onChange={(fileUrl) =>
              setTeamData((pPD) => ({ ...pPD, src: fileUrl }))
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
            label="Team Name"
            value={teamData.name}
            helperText="That's A kickass name"
            onChange={(e: any) =>
              setTeamData((pPD) => ({ ...pPD, name: e?.target?.value }))
            }
          />
        </Grid>
      </Grid>
    </SbModal>
  );
}
