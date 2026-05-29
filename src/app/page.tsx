import Link from "next/link";
import { ArrowRight, BookOpen, Brain, CheckCircle2, Download, GraduationCap, Lock, PlayCircle, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { learningLevels, safetyPillars } from "@/lib/curriculum";

const stats = [
  { label: "Learning levels", value: "3" },
  { label: "Starter AI tools", value: "2" },
  { label: "Weekly quiz attempts", value: "2" },
  { label: "Leaderboard", value: "Soon" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">L</div>
            <span className="font-display text-xl font-semibold">Lakshya AI</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <Link href="#levels" className="hover:text-foreground">Levels</Link>
            <Link href="#safety" className="hover:text-foreground">Safety</Link>
            <Link href="#apps" className="hover:text-foreground">Apps</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth">Sign up</Link>
            </Button>
          </div>
        </div>
      </nav>

      <section className="gradient-bg-hero border-b">
        <div className="container grid gap-10 py-16 lg:grid-cols-[1fr,460px] lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Built with Codex for the OpenAI x Outskill Hackathon
            </div>
            <h1 className="max-w-4xl font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              Learn AI safely before you use AI seriously.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Lakshya AI is a web app for teachers and students to learn AI basics, pass level quizzes, unlock useful AI tools, and build readiness points over time.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/auth">Start the web app <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#levels">View learning levels</Link>
              </Button>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Teacher and student paths</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Points and unlocks</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> OpenRouter-ready chat</div>
            </div>
          </div>

          <Card className="overflow-hidden shadow-xl">
            <div className="border-b bg-slate-950 p-5 text-white">
              <p className="text-xs uppercase tracking-wider text-white/55">Web app preview</p>
              <h2 className="mt-1 font-display text-2xl font-bold">Level-based AI readiness</h2>
            </div>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-md border bg-slate-50 p-4">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 font-display text-3xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3">
                {learningLevels.map((level) => (
                  <div key={level.level} className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="font-medium">Level {level.level}: {level.title}</p>
                      <p className="text-xs text-muted-foreground">{level.tools.map((tool) => tool.name).join(", ")}</p>
                    </div>
                    {level.level === 1 ? <CheckCircle2 className="h-5 w-5 text-accent" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="levels" className="container py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Learning system</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Three levels from awareness to building.</h2>
          <p className="mt-4 text-muted-foreground">Videos are marked coming soon for now. The web app starts with lessons, tools, quizzes, and point unlocks.</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {learningLevels.map((level) => (
            <Card key={level.level}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {level.level === 1 ? <BookOpen className="h-5 w-5" /> : level.level === 2 ? <Brain className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{level.unlockPoints} pts unlock</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">Level {level.level}: {level.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{level.subtitle}</p>
                <div className="mt-5 space-y-2">
                  {level.topics.slice(0, 4).map((topic) => (
                    <div key={topic} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent" /> {topic}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-md border bg-slate-50 p-3 text-sm text-muted-foreground">
                  Tools: {level.tools.map((tool) => tool.name).join(", ")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="safety" className="border-y bg-white">
        <div className="container grid gap-8 py-16 lg:grid-cols-[360px,1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Why awareness first</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">If users do not know AI, they cannot use AI well.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Level 1 teaches the base: what AI is, safe usage, good and bad use, prompting, and how AI fits education.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {safetyPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-lg border bg-slate-50 p-5">
                <pillar.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-display text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apps" className="container py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard icon={PlayCircle} title="Videos" text="Coming soon: short guided video lessons for each level." />
          <InfoCard icon={Trophy} title="Leaderboard" text="Coming soon: once real users join, schools and colleges can compare progress." />
          <InfoCard icon={Download} title="Desktop and mobile apps" text="Coming later. For now, Lakshya AI is focused on the web app." />
        </div>
      </section>

      <section className="border-t bg-slate-950 text-white">
        <div className="container flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Start with the web app.</h2>
            <p className="mt-2 text-white/65">Signup, choose teacher or student, complete Level 1, and unlock tools.</p>
          </div>
          <Button asChild variant="gradient" size="lg">
            <Link href="/auth">Create account</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}
