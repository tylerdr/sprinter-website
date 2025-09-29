// Centralized constants and configuration for the entire site

export const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID ?? "00000000-0000-0000-0000-000000000000";

export const COMPANY_INFO = {
  name: "Sprinter AI",
  tagline: "Put AI to Work Across Your Portfolio",
  description: "Transform your portfolio companies with agentic AI systems deployed in 10 days. Get custom solutions, off-the-shelf integrations, and repeatable playbooks proven across 50+ implementations. Your competitive advantage, delivered fast—no API required.",
  philosophy: "You deserve AI that works. Fast implementations. Real production systems. Measurable ROI. Your operators stay in control while AI handles the repetitive work. That's how you win.",
  founded: "2018",
  email: "hello@sprinter.ai",
  phone: "+1 (615) 601-0782",
  location: {
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
      href: "/solutions",
      label: "Solutions",
      type: "dropdown",
      dropdown: [
        { href: "/ai-scoping-workshop", label: "AI Scoping Workshop" },
        { href: "/ai-implementation-partner", label: "Implementation Partner" },
        { href: "/ai-due-diligence-consulting", label: "Due Diligence" },
        { href: "/operating-partner", label: "AI Operating Partner" },
        { href: "/solutions/ap-automation", label: "Financial Automation" },
        { href: "/solutions/quote-intelligence", label: "Quote Intelligence" },
        { href: "/solutions/3pl-ops", label: "3PL Operations" },
        { href: "/pe-services", label: "All Services" },
      ],
      items: [
        {
          href: "/ai-scoping-workshop",
          label: "AI Scoping Workshop",
          description: "2-week diagnostic with options memo, pilot SOW, and ROI model",
          featured: true,
          icon: "rocket",
          badge: "Fixed Fee"
        },
        {
          href: "/ai-implementation-partner",
          label: "Implementation Partner",
          description: "Your boutique AI consulting firm for portfolio companies",
          icon: "users",
          badge: "100+ Portcos"
        },
        {
          href: "/ai-due-diligence-consulting",
          label: "Due Diligence",
          description: "Technical AI & data assessment for M&A transactions",
          icon: "shield"
        },
        {
          href: "/operating-partner",
          label: "AI Operating Partner",
          description: "Transform your portfolio with fund-level AI orchestration",
          icon: "rocket"
        },
        {
          href: "/solutions/ap-automation",
          label: "Financial Automation",
          description: "60%+ touchless AP, expense & reconciliation automation",
          icon: "calculator"
        },
        {
          href: "/solutions/quote-intelligence",
          label: "Quote Intelligence",
          description: "42% faster quote cycles with AI-powered pricing",
          icon: "zap"
        },
        {
          href: "/solutions/3pl-ops",
          label: "3PL Operations",
          description: "End-to-end automation from quote to cash",
          icon: "truck"
        },
        {
          href: "/pe-services",
          label: "View All Solutions",
          description: "20+ battle-tested AI solutions ready to deploy",
          icon: "grid"
        },
      ],
    },
    {
      href: "/case-studies",
      label: "Results",
      type: "dropdown",
      dropdown: [
        { href: "/case-studies", label: "Portfolio Wins" },
        { href: "/operating-partner#scoreboard", label: "Impact Dashboard" },
        { href: "/tools/roi-calculator", label: "ROI Calculator" },
      ],
      items: [
        {
          href: "/case-studies",
          label: "Portfolio Wins",
          description: "$10M+ value created across 50+ deployments",
          featured: true,
          icon: "trophy",
          badge: "Real Results"
        },
        {
          href: "/operating-partner#scoreboard",
          label: "Live Impact Dashboard",
          description: "Track portfolio AI adoption & ROI in real-time",
          icon: "chart"
        },
        {
          href: "/labs/roi-calculator",
          label: "Calculate Your ROI",
          description: "Quantify AI value for your portfolio in 2 minutes",
          icon: "calculator"
        },
        {
          href: "/downloads/no-api-cookbook",
          label: "Implementation Playbooks",
          description: "Proven frameworks from 100+ successful sprints",
          icon: "book"
        },
      ],
    },
    {
      href: "/resources",
      label: "Resources",
      type: "dropdown",
      dropdown: [
        { href: "/labs", label: "Try AI Tools" },
        { href: "/ai-assessment", label: "Free AI Assessment" },
        { href: "/blog", label: "PE AI Insights" },
        { href: "/downloads/governance-pack", label: "Governance Pack" },
        { href: "/industries", label: "Industries" },
      ],
      items: [
        {
          href: "/labs",
          label: "Try AI Tools Live",
          description: "Interactive demos - no signup required",
          featured: true,
          icon: "play",
          badge: "Try Now"
        },
        {
          href: "/ai-assessment",
          label: "Free AI Assessment",
          description: "Get your personalized AI roadmap in 5 minutes",
          icon: "clipboard"
        },
        {
          href: "/blog",
          label: "PE AI Insights",
          description: "Industry analysis, trends & best practices",
          icon: "newspaper"
        },
        {
          href: "/downloads/governance-pack",
          label: "Governance Templates",
          description: "Board-ready security & compliance docs",
          icon: "shield"
        },
        {
          href: "/industries",
          label: "Industries",
          description: "AI solutions tailored for specific sectors",
          icon: "factory"
        },
      ],
    },
  ],
  ctas: [
    {
      href: "/contact",
      label: "Get Started",
      variant: "default" as const,
      icon: "sparkles"
    }
  ],
  footer: {
    products: [
      { href: "/ai-scoping-workshop", label: "Scoping Workshop" },
      { href: "/ai-implementation-partner", label: "Implementation Partner" },
      { href: "/ai-due-diligence-consulting", label: "Due Diligence" },
      { href: "/operating-partner", label: "Operating Partner" },
      { href: "/pe-services", label: "All Services" },
    ],
    solutions: [
      { href: "/solutions/ap-automation", label: "AP Automation" },
      { href: "/solutions/quote-intelligence", label: "Quote Intelligence" },
      { href: "/solutions/3pl-ops", label: "3PL Operations" },
      { href: "/solutions", label: "All Solutions" },
    ],
    resources: [
      { href: "/case-studies", label: "Case Studies" },
      { href: "/labs", label: "AI Labs" },
      { href: "/tools", label: "Tools & Calculators" },
      { href: "/downloads/no-api-cookbook", label: "No-API Cookbook" },
      { href: "/blog", label: "Insights" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/partnership", label: "Partnership" },
      { href: "/contact", label: "Contact" },
      { href: "/governance", label: "Governance" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
};

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
  // PE-focused tiers - updated with competitive positioning
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
  workshop: {
    name: "90-Minute OP Workshop",
    price: "$1,500",
    duration: "90 minutes",
    description: "Interactive session to identify high-impact wedges and build buy-in",
    includes: [
      "AI Opportunity Roadmap",
      "Top 3 wedge candidates",
      "Adoption playbook",
      "ROI projections",
      "Applied as credit to any package within 30 days"
    ]
  },
  wedgeSprint: {
    name: "2-Week Wedge Sprint",
    price: "$20,000",
    duration: "2 weeks",
    description: "Pick one document type, deliver a working solution, prove the value",
    includes: [
      "Production-ready automation",
      "Clear acceptance criteria",
      "≥60% touchless processing target",
      "Training & documentation",
      "30-day support",
      "If we miss criteria, remedial sprint at our cost"
    ]
  },
  retainer: {
    name: "AI Operating Partner Retainer",
    price: "$12k-25k/month",
    duration: "Monthly (6-month minimum)",
    description: "Fund-level AI orchestration and portfolio-wide implementation",
    includes: [
      "Portfolio AI PMO & prioritization",
      "Monthly exec enablement",
      "Governance framework & policies",
      "Quarterly portfolio reviews",
      "Diligence support (24hr turnaround)",
      "Best practices sharing across portcos"
    ]
  },
  transformation: {
    name: "Transformation Partner",
    price: "$50k-125k/month",
    duration: "Monthly (3-month minimum)",
    description: "Outcome-based execution with dedicated squad",
    includes: [
      "Fixed-capacity AI squad (PM + engineers)",
      "2-4 sprints per month",
      "Backlog management",
      "Bi-weekly demos",
      "Full documentation & enablement",
      "Pay for outcomes, not hours"
    ]
  },
  // Education & Enablement
  education: {
    name: "Education & Enablement",
    executiveBootcamp: {
      name: "Executive AI Bootcamp",
      price: "$9,500",
      duration: "Half-day",
      description: "For leadership teams (up to 12)"
    },
    managerLab: {
      name: "Manager Enablement Lab",
      price: "$2,500/person",
      duration: "Full day",
      description: "Hands-on training for operators"
    },
    portfolioDay: {
      name: "Portfolio AI Day",
      price: "$15,000",
      duration: "1 day onsite",
      description: "Up to 3 sessions for entire portfolio"
    },
    governanceWorkshop: {
      name: "AI Governance Workshop",
      price: "$7,500",
      duration: "Half-day",
      description: "Develop responsible AI policies"
    }
  },
  // Legacy pricing
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
  peServices: {
    title: "PE Services - AI Operating Partner for Private Equity | Sprinter AI",
    description: "Drive 23% EBITDA improvement across your portfolio with proven AI implementations. 100+ PE firms trust Sprinter as their AI Operating Partner.",
    keywords: "private equity AI, PE operating partner, portfolio value creation, EBITDA improvement, AI transformation, portfolio optimization",
    ogTitle: "AI Operating Partner for Private Equity - Sprinter AI",
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
  resources: {
    title: "PE AI Resources - Tools, Calculators & Case Studies | Sprinter AI",
    description: "Everything you need to evaluate, implement, and scale AI across your portfolio. Interactive demos, ROI calculators, and battle-tested playbooks.",
    keywords: "AI resources, PE tools, ROI calculator, case studies, AI playbooks, portfolio transformation, AI demos",
    ogTitle: "PE AI Resources Hub - Sprinter AI",
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
