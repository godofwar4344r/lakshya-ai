# Lakshya AI

> **Where India's institutions compete on AI.**

A national AI literacy platform where teachers learn to integrate AI in education, students compete in live AI challenges, and institutions race up a public leaderboard.

Hackathon submission — built solo in 3 days.

---

## What this is

Three product surfaces, one mission:

1. **Teacher Toolkit** — AI lesson plan generator, MCQ quiz generator, concept explainer. Built so teachers who've never touched ChatGPT can deliver world-class AI-augmented classes from day one.
2. **Student Arena** — Live AI challenges with text/file submission. Students get instant GPT-4o-mini-powered feedback and contribute to their institution's score.
3. **National Leaderboard** — Real-time ranking of institutions by composite score (teacher AI adoption + student wins). The viral hook — institutions LOVE rankings.

## Why this wins

- **Aligned with NEP 2020** — India's National Education Policy mandates AI literacy. Government & institutional buyers are actively looking.
- **The only B2B + competitive layer** — Khanmigo, MagicSchool, Eduaide all target individual teachers. Lakshya targets institutions and creates inter-institution competition. No competitor has the leaderboard mechanic.
- **Pre-pilot with IIMT University** — Real institution committed to first deployment. Not theoretical.
- **Market**: 1.5M schools + 50K colleges in India. Capture 0.01% at ₹5L/year = ₹2.5cr ARR.

## Tech stack

- **Next.js 14** (App Router) + TypeScript + Tailwind + shadcn-style primitives
- **Supabase** — auth + Postgres + storage
- **OpenAI** — **GPT-4o** for generation (streaming lesson plans, quizzes, explainers), **GPT-4o-mini** for fast structured evaluation (student submission scoring with JSON mode)
- **Vercel** for deployment

## Built with OpenAI Codex

Lakshya AI was built solo by Yash in 3 days for the OpenAI × Outskill AI Builders Hackathon. The build process used OpenAI's frontier tools end-to-end:

- **OpenAI Codex / ChatGPT** assisted in scaffolding the Next.js 14 App Router structure, writing the streaming API routes (`/api/teacher/*`, `/api/student/evaluate`, `/api/learn/level-one`), and iterating on the Tailwind + shadcn UI primitives in `src/components/ui`.
- **Prompt engineering** for every Lakshya prompt in `src/lib/prompts.ts` was iterated against GPT-4o until outputs met production quality.
- **Inside the product**, every AI feature is powered by an OpenAI API call: GPT-4o for content generation with streaming, GPT-4o-mini for fast structured evaluation with JSON mode.

This is a project built ON OpenAI and BY OpenAI tools — exactly the workflow the hackathon was designed to showcase.

## Run locally

```powershell
cd "D:\ai edu"
npm install
# Add your keys to .env.local (copy from .env.local.example)
npm run dev
```

Open `http://localhost:3000`.

## Repo structure

```
src/
  app/                    # Next.js App Router
    page.tsx              # Landing page
    (auth)/login/         # Auth flows
    teacher/              # Teacher AI toolkit
    student/              # Student arena
    leaderboard/          # National leaderboard
    api/                  # API routes (AI calls)
  components/
    ui/                   # shadcn primitives
    landing/              # Landing sections
    teacher/              # Teacher tool components
    student/              # Student components
    leaderboard/          # Leaderboard components
  lib/
    openai.ts             # OpenAI API client
    supabase/             # Supabase client+server
    prompts.ts            # All AI prompts (versioned)
    types.ts              # Shared TypeScript types
docs/
  ARCHITECTURE.md         # System design
  SCHEMA.sql              # Database schema
  PROMPTS.md              # AI prompt library
  PITCH.md                # Pitch deck content
  TUTORIAL_SCRIPT.md      # Demo video script
```

## Built by

**Yash** — AI/ML, IIT Ropar — and **Waah Media** team.
Distribution via Kaushal Sir's network (141K followers + HNI connections).
First pilot: **IIMT University**.

---

**Hackathon goal:** Build, demo, win. Then convert to a real startup the week after.
er.
