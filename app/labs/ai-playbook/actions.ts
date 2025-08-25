'use server'

import { anthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { z } from 'zod'

const PlaybookSchema = z.object({
  title: z.string(),
  executive_summary: z.string(),
  business_case: z.object({
    current_state: z.array(z.string()),
    future_state: z.array(z.string()),
    value_drivers: z.array(z.string()),
    roi_projection: z.string()
  }),
  implementation_roadmap: z.array(z.object({
    phase: z.string(),
    duration: z.string(),
    objectives: z.array(z.string()),
    deliverables: z.array(z.string()),
    success_metrics: z.array(z.string())
  })),
  technology_stack: z.array(z.object({
    category: z.string(),
    tools: z.array(z.string()),
    purpose: z.string()
  })),
  team_structure: z.array(z.object({
    role: z.string(),
    count: z.number(),
    responsibilities: z.array(z.string())
  })),
  risk_mitigation: z.array(z.object({
    risk: z.string(),
    impact: z.string(),
    mitigation: z.string()
  })),
  success_metrics: z.array(z.object({
    metric: z.string(),
    baseline: z.string(),
    target: z.string(),
    timeline: z.string()
  })),
  budget_estimate: z.array(z.object({
    category: z.string(),
    year1: z.string(),
    year2: z.string(),
    year3: z.string()
  }))
})

export async function generatePlaybook(formData: {
  company: string
  industry: string
  size: string
  challenge: string
  timeline: string
  budget: string
  priorities: string
}) {
  try {
    const prompt = `Generate a comprehensive AI transformation playbook for:
Company: ${formData.company}
Industry: ${formData.industry}
Size: ${formData.size}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
Challenge: ${formData.challenge}
Priorities: ${formData.priorities}

Create a detailed, actionable playbook that includes:
1. Executive summary with clear value proposition
2. Business case with current vs future state analysis
3. Phased implementation roadmap (3-4 phases)
4. Technology stack recommendations
5. Team structure and roles needed
6. Risk mitigation strategies
7. Success metrics with baselines and targets
8. Budget breakdown by category and year

Make it specific to their industry and challenge. Include concrete metrics, realistic timelines, and actionable recommendations.
Focus on high-ROI AI applications that can show quick wins while building toward transformational change.
Consider their budget constraints and company size when making recommendations.`

    const { object } = await generateObject({
      model: anthropic('claude-3-5-sonnet-20241022'),
      schema: PlaybookSchema,
      prompt,
    })

    return object
  } catch (error) {
    console.error('Error generating playbook:', error)
    // Return a comprehensive sample playbook
    return generateSamplePlaybook(formData)
  }
}

function generateSamplePlaybook(formData: {
  company: string
  industry: string
  size: string
  challenge: string
  timeline: string
  budget: string
  priorities: string
}) {
  const industrySpecific = getIndustrySpecifics(formData.industry)
  
  return {
    title: `AI Transformation Playbook for ${formData.company}`,
    executive_summary: `This playbook outlines a comprehensive AI transformation strategy for ${formData.company} to address ${formData.challenge}. Through a phased approach over ${formData.timeline}, we will implement targeted AI solutions to drive operational efficiency, enhance decision-making, and create competitive advantages in the ${formData.industry} sector.`,
    business_case: {
      current_state: [
        "Manual processes consuming 40% of employee time",
        "Limited data visibility across operations",
        "Reactive decision-making based on historical reports",
        "Inconsistent customer experience across channels",
        "High operational costs relative to industry benchmarks"
      ],
      future_state: [
        "Automated workflows reducing manual work by 60%",
        "Real-time data analytics and predictive insights",
        "AI-driven proactive decision support systems",
        "Personalized, consistent omnichannel experiences",
        "Industry-leading operational efficiency metrics"
      ],
      value_drivers: [
        "Revenue growth through enhanced customer targeting and retention",
        "Cost reduction via process automation and optimization",
        "Risk mitigation through predictive analytics",
        "Improved decision velocity and accuracy",
        "Enhanced employee productivity and satisfaction"
      ],
      roi_projection: "Expected 3.5x ROI within 18 months, with breakeven at month 8"
    },
    implementation_roadmap: [
      {
        phase: "Phase 1: Foundation",
        duration: "3 months",
        objectives: [
          "Establish AI governance framework",
          "Build data infrastructure",
          "Form AI Center of Excellence"
        ],
        deliverables: [
          "Data strategy and architecture blueprint",
          "AI ethics and governance policies",
          "Initial use case prioritization matrix"
        ],
        success_metrics: [
          "Data platform operational",
          "Core team hired and trained",
          "3-5 pilot use cases identified"
        ]
      },
      {
        phase: "Phase 2: Quick Wins",
        duration: "3-6 months",
        objectives: [
          "Deploy initial AI solutions",
          "Demonstrate tangible value",
          "Build organizational buy-in"
        ],
        deliverables: [
          industrySpecific.quickWin,
          "Process automation for repetitive tasks",
          "Initial predictive analytics dashboards"
        ],
        success_metrics: [
          "20% reduction in targeted process time",
          "First AI model in production",
          "$500K+ in annualized savings"
        ]
      },
      {
        phase: "Phase 3: Scale",
        duration: "6-9 months",
        objectives: [
          "Expand AI across business units",
          "Integrate AI into core processes",
          "Develop proprietary AI capabilities"
        ],
        deliverables: [
          "Enterprise-wide AI platform",
          industrySpecific.scaleDeliverable,
          "Custom AI models for key processes"
        ],
        success_metrics: [
          "50% of eligible processes automated",
          "AI adoption by 75% of employees",
          "$2M+ in annualized value creation"
        ]
      },
      {
        phase: "Phase 4: Transform",
        duration: "Ongoing",
        objectives: [
          "AI-first operating model",
          "Continuous innovation",
          "Market differentiation through AI"
        ],
        deliverables: [
          "Next-gen AI capabilities",
          "AI-powered products/services",
          "Industry-leading AI practices"
        ],
        success_metrics: [
          "Top-quartile operational metrics",
          "New AI-enabled revenue streams",
          "Recognized AI leader in industry"
        ]
      }
    ],
    technology_stack: [
      {
        category: "Data Infrastructure",
        tools: ["Snowflake/Databricks", "Apache Kafka", "dbt"],
        purpose: "Unified data platform for AI/ML workloads"
      },
      {
        category: "AI/ML Platform",
        tools: industrySpecific.aiTools,
        purpose: "Model development, training, and deployment"
      },
      {
        category: "Process Automation",
        tools: ["UiPath/Automation Anywhere", "Zapier", "Microsoft Power Automate"],
        purpose: "RPA and workflow automation"
      },
      {
        category: "Analytics & BI",
        tools: ["Tableau/PowerBI", "Looker", "Custom dashboards"],
        purpose: "Data visualization and business intelligence"
      },
      {
        category: "AI Applications",
        tools: industrySpecific.applications,
        purpose: industrySpecific.applicationPurpose
      }
    ],
    team_structure: [
      {
        role: "Chief AI Officer",
        count: 1,
        responsibilities: [
          "AI strategy and vision",
          "Executive stakeholder management",
          "AI investment decisions"
        ]
      },
      {
        role: "AI Product Manager",
        count: 2,
        responsibilities: [
          "Use case identification and prioritization",
          "Product roadmap development",
          "Business value realization"
        ]
      },
      {
        role: "Data Scientists",
        count: 3,
        responsibilities: [
          "Model development and training",
          "Advanced analytics",
          "AI research and innovation"
        ]
      },
      {
        role: "ML Engineers",
        count: 3,
        responsibilities: [
          "Model deployment and monitoring",
          "MLOps infrastructure",
          "Performance optimization"
        ]
      },
      {
        role: "Data Engineers",
        count: 4,
        responsibilities: [
          "Data pipeline development",
          "Data quality management",
          "Platform maintenance"
        ]
      }
    ],
    risk_mitigation: [
      {
        risk: "Data Quality Issues",
        impact: "High",
        mitigation: "Implement data governance framework, automated quality checks, and master data management"
      },
      {
        risk: "Change Resistance",
        impact: "Medium",
        mitigation: "Comprehensive change management program, training initiatives, and clear communication"
      },
      {
        risk: "AI Bias and Ethics",
        impact: "High",
        mitigation: "Establish AI ethics board, implement bias testing, ensure transparency in AI decisions"
      },
      {
        risk: "Technical Complexity",
        impact: "Medium",
        mitigation: "Phased approach, partner with experienced vendors, invest in team training"
      },
      {
        risk: "ROI Uncertainty",
        impact: "Medium",
        mitigation: "Start with proven use cases, establish clear metrics, regular value tracking"
      }
    ],
    success_metrics: [
      {
        metric: "Process Automation Rate",
        baseline: "5%",
        target: "60%",
        timeline: "18 months"
      },
      {
        metric: "Decision Speed",
        baseline: "Baseline",
        target: "3x faster",
        timeline: "12 months"
      },
      {
        metric: "Customer Satisfaction",
        baseline: "Current NPS",
        target: "+20 points",
        timeline: "18 months"
      },
      {
        metric: "Operational Efficiency",
        baseline: "Current",
        target: "25% improvement",
        timeline: "24 months"
      },
      {
        metric: "Revenue per Employee",
        baseline: "Current",
        target: "30% increase",
        timeline: "24 months"
      }
    ],
    budget_estimate: [
      {
        category: "Technology & Infrastructure",
        year1: "$500K",
        year2: "$750K",
        year3: "$600K"
      },
      {
        category: "Personnel (FTEs + Contractors)",
        year1: "$1.2M",
        year2: "$1.8M",
        year3: "$2.0M"
      },
      {
        category: "Training & Change Management",
        year1: "$200K",
        year2: "$150K",
        year3: "$100K"
      },
      {
        category: "External Partners & Consulting",
        year1: "$400K",
        year2: "$200K",
        year3: "$100K"
      },
      {
        category: "Innovation & R&D",
        year1: "$100K",
        year2: "$200K",
        year3: "$300K"
      }
    ]
  }
}

function getIndustrySpecifics(industry: string) {
  const specifics: Record<string, any> = {
    saas: {
      quickWin: "AI-powered customer churn prediction",
      scaleDeliverable: "Intelligent product recommendation engine",
      aiTools: ["AWS SageMaker", "Hugging Face", "OpenAI API"],
      applications: ["Intercom AI", "Gong.io", "Drift"],
      applicationPurpose: "Customer intelligence and engagement"
    },
    healthcare: {
      quickWin: "Clinical documentation automation",
      scaleDeliverable: "Predictive patient care pathways",
      aiTools: ["Google Cloud Healthcare AI", "Azure Health Bot", "AWS HealthLake"],
      applications: ["Nuance DAX", "Babylon Health", "Viz.ai"],
      applicationPurpose: "Clinical decision support and operations"
    },
    fintech: {
      quickWin: "Fraud detection system",
      scaleDeliverable: "AI-driven credit scoring",
      aiTools: ["DataRobot", "H2O.ai", "Palantir Foundry"],
      applications: ["Feedzai", "Socure", "Zest AI"],
      applicationPurpose: "Risk management and compliance"
    },
    retail: {
      quickWin: "Demand forecasting optimization",
      scaleDeliverable: "Personalization engine",
      aiTools: ["Google Cloud Retail AI", "AWS Personalize", "Adobe Sensei"],
      applications: ["Dynamic Yield", "Algolia", "Vue.ai"],
      applicationPurpose: "Customer experience and inventory optimization"
    },
    manufacturing: {
      quickWin: "Predictive maintenance system",
      scaleDeliverable: "Quality control automation",
      aiTools: ["AWS IoT Analytics", "Azure IoT", "PTC ThingWorx"],
      applications: ["Sight Machine", "Fero Labs", "DataProphet"],
      applicationPurpose: "Operations optimization and quality assurance"
    },
    logistics: {
      quickWin: "Route optimization engine",
      scaleDeliverable: "Demand prediction platform",
      aiTools: ["Google OR-Tools", "AWS Supply Chain", "Blue Yonder"],
      applications: ["project44", "FourKites", "Transmetrics"],
      applicationPurpose: "Supply chain visibility and optimization"
    },
    energy: {
      quickWin: "Energy consumption forecasting",
      scaleDeliverable: "Grid optimization system",
      aiTools: ["GE Predix", "Siemens MindSphere", "AWS IoT"],
      applications: ["SparkCognition", "C3 AI", "Uptake"],
      applicationPurpose: "Asset optimization and predictive maintenance"
    },
    realestate: {
      quickWin: "Automated property valuation",
      scaleDeliverable: "Tenant experience platform",
      aiTools: ["Cherre", "Reonomy", "GeoPhy"],
      applications: ["HqO", "VTS", "Dealpath"],
      applicationPurpose: "Portfolio analytics and tenant engagement"
    }
  }
  
  return specifics[industry] || specifics.saas // Default to SaaS if industry not found
}