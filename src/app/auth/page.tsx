"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Lock, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/curriculum";

export default function AuthPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [role, setRole] = useState<UserRole>("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit() {
    setLoading(true);
    setMessage("");
    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, role } },
        });
        if (error) throw error;

        if (data.user) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            full_name: fullName || email.split("@")[0],
            role,
            points: 0,
            level: 1,
          });
        }

        setMessage("Account created. If email confirmation is enabled, confirm your email, then login.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/workspace";
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Auth failed. Check Supabase keys and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen gradient-bg-hero p-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr,420px]">
          <div className="flex flex-col justify-center">
            <Link href="/" className="mb-8 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to website
            </Link>
            <h1 className="font-display text-5xl font-bold tracking-tight">Create your Lakshya AI account.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Signup opens the web app: choose teacher or student, complete Level 1 AI basics, earn points, and unlock useful AI tools.
            </p>
            <div className="mt-8 grid max-w-xl gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <div className="rounded-lg border bg-white p-4">Level path</div>
              <div className="rounded-lg border bg-white p-4">Quiz points</div>
              <div className="rounded-lg border bg-white p-4">Tool unlocks</div>
            </div>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-6">
              <div className="mb-6 flex rounded-lg bg-secondary p-1">
                <button
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${mode === "signup" ? "bg-white shadow-sm" : "text-muted-foreground"}`}
                  onClick={() => setMode("signup")}
                >
                  Sign up
                </button>
                <button
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${mode === "login" ? "bg-white shadow-sm" : "text-muted-foreground"}`}
                  onClick={() => setMode("login")}
                >
                  Login
                </button>
              </div>

              <div className="space-y-4">
                {mode === "signup" && (
                  <>
                    <Field icon={<UserRound className="h-4 w-4" />} label="Full name">
                      <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="auth-input" placeholder="Yash Sharma" />
                    </Field>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(["student", "teacher"] as UserRole[]).map((item) => (
                          <button
                            key={item}
                            className={`rounded-md border px-3 py-2 text-sm font-medium capitalize ${role === item ? "border-primary bg-primary/10 text-primary" : "bg-white"}`}
                            onClick={() => setRole(item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <Field icon={<Mail className="h-4 w-4" />} label="Email">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" placeholder="you@example.com" type="email" />
                </Field>
                <Field icon={<Lock className="h-4 w-4" />} label="Password">
                  <input value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" placeholder="Minimum 6 characters" type="password" />
                </Field>

                <Button onClick={submit} disabled={loading || !email || !password || (mode === "signup" && !fullName)} className="w-full" size="lg">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : mode === "signup" ? "Create account" : "Login"}
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/workspace">Open local demo without auth</Link>
                </Button>

                {message && <p className="rounded-md bg-secondary p-3 text-sm text-muted-foreground">{message}</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        .auth-input {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid hsl(var(--border));
          background: white;
          padding: 0.75rem 0.875rem;
          font-size: 0.875rem;
        }
        .auth-input:focus {
          outline: none;
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.12);
        }
      `}</style>
    </main>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}
