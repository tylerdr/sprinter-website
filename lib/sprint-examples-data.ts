/**
 * Sprint-based implementation examples
 * Extracted for easy CMS migration and consistent messaging
 */

export interface SprintExample {
  id: string;
  title: string;
  industry: string;
  useCase: string; // Links to use-cases-data.ts
  useCaseUrl: string;
  sprints: number;
  timeline: string;
  outcome: string;
  metrics: {
    label: string;
    value: string;
  }[];
  quote?: string;
  category: "finance" | "operations" | "sales" | "customer" | "analytics" | "automation";
}

/**
 * Diverse sprint examples across industries and functions
 * Balanced to avoid overemphasizing any single use case
 */
export const sprintExamples: SprintExample[] = [
  // Finance & Operations
  {
    id: "ap-automation-manufacturing",
    title: "AP Automation",
    industry: "Manufacturing",
    useCase: "AP & Expense Automation",
    useCaseUrl: "/solutions/ap-automation",
    sprints: 2,
    timeline: "2 sprints (20 days)",
    outcome: "64% touchless invoice processing, month-end close from day 15 to day 5",
    metrics: [
      { label: "Touchless Rate", value: "64%" },
      { label: "Time Savings", value: "75%" },
      { label: "Annual Savings", value: "$180K" }
    ],
    quote: "AP backlog eliminated. Month-end close moved from day 15 to day 5.",
    category: "finance"
  },

  // Sales & Revenue
  {
    id: "lead-scoring-saas",
    title: "Lead Scoring",
    industry: "B2B SaaS",
    useCase: "Sales Forecasting & Lead Scoring",
    useCaseUrl: "/use-cases/sales-forecasting",
    sprints: 2,
    timeline: "2 sprints (20 days)",
    outcome: "35% increase in conversion rates, sales team focused on high-value opportunities",
    metrics: [
      { label: "Conversion Lift", value: "35%" },
      { label: "Time Saved", value: "12 hrs/week" },
      { label: "Pipeline Growth", value: "28%" }
    ],
    quote: "Sales reps now spend 80% of their time on qualified leads instead of research.",
    category: "sales"
  },

  // Customer Experience
  {
    id: "churn-prediction-subscription",
    title: "Churn Prediction",
    industry: "Subscription Business",
    useCase: "Customer Support & Retention",
    useCaseUrl: "/use-cases/customer-support",
    sprints: 3,
    timeline: "3 sprints (30 days)",
    outcome: "25% churn reduction, proactive interventions for at-risk customers",
    metrics: [
      { label: "Churn Reduction", value: "25%" },
      { label: "Retained ARR", value: "$3M" },
      { label: "Early Detection", value: "30 days" }
    ],
    quote: "We now identify at-risk customers 30 days earlier and save 1 in 4.",
    category: "customer"
  },

  // Operations & Logistics
  {
    id: "demand-forecasting-distribution",
    title: "Demand Forecasting",
    industry: "Distribution",
    useCase: "Predictive Maintenance & Operations",
    useCaseUrl: "/use-cases/predictive-maintenance",
    sprints: 3,
    timeline: "3 sprints (30 days)",
    outcome: "30% inventory reduction, 92% order accuracy, 45% faster fulfillment",
    metrics: [
      { label: "Inventory Reduction", value: "30%" },
      { label: "Order Accuracy", value: "92%" },
      { label: "Fulfillment Speed", value: "+45%" }
    ],
    category: "operations"
  },

  // Contract & Document Processing
  {
    id: "contract-review-legal",
    title: "Contract Analysis",
    industry: "Legal Services",
    useCase: "Contract Analysis & Review",
    useCaseUrl: "/use-cases/contract-analysis",
    sprints: 2,
    timeline: "2 sprints (20 days)",
    outcome: "90% time reduction in contract review, 99% accuracy in risk identification",
    metrics: [
      { label: "Time Reduction", value: "90%" },
      { label: "Accuracy", value: "99%" },
      { label: "Contracts/Week", value: "10x" }
    ],
    quote: "What took 2 paralegals 2 weeks now takes 2 hours with AI review.",
    category: "automation"
  },

  // Manufacturing & Maintenance
  {
    id: "predictive-maintenance-manufacturing",
    title: "Predictive Maintenance",
    industry: "Manufacturing",
    useCase: "Predictive Maintenance System",
    useCaseUrl: "/use-cases/predictive-maintenance",
    sprints: 3,
    timeline: "3 sprints (30 days)",
    outcome: "40% reduction in unplanned downtime, $2M annual savings",
    metrics: [
      { label: "Downtime Reduction", value: "40%" },
      { label: "Annual Savings", value: "$2M" },
      { label: "Prediction Accuracy", value: "90%" }
    ],
    quote: "We predict machine failures 2 weeks in advance and schedule maintenance during planned downtime.",
    category: "operations"
  },

  // Healthcare & Services
  {
    id: "appointment-scheduling-healthcare",
    title: "Appointment Intelligence",
    industry: "Healthcare Services",
    useCase: "Intelligent Customer Support",
    useCaseUrl: "/use-cases/customer-support",
    sprints: 2,
    timeline: "2 sprints (20 days)",
    outcome: "85% reduction in no-shows, automated reminders and rescheduling",
    metrics: [
      { label: "No-Show Reduction", value: "85%" },
      { label: "Staff Time Saved", value: "20 hrs/week" },
      { label: "Patient Satisfaction", value: "+40%" }
    ],
    category: "customer"
  },

  // Content & Marketing
  {
    id: "content-generation-retail",
    title: "Product Content at Scale",
    industry: "E-commerce",
    useCase: "Automated Content Creation",
    useCaseUrl: "/use-cases/content-generation",
    sprints: 1,
    timeline: "1 sprint (10 days)",
    outcome: "10,000+ unique product pages in 90 days, 400% organic traffic growth",
    metrics: [
      { label: "Pages Created", value: "10K+" },
      { label: "Traffic Growth", value: "400%" },
      { label: "Cost per Page", value: "$0.85" }
    ],
    quote: "We generated in 3 months what would have taken our team 3 years.",
    category: "automation"
  },

  // Financial Services
  {
    id: "loan-underwriting-finance",
    title: "Loan Underwriting",
    industry: "Financial Services",
    useCase: "AI-Powered Loan Underwriting",
    useCaseUrl: "/use-cases/loan-underwriting",
    sprints: 3,
    timeline: "3 sprints (30 days)",
    outcome: "95% faster processing, 30% more approvals, 24/7 availability",
    metrics: [
      { label: "Processing Speed", value: "95% faster" },
      { label: "Approval Rate", value: "+30%" },
      { label: "Accuracy", value: "99%" }
    ],
    category: "finance"
  },

  // Proposal & Quote Generation
  {
    id: "proposal-automation-services",
    title: "Proposal Automation",
    industry: "Professional Services",
    useCase: "Quote Intelligence & Proposal Generation",
    useCaseUrl: "/solutions/quote-intelligence",
    sprints: 2,
    timeline: "2 sprints (20 days)",
    outcome: "60% reduction in proposal time, 15% higher win rate",
    metrics: [
      { label: "Time Reduction", value: "60%" },
      { label: "Win Rate Lift", value: "15%" },
      { label: "Proposals/Week", value: "3x" }
    ],
    quote: "Our team now focuses on customization instead of starting from scratch every time.",
    category: "sales"
  }
];

