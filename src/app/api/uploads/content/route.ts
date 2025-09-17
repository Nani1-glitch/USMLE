import { NextRequest } from "next/server";
import { readData } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body;
    
    if (!title) {
      return new Response(JSON.stringify({ error: "Title is required" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const userId = "single-user";
    
    // Get all documents for this user
    const documents = readData("documents").filter((doc: any) => doc.userId === userId);
    
    // Find the document with matching title
    const document = documents.find((doc: any) => doc.title === title);
    
    if (!document) {
      return new Response(JSON.stringify({ error: "Document not found" }), { 
        status: 404, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    // Get all chunks for this document
    const chunks = readData("chunks").filter((chunk: any) => 
      chunk.userId === userId && chunk.documentId === document.id
    );

    // Sort chunks by order and combine content
    chunks.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    const fullContent = chunks.map((chunk: any) => chunk.content).join("\n\n");

    return new Response(JSON.stringify({ 
      title: document.title,
      content: fullContent,
      chunks: chunks.length,
      date: document.date
    }), { 
      headers: { "Content-Type": "application/json" } 
    });

  } catch (error) {
    console.error("Error retrieving content:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve content" }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
}
