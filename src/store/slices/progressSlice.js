import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { progressAPI } from "../../services/api";

const initialState = {
  userProgress: [],
  dailyProgress: {},
  stats: null,
  loading: false,
  error: null,
};

export const fetchProgress = createAsyncThunk(
  "progress/fetchProgress",
  async (_, { rejectWithValue }) => {
    try {
      const progress = await progressAPI.getAll();
      return progress;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch progress");
    }
  }
);

export const updateProgress = createAsyncThunk(
  "progress/updateProgress",
  async (progressData, { rejectWithValue }) => {
    try {
      const updatedProgress = await progressAPI.update(progressData);
      return updatedProgress;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update progress");
    }
  }
);

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
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
        state.error = action.payload;
      })
      .addCase(updateProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.loading = false;
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
        state.error = action.payload;
      });
  },
});

export const { setLoading, setError, clearError } = progressSlice.actions;
export default progressSlice.reducer;
