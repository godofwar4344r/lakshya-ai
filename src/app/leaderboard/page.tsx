import Link from "next/link";
import { ArrowLeft, Award, Building2, GraduationCap, School, Trophy, University, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const boards = [
  {
    title: "Schools",
    icon: School,
    rows: [
      { rank: 1, name: "Delhi Public School, R.K. Puram", city: "New Delhi", score: 9840 },
      { rank: 2, name: "DPS Dwarka", city: "New Delhi", score: 9620 },
      { rank: 3, name: "The Doon School", city: "Dehradun", score: 8950 },
      { rank: 4, name: "Welham Girls' School", city: "Dehradun", score: 8510 },
    ],
  },
  {
    title: "Colleges",
    icon: Building2,
    rows: [
      { rank: 1, name: "Christ College", city: "Bangalore", score: 8190 },
      { rank: 2, name: "Mayo College", city: "Ajmer", score: 8240 },
      { rank: 3, name: "La Martiniere College", city: "Lucknow", score: 8740 },
      { rank: 4, name: "Modern College", city: "Pune", score: 7920 },
    ],
  },
  {
    title: "Universities",
    icon: University,
    rows: [
      { rank: 1, name: "IIMT University", city: "Meerut", score: 9485, highlight: true },
      { rank: 2, name: "Vellore Institute of Technology", city: "Vellore", score: 9210 },
      { rank: 3, name: "Manipal University Jaipur", city: "Jaipur", score: 9180 },
      { rank: 4, name: "IIIT Hyderabad", city: "Hyderabad", score: 8620 },
    ],
  },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen app-shell">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm hover:opacity-80">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="flex items-center gap-2 font-display font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">L</div>
            Lakshya AI
          </div>
        </div>
      </header>

      <section className="border-b bg-slate-950 text-white">
        <div className="container py-12">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Trophy className="h-4 w-4 text-emerald-300" /> Daily AI adoption leaderboard
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight">
            Compare institutions with the right category.
          </h1>
          <p className="mt-4 max-w-2xl text-white/65">
            Schools, colleges, and universities compete separately so rankings feel fair. Points come from awareness tests, course completion, tool usage, and student challenge wins.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Stat icon={Users} label="Learners active" value="18,420" />
            <Stat icon={GraduationCap} label="Teachers using tools" value="1,742" />
            <Stat icon={Award} label="Level 1 passes" value="9,806" />
            <Stat icon={Trophy} label="Daily points" value="42,180" />
          </div>
        </div>
      </section>

      <section className="container grid gap-6 py-10 lg:grid-cols-3">
        {boards.map((board) => (
          <Card key={board.title}>
            <CardContent className="p-0">
              <div className="flex items-center gap-3 border-b p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <board.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">{board.title}</h2>
                  <p className="text-xs text-muted-foreground">Updated daily</p>
                </div>
              </div>
              {board.rows.map((row) => (
                <div key={row.name} className={`flex items-center justify-between border-b px-5 py-4 last:border-b-0 ${row.highlight ? "bg-primary/5" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary font-display text-sm font-bold">#{row.rank}</div>
                    <div>
                      <p className={row.highlight ? "font-medium text-primary" : "font-medium"}>{row.name}</p>
                      <p className="text-xs text-muted-foreground">{row.city}</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm font-semibold">{row.score.toLocaleString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <Icon className="h-5 w-5 text-emerald-300" />
      <p className="mt-3 text-xs uppercase tracking-wider text-white/50">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}
