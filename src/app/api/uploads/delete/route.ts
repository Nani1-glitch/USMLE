import { NextRequest } from "next/server";
import { readData, writeData } from "@/lib/storage";

export const runtime = "nodejs";

export async function DELETE(req: NextRequest) {
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

    // Read current data
    const documents = readData("documents");
    const chunks = readData("chunks");

    // Find the document to delete
    const documentIndex = documents.findIndex((doc: any) => doc.userId === userId && doc.title === title);

    if (documentIndex === -1) {
      return new Response(JSON.stringify({ error: "Document not found" }), { 
        status: 404, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const document = documents[documentIndex];

    // Remove all chunks associated with this document
    const updatedChunks = chunks.filter((chunk: any) => chunk.documentId !== document.id);

    // Remove the document
    const updatedDocuments = documents.filter((doc: any) => doc.id !== document.id);

    // Write updated data
    writeData("documents", updatedDocuments);
    writeData("chunks", updatedChunks);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Repository deleted successfully",
      deletedChunks: chunks.length - updatedChunks.length
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error deleting document:", e);
    return new Response(JSON.stringify({ error: "Failed to delete repository" }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
}
