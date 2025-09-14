import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { progressAPI } from "../../services/api";

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

// Async thunks
export const fetchProgress = createAsyncThunk(
  "progress/fetchProgress",
  async (_, { rejectWithValue }) => {
    try {
      const progress = await progressAPI.getAll();
      return progress;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch progress");
    }
  }
);

export const updateProgress = createAsyncThunk(
  "progress/updateProgress",
  async (progressData: any, { rejectWithValue }) => {
    try {
      const updatedProgress = await progressAPI.update(progressData);
      return updatedProgress;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update progress");
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.userProgress = action.payload;
        state.error = null;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.loading = false;
        // Update the progress in the state
        const index = state.userProgress.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.userProgress[index] = action.payload;
        } else {
          state.userProgress.push(action.payload);
        }
        state.error = null;
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading, setError, clearError } = progressSlice.actions;
export default progressSlice.reducer;
