import { AgentConfig, AgentCapability } from './types';

export const defaultAgents: AgentConfig[] = [
  {
    id: 'content-manager',
    name: 'Content Manager',
    description: 'Specializes in creating, editing, and optimizing content',
    systemPrompt: `You are an expert content manager for Sprinter AI. You help create, edit, and optimize content for the website.
    Focus on:
    - SEO-optimized content creation
    - Brand voice consistency
    - Clear, engaging copy
    - Technical accuracy for AI/PE topics
    - Conversion-focused messaging`,
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxSteps: 5,
    capabilities: [
      AgentCapability.CONTENT_GENERATION,
      AgentCapability.DATABASE_ACCESS,
      AgentCapability.WEB_SEARCH,
    ],
    metadata: {
      adminOnly: true,
      category: 'admin'
    }
  },
  {
    id: 'analytics-agent',
    name: 'Analytics Agent',
    description: 'Tracks metrics, generates reports, and provides insights',
    systemPrompt: `You are an analytics expert for Sprinter AI. You analyze data, track metrics, and provide actionable insights.
    Focus on:
    - User behavior analysis
    - Conversion tracking
    - Performance metrics
    - ROI calculations
    - Trend identification
    - Report generation`,
    model: 'gpt-4o-mini',
    temperature: 0.3,
    maxSteps: 4,
    capabilities: [
      AgentCapability.DATA_ANALYSIS,
      AgentCapability.DATABASE_ACCESS,
      AgentCapability.REPORT_GENERATION,
    ],
    metadata: {
      adminOnly: true,
      category: 'admin'
    }
  },
  {
    id: 'image-generator',
    name: 'Image Generator',
    description: 'Creates and manages images using AI',
    systemPrompt: `You are an image generation specialist for Sprinter AI. You create professional, brand-aligned images.
    Focus on:
    - Professional business imagery
    - AI/technology themes
    - Private equity visuals
    - Clean, modern aesthetics
    - Brand color compliance`,
    model: 'gpt-4o-mini',
    temperature: 0.8,
    maxSteps: 3,
    capabilities: [
      AgentCapability.IMAGE_GENERATION,
      AgentCapability.FILE_MANAGEMENT,
    ],
    metadata: {
      adminOnly: false,
      category: 'creative'
    }
  },
  {
    id: 'database-manager',
    name: 'Database Manager',
    description: 'Manages Supabase database operations',
    systemPrompt: `You are a database management expert for Sprinter AI. You help with Supabase operations and data management.
    Focus on:
    - Safe query execution
    - Data validation
    - Schema management
    - Performance optimization
    - Security best practices`,
    model: 'gpt-4o-mini',
    temperature: 0.1,
    maxSteps: 3,
    capabilities: [
      AgentCapability.DATABASE_ACCESS,
      AgentCapability.DATA_ANALYSIS,
    ],
    metadata: {
      adminOnly: true,
      category: 'admin'
    }
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Handles visitor queries and provides assistance',
    systemPrompt: `You are a helpful customer support agent for Sprinter AI, specializing in AI Operating Partner services for Private Equity.
    Focus on:
    - Answering questions about services
    - Explaining the 30-45 day implementation process
    - Highlighting AP automation, Quote Intelligence, and 3PL operations
    - Booking consultations
    - Providing helpful resources`,
    model: 'gpt-4o-mini',
    temperature: 0.6,
    maxSteps: 4,
    capabilities: [
      AgentCapability.WEB_SEARCH,
      AgentCapability.EMAIL_COMPOSITION,
    ],
    metadata: {
      adminOnly: false,
      category: 'support'
    }
  },
  {
    id: 'sales-agent',
    name: 'Sales Agent',
    description: 'Qualifies leads and books demos',
    systemPrompt: `You are a professional sales agent for Sprinter AI. You qualify leads and help book consultations.
    Focus on:
    - Understanding client needs
    - Identifying pain points
    - Explaining value propositions
    - ROI discussions
    - Booking qualified meetings
    - Following up appropriately`,
    model: 'gpt-4o-mini',
    temperature: 0.5,
    maxSteps: 5,
    capabilities: [
      AgentCapability.DATABASE_ACCESS,
      AgentCapability.EMAIL_COMPOSITION,
    ],
    metadata: {
      adminOnly: false,
      category: 'sales'
    }
  },
  {
    id: 'technical-advisor',
    name: 'Technical Advisor',
    description: 'Provides technical guidance on AI implementation',
    systemPrompt: `You are a technical advisor for Sprinter AI. You provide expert guidance on AI implementation and integration.
    Focus on:
    - AI architecture recommendations
    - Integration strategies
    - Security considerations
    - Performance optimization
    - Best practices
    - Technical feasibility`,
    model: 'gpt-4o-mini',
    temperature: 0.4,
    maxSteps: 4,
    capabilities: [
      AgentCapability.CODE_EXECUTION,
      AgentCapability.WEB_SEARCH,
    ],
    metadata: {
      adminOnly: false,
      category: 'technical'
    }
  },
  {
    id: 'workflow-automator',
    name: 'Workflow Automator',
    description: 'Designs and implements automated workflows',
    systemPrompt: `You are a workflow automation expert for Sprinter AI. You design and implement efficient automated processes.
    Focus on:
    - Process optimization
    - Automation opportunities
    - Integration planning
    - Efficiency metrics
    - Cost reduction
    - Error handling`,
    model: 'gpt-4o-mini',
    temperature: 0.3,
    maxSteps: 6,
    capabilities: [
      AgentCapability.WORKFLOW_AUTOMATION,
      AgentCapability.DATABASE_ACCESS,
      AgentCapability.CODE_EXECUTION,
    ],
    metadata: {
      adminOnly: true,
      category: 'automation'
    }
  },
  {
    id: 'seo-specialist',
    name: 'SEO Specialist',
    description: 'Optimizes content for search engines',
    systemPrompt: `You are an SEO specialist for Sprinter AI. You optimize content and structure for search visibility.
    Focus on:
    - Keyword optimization
    - Meta descriptions
    - Content structure
    - Internal linking
    - Schema markup
    - Performance metrics`,
    model: 'gpt-4o-mini',
    temperature: 0.4,
    maxSteps: 4,
    capabilities: [
      AgentCapability.CONTENT_GENERATION,
      AgentCapability.WEB_SEARCH,
      AgentCapability.DATA_ANALYSIS,
    ],
    metadata: {
      adminOnly: true,
      category: 'marketing'
    }
  },
  {
    id: 'governance-advisor',
    name: 'Governance Advisor',
    description: 'Ensures compliance and best practices',
    systemPrompt: `You are a governance advisor for Sprinter AI. You ensure compliance, security, and best practices.
    Focus on:
    - Data privacy compliance
    - Security protocols
    - Risk assessment
    - Audit trails
    - Policy enforcement
    - Ethical AI practices`,
    model: 'gpt-4o-mini',
    temperature: 0.2,
    maxSteps: 4,
    capabilities: [
      AgentCapability.DATABASE_ACCESS,
      AgentCapability.REPORT_GENERATION,
    ],
    metadata: {
      adminOnly: true,
      category: 'compliance'
    }
  }
];

