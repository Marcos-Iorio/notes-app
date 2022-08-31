import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material/Alert";

interface Notification {
  status?: AlertColor;
  title?: string;
  message?: string;
  open?: boolean;
}

interface NotificationState {
  notification: Notification | null;
}

const initialState: NotificationState = { notification: null };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action: PayloadAction<Notification>) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
        open: action.payload.open
      };
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
