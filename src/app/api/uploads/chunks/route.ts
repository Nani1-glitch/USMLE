import { NextRequest } from "next/server";
import { readData } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body;
    const userId = "single-user"; // Hardcoded for single-user app

    if (!title) {
      return new Response(JSON.stringify({ error: "Title is required" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const documents = readData("documents");
    const chunks = readData("chunks");

    const document = documents.find((doc: any) => doc.userId === userId && doc.title === title);

    if (!document) {
      return new Response(JSON.stringify({ error: "Document not found" }), { 
        status: 404, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const documentChunks = chunks
      .filter((chunk: any) => chunk.documentId === document.id)
      .sort((a: any, b: any) => a.chunkIndex - b.chunkIndex)
      .map((chunk: any) => ({
        id: chunk.id,
        content: chunk.content,
        chunkIndex: chunk.chunkIndex,
        date: chunk.date
      }));

    return new Response(JSON.stringify({ 
      title: document.title,
      chunks: documentChunks,
      totalChunks: documentChunks.length
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error fetching document chunks:", e);
    return new Response(JSON.stringify({ error: "Failed to retrieve chunks" }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
}
