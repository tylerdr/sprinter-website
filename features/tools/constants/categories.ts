/**
 * Centralized tool category definitions
 */

import {
  Calculator,
  Search,
  FileText,
  Wrench,
  ChartBar,
  FileSearch,
  TrendingUp,
  Users,
  MessageSquare,
  Database,
  Home,
  DollarSign,
  Target,
  Package,
  HelpCircle
} from "lucide-react";

export const TOOL_CATEGORIES = {
  calculator: {
    name: "Calculator",
    plural: "Calculators",
    icon: Calculator,
    color: "bg-blue-100 text-blue-800",
    description: "Financial and mortgage calculators"
  },
  search: {
    name: "Search",
    plural: "Search",
    icon: Search,
    color: "bg-purple-100 text-purple-800",
    description: "Search tools for lenders, programs, and guidelines"
  },
  content: {
    name: "Content",
    plural: "Content",
    icon: FileText,
    color: "bg-orange-100 text-orange-800",
    description: "Content generation and marketing tools"
  },
  utility: {
    name: "Utility",
    plural: "Utilities",
    icon: Wrench,
    color: "bg-gray-100 text-gray-800",
    description: "General utility and helper tools"
  },
  analysis: {
    name: "Analysis",
    plural: "Analysis",
    icon: ChartBar,
    color: "bg-red-100 text-red-800",
    description: "Data analysis and insights tools"
  },
  document: {
    name: "Document",
    plural: "Documents",
    icon: FileSearch,
    color: "bg-yellow-100 text-yellow-800",
    description: "Document processing and management"
  },
  eligibility: {
    name: "Eligibility",
    plural: "Eligibility",
    icon: Target,
    color: "bg-indigo-100 text-indigo-800",
    description: "Eligibility checking and qualification tools"
  },
  comparison: {
    name: "Comparison",
    plural: "Comparisons",
    icon: TrendingUp,
    color: "bg-pink-100 text-pink-800",
    description: "Compare programs and options"
  },
  optimization: {
    name: "Optimization",
    plural: "Optimization",
    icon: TrendingUp,
    color: "bg-teal-100 text-teal-800",
    description: "Optimize scenarios and strategies"
  },
  communications: {
    name: "Communications",
    plural: "Communications",
    icon: MessageSquare,
    color: "bg-cyan-100 text-cyan-800",
    description: "Communication and messaging tools"
  },
  guidelines: {
    name: "Guidelines",
    plural: "Guidelines",
    icon: FileText,
    color: "bg-green-100 text-green-800",
    description: "Agency and lender guidelines"
  },
  data: {
    name: "Data",
    plural: "Data",
    icon: Database,
    color: "bg-violet-100 text-violet-800",
    description: "Data management and processing"
  },
  property: {
    name: "Property",
    plural: "Properties",
    icon: Home,
    color: "bg-amber-100 text-amber-800",
    description: "Property-related tools"
  },
  relationships: {
    name: "Relationships",
    plural: "Relationships",
    icon: Users,
    color: "bg-rose-100 text-rose-800",
    description: "Manage client and partner relationships"
  },
  accounts: {
    name: "Accounts",
    plural: "Accounts",
    icon: Users,
    color: "bg-emerald-100 text-emerald-800",
    description: "Account and user management"
  },
  marketing: {
    name: "Marketing",
    plural: "Marketing",
    icon: Target,
    color: "bg-fuchsia-100 text-fuchsia-800",
    description: "Marketing and growth tools"
  },
  growth: {
    name: "Growth",
    plural: "Growth",
    icon: TrendingUp,
    color: "bg-lime-100 text-lime-800",
    description: "Business growth and expansion"
  },
  programs: {
    name: "Programs",
    plural: "Programs",
    icon: Package,
    color: "bg-sky-100 text-sky-800",
    description: "Loan program management"
  },
  workflow: {
    name: "Workflow",
    plural: "Workflows",
    icon: DollarSign,
    color: "bg-slate-100 text-slate-800",
    description: "Workflow automation and management"
  },
  other: {
    name: "Other",
    plural: "Other",
    icon: HelpCircle,
    color: "bg-neutral-100 text-neutral-800",
    description: "Miscellaneous tools and utilities"
  }
} as const;

export type ToolCategory = keyof typeof TOOL_CATEGORIES;

export const CATEGORY_ORDER: ToolCategory[] = [
  "calculator",
  "search",
  "guidelines",
  "eligibility",
  "analysis",
  "document",
  "content",
  "comparison",
  "optimization",
  "property",
  "data",
  "communications",
  "relationships",
  "accounts",
  "marketing",
  "growth",
  "programs",
  "workflow",
  "utility",
  "other"
];

/**
 * Normalize category names to handle variations
 */
export function normalizeCategory(category: string | null | undefined): ToolCategory {
  if (!category) return "other";
  
  const normalized = category.toLowerCase().trim();
  
  // Handle plural forms and common variations
  const mappings: Record<string, ToolCategory> = {
    calculators: "calculator",
    documents: "document",
    utilities: "utility",
    "agency-guidelines": "guidelines",
    analyses: "analysis",
    properties: "property",
    communications: "communications",
    relationships: "relationships",
    accounts: "accounts",
    workflows: "workflow"
  };
  
  // Check if it's already a valid category
  if (normalized in TOOL_CATEGORIES) {
    return normalized as ToolCategory;
  }
  
  // Check mappings
  if (normalized in mappings) {
    return mappings[normalized];
  }
  
  // Default to "other" for unknown categories
  return "other";
}

/**
 * Get category display info with fallback
 */
export function getCategoryInfo(category: string | null | undefined) {
  const normalized = normalizeCategory(category);
  return TOOL_CATEGORIES[normalized];
}