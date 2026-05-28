import { NextRequest } from "next/server";
import { openai, MODELS } from "@/lib/openai";
import { LESSON_PLAN_PROMPT } from "@/lib/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { subject, grade, topic, duration } = body as {
    subject: string; grade: string; topic: string; duration: string;
  };

  if (!subject || !grade || !topic) {
    return new Response("Missing required fields", { status: 400 });
  }

  const stream = await openai.chat.completions.create({
    model: MODELS.generation,
    max_tokens: 2500,
    temperature: 0.7,
    stream: true,
    messages: [
      { role: "system", content: LESSON_PLAN_PROMPT.system },
      { role: "user", content: LESSON_PLAN_PROMPT.user({ subject, grade, topic, duration }) },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content;
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
  });
}
