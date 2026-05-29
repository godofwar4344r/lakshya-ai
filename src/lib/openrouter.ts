export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const OPENROUTER_DEFAULT_MODEL =
  process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

export async function generateOpenRouterText(messages: ChatMessage[]) {
  if (!process.env.OPENROUTER_API_KEY) {
    return "OpenRouter is ready, but OPENROUTER_API_KEY is not configured yet. Add it in .env.local or Vercel env to enable live chat.";
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "Lakshya AI",
    },
    body: JSON.stringify({
      model: OPENROUTER_DEFAULT_MODEL,
      messages,
      temperature: 0.5,
      max_tokens: 900,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "OpenRouter request failed");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "No response generated.";
}
