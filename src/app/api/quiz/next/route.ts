import { NextRequest } from "next/server";
import { readData, findData } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const now = new Date().toISOString();
    const url = new URL(req.url);
    const excludeId = url.searchParams.get("exclude");
    
    // Prefer due reviews, else new questions
    const reviews = readData("reviews").filter((r: any) => 
      r.userId === "single-user" && (!r.dueAt || r.dueAt <= now) && r.questionId !== excludeId
    ).sort((a: any, b: any) => new Date(a.dueAt || 0).getTime() - new Date(b.dueAt || 0).getTime());
    
    let q;
    if (reviews.length) {
      q = findData("questions", reviews[0].questionId);
    } else {
      const questions = readData("questions").filter((q: any) => 
        q.userId === "single-user" && q.id !== excludeId
      ).sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      q = questions[0];
    }
    
    if (!q) return new Response(JSON.stringify({ done: true }));
    return new Response(JSON.stringify({
      id: q.id,
      stem: q.stem,
      choices: q.choices,
      answerIndex: q.answerIndex,
      explanation: q.explanation,
      difficulty: q.difficulty,
    }));
  } catch (e) {
    return new Response(JSON.stringify({ error: "Next error" }), { status: 500 });
  }
}
