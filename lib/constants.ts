// Centralized constants and configuration for the entire site

export const COMPANY_INFO = {
  name: "SprinterHQ",
  tagline: "Ship AI Products in Weeks, Not Months",
  description: "AI consulting business and venture studio specializing in autonomous AI agents and agentic workflows",
  founded: "2018",
  email: "hello@sprinter.ai",
  phone: "+1 (415) 555-1234", // Update with real phone
  location: {
    city: "San Francisco",
    state: "CA",
    country: "United States",
  },
}

export const SOCIAL_LINKS = {
  twitter: "https://x.com/Sprinter_HQ",
  linkedin: "https://www.linkedin.com/company/19101178/",
  github: "https://github.com/SprinterHQ",
  email: `mailto:${COMPANY_INFO.email}`,
}

export const NAVIGATION = {
  main: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/use-cases", label: "Use Cases" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/labs", label: "AI Labs" },
    { href: "/blog", label: "Insights" },
    { href: "/contact", label: "Work With Us" },
  ],
  footer: {
    explore: [
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/labs", label: "AI Labs" },
    ],
    aiTools: [
      { href: "/labs/agent-simulator", label: "Agent Simulator" },
      { href: "/labs/workflow-tool", label: "Workflow Designer" },
      { href: "/labs/ideation", label: "Ideation Lab" },
      { href: "/labs/sketch-studio", label: "AI Sketch Studio" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
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
}

export const PRICING = {
  workshop: {
    price: "$5,000",
    duration: "1 Day",
  },
  sprint: {
    price: "$25,000 - $50,000",
    duration: "2-4 Weeks",
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
  title: "SprinterHQ - AI Consulting & Venture Studio",
  description: "Building the future with autonomous AI agents. We design intelligent systems and launch AI-powered products that redefine what's possible.",
  keywords: "AI consulting, AI development, autonomous agents, agentic workflows, venture studio, AI products",
  ogImage: "/og-image.png", // Add this image later
  siteUrl: "https://sprinter.ai",
  twitterHandle: "@Sprinter_HQ",
  organizationType: "Organization" as const,
  author: "SprinterHQ",
}

// Page-specific SEO metadata
export const PAGE_SEO = {
  home: {
    title: "AI Consulting & Autonomous Agent Development | SprinterHQ",
    description: "Transform your business with AI in weeks, not months. Expert AI consulting, autonomous agents, and venture studio services. 250% ROI in 60 days.",
    keywords: "AI consulting, autonomous agents, AI development, venture studio, machine learning, AI transformation, business automation",
    ogTitle: "SprinterHQ - Ship AI Products in Weeks, Not Months",
  },
  about: {
    title: "About SprinterHQ - AI Consulting Experts Since 2018",
    description: "Meet the team behind $10M+ in AI-generated revenue. Ex-FAANG engineers building production AI systems since 2018.",
    keywords: "AI consulting team, AI experts, venture studio, autonomous agents, AI development company, machine learning experts",
    ogTitle: "About SprinterHQ - Building the Future with AI",
  },
  services: {
    title: "AI Consulting Services - From Strategy to Production",
    description: "AI workshops, rapid prototyping, enterprise transformation, and venture partnerships. Get ROI in 60 days with our proven methodology.",
    keywords: "AI consulting services, AI workshops, rapid prototyping, AI transformation, venture studio, machine learning consulting",
    ogTitle: "AI Consulting Services - SprinterHQ",
  },
  useCases: {
    title: "AI Use Cases & Implementation Examples | SprinterHQ",
    description: "Discover proven AI use cases across industries. From loan underwriting to predictive maintenance - see how AI transforms businesses.",
    keywords: "AI use cases, AI implementation, business automation, AI examples, industry AI solutions, autonomous agents",
    ogTitle: "AI Use Cases That Drive Real Business Value",
  },
  caseStudies: {
    title: "AI Case Studies - Real Results & ROI | SprinterHQ",
    description: "See how we've generated $10M+ in value through AI. Real case studies with measurable results and proven ROI.",
    keywords: "AI case studies, AI success stories, AI ROI, business transformation, autonomous agents results, AI implementation",
    ogTitle: "Proven AI Success Stories & Case Studies",
  },
  labs: {
    title: "AI Labs - Interactive Demos & Prototypes | SprinterHQ",
    description: "Experience cutting-edge AI tools firsthand. Interactive demos of autonomous agents, workflow automation, and AI ideation tools.",
    keywords: "AI demos, interactive AI, AI prototypes, autonomous agents demo, workflow automation, AI tools, AI playground",
    ogTitle: "AI Labs - Experience the Future of AI",
  },
  blog: {
    title: "AI Insights & Industry Trends | SprinterHQ Blog",
    description: "Expert insights on AI development, autonomous agents, and industry trends. Learn from practitioners building production AI systems.",
    keywords: "AI blog, AI insights, autonomous agents, AI trends, machine learning, AI development, venture studio insights",
    ogTitle: "AI Insights from Industry Experts",
  },
  contact: {
    title: "Work With Us - AI Consulting & Development | SprinterHQ",
    description: "Ready to transform your business with AI? Get started with a free consultation. Limited spots available - book your AI strategy session today.",
    keywords: "AI consulting contact, hire AI experts, AI development services, autonomous agents, AI transformation, venture studio",
    ogTitle: "Start Your AI Transformation Journey",
  },
  privacy: {
    title: "Privacy Policy | SprinterHQ",
    description: "How SprinterHQ protects your privacy and handles data. Transparent practices for our AI consulting and development services.",
    keywords: "privacy policy, data protection, AI consulting privacy, SprinterHQ privacy",
    ogTitle: "Privacy Policy - SprinterHQ",
  },
  terms: {
    title: "Terms of Service | SprinterHQ",
    description: "Terms and conditions for SprinterHQ AI consulting services, venture studio partnerships, and AI development projects.",
    keywords: "terms of service, AI consulting terms, SprinterHQ terms, venture studio terms",
    ogTitle: "Terms of Service - SprinterHQ",
  },
}