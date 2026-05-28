# Lakshya AI · Architecture

## One-line system summary

A Next.js 14 SaaS that serves four role-specific UIs (learn, teacher, student, institution admin) inside one unified `/workspace`, backed by Supabase for data + auth, with all AI features powered by **OpenAI GPT-4o** and **GPT-4o-mini** through streamed API routes and JSON-mode structured outputs.

## High-level diagram

```
┌────────────────────────────────────────────────────────┐
│                    Next.js 14 App Router                │
│  /                    landing                            │
│  /login               role-switch portal                 │
│  /workspace           unified workspace (4 roles)        │
│    ?role=learn        AI Awareness micro-course          │
│    ?role=teacher      Teacher Toolkit                    │
│    ?role=student      Student Arena                      │
│    ?role=admin        Institution dashboard              │
│  /leaderboard         national ranking (3 tracks)        │
│  /api/teacher/*       streaming GPT-4o (lesson, quiz,    │
│                          explainer)                      │
│  /api/student/evaluate JSON-mode GPT-4o-mini scoring     │
│  /api/learn/level-one  JSON-mode GPT-4o-mini course      │
└─────────────┬───────────────────────────┬──────────────┘
              │                           │
        ┌─────▼──────┐              ┌─────▼─────────┐
        │  Supabase  │              │  OpenAI       │
        │  Postgres  │              │  GPT-4o       │
        │  Auth      │              │  GPT-4o-mini  │
        │  Storage   │              │  Streaming    │
        │  RLS       │              │  JSON mode    │
        └────────────┘              └───────────────┘
```

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 App Router | RSC + streaming + edge-ready |
| Language | TypeScript | Catch errors before demo day |
| Styling | Tailwind + shadcn-style primitives | Designer-grade UI in hours |
| Auth + DB | Supabase | Postgres + RLS + auth in 5 min |
| AI | **OpenAI GPT-4o + GPT-4o-mini** | GPT-4o for quality content generation, GPT-4o-mini for fast structured evaluation |
| Deploy | Vercel | Zero-config Next.js hosting |

## Data model

Tables (see `docs/SCHEMA.sql`):
- `institutions` — every participating school/college/university
- `profiles` — extends `auth.users`, includes role + institution_id
- `challenges` — active competitions
- `submissions` — student attempts + scores + AI feedback
- `ai_tool_uses` — log of teacher AI tool usage (for the institution score)

Composite institution score = `sum(submissions.score)` + `count(ai_tool_uses) * 5`. Trigger `bump_institution_score()` updates this on every scored submission.

## Why two OpenAI models, not one

- **GPT-4o** — Used for content generation (lesson plans, quizzes, explainers, awareness course modules). Worth the quality premium because output is the actual deliverable to the teacher.
- **GPT-4o-mini** — Used for student submission evaluation and quick course content generation. Fast feedback (~2 seconds) matters more than nuance; rubric is constrained and JSON-structured.

## Prompt engineering

All prompts live in one file: `src/lib/prompts.ts`. Each prompt is:
- Versionable (swap models or rewrites without touching components)
- Indian-context aware (NEP 2020 references, rupee examples, Indian regulations)
- Output-structured (markdown sections for human-readable, strict JSON for machine-parseable)

## Streaming strategy

Long-form outputs (lesson plans, explanations) stream token-by-token from `openai.chat.completions.create({ stream: true })` through Next.js Response streams. The user sees the AI think in real time — a UX win that judges remember.

JSON outputs (quiz, evaluation, Level 1 course) use `response_format: { type: "json_object" }` blocking calls because partial JSON isn't useful.

## Security

- **Row Level Security** on every table — users only insert/update their own data.
- **Server-side OpenAI calls only** — `OPENAI_API_KEY` never reaches the client.
- **Service role key** isolated to a single server module, never imported into client code.

## Built with OpenAI

Lakshya AI was built solo by Yash in 3 days for the OpenAI × Outskill AI Builders Hackathon. The build process used OpenAI's frontier tooling end-to-end:
- ChatGPT / Codex for code scaffolding and prompt iteration
- GPT-4o for in-product content generation
- GPT-4o-mini for fast structured evaluation
- JSON mode for parseable rubrics

A project built ON OpenAI and BY OpenAI tools.

## Production roadmap (post-hackathon)

| Phase | Build |
|---|---|
| Week 2 | Deploy to IIMT University with 20 teachers, 200 students |
| Week 4 | Payments (Razorpay), institution admin dashboard, billing |
| Month 2 | Real-time leaderboard updates (Supabase Realtime), email digests |
| Month 3 | Mobile app (Expo + same Supabase backend) |
| Month 6 | Hindi/regional language support, NEP-mapped curriculum library |
| Month 12 | Corporate partner challenges (TCS/Infosys/Wipro brand quarterly Olympiads) |

## Scaling envelope

Current architecture handles:
- 10,000 concurrent users on Vercel + Supabase free tier
- 100k AI generations/month on OpenAI API (~$500 cost at current pricing)
- Horizontal scale by adding Supabase read replicas + Vercel edge regions

Inflection point at 100k DAU: move from Supabase to AWS RDS + dedicated cache layer (Redis), keep everything else.
