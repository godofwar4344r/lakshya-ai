# Lakshya AI · Phase 1 Pitch Deck (4 slides)

Outskill Phase 1 mandates exactly 4 slides covering Problem, Solution, Stack, ICP.
Drop this content directly into Google Slides, PowerPoint, or Canva. Each slide block below = one slide.

Visual identity:
- Primary blue `#2563EB` / accent emerald `#10B981` / dark `#0F172A`
- Font: Inter (body) + Space Grotesk (headlines) — both free
- Layout: lots of whitespace, bold headline, supporting bullets, one chart/screenshot per slide
- Logo: "L" in rounded square (matches your workspace)

---

## SLIDE 1 · PROBLEM

**Headline:** Indian institutions are being told to adopt AI. They have no way to do it.

**Sub-headline:** 1.5M schools. 50K colleges. NEP 2020 mandates AI literacy. 95% of teachers have never written a prompt.

**Body (3 bullets, big text):**

- **For teachers:** No structured way to learn prompting, no time to experiment, no permission framework from school leadership.
- **For students:** Learning AI from random YouTube videos. No competitive practice. No portfolio of real AI work.
- **For admin / school owners:** No way to measure whether AI adoption is actually happening, or whether their institution is falling behind peers.

**Speaker note (15 sec):** "Every Indian institution is being told AI is the future. Nobody has built the system that makes AI literacy actually happen — at the institution level, not at the individual teacher level. That's the gap."

**Visual:** Two stat blocks side-by-side: `1.5M schools` + `95% teachers AI-untrained`. Map of India tinted in light blue background.

---

## SLIDE 2 · SOLUTION & KEY FEATURES

**Headline:** Lakshya AI — One workspace for institutional AI adoption.

**Sub-headline:** Awareness first. Adoption next. Measurement always.

**Body — three columns:**

| 🎓 LEARN | ⚡ USE | 📊 MEASURE |
|---|---|---|
| Level 1 AI Awareness micro-course for every teacher + student | Teacher Toolkit: lesson plans, MCQ quizzes, "Explain like I'm 12" — all GPT-4o powered | Live institution dashboard: teacher activity, student wins, AI readiness score |
| Built-in certification with scoring | Student Arena: weekly AI challenges with instant feedback | National leaderboard split by school / college / university |
| Indian context, NEP 2020 aligned | Pre-built templates for CBSE subjects | Pilot partner: IIMT University + Delhi Public School |

**Key product proofs:**
- Single workspace with SSO-style role switching (teacher / student / admin)
- Live AI generation streaming, real GPT-4o evaluation of student submissions
- Production-grade UI shipped solo in 3 days

**Speaker note (45 sec):** "Three surfaces, one workspace. Teachers learn what AI can and can't do. Then use AI through purpose-built classroom tools. Students compete in weekly AI challenges and get instant GPT-4o evaluation. Admins see real-time adoption metrics and where their institution ranks. The whole thing lives behind one login."

**Visual:** Single screenshot of your `/workspace` page — dark sidebar + clean main panel. This is your money slide.

---

## SLIDE 3 · TOOLS & TECH STACK

**Headline:** Built on OpenAI. Shipped on the modern web stack.

**Body — group by layer:**

**AI layer (OpenAI)**
- **GPT-4o** — Content generation (lesson plans, quizzes, explainers, awareness courses)
- **GPT-4o-mini** — Fast structured evaluation of student submissions
- **JSON-mode structured outputs** — Reliable parseable feedback rubrics
- **Streaming API** — Real-time token rendering in teacher tools

**Application layer**
- **Next.js 14** (App Router, TypeScript, React Server Components)
- **Tailwind CSS + shadcn/ui** — Designer-grade UI
- **Lucide icons** + **Space Grotesk / Inter** typography

**Data layer**
- **Supabase** (Postgres + Auth + Row-Level Security)
- Composite scoring trigger updates institution rank on every submission

**Hosting**
- **Vercel** — Zero-config Next.js deployment with edge functions

**Why this stack:** Every choice optimizes for shipping speed + production-ready scaling. Same stack handles 10k concurrent users on day one.

**Speaker note (30 sec):** "Powered by OpenAI end-to-end. GPT-4o for generation, GPT-4o-mini for fast scoring, JSON mode for structured rubrics, streaming API for the real-time teacher experience. The app layer is Next.js 14 with Supabase for data and Vercel for hosting — production-ready from day one."

**Visual:** Logo grid of: OpenAI, Next.js, Supabase, Vercel, Tailwind. Plus a small architecture diagram showing the request flow.

---

## SLIDE 4 · ICP (Ideal Customer Profile)

**Headline:** Indian institutions ready to be measured as AI-fluent.

**Primary ICP (Year 1):**

**🏫 Tier-2 / Tier-3 private universities and colleges**
- 5,000–15,000 students
- Already pay for LMS and digital tools (₹50L–₹5cr annual edtech budgets)
- Need a differentiation story for admissions
- *Example buyer:* Vice Chancellor or Dean of Innovation
- *Example accounts:* IIMT University Meerut (pilot), Christ University, Manipal Jaipur

**🎓 CBSE/ICSE private schools with 1,000+ students**
- Already spend ₹10L–₹50L/year on edtech (Byjus, Toddle, Teachmint)
- Anxious about NEP 2020 AI mandate
- *Example buyer:* Principal or Director of Academics
- *Example accounts:* DPS chain, Mayo, Welham, Doon

**Secondary ICP (Year 2):**
- **State education boards** — looking for "AI literacy" tenders to satisfy NEP 2020 reporting
- **Corporate education partners** — TCS, Infosys, Wipro who want to brand sponsored AI Olympiads

**Why they buy now:**
1. NEP 2020 mandate is being audited — institutions need defensible reporting
2. AI literacy is becoming an admissions/placement differentiator
3. Cost is fractional vs. building internal capacity
4. Public leaderboard creates competitive FOMO between peer institutions

**Pricing wedge:** ₹2L/year per school, ₹5L–₹10L/year per college/university. Year 1 target: 50 institutions = ₹2.5cr ARR.

**Speaker note (40 sec):** "Our wedge is tier-2 and tier-3 universities and private schools. These institutions have edtech budgets, they're anxious about the NEP 2020 AI mandate, and they need a story for parents and admissions. They buy now because the leaderboard creates competitive pressure between peer institutions — once one DPS is on board, every DPS wants to be. IIMT University is already our pilot. Target: 50 institutions, ₹2.5cr ARR by end of year 1."

**Visual:** Three vertical persona cards — VC of University, School Principal, State Education Officer. Each with avatar, title, what they buy for, and budget range.

---

## Final-slide closer (optional, only if you have 5 slides)

If your version of Outskill Phase 1 allows a closer:

> **Lakshya AI is the operating system for institutional AI literacy in India.**
> Built by Yash, age 18, Haldwani.
> Pilot live with IIMT University. Powered by OpenAI. Shipping daily.

---

## How to build the actual deck (10 minutes)

1. Open **Google Slides** → new blank deck → set theme to "Simple Light" or import a clean template.
2. For each of the 4 slides above:
   - Headline at top in Space Grotesk Bold 40pt
   - Sub-headline 18pt regular
   - Body in Inter 16pt
   - Visual on right side (screenshot or icon grid)
3. Background: white. Accent color blocks in `#2563EB`.
4. Save as PDF for submission. Keep `.pptx` as backup.
5. Embed the screenshot of `/workspace` from your live demo on Slide 2.

If you want it faster, paste this whole markdown into **Gamma.app** or **Beautiful.ai** — both auto-format markdown into slides in 30 seconds.
