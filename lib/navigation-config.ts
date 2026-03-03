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
  UserCheck,
  Workflow,
  GraduationCap,
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
      label: "Services",
      href: "/services",
      type: "dropdown",
      icon: Sparkles,
      items: [
        {
          label: "AI Readiness Sprint",
          href: "/ai-sprint",
          icon: Zap,
          description: "48-hour operations audit with scored automation backlog",
          badge: { text: "$2,500", variant: "success" },
        },
        {
          label: "Fractional AI Co-Founder",
          href: "/fractional-ai-cofounder",
          icon: Rocket,
          description: "Embedded AI strategy + execution partner",
          badge: { text: "From $8K/mo", variant: "success" },
        },
        {
          label: "All Services",
          href: "/services",
          icon: Settings,
          description: "AI agent deployment, custom builds, and enterprise options",
        },
      ],
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      type: "dropdown",
      icon: Trophy,
      items: [
        {
          label: "Case Studies",
          href: "/case-studies",
          icon: Trophy,
          description: "Real implementations with real results",
          badge: { text: "Real Results", variant: "success" },
        },
        {
          label: "ROI Calculator",
          href: "/labs/roi-calculator",
          icon: Calculator,
          description: "Quantify AI value for your business in 2 minutes",
        },
      ],
    },
    {
      label: "Labs",
      href: "/labs",
      type: "dropdown",
      icon: FlaskConical,
      items: [
        {
          label: "AI Labs",
          href: "/labs",
          icon: FlaskConical,
          description: "Interactive AI demos — see what's possible",
          badge: { text: "Try Now", variant: "new" },
        },
        {
          label: "Insights",
          href: "/blog",
          icon: Lightbulb,
          description: "AI implementation guides and industry analysis",
        },
      ],
    },
    {
      label: "About",
      href: "/about",
      icon: UserCheck,
    },
  ],
  ctas: [
    {
      label: "Book a Call",
      href: "https://cal.com/tyler-dreher",
      variant: "gradient",
      icon: Rocket,
    },
  ],
};

export function getNavigationConfig(): NavigationConfig {
  return NAVIGATION_CONFIG;
}