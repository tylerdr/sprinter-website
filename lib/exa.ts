/**
 * Exa Search Integration
 * Exa is an AI-powered search API that provides semantic search capabilities
 * Documentation: https://docs.exa.ai
 */

interface ExaSearchOptions {
  query: string;
  numResults?: number;
  type?: 'neural' | 'keyword';
  useAutoprompt?: boolean;
  category?: string;
  startPublishedDate?: string;
  endPublishedDate?: string;
}

interface ExaSearchResult {
  title: string;
  url: string;
  publishedDate?: string;
  author?: string;
  score: number;
  id: string;
  text?: string;
  highlights?: string[];
}

interface ExaSearchResponse {
  results: ExaSearchResult[];
  autopromptString?: string;
}

/**
 * Search using Exa API
 * Note: Requires EXA_API_KEY environment variable
 */
export async function exaSearch(options: ExaSearchOptions): Promise<ExaSearchResponse> {
  const apiKey = process.env.EXA_API_KEY;
  
  if (!apiKey) {
    console.warn('EXA_API_KEY not found, returning mock data');
    return getMockExaResults(options.query);
  }

  try {
    const response = await fetch('https://api.exa.ai/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        query: options.query,
        num_results: options.numResults || 10,
        type: options.type || 'neural',
        use_autoprompt: options.useAutoprompt ?? true,
        category: options.category,
        start_published_date: options.startPublishedDate,
        end_published_date: options.endPublishedDate,
        contents: {
          text: true,
          highlights: true,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Exa API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      results: data.results.map((result: {
        title: string;
        url: string;
        published_date?: string;
        author?: string;
        score: number;
        id: string;
        text?: string;
        highlights?: string[];
      }) => ({
        title: result.title,
        url: result.url,
        publishedDate: result.published_date,
        author: result.author,
        score: result.score,
        id: result.id,
        text: result.text,
        highlights: result.highlights,
      })),
      autopromptString: data.autoprompt_string,
    };
  } catch (error) {
    console.error('Exa search error:', error);
    return getMockExaResults(options.query);
  }
}

/**
 * Get content from specific URLs using Exa
 */
export async function exaGetContents(urls: string[]): Promise<ExaSearchResult[]> {
  const apiKey = process.env.EXA_API_KEY;
  
  if (!apiKey) {
    return [];
  }

  try {
    const response = await fetch('https://api.exa.ai/contents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        ids: urls,
        contents: {
          text: true,
          highlights: true,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Exa API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Exa get contents error:', error);
    return [];
  }
}

/**
 * Mock data for development/demo purposes
 */
function getMockExaResults(query: string): ExaSearchResponse {
  const industryQuery = query.toLowerCase();
  
  // Provide contextual mock results based on query
  if (industryQuery.includes('mortgage') || industryQuery.includes('finance')) {
    return {
      results: [
        {
          title: "AI Transforms Mortgage Processing: 70% Reduction in Processing Time",
          url: "https://example.com/mortgage-ai-trends",
          publishedDate: "2024-12-15",
          score: 0.95,
          id: "mock-1",
          text: "Leading mortgage lenders are implementing AI-powered document processing and automated underwriting systems, achieving 70% reduction in processing times and 50% cost savings.",
          highlights: ["70% reduction in processing time", "automated underwriting", "50% cost savings"]
        },
        {
          title: "Top 5 AI Use Cases in Financial Services 2025",
          url: "https://example.com/finance-ai-usecases",
          publishedDate: "2024-12-10",
          score: 0.92,
          id: "mock-2",
          text: "Document intelligence, risk assessment automation, and customer service agents lead AI adoption in finance.",
          highlights: ["document intelligence", "risk assessment", "customer service agents"]
        }
      ]
    };
  }
  
  if (industryQuery.includes('healthcare') || industryQuery.includes('medical')) {
    return {
      results: [
        {
          title: "Healthcare AI Market to Reach $188B by 2030",
          url: "https://example.com/healthcare-ai-market",
          publishedDate: "2024-12-20",
          score: 0.93,
          id: "mock-3",
          text: "AI in healthcare focusing on clinical documentation, patient engagement, and predictive analytics.",
          highlights: ["clinical documentation", "patient engagement", "predictive analytics"]
        },
        {
          title: "Epic and AI: Transforming Patient Care Workflows",
          url: "https://example.com/epic-ai-integration",
          publishedDate: "2024-12-18",
          score: 0.91,
          id: "mock-4",
          text: "EHR integration with AI agents reducing physician burnout by 40% through automated documentation.",
          highlights: ["EHR integration", "40% burnout reduction", "automated documentation"]
        }
      ]
    };
  }
  
  // Default results for any industry
  return {
    results: [
      {
        title: "2025 State of AI Adoption: Agentic Systems Lead Growth",
        url: "https://example.com/ai-adoption-2025",
        publishedDate: "2024-12-22",
        score: 0.94,
        id: "mock-5",
        text: "Enterprises shifting from experimental AI to production agentic systems, with 65% planning deployment in 2025.",
        highlights: ["agentic systems", "65% planning deployment", "production AI"]
      },
      {
        title: "ROI of AI Automation: Industry Benchmarks",
        url: "https://example.com/ai-roi-benchmarks",
        publishedDate: "2024-12-19",
        score: 0.90,
        id: "mock-6",
        text: "Average ROI of 3.2x in first year, with document processing and customer service showing highest returns.",
        highlights: ["3.2x ROI", "document processing", "customer service"]
      },
      {
        title: "Building vs Buying AI Solutions: Enterprise Guide",
        url: "https://example.com/build-vs-buy-ai",
        publishedDate: "2024-12-17",
        score: 0.88,
        id: "mock-7",
        text: "70% of enterprises choosing hybrid approach: custom agents on top of foundation models.",
        highlights: ["hybrid approach", "custom agents", "foundation models"]
      }
    ]
  };
}