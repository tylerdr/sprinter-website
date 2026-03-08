// Centralized constants and configuration for the entire site

export const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID ?? "00000000-0000-0000-0000-000000000000";

export const COMPANY_INFO = {
  name: "Sprinter AI",
  tagline: "AI Agents That Run Your Operations",
  subTagline: "Deploy AI agents that handle quoting, invoicing, follow-ups, reporting, and more. Your team focuses on what matters.",
  description: "We deploy AI agent systems that automate your operations. Sprint-based implementations that ship working systems in weeks, not months. Empower your people to do their best work while AI agents handle the rest.",
  philosophy: "We implement AI to implement AI. Practitioners who build and ship, not consultants who advise.",
  founded: "2018",
  email: "hello@sprinter.ai",
  phone: "+1 (615) 601-0782",
  location: {
    state: "CA",
    country: "United States",
  },
  positioning: {
    primaryRole: "AI Agent Deployment",
    secondaryRole: "Operational Automation",
    differentiation: "Working AI agents in weeks, not slide decks in months."
  },
}

export const SOCIAL_LINKS = {
  twitter: "https://x.com/sprinter_hq",
  linkedin: "https://www.linkedin.com/company/sprinterconsulting/",
  github: "https://github.com/sprinterhq",
  email: `mailto:${COMPANY_INFO.email}`,
}

