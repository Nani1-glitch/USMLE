import { NextRequest } from "next/server";
import { readData } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const questions = readData("questions").filter((q: any) => q.userId === "single-user");
    return new Response(JSON.stringify({ count: questions.length }));
  } catch (e) {
    return new Response(JSON.stringify({ error: "Count error" }), { status: 500 });
  }
}
