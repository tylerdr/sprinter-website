import { z } from "zod";

export const ResultSchema = z.object({ metric: z.string(), label: z.string() });
export const CaseStudySchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  challenge: z.string(),
  solution: z.string(),
  results: z.array(ResultSchema),
  testimonial: z.string(),
  testimonialAuthor: z.string(),
  features: z.array(z.string()),
  gradient: z.string(),
  screenshot: z.string(),
  architectureDiagram: z.string().optional(),
});

export type CaseStudy = z.infer<typeof CaseStudySchema>;

// PE case studies - These are illustrative examples of the types of engagements we pursue
// Real client work uses anonymized data per NDAs
export const peCaseStudies: CaseStudy[] = [];

// Family Office case studies - placeholder for future real engagements
export const familyOfficeCaseStudies: CaseStudy[] = [];

export const caseStudies: CaseStudy[] = [
  ...peCaseStudies,
  ...familyOfficeCaseStudies,
  {
    slug: "ai-mortgage-assistant",
    title: "MortgageQ – AI-Driven Non-QM Guideline Intelligence",
    category: "FinTech AI Platform",
    description:
      "From messy PDFs to instant decisions: How agentic extraction turns Non-QM guidelines into auditable answers",
    challenge:
      "Non-QM lending runs on sprawling, inconsistent PDFs—tables, footnotes, scanned images—updated frequently across 50+ lenders. Loan officers spend hours daily hunting for rules and exceptions while borrowers cool off. Result: slow decisions, avoidable declines, and stalled pipeline velocity.",
    solution:
      "Engineered an AI system that ingests lender PDFs (including image-based content), extracts structured fields from unstructured text, normalizes data across lenders, and returns scenario-specific answers within seconds. Multiple AI agents research all eligible lenders in parallel, backed by guideline references and accessible PDFs.",
    results: [
      { metric: "95%", label: "Research time reduction" },
      { metric: "~1 hour", label: "Saved per loan inquiry" },
      { metric: "50+", label: "Lenders searchable in seconds" },
      { metric: "$8,915", label: "Annual savings per LO (5 scenarios/week)" },
      { metric: "2.7", label: "Scenarios/week to break even" },
      { metric: "Pipeline lift", label: "Faster borrower qualification and lender matching" },
    ],
    testimonial:
      "The AI doesn't just help us manage Non-QM complexity—it turned it into our competitive advantage. We're closing loans 300% faster with the confidence of having a senior underwriter available 24/7.",
    testimonialAuthor: "VP Operations, Mid-Market Lending Firm",
    features: [
      "Multi-agent parallel lender research",
      "Field normalization across divergent nomenclatures",
      "Evidence-backed answers with guideline citations and PDF access",
      "'Just Missed' analytics for lenders",
      "OCR for image-based guideline pages",
      "Human-in-the-loop confidence thresholds",
      "ROI calculator: time savings alone covers platform cost",
    ],
    gradient: "from-green-500 to-emerald-600",
    screenshot: "/images/case-studies/mortgageq-hero.png",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "ai-cabinet-automation",
    title: "Cab-O-Matic – AI-Driven SKU Mapping Platform",
    category: "B2B SaaS",
    description:
      "AI‑driven SKU mapping that eliminates redraws and compresses multi‑manufacturer pricing",
    challenge:
      "Cabinet dealers must quote the same plan across multiple manufacturers, but catalogs arrive as unstructured PDFs with inconsistent naming and pricing models. Traditional process requires redrawing every plan per manufacturer, manual spreadsheet rebuilds for tax/freight/labor, and error-prone cross-references. Result: 3+ hour quotes, limited alternatives, and $450K in annual productivity loss.",
    solution:
      "Designed an AI-driven SKU mapping solution combining visual AI catalog parser with agentic, human-in-the-loop mapping workflow. System parses PDFs/spec books, extracts and normalizes attributes into canonical feature model, generates cross-manufacturer equivalencies with constraint validation, and expands single CAD export into multi-manufacturer quotes without redrawing.",
    results: [
      { metric: "250,000", label: "Prices generated (12 months)" },
      { metric: "≥2 hours", label: "Saved per plan" },
      { metric: "~5,000", label: "Hours returned (2.4 FTE)" },
      { metric: "$120K", label: "Direct labor savings/year" },
      { metric: "20×", label: "ROI multiple at current usage" },
      { metric: "9", label: "Plans/month to break even" },
    ],
    testimonial:
      "This isn't just automation—it's transformation. We quote more options, close faster, and our designers focus on design instead of spreadsheets. The ROI was evident within weeks.",
    testimonialAuthor: "Operations Director, Cabinet Manufacturer",
    features: [
      "Visual AI parser for PDFs and price lists",
      "Canonical SKU schema with semantic reconciliation",
      "Multi-agent candidate generation and validation",
      "Constraint checker for dimensional compatibility",
      "Price-group harmonization across brands",
      "Confidence scoring with human review queue",
      "Dealer-specific tax/freight/labor rules",
      "Compounding knowledge base (each mapping improves system)",
    ],
    gradient: "from-blue-500 to-purple-600",
    screenshot: "/images/case-studies/cab-o-matic-hero.png",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "ai-patient-coach",
    title: "RPM Healthcare – Autonomous AI Care Coach",
    category: "Healthcare Technology",
    description:
      "How AI-assisted patient monitoring expanded care capacity and improved escalation speed.",
    challenge:
      "A healthcare system needed to monitor a large chronic-care population with limited nursing capacity. Teams spent most of their time on routine check-ins, making it harder to prioritize high-risk patients quickly.",
    solution:
      "Deployed autonomous AI care coach that conducts intelligent patient check-ins via voice/text/app, analyzes responses using clinical NLP models, triages by acuity with predictive risk scoring, and escalates critical cases to nurses in real-time. System personalizes education based on health literacy and integrates with Epic EHR for seamless documentation.",
    results: [
      { metric: "60%", label: "Nurse workload reduction" },
      { metric: "85%", label: "Patient engagement (was 35%)" },
      { metric: "40%", label: "Readmission reduction" },
      { metric: "5×", label: "Patient coverage per nurse" },
      { metric: "Meaningful", label: "Penalty and cost avoidance potential" },
      { metric: "92%", label: "Early deterioration detection" },
    ],
    testimonial:
      "The AI coach transformed our care model. Nurses now focus on patients who need intervention most while routine follow-ups are handled automatically.",
    testimonialAuthor: "Chief Nursing Officer, Regional Health System",
    features: [
      "Multi-modal patient engagement (voice, SMS, app)",
      "Clinical NLP for symptom extraction",
      "ML-based deterioration prediction models",
      "Acuity-based intelligent triage queues",
      "Personalized education content delivery",
      "Real-time nurse escalation protocols",
      "Epic EHR bidirectional integration",
      "Regulatory compliance reporting (CMS, HEDIS)",
    ],
    gradient: "from-red-500 to-pink-600",
    screenshot: "/images/case-studies/rpm-healthcare-hero.png",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "ai-workshop-platform",
    title: "Amble Ideation – AI-Powered Innovation Workshop Platform",
    category: "Enterprise Software",
    description:
      "A digital workshop platform that uses AI to cluster ideas, extract themes, and accelerate innovation sessions",
    challenge:
      "Innovation workshops are powerful for generating ideas but painful to run — manual facilitation, sticky notes that get lost, synthesis that takes weeks, and insights that never leave the whiteboard. Traditional workshops are hard to scale and impossible to run asynchronously across distributed teams.",
    solution:
      "Built Amble Ideation, an AI-powered digital workshop platform enabling virtual collaboration with real-time transcription, intelligent clustering of ideas using NLP, automated insight extraction and theme identification, and connection mapping between concepts. Platform supports async and sync sessions across time zones.",
    results: [
      { metric: "Real-time", label: "AI-powered idea clustering" },
      { metric: "Async", label: "Workshop capability across time zones" },
      { metric: "Minutes", label: "Insight delivery (was weeks)" },
      { metric: "Automated", label: "Theme extraction and connection mapping" },
    ],
    testimonial:
      "Amble took our workshop practice from whiteboards and sticky notes to a real platform. The AI clustering surfaces connections we would have missed entirely.",
    testimonialAuthor: "Innovation Workshop Facilitator",
    features: [
      "Real-time collaborative digital canvas",
      "AI-powered idea clustering and theme extraction",
      "Automated affinity mapping and connection analysis",
      "Integration with knowledge management systems",
      "Executive insight reports with visualizations",
      "Async workshop capability for global teams",
    ],
    gradient: "from-purple-500 to-indigo-600",
    screenshot: "/images/case-studies/amble-hero.png",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "ai-content-automation",
    title: "TrueLetter – Programmatic AI Content Engine",
    category: "Content Automation",
    description:
      "AI-generated content at scale to drive organic growth and capture long-tail search traffic",
    challenge:
      "E-commerce aggregator needed thousands of unique product pages for SEO but had limited content writers. Manual approach would take years and cost heavily. Competitors launching content daily while rankings declined. Google's helpful content update demanded high-quality, unique content at scale.",
    solution:
      "Built end-to-end AI content pipeline that scrapes product data from multiple sources, analyzes reviews using sentiment models, generates unique long-form content with E-E-A-T signals, creates comparison tables and buying guides programmatically, and optimizes for featured snippets. Includes quality scoring, plagiarism detection, and human review workflow.",
    results: [
      { metric: "At scale", label: "Pages generated programmatically" },
      { metric: "Strong", label: "Organic traffic growth trend" },
      { metric: "98%+", label: "Uniqueness score" },
      { metric: "<$1", label: "Cost per page (was $200)" },
    ],
    testimonial:
      "This AI engine accomplished in months what would've taken our team years. We went from invisible to competing for long-tail searches across our entire catalog.",
    testimonialAuthor: "VP Growth, E-commerce Aggregator",
    features: [
      "Multi-source product data aggregation",
      "Review mining with sentiment analysis",
      "E-E-A-T optimization for Google guidelines",
      "Dynamic comparison table generation",
      "Programmatic FAQ and buying guide creation",
      "Featured snippet optimization",
      "Plagiarism detection and uniqueness scoring",
    ],
    gradient: "from-orange-500 to-yellow-600",
    screenshot: "/images/case-studies/trueletter-hero.png",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "ai-operations-intelligence",
    title: "Oak Chips Inc – AI-Powered Sales & Operations Intelligence",
    category: "Manufacturing / Wine & Spirits",
    description:
      "How AI agents are transforming sales enablement, market intelligence, and operational efficiency for a specialty oak products manufacturer",
    challenge:
      "Oak alternative products manufacturer with concentrated customer base and manual operations across the board. Sales team had no systematic way to research prospects, track market signals, or identify opportunities in a $500M+ addressable market. Manual order processing, paper-based compliance, and limited visibility into territory performance.",
    solution:
      "Deploying a comprehensive AI agent system: sales intelligence agents that research wineries, track industry signals, and generate territory plans; operational agents for email triage, order processing, and compliance documentation; marketing agents for content creation, social media, and email automation. Building toward an AI-powered product recommendation engine for winemakers.",
    results: [
      { metric: "60+", label: "Automation opportunities identified" },
      { metric: "48 hrs", label: "Full operations audit completed" },
      { metric: "AI agents", label: "Being deployed across sales, ops, marketing" },
      { metric: "In progress", label: "Oak recommendation engine for winemakers" },
    ],
    testimonial:
      "The depth of analysis in the first 48 hours was unlike anything we've seen. The AI identified opportunities across our entire operation that we hadn't considered.",
    testimonialAuthor: "Operations, Oak Products Manufacturer",
    features: [
      "AI-powered prospect research and territory planning",
      "Market signal monitoring and buying intent detection",
      "Email triage and automated response drafting",
      "Product recommendation engine for winemakers",
      "Content and social media automation",
      "Compliance and audit documentation assistance",
      "Customer analytics and churn prediction",
    ],
    gradient: "from-amber-500 to-orange-600",
    screenshot: "/images/case-studies/oci-hero.png",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}
