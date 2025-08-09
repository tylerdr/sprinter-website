"use server";

import { z } from "zod";
import { exaSearch } from "@/lib/exa";
import { firecrawlSearch } from "@/lib/firecrawl";

const auditInputSchema = z.object({
  role: z.string(),
  industry: z.string(),
  company: z.string(),
  companyUrl: z.string().optional(),
  systems: z.array(z.string()),
  painPoints: z.array(z.string()),
  objectives: z.array(z.string()),
  email: z.string().email(),
});

type AuditInput = z.infer<typeof auditInputSchema>;

interface AuditOpportunity {
  name: string;
  description: string;
  mechanism: string;
  agentPattern: string[];
  roi: {
    timeframe: string;
    conservative: number;
    optimistic: number;
    assumptions: string[];
  };
  implementation: {
    week1: string[];
    week2_3: string[];
    week4: string[];
  };
  risks: string[];
}

export async function createAudit(input: AuditInput) {
  try {
    // Validate input
    const validatedInput = auditInputSchema.parse(input);

    // 1. Perform market research using Exa (or Firecrawl as fallback)
    const searchQuery = `${validatedInput.industry} AI automation use cases ROI 2025 agentic systems`;
    
    let marketResearch;
    try {
      // Try Exa first (better for semantic search)
      marketResearch = await exaSearch({
        query: searchQuery,
        numResults: 5,
        type: 'neural',
        useAutoprompt: true,
        category: 'company',
      });
    } catch (exaError) {
      console.log('Exa search failed, trying Firecrawl:', exaError);
      // Fallback to Firecrawl
      const firecrawlResults = await firecrawlSearch({
        query: searchQuery,
        limit: 5,
      });
      
      // Transform Firecrawl results to match Exa format
      marketResearch = {
        results: firecrawlResults.data.map(item => ({
          title: item.title,
          url: item.url,
          text: item.markdown || item.excerpt || '',
          highlights: [],
          score: 0.9,
          id: item.url,
        })),
      };
    }

    // 2. If company URL provided, analyze their web presence
    let companyAnalysis = null;
    if (validatedInput.companyUrl) {
      try {
        const firecrawlScrape = await import('@/lib/firecrawl').then(m => m.firecrawlScrape);
        companyAnalysis = await firecrawlScrape(validatedInput.companyUrl);
      } catch (error) {
        console.log('Company URL analysis failed:', error);
      }
    }

    // 3. Generate opportunities based on research and input
    const opportunities = await generateEnhancedOpportunities(
      validatedInput, 
      marketResearch,
      companyAnalysis
    );

    // 4. Generate PDF (we'll implement this next)
    // const pdfBuffer = await generatePDF(opportunities, validatedInput, marketResearch);
    
    // 5. Upload to storage (would use Supabase or S3 in production)
    // const pdfUrl = await uploadPDF(pdfBuffer, validatedInput.email);

    // 6. Save lead to database
    await saveLead(validatedInput, marketResearch);

    // For now, redirect to sample report with data
    const reportData = Buffer.from(JSON.stringify({
      opportunities,
      research: marketResearch.results.slice(0, 3),
    })).toString('base64');
    
    return {
      success: true,
      reportUrl: `/labs/opportunity-audit/sample?email=${encodeURIComponent(validatedInput.email)}&data=${reportData}`,
      reportId: generateReportId(),
    };
  } catch (error) {
    console.error("Failed to create audit:", error);
    throw new Error("Failed to generate audit report");
  }
}