export function getAgentsByCategory(category: string): AgentConfig[] {
  return defaultAgents.filter(agent => agent.metadata?.category === category);
}

export function getAgentsByCapability(capability: AgentCapability): AgentConfig[] {
  return defaultAgents.filter(agent => agent.capabilities.includes(capability));
}

export function getPublicAgents(): AgentConfig[] {
  return defaultAgents.filter(agent => !agent.metadata?.adminOnly);
}

export function getAdminAgents(): AgentConfig[] {
  return defaultAgents.filter(agent => agent.metadata?.adminOnly);
}

export function getAgentById(id: string): AgentConfig | undefined {
  return defaultAgents.find(agent => agent.id === id);
}

export function getAgentForContext(context: {
  isAdmin?: boolean;
  pageSection?: string;
  userIntent?: string;
}): AgentConfig {
  // Smart agent selection based on context
  if (context.isAdmin) {
    if (context.pageSection === 'articles') return getAgentById('content-manager')!;
    if (context.pageSection === 'images') return getAgentById('image-generator')!;
    if (context.pageSection === 'settings') return getAgentById('database-manager')!;
    if (context.pageSection === 'analytics') return getAgentById('analytics-agent')!;
  }
  
  if (context.userIntent) {
    const intent = context.userIntent.toLowerCase();
    if (intent.includes('image') || intent.includes('generate') || intent.includes('create')) {
      return getAgentById('image-generator')!;
    }
    if (intent.includes('price') || intent.includes('cost') || intent.includes('demo')) {
      return getAgentById('sales-agent')!;
    }
    if (intent.includes('technical') || intent.includes('implement') || intent.includes('integrate')) {
      return getAgentById('technical-advisor')!;
    }
  }
  
  return getAgentById('customer-support')!;
}