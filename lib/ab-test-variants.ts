// A/B Test Variants for Hero and CTA Copy
// This file allows easy switching between different messaging variants for testing

export type HeroVariant = "peoplefirst" | "scale" | "need" | "transform" | "accelerate";
export type CTAVariant = "blueprint" | "assessment" | "readiness" | "audit";

export const heroVariants = {
  peoplefirst: {
    headline: {
      line1: "AI That Actually",
      line2: "Ships"
    },
    subheadline: "2-4 week sprints. Working systems in production. No slide decks."
  },
  scale: {
    headline: {
      line1: "AI That Actually",
      line2: "Ships"
    },
    subheadline: "2-4 week sprints. Working systems in production. No slide decks."
  },
  need: {
    headline: {
      line1: "AI That Actually",
      line2: "Ships"
    },
    subheadline: "2-4 week sprints. Working systems in production. No slide decks."
  },
  transform: {
    headline: {
      line1: "AI That Actually",
      line2: "Ships"
    },
    subheadline: "2-4 week sprints. Working systems in production. No slide decks."
  },
  accelerate: {
    headline: {
      line1: "AI That Actually",
      line2: "Ships"
    },
    subheadline: "2-4 week sprints. Working systems in production. No slide decks."
  }
} as const;

export const ctaVariants = {
  blueprint: {
    primary: "Book a Strategy Call",
    secondary: "See Results"
  },
  assessment: {
    primary: "Book a Strategy Call",
    secondary: "See Results"
  },
  readiness: {
    primary: "Book a Strategy Call",
    secondary: "See Results"
  },
  audit: {
    primary: "Book a Strategy Call",
    secondary: "See Results"
  }
} as const;

export const valuePropsVariants = {
  offMarket: {
    headline: "Drive Enterprise Value with AI",
    description: "We build AI systems that increase EBITDA, accelerate portfolio companies, and create competitive moats. Production-ready in weeks, not months.",
    cta: "Book a call to discuss your portfolio."
  },
  leftBehind: {
    headline: "Drive Enterprise Value with AI",
    description: "We build AI systems that increase EBITDA, accelerate portfolio companies, and create competitive moats. Production-ready in weeks, not months.",
    cta: "Book a call to discuss your portfolio."
  },
  competitive: {
    headline: "Drive Enterprise Value with AI",
    description: "We build AI systems that increase EBITDA, accelerate portfolio companies, and create competitive moats. Production-ready in weeks, not months.",
    cta: "Book a call to discuss your portfolio."
  },
  roi: {
    headline: "Drive Enterprise Value with AI",
    description: "We build AI systems that increase EBITDA, accelerate portfolio companies, and create competitive moats. Production-ready in weeks, not months.",
    cta: "Book a call to discuss your portfolio."
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