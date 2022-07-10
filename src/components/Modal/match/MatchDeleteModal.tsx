import { Delete } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useRequest } from "../../../utils/func/useRequest";
import SbModal from "../../Common/Modal";

export default function MatchDeleteModal(props: any) {
  const { match, tournamentKey } = props;
  const theme = useTheme();
  const deleteRequest = useRequest("delete");
  console.log(props);
  return (
    <SbModal
      open={props.open}
      onClose={() => {
        props.onClose();
      }}
      title={`Delete ${match?.name} Match`}
      actions={[
        {
          Icon: Delete,
          title: "Delete",
          color: "error",
          onClick: () =>
            deleteRequest({
              url: `/match/delete/${tournamentKey}/${match?.key}`,
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
