import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

interface Research {
  id: string;
  topic: string;
  content: string;
  timestamp: string;
}

interface GeneratedProblem {
  title: string;
  description: string;
  difficulty: string;
  language: string;
  topic: string;
  examples: any[];
  hints: string[];
  timeComplexity: string;
  spaceComplexity: string;
}

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

interface AIState {
  researches: Research[];
  generatedProblems: GeneratedProblem[];
  chatHistory: ChatMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: AIState = {
  researches: [],
  generatedProblems: [],
  chatHistory: [],
  loading: false,
  error: null,
};

export const generateResearch = createAsyncThunk(
  "ai/generateResearch",
  async (data: { topic: string; context?: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/ai/research", data);
      return {
        id: Date.now().toString(),
        topic: response.data.topic,
        content: response.data.research,
        timestamp: response.data.timestamp,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate research"
      );
    }
  }
);

export const generateProblems = createAsyncThunk(
  "ai/generateProblems",
  async (
    settings: {
      language: string;
      difficulty: string;
      topic: string;
      count: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/ai/generate-problems", settings);
      return response.data.problems;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate problems"
      );
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  "ai/sendChatMessage",
  async (data: { message: string; context?: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/ai/chat", data);
      return {
        userMessage: {
          id: Date.now().toString(),
          content: data.message,
          role: "user" as const,
          timestamp: new Date().toISOString(),
        },
        assistantMessage: {
          id: (Date.now() + 1).toString(),
          content: response.data.response,
          role: "assistant" as const,
          timestamp: response.data.timestamp,
        },
      };
    } catch (error: any) {
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
