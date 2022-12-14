import React from "react";

import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import FormContainer from "./components/form-container/FormContainer";
import NotesContainer from "./components/notes-container/NotesContainer";
import Notification from "./components/notification/Notification";

import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "./store/notification-slice";
import { RootState } from "./store/index";

function App() {
  const notification = useSelector(
    (state: RootState) => state.notification.notification
  );

  const mobile = useMediaQuery("(max-width: 768px)");

  console.log(mobile);

  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      notificationActions.showNotification({
        open: false,
      })
    );
  };

  if (!mobile) {
    return (
      <Box sx={{ width: "100vw", height: "100%", backgroundColor: "#242424" }}>
        {notification && (
          <Notification
            status={notification.status}
            message={notification.message}
            title={notification.title}
            onClose={handleClose}
            open={notification.open}
          />
        )}
        <Grid
          container
          spacing={8}
          columns={16}
          sx={{
            width: "100%",
            height: "100%",
            padding: "2em",
            backgroundColor: "#242424",
          }}
        >
          <Grid
            xs={8}
            sx={{
              alignSelf: "start",
              textAlign: "center",
              padding: "5em",
              position: 'sticky',
              top: "20px",
              left: "0",
              height: "100%",
            }}
          >
            <FormContainer />
          </Grid>
          <Grid xs={8}>
            <NotesContainer />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: "100vw", height: "100%", backgroundColor: "#242424" }}>
        {notification && (
          <Notification
            status={notification.status}
            message={notification.message}
            title={notification.title}
            onClose={handleClose}
            open={notification.open}
          />
        )}
        <Grid
          container
          direction="column"
          sx={{
            width: "100%",
            height: "100%",
            padding: "2em",
            backgroundColor: "#242424",
            alignItems: "center",
          }}
        >
          <Grid
            xs={8}
            sx={{
              alignSelf: "start",
              textAlign: "center",
              padding: "0",
              position: "static",
              top: "20px",
              left: "0",
              height: "100%",
              width: '100%'
            }}
          >
            <FormContainer />
          </Grid>
          <Grid xs={8} sx={{ width: "100%" }}>
            <NotesContainer />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;
