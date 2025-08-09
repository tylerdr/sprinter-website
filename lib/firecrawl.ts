/**
 * Firecrawl Integration
 * Firecrawl is a web scraping and search API that converts websites to LLM-ready data
 * Documentation: https://docs.firecrawl.dev
 */

interface FirecrawlSearchOptions {
  query: string;
  limit?: number;
  includeDomains?: string[];
  excludeDomains?: string[];
  scrapeOptions?: {
    formats?: ('markdown' | 'html' | 'rawHtml' | 'links' | 'screenshot')[];
    onlyMainContent?: boolean;
  };
}

interface FirecrawlSearchResult {
  title: string;
  url: string;
  markdown?: string;
  html?: string;
  excerpt?: string;
  metadata?: {
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
}

interface FirecrawlSearchResponse {
  success: boolean;
  data: FirecrawlSearchResult[];
}

/**
 * Search and scrape using Firecrawl API
 * Note: Requires FIRECRAWL_API_KEY environment variable
 */
export async function firecrawlSearch(options: FirecrawlSearchOptions): Promise<FirecrawlSearchResponse> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  
  if (!apiKey) {
    console.warn('FIRECRAWL_API_KEY not found, returning mock data');
    return getMockFirecrawlResults(options.query);
  }

  try {
    const response = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query: options.query,
        limit: options.limit || 10,
        includeDomains: options.includeDomains,
        excludeDomains: options.excludeDomains,
        scrapeOptions: {
          formats: options.scrapeOptions?.formats || ['markdown'],
          onlyMainContent: options.scrapeOptions?.onlyMainContent ?? true,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Firecrawl search error:', error);
    return getMockFirecrawlResults(options.query);
  }
}

/**
 * Scrape a specific URL using Firecrawl
 */
export async function firecrawlScrape(url: string): Promise<FirecrawlSearchResult | null> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown', 'html'],
        onlyMainContent: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Firecrawl scrape error:', error);
    return null;
  }
}

/**
 * Crawl an entire website using Firecrawl
 */
export async function firecrawlCrawl(
  url: string,
  options?: {
    limit?: number;
    maxDepth?: number;
    includePaths?: string[];
    excludePaths?: string[];
  }
): Promise<FirecrawlSearchResult[]> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  
  if (!apiKey) {
    return [];
  }

  try {
    // Start crawl job
    const startResponse = await fetch('https://api.firecrawl.dev/v1/crawl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        limit: options?.limit || 10,
        maxDepth: options?.maxDepth || 2,
        includePaths: options?.includePaths,
        excludePaths: options?.excludePaths,
        scrapeOptions: {
          formats: ['markdown'],
          onlyMainContent: true,
        }
      }),
    });

    if (!startResponse.ok) {
      throw new Error(`Firecrawl API error: ${startResponse.statusText}`);
    }

    const { id } = await startResponse.json();

    // Poll for results (in production, use webhooks)
    let attempts = 0;
    while (attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const statusResponse = await fetch(`https://api.firecrawl.dev/v1/crawl/${id}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!statusResponse.ok) {
        throw new Error(`Firecrawl API error: ${statusResponse.statusText}`);
      }

      const statusData = await statusResponse.json();
      
      if (statusData.status === 'completed') {
        return statusData.data || [];
      }
      
      if (statusData.status === 'failed') {
        throw new Error('Crawl job failed');
      }
      
      attempts++;
    }

    throw new Error('Crawl job timeout');
  } catch (error) {
    console.error('Firecrawl crawl error:', error);
    return [];
  }
}

/**
 * Mock data for development/demo purposes
 */
function getMockFirecrawlResults(query: string): FirecrawlSearchResponse {
  const industryQuery = query.toLowerCase();
  
  if (industryQuery.includes('ai') || industryQuery.includes('automation')) {
    return {
      success: true,
      data: [
        {
          title: "Enterprise AI Adoption Playbook 2025",
          url: "https://example.com/ai-playbook",
          markdown: `# Enterprise AI Adoption Playbook 2025

## Key Trends
- **Agentic AI Systems**: Moving from chatbots to autonomous agents
- **ROI Focus**: Average 3.2x return in first year
- **Hybrid Approach**: 70% build custom agents on foundation models

## Top Use Cases
1. Document Intelligence (40% adoption)
2. Customer Service Automation (35% adoption)
3. Process Mining & Optimization (25% adoption)

## Implementation Timeline
- Week 1-2: Discovery and data audit
- Week 3-4: Proof of concept
- Week 5-8: Production deployment
- Week 9-12: Optimization and scaling`,
          excerpt: "Comprehensive guide to enterprise AI adoption with proven strategies and ROI metrics.",
          metadata: {
            description: "Enterprise AI adoption strategies and best practices for 2025",
            keywords: "AI, automation, enterprise, ROI, agentic systems",
          }
        },
        {
          title: "AI Market Analysis: $1.3 Trillion by 2032",
          url: "https://example.com/ai-market-analysis",
          markdown: `# AI Market Growth Analysis

The global AI market is experiencing unprecedented growth:
- Current market size: $196.6 billion (2024)
- Projected size: $1.3 trillion by 2032
- CAGR: 28.46%

## Leading Sectors
1. Healthcare: $188B by 2030
2. Financial Services: $156B by 2030
3. Retail & E-commerce: $142B by 2030`,
          excerpt: "AI market projected to reach $1.3 trillion by 2032 with 28.46% CAGR.",
          metadata: {
            description: "Comprehensive AI market analysis and growth projections",
            ogTitle: "AI Market to Reach $1.3 Trillion by 2032",
          }
        }
      ]
    };
  }
  
  // Default results
  return {
    success: true,
    data: [
      {
        title: "Digital Transformation Success Patterns",
        url: "https://example.com/digital-transformation",
        markdown: `# Digital Transformation Patterns

## Success Factors
- Executive sponsorship
- Iterative implementation
- Focus on user adoption
- Continuous measurement

## Common Pitfalls
- Trying to boil the ocean
- Ignoring change management
- Underestimating data quality needs`,
        excerpt: "Proven patterns for successful digital transformation initiatives.",
        metadata: {
          description: "Digital transformation best practices and success patterns",
        }
      }
    ]
  };
}