import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";

// Input schema
export const proposalGeneratorInputSchema = z.object({
  clientName: z.string().describe("Client company name"),
  clientIndustry: z.string().describe("Client industry or sector"),
  projectType: z.enum(["consulting", "software_development", "marketing", "training", "audit", "custom"]).describe("Type of project or service"),
  projectScope: z.string().describe("Detailed project scope and requirements"),
  timeline: z.string().describe("Project timeline (e.g., '3 months', '6-8 weeks')"),
  budget: z.number().optional().describe("Proposed budget in dollars (optional)"),
  keyStakeholders: z.array(z.string()).describe("Key client stakeholders and decision makers"),
  deliverables: z.array(z.string()).describe("Expected project deliverables"),
  constraints: z.string().optional().describe("Known constraints or limitations"),
  competitiveAdvantage: z.string().describe("Your unique value proposition"),
  proposalTone: z.enum(["formal", "professional", "friendly", "technical"]).describe("Tone for the proposal"),
  includeCase_studies: z.boolean().default(true).describe("Include relevant case studies"),
  includeTestimonials: z.boolean().default(true).describe("Include client testimonials")
});

// Output schema
export const proposalGeneratorOutputSchema = z.object({
  executiveSummary: z.string().describe("Compelling executive summary"),
  problemStatement: z.string().describe("Client problem and pain points"),
  proposedSolution: z.object({
    approach: z.string(),
    methodology: z.string(),
    timeline: z.string(),
    phases: z.array(z.object({
      phase: z.string(),
      duration: z.string(),
      activities: z.array(z.string()),
      deliverables: z.array(z.string())
    }))
  }).describe("Detailed solution approach"),
  investmentBreakdown: z.object({
    totalInvestment: z.number(),
    breakdown: z.array(z.object({
      category: z.string(),
      amount: z.number(),
      description: z.string()
    })),
    paymentTerms: z.string()
  }).describe("Investment and pricing breakdown"),
  teamAndExpertise: z.object({
    teamComposition: z.array(z.object({
      role: z.string(),
      expertise: z.string(),
      allocation: z.string()
    })),
    relevantExperience: z.array(z.string()),
    certifications: z.array(z.string())
  }).describe("Team expertise and qualifications"),
  riskMitigation: z.array(z.object({
    risk: z.string(),
    likelihood: z.enum(["low", "medium", "high"]),
    impact: z.enum(["low", "medium", "high"]),
    mitigation: z.string()
  })).describe("Risk analysis and mitigation strategies"),
  expectedOutcomes: z.object({
    businessImpact: z.array(z.string()),
    kpis: z.array(z.object({
      metric: z.string(),
      baseline: z.string(),
      target: z.string()
    })),
    roi: z.string()
  }).describe("Expected business outcomes and ROI"),
  nextSteps: z.array(z.string()).describe("Recommended next steps"),
  appendices: z.object({
    caseStudies: z.array(z.object({
      title: z.string(),
      client: z.string(),
      challenge: z.string(),
      solution: z.string(),
      results: z.string()
    })),
    testimonials: z.array(z.object({
      client: z.string(),
      role: z.string(),
      quote: z.string()
    }))
  }).describe("Supporting materials and references"),
  proposalValidityPeriod: z.string().describe("How long the proposal is valid"),
  contactInformation: z.object({
    primaryContact: z.string(),
    email: z.string(),
    phone: z.string(),
    availability: z.string()
  }).describe("Contact information for follow-up")
});

export type ProposalGeneratorInput = z.infer<typeof proposalGeneratorInputSchema>;
export type ProposalGeneratorOutput = z.infer<typeof proposalGeneratorOutputSchema>;

const proposalGeneratorTool: ToolSpec<
  typeof proposalGeneratorInputSchema,
  typeof proposalGeneratorOutputSchema
