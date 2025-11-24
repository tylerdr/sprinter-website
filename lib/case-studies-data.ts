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

// PE case studies - Portfolio value creation stories
export const peCaseStudies: CaseStudy[] = [
  {
    slug: "pe-portfolio-ap-automation",
    title: "Lower-Middle-Market PE Firm – Portfolio-Wide AP Automation",
    category: "Private Equity Implementation",
    description:
      "How a 10-day sprint turned into 8 portfolio company rollouts, $3.2M in annual savings, and a repeatable playbook for the fund's value creation playbook",
    challenge:
      "Lower-middle-market PE firm with $800M AUM managing 12 portfolio companies across manufacturing, distribution, and services. Each portco running different ERP systems (NetSuite, SAP Business One, QuickBooks Enterprise). AP teams drowning in invoice processing—average 15 days to payment, 8% early payment discount loss, and 2.5 FTEs per portco dedicated to manual entry. Operating partners knew AI could help but had no bandwidth to evaluate vendors or manage implementations across diverse tech stacks.",
    solution:
      "Deployed The Sprinter Method™ starting with a single manufacturing portco as proof of concept. 10-day sprint delivered 65% touchless AP processing with existing ERP—no API required. Built repeatable playbook documenting integration patterns for each ERP variant. Rolled out to 7 additional portcos over 6 months using internal champions trained during initial sprint. Established fund-level AI governance framework for future implementations.",
    results: [
      { metric: "$3.2M", label: "Annual savings across portfolio" },
      { metric: "65%", label: "Average touchless processing rate" },
      { metric: "8", label: "Portfolio companies automated" },
      { metric: "12 days", label: "Reduced time-to-payment (from 15)" },
      { metric: "2.1×", label: "ROI in first 90 days" },
      { metric: "18", label: "FTE hours/week reclaimed per portco" },
    ],
    testimonial:
      "The first sprint paid for itself in 6 weeks. But the real value was the playbook—we've now rolled this out to 8 companies with minimal Sprinter involvement. That portfolio multiplier effect is exactly what we needed as operating partners.",
    testimonialAuthor: "Operating Partner, $800M PE Fund",
    features: [
      "No-API Advantage™ implementation (works with any ERP)",
      "10-day proof-of-concept sprint at single portco",
      "Reusable integration playbook for ERP variants",
      "Internal champion training for self-service rollout",
      "Fund-level AI governance framework",
      "Quarterly portfolio AI reviews",
      "Vendor-neutral technology selection",
      "Board-ready ROI reporting templates",
    ],
    gradient: "from-blue-500 to-indigo-600",
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "pe-due-diligence-save",
    title: "Growth Equity Fund – Technical Diligence That Saved $15M",
    category: "PE Due Diligence",
    description:
      "How 5-day technical AI diligence uncovered critical data quality issues and saved a fund from a problematic acquisition",
    challenge:
      "Growth equity fund evaluating $45M acquisition of a 'AI-powered' SaaS platform in the logistics space. Target claimed proprietary machine learning models driving 40% of revenue. Fund's deal team lacked technical depth to validate AI claims. Previous diligence provider delivered 80-page report that raised more questions than answers. Deal had 30-day exclusivity window ticking.",
    solution:
      "Deployed rapid technical diligence team for 5-day deep dive. Examined actual ML model architecture, training data quality, and technical debt. Discovered: models were actually rule-based heuristics marketed as 'AI', core training data had 23% label accuracy issues, and 'proprietary' tech was largely open-source with minimal customization. Provided board-ready report with go/no-go recommendation and specific concerns.",
    results: [
      { metric: "$15M+", label: "Avoided overpayment" },
      { metric: "5 days", label: "Complete diligence turnaround" },
      { metric: "23%", label: "Data quality issues uncovered" },
      { metric: "0", label: "Actual proprietary ML (vs claimed)" },
      { metric: "3", label: "Critical risks identified" },
      { metric: "$45M", label: "Deal walked away from" },
    ],
    testimonial:
      "Sprinter's diligence literally saved us from a disaster. What the target called 'AI' was smoke and mirrors. The 5-day turnaround let us exit gracefully within our exclusivity window. We've now made them our standard diligence partner for any AI-related acquisition.",
    testimonialAuthor: "Partner, Growth Equity Fund",
    features: [
      "5-day rapid technical diligence",
      "ML model architecture review",
      "Training data quality assessment",
      "Technical debt quantification",
      "IP and open-source dependency analysis",
      "Board-ready executive summary",
      "Go/no-go recommendation with rationale",
      "100-day integration plan (if proceeding)",
    ],
    gradient: "from-red-500 to-orange-600",
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "pe-quote-intelligence",
    title: "Industrial Services PE – Quote Intelligence Platform",
    category: "Private Equity Implementation",
    description:
      "How AI-powered quote optimization added $4.8M to EBITDA across 5 industrial services portfolio companies",
    challenge:
      "Middle-market PE firm with 5 industrial services portfolio companies (HVAC, electrical, plumbing). Collective $180M revenue but leaving money on the table with inconsistent quoting. Each company using different methods—spreadsheets, tribal knowledge, gut feel. Win rates varied 15-45% across companies. No visibility into why deals were won or lost. Operating team suspected pricing optimization could add 2-3% margin but had no data to prove it or tools to implement.",
    solution:
      "Built centralized quote intelligence platform using The Sprinter Method™. Aggregated 3 years of historical quote data across all 5 portcos. Trained ML models on win/loss patterns, identifying optimal pricing corridors by job type, customer segment, and competitive context. Deployed AI-assisted quoting tool that suggests pricing with confidence scores. Implemented feedback loop for continuous model improvement.",
    results: [
      { metric: "$4.8M", label: "EBITDA improvement (Year 1)" },
      { metric: "38%", label: "Average win rate (was 28%)" },
      { metric: "2.7%", label: "Margin improvement" },
      { metric: "42%", label: "Quote cycle time reduction" },
      { metric: "5", label: "Portfolio companies on platform" },
      { metric: "89%", label: "Estimator adoption rate" },
    ],
    testimonial:
      "We knew pricing was an opportunity but couldn't quantify it. Sprinter not only proved the $4.8M opportunity existed—they captured it. The cross-portfolio data advantage is something no individual company could have built alone.",
    testimonialAuthor: "Managing Director, Industrial Services PE",
    features: [
      "Cross-portfolio data aggregation",
      "ML-powered pricing optimization",
      "Win/loss pattern analysis",
      "Competitive intelligence integration",
      "Real-time confidence scoring",
      "Estimator training and adoption program",
      "Continuous model improvement feedback loop",
      "Executive dashboard with margin analytics",
    ],
    gradient: "from-green-500 to-teal-600",
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "pe-fund-ai-strategy",
    title: "Middle-Market PE – Fund-Level AI Operating Model",
    category: "PE Advisory",
    description:
      "How a $1.2B fund built centralized AI capabilities that drove $18M in portfolio value creation within 18 months",
    challenge:
      "Middle-market PE fund with $1.2B AUM and 15 portfolio companies frustrated by AI fragmentation. Each portco making independent AI investments—duplicating vendor relationships, wasting money on failed pilots, and missing opportunities for knowledge sharing. Fund-level operating team had no visibility into AI initiatives. LPs asking about AI strategy with no coherent answer. Estimated $2M annually wasted on redundant tools and failed implementations.",
    solution:
      "Established AI Operating Partner engagement at fund level. Conducted portfolio-wide AI maturity assessment using AI Readiness Index™. Built centralized AI roadmap prioritizing highest-ROI opportunities across holdings. Negotiated fund-level vendor relationships (40% cost reduction). Created AI Center of Excellence with playbooks, governance frameworks, and quarterly portfolio reviews. Launched internal AI champions network for knowledge sharing.",
    results: [
      { metric: "$18M", label: "Portfolio value created (18 months)" },
      { metric: "40%", label: "Vendor cost reduction" },
      { metric: "15", label: "Portfolio companies assessed" },
      { metric: "8", label: "AI implementations launched" },
      { metric: "$2M", label: "Annual waste eliminated" },
      { metric: "12", label: "Internal AI champions trained" },
    ],
    testimonial:
      "Sprinter helped us go from AI chaos to AI strategy. We now have a coherent story for LPs, a playbook that works across our portfolio, and $18M in documented value creation. The fund-level approach was exactly right—no single portco could have achieved this alone.",
    testimonialAuthor: "Head of Operations, $1.2B PE Fund",
    features: [
      "Portfolio-wide AI Readiness Index™ assessment",
      "Centralized AI roadmap and prioritization",
      "Fund-level vendor negotiations",
      "AI Center of Excellence establishment",
      "Governance Stack™ framework deployment",
      "Quarterly portfolio AI reviews",
      "Internal champions training program",
      "LP-ready AI strategy documentation",
    ],
    gradient: "from-purple-500 to-violet-600",
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
  {
    slug: "pe-healthcare-automation",
    title: "Healthcare PE – Revenue Cycle AI Transformation",
    category: "Private Equity Implementation",
    description:
      "How AI-powered revenue cycle automation reduced denials by 34% and accelerated collections by $8.2M annually across 4 specialty practices",
    challenge:
      "Healthcare-focused PE firm with 4 specialty practice portfolio companies (orthopedics, cardiology, dermatology, pain management). Collective $95M revenue but hemorrhaging money on revenue cycle inefficiencies. Average denial rate of 18%, 45-day average AR, and 4.2 FTEs per practice dedicated to billing follow-up. Staff spending 60% of time on administrative tasks instead of patient care. Payer rule complexity making manual processes unsustainable.",
    solution:
      "Implemented AI-powered revenue cycle platform across all 4 practices using The Sprinter Method™. Deployed prior authorization automation reducing approval time from 5 days to 4 hours. Built denial prediction models identifying at-risk claims before submission. Created intelligent claim scrubbing with payer-specific rule engines. Established automated follow-up workflows for outstanding AR.",
    results: [
      { metric: "$8.2M", label: "Annual collection acceleration" },
      { metric: "34%", label: "Denial rate reduction" },
      { metric: "28 days", label: "Average AR (was 45)" },
      { metric: "4 hours", label: "Prior auth time (was 5 days)" },
      { metric: "12.5", label: "FTE hours/week reclaimed per practice" },
      { metric: "96%", label: "First-pass claim acceptance" },
    ],
    testimonial:
      "Revenue cycle was our biggest operational headache across the portfolio. Sprinter's healthcare AI expertise was evident from day one—they understood payer complexity and built solutions that actually work. The $8.2M impact speaks for itself.",
    testimonialAuthor: "Operating Partner, Healthcare PE Fund",
    features: [
      "Prior authorization automation",
      "Denial prediction and prevention",
      "Intelligent claim scrubbing",
      "Payer-specific rule engines",
      "Automated AR follow-up workflows",
      "Real-time eligibility verification",
      "Cross-practice benchmarking",
      "Compliance and audit trail documentation",
    ],
    gradient: "from-cyan-500 to-blue-600",
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
];

// Family Office & Strategic Advisory case studies
export const familyOfficeCaseStudies: CaseStudy[] = [
  {
    slug: "family-office-ai-transformation",
    title: "Multi-Billion Family Office – Portfolio-Wide AI Strategy & Governance",
    category: "Family Office Advisory",
    description:
      "How fractional CAIO engagement transformed 8 portfolio holdings, created $12M in new value, and built board-level AI governance across $2.3B in AUM",
    challenge:
      "Multi-generational family office managing $2.3B across 8 diverse holdings (manufacturing, healthcare services, real estate, fintech) lacked cohesive AI strategy. Each portfolio company making independent AI decisions—overpaying vendors, duplicating efforts, missing synergies. Board lacked framework to evaluate AI investments. No shared learnings across holdings. Result: $4M wasted on redundant tools, missed competitive opportunities, and growing governance liability.",
    solution:
      "Deployed Fractional Chief AI Officer delivering C-suite AI leadership across the family office structure. Conducted portfolio-wide AI capability audits across all 8 holdings, established board-level governance framework with investment criteria, standardized vendor evaluation reducing cost through negotiation leverage, launched quarterly portfolio CEO AI roundtables for knowledge sharing, implemented technical diligence on 3 potential acquisitions ($50M+), and built centralized AI knowledge base accessible across holdings.",
    results: [
      { metric: "$12M", label: "New value created across portfolio" },
      { metric: "60%", label: "Vendor cost reduction through standardization" },
      { metric: "3", label: "Acquisition offers declined (poor AI diligence)" },
      { metric: "45%", label: "Average automation rate across portcos" },
      { metric: "2.1×", label: "Average EBITDA improvement" },
      { metric: "8", label: "AI governance policies established" },
    ],
    testimonial:
      "Bringing on a fractional CAIO was the best governance decision we've made in a decade. Tyler brought practitioner credibility our board trusted, saved us from three bad acquisitions, and helped our portfolio companies gain unfair competitive advantage through AI. The ROI is extraordinary—we're now deploying AI strategically instead of reactively.",
    testimonialAuthor: "Principal, $2.3B Multi-Generational Family Office",
    features: [
      "Quarterly board strategy sessions with AI landscape updates",
      "Portfolio-wide AI capability audits (6-dimension scorecard)",
      "Standardized vendor evaluation and negotiation",
      "Technical diligence on 3 potential acquisitions",
      "CEO roundtables for cross-portfolio knowledge sharing",
      "Governance framework development (8 policies)",
      "Investment committee training on AI due diligence",
      "Centralized AI vendor relationships and volume pricing",
    ],
    gradient: "from-violet-500 to-purple-600",
    screenshot: "/images/products/ai-architecture-diagram.svg",
    architectureDiagram: "/images/products/ai-architecture-diagram.svg",
  },
];

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
