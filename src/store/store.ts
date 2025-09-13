import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import topicsSlice from "./slices/topicsSlice";
import progressSlice from "./slices/progressSlice";
import aiSlice from "./slices/aiSlice";
import uiSlice from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    topics: topicsSlice,
    progress: progressSlice,
    ai: aiSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
