// Funnel Theme Variants - Different metaphors for the same journey
// Each theme provides a complete narrative arc that reinforces the brand

export type FunnelTheme = "adventure" | "asap" | "motion";

export const FUNNEL_THEMES = {
  // Adventure/Journey Theme - Emphasizes exploration and progression
  adventure: {
    name: "Adventure Journey",
    tagline: "Your AI Adventure Starts Here",
    stages: {
      ASSESS: {
        verb: "Amble",
        noun: "Amble Assessment",
        metaphor: "Explore the terrain",
        description: "Take a leisurely walk through your AI opportunities. No rush, just discovery.",
        icon: "🚶",
        color: "emerald",
        imagery: "Starting a journey, looking at the map, choosing your path"
      },
      SPRINT: {
        verb: "Sprint",
        noun: "Sprint",
        metaphor: "Run fast, achieve quickly",
        description: "Push hard for rapid results. Intense but rewarding burst of progress.",
        icon: "🏃",
        color: "blue",
        imagery: "Racing toward a goal, focused energy, breakthrough momentum"
      },
      SCALE: {
        verb: "Surf",
        noun: "Surf Program",
        metaphor: "Ride the wave",
        description: "Catch the AI wave and ride it effortlessly across your portfolio.",
        icon: "🏄",
        color: "cyan",
        imagery: "Flow state, leveraging momentum, graceful power"
      },
      PARTNER: {
        verb: "Sail",
        noun: "Sailing Partnership",
        metaphor: "Navigate with a crew",
        description: "Command your yacht with an expert crew. Go further, faster, together.",
        icon: "⛵",
        color: "purple",
        imagery: "Leadership, teamwork, unlimited horizons"
      }
    },
    progression: [
      "Start with a casual amble to explore",
      "Sprint when you find opportunity",
      "Surf the wave of success",
      "Sail into the future with your crew"
    ]
  },

  // ASAP Theme - Urgency and action-oriented (Amble → Sprint → Accelerate → Perform)
  asap: {
    name: "ASAP Framework",
    tagline: "AI Success ASAP",
    stages: {
      ASSESS: {
        verb: "Amble",
        noun: "Amble Assessment",
        metaphor: "Strategic exploration",
        description: "Thoughtfully explore your highest-impact AI opportunities.",
        icon: "🎯",
        color: "green",
        imagery: "Strategic thinking, careful planning, discovery"
      },
      SPRINT: {
        verb: "Sprint",
        noun: "Sprint",
        metaphor: "Rapid execution",
        description: "Execute fast with focused intensity. From idea to implementation.",
        icon: "⚡",
        color: "blue",
        imagery: "Speed, focus, rapid delivery"
      },
      SCALE: {
        verb: "Accelerate",
        noun: "Acceleration Program",
        metaphor: "Scale what works",
        description: "Double down on success. Accelerate AI deployment across your portfolio.",
        icon: "🚀",
        color: "orange",
        imagery: "Exponential growth, compound effects, velocity"
      },
      PARTNER: {
        verb: "Perform",
        noun: "Performance Partnership",
        metaphor: "Peak performance",
        description: "Achieve peak AI performance with dedicated expertise and resources.",
        icon: "🏆",
        color: "gold",
        imagery: "Excellence, mastery, sustained success"
      }
    },
    progression: [
      "A - Amble through opportunities",
      "S - Sprint to prove value",
      "A - Accelerate what works",
      "P - Perform at peak levels"
    ]
  },

  // Motion Theme - Physics of business transformation
  motion: {
    name: "Motion Dynamics",
    tagline: "From Inertia to Momentum",
    stages: {
      ASSESS: {
        verb: "Orient",
        noun: "Orientation",
        metaphor: "Find your direction",
        description: "Get your bearings in the AI landscape. Chart your course.",
        icon: "🧭",
        color: "slate",
        imagery: "Navigation, understanding position, setting direction"
      },
      SPRINT: {
        verb: "Ignite",
        noun: "Ignition Sprint",
        metaphor: "Spark the engine",
        description: "Fire up your AI transformation. Create initial momentum.",
        icon: "🔥",
        color: "red",
        imagery: "Ignition, energy release, initial thrust"
      },
      SCALE: {
        verb: "Accelerate",
        noun: "Acceleration",
        metaphor: "Build velocity",
        description: "Rapidly increase your AI velocity across the portfolio.",
        icon: "📈",
        color: "violet",
        imagery: "Increasing speed, compound momentum, force multiplication"
      },
      PARTNER: {
        verb: "Cruise",
        noun: "Cruise Control",
        metaphor: "Sustained excellence",
        description: "Maintain peak velocity with expert navigation and control.",
        icon: "✈️",
        color: "indigo",
        imagery: "Smooth operation, altitude, autopilot with supervision"
      }
    },
    progression: [
      "Orient yourself in the AI landscape",
      "Ignite your transformation",
      "Accelerate across your portfolio",
      "Cruise at optimal velocity"
    ]
  }
} as const;

