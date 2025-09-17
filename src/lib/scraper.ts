import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedQuestion {
  stem: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  source: string;
  topic: string;
}

export class USMLEScraper {
  private static readonly SOURCES = [
    {
      name: 'USMLE.org Practice Materials',
      url: 'https://www.usmle.org/practice-materials',
      selector: '.practice-question'
    },
    {
      name: 'Medscape Education',
      url: 'https://www.medscape.com/education',
      selector: '.question'
    },
    {
      name: 'WebMD Medical Education',
      url: 'https://www.webmd.com/medical-education',
      selector: '.quiz-question'
    }
  ];

  static async scrapeQuestionsByTopic(topic: string): Promise<ScrapedQuestion[]> {
    const questions: ScrapedQuestion[] = [];
    
    try {
      // Search for topic-specific USMLE questions
      const searchQueries = [
        `${topic} USMLE step 1 questions`,
        `${topic} NBME questions`,
        `${topic} medical board questions`,
        `${topic} practice questions medical`,
        `${topic} USMLE practice test`,
        `${topic} step 1 exam questions`,
        `${topic} medical licensing exam`,
        `${topic} board review questions`
      ];

      // Try Google search first
      for (const query of searchQueries.slice(0, 3)) { // Limit to first 3 queries
        try {
          const searchResults = await this.searchGoogle(query);
          for (const url of searchResults.slice(0, 2)) { // Limit to top 2 results per query
            try {
              const scraped = await this.scrapeFromUrl(url, topic);
              questions.push(...scraped);
              if (questions.length >= 10) break; // Stop if we have enough
            } catch (error) {
              console.log(`Failed to scrape ${url}:`, error.message);
            }
          }
          if (questions.length >= 10) break;
        } catch (error) {
          console.log(`Google search failed for ${query}:`, error.message);
        }
      }

      // Try known sources if we don't have enough questions
      if (questions.length < 5) {
        for (const source of this.SOURCES) {
          try {
            const scraped = await this.scrapeFromUrl(source.url, topic);
            questions.push(...scraped);
            if (questions.length >= 10) break;
          } catch (error) {
            console.log(`Failed to scrape ${source.name}:`, error.message);
          }
        }
      }

      return questions.slice(0, 50); // Limit total questions
    } catch (error) {
      console.error('Scraping error:', error);
      return [];
    }
  }

  private static async searchGoogle(query: string): Promise<string[]> {
    try {
      const response = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      const $ = cheerio.load(response.data);
      const links: string[] = [];
      
      $('a[href*="http"]').each((_, element) => {
        const href = $(element).attr('href');
        if (href && !href.includes('google.com') && !href.includes('youtube.com')) {
          links.push(href);
        }
      });
      
      return links.slice(0, 10);
    } catch (error) {
      console.error('Google search error:', error);
      return [];
    }
  }

  private static async scrapeFromUrl(url: string, topic: string): Promise<ScrapedQuestion[]> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
        },
        timeout: 8000,
        maxRedirects: 3,
        validateStatus: (status) => status < 500 // Accept redirects and client errors
      });
      
      const $ = cheerio.load(response.data);
      const questions: ScrapedQuestion[] = [];
      
      // Common selectors for USMLE questions
      const questionSelectors = [
        '.question',
        '.question-item',
        '.practice-question',
        '.question-card',
        '.quiz-question',
        '[class*="question"]',
        '[id*="question"]',
        'article',
        '.content'
      ];
      
      for (const selector of questionSelectors) {
        $(selector).each((_, element) => {
          const questionText = $(element).find('.stem, .question-text, .question-content, p, h1, h2, h3').first().text().trim();
          
          if (questionText && questionText.length > 20 && questionText.toLowerCase().includes(topic.toLowerCase())) {
            const choices: string[] = [];
            $(element).find('.choice, .option, .answer-option, li, .answer').each((_, choice) => {
              const choiceText = $(choice).text().trim();
              if (choiceText && choiceText.length > 1 && choiceText.length < 200) {
                choices.push(choiceText);
              }
            });
            
            if (choices.length >= 2 && choices.length <= 6) {
              const explanation = $(element).find('.explanation, .rationale, .answer-explanation, .solution').text().trim() || 
                                'Explanation not available from source';
              
              questions.push({
                stem: questionText.substring(0, 500), // Limit length
                choices: choices.slice(0, 5), // Limit choices
                answerIndex: 0, // Will be determined by AI
                explanation: explanation.substring(0, 1000), // Limit explanation length
                source: url,
                topic
              });
            }
          }
        });
      }
      
      return questions.slice(0, 5); // Limit per URL
    } catch (error: any) {
      console.error(`Error scraping ${url}:`, error.message);
      return [];
    }
  }

  static async generateQuestionsFromScrapedData(scrapedQuestions: ScrapedQuestion[], topic: string): Promise<any[]> {
    // If no scraped questions, return empty array (fallback will be handled in the API)
    if (scrapedQuestions.length === 0) {
      return [];
    }

    try {
      const response = await fetch('/api/openai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Based on these ${topic} USMLE questions from previous years, generate 15 new, high-quality USMLE Step 1 questions on the same topic. 

Scraped Questions Context:
${scrapedQuestions.map((q, i) => `
Question ${i + 1}:
Stem: ${q.stem}
Choices: ${q.choices.join(', ')}
Explanation: ${q.explanation}
`).join('\n')}

Generate 15 new questions that:
1. Follow USMLE Step 1 format and difficulty
2. Cover different aspects of ${topic}
3. Include clinical scenarios and basic science
4. Have clear, unambiguous answer choices
5. Include detailed explanations

Return as JSON array with format:
[
  {
    "stem": "Question text...",
    "choices": ["A) Choice 1", "B) Choice 2", "C) Choice 3", "D) Choice 4", "E) Choice 5"],
    "answerIndex": 0,
    "explanation": "Detailed explanation...",
    "difficulty": 3
  }
]`
          }]
        })
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content ? JSON.parse(data.choices[0].message.content) : [];
    } catch (error) {
      console.error('Error generating questions from scraped data:', error);
      return [];
    }
  }

  static async generateFallbackQuestions(topic: string): Promise<any[]> {
    try {
      // Use the existing quiz generate API instead
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      if (!response.ok) {
        throw new Error('Generate API failed');
      }

      const question = await response.json();
      
      // Generate multiple questions by calling the API multiple times
      const questions = [];
      for (let i = 0; i < 15; i++) {
        try {
          const resp = await fetch('/api/quiz/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: `${topic} - question ${i + 1}` })
          });
          
          if (resp.ok) {
            const q = await resp.json();
            questions.push(q);
          }
        } catch (e) {
          console.log(`Failed to generate question ${i + 1}`);
        }
      }
      
      return questions;
    } catch (error) {
      console.error('Error generating fallback questions:', error);
      return [];
    }
  }
}
