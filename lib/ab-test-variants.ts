// A/B Test Variants for Hero and CTA Copy
// This file allows easy switching between different messaging variants for testing

export type HeroVariant = "scale" | "need" | "transform" | "accelerate";
export type CTAVariant = "blueprint" | "assessment" | "readiness" | "audit";

export const heroVariants = {
  scale: {
    headline: {
      line1: "Scale Your Portfolio",
      line2: "with AI"
    },
    subheadline: "Transform deal sourcing, due diligence, and portfolio operations. Deploy AI agents across your entire portfolio to achieve 20-40% EBITDA improvement. See results in weeks, not years."
  },
  need: {
    headline: {
      line1: "Your Portfolio Companies Need AI.",
      line2: "We Make It Happen."
    },
    subheadline: "From deal sourcing to portfolio optimization. Get enterprise AI capabilities without the overhead. See ROI in weeks, not years."
  },
  transform: {
    headline: {
      line1: "Transform Your Portfolio",
      line2: "Into an AI Powerhouse"
    },
    subheadline: "While your competitors use AI to find deals faster, accelerate due diligence, and optimize operations. Don't get left behind."
  },
  accelerate: {
    headline: {
      line1: "Accelerate Portfolio Growth",
      line2: "with Enterprise AI"
    },
    subheadline: "Deploy proven AI solutions across your entire portfolio. From deal sourcing to exit planning. See results in days, not months."
  }
} as const;

export const ctaVariants = {
  blueprint: {
    primary: "Get Portfolio AI Blueprint →",
    secondary: "Book Partner Meeting"
  },
  assessment: {
    primary: "Get Free Portfolio Assessment",
    secondary: "Schedule LP Briefing"
  },
  readiness: {
    primary: "Assess Portfolio AI Readiness",
    secondary: "Explore Operating Partnership"
  },
  audit: {
    primary: "Get Free Portfolio AI Audit",
    secondary: "Discuss Your Portfolio"
  }
} as const;

export const valuePropsVariants = {
  offMarket: {
    headline: "PE Firms Using AI See 3× More Off-Market Deals",
    description: "Your competitors are already automating deal sourcing, due diligence, and portfolio reporting.",
    cta: "Get your custom Portfolio AI Blueprint in 24 hours. 100% free, no strings attached."
  },
  leftBehind: {
    headline: "Don't Get Left Behind",
    description: "While competitors use AI to find deals in minutes, are you still doing it the old way?",
    cta: "Start with a free assessment. Know your opportunities in 24 hours."
  },
  competitive: {
    headline: "Your Competitors Are Already Using AI",
    description: "Top-quartile PE firms leverage AI for 80% faster diligence and 3× deal flow.",
    cta: "Level the playing field. Free assessment, results in 24 hours."
  },
  roi: {
    headline: "Average 20× ROI in 90 Days",
    description: "Our PE clients save $2.3M per portfolio company within the first year.",
    cta: "Calculate your potential ROI. Free assessment, no obligations."
  }
} as const;

// Function to get current variant based on environment variable or random selection
export function getCurrentVariants() {
  // These could be set via environment variables for controlled A/B testing
  const heroVariant = (process.env.NEXT_PUBLIC_HERO_VARIANT as HeroVariant) || "scale";
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