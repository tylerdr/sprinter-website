// A/B Test Variants for Hero and CTA Copy
// This file allows easy switching between different messaging variants for testing

export type HeroVariant = "peoplefirst" | "scale" | "need" | "transform" | "accelerate";
export type CTAVariant = "blueprint" | "assessment" | "readiness" | "audit";

export const heroVariants = {
  peoplefirst: {
    headline: {
      line1: "Agentic AI Systems",
      line2: "That Ship to Production"
    },
    subheadline: "We design and implement AI agents, automate complex workflows, and redesign processes so your team can focus on high-value work. Sprint-based implementations. Playbooks that scale across your portfolio."
  },
  scale: {
    headline: {
      line1: "AI That Works With",
      line2: "Your Existing Systems"
    },
    subheadline: "Think you're not 'tech-forward' enough for AI? Most of our clients said the same thing. We specialize in building AI that integrates with legacy systems, messy data, and real-world workflows."
  },
  need: {
    headline: {
      line1: "From Document Chaos",
      line2: "to Structured Decisions"
    },
    subheadline: "PDFs, emails, spreadsheets—turn unstructured data into automated workflows. Multi-agent systems that handle the tedious work so your operators can focus on exceptions and strategy."
  },
  transform: {
    headline: {
      line1: "AI Sprints",
      line2: "Not AI Studies"
    },
    subheadline: "Fixed-scope sprints with working systems in production. We build, you validate, we iterate. No 6-month roadmaps that never ship. The Sprinter Method™ focuses on quick wins that compound."
  },
  accelerate: {
    headline: {
      line1: "Scale AI Wins Across",
      line2: "Your Entire Portfolio"
    },
    subheadline: "The playbook from your first implementation makes the second faster. That's the Portfolio Multiplier Effect™—shared learnings, proven templates, and trained operators who can extend the work."
  }
} as const;

export const ctaVariants = {
  blueprint: {
    primary: "Schedule a Strategy Call →",
    secondary: "See Our Case Studies"
  },
  assessment: {
    primary: "Get an AI Assessment",
    secondary: "See How We Work"
  },
  readiness: {
    primary: "Talk to Our Team",
    secondary: "View Case Studies"
  },
  audit: {
    primary: "Explore a Sprint",
    secondary: "See Pricing"
  }
} as const;

export const valuePropsVariants = {
  offMarket: {
    headline: "Simple Solutions That Actually Ship",
    description: "We focus on high-impact automations that can be built and deployed in weeks. No bloated AI projects that stall in committee. Working systems your team can use tomorrow.",
    cta: "Let's talk about what a sprint could look like for your team."
  },
  leftBehind: {
    headline: "Technical AI Diligence for Acquisitions",
    description: "Rapid technical assessment of AI capabilities in acquisition targets. We help you understand what's real, what's hype, and what the actual integration effort looks like.",
    cta: "Schedule a diligence consultation to discuss your next deal."
  },
  competitive: {
    headline: "AI Leadership Without the Full-Time Hire",
    description: "Fractional AI advisory for organizations that need strategic guidance and implementation support. Board-level counsel. Vendor evaluation. Hands-on execution.",
    cta: "Learn how fractional AI leadership works."
  },
  roi: {
    headline: "Fixed-Scope Sprints With Clear Deliverables",
    description: "Every sprint has acceptance criteria defined upfront. You know what you're getting and what success looks like before we start. No scope creep, no surprise invoices.",
    cta: "See our sprint packages and pricing."
  }
} as const;

// Function to get current variant based on environment variable or random selection
export function getCurrentVariants() {
  // These could be set via environment variables for controlled A/B testing
  const heroVariant = (process.env.NEXT_PUBLIC_HERO_VARIANT as HeroVariant) || "peoplefirst";
  const ctaVariant = (process.env.NEXT_PUBLIC_CTA_VARIANT as CTAVariant) || "blueprint";
  const valuePropsVariant = process.env.NEXT_PUBLIC_VALUE_PROP_VARIANT || "offMarket";
  
  return {
    hero: heroVariants[heroVariant],
    cta: ctaVariants[ctaVariant],
    valueProp: valuePropsVariants[valuePropsVariant as keyof typeof valuePropsVariants]
  };
}

// Function for client-side A/B testing (can be integrated with analytics)
export function getRandomVariant<T extends Record<string, any>>(variants: T): T[keyof T] {
  const keys = Object.keys(variants);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return variants[randomKey];
}