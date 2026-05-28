import Link from "next/link";
import { ArrowLeft, BookOpen, Brain, Building2, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center gradient-bg-hero p-6">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-9 w-9 rounded-md bg-primary flex items-center justify-center text-white font-display font-bold">L</div>
              <span className="font-display text-xl font-semibold">Lakshya <span className="gradient-text">AI</span></span>
            </div>
            <h1 className="font-display text-2xl font-bold mt-4">Open the Phase 1 demo</h1>
            <p className="text-muted-foreground text-sm mt-1">Pick a path to show awareness, adoption, and measurement.</p>

            <div className="mt-6 space-y-3">
              <Button asChild variant="gradient" size="lg" className="w-full justify-start">
                <Link href="/workspace?role=learn"><BookOpen className="h-5 w-5 mr-3" /> Start Level 1 AI Awareness</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-start">
                <Link href="/workspace?role=teacher"><GraduationCap className="h-5 w-5 mr-3" /> Enter as Teacher</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-start">
                <Link href="/workspace?role=student"><Brain className="h-5 w-5 mr-3" /> Enter as Student</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-start">
                <Link href="/workspace?role=admin"><Building2 className="h-5 w-5 mr-3" /> Enter as Institution Admin</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6 text-center">
              Demo role switcher for Phase 1. Production auth can be enabled with Supabase.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
