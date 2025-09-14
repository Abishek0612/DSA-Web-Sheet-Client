import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import type { Topic, Problem } from "../types/topic";
import type {
  Progress,
  ProgressStats,
  UpdateProgressData,
} from "../types/progress";

// ... rest of your API code

// Export all types/interfaces
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    preferences: {
      theme: "light" | "dark" | "system";
      language: string;
      difficulty: "easy" | "medium" | "hard";
      notifications: {
        email: boolean;
        push: boolean;
        streaks: boolean;
        achievements: boolean;
      };
    };
    statistics: {
      totalSolved: number;
      easySolved: number;
      mediumSolved: number;
      hardSolved: number;
      currentStreak: number;
      maxStreak: number;
      lastSolvedDate?: string;
      totalTimeSpent: number;
      averageTimePerProblem: number;
    };
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface Progress {
  _id: string;
  userId: string;
  topicId: string;
  problemId: string;
  status: "pending" | "attempted" | "solved";
  difficulty: "Easy" | "Medium" | "Hard";
  timeSpent: number;
  attempts: number;
  lastAttempted: string;
  solvedAt?: string;
  notes?: string;
  rating?: number;
  bookmarked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressStats {
  totalSolved: number;
  totalAttempted: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalTimeSpent: number;
  averageTimePerProblem: number;
  currentStreak: number;
  maxStreak: number;
}

export interface UpdateProgressData {
  topicId: string;
  problemId: string;
  status: "pending" | "attempted" | "solved";
  timeSpent?: number;
  notes?: string;
  rating?: number;
}

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Only redirect to login if not already on login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Return a more user-friendly error
    const errorMessage =
      (error.response?.data as any)?.message ||
      (error.response?.data as any)?.error ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject(new Error(errorMessage));
  }
);

// Auth API endpoints
export const authAPI = {
  // Login user
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  },

  // Register user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/auth/register", userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Registration failed");
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch user data");
    }
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    try {
      const response = await api.post("/auth/refresh", { refreshToken });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Token refresh failed");
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post("/auth/logout");
      return response.data;
    } catch (error: any) {
      // Even if logout fails on server, clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw new Error(error.message || "Logout failed");
    }
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Password reset request failed");
    }
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Password reset failed");
    }
  },
};

// Topics API endpoints
export const topicsAPI = {
  // Get all topics
  getAll: async (params?: {
    category?: string;
    difficulty?: string;
    search?: string;
    sort?: string;
  }): Promise<Topic[]> => {
    try {
      const response = await api.get("/topics", { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch topics");
    }
  },

  // Get topic by ID
  getById: async (id: string): Promise<Topic> => {
    try {
      const response = await api.get(`/topics/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch topic");
    }
  },

  // Get categories
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await api.get("/topics/categories/list");
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch categories");
    }
  },

  // Search topics
  search: async (query: string, limit: number = 10): Promise<Topic[]> => {
    try {
      const response = await api.get("/topics/search", {
        params: { q: query, limit },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Search failed");
    }
  },
};

// Progress API endpoints
export const progressAPI = {
  // Get user progress
  getAll: async (params?: {
    topicId?: string;
    status?: string;
    difficulty?: string;
  }): Promise<Progress[]> => {
    try {
      const response = await api.get("/progress", { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch progress");
    }
  },

  // Update progress
  update: async (progressData: UpdateProgressData): Promise<Progress> => {
    try {
      const response = await api.post("/progress", progressData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update progress");
    }
  },

  // Get progress stats
  getStats: async (): Promise<ProgressStats> => {
    try {
      const response = await api.get("/progress/stats");
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch progress stats");
    }
  },
};

// AI API endpoints
export const aiAPI = {
  // Generate research
  generateResearch: async (data: {
    topic: string;
    context?: string;
  }): Promise<{
    topic: string;
    research: string;
    timestamp: string;
  }> => {
    try {
      const response = await api.post("/ai/research", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to generate research");
    }
  },

  // Chat with AI
  chat: async (data: {
    message: string;
    context?: string;
  }): Promise<{
    response: string;
    timestamp: string;
  }> => {
    try {
      const response = await api.post("/ai/chat", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to get AI response");
    }
  },
};

// User API endpoints
export const userAPI = {
  // Get profile
  getProfile: async () => {
    try {
      const response = await api.get("/user/profile");
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch profile");
    }
  },

  // Update profile
  updateProfile: async (profileData: { name?: string; email?: string }) => {
    try {
      const response = await api.put("/user/profile", profileData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update profile");
    }
  },
};

// Export the main api instance as default
export default api;
