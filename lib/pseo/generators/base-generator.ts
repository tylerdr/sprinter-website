import { OpenAI } from 'openai';

export interface PageContent {
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  sections: Section[];
  keywords: string[];
  slug: string;
  canonical?: string;
  structuredData?: any;
}

export interface Section {
  title: string;
  content: string;
  subsections?: Subsection[];
}

export interface Subsection {
  title: string;
  content: string;
  bullets?: string[];
}

export class BaseGenerator {
  protected openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  protected async generateWithAI(prompt: string, systemPrompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-5-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_completion_tokens: 2000,
      });

      return response.choices[0].message.content || '';
    } catch (error) {
      console.error('AI generation error:', error);
      throw new Error('Failed to generate content with AI');
    }
  }

  protected formatSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  protected generateMetaDescription(content: string, limit = 155): string {
    const sentences = content.split('.').filter(s => s.trim());
    let description = '';
    
    for (const sentence of sentences) {
      if (description.length + sentence.length <= limit) {
        description += sentence.trim() + '. ';
      } else {
        break;
      }
    }
    
    return description.trim();
  }

  protected generateStructuredData(type: string, data: any): any {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    };

    return baseData;
  }

  protected async batchGenerate<T>(
    items: T[],
    generator: (item: T) => Promise<PageContent>,
    batchSize = 5
  ): Promise<PageContent[]> {
    const results: PageContent[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(generator));
      results.push(...batchResults);
    }
    
    return results;
  }

  protected extractKeywords(content: string, count = 10): string[] {
    // Simple keyword extraction - in production, use more sophisticated NLP
    const words = content.toLowerCase().split(/\W+/);
    const wordFreq = new Map<string, number>();
    
    // Count word frequency
    words.forEach(word => {
      if (word.length > 3) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
      }
    });
    
    // Sort by frequency and return top keywords
    return Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([word]) => word);
  }
}