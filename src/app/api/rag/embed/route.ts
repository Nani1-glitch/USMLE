import { NextRequest } from "next/server";
import { openai, defaultEmbeddingModel } from "@/lib/openai";
import { chunkText } from "@/lib/chunk";
import { addData } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const { title, content, userId = "single-user" } = await req.json();
    if (!content || !title) return new Response(JSON.stringify({ error: "Missing content/title" }), { status: 400 });

    const doc = addData("documents", { userId, title, source: "manual", createdAt: new Date().toISOString() });
    const chunks = chunkText(content, 800);

    // Embed in batches
    const batchSize = 32;
    let index = 0;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const resp = await openai.embeddings.create({ model: defaultEmbeddingModel, input: batch });
      const vectors = resp.data.map((d) => d.embedding);
      const chunkDocs = batch.map((c, j) => ({
        documentId: doc.id,
        userId,
        content: c,
        embedding: vectors[j],
        chunkIndex: index++,
        createdAt: new Date().toISOString(),
      }));
      chunkDocs.forEach(chunk => addData("chunks", chunk));
    }

    return new Response(JSON.stringify({ ok: true, documentId: doc.id, chunks: chunks.length }));
  } catch (e) {
    return new Response(JSON.stringify({ error: "Embed error" }), { status: 500 });
  }
}
