import { Bot, Brain, Code2, Compass, GraduationCap, MessageSquare, Search, ShieldCheck, Sparkles, Workflow } from "lucide-react";

export type UserRole = "teacher" | "student";

export type LearningLevel = {
  level: 1 | 2 | 3;
  title: string;
  subtitle: string;
  unlockPoints: number;
  quizPoints: number;
  topics: string[];
  teacherOutcome: string;
  studentOutcome: string;
  tools: {
    name: string;
    description: string;
    icon: typeof Sparkles;
  }[];
};

export const learningLevels: LearningLevel[] = [
  {
    level: 1,
    title: "AI Basics",
    subtitle: "Understand AI before using it in class or study.",
    unlockPoints: 0,
    quizPoints: 120,
    topics: [
      "What AI is",
      "How to use AI safely",
      "Good vs bad AI use",
      "Basic prompting",
      "AI in education",
    ],
    teacherOutcome: "Create safe classroom prompts, explain AI limits, and use AI for simple lesson support.",
    studentOutcome: "Use AI as a study helper without copying, leaking private data, or trusting every answer.",
    tools: [
      { name: "ChatGPT", description: "Draft explanations, lesson ideas, study help, and simple rubrics.", icon: MessageSquare },
      { name: "Gemini", description: "Explore multimodal learning, summaries, and everyday productivity tasks.", icon: Sparkles },
    ],
  },
  {
    level: 2,
    title: "Research and Reasoning",
    subtitle: "Use AI for deeper thinking, comparison, and fact-aware learning.",
    unlockPoints: 300,
    quizPoints: 180,
    topics: [
      "Research workflows",
      "Source checking",
      "Comparing model answers",
      "Critical thinking with AI",
      "Classroom AI policies",
    ],
    teacherOutcome: "Design stronger assignments, compare explanations, and guide responsible research.",
    studentOutcome: "Use AI to research, verify, summarize, and improve your own thinking.",
    tools: [
      { name: "Claude", description: "Long-form reasoning, writing review, and thoughtful classroom content.", icon: Brain },
      { name: "Perplexity", description: "Research with links, citations, and current-source discovery.", icon: Search },
      { name: "Grok", description: "Fast idea exploration, debate prompts, and alternative viewpoints.", icon: Bot },
    ],
  },
  {
    level: 3,
    title: "Builder Workflows",
    subtitle: "Move from AI user to AI builder with step-by-step creation tools.",
    unlockPoints: 750,
    quizPoints: 260,
    topics: [
      "AI project planning",
      "Step-by-step build workflows",
      "Using AI coding agents",
      "Testing and improving outputs",
      "Building useful education tools",
    ],
    teacherOutcome: "Prototype worksheets, dashboards, and class tools using guided AI workflows.",
    studentOutcome: "Build small apps, automations, and projects with AI assistance.",
    tools: [
      { name: "Manus", description: "Agentic task execution and multi-step research/build workflows.", icon: Compass },
      { name: "Codex", description: "Coding agent for building and improving real software projects.", icon: Code2 },
      { name: "Flow", description: "Structured workflows for repeatable AI-assisted creation.", icon: Workflow },
      { name: "Antigravity", description: "Advanced builder environment for agentic development.", icon: GraduationCap },
    ],
  },
];

export const quizRules = [
  "Quizzes open two times per week.",
  "Highest score from the week counts toward points.",
  "Level 1 unlocks tools immediately after the first passing quiz.",
  "Level 2 and Level 3 unlock when points reach the threshold.",
];

export const levelOneQuestions = [
  {
    question: "What is AI best understood as for beginners?",
    options: [
      "A human teacher replacement",
      "A tool that predicts, generates, and assists using patterns from data",
      "A guaranteed source of truth",
      "Only a coding tool",
    ],
    answer: 1,
  },
  {
    question: "Which is the safest classroom AI habit?",
    options: [
      "Paste private student records into any chatbot",
      "Copy AI answers directly",
      "Review AI output before using it with students",
      "Use AI only for exams",
    ],
    answer: 2,
  },
  {
    question: "Which prompt is strongest?",
    options: [
      "Explain this",
      "Make lesson",
      "Act as a Class 8 science teacher and explain photosynthesis in 5 steps with one Indian example",
      "Give answer fast",
    ],
    answer: 2,
  },
  {
    question: "What is a bad use of AI for students?",
    options: [
      "Asking for hints",
      "Checking your draft",
      "Generating practice questions",
      "Submitting AI output as your own work",
    ],
    answer: 3,
  },
  {
    question: "Why should education institutions teach AI awareness first?",
    options: [
      "So users understand safe, useful, and honest AI usage",
      "So nobody uses AI tools",
      "So marks become automatic",
      "So teachers stop planning lessons",
    ],
    answer: 0,
  },
];

export const roleCopy: Record<UserRole, { label: string; heading: string; description: string }> = {
  teacher: {
    label: "Teacher",
    heading: "Teach AI safely, then use it in classroom work.",
    description: "Progress from AI basics to lesson support, research workflows, and builder-level classroom tools.",
  },
  student: {
    label: "Student",
    heading: "Learn AI, practice AI, then build with AI.",
    description: "Use the levels to understand safe AI use, improve study workflows, and unlock builder tools.",
  },
};

export const safetyPillars = [
  { title: "Privacy", text: "Never paste private student or institution data into public AI tools.", icon: ShieldCheck },
  { title: "Verification", text: "AI can be wrong. Users must check facts, sources, and calculations.", icon: Search },
  { title: "Learning honesty", text: "AI should support learning, not replace thinking or original work.", icon: Brain },
];
