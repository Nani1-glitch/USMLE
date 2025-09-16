import { NextRequest } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 4000,
    });

    return new Response(JSON.stringify(completion));
  } catch (error: any) {
    console.error("OpenAI chat error:", error);
    return new Response(JSON.stringify({ 
      error: "OpenAI API error",
      details: error.message 
    }), { status: 500 });
  }
}
