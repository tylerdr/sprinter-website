// Comprehensive data structure for programmatic SEO pages

export interface UseCase {
  id: string
  title: string
  description: string
  industry: string[]
  roles: string[]
  tools: string[]
  mcpServers: string[]
  benefits: string[]
  implementation: string
  roi: string
  difficulty: "Easy" | "Medium" | "Advanced"
  timeToValue: string
}

export interface Industry {
  id: string
  name: string
  icon: string
  description: string
  challenges: string[]
  useCases: string[]
  averageROI: string
  topTools: string[]
}

export interface Role {
  id: string
  title: string
  department: string
  description: string
  painPoints: string[]
  useCases: string[]
  tools: string[]
  avgTimeSaved: string
}

export interface AITool {
  id: string
  name: string
  category: string
  description: string
  useCases: string[]
  industries: string[]
  pricing: string
  integration: string
}

export interface MCPServer {
  id: string
  name: string
  description: string
  capabilities: string[]
  useCases: string[]
  documentation: string
  githubUrl?: string
}

// Industries Data
export const industries: Industry[] = [
  {
    id: "finance",
    name: "Finance & Banking",
    icon: "💰",
    description: "Transform financial operations with AI-powered automation, risk assessment, and customer service",
    challenges: [
      "Manual underwriting processes taking days",
      "High false-positive rates in fraud detection",
      "Slow customer onboarding",
      "Regulatory compliance overhead"
    ],
    useCases: ["loan-underwriting", "fraud-detection", "kyc-automation", "portfolio-optimization"],
    averageROI: "400% in 6 months",
    topTools: ["GPT-4", "Claude", "Custom ML Models", "Zapier AI"]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "🏥",
    description: "Revolutionize patient care with AI diagnostics, automated monitoring, and predictive analytics",
    challenges: [
      "Overwhelmed medical staff",
      "Slow diagnostic processes",
      "Patient follow-up gaps",
      "Documentation burden"
    ],
    useCases: ["patient-monitoring", "medical-transcription", "appointment-scheduling", "diagnosis-assistance"],
    averageROI: "5x efficiency gain",
    topTools: ["Medical LLMs", "Vision AI", "NLP Models", "Voice AI"]
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    icon: "🛍️",
    description: "Enhance customer experience and operations with AI-driven personalization and automation",
    challenges: [
      "Cart abandonment",
      "Inventory management",
      "Customer service volume",
      "Product discovery"
    ],
    useCases: ["personalized-recommendations", "inventory-optimization", "customer-support", "dynamic-pricing"],
    averageROI: "300% revenue increase",
    topTools: ["Recommendation Engines", "ChatGPT", "Computer Vision", "Predictive Analytics"]
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: "🏭",
    description: "Optimize production with predictive maintenance, quality control, and supply chain AI",
    challenges: [
      "Unexpected equipment failures",
      "Quality control issues",
      "Supply chain disruptions",
      "Production inefficiencies"
    ],
    useCases: ["predictive-maintenance", "quality-inspection", "supply-chain", "production-planning"],
    averageROI: "60% reduction in downtime",
    topTools: ["IoT Analytics", "Computer Vision", "Time Series AI", "Digital Twins"]
  },
  {
    id: "legal",
    name: "Legal",
    icon: "⚖️",
    description: "Accelerate legal work with contract analysis, research automation, and compliance monitoring",
    challenges: [
      "Time-consuming document review",
      "Contract analysis bottlenecks",
      "Legal research overhead",
      "Compliance tracking"
    ],
    useCases: ["contract-analysis", "legal-research", "compliance-monitoring", "document-generation"],
    averageROI: "70% time reduction",
    topTools: ["Legal LLMs", "NLP Models", "Document AI", "RAG Systems"]
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: "🏢",
    description: "Transform property management with AI valuation, lead generation, and market analysis",
    challenges: [
      "Property valuation accuracy",
      "Lead qualification",
      "Market trend analysis",
      "Property matching"
    ],
    useCases: ["property-valuation", "lead-scoring", "market-analysis", "virtual-tours"],
    averageROI: "250% more qualified leads",
    topTools: ["Computer Vision", "Predictive Models", "ChatGPT", "Data Analytics"]
  }
]

