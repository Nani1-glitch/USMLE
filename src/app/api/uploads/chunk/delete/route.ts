import { NextRequest } from "next/server";
import { readData, writeData } from "@/lib/storage";

export const runtime = "nodejs";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { chunkId, title } = body;
    const userId = "single-user"; // Hardcoded for single-user app

    if (!chunkId || !title) {
      return new Response(JSON.stringify({ error: "Chunk ID and title are required" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    // Read current data
    const documents = readData("documents");
    const chunks = readData("chunks");

    // Find the document
    const document = documents.find((doc: any) => doc.userId === userId && doc.title === title);

    if (!document) {
      return new Response(JSON.stringify({ error: "Document not found" }), { 
        status: 404, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    // Find the chunk to delete
    const chunkToDelete = chunks.find((chunk: any) => chunk.id === chunkId && chunk.documentId === document.id);

    if (!chunkToDelete) {
      return new Response(JSON.stringify({ error: "Chunk not found" }), { 
        status: 404, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    // Remove the chunk
    const updatedChunks = chunks.filter((chunk: any) => chunk.id !== chunkId);

    // Write updated data
    writeData("chunks", updatedChunks);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Chunk deleted successfully",
      remainingChunks: updatedChunks.filter((chunk: any) => chunk.documentId === document.id).length
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error deleting chunk:", e);
    return new Response(JSON.stringify({ error: "Failed to delete chunk" }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
}
