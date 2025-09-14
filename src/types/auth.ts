export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "student" | "admin";
  preferences: UserPreferences;
  statistics: UserStatistics;
  createdAt: string;
  lastLogin?: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  difficulty: "easy" | "medium" | "hard";
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  streaks: boolean;
  achievements: boolean;
}

export interface UserStatistics {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  currentStreak: number;
  maxStreak: number;
  lastSolvedDate?: string;
  totalTimeSpent: number;
  averageTimePerProblem: number;
}

export interface LoginCredentials {
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
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