// Roles Data
export const roles: Role[] = [
  {
    id: "ceo",
    title: "CEO / Founder",
    department: "Executive",
    description: "Strategic leaders driving AI transformation across the organization",
    painPoints: [
      "Identifying AI opportunities",
      "ROI justification",
      "Competitive advantage",
      "Digital transformation"
    ],
    useCases: ["strategic-planning", "market-analysis", "competitor-intelligence"],
    tools: ["Executive Dashboards", "Predictive Analytics", "Market Intelligence AI"],
    avgTimeSaved: "10 hours/week"
  },
  {
    id: "cto",
    title: "CTO / VP Engineering",
    department: "Technology",
    description: "Technical leaders implementing AI infrastructure and solutions",
    painPoints: [
      "Technical debt",
      "System integration",
      "Scalability",
      "Team productivity"
    ],
    useCases: ["code-generation", "system-monitoring", "architecture-planning"],
    tools: ["GitHub Copilot", "AI Code Review", "System Design AI"],
    avgTimeSaved: "15 hours/week"
  },
  {
    id: "sales-manager",
    title: "Sales Manager",
    department: "Sales",
    description: "Sales leaders optimizing pipelines and team performance with AI",
    painPoints: [
      "Lead qualification",
      "Pipeline forecasting",
      "Sales enablement",
      "CRM data entry"
    ],
    useCases: ["lead-scoring", "sales-forecasting", "email-automation"],
    tools: ["Sales AI", "CRM Automation", "Conversation Intelligence"],
    avgTimeSaved: "12 hours/week"
  },
  {
    id: "marketing-director",
    title: "Marketing Director",
    department: "Marketing",
    description: "Marketing leaders leveraging AI for campaigns and content",
    painPoints: [
      "Content creation scale",
      "Campaign optimization",
      "Personalization",
      "Attribution"
    ],
    useCases: ["content-generation", "campaign-optimization", "customer-segmentation"],
    tools: ["Content AI", "Marketing Automation", "Analytics AI"],
    avgTimeSaved: "20 hours/week"
  },
  {
    id: "operations-manager",
    title: "Operations Manager",
    department: "Operations",
    description: "Operations leaders streamlining processes with AI automation",
    painPoints: [
      "Process inefficiencies",
      "Manual workflows",
      "Resource allocation",
      "Quality control"
    ],
    useCases: ["process-automation", "resource-optimization", "quality-assurance"],
    tools: ["Workflow AI", "RPA Tools", "Process Mining"],
    avgTimeSaved: "25 hours/week"
  },
  {
    id: "hr-director",
    title: "HR Director",
    department: "Human Resources",
    description: "HR leaders enhancing talent management with AI",
    painPoints: [
      "Resume screening",
      "Employee engagement",
      "Performance reviews",
      "Onboarding"
    ],
    useCases: ["resume-screening", "employee-analytics", "onboarding-automation"],
    tools: ["Recruiting AI", "HR Analytics", "Engagement AI"],
    avgTimeSaved: "15 hours/week"
  }
]

