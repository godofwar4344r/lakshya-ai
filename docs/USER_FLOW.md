# Lakshya AI · User Flow / Product Journey

Single-screen narrative for the Phase 2 checkpoint. The diagram is also rendered visually as `lakshya_ai_user_flow_diagram.svg` (see chat preview).

---

## Stage 01 — Entry · Institution SSO

User lands on `/login` and is welcomed by a mock SSO authentication overlay branded as **Delhi Public School** (the demo institution). After a 1.8-second authenticating sequence, the user enters `/workspace` and picks one of three roles:

- **Teacher** (Yash Sharma, DPS)
- **Student** (Arjun Singh, DPS)
- **Admin** (Jaiss, DPS School Admin)

The role switcher in the sidebar lets the user hop personas live during a demo — judges can see the entire product in 30 seconds without re-routing.

## Stage 02 — Learn · AI Awareness Course

Every user starts with **Level 1: AI Awareness for Education**:

- 3 modules covering what AI can/can't do, safe prompting, and daily-learning use
- A 3-question scored certification quiz
- Content is regenerable on demand via `POST /api/learn/level-one` which calls **GPT-4o** in JSON mode and returns a fresh course payload

Passing the certification unlocks platform score points (+25 base, +25 per correct answer) that contribute to the institution's leaderboard rank.

## Stage 03 — Use · Two parallel tracks

### 03A · Teacher Toolkit

Teacher selects one of three GPT-4o-powered tools:

| Tool | Model | API | What it does |
|---|---|---|---|
| Lesson Plan Generator | GPT-4o | streaming | NEP 2020 aligned, 5E pedagogy, Indian context, AI extension built in |
| MCQ Quiz Generator | GPT-4o | JSON mode | Bloom's taxonomy tagged, mixed difficulty, with explanations |
| "Explain like I'm 12" | GPT-4o | streaming | Three explanation layers (kid, student, advanced) + Indian analogy |

Each tool ships pre-cached Class 10 Physics templates so the demo path is bulletproof if API latency spikes.

### 03B · Student Arena

Student picks a live challenge:
- Build a 5-prompt chain teaching photosynthesis to a 7-year-old (Beginner · 100 XP)
- Write a 300-word AI ethics policy for your school (Intermediate · 150 XP)
- Solve a real Indian problem with one AI prompt (Intermediate · 200 XP)

Student submits text. The submission is evaluated by **GPT-4o-mini** in JSON mode via `POST /api/student/evaluate`, returning:

```json
{
  "score": 0-100,
  "strengths": ["..."],
  "improvements": ["..."],
  "verdict": "one-sentence summary",
  "bonus_tip": "one specific actionable improvement"
}
```

Submissions scored ≥70 add the challenge's XP to both the student's profile and the institution's composite score.

## Stage 04 — Measure · Leaderboard + dashboard

Every teacher tool use and every scored student submission triggers an institution score bump via a Postgres trigger (`bump_institution_score`). This drives two outputs:

1. **Institution dashboard** (admin view) — live metrics: teachers active (38), students participating (487), AI readiness score (78/100), weekly delta
2. **National leaderboard** at `/leaderboard` — three separate tracks for fair comparison:
   - **Schools** — Delhi Public School R.K. Puram leads at 9,840
   - **Colleges** — La Martiniere College leads at 8,740
   - **Universities** — **IIMT University** (pilot partner) leads at 9,485 with +8 this week

## The closed loop

Awareness → unlocks tool access → Teachers + Students produce real outputs → AI scores them → Institution moves up the leaderboard → Admin sees adoption climbing → Buys for more departments.

This is the loop that turns a hackathon demo into a real B2B contract.
