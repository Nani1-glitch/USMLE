import { NextRequest } from "next/server";
import { openai, defaultEmbeddingModel } from "@/lib/openai";
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

export async function POST(req: NextRequest) {
  try {
    const { query, userId = "single-user", k = 5 } = await req.json();
    if (!query) return new Response(JSON.stringify({ error: "Missing query" }), { status: 400 });

    const emb = await openai.embeddings.create({ model: defaultEmbeddingModel, input: [query] });
    const qvec = emb.data[0].embedding as number[];

    // Fetch chunks from JSON storage
    const all = readData("chunks").filter((c: any) => c.userId === userId).slice(0, 2000);
    const scored = all.map((c: any) => ({ ...c, score: cosine(qvec, c.embedding || []) }));
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, k).map((c: any) => ({ id: c.id, content: c.content, score: c.score }));

    return new Response(JSON.stringify({ results: top }));
  } catch (e) {
    return new Response(JSON.stringify({ error: "Search error" }), { status: 500 });
  }
}
