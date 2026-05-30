# Lakshya AI · Built with OpenAI Codex

> Documenting how OpenAI's Codex was used to build this Phase 1 MVP.
> Hackathon: OpenAI × Outskill AI Builders Hackathon, May 2026.
> Solo builder: Yash Sharma (Haldwani).

## Why this document exists

The hackathon judges Codex usage at **20 points out of 100** under the criterion:
> *"Did the builder meaningfully use Codex, not just mention it?"*

This document is the receipt. Every claim below can be independently verified.

---

## Verifiable evidence of Codex usage

### 1. Vercel deployment metadata shows `actor: codex`

The latest production deployment to `lakshya-ai-ten.vercel.app` carries the actor field `codex` in its Vercel build metadata. This is set automatically when the build is triggered through OpenAI's Codex CLI / agent. Verifiable via the Vercel dashboard:

```
Deployment ID:    dpl_5SffcrPWi6fEY9cqa9RG59KUBckM
Project:          lakshya-ai
Commit:           398e4f23d2c2686ed3bb51ae5ce4d142c114f078
Commit message:   feat: redesign chat workspace to match dark premium ChatGPT UI
Actor:            codex
GitHub repo:      github.com/godofwar4344r/lakshya-ai
GitHub branch:    main
State:            READY · target production
```

Earlier deployments in the project history also show `actor: codex` (e.g., `dpl_3a9mZ47ix8nFkt5ydBq9xtDTZogR`, `dpl_HjETUZXtTfoxbKqSXTvPnx7qBqyK`, `dpl_uDzfQUWAjVVneoxcoLV65kHmLyg1`), demonstrating sustained Codex usage across the build cycle, not a one-off claim.

### 2. Codex-built features

The following surfaces were built or substantially edited via Codex during the hackathon:

| Surface | Codex contribution |
|---|---|
| `src/app/page.tsx` — landing page | 3-level curriculum cards, hero section, "Built with Codex" badge wired in |
| `src/app/auth/page.tsx` — signup/login | Supabase email+password auth flow, profile auto-create on first signup |
| `src/app/workspace/page.tsx` — workspace | Dark premium ChatGPT-style UI, tab switching, quiz mechanic, points display |
| `src/app/api/chat/route.ts` — chat API | OpenRouter integration via `generateOpenRouterText` |
| `src/lib/openrouter.ts` — model adapter | Streaming chat completions against the OpenRouter universal API |
| `src/lib/curriculum.ts` — data layer | 3-level curriculum definition, quiz questions, role copy |
| `docs/SCHEMA.sql` — Supabase schema | Profiles, learning_progress, quiz_attempts, point_events, tool_usage tables with row-level security and the `refresh_profile_points()` trigger |

### 3. Codex inside the product (Level 3 curriculum)

Lakshya AI's Level 3 ("Builder Workflows") teaches students to USE Codex as a learning tool. See `src/lib/curriculum.ts` — Level 3 tools include:
- **Codex** — "Coding agent for building and improving real software projects."
- **Manus** — "Agentic task execution and multi-step research/build workflows."
- **Antigravity** — included alongside Codex as a builder-tier coding agent.

This means the product not only WAS built with Codex, it actively TEACHES learners to use Codex — a self-referential loop that judges can demo live.

---

## How to verify each claim above

1. **Vercel actor field** — Open the Vercel dashboard for project `lakshya-ai` (org `team_vjPXzQxVNE21f1ZrJNnnvy5u`) → Deployments → latest → check the build metadata.
2. **GitHub commit history** — `github.com/godofwar4344r/lakshya-ai/commits/main` shows commits attributed to the Codex agent.
3. **Live product** — Visit `lakshya-ai-ten.vercel.app` → scroll to "Level 3 · Builder Workflows" → see Codex listed as a tool the platform teaches.
4. **Code reading** — Search the repo for `OpenRouter` and `Codex` references in `src/lib/curriculum.ts` and `src/lib/openrouter.ts`.

---

## What Codex did vs. what the human did

- **Codex did:** Heavy lifting on UI scaffolding, the Supabase schema with triggers + RLS policies, the streaming chat API route, the multi-state workspace component, deployment pipeline to Vercel.
- **Yash (human) did:** Product strategy, the awareness-first 3-level curriculum design, the choice of OpenRouter over direct provider lock-in, the visual identity (Lakshya = "target" in Sanskrit), the brand positioning, all judgment calls about what to ship and what to cut.

This is the divide of labor the hackathon brief calls for: builder + Codex, not builder OR Codex.

---

## Reproducibility

The full source code is at: `github.com/godofwar4344r/lakshya-ai`
The live deployment is at: `lakshya-ai-ten.vercel.app`
Clone the repo, run `npm install && npm run dev`, and the entire build is reproducible end-to-end.

Built honestly. Built with Codex. Verified by Vercel.
