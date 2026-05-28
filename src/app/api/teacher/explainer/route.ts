import { NextRequest } from "next/server";
import { openai, MODELS } from "@/lib/openai";
import { EXPLAINER_PROMPT } from "@/lib/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { concept, context } = await req.json();
  if (!concept) return new Response("Concept required", { status: 400 });

  const stream = await openai.chat.completions.create({
    model: MODELS.generation,
    max_tokens: 2000,
    temperature: 0.7,
    stream: true,
    messages: [
      { role: "system", content: EXPLAINER_PROMPT.system },
      { role: "user", content: EXPLAINER_PROMPT.user({ concept, context }) },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
