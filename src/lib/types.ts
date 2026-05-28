// Shared types across server + client

export type UserRole = "teacher" | "student" | "admin";

export interface Institution {
  id: string;
  name: string;
  city: string;
  state: string;
  type: "school" | "college" | "university";
  logoUrl?: string;
  totalScore: number;
  teacherCount: number;
  studentCount: number;
  rank: number;
}

export interface Challenge {
  id: string;
  title: string;
  brief: string;
  category: "prompt-engineering" | "ai-ethics" | "ai-build" | "ai-solve";
  difficulty: "beginner" | "intermediate" | "advanced";
  pointsReward: number;
  deadline: string;
  submissionCount: number;
}

export interface Submission {
  id: string;
  challengeId: string;
  studentId: string;
  institutionId: string;
  content: string;
  score: number;
  feedback: {
    strengths: string[];
    improvements: string[];
    verdict: string;
    bonus_tip: string;
  };
  createdAt: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  bloom: "remember" | "understand" | "apply" | "analyze";
}
