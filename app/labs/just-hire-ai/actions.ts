"use server";

import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

interface ReplacementInput {
  jobTitle: string;
  salary: number;
  tasks?: string;
}

export async function generateAIReplacement(input: ReplacementInput) {
  const { jobTitle, salary, tasks } = input;

  const prompt = `
    Analyze how AI agents could augment or replace the role of ${jobTitle}.
    Current salary: $${salary}/year
    ${tasks ? `Key tasks: ${tasks}` : ''}
    
    Provide a realistic, balanced analysis including:
    1. Specific AI agent configuration (name, type, capabilities)
    2. What tasks can be automated vs what requires humans
    3. Required tools and integrations
    4. Implementation timeline and approach
    5. Cost comparison and ROI
    6. Honest assessment of limitations
    7. Optimal human + AI collaboration model
    
    Be realistic about current AI capabilities. Don't oversell or undersell.
    Focus on practical implementation that could work today.
    
    Format as JSON with clear structure.
  `;

  try {
    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      prompt,
      temperature: 0.7,
    });

    // Parse response - in production add error handling
    const aiAnalysis = JSON.parse(text);
    
    return formatAnalysis(jobTitle, salary, aiAnalysis);
  } catch (error) {
    console.error("Error generating replacement analysis:", error);
    
    // Return mock analysis for demonstration
    return generateMockAnalysis(jobTitle, salary);
  }
}

function formatAnalysis(jobTitle: string, salary: number, aiData: any) {
  return {
    jobTitle,
    aiAgent: {
      name: aiData.agentName || `AI ${jobTitle} Assistant`,
      type: aiData.agentType || "Specialized AI Agent",
      capabilities: aiData.capabilities || getDefaultCapabilities(jobTitle),
      tools: aiData.tools || getDefaultTools(jobTitle),
      cost: aiData.cost || calculateAICost(salary),
      implementation: aiData.implementation || getDefaultImplementation(),
      pros: aiData.pros || getDefaultPros(),
      cons: aiData.cons || getDefaultCons(),
      humanCollaboration: aiData.collaboration || getDefaultCollaboration(jobTitle)
    },
    savings: calculateSavings(salary, aiData.cost),
    recommendation: aiData.recommendation || generateRecommendation(jobTitle, salary)
  };
}

function getDefaultCapabilities(jobTitle: string): string[] {
  const roleCapabilities: Record<string, string[]> = {
    "Data Analyst": [
      "Automated data cleaning and preprocessing",
      "Statistical analysis and hypothesis testing",
      "Predictive modeling and forecasting",
      "Real-time dashboard generation",
      "Natural language report writing"
    ],
    "Customer Support Rep": [
      "24/7 instant response to inquiries",
      "Multi-language support",
      "Sentiment analysis and escalation",
      "Knowledge base search and retrieval",
      "Ticket routing and prioritization"
    ],
    "Content Writer": [
      "SEO-optimized article generation",
      "Style and tone matching",
      "Research and fact-checking",
      "Multi-format content creation",
      "Content personalization at scale"
    ],
    "default": [
      "Task automation and workflow optimization",
      "Data processing and analysis",
      "Pattern recognition and insights",
      "24/7 availability and scalability",
      "Consistent quality and compliance"
    ]
  };
  
  return roleCapabilities[jobTitle] || roleCapabilities.default;
}

function getDefaultTools(jobTitle: string): string[] {
  const roleTools: Record<string, string[]> = {
    "Data Analyst": [
      "Python/R for statistical analysis",
      "Tableau/PowerBI for visualization",
      "SQL for database queries",
      "AutoML platforms (DataRobot, H2O.ai)",
      "OpenAI/Anthropic for natural language"
    ],
    "Customer Support Rep": [
      "Zendesk or Intercom for ticketing",
      "DialogFlow or Rasa for NLU",
      "GPT-5 for response generation",
      "Slack/Teams for escalation",
      "CRM integration (Salesforce, HubSpot)"
    ],
    "Content Writer": [
      "GPT-5 or Claude for content generation",
      "Jasper.ai or Copy.ai for marketing",
      "Grammarly for editing",
      "SEMrush for SEO optimization",
      "Canva API for visual content"
    ],
    "default": [
      "Foundation model (GPT-5, Claude)",
      "Workflow automation (Zapier, Make)",
      "Data integration platform",
      "Monitoring and analytics dashboard",
      "Human-in-the-loop interface"
    ]
  };
  
  return roleTools[jobTitle] || roleTools.default;
}