/**
 * Get examples by category for balanced representation
 */
export function getExamplesByCategory(category: SprintExample["category"], limit = 3) {
  return sprintExamples.filter(ex => ex.category === category).slice(0, limit);
}

/**
 * Get diverse examples across categories
 */
export function getDiverseExamples(limit = 6) {
  const categories: SprintExample["category"][] = ["finance", "sales", "customer", "operations", "automation", "analytics"];
  const examples: SprintExample[] = [];

  categories.forEach(cat => {
    const catExamples = sprintExamples.filter(ex => ex.category === cat);
    if (catExamples.length > 0 && examples.length < limit) {
      examples.push(catExamples[0]);
    }
  });

  return examples.slice(0, limit);
}

/**
 * Get examples for a specific industry
 */
export function getExamplesByIndustry(industry: string, limit = 3) {
  return sprintExamples
    .filter(ex => ex.industry.toLowerCase().includes(industry.toLowerCase()))
    .slice(0, limit);
}

/**
 * Sprint package configurations
 */
export const sprintPackages = {
  single: {
    name: "Single Sprint",
    sprints: 1,
    price: "$50K",
    timeline: "10 days",
    ideal: "Validate a focused use case",
    includes: [
      "Discovery and data mapping",
      "Working prototype with real data",
      "Baseline metrics and ROI projection",
      "Recommendation on whether to scale"
    ],
    examples: ["Lead scoring pilot", "Document classification", "Basic forecasting"]
  },
  pilot: {
    name: "3-Sprint Pilot",
    sprints: 3,
    price: "$135K",
    timeline: "30 days",
    ideal: "Prove value before scaling",
    includes: [
      "Sprint 1: Build and pilot with 5-10 users",
      "Sprint 2: Refine and deploy company-wide",
      "Sprint 3: Document playbook for portfolio rollout",
      "Production system with measured ROI"
    ],
    examples: ["AP automation", "Churn prediction", "Contract analysis"]
  },
  poc: {
    name: "4-6 Sprint POC",
    sprints: 5,
    price: "$200-300K",
    timeline: "50-60 days",
    ideal: "Validate across portfolio companies",
    includes: [
      "Deploy across 3-4 portfolio companies",
      "Test different industries/sales models",
      "Build reusable components",
      "Portfolio-wide playbook and best practices"
    ],
    examples: ["Sales acceleration (3 companies)", "Predictive maintenance (4 plants)", "Customer success AI (multiple verticals)"]
  },
  retainer: {
    name: "AI Operating Partner",
    sprints: "Flexible",
    price: "$15-25K/month + sprints",
    timeline: "Ongoing",
    ideal: "Continuous AI capability",
    includes: [
      "Monthly education on new AI capabilities",
      "Advisory hours for opportunity evaluation",
      "Priority access to sprint capacity",
      "Continuous monitoring and optimization"
    ],
    examples: ["Fund-level orchestration", "Portfolio-wide initiatives", "Continuous improvement"]
  }
};