// Pricing remains consistent across themes
export const THEME_AGNOSTIC_PRICING = {
  ASSESS: {
    price: "FREE",
    value: 0,
    duration: "24 hours"
  },
  SPRINT: {
    price: "$10,000",
    priceNote: "per week",
    value: 10000,
    duration: "1-4 weeks",
    options: [
      { weeks: 1, name: "Discovery Sprint", price: 10000 },
      { weeks: 2, name: "Prototype Sprint", price: 20000 },
      { weeks: 3, name: "Implementation Sprint", price: 30000 },
      { weeks: 4, name: "Transformation Sprint", price: 40000 },
    ]
  },
  SCALE: {
    price: "$50,000",
    priceNote: "per month",
    value: 50000,
    duration: "Monthly",
    description: "When you find what works, double down"
  },
  PARTNER: {
    price: "$100K+",
    priceNote: "per month",
    value: 100000,
    duration: "Ongoing",
    tiers: [
      { name: "Advisory", price: 100000 },
      { name: "Operating", price: 200000 },
      { name: "Venture", price: 300000 }
    ]
  }
} as const;

// Helper to get current theme from environment or default
export function getCurrentTheme(): FunnelTheme {
  const theme = process.env.NEXT_PUBLIC_FUNNEL_THEME as FunnelTheme;
  return theme || "adventure";
}

// Helper to get themed funnel configuration
export function getThemedFunnel(theme?: FunnelTheme) {
  const selectedTheme = theme || getCurrentTheme();
  const themeConfig = FUNNEL_THEMES[selectedTheme];
  
  return {
    theme: selectedTheme,
    ...themeConfig,
    stages: {
      ASSESS: {
        ...themeConfig.stages.ASSESS,
        ...THEME_AGNOSTIC_PRICING.ASSESS,
        title: themeConfig.stages.ASSESS.noun,
        href: "/ai-assessment",
        deliverables: [
          "Portfolio-wide AI opportunity analysis",
          "ROI projections for top 10 use cases",
          "Implementation roadmap & timeline",
          "Risk assessment & mitigation plan",
          "Competitive benchmarking report"
        ]
      },
      SPRINT: {
        ...themeConfig.stages.SPRINT,
        ...THEME_AGNOSTIC_PRICING.SPRINT,
        title: `AI ${themeConfig.stages.SPRINT.noun}`,
        href: "/ai-sprint",
        deliverables: [
          "Working AI prototype or MVP",
          "Full source code & documentation",
          "Team training & knowledge transfer",
          "30-day post-sprint support",
          "Implementation playbook"
        ]
      },
      SCALE: {
        ...themeConfig.stages.SCALE,
        ...THEME_AGNOSTIC_PRICING.SCALE,
        title: themeConfig.stages.SCALE.noun,
        href: "/ai-scale",
        deliverables: [
          "Monthly AI implementations",
          "Portfolio-wide deployment strategy",
          "Dedicated success manager",
          "Weekly executive briefings",
          "Cross-portfolio optimization"
        ]
      },
      PARTNER: {
        ...themeConfig.stages.PARTNER,
        ...THEME_AGNOSTIC_PRICING.PARTNER,
        title: themeConfig.stages.PARTNER.noun,
        href: "/ai-partnership",
        deliverables: [
          "Unlimited AI implementations",
          "Dedicated team (3-8 specialists)",
          "Board-level advisory",
          "Custom AI platform development",
          "Co-investment opportunities"
        ]
      }
    }
  };
}

// Marketing copy variants for each theme
export const THEME_HEADLINES = {
  adventure: {
    hero: "Start Your AI Adventure",
    subhero: "From a casual amble to sailing the high seas of innovation",
    cta: "Begin Your Journey",
    value: "Every adventure starts with a single step"
  },
  asap: {
    hero: "AI Success ASAP",
    subhero: "Amble → Sprint → Accelerate → Perform",
    cta: "Get Started ASAP",
    value: "Why wait? Your competition isn't."
  },
  motion: {
    hero: "From Zero to AI Velocity",
    subhero: "Transform inertia into unstoppable momentum",
    cta: "Start Your Engines",
    value: "Physics meets business transformation"
  }
};

// Visual/design tokens for each theme
export const THEME_STYLES = {
  adventure: {
    gradient: "from-emerald-500 via-blue-500 via-cyan-500 to-purple-500",
    pattern: "topographic", // Background pattern style
    animation: "wave", // Animation style
    icons: "rounded", // Icon style
  },
  asap: {
    gradient: "from-green-500 via-blue-500 via-orange-500 to-yellow-500",
    pattern: "grid",
    animation: "pulse",
    icons: "sharp",
  },
  motion: {
    gradient: "from-slate-500 via-red-500 via-violet-500 to-indigo-500",
    pattern: "circuit",
    animation: "slide",
    icons: "geometric",
  }
};