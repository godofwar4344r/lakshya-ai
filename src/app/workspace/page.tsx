"use client";

import { useEffect, useMemo, useState, Component } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, CheckCircle2, ChevronRight, Clock, GraduationCap, Lock, LogOut, MessageSquare, PlayCircle, Send, Sparkles, Trophy, Loader2, X, Plus, Mic, Image as ImageIcon, FileText, Globe, ChevronDown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { learningLevels, levelOneQuestions, quizRules, roleCopy, type UserRole } from "@/lib/curriculum";
import { createClient } from "@/lib/supabase/client";

type Tab = "learn" | "tools" | "chat" | "quiz" | "leaderboard";

const PHYSICS_TEACHER_TEMPLATES = [
  {
    title: "Electricity Ohm's Law Analogy",
    prompt: "Act as an expert Class 10 Physics teacher. Explain Ohm's Law (V = IR) using a simple, relatable water pipe analogy. Include visual descriptions for voltage, current, and resistance. Write it in clear English with minor Indian context (e.g. talking about street water pumps).",
    response: "### Concept Explainer: Ohm's Law (Class 10 Physics)\n\n**Analogy: The Street Water Tank & Pipe Pipeline**\nImagine the overhead water tank in your house or a Delhi street water supply pump. \n\n1. **Voltage (V) = Water Pressure**\n   The height of the water tank or the force of the pump creates the pressure that pushes water through the pipes. The higher the pressure (voltage), the more water wants to flow.\n   \n2. **Current (I) = Water Flow Rate**\n   This is the actual amount of water flowing through the pipe per second. More water moving means a higher current of water.\n   \n3. **Resistance (R) = Narrow Pipe / Valve**\n   If there is a kink in the pipe, or dirt inside it, or if you narrow the pipe diameter, the water slows down. This blockage is resistance.\n\n**The Relationship (V = IR):**\n* If you double the tank's height (double **Voltage**), water flows twice as fast (double **Current**), assuming the pipe remains the same.\n* If you narrow the pipe (increase **Resistance**), water flow (**Current**) drops.\n\n**CBSE Class 10 Key takeaway for exams:**\nOhm's Law states that at a constant temperature, the electric current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) across its ends.\n\nV = IR"
  },
  {
    title: "Bloom-aware Light MCQ Quiz",
    prompt: "Generate a Bloom's Taxonomy aligned quiz with 3 MCQs on 'Light - Reflection and Refraction' for Class 10 Physics. Include 1 Remembering level question, 1 Applying level question, and 1 Analyzing level question. Provide answers and rationales.",
    response: "### Quiz: Light Reflection and Refraction (Class 10)\n\n**Q1 (Remembering Level):**\nWhat is the focal length of a plane mirror?\nA) Zero\nB) Infinity\nC) 25 cm\nD) -25 cm\n* **Correct Answer:** B) Infinity\n* **Rationale:** A plane mirror is flat, which means it has a curvature radius of infinity, so its focal length (f = R/2) is also infinity.\n\n**Q2 (Applying Level):**\nAn object is placed at a distance of 12 cm in front of a concave mirror of focal length 8 cm. Find the position of the image.\nA) -24 cm\nB) -16 cm\nC) +24 cm\nD) +16 cm\n* **Correct Answer:** A) -24 cm\n* **Rationale:** Using Mirror Formula: 1/f = 1/v + 1/u. Here, f = -8 cm, u = -12 cm.\n  1/v = 1/-8 - 1/-12 = -1/8 + 1/12 = (-3 + 2)/24 = -1/24 => v = -24 cm. The image is real and inverted.\n\n**Q3 (Analyzing Level):**\nA light ray enters medium A from air at an angle of 30 degrees and medium B at 45 degrees. Which medium is optically denser, and why?\nA) Medium A, because the angle of refraction is smaller.\nB) Medium B, because light travels faster in it.\nC) Both have the same density.\nD) Air is denser than both.\n* **Correct Answer:** A) Medium A\n* **Rationale:** By Snell's Law, n = sin(i)/sin(r). A smaller refraction angle means the ray bent closer to the normal, signaling a higher refractive index (optically denser medium)."
  },
  {
    title: "Magnetic Effects Lesson Plan",
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
    title: "Ohm's Law Solver Guide",
    prompt: "I want to solve Class 10 physics numeric questions on resistance and power. Guide me step-by-step.",
    response: "### Step-by-Step Numerical Solver: Electricity\n\n**Let's solve a practice numeric together:**\n*Problem: An electric bulb is rated 220V and 100W. When it is operated on 110V, what will be the power consumed?*\n\n**Step 1: Write down given values**\n* Nominal Voltage (V1) = 220 V\n* Nominal Power (P1) = 100 W\n* Operating Voltage (V2) = 110 V\n\n**Step 2: Find the Resistance of the bulb (it remains constant!)**\nFormula: P = V^2 / R => R = V^2 / P\n  R = (220 * 220) / 100 = 48400 / 100 = 484 Ohms\n\n**Step 3: Calculate power at new voltage (110V)**\nFormula: P_new = V2^2 / R\n  P_new = (110 * 110) / 484 = 12100 / 484 = 25 W\n\n**Verdict:** The power consumed is 25 Watts."
  },
  {
    title: "AI Homework Ethics Guide",
    prompt: "Is it okay if I use ChatGPT/Gemini to write my school physics answers? How do I use it safely?",
    response: "### Student AI Policy: Ethics Guide\n\nUsing AI tools like ChatGPT or Gemini is a great way to study, but there is a clear boundary between using AI as a tutor and cheating.\n\n#### Recommended Dos:\n* **The Explainer Check:** Ask AI to 'explain this topic to a 10-year-old' or 'give me 3 real-world analogies.'\n* **Practice Feedback:** Paste your handwritten answer and ask, 'I wrote this answer. What CBSE grading criteria did I miss?'\n* **Formula Derivations:** Ask AI to break down difficult math steps in equations.\n\n#### Avoid:\n* **Direct Copy-Paste:** Submitting AI-generated paragraphs as your own homework. Your teachers know your vocabulary and style, and can easily tell.\n* **Blind Trust:** AI can make math errors ('hallucinations'). Always double-check numerical outputs with your textbook formulas."
  }
];

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class SafeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="max-w-md w-full bg-white border border-zinc-200 rounded-2xl shadow-2xl p-6 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 mx-auto">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="font-display text-xl font-bold text-zinc-900">Application Exception</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-sans">
              An unexpected client-side error occurred. Don&apos;t worry, you can dismiss this popup to continue using other features, or reload the workspace.
            </p>
            <div className="bg-slate-50 rounded-lg p-3 text-left text-xs font-mono text-rose-650 border border-slate-200/60 break-all max-h-[100px] overflow-y-auto">
              {this.state.error?.message || "Unknown rendering exception"}
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 text-sm transition"
              >
                Reload Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="flex-1 border border-zinc-200 text-zinc-700 font-semibold py-2 rounded-lg hover:bg-slate-50 text-sm transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Helper to parse basic inline markdown formatting like bold text and code snippets
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="bg-zinc-800 text-emerald-400 px-1 py-0.5 rounded text-xs font-mono border border-zinc-700">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// A lightweight component that safely parses lists, headers, paragraphs, and inline styles in AI responses
function SafeMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    // 1. Headers (### Title)
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      const parsedText = parseInlineMarkdown(text);
      if (level === 1) {
        elements.push(<h1 key={index} className="text-xl font-bold text-white mt-4 mb-2">{parsedText}</h1>);
      } else if (level === 2) {
        elements.push(<h2 key={index} className="text-lg font-bold text-white mt-4 mb-2">{parsedText}</h2>);
      } else {
        elements.push(<h3 key={index} className="text-base font-bold text-white mt-3 mb-1.5">{parsedText}</h3>);
      }
      return;
    }

    // 2. Unordered lists (* Item or - Item)
    const listMatch = line.match(/^[\*\-]\s+(.*)$/);
    if (listMatch) {
      const text = listMatch[1];
      const parsedText = parseInlineMarkdown(text);
      elements.push(
        <div key={index} className="flex items-start gap-2 ml-4 my-1">
          <span className="text-emerald-450 mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
          <span className="text-zinc-300 text-sm leading-relaxed">{parsedText}</span>
        </div>
      );
      return;
    }

    // 3. Ordered lists (1. Item)
    const orderedListMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (orderedListMatch) {
      const num = orderedListMatch[1];
      const text = orderedListMatch[2];
      const parsedText = parseInlineMarkdown(text);
      elements.push(
        <div key={index} className="flex items-start gap-2 ml-4 my-1">
          <span className="text-emerald-450 font-semibold text-xs mt-0.5">{num}.</span>
          <span className="text-zinc-300 text-sm leading-relaxed">{parsedText}</span>
        </div>
      );
      return;
    }

    // 4. Blank lines
    if (line.trim() === "") {
      elements.push(<div key={index} className="h-2" />);
      return;
    }

    // 5. Regular paragraphs
    const parsedText = parseInlineMarkdown(line);
    elements.push(<p key={index} className="text-zinc-300 text-sm leading-relaxed my-1">{parsedText}</p>);
  });

  return <div className="space-y-1">{elements}</div>;
}