// Use Cases Data
export const useCases: UseCase[] = [
  {
    id: "loan-underwriting",
    title: "AI-Powered Loan Underwriting",
    description: "Automate loan application review and risk assessment with intelligent document processing and decision engines",
    industry: ["finance"],
    roles: ["operations-manager", "ceo"],
    tools: ["Document AI", "Risk Models", "GPT-4"],
    mcpServers: ["filesystem", "postgres", "slack"],
    benefits: [
      "95% faster processing",
      "30% more approvals",
      "99% accuracy",
      "24/7 availability"
    ],
    implementation: "4-6 weeks with existing data",
    roi: "300% ROI in 3 months",
    difficulty: "Medium",
    timeToValue: "30 days"
  },
  {
    id: "customer-support",
    title: "Intelligent Customer Support",
    description: "Deploy AI agents to handle customer inquiries, reducing response time and improving satisfaction",
    industry: ["retail", "finance", "healthcare"],
    roles: ["operations-manager", "ceo"],
    tools: ["ChatGPT", "Claude", "Zendesk AI"],
    mcpServers: ["zendesk", "slack", "email"],
    benefits: [
      "80% ticket deflection",
      "24/7 availability",
      "90% satisfaction score",
      "60% cost reduction"
    ],
    implementation: "2-3 weeks",
    roi: "200% ROI in 2 months",
    difficulty: "Easy",
    timeToValue: "14 days"
  },
  {
    id: "content-generation",
    title: "Automated Content Creation",
    description: "Generate high-quality content at scale for marketing, documentation, and communications",
    industry: ["retail", "real-estate", "legal"],
    roles: ["marketing-director", "operations-manager"],
    tools: ["GPT-4", "Claude", "Jasper"],
    mcpServers: ["filesystem", "wordpress", "notion"],
    benefits: [
      "10x content output",
      "Consistent brand voice",
      "SEO optimization",
      "Multi-language support"
    ],
    implementation: "1-2 weeks",
    roi: "500% ROI in 6 months",
    difficulty: "Easy",
    timeToValue: "7 days"
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance System",
    description: "Predict equipment failures before they happen using IoT sensors and machine learning",
    industry: ["manufacturing"],
    roles: ["operations-manager", "cto"],
    tools: ["IoT Analytics", "Time Series AI", "TensorFlow"],
    mcpServers: ["prometheus", "postgres", "webhook"],
    benefits: [
      "70% reduction in downtime",
      "40% maintenance cost savings",
      "90% prediction accuracy",
      "Extended equipment life"
    ],
    implementation: "8-12 weeks",
    roi: "400% ROI in 12 months",
    difficulty: "Advanced",
    timeToValue: "90 days"
  },
  {
    id: "contract-analysis",
    title: "AI Contract Analysis",
    description: "Automatically review and extract key terms from legal contracts",
    industry: ["legal", "real-estate", "finance"],
    roles: ["operations-manager", "ceo"],
    tools: ["Legal AI", "NLP Models", "Claude"],
    mcpServers: ["filesystem", "postgres", "sharepoint"],
    benefits: [
      "90% time reduction",
      "99% accuracy",
      "Risk identification",
      "Compliance checking"
    ],
    implementation: "4-6 weeks",
    roi: "350% ROI in 6 months",
    difficulty: "Medium",
    timeToValue: "30 days"
  },
  {
    id: "sales-forecasting",
    title: "AI Sales Forecasting",
    description: "Predict sales outcomes and optimize pipeline management with machine learning",
    industry: ["retail", "manufacturing", "finance"],
    roles: ["sales-manager", "ceo"],
    tools: ["Predictive Analytics", "CRM AI", "Tableau"],
    mcpServers: ["salesforce", "postgres", "sheets"],
    benefits: [
      "85% forecast accuracy",
      "30% pipeline growth",
      "Better resource allocation",
      "Early risk detection"
    ],
    implementation: "3-4 weeks",
    roi: "250% ROI in 4 months",
    difficulty: "Medium",
    timeToValue: "21 days"
  }
]

