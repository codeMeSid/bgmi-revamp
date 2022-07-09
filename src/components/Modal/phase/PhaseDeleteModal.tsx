import { Delete } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useRequest } from "../../../utils/func/useRequest";
import SbModal from "../../Common/Modal";

export default function PhaseDeleteModal(props: any) {
  const { phase, tournamentKey } = props;
  const theme = useTheme();
  const deleteRequest = useRequest("delete");
  return (
    <SbModal
      open={props.open}
      onClose={() => {
        props.onClose();
      }}
      title={`Delete ${phase?.name} Phase`}
      actions={[
        {
          Icon: Delete,
          title: "Delete",
          color: "error",
          onClick: () =>
            deleteRequest({
              url: `/tournament/delete/phase/${tournamentKey}/${phase?.key}`,
              onSuccess: () => window.location.reload(),
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
