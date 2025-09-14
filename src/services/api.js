import axios from "axios";

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
  (response) => response,
  async (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject(new Error(errorMessage));
  }
);

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
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
  getAll: async (params) => {
    const response = await api.get("/topics", { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/topics/${id}`);
    return response.data;
  },
  getCategories: async () => {
    const response = await api.get("/topics/categories/list");
    return response.data;
  },
};

export const progressAPI = {
  getAll: async (params) => {
    const response = await api.get("/progress", { params });
    return response.data;
  },
  update: async (progressData) => {
    const response = await api.post("/progress", progressData);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get("/progress/stats");
    return response.data;
  },
};

export const aiAPI = {
  generateResearch: async (data) => {
    const response = await api.post("/ai/research", data);
    return response.data;
  },
  chat: async (data) => {
    const response = await api.post("/ai/chat", data);
    return response.data;
  },
};

export const userAPI = {
  getProfile: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put("/user/profile", profileData);
    return response.data;
  },
};

export default api;
