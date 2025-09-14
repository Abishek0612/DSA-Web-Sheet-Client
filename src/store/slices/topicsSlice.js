import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { topicsAPI } from "../../services/api";

const initialState = {
  topics: [],
  currentTopic: null,
  categories: [],
  loading: false,
  error: null,
  filters: {},
};

export const fetchTopics = createAsyncThunk(
  "topics/fetchTopics",
  async (params, { rejectWithValue }) => {
    try {
      const topics = await topicsAPI.getAll(params);
      return topics;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch topics");
    }
  }
);

export const fetchTopicById = createAsyncThunk(
  "topics/fetchTopicById",
  async (id, { rejectWithValue }) => {
    try {
      const topic = await topicsAPI.getById(id);
      return topic;
    } catch (error) {
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
    } catch (error) {
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
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentTopic: (state, action) => {
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
        state.error = action.payload;
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
        state.error = action.payload;
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
