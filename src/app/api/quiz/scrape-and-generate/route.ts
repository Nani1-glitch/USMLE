import { NextRequest } from "next/server";
import { USMLEScraper } from "@/lib/scraper";
import { addData } from "@/lib/storage";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    
    if (!topic) {
      return new Response(JSON.stringify({ error: "Topic is required" }), { status: 400 });
    }

    // Step 1: Scrape previous year questions
    console.log(`Scraping questions for topic: ${topic}`);
    const scrapedQuestions = await USMLEScraper.scrapeQuestionsByTopic(topic);
    console.log(`Found ${scrapedQuestions.length} scraped questions`);

    // Step 2: Generate new questions based on scraped data (or fallback)
    console.log(`Generating new questions based on scraped data...`);
    let generatedQuestions = await USMLEScraper.generateQuestionsFromScrapedData(scrapedQuestions, topic);
    console.log(`Generated ${generatedQuestions.length} new questions`);
    
    // If still no questions, generate using OpenAI directly
    if (generatedQuestions.length === 0) {
      console.log(`No questions generated, using direct OpenAI generation...`);
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{
            role: 'user',
            content: `Generate 15 high-quality USMLE Step 1 questions on ${topic}. 

IMPORTANT: Return ONLY a valid JSON array, no other text. Format:
[
  {
    "stem": "Question text...",
    "choices": ["A) Choice 1", "B) Choice 2", "C) Choice 3", "D) Choice 4", "E) Choice 5"],
    "answerIndex": 0,
    "explanation": "Detailed explanation...",
    "difficulty": 3
  }
]`
          }],
          temperature: 0.7,
          max_tokens: 4000,
        });

        const content = completion.choices[0]?.message?.content;
        console.log('OpenAI response content:', content?.substring(0, 200));
        
        if (content) {
          try {
            const questions = JSON.parse(content);
            console.log('Parsed questions:', questions.length);
            if (Array.isArray(questions)) {
              generatedQuestions.push(...questions);
            } else {
              console.log('Response is not an array:', typeof questions);
            }
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            console.log('Raw content:', content);
          }
        }
        console.log(`Direct generation created ${generatedQuestions.length} questions`);
      } catch (error) {
        console.error('Direct generation failed:', error);
      }
    }

    // Step 3: Save generated questions to database
    const savedQuestions = [];
    for (const question of generatedQuestions) {
      try {
        const questionData = {
          id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          stem: (question as any).stem,
          choices: (question as any).choices,
          answerIndex: (question as any).answerIndex,
          explanation: (question as any).explanation,
          difficulty: (question as any).difficulty || 3,
          topic: topic,
          userId: "single-user",
          createdAt: new Date().toISOString(),
          source: "web-scraped-generated"
        };

        addData("questions", questionData);
        savedQuestions.push(questionData);
      } catch (error) {
        console.error("Error saving question:", error);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      scrapedCount: scrapedQuestions.length,
      generatedCount: generatedQuestions.length,
      savedCount: savedQuestions.length,
      questions: savedQuestions,
      message: scrapedQuestions.length > 0 
        ? `Successfully scraped ${scrapedQuestions.length} questions and generated ${generatedQuestions.length} new ones`
        : `Web scraping failed, but generated ${generatedQuestions.length} high-quality questions based on ${topic} knowledge`
    }));

  } catch (error: any) {
    console.error("Scrape and generate error:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to scrape and generate questions",
      details: error.message 
    }), { status: 500 });
  }
}
