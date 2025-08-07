// Centralized constants and configuration for the entire site

export const COMPANY_INFO = {
  name: "SprinterHQ",
  tagline: "Building the Future with Autonomous AI Agents",
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
  revenueGenerated: "$12M+",
  averageROI: "300%",
  averageROIDays: 60,
  taskAutomation: "95%",
  clientSatisfaction: "100%",
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
}