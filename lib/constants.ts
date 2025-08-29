// Centralized constants and configuration for the entire site

export const COMPANY_INFO = {
  name: "Sprinter AI",
  tagline: "Your AI Operating Partner for Private Equity.",
  description: "The AI Operating Partner for lower-middle-market PE. We deliver boringly reliable 30-45 day wins (AP/expense, Quote Intelligence, 3PL Ops) and fund-level governance to defend those wins to LPs.",
  philosophy: "Make AI boring. Ship portfolio wins in 45 days—no rewires, no drama. Governance first, hype last.",
  founded: "2018",
  email: "hello@sprinter.ai",
  phone: "+1 (615) 601-0782",
  location: {
    city: "Brentwood",
    state: "TN",
    country: "United States",
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
    {
      href: "/operating-partner",
      label: "Operating Partner",
      type: "mega",
      sections: [
        {
          title: "Fund-Level Services",
          items: [
            { href: "/operating-partner", label: "AI Operating Partnership", description: "Fund-level orchestration" },
            { href: "/operating-partner#workshop", label: "90-Minute OP Workshop", description: "Get pilot plan & options memo" },
            { href: "/operating-partner#roadmap", label: "Day-100 AI Roadmap", description: "Template & checklist" },
            { href: "/operating-partner#scoreboard", label: "Portfolio Scoreboard", description: "KPIs for LPs" },
          ],
        },
        {
          title: "Wedge Solutions",
          items: [
            { href: "/solutions/ap-automation", label: "AP & Expense Automation", description: "QBO/Sage, 60% touchless" },
            { href: "/solutions/quote-intelligence", label: "Quote Intelligence", description: "RFP to quote draft" },
            { href: "/solutions/3pl-ops", label: "3PL Ops & Billing", description: "Quote to billing accuracy" },
            { href: "/governance", label: "Governance & Security", description: "Fee-offset optics, audit trail" },
          ],
        },
        {
          title: "Downloads",
          items: [
            { href: "/downloads/ap-brief", label: "AP Accelerator Brief", description: "4-page QBO/Sage guide" },
            { href: "/downloads/no-api-cookbook", label: "No-API Cookbook", description: "10 patterns for legacy ERPs" },
            { href: "/downloads/governance-pack", label: "Governance Pack", description: "Security & fee-offset docs" },
          ],
        },
      ],
    },
    {
      href: "/solutions",
      label: "Solutions",
      type: "dropdown",
      items: [
        { href: "/solutions/ap-automation", label: "AP & Expense Automation", description: "30-45 day wins" },
        { href: "/solutions/quote-intelligence", label: "Quote Intelligence", description: "42% faster cycles" },
        { href: "/solutions/3pl-ops", label: "3PL Ops & Billing", description: "18pt accuracy gain" },
        { href: "/use-cases", label: "All Use Cases →", description: "Industry solutions" },
      ],
    },
    {
      href: "/resources",
      label: "Resources",
      type: "dropdown",
      items: [
        { href: "/case-studies", label: "Case Studies", description: "Anonymized wins" },
        { href: "/labs", label: "AI Labs", description: "Interactive demos" },
        { href: "/tools/ap-calculator", label: "AP Hours Calculator", description: "Calculate savings" },
        { href: "/tools/quote-estimator", label: "Quote Throughput Estimator", description: "RFP capacity" },
      ],
    },
    { href: "/governance", label: "Governance" },
    { href: "/contact", label: "Book Workshop" },
  ],
  footer: {
    products: [
      { href: "/operating-partner", label: "AI Operating Partnership" },
      { href: "/solutions/ap-automation", label: "AP & Expense Automation" },
      { href: "/solutions/quote-intelligence", label: "Quote Intelligence" },
      { href: "/solutions/3pl-ops", label: "3PL Ops & Billing" },
    ],
    services: [
      { href: "/operating-partner#workshop", label: "90-Minute OP Workshop" },
      { href: "/operating-partner#pilot", label: "30-45 Day Pilot" },
      { href: "/governance", label: "Governance Pack" },
      { href: "/operating-partner#council", label: "OP Council" },
      { href: "/contact", label: "Book Workshop" },
    ],
    resources: [
      { href: "/case-studies", label: "Case Studies" },
      { href: "/labs", label: "AI Labs" },
      { href: "/use-cases", label: "Use Cases" },
      { href: "/blog", label: "Insights" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
}

export const METRICS = {
  revenueGenerated: "$10M+",
  averageROI: "250%",
  averageROIDays: 60,
  taskAutomation: "85%",
  clientSatisfaction: "95%+",
  projectsPerMonth: 3,
  spotsRemaining: 2,
  humanHoursReclaimed: "100K+",
  jobsCreated: "50+",
}

export const PRICING = {
  // PE-focused tiers
  assessment: {
    name: "AI Readiness Assessment",
    price: "$10,000",
    duration: "1 Week",
    description: "Comprehensive portfolio AI audit with actionable roadmap",
    includes: [
      "Portfolio-wide AI maturity assessment",
      "Top 10 AI opportunities with ROI projections",
      "Implementation roadmap and timeline",
      "Vendor recommendations",
      "Board-ready presentation"
    ]
  },
  sprint: {
    name: "AI Implementation Sprint",
    price: "$50,000",
    duration: "5 Days",
    description: "Rapid prototype to production with guaranteed ROI",
    includes: [
      "Working AI prototype in 5 days",
      "Full production deployment",
      "Team training and handoff",
      "90-day support included",
      "10x ROI guarantee or money back"
    ]
  },
  surf: {
    name: "AI Operations Partner",
    price: "$50,000/month",
    duration: "Quarterly commitment",
    description: "Ongoing AI expertise for continuous value creation",
    includes: [
      "Dedicated AI strategist",
      "3 implementations per quarter",
      "Weekly office hours",
      "Cross-portfolio best practices",
      "24/7 technical support"
    ]
  },
  sail: {
    name: "Enterprise Partnership",
    price: "Custom",
    duration: "Annual commitment",
    description: "Full AI transformation partnership for large portfolios",
    includes: [
      "Dedicated AI team (3+ experts)",
      "Unlimited implementations",
      "Custom AI platform development",
      "Board and LP reporting",
      "On-site workshops and training"
    ]
  },
  // Legacy pricing for other services
  workshop: {
    price: "$5,000",
    duration: "1 Day",
  },
  transformation: {
    price: "$150,000+",
    duration: "3-6 Months",
  },
  venture: {
    price: "Equity-based",
    duration: "Ongoing",
  },
  speaking: {
    price: "$10,000+",
  },
  training: {
    price: "$15,000/day",
  },
  consulting: {
    price: "$20,000/month",
  },
}

export const CLIENTS = [
  "Vero Capital",
  "Rock Hill Capital",
  "Beckway",
  "Wells Fargo",
  "Accenture",
  "Broadlume",
]

export const SEO = {
  title: "Sprinter AI - Build at the pace of AI",
  description: "AI consulting and venture studio building technology that helps people. We enable humans to pursue purposeful work while AI handles repetitive tasks. Ship AI products in weeks, not months.",
  keywords: "AI consulting, AI development, autonomous agents, human-centered AI, AI acceleration, venture studio, AI products, purposeful work",
  ogImage: "/og-image.png", // Add this image later
  siteUrl: "https://sprinter.ai",
  twitterHandle: "@sprinter_hq",
  organizationType: "Organization" as const,
  author: "Sprinter AI",
}

// Page-specific SEO metadata
export const PAGE_SEO = {
  home: {
    title: "Sprinter AI - Build at the pace of AI | Human-Centered AI Solutions",
    description: "Transform your business with AI that empowers people. We build AI systems that free humans from repetitive tasks to focus on meaningful work. 250% ROI in 60 days.",
    keywords: "AI consulting, autonomous agents, human-centered AI, AI development, venture studio, machine learning, AI transformation, purposeful work",
    ogTitle: "Sprinter AI - Building AI That Helps People",
  },
  about: {
    title: "About Sprinter AI - Building Human-Centered AI Since 2018",
    description: "Meet the team creating AI that enables human flourishing. Ex-FAANG engineers building systems that free people to do work they love.",
    keywords: "AI consulting team, human-centered AI, AI experts, venture studio, autonomous agents, purposeful work, AI development company",
    ogTitle: "About Sprinter AI - AI for Human Flourishing",
  },
  services: {
    title: "AI Services - Technology That Creates Human Opportunity | Sprinter AI",
    description: "AI workshops, rapid prototyping, and transformation services. We build AI that handles repetitive tasks so your team can focus on creative, strategic work.",
    keywords: "AI consulting services, human-centered AI, AI workshops, rapid prototyping, AI transformation, venture studio, purposeful work",
    ogTitle: "AI Services That Enable Human Potential - Sprinter AI",
  },
  useCases: {
    title: "AI Use Cases - Automation That Creates Human Opportunity | Sprinter AI",
    description: "Discover how AI can handle repetitive tasks across industries, freeing people for creative and strategic work. Real examples of human-centered AI.",
    keywords: "AI use cases, human-centered automation, AI implementation, purposeful work, industry AI solutions, autonomous agents",
    ogTitle: "AI Use Cases That Empower People - Sprinter AI",
  },
  caseStudies: {
    title: "AI Case Studies - Creating Value for Businesses & People | Sprinter AI",
    description: "See how we've generated $10M+ in value while enabling teams to focus on meaningful work. Real stories of human-centered AI transformation.",
    keywords: "AI case studies, human-centered AI, AI success stories, AI ROI, business transformation, purposeful work, AI implementation",
    ogTitle: "Human-Centered AI Success Stories - Sprinter AI",
  },
  labs: {
    title: "AI Labs - Experience the Future of Human-AI Collaboration | Sprinter AI",
    description: "Interactive demos of AI tools that augment human capabilities. See how AI can be your creative partner, not your replacement.",
    keywords: "AI demos, human-AI collaboration, interactive AI, AI prototypes, autonomous agents demo, AI tools, purposeful technology",
    ogTitle: "AI Labs - Human-AI Collaboration in Action",
  },
  blog: {
    title: "AI Insights - Building Technology for Human Flourishing | Sprinter AI Blog",
    description: "Expert insights on building AI that enables human potential. Learn how to create abundance through human-centered AI development.",
    keywords: "AI blog, human-centered AI, AI insights, purposeful technology, AI trends, machine learning, AI development, human flourishing",
    ogTitle: "AI Insights for Human Flourishing - Sprinter AI",
  },
  contact: {
    title: "Start a 10-Day Sprint - Build AI That Helps People | Sprinter AI",
    description: "Ready to build AI that empowers your team? Let's create technology that handles the mundane so humans can pursue the meaningful. Free consultation available.",
    keywords: "AI consulting contact, human-centered AI, hire AI experts, AI development services, autonomous agents, purposeful technology",
    ogTitle: "Build AI That Empowers People - Sprinter AI",
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
}