import { NextRequest } from "next/server";
import { openai, MODELS } from "@/lib/openai";
import { CHALLENGE_FEEDBACK_PROMPT } from "@/lib/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { challengeTitle, challengeBrief, submission } = await req.json();
  if (!challengeTitle || !submission) return new Response("Missing fields", { status: 400 });

  const res = await openai.chat.completions.create({
    model: MODELS.fast,
    max_tokens: 800,
    temperature: 0.4,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: CHALLENGE_FEEDBACK_PROMPT.system },
      { role: "user", content: CHALLENGE_FEEDBACK_PROMPT.user({ challengeTitle, challengeBrief, submission }) },
    ],
  });

  const text = res.choices[0]?.message?.content ?? "{}";
  try {
    return Response.json(JSON.parse(text));
  } catch {
    return new Response("Invalid AI output", { status: 502 });
  }
}
