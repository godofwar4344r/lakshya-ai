"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Gauge,
  Loader2,
  Sparkles,
  Trophy,
  Copy,
  Check,
  Plus,
  Compass,
  Link2,
  Cpu,
  Tv,
  Users,
  ChevronDown,
  User,
  Folder,
  Play,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  FileText,
  Send,
  Loader,
  X,
  PlusCircle,
  Settings,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { QuizQuestion } from "@/lib/types";

// Types
type Role = "teacher" | "student" | "admin";
type Tab = "tools" | "learn" | "tasks" | "connectors" | "skills" | "channels" | "pairings";

type Feedback = {
  score: number;
  strengths: string[];
  improvements: string[];
  verdict: string;
  bonus_tip: string;
};

// Course Data (Awareness)
const seedCourse = {
  title: "Level 1: AI Awareness for Education",
  modules: [
    {
      title: "What AI can and cannot do",
      lesson: "AI can draft, explain, summarize, quiz, translate, and give feedback. It cannot replace teacher judgment, verify facts automatically, or understand local classroom context unless you provide it.",
      activity: "Write one classroom task where AI saves time and one task where a human must decide.",
    },
    {
      title: "Safe prompting basics",
      lesson: "A good prompt gives role, goal, context, constraints, and output format. Teachers should avoid sharing private student data and should review every AI output before using it.",
      activity: "Improve this prompt: 'Make a lesson on fractions' by adding grade, duration, examples, and format.",
    },
    {
      title: "AI in daily learning",
      lesson: "Students can use AI to understand concepts, practice feedback, compare answers, and build small projects. The goal is learning with AI, not copying from AI.",
      activity: "Create one AI use rule for students that encourages learning and prevents misuse.",
    },
  ],
  questions: [
    {
      question: "What should be done before deploying AI tools in a classroom?",
      options: [
        "Ask AI to teach the whole syllabus",
        "Understand where AI is useful and what requires human review",
        "Let students use any tool with no guidelines",
        "Block AI on all school computers"
      ],
      answer: 1,
      why: "Awareness is the base. Teachers must know strengths, limits, and how to verify AI outputs.",
    },
    {
      question: "Which of these is the most effective prompt structure?",
      options: [
        "Create lesson plan",
        "Act as a Class 8 Science teacher and create a 40-minute lesson on photosynthesis with Indian context examples",
        "Explain science topic simply",
        "Draft syllabus"
      ],
      answer: 1,
      why: "It provides a clear role, grade, duration, topic, and contextual constraints.",
    },
    {
      question: "What metrics are best to measure school AI adoption?",
      options: [
        "Total accounts created",
        "Active teacher usage, student challenge submissions, and course completion rates",
        "Number of computers purchased",
        "Social media mentions"
      ],
      answer: 1,
      why: "Real adoption signals require actual usage metrics, not just vanity sign-up numbers.",
    },
  ],
};

// Refinement constants
const TEACHER_VIDEOS = [
  {
    title: "Basic How to Prompt for Teaching",
    duration: "10 mins",
    desc: "Learn how to write effective prompts using the Role-Goal-Context-Constraints framework for classroom lessons.",
    category: "Prompting Basics"
  },
  {
    title: "How to Make Visuals for Topic Explanation",
    duration: "12 mins",
    desc: "Guide on creating stunning visual diagrams, worksheets, and slide illustrations using text-to-image AI tools.",
    category: "AI Visuals"
  },
  {
    title: "AI in Daily Classroom Workflows",
    duration: "8 mins",
    desc: "Integrate ChatGPT and Gemini for grading rubrics, exam design, and personalized student feedback pipelines.",
    category: "Workflows"
  }
];

const EXTERNAL_TOOLS = [
  {
    name: "ChatGPT",
    provider: "OpenAI",
    desc: "Best for writing lessons, letters, and student rubrics.",
    tag: "Text Generation",
    link: "https://chatgpt.com",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    name: "Google Gemini",
    provider: "Google",
    desc: "Great for analyzing large files, spreadsheets, and student lists.",
    tag: "Multimodal Analysis",
    link: "https://gemini.google.com",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    name: "NotebookLM",
    provider: "Google",
    desc: "Create an audio podcast and summarized notes directly from school textbooks.",
    tag: "Research & Synthesis",
    link: "https://notebooklm.google.com",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    name: "Perplexity AI",
    provider: "Perplexity",
    desc: "Perfect for real-time academic citations and fact-checking resources.",
    tag: "Real-time Search",
    link: "https://perplexity.ai",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200"
  }
];

const PHYSICS_TEACHER_TEMPLATES = [
  {
    title: "Electricity Concept Explainer (Ohm's Law)",
    prompt: "Act as an expert Class 10 Physics teacher. Explain Ohm's Law (V = IR) using a simple, relatable water pipe analogy. Include visual descriptions for voltage, current, and resistance. Write it in clear English with minor Indian context (e.g. talking about street water pumps).",
    response: "### Concept Explainer: Ohm's Law (Class 10 Physics)\n\n**Analogy: The Street Water Tank & Pipe Pipeline**\nImagine the overhead water tank in your house or a Delhi street water supply pump. \n\n1. **Voltage (V) = Water Pressure**\n   The height of the water tank or the force of the pump creates the pressure that pushes water through the pipes. The higher the pressure (voltage), the more water wants to flow.\n   \n2. **Current (I) = Water Flow Rate**\n   This is the actual amount of water flowing through the pipe per second. More water moving means a higher current of water.\n   \n3. **Resistance (R) = Narrow Pipe / Valve**\n   If there is a kink in the pipe, or dirt inside it, or if you narrow the pipe diameter, the water slows down. This blockage is resistance.\n\n**The Relationship (V = IR):**\n* If you double the tank's height (double **Voltage**), water flows twice as fast (double **Current**), assuming the pipe remains the same.\n* If you narrow the pipe (increase **Resistance**), water flow (**Current**) drops.\n\n**CBSE Class 10 Key takeaway for exams:**\nOhm's Law states that at a constant temperature, the electric current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) across its ends.\n\nV = IR"
  },
  {
    title: "Bloom-aware Light Quiz (Reflection & Refraction)",
    prompt: "Generate a Bloom's Taxonomy aligned quiz with 3 MCQs on 'Light - Reflection and Refraction' for Class 10 Physics. Include 1 Remembering level question, 1 Applying level question, and 1 Analyzing level question. Provide answers and rationales.",
    response: "### Quiz: Light Reflection and Refraction (Class 10)\n\n**Q1 (Remembering Level):**\nWhat is the focal length of a plane mirror?\nA) Zero\nB) Infinity\nC) 25 cm\nD) -25 cm\n* **Correct Answer:** B) Infinity\n* **Rationale:** A plane mirror is flat, which means it has a curvature radius of infinity, so its focal length (f = R/2) is also infinity.\n\n**Q2 (Applying Level):**\nAn object is placed at a distance of 12 cm in front of a concave mirror of focal length 8 cm. Find the position of the image.\nA) -24 cm\nB) -16 cm\nC) +24 cm\nD) +16 cm\n* **Correct Answer:** A) -24 cm\n* **Rationale:** Using Mirror Formula: 1/f = 1/v + 1/u. Here, f = -8 cm, u = -12 cm.\n  1/v = 1/-8 - 1/-12 = -1/8 + 1/12 = (-3 + 2)/24 = -1/24 => v = -24 cm. The image is real and inverted.\n\n**Q3 (Analyzing Level):**\nA light ray enters medium A from air at an angle of 30 degrees and medium B at 45 degrees. Which medium is optically denser, and why?\nA) Medium A, because the angle of refraction is smaller.\nB) Medium B, because light travels faster in it.\nC) Both have the same density.\nD) Air is denser than both.\n* **Correct Answer:** A) Medium A\n* **Rationale:** By Snell's Law, n = sin(i)/sin(r). A smaller refraction angle means the ray bent closer to the normal, signaling a higher refractive index (optically denser medium)."
  },
  {
    title: "Magnetic Effects 45-min Lesson Plan",
    prompt: "Write a detailed 45-minute CBSE lesson outline for 'Magnetic Effects of Electric Current' - specifically on Electromagnetic Induction. Include timings, classroom activity, and teacher board work notes.",
    response: "### Lesson Plan: Electromagnetic Induction (45 Mins)\n\n* **Grade:** Class 10 CBSE\n* **Subject:** Physics (Science)\n* **Goal:** Understand Faraday's discovery of current generation using magnetism.\n\n#### Lesson Timeline:\n* **0 - 10 Mins (Hook & Recall):**\n  * *Recall:* Oersted's experiment (moving current creates magnetic fields).\n  * *Question:* Can we do the reverse? Can magnet movement create electric current?\n* **10 - 25 Mins (Core Concept - Faraday's Experiment):**\n  * Show a solenoid connected to a galvanometer.\n  * Move a bar magnet quickly inside the coil: point out the deflection in the galvanometer.\n  * *Key Definition:* The phenomenon of producing induced current in a coil due to change in magnetic field lines linked with it is called Electromagnetic Induction (EMI).\n* **25 - 35 Mins (Classroom Activity & Interaction):**\n  * Ask students to predict galvanometer behavior when:\n    1. Magnet is stationary inside coil (Answer: Zero deflection).\n    2. Magnet is pulled out rapidly (Answer: Deflection in opposite direction).\n    3. Magnet speed is doubled (Answer: Deflection magnitude increases).\n* **35 - 45 Mins (Rule & Wrap-up):**\n  * Introduce Fleming's Right-Hand Rule to determine induced current direction.\n  * *Homework:* Draw diagram of electromagnetic induction setup and solve 2 textbook questions."
  }
];

