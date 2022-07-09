import { Box } from "@mui/material";
import SbModal from "../../Common/Modal";

export default function MatchAddModal(props: any) {
  const resetData = () => {};
  return (
    <SbModal
      open={props.open}
      onClose={() => {
        resetData();
        props.onClose();
      }}
      title="Add Match"
    >
      <Box></Box>
    </SbModal>
  );
}
