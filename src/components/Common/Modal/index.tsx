import { Close, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  SvgIconTypeMap,
  Typography,
  useTheme,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { v4 } from "uuid";
import { COLOR } from "../../../utils/styles/color";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children?: any;
  actions?: Array<{
    title: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    color?:
      | "inherit"
      | "success"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "warning"
      | undefined;
    onClick: () => void;
  }>;
  onSubmitClick?: () => void;
};

export default function SbModal(props: Props) {
  const theme = useTheme();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        position="absolute"
        top="20%"
        left="50%"
        width={theme.spacing(60)}
        sx={{ transform: "translateX(-50%)" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={theme.spacing(1)}
          bgcolor={COLOR.background}
        >
          <Typography color={COLOR.white}>{props.title}</Typography>
          <IconButton onClick={props.onClose} size="small">
            <Close sx={{ color: COLOR.white }} />
          </IconButton>
        </Box>
        <Box
          bgcolor={COLOR.white}
          padding={theme.spacing(1)}
          minHeight={theme.spacing(20)}
          // maxHeight={theme.spacing(40)}
          // overflow="scroll"
        >
          {props.children}
        </Box>

        <Box
          display="flex"
          justifyContent="flex-end"
          padding={theme.spacing(0.5)}
          bgcolor={COLOR.white}
        >
          {props.actions?.map((action) => {
            return (
              <Button
                key={v4()}
                variant="contained"
                color={action.color}
                size="small"
                sx={{ mr: 0.5 }}
                onClick={action.onClick}
              >
                <action.Icon fontSize={"small"} />
                &nbsp;{action.title}
              </Button>
            );
          })}
          {props.onSubmitClick && (
            <Button
              onClick={props.onSubmitClick}
              variant="contained"
              color="success"
              size="small"
            >
              <Save fontSize={"small"} />
              &nbsp;submit
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