const PHYSICS_STUDENT_TEMPLATES = [
  {
    title: "Understand Refractive Index",
    prompt: "Explain Refractive Index in Class 10 Physics in the simplest way possible. Why does light bend when going from air to glass?",
    response: "### Study Buddy Explainer: Refractive Index\n\n**What is it?**\nRefractive index (n) is a measure of how much light 'slows down' when it enters a medium compared to empty space (vacuum).\n  n = Speed of light in vacuum (c) / Speed of light in medium (v)\n\n**Why does light bend?**\nImagine you are pushing a shopping cart from a concrete pathway (easy to roll) onto grass (hard to roll) at an angle.\n* When the front-right wheel hits the grass first, it slows down immediately.\n* When the front-left wheel is still on the concrete, it moves fast.\n* Because one wheel is moving slow and the other fast, the cart pivot-turns/bends.\n\nSimilarly, when light hits glass at an angle, one side of the wavefront slows down first, causing the entire light beam to bend.\n\n* **Air to Glass:** Light goes from fast (rarer) to slow (denser), so it bends towards the normal."
  },
  {
    title: "Ohm's Law Solver Prompt Chain",
    prompt: "I want to solve Class 10 physics numeric questions on resistance and power. Guide me step-by-step.",
    response: "### Step-by-Step Numerical Solver: Electricity\n\n**Let's solve a practice numeric together:**\n*Problem: An electric bulb is rated 220V and 100W. When it is operated on 110V, what will be the power consumed?*\n\n**Step 1: Write down given values**\n* Nominal Voltage (V1) = 220 V\n* Nominal Power (P1) = 100 W\n* Operating Voltage (V2) = 110 V\n\n**Step 2: Find the Resistance of the bulb (it remains constant!)**\nFormula: P = V^2 / R => R = V^2 / P\n  R = (220 * 220) / 100 = 48400 / 100 = 484 Ohms\n\n**Step 3: Calculate power at new voltage (110V)**\nFormula: P_new = V2^2 / R\n  P_new = (110 * 110) / 484 = 12100 / 484 = 25 W\n\n**Verdict:** The power consumed is 25 Watts."
  },
  {
    title: "AI Homework Ethics Guide",
    prompt: "Is it okay if I use ChatGPT/Gemini to write my school physics answers? How do I use it safely?",
    response: "### Student AI Policy: Ethics Guide\n\nUsing AI tools like ChatGPT or Gemini is a great way to study, but there is a clear boundary between using AI as a tutor and cheating.\n\n#### Recommended Dos:\n* **The Explainer Check:** Ask AI to 'explain this topic to a 10-year-old' or 'give me 3 real-world analogies.'\n* **Practice Feedback:** Paste your handwritten answer and ask, 'I wrote this answer. What CBSE grading criteria did I miss?'\n* **Formula Derivations:** Ask AI to break down difficult math steps in equations.\n\n#### Avoid:\n* **Direct Copy-Paste:** Submitting AI-generated paragraphs as your own homework. Your teachers know your vocabulary and style, and can easily tell.\n* **Blind Trust:** AI can make math errors ('hallucinations'). Always double-check numerical outputs with your textbook formulas."
  }
];