// MCP Servers Data
export const mcpServers: MCPServer[] = [
  {
    id: "filesystem",
    name: "Filesystem MCP",
    description: "Read, write, and manage files and directories with AI agents",
    capabilities: [
      "File reading/writing",
      "Directory management",
      "File search",
      "Batch operations"
    ],
    useCases: ["content-generation", "contract-analysis", "code-generation"],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
    githubUrl: "https://github.com/modelcontextprotocol/servers"
  },
  {
    id: "postgres",
    name: "PostgreSQL MCP",
    description: "Connect AI agents to PostgreSQL databases for data operations",
    capabilities: [
      "Query execution",
      "Data manipulation",
      "Schema management",
      "Transaction support"
    ],
    useCases: ["predictive-maintenance", "sales-forecasting", "loan-underwriting"],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
    githubUrl: "https://github.com/modelcontextprotocol/servers"
  },
  {
    id: "slack",
    name: "Slack MCP",
    description: "Enable AI agents to interact with Slack workspaces",
    capabilities: [
      "Message sending",
      "Channel management",
      "User interactions",
      "File sharing"
    ],
    useCases: ["customer-support", "team-collaboration", "alert-management"],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/slack",
    githubUrl: "https://github.com/modelcontextprotocol/servers"
  },
  {
    id: "github",
    name: "GitHub MCP",
    description: "Integrate AI agents with GitHub for code and project management",
    capabilities: [
      "Repository management",
      "Issue tracking",
      "Pull request automation",
      "Code review"
    ],
    useCases: ["code-generation", "project-management", "documentation"],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
    githubUrl: "https://github.com/modelcontextprotocol/servers"
  },
  {
    id: "google-drive",
    name: "Google Drive MCP",
    description: "Connect AI agents to Google Drive for document management",
    capabilities: [
      "File operations",
      "Folder management",
      "Sharing controls",
      "Search functionality"
    ],
    useCases: ["document-generation", "content-management", "collaboration"],
    documentation: "https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive",
    githubUrl: "https://github.com/modelcontextprotocol/servers"
  }
]

// AI Tools Data
export const aiTools: AITool[] = [
  {
    id: "gpt4",
    name: "GPT-4",
    category: "Large Language Model",
    description: "OpenAI's most advanced language model for complex reasoning and generation",
    useCases: ["content-generation", "code-generation", "customer-support"],
    industries: ["finance", "healthcare", "retail", "legal"],
    pricing: "$0.03/1K tokens",
    integration: "API, SDK, Plugins"
  },
  {
    id: "claude",
    name: "Claude 3",
    category: "Large Language Model",
    description: "Anthropic's AI assistant with strong reasoning and safety features",
    useCases: ["contract-analysis", "content-generation", "code-generation"],
    industries: ["legal", "finance", "healthcare"],
    pricing: "$0.015/1K tokens",
    integration: "API, SDK"
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "Code Assistant",
    description: "AI pair programmer that helps write better code faster",
    useCases: ["code-generation", "debugging", "documentation"],
    industries: ["technology", "finance", "manufacturing"],
    pricing: "$10/month per user",
    integration: "IDE Plugins"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "Image Generation",
    description: "AI art generator for creating stunning visuals",
    useCases: ["marketing-content", "product-design", "creative-assets"],
    industries: ["retail", "real-estate", "marketing"],
    pricing: "$10-60/month",
    integration: "Discord, API"
  }
]

// Helper functions to get related data
export function getUseCasesByIndustry(industryId: string): UseCase[] {
  return useCases.filter(uc => uc.industry.includes(industryId))
}

export function getUseCasesByRole(roleId: string): UseCase[] {
  return useCases.filter(uc => uc.roles.includes(roleId))
}

export function getRelatedMCPServers(useCaseId: string): MCPServer[] {
  const useCase = useCases.find(uc => uc.id === useCaseId)
  if (!useCase) return []
  return mcpServers.filter(server => useCase.mcpServers.includes(server.id))
}

export function getRelatedTools(useCaseId: string): AITool[] {
  const useCase = useCases.find(uc => uc.id === useCaseId)
  if (!useCase) return []
  return aiTools.filter(tool => 
    useCase.tools.some(t => tool.name.toLowerCase().includes(t.toLowerCase()))
  )
}