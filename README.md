# Lakshya AI

AI awareness and adoption platform for education.

Lakshya AI helps teachers and students learn AI safely, earn readiness points, and unlock useful AI tools level by level.

Live app: https://lakshya-ai-ten.vercel.app

## Built With Codex

This project was designed, refactored, and shipped with OpenAI Codex as the primary builder.

Codex handled the product cleanup, Next.js implementation, Supabase schema design, auth wiring, OpenRouter-ready chat API, UI redesign, deployment fixes, GitHub publishing, and Vercel deployment workflow.

## Product Flow

1. Public website explains the product before signup.
2. User signs up or logs in with Supabase Auth.
3. User chooses a teacher or student path.
4. User learns Level 1 AI basics.
5. User takes a weekly quiz and earns points.
6. Points unlock higher level tools.
7. Leaderboard and videos are marked coming soon until real users join.

## Learning Levels

### Level 1: AI Basics

Topics:

- What AI is
- How to use AI safely
- Good vs bad AI use
- Basic prompting
- AI in education

Tools:

- ChatGPT
- Gemini

### Level 2: Research and Reasoning

Tools:

- Claude
- Perplexity
- Grok

### Level 3: Builder Workflows

Tools:

- Manus
- Codex
- Flow
- Antigravity

## Features

- Public landing page
- Supabase signup and login
- Teacher/student role selection
- Level-based learning workspace
- Weekly quiz attempt model
- Points and unlock criteria
- OpenRouter-ready AI chat endpoint
- Tool usage logging in Supabase
- Quiz attempt and point event storage
- Coming soon leaderboard page

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth and Postgres
- OpenRouter chat completions API
- Vercel deployment
- OpenAI Codex for build workflow

## Environment Variables

Copy `.env.local.example` to `.env.local`.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Supabase Setup

The schema is in `docs/SCHEMA.sql`.

It includes:

- `profiles`
- `learning_progress`
- `quiz_attempts`
- `point_events`
- `tool_usage`
- Row Level Security policies
- Point-to-level update trigger

## Deployment

The app is deployed on Vercel. Add these env vars in Vercel before production use:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`
- `NEXT_PUBLIC_APP_URL`

## Current Scope

This is web app only for now.

Coming later:

- Videos
- Institution leaderboards
- Windows/Mac app
- Android app
