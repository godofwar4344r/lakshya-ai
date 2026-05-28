import { openai, MODELS } from "@/lib/openai";

export const runtime = "nodejs";
export const maxDuration = 30;

const fallback = {
  title: "Level 1: AI Awareness for Education",
  modules: [
    {
      title: "What AI can and cannot do",
      lesson: "AI can help draft, explain, summarize, quiz, translate, and give feedback, but every output needs human review.",
      activity: "Write one classroom task where AI helps and one task where teacher judgment matters.",
    },
    {
      title: "Prompting for teachers",
      lesson: "A useful prompt includes role, goal, student level, classroom context, constraints, and the output format.",
      activity: "Rewrite a weak prompt into a classroom-ready prompt.",
    },
    {
      title: "Responsible student use",
      lesson: "Students should use AI to learn, practice, and reflect, not to copy answers without understanding.",
      activity: "Create one AI use rule for your class.",
    },
  ],
  questions: [
    {
      question: "What should come before AI adoption?",
      options: ["Awareness and safety basics", "Buying many tools", "Ignoring teacher training", "Only rankings"],
      answer: 0,
      why: "People use AI better when they first understand what it can and cannot do.",
    },
  ],
};

export async function POST() {
  if (!process.env.OPENAI_API_KEY) return Response.json(fallback);

  const res = await openai.chat.completions.create({
    model: MODELS.fast,
    temperature: 0.5,
    max_tokens: 1800,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Generate a Level 1 AI awareness micro-course for Indian school/college teachers and students. Return strict JSON only.",
      },
      {
        role: "user",
        content: `Return this exact shape:
{
  "title": "string",
  "modules": [
    { "title": "string", "lesson": "80-120 words", "activity": "string" }
  ],
  "questions": [
    { "question": "string", "options": ["A","B","C","D"], "answer": 0, "why": "string" }
  ]
}
Need exactly 3 modules and exactly 3 questions. Focus on awareness before usage, safe prompting, and measuring AI adoption in education.`,
      },
    ],
  });

  const text = res.choices[0]?.message?.content ?? "";
  try {
    return Response.json(JSON.parse(text));
  } catch {
    return Response.json(fallback);
  }
}
