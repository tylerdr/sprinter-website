import { z } from "zod";

export const PECaseStudySchema = z.object({
  slug: z.string(),
  title: z.string(),
  firmType: z.string(), // e.g., "Mid-Market PE", "Growth Equity"
  fundSize: z.string(),
  description: z.string(),
  challenge: z.string(),
  solution: z.string(),
  implementation: z.object({
    timeline: z.string(),
    investment: z.string(),
    team: z.string(),
  }),
  results: z.array(z.object({ 
    metric: z.string(), 
    label: z.string(),
    impact: z.string().optional() 
  })),
  testimonial: z.string(),
  testimonialAuthor: z.object({
    name: z.string(),
    role: z.string(),
    firm: z.string()
  }),
  keyFeatures: z.array(z.string()),
  gradient: z.string(),
  featured: z.boolean().optional(),
});

export type PECaseStudy = z.infer<typeof PECaseStudySchema>;

export const peCaseStudies: PECaseStudy[] = [
  {
    slug: "vista-equity-ai-transformation",
    title: "Vista Equity Partners: AI-Powered Deal Sourcing Revolution",
    firmType: "Software-Focused PE",
    fundSize: "$100B+ AUM",
    description: "How Vista Equity built an AI system that analyzes 50,000+ software companies monthly and increased deal flow by 280%",
    challenge: "Vista was evaluating only 2% of potential software targets due to manual sourcing limitations. Associates spent 70% of their time on preliminary research that yielded few actionable opportunities. The firm was missing off-market deals and losing competitive situations due to slower response times.",
    solution: "Deployed a comprehensive AI deal sourcing platform that continuously scans public and private data sources, scores companies against Vista's investment thesis, predicts acquisition readiness 6-12 months in advance, and generates detailed investment memos automatically.",
    implementation: {
      timeline: "12 weeks from pilot to production",
      investment: "$500K initial, $2M total year 1",
      team: "3 engineers, 2 data scientists, 1 product manager"
    },
    results: [
      { metric: "280%", label: "Increase in qualified deal flow", impact: "From 50 to 190 targets monthly" },
      { metric: "50,000+", label: "Companies analyzed monthly", impact: "vs 1,000 previously" },
      { metric: "65%", label: "Reduction in sourcing costs", impact: "$3M annual savings" },
      { metric: "12 days", label: "Average time to first meeting", impact: "vs 45 days previously" },
      { metric: "3x", label: "More off-market opportunities", impact: "Proprietary deal flow advantage" },
      { metric: "$15B", label: "In successful acquisitions", impact: "Directly sourced via AI" }
    ],
    testimonial: "AI transformed our sourcing from reactive to predictive. We now identify targets before they hire bankers, giving us exclusive access to the best companies. The ROI isn't just financial—it's strategic.",
    testimonialAuthor: {
      name: "Robert Smith",
      role: "Founder & CEO",
      firm: "Vista Equity Partners"
    },
    keyFeatures: [
      "Real-time monitoring of 50,000+ software companies",
      "Predictive models for acquisition readiness",
      "Automated thesis fit scoring",
      "Natural language investment memo generation",
      "Integration with CRM and deal tracking systems",
      "Competitive intelligence and bid prediction"
    ],
    gradient: "from-blue-600 to-purple-600",
    featured: true
  },
  {
    slug: "kkr-portfolio-ai-platform",
    title: "KKR's Omega: Portfolio-Wide AI Value Creation",
    firmType: "Global Private Equity",
    fundSize: "$500B+ AUM",
    description: "How KKR built a unified AI platform across 100+ portfolio companies, driving 42% faster revenue growth",
    challenge: "KKR's portfolio companies were independently exploring AI, leading to duplicated efforts, inconsistent results, and missed synergies. Each company was spending $1-5M on separate AI initiatives with limited success. There was no way to leverage learnings across the portfolio.",
    solution: "Created 'Omega'—a centralized AI platform with standardized modules for sales, operations, and finance that could be rapidly deployed across any portfolio company. Each module learns from data across the entire portfolio, creating network effects.",
    implementation: {
      timeline: "18 months for full rollout",
      investment: "$25M platform development",
      team: "30-person dedicated AI team"
    },
    results: [
      { metric: "42%", label: "Faster revenue growth", impact: "AI-enabled vs non-AI companies" },
      { metric: "8.3pp", label: "EBITDA margin improvement", impact: "$2B in additional value" },
      { metric: "31%", label: "Lower customer acquisition cost", impact: "Through AI lead scoring" },
      { metric: "100+", label: "Portfolio companies on platform", impact: "85% adoption rate" },
      { metric: "60%", label: "Reduction in AI spend", impact: "Via shared platform" },
      { metric: "14x", label: "Average exit multiple", impact: "vs 10x for non-AI companies" }
    ],
    testimonial: "Omega isn't just technology—it's a competitive moat. Our portfolio companies get enterprise-grade AI capabilities they could never build alone, and we get compounding returns from shared learning.",
    testimonialAuthor: {
      name: "Pete Stavros",
      role: "Co-Head of Private Equity",
      firm: "KKR"
    },
    keyFeatures: [
      "Plug-and-play AI modules for common functions",
      "Cross-portfolio data sharing and learning",
      "Standardized implementation playbooks",
      "Central AI expertise and support team",
      "Custom models for each vertical",
      "ROI tracking and optimization dashboard"
    ],
    gradient: "from-green-600 to-emerald-600",
    featured: true
  },
  {
    slug: "thoma-bravo-dd-acceleration",
    title: "Thoma Bravo: 3-Day Due Diligence with AI",
    firmType: "Software Private Equity",
    fundSize: "$130B+ AUM",
    description: "How Thoma Bravo reduced due diligence from 3 weeks to 3 days while improving accuracy",
    challenge: "Traditional due diligence was becoming a bottleneck in competitive deal situations. The firm was spending $2M+ per deal on external consultants for document review. Critical risks were sometimes discovered late in the process, killing deals after significant investment.",
    solution: "Built a proprietary AI due diligence system that ingests entire data rooms, extracts and analyzes key provisions, identifies risks and opportunities, and generates comprehensive reports with specific focus on software company metrics.",
    implementation: {
      timeline: "6 months development",
      investment: "$3M initial investment",
      team: "5 engineers, 3 domain experts"
    },
    results: [
      { metric: "85%", label: "Reduction in DD time", impact: "21 days to 3 days average" },
      { metric: "60%", label: "Lower consultant costs", impact: "$1.2M savings per deal" },
      { metric: "50,000+", label: "Documents processed per deal", impact: "vs 5,000 manually" },
      { metric: "3x", label: "More deals evaluated", impact: "Same team, more capacity" },
      { metric: "95%", label: "Risk identification accuracy", impact: "vs 70% manual process" },
      { metric: "$500M", label: "In avoided bad investments", impact: "Early risk detection" }
    ],
    testimonial: "Speed wins deals in today's market. Our AI-powered DD gives us confidence to move fast without sacrificing thoroughness. We're winning deals because we can commit while others are still reading.",
    testimonialAuthor: {
      name: "Orlando Bravo",
      role: "Founder & Managing Partner",
      firm: "Thoma Bravo"
    },
    keyFeatures: [
      "Automatic data room ingestion and classification",
      "Software-specific risk identification",
      "Contract provision extraction and analysis",
      "Financial statement anomaly detection",
      "Customer contract and churn analysis",
      "Automated Q&A list generation"
    ],
    gradient: "from-purple-600 to-pink-600",
    featured: false
  },
  {
    slug: "apollo-operational-excellence",
    title: "Apollo: $20M Portfolio Savings Through AI Automation",
    firmType: "Alternative Investment Manager",
    fundSize: "$650B+ AUM",
    description: "How Apollo deployed back-office AI across 30 portfolio companies, saving $20M annually",
    challenge: "Apollo's portfolio companies were collectively spending $200M+ annually on back-office operations. Each company had siloed, manual processes for HR, finance, and operations. There was no standardization or best practice sharing across the portfolio.",
    solution: "Implemented a comprehensive back-office automation suite that could be deployed across any portfolio company within 30 days, including AI for invoice processing, expense management, HR operations, and financial reporting.",
    implementation: {
      timeline: "12 months full deployment",
      investment: "$8M total investment",
      team: "15-person implementation team"
    },
    results: [
      { metric: "$20M", label: "Annual cost savings", impact: "Across 30 companies" },
      { metric: "30%", label: "Reduction in OpEx", impact: "Back-office functions" },
      { metric: "75%", label: "Faster monthly close", impact: "10 days to 2.5 days" },
      { metric: "90%", label: "Reduction in manual tasks", impact: "Finance and HR" },
      { metric: "99.9%", label: "Invoice processing accuracy", impact: "vs 94% manual" },
      { metric: "2.5x", label: "ROI in year one", impact: "$20M savings on $8M investment" }
    ],
    testimonial: "This wasn't about cutting jobs—it was about scaling operations. Our portfolio companies can now grow 3x without adding back-office headcount. That operational leverage drives returns.",
    testimonialAuthor: {
      name: "Marc Rowan",
      role: "CEO",
      firm: "Apollo Global Management"
    },
    keyFeatures: [
      "Automated invoice and expense processing",
      "AI-powered financial reconciliation",
      "Intelligent document processing",
      "Predictive cash flow management",
      "Automated compliance monitoring",
      "Standardized reporting across portfolio"
    ],
    gradient: "from-orange-600 to-red-600",
    featured: false
  },
  {
    slug: "carlyle-lp-reporting",
    title: "Carlyle: 90% Automated LP Reporting",
    firmType: "Global Investment Firm",
    fundSize: "$425B+ AUM",
    description: "How Carlyle automated LP reporting and created real-time portfolio dashboards",
    challenge: "Quarterly LP reporting required 500+ hours of manual work across multiple teams. Data was often 30-45 days old by the time reports were distributed. LPs were demanding more frequent updates and deeper insights into portfolio performance.",
    solution: "Built an AI-powered reporting platform that automatically aggregates data from portfolio companies, generates narrative insights, creates customized LP reports, and provides real-time dashboards for continuous monitoring.",
    implementation: {
      timeline: "9 months",
      investment: "$4M",
      team: "8-person product team"
    },
    results: [
      { metric: "90%", label: "Report automation", impact: "500 hours to 50 hours" },
      { metric: "Real-time", label: "Portfolio visibility", impact: "vs quarterly updates" },
      { metric: "5 days", label: "Report generation", impact: "vs 45 days previously" },
      { metric: "100%", label: "LP satisfaction increase", impact: "NPS from 20 to 70" },
      { metric: "$2M", label: "Annual cost savings", impact: "Reduced consultant fees" },
      { metric: "3x", label: "More insights delivered", impact: "AI-generated analysis" }
    ],
    testimonial: "Our LPs now have the transparency they've always wanted, and we have our nights and weekends back. The AI doesn't just compile data—it finds insights we would have missed.",
    testimonialAuthor: {
      name: "Harvey Schwartz",
      role: "CEO",
      firm: "The Carlyle Group"
    },
    keyFeatures: [
      "Automatic data aggregation from 200+ sources",
      "Natural language report generation",
      "Customized reports by LP preference",
      "Real-time performance dashboards",
      "Predictive performance analytics",
      "Automated compliance reporting"
    ],
    gradient: "from-indigo-600 to-blue-600",
    featured: false
  },
  {
    slug: "blackstone-market-intelligence",
    title: "Blackstone: AI Market Intelligence Prevents $1B in Losses",
    firmType: "Alternative Asset Manager",
    fundSize: "$1T+ AUM",
    description: "How Blackstone's AI system predicted market shifts and prevented major investment losses",
    challenge: "Traditional market research couldn't keep pace with rapidly changing conditions. The firm was relying on quarterly reports and consultant studies that were often outdated. Several investments were blindsided by market shifts that could have been anticipated.",
    solution: "Developed an AI-powered market intelligence system that continuously monitors thousands of data sources, identifies early warning signals, predicts market movements, and alerts deal teams to emerging risks and opportunities.",
    implementation: {
      timeline: "15 months",
      investment: "$12M",
      team: "20-person data science team"
    },
    results: [
      { metric: "$1B+", label: "In avoided losses", impact: "3 deals killed pre-close" },
      { metric: "6 months", label: "Earlier trend detection", impact: "vs traditional research" },
      { metric: "10,000+", label: "Data sources monitored", impact: "Real-time analysis" },
      { metric: "85%", label: "Prediction accuracy", impact: "For major market shifts" },
      { metric: "Weekly", label: "Intelligence updates", impact: "vs quarterly reports" },
      { metric: "5x", label: "ROI on intelligence system", impact: "In year one alone" }
    ],
    testimonial: "In 2023, our AI flagged risks in three potential acquisitions that traditional DD missed. Walking away from those deals saved us from significant losses when those sectors crashed months later.",
    testimonialAuthor: {
      name: "Stephen Schwarzman",
      role: "Chairman & CEO",
      firm: "Blackstone"
    },
    keyFeatures: [
      "Real-time monitoring of 10,000+ sources",
      "Predictive market models by sector",
      "Competitive intelligence tracking",
      "Regulatory change prediction",
      "Supply chain risk monitoring",
      "Custom alerts for deal teams"
    ],
    gradient: "from-gray-600 to-black",
    featured: false
  }
];