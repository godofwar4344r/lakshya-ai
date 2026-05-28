# Lakshya AI — Product Brief

**Tagline:** Awareness first. Adoption next. Measurement always.
**Category:** B2B SaaS · AI in Education
**Stage:** MVP shipped · Pilot signed with IIMT University
**Built by:** Yash (solo, 18, Haldwani · ex-IIT Ropar AI/ML)
**Stack:** OpenAI GPT-4o · Next.js 14 · Supabase · Vercel

---

## The problem

India has 1.5 million schools and 50,000 colleges. NEP 2020 mandates AI literacy across K-12 and higher education. The reality on the ground:

- **95% of teachers have never written an AI prompt.** They know AI matters. They have no time to experiment and no institutional framework to start.
- **Students learn AI from random YouTube videos.** No structured practice. No portfolio. No competitive challenge.
- **Admins are flying blind.** No way to measure whether AI adoption is actually happening, no benchmark against peer institutions.

Every other AI-education tool — Khanmigo, MagicSchool, Eduaide — sells to individual teachers. Nobody is selling the institutional adoption + measurement layer that NEP 2020 actually requires.

## The solution

**Lakshya AI is one workspace for institutional AI adoption.** Built around three motions, accessed through a single role-switching login.

**🎓 LEARN — AI Awareness Course**
Level 1 micro-course built into every login. Three modules + scored certification quiz. Generated and refreshed by GPT-4o so content stays current. Required for every teacher and student before tool access unlocks.

**⚡ USE — Teacher Toolkit + Student Arena**
*Teachers:* Lesson plan generator (5E pedagogy, NEP 2020 aligned), MCQ quiz generator (Bloom's taxonomy aware, JSON-structured), "Explain like I'm 12" concept tool (three explanation layers). All streaming GPT-4o.
*Students:* Live AI challenges (prompt engineering, AI ethics, AI-solve, AI-build). Submit text or files. Instant GPT-4o-mini evaluation with score + strengths + improvements + bonus tip. Every win moves the institution up the national leaderboard.

**📊 MEASURE — Live institutional dashboards + national leaderboard**
Admin dashboard shows real-time adoption metrics: teachers active, students participating, AI readiness score, week-over-week change. National leaderboard splits institutions by Schools / Colleges / Universities so rankings stay fair. Composite score updates on every scored submission.

## Why it works

- **Pulls institutional buyers, not individual users.** Admins fund Lakshya because measurement and rankings are budget-line items they already pay for.
- **Pre-pilot signed with IIMT University.** 38 teachers, 487 students ready to deploy week 2.
- **Distribution unlock via Kaushal Sir's 141K-follower network** + Waah Media's existing university client base.
- **Network effects baked in.** Every institution that joins makes peer institutions want to fight back — rankings are public.

## Tech stack (full Phase 1 build)

**AI layer (OpenAI)**
GPT-4o for content generation (streaming) · GPT-4o-mini for fast structured evaluation · JSON mode for parseable rubrics · Built using ChatGPT / OpenAI Codex assistance throughout the build process.

**Application layer**
Next.js 14 App Router · React Server Components · TypeScript · Tailwind CSS · shadcn-style primitives · Lucide icons · Space Grotesk + Inter typography.

**Data layer**
Supabase Postgres + Auth + Row-Level Security. Composite scoring trigger updates institution rank on every scored submission.

**Hosting**
Vercel — zero-config Next.js deployment.

## Phase 1 MVP — what's shipped

| Surface | Status | Tech |
|---|---|---|
| Landing page (Learn → Use → Measure narrative) | ✅ Live | Next.js + Tailwind |
| Role-switching workspace (Teacher / Student / Admin) | ✅ Live | Single workspace page, mock SSO portal |
| AI Awareness micro-course | ✅ Live | GPT-4o regenerable · scored certification |
| Lesson Plan Generator | ✅ Live | GPT-4o streaming |
| MCQ Quiz Generator | ✅ Live | GPT-4o JSON mode + Bloom tagging |
| Concept Explainer | ✅ Live | GPT-4o streaming |
| Student Challenges (3 active) | ✅ Live | GPT-4o-mini evaluation, JSON rubric |
| National Leaderboard (split by category) | ✅ Live | Live Postgres view |
| Class 10 Physics demo templates | ✅ Live | Pre-cached for bulletproof demo |

## Business model

| Stream | Pricing | Year 1 target |
|---|---|---|
| Institution SaaS (schools) | ₹2L/year | 30 schools = ₹60L |
| Institution SaaS (colleges/universities) | ₹5L–₹10L/year | 20 institutions = ₹1cr–₹2cr |
| Student Premium | ₹999–₹2,999/year | 5,000 students = ₹50L |
| Corporate-sponsored AI Olympiad | ₹10L–₹50L/quarter | 4 deals = ₹1cr |
| Govt / NEP tenders | ₹5L–₹50L per state board pilot | 2 pilots = ₹50L |

**Year 1: ₹3–4cr ARR achievable. Year 3: ₹50cr+ ARR with state-board contracts.**

## ICP

**Primary:** Tier-2/Tier-3 private universities (5K–15K students) + CBSE/ICSE private schools with 1,000+ students. Already pay for LMS / digital tools. Buyer = Vice Chancellor / Dean / Principal.

**Secondary:** State education boards (NEP 2020 compliance) and corporate education partners (TCS / Infosys / Wipro) sponsoring branded AI Olympiads.

## Roadmap (post-hackathon)

- **Week 2:** Deploy at IIMT University with 20 teachers + 200 students.
- **Week 4:** Razorpay payments, full admin dashboard, billing.
- **Month 2:** Real-time leaderboard (Supabase Realtime), email digests, mobile-responsive polish.
- **Month 3:** Expo mobile app, Hindi/regional language support.
- **Month 6:** Corporate Olympiads, NEP-mapped CBSE/ICSE curriculum library.
- **Month 12:** State-board contracts. Path to ₹10cr ARR.

## Team & distribution

**Yash** — solo founder, 18, AI/ML from IIT Ropar, teaches AI at universities and schools via Waah Media. Currently building Lakshya AI in public.

**Distribution partners (built-in advantage):**
- **Kaushal Sir** — 141K Instagram followers + HNI / institutional connections.
- **Waah Media** — existing university and school client base (incl. IIMT University).
- **Ajay** — celebrity and political network for corporate sponsorship deals.

This isn't a hackathon project that ends Friday. It's a real company starting Monday.
