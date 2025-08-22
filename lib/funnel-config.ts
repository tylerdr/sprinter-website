// PE Growth Funnel Configuration
// Using verbs for consistency: Assess → Sprint → Scale → Partner

export const FUNNEL_STAGES = {
  ASSESS: {
    verb: "Assess",
    noun: "Assessment",
    title: "AI Readiness Assessment",
    price: "FREE",
    duration: "24 hours",
    value: 0,
    description: "Discover your highest-ROI AI opportunities with a custom Portfolio AI Blueprint",
    deliverables: [
      "Portfolio-wide AI opportunity analysis",
      "ROI projections for top 10 use cases",
      "Implementation roadmap & timeline",
      "Risk assessment & mitigation plan",
      "Competitive benchmarking report"
    ],
    cta: {
      primary: "Get Free Assessment",
      secondary: "Start Your Assessment"
    },
    href: "/ai-assessment",
    color: "green" as const,
  },
  
  SPRINT: {
    verb: "Sprint",
    noun: "Sprint",
    title: "AI Sprint",
    price: "$10,000",
    priceNote: "per week",
    duration: "1-4 weeks",
    value: 10000,
    valuePerWeek: 10000,
    description: "Build and deploy working AI prototypes with guaranteed 10× ROI",
    deliverables: [
      "Working AI prototype or MVP",
      "Full source code & documentation",
      "Team training & knowledge transfer",
      "30-day post-sprint support",
      "Implementation playbook"
    ],
    options: [
      { weeks: 1, name: "Discovery Sprint", price: 10000 },
      { weeks: 2, name: "Prototype Sprint", price: 20000 },
      { weeks: 3, name: "Implementation Sprint", price: 30000 },
      { weeks: 4, name: "Transformation Sprint", price: 40000 },
    ],
    cta: {
      primary: "Book Your Sprint",
      secondary: "Start Sprinting"
    },
    href: "/ai-sprint",
    color: "blue" as const,
  },
  
  SCALE: {
    verb: "Scale",
    noun: "Scaling Program",
    title: "AI Scaling Program",
    price: "$50,000",
    priceNote: "per quarter",
    duration: "3 months",
    value: 50000,
    description: "Systematic AI deployment across multiple portfolio companies",
    deliverables: [
      "3 AI implementations (1 per month)",
      "Portfolio-wide deployment strategy",
      "Dedicated success manager",
      "Monthly executive briefings",
      "Quarterly board presentations",
      "Best practices playbook",
      "Cross-portfolio synergies"
    ],
    cta: {
      primary: "Start Scaling",
      secondary: "Scale Your Portfolio"
    },
    href: "/ai-scale",
    color: "purple" as const,
  },
  
  PARTNER: {
    verb: "Partner",
    noun: "Partnership",
    title: "AI Operating Partnership",
    price: "$100K+",
    priceNote: "per month",
    duration: "Ongoing",
    value: 100000,
    description: "Virtual AI operating partner with board-level advisory",
    deliverables: [
      "Unlimited AI implementations",
      "Dedicated team (3-5 specialists)",
      "Board seat or observer rights",
      "Weekly portfolio monitoring",
      "Custom AI venture studio",
      "White-label AI products",
      "Co-investment opportunities",
      "Revenue share on exits",
      "LP meeting participation",
      "Proprietary deal flow access"
    ],
    tiers: [
      { 
        name: "Advisory Partner", 
        price: 100000,
        description: "Strategic guidance and quarterly implementations",
        teamSize: 3
      },
      { 
        name: "Operating Partner", 
        price: 200000,
        description: "Full operating support with dedicated team",
        teamSize: 5
      },
      { 
        name: "Venture Partner", 
        price: 300000,
        description: "Co-investment and venture studio model",
        teamSize: 8
      },
    ],
    cta: {
      primary: "Explore Partnership",
      secondary: "Become Partners"
    },
    href: "/ai-partnership",
    color: "gold" as const,
  }
} as const;

// Progression incentives
export const PROGRESSION_BENEFITS = {
  ASSESS_TO_SPRINT: {
    discount: 0, // Free assessment always
    message: "Assessment participants get priority sprint scheduling"
  },
  SPRINT_TO_SCALE: {
    discount: 0.1, // 10% off
    message: "Sprint alumni get 10% off Scaling Program"
  },
  SCALE_TO_PARTNER: {
    discount: 0.15, // 15% off first month
    message: "Scaling Program graduates get 15% off first month of Partnership"
  }
};

// Value propositions for each transition
export const FUNNEL_TRANSITIONS = {
  WHY_ASSESS: [
    "100% free, no strings attached",
    "Get your custom report in 24 hours",
    "Identify $10M+ in potential value",
    "No technical knowledge required"
  ],
  WHY_SPRINT: [
    "See working AI in days, not months",
    "Fixed price, guaranteed ROI",
    "Keep all code and IP",
    "Perfect for testing AI potential"
  ],
  WHY_SCALE: [
    "Multiply success across portfolio",
    "Systematic rollout methodology",
    "Economies of scale pricing",
    "Cross-portfolio learnings"
  ],
  WHY_PARTNER: [
    "Dedicated AI team at fraction of hiring cost",
    "Board-level strategic guidance",
    "Continuous innovation pipeline",
    "Potential for co-investment upside"
  ]
};

// Pricing comparison
export const PRICING_COMPARISON = {
  IN_HOUSE: {
    cost: "$500K+ per year per hire",
    time: "6-12 months to build team",
    risk: "High - retention and skill gaps"
  },
  CONSULTANTS: {
    cost: "$500K+ per project",
    time: "3-6 months per project",
    risk: "Medium - knowledge leaves after project"
  },
  SPRINTER: {
    cost: "From $10K/week to $100K/month",
    time: "Start in days, scale as needed",
    risk: "None - pay as you go, cancel anytime"
  }
};