export default function WorkspacePage() {
  const [role, setRole] = useState<UserRole>("student");
  const [tab, setTab] = useState<Tab>("learn");
  const [points, setPoints] = useState(180);
  const [profileName, setProfileName] = useState("Demo learner");
  const [userId, setUserId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizTaken, setQuizTaken] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: "user" | "ai"; text: string }>>([]);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function loadProfile() {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;

      setUserId(auth.user.id);
      const metadataRole = auth.user.user_metadata?.role as UserRole | undefined;
      const metadataName = auth.user.user_metadata?.full_name as string | undefined;

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role, points, level")
        .eq("id", auth.user.id)
        .maybeSingle();

      if (profile) {
        setProfileName(profile.full_name || "Demo learner");
        setRole((profile.role as UserRole) || "student");
        setPoints(profile.points ?? 0);
      } else {
        const nextRole = metadataRole === "teacher" ? "teacher" : "student";
        const nextName = metadataName || auth.user.email?.split("@")[0] || "Lakshya learner";
        await supabase.from("profiles").insert({
          id: auth.user.id,
          full_name: nextName,
          role: nextRole,
          points: 0,
          level: 1,
        });
        setProfileName(nextName);
        setRole(nextRole);
        setPoints(0);
      }
    }

    loadProfile();
  }, []);

  const currentLevel = useMemo(() => {
    return [...learningLevels].reverse().find((level) => points >= level.unlockPoints) ?? learningLevels[0];
  }, [points]);

  const score = useMemo(() => {
    return levelOneQuestions.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0);
  }, [answers]);

  const quizComplete = Object.keys(answers).length === levelOneQuestions.length;

  async function submitQuiz() {
    if (!quizComplete || quizTaken) return;
    const earned = 40 + score * 20;
    setPoints((value) => value + earned);
    setQuizTaken(true);

    if (!userId) return;

    // Persist the quiz attempt and the points event together so the
    // refresh_profile_points() trigger recomputes the canonical points total.
    const supabase = createClient();
    try {
      const [attempt, event] = await Promise.all([
        supabase.from("quiz_attempts").insert({
          user_id: userId,
          level: 1,
          score,
          max_score: levelOneQuestions.length,
          points_awarded: earned,
        }),
        supabase.from("point_events").insert({
          user_id: userId,
          event_type: "quiz_passed",
          points: earned,
          metadata: { level: 1, score, max_score: levelOneQuestions.length },
        }),
      ]);
      if (attempt.error) console.warn("quiz_attempts insert failed:", attempt.error.message);
      if (event.error) console.warn("point_events insert failed:", event.error.message);
    } catch (err) {
      console.warn("submitQuiz persistence failed:", err);
      // Optimistic UI keeps the points the user earned this session.
    }
  }

  async function sendChat() {
    if (!chatInput.trim()) return;
    const userPrompt = chatInput.trim();
    const userMsgId = Date.now().toString() + "-u";
    const aiMsgId = Date.now().toString() + "-a";

    setChatMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: "user", text: userPrompt }
    ]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userPrompt, role, level: currentLevel.level }),
      });
      const data = await res.json();
      const aiText = data.content || "No response generated.";

      setChatMessages((prev) => [
        ...prev,
        { id: aiMsgId, sender: "ai", text: aiText }
      ]);

      if (userId) {
        await createClient().from("tool_usage").insert({
          user_id: userId,
          tool_name: "Lakshya AI Chat",
          level: currentLevel.level,
          prompt: userPrompt,
          response: aiText,
        });
      }
    } catch {
      const errorText = "Chat is ready, but the API request failed. Check OPENROUTER_API_KEY when you add it.";
      setChatMessages((prev) => [
        ...prev,
        { id: aiMsgId, sender: "ai", text: errorText }
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  async function signOut() {
    await createClient().auth.signOut();
    window.location.href = "/";
  }

  return (
    <SafeErrorBoundary>
      <main className="min-h-screen app-shell">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm hover:opacity-80">
            <ArrowLeft className="h-4 w-4" /> Public website
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right text-xs text-muted-foreground sm:block">
              <p className="font-medium text-foreground">{profileName}</p>
              <p>{points} readiness points</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {role === "teacher" ? "T" : "S"}
            </div>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container grid gap-6 py-6 lg:grid-cols-[260px,1fr]">
        <aside className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(["student", "teacher"] as UserRole[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setRole(item);
                      if (userId) {
                        createClient().from("profiles").update({ role: item }).eq("id", userId);
                      }
                    }}
                    className={`rounded-md border px-3 py-2 text-sm font-medium capitalize ${role === item ? "border-primary bg-primary/10 text-primary" : "bg-white"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              {[
                ["learn", "Learn AI"],
                ["tools", "Tools"],
                ["chat", "Chat with AI"],
                ["quiz", "Quiz and points"],
                ["leaderboard", "Leaderboard"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id as Tab)}
                  className={`mb-1 flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium last:mb-0 ${tab === id ? "bg-primary text-white" : "hover:bg-secondary"}`}
                >
                  {label}
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Chats</p>
              <div className="mt-3 space-y-1">
                {(role === "teacher" ? PHYSICS_TEACHER_TEMPLATES : PHYSICS_STUDENT_TEMPLATES).map((hist, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTab("chat");
                      setChatInput("");
                      setChatMessages([
                        { id: Date.now().toString() + "-u", sender: "user", text: hist.prompt },
                        { id: Date.now().toString() + "-a", sender: "ai", text: hist.response }
                      ]);
                    }}
                    className="w-full text-left py-1.5 px-3 rounded text-xs text-slate-700 hover:text-primary hover:bg-slate-50 transition truncate block border border-transparent hover:border-slate-100"
                  >
                    {hist.title}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Progress</p>
              <p className="mt-3 font-display text-3xl font-bold">{points}</p>
              <p className="text-sm text-muted-foreground">readiness points</p>
              <div className="mt-4 rounded-md border bg-slate-50 p-3 text-sm">
                Current: Level {currentLevel.level} - {currentLevel.title}
              </div>
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-6">
          <div className="rounded-xl border bg-slate-950 p-6 text-white">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold text-emerald-300">{roleCopy[role]?.label || (role === "teacher" ? "Teacher" : "Student")} path</p>
                <h1 className="mt-2 font-display text-3xl font-bold">{roleCopy[role]?.heading || (role === "teacher" ? "Teach AI safely, then use it in classroom work." : "Learn AI, practice AI, then build with AI.")}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">{roleCopy[role]?.description || (role === "teacher" ? "Progress from AI basics to lesson support, research workflows, and builder-level classroom tools." : "Use the levels to understand safe AI use, improve study workflows, and unlock builder tools.")}</p>
              </div>
              <Button variant="gradient" onClick={() => setTab("quiz")}>Take weekly quiz</Button>
            </div>
          </div>

          {tab === "learn" && (
            <div className="grid gap-5 lg:grid-cols-3">
              {learningLevels.map((level) => {
                const unlocked = points >= level.unlockPoints;
                const Icon = level.level === 1 ? Sparkles : level.level === 2 ? Bot : GraduationCap;
                return (
                  <Card key={level.level} className={!unlocked ? "opacity-70" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        {unlocked ? <CheckCircle2 className="h-5 w-5 text-accent" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <h2 className="mt-5 font-display text-xl font-bold">Level {level.level}: {level.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{level.subtitle}</p>
                      <div className="mt-4 space-y-2">
                        {level.topics.map((topic) => (
                          <div key={topic} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-accent" /> {topic}
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 rounded-md border bg-slate-50 p-3 text-sm text-muted-foreground">
                        <PlayCircle className="mr-2 inline h-4 w-4" /> Videos coming soon
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {tab === "tools" && (
            <div className="space-y-6">
              {/* Class 10 Physics Templates Grid */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="font-display text-xl font-semibold text-slate-900">Class 10 Physics Templates</h2>
                  <span className="text-[10px] px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-bold uppercase">CBSE Unit</span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {(role === "teacher" ? PHYSICS_TEACHER_TEMPLATES : PHYSICS_STUDENT_TEMPLATES).map((temp, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTab("chat");
                        setChatInput("");
                        setChatMessages([
                          { id: Date.now().toString() + "-u", sender: "user", text: temp.prompt },
                          { id: Date.now().toString() + "-a", sender: "ai", text: temp.response }
                        ]);
                      }}
                      className="bg-white border border-slate-200 rounded-xl p-5 text-left shadow-sm hover:shadow-md transition hover:-translate-y-0.5 active:scale-98 select-none group cursor-pointer"
                    >
                      <h4 className="font-semibold text-sm text-slate-955 group-hover:text-primary transition leading-tight">
                        {temp.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                        {temp.prompt}
                      </p>
                      <span className="text-xs text-primary font-bold block mt-3 group-hover:underline">
                        Open in Chat &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Unlocked AI Tools Grid */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="font-display text-xl font-semibold text-slate-900">Unlocked AI Tools</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  {learningLevels.flatMap((level) =>
                    level.tools.map((tool) => {
                      const unlocked = points >= level.unlockPoints;
                      return (
                        <Card key={tool.name} className={!unlocked ? "opacity-60" : "hover:shadow-md transition"}>
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                                <tool.icon className="h-5 w-5" />
                              </div>
                              <span className="rounded-full bg-secondary px-2 py-1 text-xs">Level {level.level}</span>
                            </div>
                            <h3 className="mt-4 font-display text-lg font-bold">{tool.name}</h3>
                            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
                            <div className="mt-4 text-xs font-semibold flex justify-between items-center">
                              {unlocked ? (
                                <>
                                  <span className="text-accent">Unlocked</span>
                                  <a
                                    href={tool.name === "ChatGPT" ? "https://chatgpt.com" : tool.name === "Gemini" ? "https://gemini.google.com" : tool.name === "NotebookLM" ? "https://notebooklm.google.com" : "https://perplexity.ai"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline font-bold"
                                  >
                                    Launch &rarr;
                                  </a>
                                </>
                              ) : (
                                <span className="text-muted-foreground">Locked until {level.unlockPoints} pts</span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === "chat" && (
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 flex flex-col min-h-[600px] relative">
              {/* Top Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-950 flex-shrink-0">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-zinc-900 px-3 py-1.5 rounded-lg transition">
                  <span className="font-display font-semibold text-sm tracking-wide">Lakshya AI</span>
                  <ChevronDown className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-850 text-zinc-400 font-medium capitalize">
                    {role} Mode
                  </span>
                  <button
                    onClick={() => {
                      setChatInput("");
                      setChatMessages([]);
                    }}
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition border border-zinc-850"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    New chat
                  </button>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 flex flex-col justify-between p-6">
                {chatMessages.length === 0 ? (
                  /* Empty / Dashboard State */
                  <div className="flex-1 flex flex-col items-center justify-center py-8 space-y-6">
                    {/* Greeting & Input Group */}
                    <div className="w-full max-w-2xl mx-auto space-y-6">
                      <h2 className="font-display text-3xl font-medium tracking-tight text-center text-white">
                        {role === "teacher" 
                          ? "What physics lesson shall we build today?"
                          : "What physics concept are we mastering today?"}
                      </h2>

                      {/* Input Pill (centered in empty state) */}
                      <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-3xl px-4 py-3 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 transition">
                        <button className="text-zinc-500 hover:text-zinc-350 p-1 rounded-full transition flex-shrink-0">
                          <Plus className="h-4 w-4" />
                        </button>
                        <input
                          value={chatInput}
                          onChange={(event) => setChatInput(event.target.value)}
                          className="min-w-0 flex-1 bg-transparent px-3 py-1 text-sm text-white placeholder-zinc-500 outline-none"
                          placeholder="Ask anything..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !chatLoading) sendChat();
                          }}
                        />
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button className="text-zinc-500 hover:text-zinc-350 p-1 rounded-full transition">
                            <Mic className="h-4 w-4" />
                          </button>
                          <button
                            onClick={sendChat}
                            disabled={chatLoading || !chatInput.trim()}
                            className={`p-1.5 rounded-full transition ${
                              chatInput.trim() && !chatLoading
                                ? "bg-white text-black hover:bg-zinc-200"
                                : "text-zinc-500 bg-zinc-900/50 border border-zinc-850 cursor-not-allowed"
                            }`}
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Quick Action Pills under Input Pill */}
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button 
                          onClick={() => setChatInput("Create a visual analogy for electric current...")}
                          className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full hover:bg-zinc-850 hover:text-white transition"
                        >
                          <ImageIcon className="h-3 w-3 text-zinc-400" />
                          Create an image analogy
                        </button>
                        <button 
                          onClick={() => setChatInput("Write or edit a Class 10 CBSE physics question...")}
                          className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full hover:bg-zinc-850 hover:text-white transition"
                        >
                          <FileText className="h-3 w-3 text-zinc-400" />
                          Write or edit questions
                        </button>
                        <button 
                          onClick={() => setChatInput("Look something up in CBSE Class 10 Light syllabus...")}
                          className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full hover:bg-zinc-850 hover:text-white transition"
                        >
                          <Globe className="h-3 w-3 text-zinc-400" />
                          Look up syllabus
                        </button>
                      </div>
                    </div>

                    {/* Physics Template Cards section */}
                    <div className="w-full max-w-2xl mx-auto space-y-3 pt-6 border-t border-zinc-900">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Quick Physics Templates</span>
                        <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full font-semibold border border-blue-900/30">CBSE Class 10</span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {(role === "teacher" ? PHYSICS_TEACHER_TEMPLATES : PHYSICS_STUDENT_TEMPLATES).map((temp, idx) => {
                          const IconComponent = idx === 0 ? Sparkles : idx === 1 ? FileText : Globe;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                setChatInput("");
                                setChatMessages([
                                  { id: Date.now().toString() + "-u", sender: "user", text: temp.prompt },
                                  { id: Date.now().toString() + "-a", sender: "ai", text: temp.response }
                                ]);
                              }}
                              className="flex flex-col items-start p-4 rounded-xl border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/60 hover:border-zinc-800 text-left transition duration-200 group"
                            >
                              <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-emerald-400 group-hover:bg-zinc-950 transition">
                                <IconComponent className="h-3.5 w-3.5" />
                              </div>
                              <h4 className="font-semibold text-xs text-zinc-200 mt-2.5 group-hover:text-white transition line-clamp-1">
                                {temp.title}
                              </h4>
                              <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2 leading-normal group-hover:text-zinc-400 transition">
                                {temp.prompt}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Active Chat State */
                  <div className="flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="flex-1 overflow-y-auto space-y-6 pr-2 max-h-[380px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                      <div className="space-y-6 max-w-3xl mx-auto w-full py-4 flex flex-col">
                        {chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex gap-4 items-start w-full ${
                              msg.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                          >
                            {msg.sender === "ai" && (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 flex-shrink-0">
                                <Bot className="h-4 w-4" />
                              </div>
                            )}
                            <div
                              className={
                                msg.sender === "user"
                                  ? "bg-zinc-800 text-zinc-100 rounded-2xl px-4 py-2.5 max-w-[80%] text-sm shadow-md ml-auto"
                                  : "flex-1 space-y-2"
                              }
                            >
                              {msg.sender === "ai" && (
                                <div className="text-xs font-semibold text-zinc-500">Lakshya AI</div>
                              )}
                              <div
                                className={
                                  msg.sender === "ai"
                                    ? "text-sm leading-relaxed text-zinc-200 bg-zinc-900/30 border border-zinc-900/50 p-4 rounded-2xl overflow-x-auto"
                                    : ""
                                }
                              >
                                {msg.sender === "ai" ? (
                                  <SafeMarkdown content={msg.text} />
                                ) : (
                                  msg.text
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {chatLoading && (
                          <div className="flex gap-4 items-start justify-start w-full">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 flex-shrink-0">
                              <Bot className="h-4 w-4" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="text-xs font-semibold text-zinc-500">Lakshya AI</div>
                              <div className="flex items-center gap-2 text-zinc-400 py-2 bg-zinc-900/30 border border-zinc-900/50 px-4 rounded-2xl w-fit">
                                <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                                <span className="text-xs">Thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Fixed Input Area (Compact) */}
                    <div className="w-full max-w-2xl mx-auto mt-4 pt-3 border-t border-zinc-900 flex-shrink-0">
                      <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-3xl px-4 py-2.5 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 transition">
                        <button className="text-zinc-500 hover:text-zinc-355 p-1 rounded-full transition flex-shrink-0">
                          <Plus className="h-4 w-4" />
                        </button>
                        <input
                          value={chatInput}
                          onChange={(event) => setChatInput(event.target.value)}
                          className="min-w-0 flex-1 bg-transparent px-3 py-1 text-sm text-white placeholder-zinc-500 outline-none"
                          placeholder="Ask anything..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !chatLoading) sendChat();
                          }}
                        />
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button className="text-zinc-500 hover:text-zinc-355 p-1 rounded-full transition">
                            <Mic className="h-4 w-4" />
                          </button>
                          <button
                            onClick={sendChat}
                            disabled={chatLoading || !chatInput.trim()}
                            className={`p-1.5 rounded-full transition ${
                              chatInput.trim() && !chatLoading
                                ? "bg-white text-black hover:bg-zinc-200"
                                : "text-zinc-500 bg-zinc-900/50 border border-zinc-850 cursor-not-allowed"
                            }`}
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[10px] text-zinc-650 text-center mt-2">
                        Lakshya AI can make mistakes. Consider checking important information.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "quiz" && (
            <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-2xl font-bold">Level 1 weekly quiz</h2>
                  <p className="mt-2 text-sm text-muted-foreground">For now, this is the active quiz. It can be attempted two times per week.</p>
                  <div className="mt-6 space-y-5">
                    {levelOneQuestions.map((question, qIndex) => (
                      <div key={question.question} className="rounded-lg border p-4">
                        <p className="font-medium">{qIndex + 1}. {question.question}</p>
                        <div className="mt-3 grid gap-2">
                          {question.options.map((option, index) => (
                            <button
                              key={option}
                              disabled={quizTaken}
                              onClick={() => setAnswers({ ...answers, [qIndex]: index })}
                              className={`rounded-md border px-3 py-2 text-left text-sm transition ${answers[qIndex] === index ? "border-primary bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button onClick={submitQuiz} disabled={!quizComplete || quizTaken} className="mt-6">
                    {quizTaken ? "Quiz points added" : "Submit quiz"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Trophy className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 font-display text-xl font-bold">Point criteria</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Score: {score}/{levelOneQuestions.length}</p>
                  <div className="mt-4 space-y-2">
                    {quizRules.map((rule) => (
                      <p key={rule} className="flex gap-2 text-sm text-muted-foreground">
                        <Clock className="mt-0.5 h-4 w-4 text-primary" /> {rule}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {tab === "leaderboard" && (
            <Card>
              <CardContent className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
                <Trophy className="h-12 w-12 text-primary" />
                <h2 className="mt-5 font-display text-3xl font-bold">Leaderboard coming soon</h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  We will activate school, college, and university leaderboards after real users start earning points. For now, focus is on learning quality and tool unlocks.
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  </SafeErrorBoundary>
  );
}