function calculateAICost(humanSalary: number): string {
  // Rough estimate: AI typically costs 10-30% of human equivalent
  const aiCost = humanSalary * 0.2;
  return `$${Math.round(aiCost).toLocaleString()}/year`;
}

function calculateSavings(salary: number, aiCostStr?: string) {
  const aiCost = aiCostStr ? 
    parseInt(aiCostStr.replace(/[^0-9]/g, '')) : 
    salary * 0.2;
  
  const annualSavings = salary - aiCost;
  const percentage = Math.round((annualSavings / salary) * 100);
  const breakeven = aiCost > 50000 ? "3-6 months" : "1-3 months";
  
  return {
    annual: `$${annualSavings.toLocaleString()}`,
    percentage: `${percentage}%`,
    breakeven
  };
}

function getDefaultImplementation(): string {
  return "Phase 1 (Weeks 1-2): Tool selection and integration setup. Phase 2 (Weeks 3-4): AI training on historical data and workflows. Phase 3 (Weeks 5-8): Parallel running with human oversight. Phase 4 (Week 9+): Full deployment with continuous optimization.";
}

function getDefaultPros(): string[] {
  return [
    "24/7 availability without overtime",
    "Scales instantly with demand",
    "Consistent quality and compliance",
    "No training or onboarding needed",
    "Continuous learning and improvement"
  ];
}

function getDefaultCons(): string[] {
  return [
    "Lacks human intuition and empathy",
    "May struggle with edge cases",
    "Requires technical oversight",
    "Initial setup and integration costs",
    "Potential for bias in decisions"
  ];
}

function getDefaultCollaboration(jobTitle: string): string {
  return `The optimal model pairs AI agents with human experts in a 80/20 split. AI handles routine ${jobTitle.toLowerCase()} tasks, data processing, and first-line responses. Humans focus on complex cases, relationship building, strategic decisions, and AI oversight. This hybrid approach delivers 3x productivity while maintaining quality and human touch where it matters most.`;
}

function generateRecommendation(jobTitle: string, salary: number): string {
  if (salary < 50000) {
    return `For this ${jobTitle} role, AI automation offers compelling ROI with 70-80% cost reduction. The role's structured tasks are well-suited for current AI capabilities. Recommend phased implementation starting with highest-volume tasks, maintaining human oversight for quality assurance and exception handling.`;
  } else if (salary < 100000) {
    return `This ${jobTitle} position presents a strong case for AI augmentation rather than full replacement. Deploy AI to handle 60-70% of routine tasks, allowing human workers to focus on high-value activities. This hybrid model can double productivity while maintaining the human expertise needed for complex decisions.`;
  } else {
    return `Given the complexity and strategic nature of this ${jobTitle} role, AI should augment rather than replace human expertise. Focus on AI tools that amplify human capabilities - automating research, analysis, and routine tasks while preserving human judgment for critical decisions. Expected productivity gain of 40-50%.`;
  }
}

function generateMockAnalysis(jobTitle: string, salary: number) {
  return {
    jobTitle,
    aiAgent: {
      name: `${jobTitle} AI Assistant`,
      type: "Specialized Workflow Agent",
      capabilities: getDefaultCapabilities(jobTitle),
      tools: getDefaultTools(jobTitle),
      cost: calculateAICost(salary),
      implementation: getDefaultImplementation(),
      pros: getDefaultPros(),
      cons: getDefaultCons(),
      humanCollaboration: getDefaultCollaboration(jobTitle)
    },
    savings: calculateSavings(salary),
    recommendation: generateRecommendation(jobTitle, salary)
  };
}