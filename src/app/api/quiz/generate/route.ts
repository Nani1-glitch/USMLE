import { NextRequest } from "next/server";
import { openai, defaultChatModel } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty = 2 } = await req.json();
    if (!topic) return new Response(JSON.stringify({ error: "Missing topic" }), { status: 400 });

    const prompt = `Generate a USMLE Step 1/2 CK multiple choice question about "${topic}" with difficulty ${difficulty}/5.

Format as JSON:
{
  "stem": "Question stem",
  "choices": ["A", "B", "C", "D"],
  "answerIndex": 0,
  "explanation": "Detailed explanation with clinical reasoning",
  "tags": ["topic1", "topic2"]
}

Make it realistic, clinically relevant, and educational.`;

    const resp = await openai.chat.completions.create({
      model: defaultChatModel,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = resp.choices[0]?.message?.content || "";
    const question = JSON.parse(content);
    
    return new Response(JSON.stringify(question));
  } catch (e) {
    return new Response(JSON.stringify({ error: "Generate error" }), { status: 500 });
  }
}
