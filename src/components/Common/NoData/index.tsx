import { Box, Typography, useTheme } from "@mui/material";

type Props = {
  message?: string;
};

export default function NoData(props: Props) {
  const theme = useTheme();
  return (
    <Box width="100%" height="100%" position="relative">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        padding={1}
        minWidth={theme.spacing(25)}
        textTransform="uppercase"
        sx={{
          transform: "translate(-50%,-50%)",
          bgcolor: "#DDDDDD",
        }}
      >
        <Typography textAlign="center">
          {props?.message || "No Data"}
        </Typography>
      </Box>
    </Box>
  );
}
