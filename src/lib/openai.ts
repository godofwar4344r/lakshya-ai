import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.warn("[lakshya] OPENAI_API_KEY missing — AI features will fail.");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

export const MODELS = {
  // GPT-4o for content generation (lesson plans, quizzes, explainers)
  generation: "gpt-4o",
  // GPT-4o-mini for fast scoring/quick feedback
  fast: "gpt-4o-mini",
};

export async function generateText(opts: {
  system: string;
  user: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}) {
  const res = await openai.chat.completions.create({
    model: opts.model ?? MODELS.generation,
    max_tokens: opts.maxTokens ?? 2048,
    temperature: opts.temperature ?? 0.7,
    messages: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.user },
    ],
  });
  return res.choices[0]?.message?.content ?? "";
}
