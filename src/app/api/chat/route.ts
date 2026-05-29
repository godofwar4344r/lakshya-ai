import { generateOpenRouterText } from "@/lib/openrouter";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { message, role, level } = await req.json();

  if (!message || typeof message !== "string") {
    return new Response("Message is required", { status: 400 });
  }

  try {
    const content = await generateOpenRouterText([
      {
        role: "system",
        content: `You are Lakshya AI, an education AI awareness coach. The user is a ${role || "learner"} at level ${level || 1}. Give practical, safe, concise guidance. Focus on AI basics, safe use, prompting, and education workflows.`,
      },
      { role: "user", content: message },
    ]);

    return Response.json({ content });
  } catch (error) {
    return Response.json(
      { content: error instanceof Error ? error.message : "AI request failed." },
      { status: 500 }
    );
  }
}
