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
  solution?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DailyProgress {
  date: string;
  problemsSolved: number;
  timeSpent: number;
  topics: string[];
}

export interface WeeklyProgress {
  week: string;
  totalSolved: number;
  dailyBreakdown: DailyProgress[];
}

export interface MonthlyProgress {
  month: string;
  totalSolved: number;
  weeklyBreakdown: WeeklyProgress[];
}

export interface ProgressStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  currentStreak: number;
  maxStreak: number;
  totalTimeSpent: number;
  averageTimePerProblem: number;
  topicsCompleted: number;
  recentActivity: Progress[];
}

export interface ProgressCalendarData {
  [date: string]: number;
}

export interface ProgressState {
  userProgress: Progress[];
  dailyProgress: ProgressCalendarData;
  stats: ProgressStats | null;
  loading: boolean;
  error: string | null;
}

export interface UpdateProgressData {
  topicId: string;
  problemId: string;
  status: "pending" | "attempted" | "solved";
  timeSpent?: number;
  notes?: string;
  rating?: number;
}
