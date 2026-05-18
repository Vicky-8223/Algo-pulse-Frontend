export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  solved: boolean;
  attempts: number;
  lastAttempt?: Date;
}

export interface Analytics {
  totalProblems: number;
  solvedProblems: number;
  solveRate: number;
  problemsByDifficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
  problemsByCategory: Record<string, number>;
  streak: number;
  lastSolvedDate?: Date;
  avgTimePerProblem: number;
}

export interface Recommendation {
  id: string;
  type: 'strength' | 'weakness' | 'tip';
  title: string;
  description: string;
  actionItems: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface HeatmapData {
  date: string;
  problems: number;
}
