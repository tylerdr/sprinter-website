import { BaseGenerator, PageContent } from './base-generator';
import { Industry, INDUSTRIES } from '../config/industries';
import { PROBLEMS } from '../config/problems';
import { AI_SOLUTIONS } from '../config/solutions';

export class IndustryPageGenerator extends BaseGenerator {
  async generateIndustryPage(industry: Industry): Promise<PageContent> {
    const relevantProblems = PROBLEMS.slice(0, 5); // Get top 5 problems for the industry
    const relevantSolutions = AI_SOLUTIONS.slice(0, 5); // Get top 5 solutions
    
    const systemPrompt = `You are an AI consultant specializing in ${industry.name}. 
    Write compelling, SEO-optimized content that demonstrates deep industry knowledge and positions Sprinter AI as the leading AI consulting firm for this sector.
    Focus on real business value, ROI, and transformation outcomes. Use industry-specific terminology and address real pain points.`;

    // Generate introduction
    const introPrompt = `Write a compelling 150-word introduction for AI solutions in the ${industry.name} industry.
    Mention key challenges: ${industry.challenges.slice(0, 3).join(', ')}.
    Include these metrics: ${JSON.stringify(industry.metrics)}.`;
    
    const introduction = await this.generateWithAI(introPrompt, systemPrompt);

    // Generate use cases section
    const useCasesPrompt = `List and describe 5 specific AI use cases for ${industry.name}.
    Each use case should include: problem solved, AI solution, expected ROI, implementation timeline.
    Format as detailed paragraphs.`;
    
    const useCasesContent = await this.generateWithAI(useCasesPrompt, systemPrompt);

    // Generate implementation roadmap
    const roadmapPrompt = `Create a 90-day AI implementation roadmap for a ${industry.name} company.
    Include: Week 1-2 (Assessment), Week 3-4 (Pilot Selection), Week 5-8 (Development), Week 9-12 (Deployment).
    Be specific to ${industry.name} operations.`;
    
    const roadmapContent = await this.generateWithAI(roadmapPrompt, systemPrompt);

    // Generate success metrics
    const metricsPrompt = `Define 8 key success metrics for AI implementation in ${industry.name}.
    Include both leading and lagging indicators. Be specific with percentages and timeframes.`;
    
    const metricsContent = await this.generateWithAI(metricsPrompt, systemPrompt);

    const title = `AI Solutions for ${industry.name} | Transform with Sprinter AI`;
    const h1 = `AI Transformation for ${industry.name}`;
    const slug = `/industries/${industry.slug}/`;

    const sections = [
      {
        title: "Industry Overview",
        content: introduction,
        subsections: [
          {
            title: "Key Challenges",
            content: `The ${industry.name} industry faces critical challenges that AI can address:`,
            bullets: industry.challenges,
          },
          {
            title: "AI Opportunities",
            content: "Transform these challenges into competitive advantages with our AI solutions:",
            bullets: industry.solutions,
          },
        ],
      },
      {
        title: "AI Use Cases for " + industry.name,
        content: useCasesContent,
        subsections: relevantProblems.map(problem => ({
          title: problem.name,
          content: `Solve ${problem.description} with AI-powered automation and intelligence.`,
          bullets: problem.solutions,
        })),
      },
      {
        title: "Our Solutions",
        content: "Comprehensive AI solutions tailored for " + industry.name + ":",
        subsections: relevantSolutions.map(solution => ({
          title: solution.name,
          content: solution.description,
          bullets: solution.features.slice(0, 3),
        })),
      },
      {
        title: "Implementation Roadmap",
        content: roadmapContent,
      },
      {
        title: "Success Metrics",
        content: metricsContent,
      },
      {
        title: "Expected ROI",
        content: `Our ${industry.name} clients typically see:`,
        subsections: [
          {
            title: "Financial Impact",
            content: `Average ROI of ${industry.metrics.avgROI} within ${industry.metrics.timeToValue}.`,
            bullets: [
              `${industry.metrics.avgROI} return on investment`,
              `Time to value: ${industry.metrics.timeToValue}`,
              Object.entries(industry.metrics)
                .filter(([key]) => key !== 'avgROI' && key !== 'timeToValue')
                .map(([_, value]) => `${value} improvement`)
                .join(', '),
            ],
          },
        ],
      },
    ];

    const metaDescription = `Transform your ${industry.name} business with AI. ${industry.metrics.avgROI} average ROI. Expert consulting, rapid implementation, proven results. Get your free AI assessment today.`;

    const structuredData = this.generateStructuredData('Service', {
      name: `AI Consulting for ${industry.name}`,
      provider: {
        '@type': 'Organization',
        name: 'Sprinter AI',
      },
      description: metaDescription,
      areaServed: 'United States',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Solutions',
        itemListElement: relevantSolutions.map(solution => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: solution.name,
            description: solution.description,
          },
        })),
      },
    });

    return {
      title,
      metaDescription,
      h1,
      introduction,
      sections,
      keywords: [
        ...industry.keywords,
        `AI for ${industry.name}`,
        `${industry.name} automation`,
        `${industry.name} AI consulting`,
        'AI transformation',
        'machine learning',
        ...this.extractKeywords(introduction + useCasesContent),
      ],
      slug,
      canonical: `https://sprinter.ai${slug}`,
      structuredData,
    };
  }

  async generateAllIndustryPages(): Promise<PageContent[]> {
    return this.batchGenerate(
      INDUSTRIES,
      (industry) => this.generateIndustryPage(industry),
      1 // Process 1 industry at a time to avoid rate limits
    );
  }
}