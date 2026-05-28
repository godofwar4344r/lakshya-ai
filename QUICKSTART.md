# Lakshya AI · Quickstart

You only need three things, in order. Total time: 8–12 minutes.

---

## 1. Install dependencies (one command, ~2 min)

```powershell
cd "D:\ai edu"
npm install
```

This pulls Next.js, Tailwind, Supabase, OpenAI SDK, all UI primitives. Auto-handles the rest.

---

## 2. Set up secrets (~3 min)

Copy `.env.local.example` to `.env.local`:

```powershell
copy .env.local.example .env.local
```

Edit `.env.local` and paste:

**A. OpenAI key** — go to https://platform.openai.com/api-keys → Create new secret key. Paste into `OPENAI_API_KEY`. This is the one key the demo needs.

**B. Supabase keys (optional for demo)** — go to https://supabase.com → New project → wait 2 min → Settings → API → copy `Project URL` + `anon public` key. Paste into the two `NEXT_PUBLIC_SUPABASE_*` vars. Then go to SQL Editor and paste in `docs/SCHEMA.sql` then `docs/SEED.sql`.

> For hackathon demo you can skip Supabase entirely — the UI uses static seed data. Auth is mocked via `/login` role pickers. Add Supabase only when ready to persist real users.

---

## 3. Run it (one command, instant)

```powershell
npm run dev
```

Open `http://localhost:3000`. You'll see the landing page. Walk through:

- `/` — landing + leaderboard preview (looks like a finished SaaS)
- `/login` — pick a role
- `/teacher` — toolkit home
- `/teacher/lesson-plan` — **the killer demo. Try Class 8 / Science / Photosynthesis / 40**
- `/teacher/quiz` — generates real MCQs
- `/teacher/explainer` — three-layer explanations
- `/student` — arena home
- `/student/photosynthesis-chain` — submit anything, see AI evaluation
- `/leaderboard` — the viral hook

---

## Deploy to Vercel (Saturday before submission)

```powershell
npm install -g vercel
vercel
```

When prompted:
- Set up & deploy → Y
- Link to existing → N
- Framework → Next.js (auto-detected)
- Build settings → keep defaults

After deploy, add `OPENAI_API_KEY` (and Supabase keys if used) in Vercel dashboard → Settings → Environment Variables, then redeploy.

---

## What's already done

- ✅ Full Next.js 14 codebase with App Router
- ✅ 3 teacher AI tools (lesson plan, quiz, explainer) — GPT-4o streaming where it matters
- ✅ Student arena with 4 challenges + AI evaluation
- ✅ National leaderboard with 15 institutions, IIMT highlighted
- ✅ Landing page polished for demo
- ✅ Supabase schema + seed data SQL
- ✅ Prompt library (all 4 prompts in `src/lib/prompts.ts`)
- ✅ Visual identity locked (saffron / deep indigo / emerald / gold)
- ✅ Pitch deck content (`docs/PITCH.md` — paste into Google Slides)
- ✅ Tutorial video script (`docs/TUTORIAL_SCRIPT.md`)
- ✅ Architecture doc (`docs/ARCHITECTURE.md`)

## What's left for Saturday

- Record tutorial video using `docs/TUTORIAL_SCRIPT.md`
- Convert `docs/PITCH.md` into actual PPTX slides
- Deploy to Vercel with custom domain
- Rehearse 90-second pitch twice
- Submit
