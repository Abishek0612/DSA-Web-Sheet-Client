import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "system",
  sidebarOpen: false,
  notifications: [],
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
} = uiSlice.actions;
export default uiSlice.reducer;
