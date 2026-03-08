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
    { label: "Services", href: "/services", icon: Sparkles },
    { label: "Case Studies", href: "/case-studies", icon: Trophy },
    { label: "About", href: "/about", icon: UserCheck },
    { label: "Blog", href: "/blog", icon: Lightbulb },
  ],
  ctas: [
    {
      label: "Book a Free Strategy Call",
      href: "https://cal.com/tyler-dreher",
      variant: "gradient",
      icon: Rocket,
    },
  ],
};

export function getNavigationConfig(): NavigationConfig {
  return NAVIGATION_CONFIG;
}