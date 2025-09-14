import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { topicsAPI, Topic } from "../../services/api";

export interface TopicsState {
  topics: Topic[];
  currentTopic: Topic | null;
  categories: string[];
  loading: boolean;
  error: string | null;
  filters: {
    category?: string;
    difficulty?: string;
    search?: string;
    sort?: string;
  };
}

const initialState: TopicsState = {
  topics: [],
  currentTopic: null,
  categories: [],
  loading: false,
  error: null,
  filters: {},
};

// Async Thunks
export const fetchTopics = createAsyncThunk(
  "topics/fetchTopics",
  async (params?: any, { rejectWithValue }) => {
    try {
      const topics = await topicsAPI.getAll(params);
      return topics;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch topics");
    }
  }
);

export const fetchTopicById = createAsyncThunk(
  "topics/fetchTopicById",
  async (id: string, { rejectWithValue }) => {
    try {
      const topic = await topicsAPI.getById(id);
      return topic;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch topic");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "topics/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await topicsAPI.getCategories();
      return categories;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch categories");
    }
  }
);

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentTopic: (state, action: PayloadAction<Topic | null>) => {
      state.currentTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Topics
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
        state.error = null;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Topic by ID
    builder
      .addCase(fetchTopicById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTopic = action.payload;
        state.error = null;
      })
      .addCase(fetchTopicById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Categories
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { clearError, setFilters, clearFilters, setCurrentTopic } =
  topicsSlice.actions;
export default topicsSlice.reducer;
