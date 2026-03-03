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
    {
      href: "/services",
      label: "Services",
      type: "dropdown",
      dropdown: [
        { href: "/ai-sprint", label: "AI Readiness Sprint" },
        { href: "/fractional-ai-cofounder", label: "Fractional AI Co-Founder" },
        { href: "/services", label: "All Services" },
      ],
      items: [
        {
          href: "/ai-sprint",
          label: "AI Readiness Sprint",
          description: "48-hour operations audit with scored automation backlog and ROI roadmap",
          featured: true,
          icon: "rocket",
          badge: "$2,500"
        },
        {
          href: "/fractional-ai-cofounder",
          label: "Fractional AI Co-Founder",
          description: "Embedded AI strategy + execution partner. Working systems in weeks.",
          icon: "users",
          badge: "From $8K/mo"
        },
        {
          href: "/services",
          label: "All Services",
          description: "AI agent deployment, custom builds, and enterprise options",
          icon: "grid"
        },
      ],
    },
    {
      href: "/case-studies",
      label: "Case Studies",
      type: "dropdown",
      dropdown: [
        { href: "/case-studies", label: "All Case Studies" },
        { href: "/labs/roi-calculator", label: "ROI Calculator" },
      ],
      items: [
        {
          href: "/case-studies",
          label: "Case Studies",
          description: "Real implementations with real results across multiple industries",
          featured: true,
          icon: "trophy",
          badge: "Real Results"
        },
        {
          href: "/labs/roi-calculator",
          label: "Calculate Your ROI",
          description: "Quantify AI value for your business in 2 minutes",
          icon: "calculator"
        },
      ],
    },
    {
      href: "/labs",
      label: "Labs",
      type: "dropdown",
      dropdown: [
        { href: "/labs", label: "AI Labs" },
        { href: "/blog", label: "Insights" },
      ],
      items: [
        {
          href: "/labs",
          label: "Try AI Tools Live",
          description: "Interactive demos — see what AI agents can do",
          featured: true,
          icon: "play",
          badge: "Try Now"
        },
        {
          href: "/blog",
          label: "Insights",
          description: "AI trends, case studies, and implementation guides",
          icon: "newspaper"
        },
      ],
    },
    {
      href: "/about",
      label: "About",
    },
  ],
  ctas: [
    {
      href: "https://cal.com/tyler-dreher",
      label: "Book a Call",
      variant: "default" as const,
      icon: "sparkles"
    }
  ],
  footer: {
    services: [
      { href: "/ai-sprint", label: "AI Readiness Sprint" },
      { href: "/fractional-ai-cofounder", label: "Fractional AI Co-Founder" },
      { href: "/services", label: "All Services" },
    ],
    resources: [
      { href: "/case-studies", label: "Case Studies" },
      { href: "/labs", label: "AI Labs" },
      { href: "/blog", label: "Insights" },
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
  // Advisory Services - Strategic Counsel (NEW)
  aiAdvisor: {
    name: "AI Advisor Retainer",
    price: "$8-15K/month",
    duration: "Monthly (3-month minimum)",
    description: "Strategic AI counsel without implementation overhead. For principals who need independent perspective on AI strategy, vendor selection, and governance.",
    audience: "Family Offices, Strategic Buyers, Holding Companies",
    includes: [
      "Monthly 90-minute strategy sessions",
      "Unlimited async advisory via Slack/email",
      "Quarterly AI landscape briefings",
      "Vendor evaluation & negotiation support",
      "Board presentation preparation (2x/year)",
      "Priority access to implementation capacity",
      "AI governance policy templates"
    ],
    notIncluded: [
      "Hands-on implementation",
      "Dedicated engineering resources",
      "Project management"
    ]
  },
  fractionalCAIO: {
    name: "Fractional Chief AI Officer",
    price: "$35-60K/month",
    duration: "Annually (12-month commitment)",
    description: "Strategic AI leadership for organizations that need C-suite AI counsel with board-level access and cross-functional orchestration.",
    audience: "Family Offices ($1B+ AUM), Multi-Holding Structures, PE Firms ($500M+ AUM)",
    includes: [
      "20-30 hours/month executive availability",
      "Board meeting attendance & presentation rights",
      "LP/investor reporting & communication",
      "Strategic vendor & partnership negotiations",
      "Governance framework development & oversight",
      "Cross-portfolio AI strategy alignment",
      "Quarterly competitive intelligence briefings",
      "Annual AI maturity assessment across holdings",
      "Reserved implementation capacity (up to 1 sprint/quarter)",
      "Direct access via phone/text for urgent decisions"
    ]
  },

  // Assessment & Workshops
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
    },
    boardEducation: {
      name: "Board AI Education Session",
      price: "$12,000",
      duration: "2 hours",
      description: "Interactive session for board members & family principals"
    },
    icTraining: {
      name: "Investment Committee AI Training",
      price: "$8,000",
      duration: "90 minutes",
      description: "AI diligence framework for investment committees"
    }
  },

  // Add-On Services (A La Carte)
  addOns: {
    portfolioAudit: {
      name: "Quarterly Portfolio AI Audit",
      price: "$5-8K per company",
      duration: "Quarterly",
      description: "Rolling AI readiness & risk assessment for existing holdings",
      includes: [
        "AI capability assessment",
        "Competitive positioning analysis",
        "Technology debt quantification",
        "Opportunity identification",
        "Executive summary for board"
      ]
    },
    diligenceOnDemand: {
      name: "On-Demand Technical Diligence",
      price: "$15K base + $3K/day",
      duration: "72-hour turnaround",
      description: "Priority technical diligence for time-sensitive deals",
      includes: [
        "Mobilization within 24 hours",
        "Preliminary findings in 48-72 hours",
        "Technical risk assessment",
        "Deal recommendation (go/no-go)",
        "100-day plan if proceeding"
      ]
    },
    governanceFramework: {
      name: "AI Governance Framework Development",
      price: "$18,000",
      duration: "One-time (2-week delivery)",
      description: "Custom AI governance policies for family boards and investment committees",
      includes: [
        "AI usage policies",
        "Vendor selection criteria",
        "Data privacy framework",
        "Risk management protocols",
        "Board reporting templates"
      ]
    },
    annualRetainer: {
      name: "Annual Advisory Retainer (Pre-Paid)",
      price: "$90K/year (save 25%)",
      duration: "12-month commitment",
      description: "AI Advisor tier with annual pre-payment discount",
      includes: [
        "All AI Advisor benefits",
        "2 free portfolio audits/year",
        "Priority diligence allocation",
        "Quarterly board attendance option"
      ]
    }
  },

  // Bundled Packages
  bundles: {
    caioGovernance: {
      name: "CAIO + Governance Pack",
      price: "$45K/month",
      duration: "12-month commitment",
      description: "Fractional CAIO with comprehensive governance foundation",
      includes: [
        "All Fractional CAIO benefits",
        "Quarterly board education sessions",
        "Annual governance framework update",
        "4 portfolio audits/year included",
        "Dedicated Slack channel for portfolio CEOs"
      ]
    },
    advisorDiligence: {
      name: "Advisor + Diligence Reserve",
      price: "$12K/month + $60K/year diligence bank",
      duration: "12-month commitment",
      description: "Strategic advisory with pre-paid diligence capacity",
      includes: [
        "AI Advisor base services",
        "$60K diligence credit (use annually or lose)",
        "Priority 48-hour turnaround",
        "Unlimited diligence scope calls",
        "Annual unused credit converts to implementation hours"
      ]
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
