// Centralized constants and configuration for the entire site

export const COMPANY_INFO = {
  name: "Sprinter AI",
  tagline: "Build at the pace of AI.",
  description: "AI consulting and venture studio building technology that helps people. We enable humans to pursue purposeful work they're uniquely capable of, not tasks AI can handle.",
  philosophy: "We believe human time is valuable. AI should handle repetitive tasks so people can focus on creative, strategic, and meaningful work that brings them joy and purpose.",
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
      href: "/solutions",
      label: "Solutions",
      type: "mega",
      sections: [
        {
          title: "By Industry",
          items: [
            { href: "/industries/private-equity", label: "Private Equity", description: "AI for portfolio companies" },
            { href: "/industries/healthcare", label: "Healthcare", description: "Medical AI solutions" },
            { href: "/industries/financial-services", label: "Financial Services", description: "Fintech automation" },
            { href: "/industries/manufacturing", label: "Manufacturing", description: "Smart factory AI" },
            { href: "/industries/retail", label: "Retail & E-commerce", description: "Customer experience AI" },
            { href: "/industries", label: "View All Industries →", description: "" },
          ],
        },
        {
          title: "By Use Case",
          items: [
            { href: "/use-cases/automation", label: "Process Automation", description: "Automate repetitive tasks" },
            { href: "/use-cases/analytics", label: "Predictive Analytics", description: "Data-driven insights" },
            { href: "/use-cases/customer-service", label: "Customer Service", description: "AI chatbots & support" },
            { href: "/use-cases/document-processing", label: "Document Intelligence", description: "Extract & analyze documents" },
            { href: "/use-cases", label: "View All Use Cases →", description: "" },
          ],
        },
        {
          title: "By Company Size",
          items: [
            { href: "/solutions/enterprise", label: "Enterprise", description: "Fortune 500 solutions" },
            { href: "/solutions/mid-market", label: "Mid-Market", description: "Growth company AI" },
            { href: "/solutions/startup", label: "Startups", description: "AI for rapid scaling" },
          ],
        },
      ],
    },
    {
      href: "/products",
      label: "Products",
      type: "dropdown",
      items: [
        { href: "/ai-assessment", label: "AI Readiness Assessment", description: "Free 1-week evaluation" },
        { href: "/ai-sprint", label: "5-Day AI Sprint", description: "Rapid prototype to production" },
        { href: "/ai-partnership", label: "AI Partnership", description: "Long-term transformation" },
      ],
    },
    {
      href: "/resources",
      label: "Resources",
      type: "dropdown",
      items: [
        { href: "/case-studies", label: "Case Studies", description: "Client success stories" },
        { href: "/labs", label: "AI Labs", description: "Interactive demos" },
        { href: "/blog", label: "Blog", description: "Latest insights" },
        { href: "/tools", label: "Tools & Calculators", description: "ROI calculators" },
      ],
    },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  footer: {
    products: [
      { href: "/ai-assessment", label: "AI Readiness Assessment" },
      { href: "/ai-sprint", label: "5-Day AI Sprint" },
      { href: "/ai-partnership", label: "AI Partnership Program" },
      { href: "/products", label: "All AI Solutions" },
    ],
    services: [
      { href: "/services", label: "All Services" },
      { href: "/services/enterprise", label: "Enterprise AI" },
      { href: "/services/venture", label: "Venture Studio" },
      { href: "/services/discovery", label: "Discovery Workshop" },
      { href: "/services/sprint", label: "10-Day Sprint" },
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