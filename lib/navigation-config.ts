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
      label: "Solutions",
      href: "/solutions",
      type: "mega",
      icon: Sparkles,
      featured: {
        title: "AI Operating Partner Program",
        description: "Transform your portfolio with battle-tested AI solutions. Get measurable wins in 2-3 sprints.",
        href: "/operating-partner",
        icon: Rocket,
        badge: { text: "Popular", variant: "success" },
      },
      sections: [
        {
          title: "Private Equity Solutions",
          items: [
            {
              label: "Operating Partner Program",
              href: "/operating-partner",
              icon: Briefcase,
              description: "Fund-level AI orchestration",
              badge: { text: "Featured", variant: "success" },
            },
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
          title: "Program Options",
          items: [
            {
              label: "Partnership Program",
              href: "/partnership",
              icon: Users,
              description: "For PE firms & consultants",
              badge: { text: "Partner", variant: "secondary" },
            },
          ],
        },
        {
          title: "Browse Solutions",
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
            {
              label: "All Services",
              href: "/pe-services",
              icon: Settings,
              description: "20+ prebuilt AI solutions",
              badge: { text: "View All", variant: "outline" },
            },
          ],
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
          label: "Portfolio Wins",
          href: "/case-studies",
          icon: Trophy,
          description: "$10M+ value created across 50+ deployments",
          badge: { text: "Real Results", variant: "success" },
        },
        {
          label: "ROI Calculator",
          href: "/labs/roi-calculator",
          icon: Calculator,
          description: "Quantify AI value for your portfolio in 2 minutes",
        },
        {
          label: "Impact Dashboard",
          href: "/operating-partner#scoreboard",
          icon: BarChart,
          description: "Track portfolio AI adoption & ROI in real-time",
        },
        {
          label: "Implementation Guides",
          href: "/downloads/no-api-cookbook",
          icon: BookOpen,
          description: "Battle-tested playbooks from 100+ deployments",
          badge: { text: "Download", variant: "outline" },
        },
      ],
    },
    {
      label: "Approach",
      href: "/approach",
      type: "dropdown",
      icon: UserCheck,
      items: [
        {
          label: "People-First AI",
          href: "/approach",
          icon: Heart,
          description: "Our human-centered methodology",
          badge: { text: "Featured", variant: "success" },
        },
        {
          label: "The 4 Ps Framework",
          href: "/approach#four-pillars",
          icon: Workflow,
          description: "People → Process → Projects → Product",
        },
        {
          label: "Change Playbook",
          href: "/approach#change-playbook",
          icon: Users,
          description: "Turn skeptics into champions",
        },
        {
          label: "Work in Sprints",
          href: "/approach#sprints",
          icon: Zap,
          description: "2-3 sprint pilots that compound to full AI-native operations",
        },
        {
          label: "AI-Native",
          href: "/approach#ai-native",
          icon: Cpu,
          description: "Built for AI from day one—agents and people working together",
          badge: { text: "Philosophy", variant: "outline" },
        },
        {
          label: "Infinite Digital Labor",
          href: "/approach#infinite-labor",
          icon: TrendingUp,
          description: "Optimize human time—let unlimited, scalable AI agents handle the rest",
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
          title: "Tools & Labs",
          items: [
            {
              label: "AI Labs",
              href: "/labs",
              icon: FlaskConical,
              description: "Interactive demos",
              badge: { text: "Try Now", variant: "new" },
            },
            {
              label: "Find Your Wedge",
              href: "/approach/wedge",
              icon: Target,
              description: "5-minute assessment tool",
              badge: { text: "Interactive", variant: "new" },
            },
            {
              label: "Tools & Calculators",
              href: "/tools",
              icon: Calculator,
              description: "ROI & readiness assessments",
            },
            {
              label: "Free AI Assessment",
              href: "/ai-assessment",
              icon: Star,
              description: "Get your personalized AI roadmap",
              badge: { text: "Free", variant: "success" },
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
        {
          title: "Industries",
          items: [
            {
              label: "Private Equity",
              href: "/industries/private-equity",
              icon: Briefcase,
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
              label: "Manufacturing",
              href: "/industries/manufacturing",
              icon: Factory,
              description: "Quality, scheduling & maintenance",
            },
            {
              label: "Logistics & 3PL",
              href: "/industries/logistics",
              icon: Truck,
              description: "Supply chain & routing automation",
            },
            {
              label: "View All Industries",
              href: "/industries",
              icon: Building2,
              description: "Browse all sectors",
            },
          ],
        },
      ],
    },
  ],
  ctas: [
    {
      label: "Get Started",
      href: "/contact",
      variant: "gradient",
      icon: Rocket,
    },
  ],
};

export function getNavigationConfig(): NavigationConfig {
  return NAVIGATION_CONFIG;
}