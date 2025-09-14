import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  researches: [],
  generatedProblems: [],
  chatHistory: [],
  loading: false,
  error: null,
};

export const generateResearch = createAsyncThunk(
  "ai/generateResearch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/ai/research", data);
      return {
        id: Date.now().toString(),
        topic: response.data.topic,
        content: response.data.research,
        timestamp: response.data.timestamp,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate research"
      );
    }
  }
);

export const generateProblems = createAsyncThunk(
  "ai/generateProblems",
  async (settings, { rejectWithValue }) => {
    try {
      const response = await api.post("/ai/generate-problems", settings);
      return response.data.problems;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate problems"
      );
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  "ai/sendChatMessage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/ai/chat", data);
      return {
        userMessage: {
          id: Date.now().toString(),
          content: data.message,
          role: "user",
          timestamp: new Date().toISOString(),
        },
        assistantMessage: {
          id: (Date.now() + 1).toString(),
          content: response.data.response,
          role: "assistant",
          timestamp: response.data.timestamp,
        },
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearChatHistory: (state) => {
      state.chatHistory = [];
    },
    addChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },
    clearResearches: (state) => {
      state.researches = [];
    },
    clearGeneratedProblems: (state) => {
      state.generatedProblems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateResearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateResearch.fulfilled, (state, action) => {
        state.loading = false;
        state.researches.unshift(action.payload);
        state.error = null;
      })
      .addCase(generateResearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(generateProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedProblems = action.payload;
        state.error = null;
      })
      .addCase(generateProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.chatHistory.push(action.payload.userMessage);
        state.chatHistory.push(action.payload.assistantMessage);
        state.error = null;
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearChatHistory,
  addChatMessage,
  clearResearches,
  clearGeneratedProblems,
} = aiSlice.actions;
export default aiSlice.reducer;
