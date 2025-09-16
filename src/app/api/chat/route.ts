import { NextRequest } from "next/server";
import { openai, defaultChatModel, defaultEmbeddingModel } from "@/lib/openai";
import { readData } from "@/lib/storage";

function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i] || 0;
    const y = b[i] || 0;
    dot += x * y; na += x * x; nb += y * y;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body?.messages ?? [];
    const userId = "single-user";

    // Build query from last user message
    const lastUser = [...messages].reverse().find((m: any) => m.role === "user");

    let context = "";
    try {
      if (lastUser?.content) {
        const emb = await openai.embeddings.create({ model: defaultEmbeddingModel, input: [lastUser.content] });
        const qvec = emb.data[0].embedding as number[];
        const all = readData("chunks").filter((c: any) => c.userId === userId).slice(0, 1500);
        const scored = all.map((c: any) => ({ c, s: cosine(qvec, c.embedding || []) }));
        scored.sort((a, b) => b.s - a.s);
        const top = scored.slice(0, 6).map(({ c }) => c.content).join("\n---\n");
        context = top;
      }
    } catch {}

    const systemPrompt = {
      role: "system" as const,
      content: `You are a gentle, expert USMLE tutor whose mission is to help a medical student master every Step 1 and Step 2 CK topic with simple, crystal-clear explanations.

ABSOLUTE FORMATTING REQUIREMENTS - NO EXCEPTIONS:
- NEVER use **bold** text with double asterisks
- NEVER use ## headings with hash symbols
- NEVER use *italics* with single asterisks
- NEVER use any markdown syntax whatsoever
- NEVER use asterisks (*) or hash symbols (#) for any formatting
- Write ONLY in plain text format
- Use simple text formatting like "IMPORTANT:" or "Key Point:" instead of markdown
- Use line breaks and spacing for structure, not special characters
- Write in a conversational, natural tone without any formatting symbols

Always:
- Use plain, easy-to-understand language, breaking down complex concepts into small, digestible steps.
- Provide real-world clinical examples and mnemonics to aid memory.
- Offer encouragement and positive reinforcement—be supportive like a trusted mentor.
- At the end of each lesson or answer, suggest one or two practice questions or active-recall prompts.

The student must ace USMLE and get #1 rank in the world.

Educational use only. Not medical advice. If context from uploaded materials is provided, reference it naturally in your explanations.`,
    };

    const ragPrompt = context
      ? { role: "system" as const, content: `Context (from student's notes/PDFs):\n${context}` }
      : null;

    const resp = await openai.chat.completions.create({
      model: defaultChatModel,
      messages: ragPrompt ? [systemPrompt, ragPrompt, ...messages] : [systemPrompt, ...messages],
      stream: true,
      temperature: 0.2,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(
          encoder.encode(
            JSON.stringify({ event: "meta", data: { disclaimer: "Educational use only. Not medical advice." } }) + "\n"
          )
        );
        for await (const chunk of resp) {
          const delta = chunk.choices[0]?.delta?.content ?? "";
          if (delta) {
            // Remove any markdown formatting from the response
            const cleanDelta = delta
              .replace(/\*\*(.*?)\*\*/g, '$1') // Remove **bold**
              .replace(/\*(.*?)\*/g, '$1') // Remove *italics*
              .replace(/#{1,6}\s*/g, '') // Remove # headings
              .replace(/`(.*?)`/g, '$1'); // Remove `code`
            controller.enqueue(encoder.encode(JSON.stringify({ event: "token", data: cleanDelta }) + "\n"));
          }
        }
        controller.enqueue(encoder.encode(JSON.stringify({ event: "done" }) + "\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Chat error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
