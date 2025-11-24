// Centralized constants and configuration for the entire site

export const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID ?? "00000000-0000-0000-0000-000000000000";

export const COMPANY_INFO = {
  name: "Sprinter AI",
  tagline: "Turn Your Portfolio Into an AI-Powered Value Creation Engine",
  subTagline: "Add Millions to EBITDA in Weeks, Not Years. No Hype. No Vendor Lock-in. Just Results.",
  description: "The AI advisory and implementation partner for family offices and private capital. We implement production AI systems that deliver measurable ROI—250% average returns in 60 days. Independent counsel, practitioner credibility, and execution that ships.",
  philosophy: "You deserve AI that actually works. Not decks. Not pilots that stall. Production systems that add millions to your bottom line. We've done it 50+ times. Let us show you how.",
  founded: "2018",
  email: "hello@sprinter.ai",
  phone: "+1 (615) 601-0782",
  location: {
    state: "TN",
    country: "United States",
  },
  // Audience-specific messaging (outcome-focused per Hormozi)
  audiences: {
    familyOffices: {
      tagline: "Protect Your Legacy. Accelerate Your Returns.",
      description: "Get C-suite AI leadership without the $500K salary. Independent counsel who's built production AI for 100+ companies. Avoid costly vendor mistakes. Capture opportunities your competitors miss."
    },
    privateEquity: {
      tagline: "Add $2M+ to Portfolio EBITDA in 90 Days",
      description: "Ship production AI in 10 days, not 10 months. No-API implementations that work with your legacy systems. Playbooks proven across 50+ portcos. ROI guaranteed or we work free until you see it."
    },
    strategicBuyers: {
      tagline: "Never Overpay for an Acquisition Again",
      description: "Technical AI diligence that finds the landmines before you close. Build-vs-buy analysis from practitioners who've been on both sides. 5-day turnaround. Board-ready reports."
    }
  },
  positioning: {
    primaryRole: "AI Implementation Partner",
    secondaryRole: "Strategic Advisory Counsel",
    differentiation: "We ship production AI. Not decks."
  },
  // Named frameworks for IP positioning (Hormozi)
  frameworks: {
    sprintMethod: "The Sprinter Method™",
    readinessIndex: "AI Readiness Index™",
    portfolioMultiplier: "Portfolio Multiplier Effect™",
    noApiAdvantage: "No-API Advantage™",
    governanceStack: "Governance Stack™"
  },
  // Guarantee language (risk reversal)
  guarantee: {
    assessment: "If we don't identify at least $500K in AI opportunities, the assessment is free.",
    sprint: "If we don't ship to production in 10 days, we continue at no charge until we do.",
    retainer: "If you don't see measurable ROI within 90 days, we work free until you do."
  },
  // Scarcity messaging
  scarcity: {
    retainerSlots: 3,
    sprintCapacity: 4,
    assessmentSlots: 10,
    quarterMessage: "We take on only 3 new retainer clients per quarter to ensure white-glove service."
  }
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
      href: "/advisory",
      label: "Advisory",
      type: "dropdown",
      dropdown: [
        { href: "/fractional-caio", label: "Fractional CAIO" },
        { href: "/ai-advisor-retainer", label: "AI Advisor Retainer" },
        { href: "/family-office", label: "For Family Offices" },
        { href: "/governance/family-office", label: "Governance Resources" },
      ],
      items: [
        {
          href: "/fractional-caio",
          label: "Fractional Chief AI Officer",
          description: "C-suite AI leadership for family offices & holding companies",
          featured: true,
          icon: "users",
          badge: "For $1B+ AUM"
        },
        {
          href: "/ai-advisor-retainer",
          label: "AI Advisor Retainer",
          description: "Monthly strategic counsel without implementation overhead",
          icon: "shield",
          badge: "From $8K/mo"
        },
        {
          href: "/family-office",
          label: "Family Office Services",
          description: "Independent AI counsel for multi-generational wealth",
          icon: "bank"
        },
        {
          href: "/governance/family-office",
          label: "Governance & Education",
          description: "Board training, IC education, and governance frameworks",
          icon: "clipboard"
        },
      ],
    },
    {
      href: "/solutions",
      label: "Implementation",
      type: "dropdown",
      dropdown: [
        { href: "/ai-scoping-workshop", label: "AI Scoping Workshop" },
        { href: "/ai-implementation-partner", label: "Implementation Partner" },
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
          href: "/operating-partner",
          label: "AI Operating Partner",
          description: "Portfolio-wide AI orchestration with hands-on implementation",
          icon: "rocket",
          badge: "$12-25K/mo"
        },
        {
          href: "/ai-implementation-partner",
          label: "Implementation Partner",
          description: "Your boutique AI consulting firm for portfolio companies",
          icon: "users",
          badge: "100+ Portcos"
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
      href: "/diligence",
      label: "Due Diligence",
      type: "dropdown",
      dropdown: [
        { href: "/ai-due-diligence-consulting", label: "M&A Diligence" },
        { href: "/portfolio-diligence", label: "Portfolio Audits" },
        { href: "/strategic-buyer-diligence", label: "Build vs. Buy Analysis" },
      ],
      items: [
        {
          href: "/ai-due-diligence-consulting",
          label: "M&A Technical Diligence",
          description: "AI, data, and technology assessment for transactions",
          featured: true,
          icon: "shield",
          badge: "5-10 Days"
        },
        {
          href: "/portfolio-diligence",
          label: "Portfolio Company Audits",
          description: "Quarterly AI readiness & risk assessment for holdings",
          icon: "clipboard",
          badge: "$5-8K/Co"
        },
        {
          href: "/strategic-buyer-diligence",
          label: "Strategic Buyer Diligence",
          description: "Build vs. buy analysis and technical moat assessment",
          icon: "chart"
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
      href: "/ai-assessment",
      label: "Get Free Assessment",
      variant: "default" as const,
      icon: "sparkles"
    }
  ],
  footer: {
    advisory: [
      { href: "/fractional-caio", label: "Fractional CAIO" },
      { href: "/ai-advisor-retainer", label: "AI Advisor" },
      { href: "/family-office", label: "Family Office Services" },
      { href: "/governance/family-office", label: "Governance Resources" },
    ],
    implementation: [
      { href: "/ai-scoping-workshop", label: "Scoping Workshop" },
      { href: "/operating-partner", label: "AI Operating Partner" },
      { href: "/ai-implementation-partner", label: "Implementation Partner" },
      { href: "/pe-services", label: "All Services" },
    ],
    diligence: [
      { href: "/ai-due-diligence-consulting", label: "M&A Diligence" },
      { href: "/portfolio-diligence", label: "Portfolio Audits" },
      { href: "/strategic-buyer-diligence", label: "Strategic Buyer" },
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
    description: "Strategic AI leadership for complex permanent capital structures. Your C-suite AI counsel with board-level access and cross-portfolio orchestration.",
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
  "Vero Capital",
  "Rock Hill Capital",
  "Beckway",
  "Wells Fargo",
  "Accenture",
  "Broadlume",
]

export const SEO = {
  title: "Sprinter AI - Production AI That Adds Millions to Your Portfolio",
  description: "The AI implementation partner for family offices and PE firms. Ship production AI in 10 days. 250% average ROI in 60 days. Guaranteed results or we work free. 50+ portfolio wins.",
  keywords: "AI consulting, fractional CAIO, family office AI advisor, private equity AI, AI due diligence, AI implementation partner, AI ROI, portfolio AI transformation, 10-day AI sprint",
  ogImage: "/og-image.png",
  siteUrl: "https://sprinter.ai",
  twitterHandle: "@sprinter_hq",
  organizationType: "Organization" as const,
  author: "Sprinter AI",
}

// Page-specific SEO metadata
export const PAGE_SEO = {
  home: {
    title: "Sprinter AI - Add Millions to EBITDA with Production AI | 10-Day Sprints",
    description: "Turn your portfolio into an AI-powered value creation engine. Ship production AI in 10 days. 250% average ROI. 50+ portfolio wins. Guaranteed results or we work free.",
    keywords: "AI consulting, portfolio value creation, AI implementation, private equity AI, family office AI, 10-day AI sprint, AI ROI, production AI",
    ogTitle: "Sprinter AI - Production AI That Delivers Results",
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
