import { Box, Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SnackbarProvider } from "notistack";
import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { useActionDispatch } from "./utils/func/useActionDispatch";
import useInterceptor from "./utils/func/interceptor";
import { useStateSelector } from "./utils/func/useStateSelector";
import HomePage from "./pages/Home";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    height: "100vh",
  },
  notification: {
    textTransform: "capitalize",
  },
}));

function App() {
  const notificationRef = useRef<any>();
  const interceptor = useInterceptor();
  const dispatchAction = useActionDispatch();
  const notifications = useStateSelector((state) => state.system.notifications);
  const classes = useStyles();

  useEffect(() => {
    const requestId = interceptor.request({
      onSuccess: () => dispatchAction({ type: "LOADER:ACTIVE" }),
      onError: () => dispatchAction({ type: "LOADER:INACTIVE" }),
    });
    const responseId = interceptor.response({
      onSuccess: () => dispatchAction({ type: "LOADER:INACTIVE" }),
      onError: () => dispatchAction({ type: "LOADER:INACTIVE" }),
    });
    return () => {
      interceptor.ejectRequest(requestId);
      interceptor.ejectResponse(responseId);
    };
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach(
        ({ message, type }: { message: string; type: string }) => {
          if (
            notificationRef &&
            notificationRef.current &&
            notificationRef.current["enqueueSnackbar"]
          ) {
            notificationRef.current["enqueueSnackbar"](message, {
              variant: type,
              anchorOrigin: { horizontal: "right", vertical: "top" },
              preventDuplicate: true,
              autoHideDuration: 3000,
            });
          }
        }
      );
    }
  }, [notifications]);

  const onDismissHandler = () =>
    dispatchAction({ type: "NOTIFICATION:REMOVE" });

  return (
    <Box className={classes.root}>
      <SnackbarProvider
        ref={notificationRef}
        className={classes.notification}
        action={() => (
          <Button sx={{ color: "white" }} onClick={onDismissHandler}>
            Dismiss
          </Button>
        )}
        dense
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </SnackbarProvider>
    </Box>
  );
}

export default App;
