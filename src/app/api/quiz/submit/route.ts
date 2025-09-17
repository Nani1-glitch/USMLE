import { NextRequest } from "next/server";
import { addData, readData, updateData } from "@/lib/storage";

function nextInterval(ease: number, prevDays: number, correct: boolean) {
  const newEase = Math.max(1.3, ease + (correct ? 0.1 : -0.2));
  let days = 0;
  if (prevDays === 0) days = correct ? 1 : 0;
  else if (prevDays === 1) days = correct ? 3 : 1;
  else days = Math.round(prevDays * newEase);
  return { newEase, days };
}

export async function POST(req: NextRequest) {
  try {
    const { questionId, selectedIndex, isCorrect, timeMs } = await req.json();
    if (!questionId) return new Response(JSON.stringify({ error: "Missing questionId" }), { status: 400 });

    // Calculate duration in seconds
    const duration = timeMs ? Math.round(timeMs / 1000) : 60; // Default 60 seconds if not provided
    
    addData("attempts", { 
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      userId: "single-user", 
      questionId, 
      isCorrect, 
      correct: isCorrect, // Add both for compatibility
      selectedIndex, 
      timeMs, 
      duration,
      createdAt: new Date().toISOString() 
    });

    const reviews = readData("reviews").filter((r: any) => r.userId === "single-user" && r.questionId === questionId);
    if (reviews.length) {
      const review = reviews[0];
      const { newEase, days } = nextInterval((review as any).ease || 2.5, (review as any).intervalDays || 0, !!isCorrect);
      const dueAt = days ? new Date(Date.now() + days * 24 * 3600 * 1000).toISOString() : new Date().toISOString();
      updateData("reviews", (review as any).id, { ease: newEase, intervalDays: days, dueAt, updatedAt: new Date().toISOString() } as any);
    }

    return new Response(JSON.stringify({ ok: true }));
  } catch (e) {
    return new Response(JSON.stringify({ error: "Submit error" }), { status: 500 });
  }
}
