import { NextRequest } from "next/server";
import { readData } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const attempts = readData("attempts").filter((a: any) => a.userId === "single-user")
      .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    const questions = readData("questions");
    const byId = new Map(questions.map((q: any) => [q.id, q]));

    // Calculate overall metrics
    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter((a: any) => a.correct || a.isCorrect).length;
    const overallAccuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

    // Calculate recent streak (consecutive correct answers)
    let streak = 0;
    const sortedAttempts = [...attempts].reverse(); // Most recent first
    for (const attempt of sortedAttempts) {
      if (attempt.correct || attempt.isCorrect) {
        streak++;
      } else {
        break;
      }
    }

    // Calculate study time
    const totalStudyTime = attempts.reduce((total: number, attempt: any) => {
      return total + (attempt.duration || 60); // Default 60 seconds per question
    }, 0);
    const studyTimeMinutes = Math.round(totalStudyTime / 60);

    // Performance trend (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const trend = last7Days.map(date => {
      const dayAttempts = attempts.filter((a: any) => 
        a.createdAt?.startsWith(date)
      );
      const dayCorrect = dayAttempts.filter((a: any) => a.correct || a.isCorrect).length;
      return {
        date,
        accuracy: dayAttempts.length > 0 ? (dayCorrect / dayAttempts.length) * 100 : 0,
        count: dayAttempts.length
      };
    });

    // Topic-wise accuracy (from question topics)
    const topicStats: Record<string, { correct: number; total: number }> = {};
    for (const attempt of attempts) {
      const question = byId.get(attempt.questionId);
      const topic = question?.topic || 'general';
      
      topicStats[topic] = topicStats[topic] || { correct: 0, total: 0 };
      topicStats[topic].total += 1;
      if (attempt.correct || attempt.isCorrect) {
        topicStats[topic].correct += 1;
      }
    }

    const topicMastery = Object.entries(topicStats)
      .map(([topic, stats]) => ({
        topic: topic.length > 12 ? topic.substring(0, 12) + '...' : topic,
        mastery: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        count: stats.total
      }))
      .sort((a, b) => b.mastery - a.mastery)
      .slice(0, 10); // Top 10 topics

    return new Response(JSON.stringify({
      overallAccuracy: Math.round(overallAccuracy * 10) / 10,
      totalQuestions: totalAttempts,
      recentStreak: streak,
      studyTime: studyTimeMinutes,
      trend,
      topicMastery,
      totalTopics: Object.keys(topicStats).length
    }));
  } catch (e) {
    console.error("Analytics error:", e);
    return new Response(JSON.stringify({ error: "Analytics error" }), { status: 500 });
  }
}
