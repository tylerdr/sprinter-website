/**
 * Tool UI Registry
 * Flat map of tool slugs to dynamic UI imports.
 * This keeps client-side rendering decoupled from folder structure.
 */

export const TOOL_UI_IMPORTS: Record<string, () => Promise<any>> = {
  // Content Tools
  "blog-generator": () => import("./toolset/content/blog-generator/ui"),
  "social-post-generator": () => import("./toolset/content/social-post-generator/ui"),

  // Utility Tools
  "ai-image-generator": () => import("./toolset/utility/ai-image-generator/ui"),
  "contact-capture": () => import("./toolset/utility/contact-capture/ui"),
  "delegate-agent": () => import("./toolset/utility/delegate-agent/ui"),
  "qualifier-wizard": () => import("./toolset/utility/qualifier-wizard/ui"),

  // Calculator Tools
  "roi-calculator": () => import("./toolset/calculators/roi-calculator/ui"),

  // Communications Tools
  "email-drafter": () => import("./toolset/communications/email-drafter/ui"),

  // Analysis Tools
  "bank-statement-analyzer": () => import("./toolset/analysis/bank-statement-analyzer/ui"),
};

// Export SPRINTER_TOOL_UI_IMPORTS as alias for backward compatibility
export const SPRINTER_TOOL_UI_IMPORTS = TOOL_UI_IMPORTS;