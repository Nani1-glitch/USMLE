import { NextRequest } from "next/server";
import pdfParse from "pdf-parse";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const title = (form.get("title") as string) || "Untitled PDF";
    if (!file) return new Response(JSON.stringify({ error: "Missing file" }), { status: 400 });

    const ab = await file.arrayBuffer();
    const buf = Buffer.from(ab);
    const parsed = await pdfParse(buf);
    const content = parsed.text;
    
    if (!content || content.trim().length === 0) {
      return new Response(JSON.stringify({ error: "PDF appears to be empty or unreadable" }), { status: 400 });
    }

    // Call embed directly instead of fetch
    const { addData } = await import("@/lib/storage");
    const { chunkText } = await import("@/lib/chunk");
    const { openai, defaultEmbeddingModel } = await import("@/lib/openai");

    const doc = addData("documents", { userId: "single-user", title, source: "pdf", createdAt: new Date().toISOString() });
    const chunks = chunkText(content, 800);

    // Embed in batches
    const batchSize = 32;
    let index = 0;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const resp = await openai.embeddings.create({ model: defaultEmbeddingModel, input: batch });
      const vectors = resp.data.map((d) => d.embedding);
      const docs = batch.map((c, j) => ({
        documentId: doc.id,
        userId: "single-user",
        content: c,
        embedding: vectors[j],
        chunkIndex: index++,
        createdAt: new Date().toISOString(),
      }));
      docs.forEach(chunk => addData("chunks", chunk));
    }

    return new Response(JSON.stringify({ ok: true, documentId: doc.id, chunks: chunks.length }));
  } catch (e) {
    return new Response(JSON.stringify({ error: "PDF parse error" }), { status: 500 });
  }
}
