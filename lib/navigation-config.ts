import {
  Sparkles,
  Building2,
  Factory,
  Package,
  TrendingUp,
  Briefcase,
  Trophy,
  FlaskConical,
  Calculator,
  BookOpen,
  Download,
  Lightbulb,
  Zap,
  Target,
  BarChart,
  Users,
  Shield,
  Cpu,
  DollarSign,
  Clock,
  Truck,
  Heart,
  Banknote,
  Palette,
  Wand2,
  Settings,
  Code,
  Layers,
  FileCode,
  Rocket,
  Star,
  LucideIcon,
} from "lucide-react";

export type NavItemType = "link" | "dropdown" | "mega" | "action";

export interface NavBadge {
  text: string;
  variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "new" | "beta";
}

export interface NavFeature {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  badge?: NavBadge;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
  badge?: NavBadge;
  type?: NavItemType;
  featured?: NavFeature;
  sections?: NavSection[];
  items?: NavItem[];
  action?: () => void;
}

export interface NavCTA {
  label: string;
  href: string;
  variant: "default" | "secondary" | "outline" | "ghost" | "gradient";
  icon?: LucideIcon;
  badge?: NavBadge;
}

export interface NavigationConfig {
  main: NavItem[];
  ctas: NavCTA[];
}

export const NAVIGATION_CONFIG: NavigationConfig = {
  main: [
    {
      label: "Operating Partner",
      href: "/operating-partner",
      type: "mega",
      icon: Briefcase,
      featured: {
        title: "AI Operating Partner Program",
        description: "Transform your portfolio with battle-tested AI solutions. Get measurable wins in 30-45 days.",
        href: "/operating-partner",
        icon: Rocket,
        badge: { text: "Popular", variant: "success" },
      },
      sections: [
        {
          title: "Program Options",
          items: [
            {
              label: "90-Minute Workshop",
              href: "/operating-partner#workshop",
              icon: Clock,
              description: "Get pilot plan & options memo",
              badge: { text: "Free", variant: "success" },
            },
            {
              label: "30-45 Day Pilot",
              href: "/operating-partner#pilot",
              icon: Zap,
              description: "Ship measurable value fast",
            },
            {
              label: "Portfolio Scoreboard",
              href: "/operating-partner#scoreboard",
              icon: BarChart,
              description: "Dashboards for LP transparency",
            },
          ],
        },
        {
          title: "Why Partners Choose Us",
          items: [
            {
              label: "Fund-Level Orchestration",
              href: "/operating-partner",
              icon: Shield,
              description: "Coordinated portfolio transformation",
            },
            {
              label: "Case Studies",
              href: "/case-studies",
              icon: BookOpen,
              description: "Proven portfolio wins",
            },
          ],
        },
      ],
    },
    {
      label: "Solutions",
      href: "/solutions",
      type: "mega",
      icon: Sparkles,
      featured: {
        title: "Prebuilt AI Solutions",
        description: "Deploy battle-tested AI that drives immediate portfolio value. No rewires, no drama.",
        href: "/solutions",
        icon: Package,
      },
      sections: [
        {
          title: "Top Solutions",
          items: [
            {
              label: "Financial Process Automation",
              href: "/solutions/ap-automation",
              icon: DollarSign,
              description: "AP, expense, reconciliation",
              badge: { text: "ROI: 250%", variant: "success" },
            },
            {
              label: "Quote Intelligence",
              href: "/solutions/quote-intelligence",
              icon: FileCode,
              description: "RFP to quote draft in minutes",
              badge: { text: "New", variant: "new" },
            },
            {
              label: "3PL Ops & Billing",
              href: "/solutions/3pl-ops",
              icon: Truck,
              description: "Quote-to-billing accuracy",
            },
          ],
        },
        {
          title: "By Function",
          items: [
            {
              label: "All Use Cases",
              href: "/use-cases",
              icon: Settings,
              description: "Browse all solutions",
            },
            {
              label: "By Industry",
              href: "/use-cases/industries",
              icon: TrendingUp,
              description: "Industry-specific solutions",
            },
            {
              label: "By Role",
              href: "/use-cases/roles",
              icon: Layers,
              description: "Role-based solutions",
            },
          ],
        },
      ],
    },
    {
      label: "Industries",
      href: "/industries",
      type: "mega",
      icon: Building2,
      sections: [
        {
          title: "Focus Sectors",
          items: [
            {
              label: "Private Equity",
              href: "/industries/private-equity",
              icon: Factory,
              description: "PE-focused solutions",
              badge: { text: "Featured", variant: "secondary" },
            },
            {
              label: "Healthcare",
              href: "/industries/healthcare",
              icon: Heart,
              description: "Clinical & admin AI",
            },
            {
              label: "Financial Services",
              href: "/industries/financial-services",
              icon: Banknote,
              description: "Fintech & banking AI",
            },
            {
              label: "View All",
              href: "/industries",
              icon: Building2,
              description: "Browse all sectors",
            },
          ],
        },
      ],
    },
    {
      label: "Resources",
      href: "/resources",
      type: "mega",
      icon: BookOpen,
      featured: {
        title: "AI Labs",
        description: "Try our interactive AI demos and see what's possible for your portfolio.",
        href: "/labs",
        icon: FlaskConical,
        badge: { text: "Interactive", variant: "new" },
      },
      sections: [
        {
          title: "Learn & Explore",
          items: [
            {
              label: "Case Studies",
              href: "/case-studies",
              icon: Trophy,
              description: "Anonymized portfolio wins",
            },
            {
              label: "AI Labs",
              href: "/labs",
              icon: FlaskConical,
              description: "Interactive demos",
              badge: { text: "Try Now", variant: "new" },
            },
            {
              label: "Tools & Calculators",
              href: "/tools",
              icon: Calculator,
              description: "Quantify ROI",
            },
          ],
        },
        {
          title: "Knowledge Base",
          items: [
            {
              label: "Downloads",
              href: "/downloads/no-api-cookbook",
              icon: Download,
              description: "Playbooks & briefs",
            },
            {
              label: "Insights",
              href: "/blog",
              icon: Lightbulb,
              description: "Private equity AI analysis",
            },
          ],
        },
      ],
    },
    {
      label: "Partnership",
      href: "/partnership",
      type: "link",
      icon: Users,
    },
  ],
  ctas: [
    {
      label: "Get Free Assessment",
      href: "/ai-assessment",
      variant: "outline",
      icon: Star,
      badge: { text: "Free", variant: "success" },
    },
    {
      label: "Start Sprint",
      href: "/contact",
      variant: "gradient",
      icon: Rocket,
    },
  ],
};

export function getNavigationConfig(): NavigationConfig {
  return NAVIGATION_CONFIG;
}