import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ProgressState {
  userProgress: any[];
  dailyProgress: Record<string, number>;
  stats: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  userProgress: [],
  dailyProgress: {},
  stats: null,
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError } = progressSlice.actions;
export default progressSlice.reducer;