function generateMockOpportunities(input: AuditInput): AuditOpportunity[] {
  // Generate contextual opportunities based on industry
  const industryOpportunities: Record<string, AuditOpportunity[]> = {
    default: [
      {
        name: "Intelligent Document Processing",
        description: "Auto-extract, validate, and route data from unstructured documents",
        mechanism: "OCR → NLP extraction → validation → routing with human-in-loop for exceptions",
        agentPattern: ["Read", "Parse", "Validate", "Route", "Notify", "Learn"],
        roi: {
          timeframe: "60 days",
          conservative: 40,
          optimistic: 65,
          assumptions: [
            "Processing 1000+ documents/week",
            "Current manual processing: 15 min/doc",
            "AI processing: 30 sec/doc with 95% accuracy"
          ]
        },
        implementation: {
          week1: ["Document audit", "Data pipeline design", "Initial OCR setup"],
          week2_3: ["NLP model training", "Validation rules", "Integration tests"],
          week4: ["Deployment", "Staff training", "Performance monitoring"]
        },
        risks: ["Data quality variance", "Change management", "Integration complexity"]
      },
      {
        name: "Customer Intelligence Agent",
        description: "Real-time insights from all customer touchpoints with predictive actions",
        mechanism: "Multi-source aggregation → sentiment analysis → pattern detection → proactive outreach",
        agentPattern: ["Monitor", "Aggregate", "Analyze", "Predict", "Act", "Report"],
        roi: {
          timeframe: "90 days",
          conservative: 25,
          optimistic: 45,
          assumptions: [
            "10% reduction in churn",
            "20% increase in upsell conversion",
            "30% faster issue resolution"
          ]
        },
        implementation: {
          week1: ["Data source mapping", "API integrations", "Baseline metrics"],
          week2_3: ["Sentiment model setup", "Alert rules", "Dashboard creation"],
          week4: ["Team enablement", "Playbook creation", "Go-live"]
        },
        risks: ["Data privacy compliance", "API rate limits", "False positive alerts"]
      },
      {
        name: "Operational Excellence Autopilot",
        description: "Self-optimizing workflows that adapt to patterns and exceptions",
        mechanism: "Process mining → bottleneck detection → optimization → continuous learning",
        agentPattern: ["Observe", "Measure", "Identify", "Optimize", "Execute", "Adapt"],
        roi: {
          timeframe: "120 days",
          conservative: 35,
          optimistic: 55,
          assumptions: [
            "30% reduction in process time",
            "50% fewer manual interventions",
            "20% cost reduction"
          ]
        },
        implementation: {
          week1: ["Process mapping", "KPI definition", "Tool selection"],
          week2_3: ["Automation build", "Exception handling", "Testing"],
          week4: ["Phased rollout", "Monitoring setup", "Optimization loops"]
        },
        risks: ["Process complexity", "System dependencies", "Organizational resistance"]
      }
    ]
  };

  // Return default opportunities for now
  // In production, this would be customized based on industry/role/systems
  return industryOpportunities.default;
}

function generateReportId(): string {
  return `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

async function generateEnhancedOpportunities(
  input: AuditInput,
  marketResearch: { results: Array<{ title: string }> },
  companyAnalysis: { markdown?: string } | null
): Promise<AuditOpportunity[]> {
  // Start with base opportunities
  const baseOpportunities = generateMockOpportunities(input);
  
  // Enhance with market research insights
  if (marketResearch?.results?.length > 0) {
    // Extract key trends from research
    const trends = marketResearch.results.map(r => r.title).join(' ');
    
    // Customize opportunities based on trends
    baseOpportunities.forEach(opp => {
      // Add market evidence to each opportunity
      if (trends.toLowerCase().includes('roi') || trends.toLowerCase().includes('return')) {
        opp.roi.assumptions.push('Industry benchmarks show similar ROI patterns');
      }
      if (trends.toLowerCase().includes('automation')) {
        opp.mechanism += ' (aligned with industry automation trends)';
      }
    });
  }
  
  // Add company-specific insights if available
  if (companyAnalysis?.markdown) {
    // Analyze company's current tech stack
    const hasAPI = companyAnalysis.markdown.toLowerCase().includes('api');
    const hasData = companyAnalysis.markdown.toLowerCase().includes('data');
    
    if (hasAPI) {
      baseOpportunities[0].implementation.week1.push('API integration assessment');
    }
    if (hasData) {
      baseOpportunities[0].risks.push('Data migration complexity - mitigated with phased approach');
    }
  }
  
  return baseOpportunities;
}

async function saveLead(input: AuditInput, research: { results?: unknown[] }): Promise<void> {
  // In production, save to Supabase
  // For now, just log
  console.log('Lead captured:', {
    email: input.email,
    company: input.company,
    industry: input.industry,
    timestamp: new Date().toISOString(),
    researchTopics: research?.results?.length || 0,
  });
  
  // Would implement:
  // const { data, error } = await supabase
  //   .from('audit_leads')
  //   .insert({
  //     email: input.email,
  //     company: input.company,
  //     industry: input.industry,
  //     role: input.role,
  //     systems: input.systems,
  //     pain_points: input.painPoints,
  //     objectives: input.objectives,
  //     created_at: new Date().toISOString(),
  //   });
}