> = {
  slug: "proposal-generator",
  name: "AI Proposal Generator",
  description: "Create professional proposals instantly with AI assistance",
  version: "1.0.0",
  inputSchema: proposalGeneratorInputSchema,
  outputSchema: proposalGeneratorOutputSchema,

  execute: async (input) => {
    // Generate executive summary
    const executiveSummary = `We are pleased to present this comprehensive proposal for ${input.clientName}'s ${input.projectType} initiative. Our team brings proven expertise in the ${input.clientIndustry} sector, with a track record of delivering exceptional results through our innovative ${input.competitiveAdvantage}. This proposal outlines our strategic approach to address your key challenges and deliver measurable business value within your ${input.timeline} timeframe.`;

    // Generate problem statement
    const problemStatement = `${input.clientName} operates in the competitive ${input.clientIndustry} market, where ${input.projectScope.toLowerCase().includes('digital') ? 'digital transformation' : 'operational efficiency'} has become critical for sustainable growth. The current challenges include the need for ${input.projectScope}, which requires specialized expertise and proven methodologies to ensure successful implementation and measurable results.`;

    // Generate project phases
    const phases = [
      {
        phase: "Discovery & Analysis",
        duration: "2-3 weeks",
        activities: [
          "Stakeholder interviews and requirements gathering",
          "Current state analysis and documentation",
          "Gap analysis and opportunity identification",
          "Risk assessment and mitigation planning"
        ],
        deliverables: [
          "Detailed requirements document",
          "Current state assessment report",
          "Risk analysis and mitigation plan"
        ]
      },
      {
        phase: "Solution Design",
        duration: "3-4 weeks",
        activities: [
          "Solution architecture and design",
          "Implementation roadmap development",
          "Resource allocation and timeline planning",
          "Stakeholder approval and sign-off"
        ],
        deliverables: [
          "Solution architecture document",
          "Detailed implementation plan",
          "Resource allocation matrix"
        ]
      },
      {
        phase: "Implementation",
        duration: "6-8 weeks",
        activities: [
          "Core solution development and configuration",
          "Integration with existing systems",
          "Quality assurance and testing",
          "User training and change management"
        ],
        deliverables: input.deliverables.length > 0 ? input.deliverables : [
          "Fully implemented solution",
          "Integration documentation",
          "User training materials"
        ]
      },
      {
        phase: "Deployment & Optimization",
        duration: "2-3 weeks",
        activities: [
          "Production deployment and go-live support",
          "Performance monitoring and optimization",
          "User support and issue resolution",
          "Knowledge transfer and documentation"
        ],
        deliverables: [
          "Production-ready system",
          "Performance optimization report",
          "Complete documentation package"
        ]
      }
    ];

    // Calculate investment breakdown
    const baseAmount = input.budget || Math.floor(Math.random() * 200000) + 50000;
    const breakdown = [
      {
        category: "Professional Services",
        amount: Math.floor(baseAmount * 0.65),
        description: "Senior consultants and project management"
      },
      {
        category: "Technology & Tools",
        amount: Math.floor(baseAmount * 0.20),
        description: "Software licenses, platforms, and development tools"
      },
      {
        category: "Training & Change Management",
        amount: Math.floor(baseAmount * 0.10),
        description: "User training and organizational change support"
      },
      {
        category: "Project Management",
        amount: Math.floor(baseAmount * 0.05),
        description: "Project coordination and reporting"
      }
    ];

    // Generate team composition
    const teamComposition = [
      {
        role: "Project Director",
        expertise: "15+ years in " + input.clientIndustry + " transformations",
        allocation: "25%"
      },
      {
        role: "Senior Consultant",
        expertise: "Specialized in " + input.projectType + " implementations",
        allocation: "75%"
      },
      {
        role: "Technical Lead",
        expertise: "Solution architecture and system integration",
        allocation: "50%"
      },
      {
        role: "Change Management Specialist",
        expertise: "Organizational change and user adoption",
        allocation: "30%"
      }
    ];

    // Generate risk mitigation
    const risks = [
      {
        risk: "Scope creep during implementation",
        likelihood: "medium" as const,
        impact: "medium" as const,
        mitigation: "Establish clear change control process and regular stakeholder reviews"
      },
      {
        risk: "Integration complexity with legacy systems",
        likelihood: "low" as const,
        impact: "high" as const,
        mitigation: "Thorough technical assessment and phased integration approach"
      },
      {
        risk: "User adoption challenges",
        likelihood: "medium" as const,
        impact: "medium" as const,
        mitigation: "Comprehensive training program and change management support"
      }
    ];

    // Generate KPIs
    const kpis = [
      {
        metric: "Operational Efficiency",
        baseline: "Current state baseline",
        target: "25-30% improvement"
      },
      {
        metric: "User Satisfaction",
        baseline: "Pre-implementation survey",
        target: ">85% satisfaction score"
      },
      {
        metric: "Implementation Timeline",
        baseline: input.timeline,
        target: "On-time delivery"
      }
    ];

    // Generate case studies
    const caseStudies = input.includeCase_studies ? [
      {
        title: "Similar " + input.projectType + " Implementation",
        client: "Fortune 500 " + input.clientIndustry + " Company",
        challenge: "Needed to modernize operations and improve efficiency",
        solution: "Implemented comprehensive solution with phased approach",
        results: "35% efficiency improvement and $2M annual savings"
      },
      {
        title: "Digital Transformation Initiative",
        client: "Mid-market " + input.clientIndustry + " Organization",
        challenge: "Legacy systems limiting growth and agility",
        solution: "Custom solution with modern architecture and integration",
        results: "50% faster processing and improved customer satisfaction"
      }
    ] : [];

    // Generate testimonials
    const testimonials = input.includeTestimonials ? [
      {
        client: "Global " + input.clientIndustry + " Leader",
        role: "Chief Technology Officer",
        quote: "The team delivered exceptional results on time and within budget. Their expertise and professionalism exceeded our expectations."
      },
      {
        client: "Regional " + input.clientIndustry + " Company",
        role: "VP of Operations",
        quote: "Outstanding project management and technical delivery. The solution has transformed our business operations."
      }
    ] : [];

    return {
      executiveSummary,
      problemStatement,
      proposedSolution: {
        approach: `Our proven methodology combines industry best practices with ${input.competitiveAdvantage} to deliver comprehensive solutions tailored to ${input.clientName}'s specific requirements.`,
        methodology: "Agile delivery methodology with regular stakeholder engagement and iterative development cycles",
        timeline: input.timeline,
        phases
      },
      investmentBreakdown: {
        totalInvestment: baseAmount,
        breakdown,
        paymentTerms: "30% upfront, 40% at 50% completion, 30% upon final delivery"
      },
      teamAndExpertise: {
        teamComposition,
        relevantExperience: [
          "10+ successful implementations in " + input.clientIndustry,
          "Certified expertise in leading platforms and technologies",
          "Proven track record of on-time, on-budget delivery",
          "Deep understanding of industry regulations and compliance"
        ],
        certifications: [
          "Industry-specific certifications",
          "Project Management Professional (PMP)",
          "Technology platform certifications",
          "Change management certifications"
        ]
      },
      riskMitigation: risks,
      expectedOutcomes: {
        businessImpact: [
          "Improved operational efficiency and productivity",
          "Enhanced decision-making capabilities",
          "Reduced manual processes and errors",
          "Better customer experience and satisfaction",
          "Scalable foundation for future growth"
        ],
        kpis,
        roi: "Expected ROI of 200-300% within 18 months of implementation"
      },
      nextSteps: [
        "Review and discuss proposal with key stakeholders",
        "Schedule detailed solution walkthrough presentation",
        "Finalize project scope and timeline",
        "Execute master services agreement",
        "Initiate project kickoff and discovery phase"
      ],
      appendices: {
        caseStudies,
        testimonials
      },
      proposalValidityPeriod: "This proposal is valid for 30 days from the date of submission",
      contactInformation: {
        primaryContact: "Senior Director, Client Solutions",
        email: "solutions@sprinterai.com",
        phone: "+1 (555) 123-4567",
        availability: "Available for discussion Monday-Friday, 9 AM - 6 PM EST"
      }
    };
  }
};

export default proposalGeneratorTool;