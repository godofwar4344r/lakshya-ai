import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  Gauge,
  GraduationCap,
  LineChart,
  PlayCircle,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const journey = [
  {
    title: "Learn AI",
    text: "Short awareness modules help teachers and students understand what AI is, where it helps, and where it must be used carefully.",
    icon: BookOpen,
  },
  {
    title: "Use AI",
    text: "Teachers generate lesson plans, quizzes, and explainers while students complete weekly AI challenges with instant feedback.",
    icon: Sparkles,
  },
  {
    title: "Measure AI readiness",
    text: "Admins see adoption, participation, challenge scores, and a simple readiness score they can improve every week.",
    icon: Gauge,
  },
];

const metrics = [
  { label: "Teachers active", value: "38", delta: "+18% this week" },
  { label: "Students onboarded", value: "487", delta: "72% participation" },
  { label: "AI readiness", value: "78", delta: "+12 points" },
  { label: "Challenges completed", value: "1,284", delta: "across 4 tracks" },
];

const leaderboard = [
  { rank: 1, name: "Delhi Public School, R.K. Puram", score: 9840 },
  { rank: 2, name: "DPS Dwarka", score: 9620 },
  { rank: 3, name: "IIMT University", score: 9485, highlight: true },
  { rank: 4, name: "Vellore Institute of Technology", score: 9210 },
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
            <Link href="#platform" className="hover:text-foreground">Platform</Link>
            <Link href="#outcome" className="hover:text-foreground">Outcome</Link>
            <Link href="/leaderboard" className="hover:text-foreground">Leaderboard</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/workspace" className="text-sm font-medium hover:text-primary">Demo login</Link>
            <Button asChild variant="gradient" size="sm">
              <Link href="/workspace">Launch workspace</Link>
            </Button>
          </div>
        </div>
      </nav>

      <section className="gradient-bg-hero border-b">
        <div className="container grid gap-12 py-16 lg:grid-cols-[1fr,520px] lg:py-20">
          <div className="flex flex-col justify-center">
            <h1 className="max-w-4xl font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              AI awareness and adoption for every institution.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Lakshya AI helps schools and colleges teach AI basics, put AI into daily classroom work, and measure readiness with one clear institutional dashboard.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="gradient" size="lg">
                <Link href="/workspace">Launch Lakshya Workspace <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/leaderboard">See the national leaderboard</Link>
              </Button>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Built for Phase 1 MVP</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Powered by OpenAI</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Institution-first SaaS</div>
            </div>
          </div>

          <Card className="overflow-hidden border-slate-200 shadow-xl">
            <div className="border-b bg-slate-950 px-5 py-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/55">Institution command center</p>
                  <h2 className="mt-1 font-display text-xl font-semibold">IIMT University AI Readiness</h2>
                </div>
                <div className="rounded-md bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">Live demo</div>
              </div>
            </div>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-md border bg-slate-50 p-4">
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                    <p className="mt-2 font-display text-3xl font-bold">{metric.value}</p>
                    <p className="mt-1 text-xs text-accent">{metric.delta}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-md border">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <p className="text-sm font-medium">Adoption pipeline</p>
                  <LineChart className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-3 p-4">
                  {["Awareness modules", "Teacher AI usage", "Student challenges", "Admin measurement"].map((item, index) => (
                    <div key={item}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>{item}</span>
                        <span className="text-muted-foreground">{[86, 74, 68, 78][index]}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${[86, 74, 68, 78][index]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="platform" className="container py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Platform journey</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Awareness first. Adoption next. Measurement always.</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {journey.map((step) => (
            <Card key={step.title}>
              <CardContent className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="outcome" className="border-y bg-white">
        <div className="container grid gap-10 py-16 lg:grid-cols-[420px,1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">What judges should see</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">A working loop that pushes AI use inside education.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              The prototype is intentionally small: one institution, one teacher toolkit, one student arena, and one admin dashboard. The result is visible movement from AI awareness to AI readiness.
            </p>
            <Button asChild className="mt-6">
              <Link href="/workspace">See the result <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Result icon={GraduationCap} title="Teacher outcome" text="A teacher who did not know prompting can create a usable lesson, quiz, and explainer in minutes." />
            <Result icon={Brain} title="Student outcome" text="Students practice AI through challenges and receive fast feedback that improves their submissions." />
            <Result icon={BarChart3} title="Admin outcome" text="Leadership sees adoption metrics instead of guessing whether AI learning is actually happening." />
            <Result icon={Trophy} title="Motivation layer" text="Leaderboard and readiness scores make progress visible, social, and repeatable." />
          </div>
        </div>
      </section>

      <section className="container grid gap-8 py-16 lg:grid-cols-[1fr,460px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Competitive hook</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Institutions improve faster when progress is visible.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            The leaderboard is not the whole product. It is the pressure system that keeps schools and colleges moving after the first awareness session.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild variant="outline">
              <Link href="/leaderboard">Open leaderboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/student">Open student arena</Link>
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="p-0">
            {leaderboard.map((row) => (
              <div key={row.rank} className={`flex items-center justify-between border-b px-5 py-4 last:border-b-0 ${row.highlight ? "bg-primary/5" : ""}`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary font-display font-bold">#{row.rank}</div>
                  <div>
                    <p className={row.highlight ? "font-medium text-primary" : "font-medium"}>{row.name}</p>
                    <p className="text-xs text-muted-foreground">{row.highlight ? "Pilot institution" : "Active institution"}</p>
                  </div>
                </div>
                <p className="font-mono font-semibold">{row.score.toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="border-t bg-slate-950 text-white">
        <div className="container flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Ready for the Phase 1 demo.</h2>
            <p className="mt-2 text-white/65">Show awareness, usage, measurement, and the result in under three minutes.</p>
          </div>
          <Button asChild variant="gradient" size="lg">
            <Link href="/login"><PlayCircle className="mr-2 h-4 w-4" /> Start demo flow</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function Result({ icon: Icon, title, text }: { icon: typeof Users; title: string; text: string }) {
  return (
    <div className="rounded-lg border bg-slate-50 p-5">
      <Icon className="h-5 w-5 text-primary" />
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
