import { Edit, Delete, Add } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

export default function PhaseItemTitle(props: any) {
  const { name, isDisabled, onModalToggle, phaseKey } = props;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography fontWeight="bold" textTransform="capitalize" sx={{ pl: 1 }}>
        {name}
      </Typography>
      <Box display="flex" marginRight={1}>
        <Tooltip title="Edit Phase">
          <IconButton
            disabled={isDisabled}
            size="small"
            onClick={() => onModalToggle({ type: "edit-phase", key: phaseKey })}
          >
            <Edit color="primary" fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Phase">
          <IconButton
            size="small"
            onClick={() =>
              onModalToggle({ type: "delete-phase", key: phaseKey })
            }
          >
            <Delete color="error" fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Match">
          <IconButton
            size="small"
            onClick={() => onModalToggle({ type: "add-match", key: phaseKey })}
          >
            <Add fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
