import { NextRequest } from "next/server";
import { openai, MODELS } from "@/lib/openai";
import { QUIZ_PROMPT } from "@/lib/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { subject, grade, topic, count } = await req.json();
  if (!subject || !grade || !topic) return new Response("Missing fields", { status: 400 });

  const res = await openai.chat.completions.create({
    model: MODELS.generation,
    max_tokens: 3000,
    temperature: 0.7,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: QUIZ_PROMPT.system },
      { role: "user", content: QUIZ_PROMPT.user({ subject, grade, topic, count: count ?? 10 }) },
    ],
  });

  const text = res.choices[0]?.message?.content ?? "{}";
  try {
    return Response.json(JSON.parse(text));
  } catch {
    return new Response("Invalid AI output", { status: 502 });
  }
}