export default function WorkspacePage() {
  // Navigation & Role States
  const [activeRole, setActiveRole] = useState<Role>("teacher");
  const [activeTab, setActiveTab] = useState<Tab>("tools");
  
  // Simulated Auth Portal State
  const [authenticating, setAuthenticating] = useState(true);
  
  // Dropdown UI States
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Selected Tool/Challenge (inline views)
  const [selectedTool, setSelectedTool] = useState<"lesson-plan" | "quiz" | "explainer" | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  // Chat Input State
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [chatLoading, setChatLoading] = useState(false);

  // Teacher Tool Forms
  // 1. Lesson Plan
  const [lessonSubject, setLessonSubject] = useState("Science");
  const [lessonGrade, setLessonGrade] = useState("Class 8");
  const [lessonTopic, setLessonTopic] = useState("Photosynthesis");
  const [lessonDuration, setLessonDuration] = useState("40");
  const [lessonOutput, setLessonOutput] = useState("");
  const [lessonLoading, setLessonLoading] = useState(false);
  const [lessonCopied, setLessonCopied] = useState(false);

  // 2. Quiz Generator
  const [quizSubject, setQuizSubject] = useState("History");
  const [quizGrade, setQuizGrade] = useState("Class 9");
  const [quizTopic, setQuizTopic] = useState("The Mughal Empire");
  const [quizCount, setQuizCount] = useState(5);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizReveal, setQuizReveal] = useState<Record<number, boolean>>({});

  // 3. Explainer
  const [explainerConcept, setExplainerConcept] = useState("Black holes");
  const [explainerContext, setExplainerContext] = useState("");
  const [explainerOutput, setExplainerOutput] = useState("");
  const [explainerLoading, setExplainerLoading] = useState(false);

  // Student Arena Forms
  const CHALLENGES = {
    "photosynthesis-chain": {
      title: "Build a 5-prompt chain that teaches photosynthesis to a 7-year-old",
      brief: "Design 5 sequential prompts that progressively teach photosynthesis to a 7-year-old who has never heard the word. Submit the prompts plus a transcript of the final AI output. Judged on pedagogical sequencing, age-appropriateness, and creativity.",
      category: "Prompt Engineering",
      difficulty: "Beginner",
      points: 100,
    },
    "ai-ethics-policy": {
      title: "AI ethics in Indian education — write the policy",
      brief: "Write a 300-word AI usage policy that you would propose to your school principal. Cover: where AI use is allowed, where it isn't, how to detect misuse, and how to teach AI literacy. Cite at least one real Indian regulation or NEP 2020 clause.",
      category: "AI Ethics",
      difficulty: "Intermediate",
      points: 150,
    },
    "solve-indian-problem": {
      title: "Solve a real Indian problem with one AI prompt",
      brief: "Identify a real operational problem in your school, college or local area (e.g. timetabling, bus routing, exam paper translation, library catalogue cleanup). Solve it with ONE prompt to ChatGPT/AI models. Submit the prompt, the AI output, and a 100-word reflection on whether it actually works.",
      category: "AI Solve",
      difficulty: "Intermediate",
      points: 200,
    }
  };

  const [studentSubmission, setStudentSubmission] = useState("");
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentFeedback, setStudentFeedback] = useState<Feedback | null>(null);

  // Learn Course State
  const [courseSelectedAnswers, setCourseSelectedAnswers] = useState<Record<number, number>>({});
  const [playingVideo, setPlayingVideo] = useState<any>(null);
  const [selectedPhysicsTemplate, setSelectedPhysicsTemplate] = useState<any>(null);
  const [selectedStudentPhysicsTemplate, setSelectedStudentPhysicsTemplate] = useState<any>(null);
  const [learnRegenerateLoading, setLearnRegenerateLoading] = useState(false);
  const [courseData, setCourseData] = useState(seedCourse);

  const courseScore = useMemo(() => {
    return courseData.questions.reduce((sum, question, index) => sum + (courseSelectedAnswers[index] === question.answer ? 1 : 0), 0);
  }, [courseData.questions, courseSelectedAnswers]);

  const courseCompleted = Object.keys(courseSelectedAnswers).length === courseData.questions.length;
  const coursePoints = courseCompleted ? 25 + courseScore * 25 : 0;

  // Run initial Auth Portal simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthenticating(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Sync role-based query parameters if possible
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const roleParam = url.searchParams.get("role") as Role;
      if (roleParam && ["teacher", "student", "admin"].includes(roleParam)) {
        setActiveRole(roleParam);
        if (roleParam === "admin") {
          setActiveTab("tools"); // Admin uses tools tab as dashboard
        }
      }
    }
  }, []);

  // Handle switching roles
  const handleRoleChange = (role: Role) => {
    setActiveRole(role);
    setShowProfileMenu(false);
    setSelectedTool(null);
    setSelectedChallenge(null);
    setChatResponse(null);
    setChatInput("");
    if (role === "admin") {
      setActiveTab("tools");
    } else {
      setActiveTab("tools");
    }
  };

  // Mock chat send logic
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    setChatResponse(null);

    // Simulate AI greeting & assistance
    setTimeout(() => {
      setChatLoading(false);
      if (activeRole === "teacher") {
        setChatResponse(`Hello! As a Teacher at Delhi Public School, I can help you compile classroom assets. I recommend launching the **Lesson Plan Generator** card below, or asking me to write a short quiz. How would you like to prepare for ${lessonTopic || "your classes"} today?`);
      } else {
        setChatResponse(`Hi Arjun! I see you are onboarded in the Delhi Public School Student Arena. You can select one of the weekly challenges below to submit your prompts. I'm ready to evaluate your submissions!`);
      }
    }, 1000);
  };

  // Teacher Tool Trigger - Lesson Plan
  async function generateLessonPlan() {
    setLessonLoading(true);
    setLessonOutput("");
    try {
      const res = await fetch("/api/teacher/lesson-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: lessonSubject, grade: lessonGrade, topic: lessonTopic, duration: `${lessonDuration} min` }),
      });
      if (!res.ok) throw new Error(await res.text());
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value);
        setLessonOutput(acc);
      }
    } catch (err: any) {
      setLessonOutput(`Error: ${err.message ?? err}`);
    } finally {
      setLessonLoading(false);
    }
  }

  // Teacher Tool Trigger - Quiz
  async function generateQuiz() {
    setQuizLoading(true);
    setQuizQuestions([]);
    setQuizReveal({});
    try {
      const res = await fetch("/api/teacher/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: quizSubject, grade: quizGrade, topic: quizTopic, count: quizCount }),
      });
      const data = await res.json();
      setQuizQuestions(data.questions ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setQuizLoading(false);
    }
  }

  // Teacher Tool Trigger - Explainer
  async function generateExplainer() {
    setExplainerLoading(true);
    setExplainerOutput("");
    try {
      const res = await fetch("/api/teacher/explainer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept: explainerConcept, context: explainerContext }),
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value);
        setExplainerOutput(acc);
      }
    } catch (e: any) {
      setExplainerOutput(`Error: ${e.message ?? e}`);
    } finally { setExplainerLoading(false); }
  }

  // Student Arena Trigger
  async function submitChallenge(title: string, brief: string) {
    if (!studentSubmission.trim()) return;
    setStudentLoading(true);
    setStudentFeedback(null);
    try {
      const res = await fetch("/api/student/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeTitle: title,
          challengeBrief: brief,
          submission: studentSubmission,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setStudentFeedback(data);
    } catch (e: any) {
      alert(`Error: ${e.message ?? e}`);
    } finally { setStudentLoading(false); }
  }

  // Learn Course Trigger
  async function regenerateCourse() {
    setLearnRegenerateLoading(true);
    try {
      const res = await fetch("/api/learn/level-one", { method: "POST" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setCourseData(data);
      setCourseSelectedAnswers({});
    } catch {
      setCourseData(seedCourse);
    } finally {
      setLearnRegenerateLoading(false);
    }
  }

  // Render variables
  const userProfile = {
    teacher: { name: "Yash Sharma", role: "Teacher", email: "yash.sharma@dps.edu.in", avatar: "Y" },
    student: { name: "Arjun Singh", role: "Student", email: "arjun.s@dps.edu.in", avatar: "A" },
    admin: { name: "Jaiss", role: "School Admin", email: "admin@dps.edu.in", avatar: "J" }
  }[activeRole];

  // Mock Contributions Data (Image 3 contribution grid)
  const contributionGrid = useMemo(() => {
    // Return array of 7 rows (days of week) x 24 columns (weeks)
    const grid = [];
    const seed = [0, 0, 1, 2, 0, 3, 1, 0, 2, 4, 1, 0, 0, 1, 3, 2, 0, 1, 2, 0, 3, 0, 1, 4];
    for (let r = 0; r < 7; r++) {
      const row = [];
      for (let c = 0; c < 24; c++) {
        // Pseudo-random level of green
        const intensityIndex = (r * 3 + c * 7) % seed.length;
        row.push(seed[intensityIndex]);
      }
      grid.push(row);
    }
    return grid;
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans text-slate-100 overflow-hidden">
      
      {/* 1. DPS Portal Authentication Overlay */}
      {authenticating && (
        <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center transition-all duration-500">
          <div className="text-center space-y-6">
            <div className="relative flex justify-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-display text-3xl font-extrabold shadow-lg animate-pulse">
                D
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display tracking-tight text-white">Delhi Public School</h2>
              <p className="text-slate-400 text-sm">Single Sign-On Authentication</p>
            </div>
            <div className="flex justify-center items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mt-4">
              <Loader className="h-4 w-4 animate-spin" /> Authenticating credentials...
            </div>
          </div>
        </div>
      )}

      {/* Main Shell */}
      <div className="flex h-screen w-screen overflow-hidden">
        
        {/* 2. LEFT SIDEBAR (Dark UI matching Image 1 & 2) */}
        <aside className="w-[260px] bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between select-none z-10">
          <div>
            {/* Header / Logo */}
            <div className="p-4 border-b border-zinc-800">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-tr from-blue-600 to-teal-500 text-white font-extrabold text-lg shadow-md font-display">
                  L
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-white text-base tracking-tight leading-none">Lakshya AI</span>
                  <span className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase mt-1">DPS Demo Node</span>
                </div>
              </Link>
            </div>

            {/* New Message / Command Trigger */}
            <div className="p-3">
              <button 
                onClick={() => {
                  setSelectedTool(null);
                  setSelectedChallenge(null);
                  setChatResponse(null);
                  setChatInput("");
                  setActiveTab("tools");
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 transition flex items-center gap-3 active:scale-95 cursor-pointer"
              >
                <Plus className="h-4 w-4 text-zinc-400" />
                New Action
              </button>
            </div>

            {/* Navigation Menus */}
            <div className="px-3 py-2 space-y-6">
              
              {/* Capabilities Section */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">Capabilities</span>
                
                <button
                  onClick={() => { setActiveTab("tools"); setSelectedTool(null); setSelectedChallenge(null); }}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium flex items-center justify-between transition ${activeTab === "tools" ? "bg-zinc-900 text-white border-l-2 border-blue-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"}`}
                >
                  <span className="flex items-center gap-3">
                    <Cpu className="h-4 w-4 text-zinc-400" />
                    Tools
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {activeRole === "teacher" ? "3" : activeRole === "student" ? "3" : "Live"}
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab("learn"); setSelectedTool(null); setSelectedChallenge(null); }}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium flex items-center transition ${activeTab === "learn" ? "bg-zinc-900 text-white border-l-2 border-blue-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"}`}
                >
                  <span className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-zinc-400" />
                    Learn AI basics
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab("tasks"); setSelectedTool(null); setSelectedChallenge(null); }}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium flex items-center transition ${activeTab === "tasks" ? "bg-zinc-900 text-white border-l-2 border-blue-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"}`}
                >
                  <span className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-zinc-400" />
                    Scheduled Tasks
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab("connectors"); setSelectedTool(null); setSelectedChallenge(null); }}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium flex items-center transition ${activeTab === "connectors" ? "bg-zinc-900 text-white border-l-2 border-blue-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"}`}
                >
                  <span className="flex items-center gap-3">
                    <Link2 className="h-4 w-4 text-zinc-400" />
                    Connectors
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab("skills"); setSelectedTool(null); setSelectedChallenge(null); }}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium flex items-center transition ${activeTab === "skills" ? "bg-zinc-900 text-white border-l-2 border-blue-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"}`}
                >
                  <span className="flex items-center gap-3">
                    <Compass className="h-4 w-4 text-zinc-400" />
                    Skills
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab("channels"); setSelectedTool(null); setSelectedChallenge(null); }}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium flex items-center transition ${activeTab === "channels" ? "bg-zinc-900 text-white border-l-2 border-blue-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"}`}
                >
                  <span className="flex items-center gap-3">
                    <Tv className="h-4 w-4 text-zinc-400" />
                    Channels
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab("pairings"); setSelectedTool(null); setSelectedChallenge(null); }}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium flex items-center transition ${activeTab === "pairings" ? "bg-zinc-900 text-white border-l-2 border-blue-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"}`}
                >
                  <span className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-zinc-400" />
                    Pairings
                  </span>
                </button>
              </div>

              {/* Messages / Recent Sheets Section */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">Recent Sheets</span>
                <div className="space-y-0.5 max-h-[160px] overflow-y-auto pr-1">
                  {[
                    "Lesson Plan: Photosynthesis",
                    "Quiz: The Mughal Empire",
                    "Explainer: Quantum Computing",
                    "Challenge: Prompt Chain",
                    "School AI Policy draft"
                  ].map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        // Demo click action
                        alert(`Viewing historical asset: "${item}" (Demo representation)`);
                      }}
                      className="w-full text-left py-1.5 px-3 rounded text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 truncate block"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar Footer User Widget */}
          <div className="p-3 border-t border-zinc-800 relative bg-zinc-950">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-full p-2 rounded-lg hover:bg-zinc-900 flex items-center justify-between text-left transition active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow">
                  {userProfile.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs text-white leading-none">{userProfile.name}</span>
                  <span className="text-[10px] text-zinc-500 font-medium mt-1 uppercase tracking-wider">{userProfile.role}</span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-zinc-500" />
            </button>

            {/* Profile Selector Menu (Mock SSO Switcher) */}
            {showProfileMenu && (
              <div className="absolute bottom-16 left-3 right-3 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl py-1.5 z-20">
                <p className="px-3 py-1.5 text-[9px] font-bold text-zinc-500 uppercase border-b border-zinc-800 mb-1">
                  Switch SSO Persona
                </p>
                <button
                  onClick={() => handleRoleChange("teacher")}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-zinc-800 ${activeRole === "teacher" ? "text-blue-400 font-semibold" : "text-zinc-300"}`}
                >
                  <span>Yash Sharma (Teacher)</span>
                  <span className="text-[9px] px-1 bg-blue-500/10 text-blue-400 rounded">DPS</span>
                </button>
                <button
                  onClick={() => handleRoleChange("student")}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-zinc-800 ${activeRole === "student" ? "text-blue-400 font-semibold" : "text-zinc-300"}`}
                >
                  <span>Arjun Singh (Student)</span>
                  <span className="text-[9px] px-1 bg-blue-500/10 text-blue-400 rounded">DPS</span>
                </button>
                <button
                  onClick={() => handleRoleChange("admin")}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-zinc-800 ${activeRole === "admin" ? "text-blue-400 font-semibold" : "text-zinc-300"}`}
                >
                  <span>Jaiss (School Admin)</span>
                  <span className="text-[9px] px-1 bg-blue-500/10 text-blue-400 rounded">DPS</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* 3. MAIN WORKSPACE (Premium Light Mode AI workspace) */}
        <main className="flex-1 flex flex-col bg-slate-50 text-slate-800 overflow-hidden relative">
          
          {/* Main Top Bar */}
          <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur px-6 flex items-center justify-between z-10 select-none">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-semibold text-slate-700">Delhi Public School Node</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">SSO Authenticated</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right text-xs text-slate-500">
                <p>Welcome, <span className="font-semibold text-slate-700">{userProfile.name}</span></p>
                <p className="mt-0.5 text-[10px] uppercase font-bold text-blue-600">{userProfile.role} profile</p>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800 text-xs flex items-center gap-2 cursor-pointer">
                  Portal Home
                </Button>
              </Link>
            </div>
          </header>

          {/* Main Content Workspace Panel */}
          <div className="flex-1 overflow-y-auto p-6 relative">
            
            {/* View switcher logic */}

            {/* TAB A: LEARN AI BASICS MODULES */}
            {activeTab === "learn" && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-display text-slate-900">Level 1: AI Awareness Course</h2>
                    <p className="text-slate-500 text-sm mt-1">Delhi Public School mandatory compliance training</p>
                  </div>
                  <Button 
                    onClick={regenerateCourse} 
                    disabled={learnRegenerateLoading} 
                    variant="outline" 
                    className="bg-white border-slate-200 hover:bg-slate-50 shadow-sm cursor-pointer"
                  >
                    {learnRegenerateLoading ? <><Loader className="mr-2 h-4 w-4 animate-spin text-slate-400" /> Loading</> : <><Sparkles className="mr-2 h-4 w-4 text-blue-500" /> Refresh Course with AI</>}
                  </Button>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {courseData.modules.map((mod, idx) => (
                    <Card key={idx} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-sm">
                          {idx + 1}
                        </div>
                        <h3 className="font-semibold text-slate-900">{mod.title}</h3>
                        <p className="text-xs leading-relaxed text-slate-600">{mod.lesson}</p>
                        <div className="mt-3 p-3 rounded bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                          <span className="font-semibold text-slate-800">Activity: </span>{mod.activity}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Video Tutorials Section */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Play className="h-4 w-4 text-blue-600 fill-blue-600" />
                    Video Tutorials: Learn AI for Teaching
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {TEACHER_VIDEOS.map((vid, idx) => (
                      <Card key={idx} className="bg-white border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition">
                        <div className="aspect-video bg-slate-950 relative flex items-center justify-center group-hover:opacity-95 transition">
                          {/* Simulated thumbnail */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-0" />
                          <div className="z-10 flex flex-col items-center gap-2 text-center p-3">
                            <span className="text-[9px] uppercase tracking-wider font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                              {vid.category}
                            </span>
                            <button
                              onClick={() => {
                                setPlayingVideo(vid);
                              }}
                              className="h-10 w-10 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg hover:scale-105 hover:bg-white active:scale-95 transition cursor-pointer"
                            >
                              <Play className="h-4 w-4 fill-slate-900 text-slate-900 ml-0.5" />
                            </button>
                            <span className="text-[10px] text-slate-300 font-semibold">{vid.duration}</span>
                          </div>
                        </div>
                        <CardContent className="p-4 space-y-1.5">
                          <h4 className="font-semibold text-xs text-slate-900 leading-snug group-hover:text-blue-600 transition">
                            {vid.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 leading-normal">
                            {vid.desc}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Simulated Video Player Modal */}
                {playingVideo && (
                  <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <span className="text-xs font-semibold text-slate-700">Playing: {playingVideo.title}</span>
                        <button
                          onClick={() => setPlayingVideo(null)}
                          className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="aspect-video bg-slate-950 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-950 flex flex-col items-center justify-center text-center p-8 z-0">
                          <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center animate-pulse text-white shadow-lg shadow-blue-500/30">
                            <Play className="h-5 w-5 fill-white ml-0.5" />
                          </div>
                          <p className="mt-4 text-xs font-semibold text-white">Simulated DPS AI Video Player</p>
                          <p className="text-[10px] text-slate-400 mt-1 max-w-md">Currently streaming: &quot;{playingVideo.title}&quot;. In a production school portal, this connects to the secure school media servers.</p>
                          
                          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-white text-[10px] z-10">
                            <div className="flex items-center gap-3">
                              <Play className="h-3.5 w-3.5 fill-white" />
                              <div className="w-40 sm:w-80 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-1/3 animate-pulse"></div>
                              </div>
                              <span>02:15 / {playingVideo.duration}</span>
                            </div>
                            <span className="text-blue-400 font-bold uppercase tracking-widest text-[8px] bg-blue-500/10 px-2 py-0.5 rounded">1080p HD</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Level 1 Awareness Test</h3>
                      <p className="text-xs text-slate-500 mt-1">Answer all questions to complete the certification and unlock platform score points.</p>
                    </div>

                    <div className="space-y-4">
                      {courseData.questions.map((q, qIdx) => (
                        <div key={qIdx} className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3">
                          <p className="font-medium text-sm text-slate-900">{qIdx + 1}. {q.question}</p>
                          <div className="grid gap-2">
                            {q.options.map((opt, idx) => {
                              const active = courseSelectedAnswers[qIdx] === idx;
                              const isCorrect = courseSelectedAnswers[qIdx] !== undefined && idx === q.answer;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => setCourseSelectedAnswers({ ...courseSelectedAnswers, [qIdx]: idx })}
                                  className={`px-3 py-2 rounded border text-left text-xs transition ${active ? "border-blue-500 bg-blue-50/70 text-blue-800 font-semibold" : "border-slate-200 bg-white hover:bg-slate-100"} ${isCorrect ? "border-emerald-500 bg-emerald-50/70 text-emerald-800 font-semibold" : ""}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {courseSelectedAnswers[qIdx] !== undefined && (
                            <p className="text-xs text-slate-500 italic mt-1 pl-1">Reasoning: {q.why}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {courseCompleted && (
                      <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/80 flex items-center justify-between">
                        <div>
                          <p className="text-emerald-800 font-bold text-base">Certification Passed: +{coursePoints} points!</p>
                          <p className="text-xs text-emerald-700">Course score {courseScore}/3. Delhi Public School composite score updated.</p>
                        </div>
                        <CheckCircle2 className="h-8 w-8 text-emerald-600 shrink-0" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* TAB B: TOOLS & CAPABILITIES (Dynamic Role-based views) */}
            {activeTab === "tools" && (
              <>
                {/* 1. TEACHER VIEW */}
                {activeRole === "teacher" && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Workspace Chat & Greeting (Image 2 design in Light Mode) */}
                    {!selectedTool && (
                      <div className="space-y-8 py-8">
                        {/* Greeting & AI Prompt Box */}
                        <div className="text-center space-y-4 max-w-xl mx-auto">
                          <div className="flex justify-center">
                            <div className="h-14 w-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-md border border-slate-700">
                              L
                            </div>
                          </div>
                          <h2 className="text-3xl font-bold font-display text-slate-900">What&apos;s up next, Yash Sharma?</h2>
                          <p className="text-slate-500 text-sm">Design lesson assets, write MCQs, and draft explainers for Class 8-12.</p>
                        </div>

                        {/* Prompt Input Box */}
                        <Card className="bg-white border-slate-200 shadow-md max-w-2xl mx-auto overflow-hidden">
                          <CardContent className="p-2 space-y-2">
                            <div className="flex gap-2">
                              <textarea
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                className="flex-1 p-3 bg-transparent border-0 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-sm min-h-[50px] resize-none"
                                placeholder="Ask anything... (@ to reference files or class templates)"
                              />
                              <div className="flex items-end pb-1 pr-1">
                                <Button 
                                  onClick={handleChatSend} 
                                  disabled={chatLoading || !chatInput.trim()}
                                  variant="gradient"
                                  className="h-9 w-9 p-0 flex items-center justify-center rounded-md cursor-pointer"
                                >
                                  {chatLoading ? <Loader className="h-4 w-4 animate-spin text-white" /> : <Send className="h-4 w-4 text-white" />}
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 px-3 py-1.5 border-t border-slate-100 text-[11px] text-slate-500">
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 border text-slate-600 font-mono font-medium">Ctrl + Enter</span>
                              <span>to send</span>
                              <div className="h-3 w-px bg-slate-200"></div>
                              <span>Active model: <strong className="text-blue-600">GPT-4o</strong></span>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Simulated Chat Response */}
                        {chatResponse && (
                          <Card className="bg-white border-slate-200 shadow-sm max-w-2xl mx-auto">
                            <CardContent className="p-4 flex gap-3.5">
                              <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold shrink-0 mt-0.5">
                                AI
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-blue-600">System feedback</p>
                                <p className="text-xs text-slate-700 leading-relaxed font-sans">{chatResponse}</p>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* 1. Core AI Models & Tools */}
                        <div className="space-y-4 max-w-2xl mx-auto pt-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Core AI Models & Tools</p>
                          <div className="grid gap-3 sm:grid-cols-4">
                            {EXTERNAL_TOOLS.map((t, idx) => (
                              <a
                                key={idx}
                                href={t.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-sm hover:shadow hover:-translate-y-0.5 transition flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-xs text-slate-900">{t.name}</span>
                                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">{t.provider}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 leading-normal">{t.desc}</p>
                                </div>
                                <div className="mt-2 flex justify-between items-center border-t border-slate-100 pt-2 text-[9px]">
                                  <span className={`px-1.5 py-0.5 rounded border font-medium ${t.badgeColor}`}>{t.tag}</span>
                                  <span className="text-blue-500 font-bold flex items-center gap-0.5 hover:underline">Use &rarr;</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* 2. Ready-To-Use Physics Class 10 Templates */}
                        <div className="space-y-4 max-w-2xl mx-auto pt-2">
                          <div className="flex justify-between items-center pl-1">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Class 10 Physics Templates (Teacher Demos)</p>
                            <span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-bold uppercase">Physics Unit</span>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-3">
                            {PHYSICS_TEACHER_TEMPLATES.map((temp, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedPhysicsTemplate(temp);
                                }}
                                className="bg-white border border-slate-200 rounded-lg p-3.5 text-left shadow-sm hover:shadow hover:border-blue-300 transition group cursor-pointer"
                              >
                                <h4 className="font-semibold text-xs text-slate-950 group-hover:text-blue-600 transition leading-tight">
                                  {temp.title}
                                </h4>
                                <p className="text-[10px] text-slate-400 mt-1 truncate">
                                  {temp.prompt}
                                </p>
                                <span className="text-[9px] text-blue-500 font-bold block mt-2 hover:underline">
                                  Load Template &rarr;
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 3. Physics Template Viewer Inline */}
                        {selectedPhysicsTemplate && (
                          <Card className="bg-white border-blue-200 shadow-md max-w-2xl mx-auto overflow-hidden border-2">
                            <div className="bg-blue-50/70 border-b border-blue-100 px-4 py-2.5 flex justify-between items-center">
                              <span className="text-xs font-bold text-blue-800">Active Template: {selectedPhysicsTemplate.title}</span>
                              <button
                                onClick={() => setSelectedPhysicsTemplate(null)}
                                className="p-1 rounded hover:bg-blue-100 text-blue-600 transition cursor-pointer"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <CardContent className="p-4 space-y-4">
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Generated Prompt</span>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-mono select-all">
                                  {selectedPhysicsTemplate.prompt}
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Pre-Generated AI Output</span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(selectedPhysicsTemplate.response);
                                      alert("Copied template answer to clipboard!");
                                    }}
                                    className="text-[10px] text-blue-600 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                                  >
                                    <Copy className="h-3 w-3" /> Copy Answer
                                  </button>
                                </div>
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                                  {selectedPhysicsTemplate.response}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* PICK A TASK Header & Tool Cards */}
                        <div className="space-y-4 max-w-2xl mx-auto pt-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Create Custom Assets (Tools)</p>
                          <div className="grid gap-4 sm:grid-cols-3">
                            
                            <button
                              onClick={() => setSelectedTool("lesson-plan")}
                              className="bg-white border border-slate-200 rounded-xl p-5 text-left shadow-sm hover:shadow-md transition hover:-translate-y-0.5 active:scale-98 select-none group cursor-pointer"
                            >
                              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition">
                                <BookOpen className="h-5 w-5" />
                              </div>
                              <h3 className="font-semibold text-slate-900 mt-4 text-sm">Lesson Planner</h3>
                              <p className="text-[11px] text-slate-500 mt-1 leading-normal">Generate detailed CBSE/NEP 2020 lesson outlines with classroom assets.</p>
                            </button>

                            <button
                              onClick={() => setSelectedTool("quiz")}
                              className="bg-white border border-slate-200 rounded-xl p-5 text-left shadow-sm hover:shadow-md transition hover:-translate-y-0.5 active:scale-98 select-none group cursor-pointer"
                            >
                              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition">
                                <FileText className="h-5 w-5" />
                              </div>
                              <h3 className="font-semibold text-slate-900 mt-4 text-sm">MCQ Quizzer</h3>
                              <p className="text-[11px] text-slate-500 mt-1 leading-normal">Create Bloom-aware question sheets and detailed explanation sheets.</p>
                            </button>

                            <button
                              onClick={() => setSelectedTool("explainer")}
                              className="bg-white border border-slate-200 rounded-xl p-5 text-left shadow-sm hover:shadow-md transition hover:-translate-y-0.5 active:scale-98 select-none group cursor-pointer"
                            >
                              <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-105 transition">
                                <Lightbulb className="h-5 w-5" />
                              </div>
                              <h3 className="font-semibold text-slate-900 mt-4 text-sm">Concept Explainer</h3>
                              <p className="text-[11px] text-slate-500 mt-1 leading-normal">Generate analogies and multi-tier explanations for complex subjects.</p>
                            </button>

                          </div>
                        </div>

                      </div>
                    )}

                    {/* Inline view: LESSON PLAN */}
                    {selectedTool === "lesson-plan" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b pb-4">
                          <button onClick={() => setSelectedTool(null)} className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition">
                            <ArrowLeft className="h-4 w-4" /> Back to workspace
                          </button>
                          <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-100">Lesson Plan Generator</span>
                        </div>

                        <div className="grid lg:grid-cols-[340px,1fr] gap-6">
                          {/* Inputs */}
                          <Card className="bg-white border-slate-200 shadow-sm h-fit">
                            <CardContent className="p-5 space-y-4">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Subject</label>
                                <input value={lessonSubject} onChange={(e) => setLessonSubject(e.target.value)} className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Grade / Class</label>
                                <input value={lessonGrade} onChange={(e) => setLessonGrade(e.target.value)} className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Topic</label>
                                <input value={lessonTopic} onChange={(e) => setLessonTopic(e.target.value)} className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Duration (mins)</label>
                                <input value={lessonDuration} onChange={(e) => setLessonDuration(e.target.value)} className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500" type="number" />
                              </div>
                              <Button onClick={generateLessonPlan} disabled={lessonLoading} variant="gradient" className="w-full text-xs py-2 h-fit cursor-pointer">
                                {lessonLoading ? <><Loader className="mr-2 h-4 w-4 animate-spin text-white" /> Writing...</> : <><Sparkles className="mr-2 h-4 w-4 text-white" /> Generate Lesson Plan</>}
                              </Button>
                            </CardContent>
                          </Card>

                          {/* Output */}
                          <Card className="bg-white border-slate-200 shadow-sm min-h-[500px]">
                            <CardContent className="p-0">
                              {!lessonOutput && !lessonLoading && (
                                <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8">
                                  <BookOpen className="h-10 w-10 text-slate-300 mb-2" />
                                  <h4 className="font-semibold text-slate-700">Ready to write</h4>
                                  <p className="text-xs text-slate-500 max-w-xs mt-1">Click the generate button on the left to write a complete lesson plan.</p>
                                </div>
                              )}
                              {(lessonLoading || lessonOutput) && (
                                <>
                                  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                                    <span className="text-[11px] font-semibold text-slate-500">
                                      {lessonLoading ? "AI is generating plan..." : `Lesson Outline: ${lessonTopic}`}
                                    </span>
                                    {lessonOutput && !lessonLoading && (
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(lessonOutput);
                                          setLessonCopied(true);
                                          setTimeout(() => setLessonCopied(false), 2000);
                                        }}
                                        className="text-[10px] font-semibold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer"
                                      >
                                        {lessonCopied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy Output</>}
                                      </button>
                                    )}
                                  </div>
                                  <div className="p-5 text-xs font-mono leading-relaxed whitespace-pre-wrap max-w-none text-slate-700">
                                    {lessonOutput}
                                    {lessonLoading && <span className="inline-block w-2 h-3 bg-blue-600 animate-pulse ml-1" />}
                                  </div>
                                </>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}

                    {/* Inline view: QUIZ GENERATOR */}
                    {selectedTool === "quiz" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b pb-4">
                          <button onClick={() => setSelectedTool(null)} className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition">
                            <ArrowLeft className="h-4 w-4" /> Back to workspace
                          </button>
                          <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">MCQ Quiz Generator</span>
                        </div>

                        <div className="grid lg:grid-cols-[340px,1fr] gap-6">
                          <Card className="bg-white border-slate-200 shadow-sm h-fit">
                            <CardContent className="p-5 space-y-4">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Subject</label>
                                <input value={quizSubject} onChange={(e) => setQuizSubject(e.target.value)} className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Grade / Class</label>
                                <input value={quizGrade} onChange={(e) => setQuizGrade(e.target.value)} className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Topic</label>
                                <input value={quizTopic} onChange={(e) => setQuizTopic(e.target.value)} className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Number of Questions</label>
                                <input value={quizCount} onChange={(e) => setQuizCount(parseInt(e.target.value) || 5)} className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500" type="number" min={3} max={15} />
                              </div>
                              <Button onClick={generateQuiz} disabled={quizLoading} variant="gradient" className="w-full text-xs py-2 h-fit cursor-pointer">
                                {quizLoading ? <><Loader className="mr-2 h-4 w-4 animate-spin text-white" /> Generating...</> : <><Sparkles className="mr-2 h-4 w-4 text-white" /> Generate Quiz</>}
                              </Button>
                            </CardContent>
                          </Card>

                          <div className="space-y-4">
                            {!quizQuestions.length && !quizLoading && (
                              <Card className="bg-white border-slate-200 shadow-sm min-h-[450px]">
                                <CardContent className="flex flex-col items-center justify-center h-full min-h-[450px] text-center p-8">
                                  <FileText className="h-10 w-10 text-slate-300 mb-2" />
                                  <h4 className="font-semibold text-slate-700">No questions generated</h4>
                                  <p className="text-xs text-slate-500 max-w-xs mt-1">Configure options and trigger the generation to compile Bloom-aware MCQs.</p>
                                </CardContent>
                              </Card>
                            )}

                            {quizLoading && (
                              <Card className="bg-white border-slate-200 shadow-sm"><CardContent className="p-8 text-center space-y-3">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                                <p className="text-xs text-slate-500">AI is compiling question items...</p>
                              </CardContent></Card>
                            )}

                            {quizQuestions.map((q, idx) => (
                              <Card key={idx} className="bg-white border-slate-200 shadow-sm">
                                <CardContent className="p-5 space-y-4">
                                  <div className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="h-6 w-6 rounded bg-slate-900 text-white font-mono font-bold text-[10px] flex items-center justify-center">Q{idx + 1}</span>
                                      <span className="text-[10px] uppercase font-bold text-slate-400">{q.difficulty}</span>
                                      <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{q.bloom}</span>
                                    </div>
                                    <button 
                                      onClick={() => setQuizReveal({ ...quizReveal, [idx]: !quizReveal[idx] })}
                                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                                    >
                                      {quizReveal[idx] ? "Hide Answer" : "Reveal Answer"}
                                    </button>
                                  </div>
                                  <p className="font-medium text-xs text-slate-900 leading-relaxed">{q.question}</p>
                                  <div className="grid gap-2">
                                    {q.options.map((opt, oIdx) => {
                                      const correct = quizReveal[idx] && oIdx === q.correctIndex;
                                      return (
                                        <div key={oIdx} className={`p-2.5 rounded border text-[11px] flex justify-between items-center ${correct ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold" : "border-slate-200 bg-white"}`}>
                                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                                          {correct && <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                                        </div>
                                      );
                                    })}
                                  </div>
                                  {quizReveal[idx] && (
                                    <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded text-slate-600 text-[11px] leading-relaxed">
                                      <strong className="text-indigo-800 block mb-0.5">Rationale:</strong>
                                      {q.explanation}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Inline view: CONCEPT EXPLAINER */}
                    {selectedTool === "explainer" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b pb-4">
                          <button onClick={() => setSelectedTool(null)} className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition">
                            <ArrowLeft className="h-4 w-4" /> Back to workspace
                          </button>
                          <span className="text-xs px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-semibold border border-teal-100">Concept Explainer</span>
                        </div>

                        <div className="grid lg:grid-cols-[340px,1fr] gap-6">
                          <Card className="bg-white border-slate-200 shadow-sm h-fit">
                            <CardContent className="p-5 space-y-4">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Concept</label>
                                <input value={explainerConcept} onChange={(e) => setExplainerConcept(e.target.value)} className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500" placeholder="Black holes, Compound Interest..." />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Additional Context</label>
                                <textarea value={explainerContext} onChange={(e) => setExplainerContext(e.target.value)} className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500 min-h-[80px] resize-none" placeholder="Provide class curriculum or specific analogy constraints..." />
                              </div>
                              <Button onClick={generateExplainer} disabled={explainerLoading} variant="gradient" className="w-full text-xs py-2 h-fit cursor-pointer">
                                {explainerLoading ? <><Loader className="mr-2 h-4 w-4 animate-spin text-white" /> Explaining...</> : <><Sparkles className="mr-2 h-4 w-4 text-white" /> Explain Topic</>}
                              </Button>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-slate-200 shadow-sm min-h-[500px]">
                            <CardContent className="p-0">
                              {!explainerOutput && !explainerLoading && (
                                <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8">
                                  <Lightbulb className="h-10 w-10 text-slate-300 mb-2" />
                                  <h4 className="font-semibold text-slate-700">Analogy output ready</h4>
                                  <p className="text-xs text-slate-500 max-w-xs mt-1">Generate multi-tier explanations with local daily Indian analogies.</p>
                                </div>
                              )}
                              {(explainerLoading || explainerOutput) && (
                                <>
                                  <div className="flex items-center px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                                    <span className="text-[11px] font-semibold text-slate-500">
                                      {explainerLoading ? "AI is processing explanation tiers..." : `Explained: ${explainerConcept}`}
                                    </span>
                                  </div>
                                  <div className="p-5 text-xs font-mono leading-relaxed whitespace-pre-wrap max-w-none text-slate-700">
                                    {explainerOutput}
                                    {explainerLoading && <span className="inline-block w-2 h-3 bg-blue-600 animate-pulse ml-1" />}
                                  </div>
                                </>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* 2. STUDENT VIEW */}
                {activeRole === "student" && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    {!selectedChallenge && (
                      <div className="space-y-8 py-8">
                        {/* Student Header */}
                        <div className="text-center space-y-4 max-w-xl mx-auto">
                          <div className="flex justify-center">
                            <div className="h-14 w-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-md border border-slate-700">
                              L
                            </div>
                          </div>
                          <h2 className="text-3xl font-bold font-display text-slate-900">What&apos;s up next, Arjun?</h2>
                          <p className="text-slate-500 text-sm">Onboarded at Delhi Public School · Enter active student challenges below.</p>
                        </div>

                        {/* Search / Chat Box */}
                        <Card className="bg-white border-slate-200 shadow-md max-w-2xl mx-auto overflow-hidden">
                          <CardContent className="p-2 space-y-2">
                            <div className="flex gap-2">
                              <textarea
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                className="flex-1 p-3 bg-transparent border-0 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-sm min-h-[50px] resize-none"
                                placeholder="Ask anything... (@ to reference files or active sheets)"
                              />
                              <div className="flex items-end pb-1 pr-1">
                                <Button 
                                  onClick={handleChatSend} 
                                  disabled={chatLoading || !chatInput.trim()}
                                  variant="gradient"
                                  className="h-9 w-9 p-0 flex items-center justify-center rounded-md cursor-pointer"
                                >
                                  {chatLoading ? <Loader className="h-4 w-4 animate-spin text-white" /> : <Send className="h-4 w-4 text-white" />}
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 px-3 py-1.5 border-t border-slate-100 text-[11px] text-slate-500">
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 border text-slate-600 font-mono font-medium">Ctrl + Enter</span>
                              <span>to send</span>
                              <div className="h-3 w-px bg-slate-200"></div>
                              <span>Active model: <strong className="text-blue-600">GPT-4o-mini</strong></span>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Simulated Chat Response */}
                        {chatResponse && (
                          <Card className="bg-white border-slate-200 shadow-sm max-w-2xl mx-auto">
                            <CardContent className="p-4 flex gap-3.5">
                              <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold shrink-0 mt-0.5">
                                AI
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-blue-600">System feedback</p>
                                <p className="text-xs text-slate-700 leading-relaxed font-sans">{chatResponse}</p>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* 1. Core AI Models & Tools for Students */}
                        <div className="space-y-4 max-w-2xl mx-auto pt-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Core AI Models & Study Tools</p>
                          <div className="grid gap-3 sm:grid-cols-4">
                            {EXTERNAL_TOOLS.map((t, idx) => (
                              <a
                                key={idx}
                                href={t.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-sm hover:shadow hover:-translate-y-0.5 transition flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-xs text-slate-900">{t.name}</span>
                                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">{t.provider}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 leading-normal">{t.desc}</p>
                                </div>
                                <div className="mt-2 flex justify-between items-center border-t border-slate-100 pt-2 text-[9px]">
                                  <span className={`px-1.5 py-0.5 rounded border font-medium ${t.badgeColor}`}>{t.tag}</span>
                                  <span className="text-blue-500 font-bold flex items-center gap-0.5 hover:underline">Use &rarr;</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* 2. Ready-To-Use Physics Class 10 Student Templates */}
                        <div className="space-y-4 max-w-2xl mx-auto pt-2">
                          <div className="flex justify-between items-center pl-1">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Class 10 Student Templates (Study Demos)</p>
                            <span className="text-[9px] px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full font-bold uppercase">Student Help</span>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-3">
                            {PHYSICS_STUDENT_TEMPLATES.map((temp, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedStudentPhysicsTemplate(temp);
                                }}
                                className="bg-white border border-slate-200 rounded-lg p-3.5 text-left shadow-sm hover:shadow hover:border-indigo-300 transition group cursor-pointer"
                              >
                                <h4 className="font-semibold text-xs text-slate-950 group-hover:text-indigo-600 transition leading-tight">
                                  {temp.title}
                                </h4>
                                <p className="text-[10px] text-slate-400 mt-1 truncate">
                                  {temp.prompt}
                                </p>
                                <span className="text-[9px] text-indigo-500 font-bold block mt-2 hover:underline">
                                  Load Study Guide &rarr;
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 3. Student Physics Template Viewer Inline */}
                        {selectedStudentPhysicsTemplate && (
                          <Card className="bg-white border-indigo-200 shadow-md max-w-2xl mx-auto overflow-hidden border-2">
                            <div className="bg-indigo-50/70 border-b border-indigo-100 px-4 py-2.5 flex justify-between items-center">
                              <span className="text-xs font-bold text-indigo-800">Study Guide: {selectedStudentPhysicsTemplate.title}</span>
                              <button
                                onClick={() => setSelectedStudentPhysicsTemplate(null)}
                                className="p-1 rounded hover:bg-indigo-100 text-indigo-600 transition cursor-pointer"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <CardContent className="p-4 space-y-4">
                              <div>
                                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Your Query</span>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-mono select-all">
                                  {selectedStudentPhysicsTemplate.prompt}
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">AI Explanation & Answer</span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(selectedStudentPhysicsTemplate.response);
                                      alert("Copied student guide to clipboard!");
                                    }}
                                    className="text-[10px] text-indigo-600 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                                  >
                                    <Copy className="h-3 w-3" /> Copy Guide
                                  </button>
                                </div>
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                                  {selectedStudentPhysicsTemplate.response}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* PICK A CHALLENGE Header & Cards */}
                        <div className="space-y-4 max-w-2xl mx-auto pt-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Take on Weekly Challenges (Student Arena)</p>
                          <div className="grid gap-4 sm:grid-cols-3">
                            
                            {Object.entries(CHALLENGES).map(([key, ch]) => (
                              <button
                                key={key}
                                onClick={() => { setSelectedChallenge(key); setStudentSubmission(""); setStudentFeedback(null); }}
                                className="bg-white border border-slate-200 rounded-xl p-5 text-left shadow-sm hover:shadow-md transition hover:-translate-y-0.5 active:scale-98 select-none group cursor-pointer"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition">
                                    <Trophy className="h-4.5 w-4.5" />
                                  </div>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-100">
                                    +{ch.points} XP
                                  </span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mt-4 text-xs line-clamp-2 leading-tight">{ch.title}</h3>
                                <p className="text-[10px] text-slate-400 mt-2 font-medium tracking-wide">{ch.difficulty} · {ch.category}</p>
                              </button>
                            ))}

                          </div>
                        </div>
                      </div>
                    )}

                    {/* Inline view: STUDENT CHALLENGE SUBMISSION */}
                    {selectedChallenge && (
                      <div className="space-y-6">
                        {/* Header Back */}
                        <div className="flex items-center justify-between border-b pb-4">
                          <button onClick={() => setSelectedChallenge(null)} className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition">
                            <ArrowLeft className="h-4 w-4" /> Back to arena
                          </button>
                          <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">Challenge Submission</span>
                        </div>

                        {/* Details */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 font-bold uppercase rounded-full">
                              {CHALLENGES[selectedChallenge as keyof typeof CHALLENGES].difficulty}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 bg-slate-200 text-slate-700 font-bold uppercase rounded-full">
                              {CHALLENGES[selectedChallenge as keyof typeof CHALLENGES].category}
                            </span>
                          </div>
                          <h1 className="text-xl font-bold font-display text-slate-900">{CHALLENGES[selectedChallenge as keyof typeof CHALLENGES].title}</h1>
                          <p className="text-xs text-slate-500 leading-relaxed">{CHALLENGES[selectedChallenge as keyof typeof CHALLENGES].brief}</p>
                        </div>

                        <div className="grid lg:grid-cols-[1fr,360px] gap-6">
                          {/* Submission Area */}
                          <Card className="bg-white border-slate-200 shadow-sm">
                            <CardContent className="p-5 space-y-4">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Output Text / Prompts</label>
                              <textarea
                                value={studentSubmission}
                                onChange={(e) => setStudentSubmission(e.target.value)}
                                className="w-full min-h-[220px] p-3 text-xs bg-slate-50 border border-slate-200 rounded font-mono focus:outline-none focus:border-blue-500 resize-y"
                                placeholder="Paste your prompts, screenshots transcripts or problem reflections here..."
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-400 font-medium">{studentSubmission.length} characters</span>
                                <Button
                                  onClick={() => submitChallenge(CHALLENGES[selectedChallenge as keyof typeof CHALLENGES].title, CHALLENGES[selectedChallenge as keyof typeof CHALLENGES].brief)}
                                  disabled={studentLoading || !studentSubmission.trim()}
                                  variant="gradient"
                                  className="text-xs py-2 px-5 h-auto cursor-pointer"
                                >
                                  {studentLoading ? <><Loader className="mr-2 h-4 w-4 animate-spin text-white" /> Evaluating...</> : <><Sparkles className="mr-2 h-4 w-4 text-white" /> Submit Output</>}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Feedback display */}
                          <div className="space-y-4">
                            {!studentFeedback && !studentLoading && (
                              <Card className="bg-white border-slate-200 shadow-sm h-full flex flex-col justify-center text-center p-6 min-h-[280px]">
                                <Trophy className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                                <h4 className="font-semibold text-slate-700 text-sm">Grading report</h4>
                                <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-1">Submit your workspace prompts to generate immediate AI evaluations and scorecards.</p>
                              </Card>
                            )}

                            {studentLoading && (
                              <Card className="bg-white border-slate-200 shadow-sm p-6 text-center space-y-3">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                                <p className="text-xs text-slate-500">AI is compiling feedback report...</p>
                              </Card>
                            )}

                            {studentFeedback && (
                              <Card className="bg-white border-slate-200 shadow-md overflow-hidden">
                                <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
                                  <div>
                                    <span className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Verdict</span>
                                    <h4 className="font-semibold text-xs leading-normal mt-0.5">{studentFeedback.verdict}</h4>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="font-mono text-3xl font-bold text-blue-400 leading-none">{studentFeedback.score}</span>
                                    <span className="text-[9px] text-white/50 block">/ 100</span>
                                  </div>
                                </div>
                                <CardContent className="p-5 space-y-4 text-xs">
                                  <div>
                                    <span className="font-bold text-emerald-600 flex items-center gap-1.5 mb-1.5 uppercase text-[10px] tracking-wider">
                                      <CheckCircle2 className="h-3.5 w-3.5" /> Strengths
                                    </span>
                                    <ul className="space-y-1 pl-4 list-disc text-slate-600">
                                      {studentFeedback.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                                    </ul>
                                  </div>
                                  <div>
                                    <span className="font-bold text-rose-600 flex items-center gap-1.5 mb-1.5 uppercase text-[10px] tracking-wider">
                                      <AlertCircle className="h-3.5 w-3.5" /> Improvements
                                    </span>
                                    <ul className="space-y-1 pl-4 list-disc text-slate-600">
                                      {studentFeedback.improvements.map((s, idx) => <li key={idx}>{s}</li>)}
                                    </ul>
                                  </div>
                                  <div className="p-3 bg-amber-50 border border-amber-200 rounded text-slate-700">
                                    <span className="font-bold text-amber-800 flex items-center gap-1 mb-1 text-[10px] tracking-wider uppercase">
                                      <Lightbulb className="h-3.5 w-3.5" /> Pro Tip
                                    </span>
                                    <p className="leading-relaxed text-[11px]">{studentFeedback.bonus_tip}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. ADMIN / SCHOOL DASHBOARD (Image 3 design in Light Mode) */}
                {activeRole === "admin" && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    
                    {/* Header Title (Image 3 layout) */}
                    <div>
                      <div className="flex items-center gap-2 text-rose-500 font-bold">
                        <Sparkles className="h-5 w-5" />
                        <span className="text-sm font-semibold tracking-wide">What&apos;s up next, jaiss?</span>
                      </div>
                    </div>

                    {/* Tabs / Selectors (Image 3 layout) */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex gap-2 text-xs font-semibold">
                        <button className="px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-800 shadow-sm cursor-pointer">
                          Overview
                        </button>
                        <button className="px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-700 cursor-pointer">
                          Models
                        </button>
                      </div>

                      <div className="flex gap-1 bg-slate-200 p-0.5 rounded text-[10px] font-bold text-slate-600">
                        <span className="px-2 py-1 rounded bg-white text-slate-800 shadow-sm">All</span>
                        <span className="px-2 py-1 rounded hover:text-slate-800 cursor-pointer">30d</span>
                        <span className="px-2 py-1 rounded hover:text-slate-800 cursor-pointer">7d</span>
                      </div>
                    </div>

                    {/* Stats Grid (Image 3 layout) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { title: "Sessions", value: "12", sub: "+4 today" },
                        { title: "Messages", value: "342", sub: "+52 today" },
                        { title: "Total tokens", value: "48.9k", sub: "~$0.15 cost" },
                        { title: "Active days", value: "5", sub: "out of 7" },
                        { title: "Current streak", value: "5d", sub: "Active daily" },
                        { title: "Longest streak", value: "5d", sub: "Record" },
                        { title: "Peak hour", value: "11 AM", sub: "Most usage" },
                        { title: "Favorite model", value: "GPT-4o", sub: "Primary choice" }
                      ].map((stat, idx) => (
                        <div key={idx} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow transition">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.title}</p>
                          <p className="mt-2 font-display text-2xl font-bold text-slate-900 leading-none">{stat.value}</p>
                          <p className="mt-1 text-[10px] text-slate-500">{stat.sub}</p>
                        </div>
                      ))}
                    </div>

                    {/* GitHub style Contribution Grid (Image 3 layout) */}
                    <Card className="bg-white border-slate-200 shadow-sm">
                      <CardContent className="p-5 space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-slate-900 text-sm">Delhi Public School Active Days</h3>
                            <p className="text-[10px] text-slate-500">Track composite AI learning and tool usage over the past weeks.</p>
                          </div>
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            DPS Node Active
                          </span>
                        </div>

                        {/* The Grid */}
                        <div className="overflow-x-auto pb-2 pr-1">
                          <div className="flex flex-col gap-[3px] min-w-[340px]">
                            {contributionGrid.map((row, rIdx) => (
                              <div key={rIdx} className="flex gap-[3px] items-center">
                                {row.map((level, cIdx) => {
                                  // Map intensity levels (0-4) to colors
                                  const colorClass = [
                                    "bg-slate-100 hover:bg-slate-200",               // 0
                                    "bg-blue-200 hover:bg-blue-300",               // 1
                                    "bg-blue-300 hover:bg-blue-400",               // 2
                                    "bg-blue-500 hover:bg-blue-600",               // 3
                                    "bg-indigo-600 hover:bg-indigo-700",           // 4
                                  ][level];
                                  return (
                                    <div
                                      key={cIdx}
                                      className={`h-[9px] w-[9px] rounded-[1px] transition duration-150 ${colorClass}`}
                                      title={`Day ${rIdx + 1}, Week ${cIdx + 1}: Level ${level} activity`}
                                    />
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                          <span>Weeks timeline (Last 24 weeks)</span>
                          <div className="flex items-center gap-1">
                            <span>Less</span>
                            <div className="h-2 w-2 rounded-[1px] bg-slate-100 border border-slate-200"></div>
                            <div className="h-2 w-2 rounded-[1px] bg-blue-200"></div>
                            <div className="h-2 w-2 rounded-[1px] bg-blue-300"></div>
                            <div className="h-2 w-2 rounded-[1px] bg-blue-500"></div>
                            <div className="h-2 w-2 rounded-[1px] bg-indigo-600"></div>
                            <span>More</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* School Analytics pipeline */}
                    <div className="grid gap-6 md:grid-cols-[1fr,280px]">
                      {/* Left: Pipeline progress metrics */}
                      <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-5 space-y-4">
                          <h4 className="font-semibold text-slate-900 text-sm">Adoption Funnel Pipeline</h4>
                          
                          <div className="space-y-3 text-xs">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span>Awareness Course completion</span>
                                <span className="font-semibold text-slate-600">86%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: "86%" }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span>Active Teacher tool usage</span>
                                <span className="font-semibold text-slate-600">74%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: "74%" }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span>Student challenge arena activity</span>
                                <span className="font-semibold text-slate-600">68%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: "68%" }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span>Admin verification & audit</span>
                                <span className="font-semibold text-slate-600">78%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: "78%" }}></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Right: Actions */}
                      <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-5 space-y-4">
                          <h4 className="font-semibold text-slate-900 text-sm">Next DPS Actions</h4>
                          <div className="space-y-3 text-[11px] text-slate-600 leading-normal">
                            <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                              <p className="font-semibold text-slate-800">Rollout Course Level 1</p>
                              <p className="mt-0.5">Invite remaining Class 10 students via dashboard invite links.</p>
                            </div>
                            <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                              <p className="font-semibold text-slate-800">Host Week 2 AI Challenge</p>
                              <p className="mt-0.5">Activate the &quot;AI Solve&quot; category for intermediate level.</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                  </div>
                )}
              </>
            )}

            {/* TAB C: SCHEDULED TASKS (Weekly student challenges list) */}
            {activeTab === "tasks" && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-display text-slate-900">Delhi Public School AI Schedule</h2>
                  <p className="text-slate-500 text-sm mt-1">Review active events, deadlines, and submissions logs.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Bloom-aware Quiz Generation", target: "Class 8 Geography", date: "Every Monday, 9:00 AM", status: "Active" },
                    { title: "Student Arena: Prompting photosythesis", target: "General Student body", date: "Weekly Challenge, Ends Friday", status: "Active" },
                    { title: "SSO Policy Audit and Metrics update", target: "DPS Admin portal", date: "Daily auto update at 4:00 AM", status: "Running" },
                    { title: "Teacher Toolkit Level 1 Awareness", target: "Faculty body", date: "Rolling registration", status: "Open" }
                  ].map((task, idx) => (
                    <Card key={idx} className="bg-white border-slate-200 shadow-sm">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3.5">
                          <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 text-sm">{task.title}</h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">Target: {task.target} · Schedule: {task.date}</p>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold rounded">
                          {task.status}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* OTHER CAPABILITY TABS (Mock descriptions) */}
            {["connectors", "skills", "channels", "pairings"].includes(activeTab) && (
              <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-xl shadow-inner">
                  {activeTab === "connectors" && <Link2 className="h-7 w-7" />}
                  {activeTab === "skills" && <Compass className="h-7 w-7" />}
                  {activeTab === "channels" && <Tv className="h-7 w-7" />}
                  {activeTab === "pairings" && <Users className="h-7 w-7" />}
                </div>
                <h2 className="text-xl font-bold font-display text-slate-900 capitalize">
                  {activeTab === "connectors" && "School Integrations (Connectors)"}
                  {activeTab === "skills" && "Custom Prompts & Capabilities (Skills)"}
                  {activeTab === "channels" && "LMS & Output Distribution (Channels)"}
                  {activeTab === "pairings" && "Peer Pairing System (Pairings)"}
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  {activeTab === "connectors" && "Easily sync school lists and class data. Hook up your School LMS (Google Classroom, Canvas, or Microsoft Teams) to auto-sync teachers, students, and assignment outputs."}
                  {activeTab === "skills" && "Customize AI prompt templates. School administrators can define institutional constraints, specific curriculum topics, and pedagogical standards for the AI to follow."}
                  {activeTab === "channels" && "Push generated lessons, explainers, and quizzes directly to school communication groups. Supports exports via email, print-ready PDF, Whatsapp, or direct LMS uploads."}
                  {activeTab === "pairings" && "Match teachers and students to collaborate on AI-driven projects. Pair experienced prompt designers with beginners to accelerate institutional AI fluency."}
                </p>
                <div className="pt-2">
                  <Button variant="outline" className="bg-white border-slate-200 text-xs shadow-sm cursor-pointer" onClick={() => setActiveTab("tools")}>
                    Back to toolkit tools
                  </Button>
                </div>
              </div>
            )}

          </div>

          {/* Footer branding */}
          <footer className="h-10 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-[10px] text-slate-400 select-none">
            <span>© 2026 Lakshya AI · DPS Demo Node</span>
            <span>Running via local API models</span>
          </footer>

        </main>
      </div>

      <style jsx global>{`
        .input-base {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid hsl(214, 32%, 88%);
          background: hsl(0, 0%, 100%);
          font-size: 0.75rem;
          color: hsl(222, 47%, 11%);
          transition: border-color 120ms;
        }
        .input-base:focus {
          outline: none;
          border-color: hsl(215, 92%, 43%);
        }
      `}</style>

    </div>
  );
}
