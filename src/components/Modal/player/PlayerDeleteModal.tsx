import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import SbModal from "../../Common/Modal";
import { useRequest } from "../../../utils/func/useRequest";
import { Delete } from "@mui/icons-material";

type Props = {
  open: boolean;
  onClose: any;
  playerKey: string;
  onUpdateHandler?: (data: any) => void;
};

export default function PlayerDeleteModal(props: Props) {
  const theme = useTheme();
  const deleteRequest = useRequest("delete");
  const playerFetchRequest = useRequest("get");
  const [name, setName] = useState("");
  useEffect(() => {
    playerFetchRequest({
      url: `/player/get/${props.playerKey}`,
      onSuccess: (player) => setName(player.name),
      onError: props.onClose,
    });
  }, []);
  return (
    <SbModal
      title={`Delete ${name}`}
      open={props.open}
      onClose={props.onClose}
      actions={[
        {
          Icon: Delete,
          title: "Delete",
          color: "error",
          onClick: () =>
            deleteRequest({
              url: `/player/delete/${props.playerKey}`,
              onSuccess: (data) => {
                if (props?.onUpdateHandler) props.onUpdateHandler(data);
                props.onClose();
              },
            }),
        },
      ]}
    >
      <Box
        width="100%"
        height={theme.spacing(20)}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6">Are You Sure ?</Typography>
      </Box>
    </SbModal>
  );
}
