// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import topicsSlice from "./slices/topicsSlice";
import progressSlice from "./slices/progressSlice";
import uiSlice from "./slices/uiSlice";
import notificationSlice from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    topics: topicsSlice,
    progress: progressSlice,
    ui: uiSlice,
    notifications: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: import.meta.env.DEV,
});

export default store;
