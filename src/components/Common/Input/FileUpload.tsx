import { Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  InputLabel,
  TextField,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { storage } from "../../../utils/func/storage";
import { useActionDispatch } from "../../../utils/func/useActionDispatch";
import { COLOR } from "../../../utils/styles/color";

type Props = {
  onChange: (fileUrl: string) => void;
  src?: string;
};

// TODO file Upload & Delete
export default function FileUpload(props: Props) {
  const id = v4();
  const theme = useTheme();
  const dispatchAction = useActionDispatch();
  const [src, setSrc] = useState(props.src || "");
  const onChangeHandler = async (e: any) => {
    const file = e.target.files[0];
    const fileUrl = await storage.upload(file, (progress: number) =>
      dispatchAction({
        type: "NOTIFICATION:ADD",
        payload: [{ message: `Upload Progress ${progress}%`, type: "Success" }],
      })
    );
    if (fileUrl && src) await storage.delete(src);
    setSrc(fileUrl);
    props.onChange(fileUrl);
  };
  const deleteFileHandler = async () => {
    if (src) {
      await storage.delete(src);
      setSrc("");
      props.onChange("");
    }
  };
  useEffect(() => {
    if (props.src) setSrc(props.src);
    else deleteFileHandler();
  }, [props.src]);
  return (
    <>
      <Box position="relative">
        {src && (
          <IconButton
            size="small"
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={deleteFileHandler}
          >
            <Delete fontSize="small" color="error" />
          </IconButton>
        )}
        <InputLabel htmlFor={id} sx={{ width: theme.spacing(25) }}>
          <Avatar
            src={src}
            sx={{
              border: `1px solid ${COLOR.backgroundLight}`,
              width: theme.spacing(25),
              height: theme.spacing(25),
            }}
          />
        </InputLabel>
      </Box>
      <TextField
        id={id}
        sx={{ display: "none" }}
        type="file"
        onChange={onChangeHandler}
      />
    </>
  );
}
