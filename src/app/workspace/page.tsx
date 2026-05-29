"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, CheckCircle2, ChevronRight, Clock, GraduationCap, Lock, LogOut, MessageSquare, PlayCircle, Send, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { learningLevels, levelOneQuestions, quizRules, roleCopy, type UserRole } from "@/lib/curriculum";
import { createClient } from "@/lib/supabase/client";

type Tab = "learn" | "tools" | "quiz" | "leaderboard";

export default function WorkspacePage() {
  const [role, setRole] = useState<UserRole>("student");
  const [tab, setTab] = useState<Tab>("learn");
  const [points, setPoints] = useState(180);
  const [profileName, setProfileName] = useState("Demo learner");
  const [userId, setUserId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizTaken, setQuizTaken] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatOutput, setChatOutput] = useState("Ask Lakshya AI how to use ChatGPT or Gemini safely for your next education task.");
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
        setProfileName(profile.full_name);
        setRole(profile.role as UserRole);
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

  function submitQuiz() {
    if (!quizComplete || quizTaken) return;
    const earned = 40 + score * 20;
    setPoints((value) => value + earned);
    setQuizTaken(true);

    if (userId) {
      const supabase = createClient();
      supabase.from("quiz_attempts").insert({
        user_id: userId,
        level: 1,
        score,
        max_score: levelOneQuestions.length,
        points_awarded: earned,
      });
      supabase.from("point_events").insert({
        user_id: userId,
        event_type: "quiz_passed",
        points: earned,
        metadata: { level: 1, score, max_score: levelOneQuestions.length },
      });
    }
  }

  async function sendChat() {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    setChatOutput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput, role, level: currentLevel.level }),
      });
      const data = await res.json();
      setChatOutput(data.content || "No response generated.");
      if (userId) {
        await createClient().from("tool_usage").insert({
          user_id: userId,
          tool_name: "Lakshya AI Chat",
          level: currentLevel.level,
          prompt: chatInput,
          response: data.content || "",
        });
      }
    } catch {
      setChatOutput("Chat is ready, but the API request failed. Check OPENROUTER_API_KEY when you add it.");
    } finally {
      setChatLoading(false);
    }
  }

  async function signOut() {
    await createClient().auth.signOut();
    window.location.href = "/";
  }

  return (
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
                <p className="text-sm font-semibold text-emerald-300">{roleCopy[role].label} path</p>
                <h1 className="mt-2 font-display text-3xl font-bold">{roleCopy[role].heading}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">{roleCopy[role].description}</p>
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
            <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
              <div className="grid gap-5 md:grid-cols-2">
                {learningLevels.flatMap((level) =>
                  level.tools.map((tool) => {
                    const unlocked = points >= level.unlockPoints;
                    return (
                      <Card key={tool.name} className={!unlocked ? "opacity-60" : ""}>
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                              <tool.icon className="h-5 w-5" />
                            </div>
                            <span className="rounded-full bg-secondary px-2 py-1 text-xs">Level {level.level}</span>
                          </div>
                          <h3 className="mt-4 font-display text-xl font-bold">{tool.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
                          <div className="mt-4 text-sm font-medium">
                            {unlocked ? <span className="text-accent">Unlocked</span> : <span className="text-muted-foreground">Locked until {level.unlockPoints} pts</span>}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-bold">Lakshya AI chat</h2>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">OpenRouter-ready. Add the API key to make it live.</p>
                  <div className="mt-4 min-h-40 rounded-md border bg-slate-50 p-4 text-sm leading-6 text-muted-foreground">
                    {chatLoading ? "Thinking..." : chatOutput}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <input
                      value={chatInput}
                      onChange={(event) => setChatInput(event.target.value)}
                      className="min-w-0 flex-1 rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                      placeholder="Ask how to use AI safely..."
                    />
                    <Button onClick={sendChat} disabled={chatLoading}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
  );
}
