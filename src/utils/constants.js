export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
    REFRESH: "/auth/refresh",
  },
  TOPICS: {
    LIST: "/topics",
    BY_ID: (id: string) => `/topics/${id}`,
    CATEGORIES: "/topics/categories/list",
  },
  PROGRESS: {
    LIST: "/progress",
    UPDATE: "/progress",
    DAILY: (year: number) => `/progress/daily/${year}`,
  },
  AI: {
    RESEARCH: "/ai/research",
    GENERATE_PROBLEMS: "/ai/generate-problems",
    CHAT: "/ai/chat",
  },
  USER: {
    PROFILE: "/user/profile",
    SETTINGS: "/user/settings",
    AVATAR: "/user/avatar",
  },
};

export const DIFFICULTY_LEVELS = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
} as const;

export const PROBLEM_STATUS = {
  PENDING: "pending",
  ATTEMPTED: "attempted",
  SOLVED: "solved",
} as const;

export const PROGRAMMING_LANGUAGES = [
  { value: "javascript", label: "JavaScript", color: "#f7df1e" },
  { value: "python", label: "Python", color: "#3776ab" },
  { value: "java", label: "Java", color: "#ed8b00" },
  { value: "cpp", label: "C++", color: "#00599c" },
  { value: "go", label: "Go", color: "#00add8" },
  { value: "rust", label: "Rust", color: "#000000" },
  { value: "typescript", label: "TypeScript", color: "#007acc" },
];

export const TOPIC_CATEGORIES = [
  "Data Structures",
  "Algorithms",
  "Dynamic Programming",
  "Graph Theory",
  "String Processing",
  "Mathematics",
  "Greedy",
  "Sorting & Searching",
];

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
} as const;

export const LOCAL_STORAGE_KEYS = {
  THEME: "theme",
  TOKEN: "token",
  USER_PREFERENCES: "userPreferences",
  LAST_VISITED: "lastVisited",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  TOPICS: "/topics",
  TOPIC_DETAIL: "/topics/:id",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  PROGRESS: "/progress",
  AI_RESEARCH: "/ai-research",
  PROBLEM_GENERATOR: "/problem-generator",
  NOT_FOUND: "/404",
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;
