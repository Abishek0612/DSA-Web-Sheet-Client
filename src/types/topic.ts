export interface Topic {
  _id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  order: number;
  isActive: boolean;
  problems: Problem[];
  totalProblems: number;
  estimatedTime: string;
  prerequisites: string[];
  tags: string[];
  progress?: TopicProgress;
  createdAt: string;
  updatedAt: string;
}

export interface Problem {
  _id: string;
  name: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  links: ProblemLinks;
  tags: string[];
  companies: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  hints: string[];
  solution?: ProblemSolution;
  progress?: ProblemProgress;
}

export interface ProblemLinks {
  leetcode?: string;
  codeforces?: string;
  youtube?: string;
  article?: string;
  editorial?: string;
}

export interface ProblemSolution {
  approach: string;
  code: string;
  explanation: string;
  language: string;
}

export interface ProblemProgress {
  status: "pending" | "attempted" | "solved";
  timeSpent: number;
  attempts: number;
  lastAttempted: string;
  solvedAt?: string;
  notes?: string;
  rating?: number;
  bookmarked?: boolean;
}

export interface TopicProgress {
  solved: number;
  total: number;
  percentage: number;
  timeSpent: number;
  lastActivity?: string;
}

export interface TopicFilters {
  category?: string;
  difficulty?: string;
  status?: string;
  search?: string;
  sort?: "name" | "progress" | "difficulty" | "order";
}

export interface TopicsState {
  topics: Topic[];
  currentTopic: Topic | null;
  categories: string[];
  filters: TopicFilters;
  loading: boolean;
  error: string | null;
}
