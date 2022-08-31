import { configureStore } from '@reduxjs/toolkit';
import noteSlice from './notes-slice';
import notificationSlice from './notification-slice';

const store = configureStore({
    reducer: {
        notes: noteSlice.reducer,
        notification: notificationSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export default store;