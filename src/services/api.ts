import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import type { Topic } from "../types/topic";
import type {
  Progress,
  ProgressStats,
  UpdateProgressData,
} from "../types/progress";

// --- TYPE DEFINITIONS ---

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
    createdAt: string;
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

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

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

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    const errorMessage =
      (error.response?.data as any)?.message ||
      (error.response?.data as any)?.error ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject(new Error(errorMessage));
  }
);

export const authAPI = {
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.resolve();
  },
};

export const topicsAPI = {
  getAll: async (params?: {
    category?: string;
    difficulty?: string;
    search?: string;
    sort?: string;
  }): Promise<Topic[]> => {
    const response = await api.get("/topics", { params });
    return response.data;
  },
  getById: async (id: string): Promise<Topic> => {
    const response = await api.get(`/topics/${id}`);
    return response.data;
  },
  getCategories: async (): Promise<string[]> => {
    const response = await api.get("/topics/categories/list");
    return response.data;
  },
};

export const progressAPI = {
  getAll: async (params?: {
    topicId?: string;
    status?: string;
    difficulty?: string;
  }): Promise<Progress[]> => {
    const response = await api.get("/progress", { params });
    return response.data;
  },
  update: async (progressData: UpdateProgressData): Promise<Progress> => {
    const response = await api.post("/progress", progressData);
    return response.data;
  },
  getStats: async (): Promise<ProgressStats> => {
    const response = await api.get("/progress/stats");
    return response.data;
  },
};

export const aiAPI = {
  generateResearch: async (data: {
    topic: string;
    context?: string;
  }): Promise<{
    topic: string;
    research: string;
    timestamp: string;
  }> => {
    const response = await api.post("/ai/research", data);
    return response.data;
  },
  chat: async (data: {
    message: string;
    context?: string;
  }): Promise<{
    response: string;
    timestamp: string;
  }> => {
    const response = await api.post("/ai/chat", data);
    return response.data;
  },
};

export const userAPI = {
  getProfile: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },
  updateProfile: async (profileData: { name?: string; email?: string }) => {
    const response = await api.put("/user/profile", profileData);
    return response.data;
  },
};

export default api;
