import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";


interface AlertType {
  open?: boolean;
  status?: AlertColor;
  title?: string;
  message?: string;
  onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = (props: AlertType) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={5000}
      onClose={props.onClose}
    >
      <Alert
        onClose={props.onClose}
        severity={props.status}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{props.title}</AlertTitle>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
