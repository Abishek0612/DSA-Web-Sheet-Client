import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";

// Types
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
    preferences: any;
    statistics: any;
  };
}

// Base API instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      store.dispatch(logout());
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Login user
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  // Register user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    const response = await api.post("/auth/refresh", { refreshToken });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },
};

// Topics API endpoints
export const topicsAPI = {
  getAll: async (params?: any) => {
    const response = await api.get("/topics", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/topics/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get("/topics/categories/list");
    return response.data;
  },

  search: async (query: string) => {
    const response = await api.get("/topics/search", { params: { q: query } });
    return response.data;
  },
};

// Progress API endpoints
export const progressAPI = {
  getAll: async (params?: any) => {
    const response = await api.get("/progress", { params });
    return response.data;
  },

  update: async (progressData: any) => {
    const response = await api.post("/progress", progressData);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get("/progress/stats");
    return response.data;
  },

  getDailyProgress: async (year: number) => {
    const response = await api.get(`/progress/daily/${year}`);
    return response.data;
  },

  getTopicProgress: async (topicId: string) => {
    const response = await api.get(`/progress/topic/${topicId}`);
    return response.data;
  },

  toggleBookmark: async (topicId: string, problemId: string) => {
    const response = await api.post(
      `/progress/bookmark/${topicId}/${problemId}`
    );
    return response.data;
  },

  getBookmarks: async () => {
    const response = await api.get("/progress/bookmarks");
    return response.data;
  },
};

// AI API endpoints
export const aiAPI = {
  generateResearch: async (data: { topic: string; context?: string }) => {
    const response = await api.post("/ai/research", data);
    return response.data;
  },

  generateProblems: async (data: {
    language: string;
    difficulty: string;
    topic: string;
    count: number;
  }) => {
    const response = await api.post("/ai/generate-problems", data);
    return response.data;
  },

  chat: async (data: { message: string; context?: string }) => {
    const response = await api.post("/ai/chat", data);
    return response.data;
  },

  explainSolution: async (data: {
    code: string;
    language: string;
    problemDescription?: string;
  }) => {
    const response = await api.post("/ai/explain-solution", data);
    return response.data;
  },

  reviewCode: async (data: {
    code: string;
    language: string;
    problemDescription?: string;
  }) => {
    const response = await api.post("/ai/code-review", data);
    return response.data;
  },

  generateHint: async (data: {
    problemDescription: string;
    difficulty?: string;
    currentApproach?: string;
  }) => {
    const response = await api.post("/ai/hint", data);
    return response.data;
  },
};

// User API endpoints
export const userAPI = {
  getProfile: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  updateProfile: async (profileData: any) => {
    const response = await api.put("/user/profile", profileData);
    return response.data;
  },

  updateSettings: async (settings: any) => {
    const response = await api.put("/user/settings", settings);
    return response.data;
  },

  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await api.post("/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.post("/user/change-password", data);
    return response.data;
  },

  exportData: async () => {
    const response = await api.get("/user/export-data");
    return response.data;
  },
};

// Export default api instance
export default api;
