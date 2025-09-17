import { NextRequest } from "next/server";
import { addData } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const { questions } = await req.json();
    if (!Array.isArray(questions) || questions.length === 0) {
      return new Response(JSON.stringify({ error: "No questions" }), { status: 400 });
    }
    
    const docs = questions.map((q: any) => ({
      userId: "single-user",
      stem: q.stem,
      choices: q.choices,
      answerIndex: q.answerIndex,
      explanation: q.explanation,
      tags: q.tags || [],
      difficulty: q.difficulty || 2,
      createdAt: new Date().toISOString(),
    }));
    
    const addedQuestions = docs.map(q => addData("questions", q));
    
    // Initialize review entries
    addedQuestions.forEach(q => {
      addData("reviews", { 
        userId: "single-user", 
        questionId: q.id, 
        ease: 2.5, 
        intervalDays: 0,
        updatedAt: new Date().toISOString()
      });
    });
    
    return new Response(JSON.stringify({ ok: true, count: docs.length }));
  } catch (e) {
    return new Response(JSON.stringify({ error: "Import error" }), { status: 500 });
  }
}
