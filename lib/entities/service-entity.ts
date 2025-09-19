// Service Entity Schema for AI Sprinter Platform
export interface ServiceEntity {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: 'active' | 'beta' | 'coming_soon';

  // SEO & Meta
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };

  // Hero Section
  hero: {
    badge: {
      text: string;
      icon: string; // lucide icon name
    };
    headline: {
      text: string;
      highlighted: string; // part to be gradient
    };
    subheadline: string;
    stats: Array<{
      value: string;
      label: string;
      color?: string;
    }>;
    cta: {
      primary: {
        text: string;
        action: string; // 'demo' | 'contact' | 'calculator' | 'assessment'
      };
      secondary: {
        text: string;
        href: string;
      };
    };
  };

  // Problem/Solution Section
  challenges: Array<{
    title: string;
    problem: string;
    solution: string;
    outcome: string;
    icon?: string;
  }>;

  // Capabilities/Features
  capabilities: Array<{
    title: string;
    description: string;
    icon: string;
    features: string[];
    badge?: string;
  }>;

  // Process/Timeline
  implementation: {
    title: string;
    description: string;
    timeline: Array<{
      phase: string;
      duration: string;
      title: string;
      activities: string[];
      milestone?: string;
    }>;
  };

  // ROI/Metrics
  metrics: {
    beforeAfter: Array<{
      metric: string;
      before: string;
      after: string;
      improvement: string;
    }>;
    financial: {
      headline: string;
      stats: Array<{
        label: string;
        value: string;
        description?: string;
      }>;
      totalImpact: string;
      impactPeriod: string;
    };
  };

  // Use Cases/Case Studies
  useCases: Array<{
    title: string;
    industry?: string;
    challenge: string;
    solution: string;
    results: string[];
    metric?: {
      value: string;
      label: string;
    };
  }>;

  // Pricing (optional)
  pricing?: {
    tiers: Array<{
      name: string;
      price: string;
      duration: string;
      description: string;
      features: string[];
      highlighted?: boolean;
      badge?: string;
    }>;
  };

  // Testimonials
  testimonials?: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    metric?: string;
  }>;

  // CTA Section
  cta: {
    headline: string;
    description: string;
    buttons: Array<{
      text: string;
      href: string;
      variant: 'default' | 'outline' | 'ghost';
      icon?: string;
    }>;
  };

  // Custom Blocks (for unique content)
  customBlocks?: Array<{
    type: 'comparison' | 'workflow' | 'architecture' | 'faq' | 'calculator' | 'demo';
    position: 'after_hero' | 'after_challenges' | 'after_capabilities' | 'before_cta';
    data: any; // Block-specific data
  }>;
}

// View Registry Configuration
export interface ServiceViewConfig {
  layout: 'standard' | 'technical' | 'sales' | 'education';
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  animations: {
    enabled: boolean;
    type: 'fade' | 'slide' | 'scale';
  };
  components: {
    showPricing: boolean;
    showTestimonials: boolean;
    showCalculator: boolean;
    showDemo: boolean;
    showComparison: boolean;
  };
}