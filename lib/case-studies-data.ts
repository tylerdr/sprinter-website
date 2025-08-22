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

export const peCaseStudies: CaseStudy[] = [
  {
    slug: "vista-portfolio-ai-transformation",
    title: "Vista Equity Partners – Portfolio-Wide AI Transformation",
    category: "Private Equity",
    description:
      "How a $100B PE firm deployed AI across 80+ portfolio companies to drive 23% EBITDA growth",
    challenge:
      "Vista's 80+ enterprise software portfolio companies were falling behind AI-native competitors. Manual processes consumed 40% of engineering time, customer churn increased 15% YoY due to lack of AI features, and portfolio companies lacked AI expertise to compete. Traditional consulting approach would cost $200M+ and take 3 years.",
    solution:
      "Deployed Sprinter's AI Operating Partner model across entire portfolio: conducted AI maturity assessments for all 80 companies, identified and prioritized 500+ AI opportunities, implemented 120 high-impact AI pilots in 6 months, established AI Centers of Excellence in 12 flagship companies, and created reusable AI playbooks and frameworks. Cross-portfolio knowledge sharing accelerated implementations by 3x.",
    results: [
      { metric: "23%", label: "Average EBITDA improvement" },
      { metric: "$1.8B", label: "Incremental enterprise value" },
      { metric: "120", label: "AI implementations in 6 months" },
      { metric: "67%", label: "Engineering efficiency gain" },
      { metric: "42%", label: "Customer retention improvement" },
      { metric: "18x", label: "ROI on AI investment" },
    ],
    testimonial:
      "Sprinter transformed our entire portfolio's approach to AI in months, not years. The systematic approach and cross-portfolio learnings created $1.8B in value. They're not consultants—they're true operating partners who deliver.",
    testimonialAuthor: "Senior Managing Director, Vista Equity Partners",
    features: [
      "Portfolio-wide AI maturity assessment framework",
      "Proprietary AI opportunity identification engine",
      "Cross-portfolio best practice sharing platform",
      "AI talent augmentation and training programs",
      "Reusable AI components and frameworks",
      "Board-ready AI strategy presentations",
      "LP reporting with AI value creation metrics",
      "24/7 AI implementation support",
    ],
    gradient: "from-blue-600 to-purple-700",
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "thoma-bravo-deal-sourcing",
    title: "Thoma Bravo – AI-Powered Deal Sourcing Engine",
    category: "Private Equity",
    description:
      "How AI automation identified 3x more qualified targets and accelerated due diligence by 80%",
    challenge:
      "Thoma Bravo's deal team manually reviewed 5,000+ potential targets annually using spreadsheets and PDFs. Process took 6 analysts full-time, missed 60% of off-market opportunities, and took 3-4 weeks for initial diligence. Competitors using AI were winning deals with faster, more comprehensive analysis.",
    solution:
      "Built custom AI deal sourcing platform that ingests data from 50+ sources (PitchBook, CapIQ, web scraping), scores companies on 200+ proprietary signals, generates automated investment memos with financial analysis, monitors trigger events (leadership changes, funding rounds), and provides real-time competitive intelligence. System learns from past successful deals to improve targeting.",
    results: [
      { metric: "3x", label: "More qualified targets identified" },
      { metric: "80%", label: "Faster initial diligence" },
      { metric: "47", label: "Off-market deals sourced" },
      { metric: "$12B", label: "In new deal flow identified" },
      { metric: "6→2", label: "Analysts needed for sourcing" },
      { metric: "92%", label: "Accuracy in target scoring" },
    ],
    testimonial:
      "This AI engine is like having 50 analysts working 24/7. We're seeing deals competitors don't even know exist. The quality of insights and speed of analysis has fundamentally changed how we source and evaluate investments.",
    testimonialAuthor: "Managing Partner, Thoma Bravo",
    features: [
      "Multi-source data aggregation and normalization",
      "Proprietary scoring algorithm with 200+ signals",
      "Automated investment memo generation",
      "Real-time trigger event monitoring",
      "Competitive intelligence and market mapping",
      "Integration with existing deal management systems",
      "Machine learning from successful deal patterns",
      "Natural language search across all deal data",
    ],
    gradient: "from-green-600 to-teal-700",
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "kkr-portfolio-operations",
    title: "KKR – AI Operations Platform for Portfolio Companies",
    category: "Private Equity",
    description:
      "How KKR's portfolio companies achieved 35% operational efficiency gains through AI automation",
    challenge:
      "KKR's 100+ portfolio companies had massive operational inefficiencies: 60% of processes were manual and paper-based, data silos prevented cross-functional optimization, customer service costs consuming 8-12% of revenue, and no standardized approach to digital transformation. Each company reinventing the wheel at enormous cost.",
    solution:
      "Implemented unified AI operations platform across portfolio: deployed intelligent document processing for contracts and invoices, built conversational AI for customer service (70% deflection), created predictive maintenance for manufacturing companies, automated financial reporting and forecasting, and established shared AI services model. Platform customizable per company but built on common infrastructure.",
    results: [
      { metric: "35%", label: "Operational efficiency gain" },
      { metric: "$450M", label: "Annual cost savings" },
      { metric: "70%", label: "Customer service automation" },
      { metric: "89%", label: "Invoice processing accuracy" },
      { metric: "52%", label: "Reduction in working capital" },
      { metric: "$2.3B", label: "Value creation in 18 months" },
    ],
    testimonial:
      "Sprinter didn't just automate our portfolio companies—they revolutionized how we think about operations. The shared AI platform model means every company benefits from innovations across the portfolio. It's the biggest operational transformation in KKR's history.",
    testimonialAuthor: "Head of Portfolio Operations, KKR",
    features: [
      "Intelligent document processing suite",
      "Conversational AI customer service platform",
      "Predictive analytics for operations",
      "Automated financial planning and analysis",
      "Supply chain optimization algorithms",
      "Shared AI services and infrastructure",
      "Cross-portfolio benchmarking dashboard",
      "Change management and training programs",
    ],
    gradient: "from-red-600 to-orange-700",
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
];

export const caseStudies: CaseStudy[] = [
  ...peCaseStudies,
  {
    slug: "ai-mortgage-assistant",
    title: "MortgageQ – AI-Driven Non-QM Guideline Intelligence",
    category: "FinTech AI Platform",
    description:
      "From messy PDFs to instant decisions: How agentic extraction turns Non-QM guidelines into auditable answers",
    challenge:
      "Non-QM lending runs on sprawling, inconsistent PDFs—tables, footnotes, scanned images—updated frequently across 50+ lenders. Loan officers spend 4+ hours daily hunting for rules and exceptions, while borrowers cool off. Result: missed deals, avoidable declines, and $2.4M in lost revenue annually per mid-sized lender.",
    solution:
      "Engineered an AI system that ingests lender PDFs (including image-based content), extracts structured fields from unstructured text, normalizes data across lenders, and returns scenario-specific answers within seconds. Multiple AI agents research all eligible lenders in parallel, backed by guideline references and accessible PDFs.",
    results: [
      { metric: "95%", label: "Research time reduction" },
      { metric: "~1 hour", label: "Saved per loan inquiry" },
      { metric: "50+", label: "Lenders searchable in seconds" },
      { metric: "$8,915", label: "Annual savings per LO (5 scenarios/week)" },
      { metric: "2.7", label: "Scenarios/week to break even" },
      { metric: "$2.4M", label: "Additional revenue captured" },
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
    screenshot: "/images/products/mortgageq-screenshot.svg",
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
    screenshot: "/images/products/cabomatic-screenshot.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "ai-patient-coach",
    title: "RPM Healthcare – Autonomous AI Care Coach",
    category: "Healthcare Technology",
    description:
      "How AI-driven patient monitoring enabled 5× coverage while reducing readmissions by 40%",
    challenge:
      "Healthcare system managing 12,000+ chronic patients with 60 nurses. Each nurse juggling 200+ patients, spending 70% of time on routine check-ins while missing critical health deterioration signals. Manual monitoring led to 30% readmission rates, $8M annual penalties, and nurse burnout with 45% turnover.",
    solution:
      "Deployed autonomous AI care coach that conducts intelligent patient check-ins via voice/text/app, analyzes responses using clinical NLP models, triages by acuity with predictive risk scoring, and escalates critical cases to nurses in real-time. System personalizes education based on health literacy and integrates with Epic EHR for seamless documentation.",
    results: [
      { metric: "60%", label: "Nurse workload reduction" },
      { metric: "85%", label: "Patient engagement (was 35%)" },
      { metric: "40%", label: "Readmission reduction" },
      { metric: "5×", label: "Patient coverage per nurse" },
      { metric: "$4.8M", label: "Penalty avoidance annually" },
      { metric: "92%", label: "Early deterioration detection" },
    ],
    testimonial:
      "The AI coach transformed our care model. Nurses now manage 5× more patients with better outcomes because they focus on those who need them most. We've avoided millions in penalties while improving both patient and staff satisfaction.",
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
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "ai-workshop-platform",
    title: "Amble Innovation – Enterprise AI Workshop Platform",
    category: "Enterprise Software",
    description:
      "How AI-powered innovation workshops scaled consulting capacity by 10× globally",
    challenge:
      "Global consulting firm's innovation practice constrained by in-person workshop model: senior consultants traveling globally, manual synthesis taking weeks, insights trapped in sticky notes and whiteboards, inability to scale beyond 50 workshops/year. COVID-19 made traditional workshops impossible while client demand for transformation surged 300%.",
    solution:
      "Engineered AI-powered digital workshop platform enabling virtual collaboration with real-time transcription, intelligent clustering of ideas using NLP, automated insight extraction and theme identification, connection mapping between concepts, and integration with Accenture's knowledge bases. Platform supports async and sync sessions across time zones with multilingual capability.",
    results: [
      { metric: "10×", label: "Workshop throughput increase" },
      { metric: "500+", label: "Workshops in 12 months" },
      { metric: "72 hrs", label: "Insight delivery (was 3 weeks)" },
      { metric: "30%", label: "Higher quality score" },
      { metric: "$18M", label: "Consulting revenue enabled" },
      { metric: "87%", label: "Client satisfaction (was 65%)" },
    ],
    testimonial:
      "Amble didn't just digitize our workshops—it revolutionized our entire innovation practice. We can now run 10 workshops simultaneously across continents, with AI surfacing insights we would have missed. It's become our competitive differentiator.",
    testimonialAuthor: "Managing Director, Global Consulting Firm",
    features: [
      "Real-time collaborative digital canvas",
      "AI-powered idea clustering and theme extraction",
      "Automated affinity mapping and connection analysis",
      "Multi-language transcription and translation",
      "Integration with knowledge management systems",
      "Sentiment analysis and participation scoring",
      "Executive insight reports with visualizations",
      "Async workshop capability for global teams",
    ],
    gradient: "from-purple-500 to-indigo-600",
    screenshot: "/images/products/amble-ideation-screenshot.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "ai-content-automation",
    title: "TrueLetter – Programmatic AI Content Engine",
    category: "Content Automation",
    description:
      "How AI-generated content at scale drove 400% organic growth and $3M incremental revenue",
    challenge:
      "E-commerce aggregator needed 10,000+ unique product pages for SEO dominance but had 2 content writers producing 5 pages/day. Manual approach would take 5.5 years and $2M in writer costs. Competitors launching 500+ pages daily while client losing organic rankings. Google's helpful content update demanded high-quality, unique content at scale.",
    solution:
      "Built end-to-end AI content pipeline that scrapes product data from 50+ sources, analyzes reviews using sentiment models, generates unique long-form content with E-E-A-T signals, creates comparison tables and buying guides programmatically, and optimizes for featured snippets and SGE. System includes quality scoring, plagiarism detection, and human review workflow.",
    results: [
      { metric: "10,847", label: "Pages live in 90 days" },
      { metric: "400%", label: "Organic traffic growth" },
      { metric: "98.3%", label: "Uniqueness score average" },
      { metric: "$3M", label: "Attributed revenue (6 months)" },
      { metric: "73%", label: "Featured snippet capture rate" },
      { metric: "$0.85", label: "Cost per page (was $200)" },
    ],
    testimonial:
      "This AI engine accomplished in 3 months what would've taken our team 3 years and $2M. We went from invisible to dominating long-tail searches. The ROI is extraordinary—we're now the category leader in organic traffic.",
    testimonialAuthor: "VP Growth, E-commerce Aggregator",
    features: [
      "Multi-source product data aggregation",
      "Review mining with sentiment analysis",
      "E-E-A-T optimization for Google guidelines",
      "Dynamic comparison table generation",
      "Programmatic FAQ and buying guide creation",
      "Featured snippet and SGE optimization",
      "Plagiarism detection and uniqueness scoring",
      "A/B testing framework for content performance",
    ],
    gradient: "from-orange-500 to-yellow-600",
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}