export const NAVIGATION = {
  main: [
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ],
  ctas: [
    {
      href: "https://cal.com/tyler-dreher",
      label: "Book a Free Strategy Call",
      variant: "default" as const,
      icon: "sparkles"
    }
  ],
  footer: {
    services: [
      { href: "/ai-assessment", label: "AI Assessment" },
      { href: "/services", label: "Agent Deployment" },
      { href: "/services", label: "All Services" },
    ],
    resources: [
      { href: "/case-studies", label: "Case Studies" },
      { href: "/blog", label: "Blog" },
      { href: "/labs", label: "Labs" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
};

export const METRICS = {
  projectsCompleted: "Multiple",
  averageSprintDuration: "2-4 weeks",
  clientRetention: "High",
  focusAreas: ["AI Agent Deployment", "Workflow Automation", "Document Intelligence", "Multi-Agent Systems"],
}

export const PRICING = {
  // ──── Active Offers ────
  assessment: {
    name: "AI Assessment",
    price: "Free — $2,500",
    duration: "1–2 weeks",
    description: "Identify your highest-value AI opportunities with a scored automation backlog and ROI roadmap.",
    includes: [
      "Operations audit across key workflows",
      "Top opportunities ranked by ROI",
      "Implementation roadmap and timeline",
      "Strategy call to review findings",
    ],
  },
  agentDeployment: {
    name: "Agent Deployment",
    price: "From $5K/mo",
    duration: "Monthly retainer",
    description: "We deploy and manage AI agents that handle your operational workload — quoting, invoicing, follow-ups, reporting, and more.",
    includes: [
      "Custom AI agent setup and configuration",
      "Ongoing management and optimization",
      "Performance monitoring and reporting",
      "Dedicated support and iteration",
    ],
  },
  customBuild: {
    name: "Custom Build",
    price: "Project-based",
    duration: "Scoped per engagement",
    description: "Bespoke AI systems built for your specific workflows. From document intelligence to multi-agent orchestration.",
    includes: [
      "Custom scoping and architecture",
      "Full build, test, and deploy",
      "Training and documentation",
      "Post-launch support",
    ],
  },

  // ──── Legacy (noindexed pages still reference these — do not remove until pages are deleted) ────
  aiAdvisor: { name: "AI Advisor Retainer", price: "Deprecated", duration: "", description: "", audience: "", includes: [] as string[], notIncluded: [] as string[] },
  fractionalCAIO: { name: "Fractional CAIO", price: "Deprecated", duration: "", description: "", audience: "", includes: [] as string[] },
  workshop: { name: "Workshop", price: "Deprecated", duration: "", description: "", includes: [] as string[] },
  wedgeSprint: { name: "Wedge Sprint", price: "Deprecated", duration: "", description: "", includes: [] as string[] },
  retainer: { name: "Retainer", price: "Deprecated", duration: "", description: "", includes: [] as string[] },
  transformation: { name: "Transformation", price: "Deprecated", duration: "", description: "", includes: [] as string[] },
  education: {
    name: "Education",
    boardEducation: { name: "Board Education", price: "Deprecated", duration: "", description: "" },
    icTraining: { name: "IC Training", price: "Deprecated", duration: "", description: "" },
    executiveBootcamp: { name: "Executive Bootcamp", price: "Deprecated", duration: "", description: "" },
    managerLab: { name: "Manager Lab", price: "Deprecated", duration: "", description: "" },
    portfolioDay: { name: "Portfolio Day", price: "Deprecated", duration: "", description: "" },
    governanceWorkshop: { name: "Governance Workshop", price: "Deprecated", duration: "", description: "" },
  },
  addOns: {
    portfolioAudit: { name: "Portfolio Audit", price: "Deprecated", duration: "", description: "", includes: [] as string[] },
    diligenceOnDemand: { name: "Diligence On Demand", price: "Deprecated", duration: "", description: "", includes: [] as string[] },
    governanceFramework: { name: "Governance Framework", price: "Deprecated", duration: "", description: "", includes: [] as string[] },
    annualRetainer: { name: "Annual Retainer", price: "Deprecated", duration: "", description: "", includes: [] as string[] },
  },
  bundles: {
    caioGovernance: { name: "CAIO + Governance", price: "Deprecated", duration: "", description: "", includes: [] as string[] },
    advisorDiligence: { name: "Advisor + Diligence", price: "Deprecated", duration: "", description: "", includes: [] as string[] },
  },
  venture: { price: "Deprecated", duration: "" },
  speaking: { price: "Deprecated" },
  training: { price: "Deprecated" },
  consulting: { price: "Deprecated" },
}

export const CLIENTS = [
  "ADG / Cab-O-Matic",
  "Oak Chips Inc",
  "Amble Ideation",
  "MortgageQ",
]

export const SEO = {
  title: "Sprinter AI — AI Agents That Run Your Operations",
  description: "We deploy AI agent systems that handle quoting, invoicing, follow-ups, reporting, and more. Working systems in weeks, not months. Empower your team with AI.",
  keywords: "AI agents, AI automation, business automation, AI agent deployment, workflow automation, document intelligence, AI consulting",
  ogImage: "/og-image.png",
  siteUrl: "https://sprinter.ai",
  twitterHandle: "@sprinter_hq",
  organizationType: "Organization" as const,
  author: "Sprinter AI",
}

// Page-specific SEO metadata
export const PAGE_SEO = {
  home: {
    title: "Sprinter AI — AI Agents That Run Your Operations 24/7",
    description: "We deploy AI agent systems that handle quoting, invoicing, follow-ups, reporting, and data entry. Working systems in weeks. Empower your team with AI.",
    keywords: "AI agents, AI automation, business automation, AI agent deployment, workflow automation, AI for business",
    ogTitle: "Sprinter AI — AI Agents That Run Your Operations",
  },
  about: {
    title: "About Sprinter AI — Empowering People with AI Agents",
    description: "From non-tech frustration to AI agent deployment. We use AI to implement AI — empowering individuals and businesses with an unlimited AI workforce.",
    keywords: "AI consulting, AI agent deployment, business AI, Tyler Dreher, Sprinter Consulting, AI automation",
    ogTitle: "About Sprinter AI — Empowering People with AI Agents",
  },
  services: {
    title: "AI Services — Sprint, Deploy, Scale | Sprinter AI",
    description: "AI Readiness Sprint ($2,500), Fractional AI Co-Founder (from $5K/mo), and Custom AI Systems. Empower your team with AI agents that work 24/7.",
    keywords: "AI services, AI readiness sprint, AI agent deployment, fractional AI, custom AI systems, business automation",
    ogTitle: "AI Services — Sprint, Deploy, Scale | Sprinter AI",
  },
  peServices: {
    title: "PE Services - AI Operating Partner for Private Equity | Sprinter AI",
    description: "AI implementation across portfolio companies with proven sprint-based methodology. Sprinter serves as your AI Operating Partner.",
    keywords: "private equity AI, PE operating partner, portfolio value creation, EBITDA improvement, AI transformation, portfolio optimization",
    ogTitle: "AI Operating Partner for Private Equity - Sprinter AI",
  },
  useCases: {
    title: "AI Use Cases — Automation Across Industries | Sprinter AI",
    description: "Discover how AI agents handle quoting, invoicing, follow-ups, reporting, and more across manufacturing, fintech, healthcare, and beyond.",
    keywords: "AI use cases, business automation, AI agents, workflow automation, industry AI solutions, AI implementation",
    ogTitle: "AI Use Cases Across Industries - Sprinter AI",
  },
  caseStudies: {
    title: "AI Case Studies — Real Implementations, Real Results | Sprinter AI",
    description: "See how we deploy AI agent systems that empower teams and automate operations. Real case studies across manufacturing, fintech, healthcare, and more.",
    keywords: "AI case studies, AI success stories, AI ROI, business automation, AI agent deployment, workflow automation",
    ogTitle: "AI Case Studies — Real Results | Sprinter AI",
  },
  labs: {
    title: "AI Labs — Interactive Demos | Sprinter AI",
    description: "Try interactive AI demos and see what's possible for your business. Document intelligence, agent simulators, data analysis, and more — no signup required.",
    keywords: "AI demos, interactive AI, AI prototypes, AI tools, AI labs, try AI",
    ogTitle: "AI Labs — Try AI Tools Live | Sprinter AI",
  },
  resources: {
    title: "AI Resources — Tools, Calculators & Guides | Sprinter AI",
    description: "Everything you need to evaluate and implement AI for your business. Interactive demos, ROI calculators, and implementation guides.",
    keywords: "AI resources, AI tools, ROI calculator, AI guides, AI implementation, business automation",
    ogTitle: "AI Resources | Sprinter AI",
  },
  blog: {
    title: "AI Insights — Implementation Guides & Industry Analysis | Sprinter AI",
    description: "Expert insights on deploying AI agents for real businesses. Implementation guides, industry analysis, and lessons learned from production deployments.",
    keywords: "AI blog, AI insights, AI implementation, business AI, AI agents, workflow automation, industry analysis",
    ogTitle: "AI Insights | Sprinter AI",
  },
  contact: {
    title: "Book a Strategy Call — Free, 30 Minutes | Sprinter AI",
    description: "Ready to deploy AI agents for your business? Book a free strategy call. We'll learn about your operations and recommend the right path forward.",
    keywords: "AI consulting contact, AI strategy call, AI agent deployment, hire AI consultant, business AI",
    ogTitle: "Book a Strategy Call | Sprinter AI",
  },
  privacy: {
    title: "Privacy Policy | Sprinter AI",
    description: "How Sprinter AI protects your privacy and handles data. Transparent, ethical practices for human-centered AI development.",
    keywords: "privacy policy, data protection, AI consulting privacy, Sprinter AI privacy, ethical AI",
    ogTitle: "Privacy Policy - Sprinter AI",
  },
  terms: {
    title: "Terms of Service | Sprinter AI",
    description: "Terms and conditions for Sprinter AI consulting services, venture studio partnerships, and human-centered AI development projects.",
    keywords: "terms of service, AI consulting terms, Sprinter AI terms, venture studio terms, ethical AI",
    ogTitle: "Terms of Service - Sprinter AI",
  },
  familyOffice: {
    title: "Family Office AI Advisory Services | Strategic AI Counsel | Sprinter AI",
    description: "Independent AI advisory for family offices and multi-generational wealth. Fractional CAIO services, governance frameworks, and portfolio-wide AI strategy. Protect legacy. Capture opportunity.",
    keywords: "family office AI advisor, fractional CAIO family office, AI governance family office, multi-generational wealth AI, permanent capital AI strategy, family office technology advisor",
    ogTitle: "AI Advisory for Family Offices - Sprinter AI",
  },
  fractionalCAIO: {
    title: "Fractional Chief AI Officer for Family Offices | Sprinter AI",
    description: "C-suite AI leadership without full-time overhead. Board-level counsel for $1B+ family offices. Strategic vendor negotiations, governance oversight, and cross-portfolio AI orchestration.",
    keywords: "fractional CAIO, fractional chief AI officer, family office CAIO, part-time AI executive, AI leadership family office, strategic AI counsel",
    ogTitle: "Fractional Chief AI Officer Services - Sprinter AI",
  },
  aiAdvisor: {
    title: "AI Advisor Retainer | Strategic AI Counsel | Sprinter AI",
    description: "Monthly strategic AI counsel without implementation overhead. Independent perspective on AI strategy, vendor selection, and governance. For family offices and strategic buyers.",
    keywords: "AI advisor retainer, strategic AI counsel, AI strategy consultant, independent AI advisor, AI vendor evaluation, AI governance advisor",
    ogTitle: "AI Advisor Retainer - Sprinter AI",
  },
  portfolioDiligence: {
    title: "Portfolio Company AI Audits | Quarterly AI Risk Assessment | Sprinter AI",
    description: "Rolling AI readiness and risk assessment for existing holdings. Identify opportunities, quantify technical debt, and track competitive positioning across your portfolio.",
    keywords: "portfolio company audit, AI risk assessment, portfolio AI maturity, holding company AI audit, quarterly technology review",
    ogTitle: "Portfolio Company AI Audits - Sprinter AI",
  },
  strategicBuyerDiligence: {
    title: "Strategic Buyer AI Diligence | Build vs Buy Analysis | Sprinter AI",
    description: "Technical AI assessment for strategic acquisitions. Validate synergies, quantify integration risk, and make confident build-vs-buy decisions with practitioner-led diligence.",
    keywords: "strategic buyer diligence, build vs buy AI, technical moat assessment, synergy validation, corporate development AI, M&A AI diligence",
    ogTitle: "Strategic Buyer AI Diligence - Sprinter AI",
  },
  governanceFamilyOffice: {
    title: "AI Governance for Family Offices | Board Education & Frameworks | Sprinter AI",
    description: "Board education, investment committee training, and governance frameworks for family offices. Develop responsible AI policies that protect legacy while enabling innovation.",
    keywords: "AI governance family office, board AI education, investment committee training, family office AI policy, AI risk management, governance framework",
    ogTitle: "AI Governance Resources for Family Offices - Sprinter AI",
  },
}
