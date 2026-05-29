import Link from "next/link";
import { ArrowLeft, Clock, School, Trophy, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen app-shell">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm hover:opacity-80">
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>
          <div className="font-display font-semibold">Lakshya AI</div>
        </div>
      </header>

      <section className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <Card className="max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Trophy className="h-8 w-8" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold">Leaderboards are coming soon.</h1>
            <p className="mt-4 text-muted-foreground leading-7">
              Once real teachers and students start earning points, Lakshya AI will show separate boards for schools, colleges, and universities.
            </p>
            <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
              <Mini icon={School} title="Schools" />
              <Mini icon={Users} title="Colleges" />
              <Mini icon={Clock} title="Universities" />
            </div>
            <Button asChild className="mt-8">
              <Link href="/auth">Start earning points</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function Mini({ icon: Icon, title }: { icon: typeof Trophy; title: string }) {
  return (
    <div className="rounded-lg border bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-3 font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">Coming soon</p>
    </div>
  );
}
