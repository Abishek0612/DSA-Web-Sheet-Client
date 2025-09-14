import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import topicsSlice from "./slices/topicsSlice";
import progressSlice from "./slices/progressSlice";
import uiSlice from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    topics: topicsSlice,
    progress: progressSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for TypeScript
export { useAppDispatch, useAppSelector } from "./hooks";

export default store;
