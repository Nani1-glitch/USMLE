import { NextRequest } from "next/server";
import { readData } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const documents = readData("documents").filter((d: any) => d.userId === "single-user");
    
    const uploads = documents.map((doc: any) => ({
      title: doc.title,
      source: "text",
      chunks: doc.chunks || 1,
      date: doc.createdAt || new Date().toISOString()
    }));

    return new Response(JSON.stringify({ uploads }));
  } catch (e) {
    console.error("List uploads error:", e);
    return new Response(JSON.stringify({ error: "Failed to load uploads" }), { status: 500 });
  }
}
