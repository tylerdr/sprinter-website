/**
 * Service Entity Registration
 * Registers the service entity type with the AI Sprinter Platform
 */

import { entityRegistry } from "../../registry";
import { ServiceEntity } from "./index";
import { ServiceSchema } from "./schema";

// Convert the ServiceEntity to the format expected by the registry
const serviceEntityType = {
  slug: "service",
  name: "Service",
  namespace: "sprinter",
  isWorkspace: false,
  schema: {
    // Convert Zod schema to JSON Schema format for registry
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      slug: { type: "string", pattern: "^[a-z0-9-]+$" },
      name: { type: "string" },
      category: { type: "string" },
      status: { type: "string", enum: ["active", "beta", "coming_soon", "deprecated"] },
      metadata: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          keywords: { type: "array", items: { type: "string" } },
          ogImage: { type: "string" },
          canonical: { type: "string" }
        },
        required: ["title", "description", "keywords"]
      },
      hero: {
        type: "object",
        properties: {
          badge: {
            type: "object",
            properties: {
              text: { type: "string" },
              icon: { type: "string" }
            },
            required: ["text", "icon"]
          },
          headline: {
            type: "object",
            properties: {
              text: { type: "string" },
              highlighted: { type: "string" }
            },
            required: ["text", "highlighted"]
          },
          subheadline: { type: "string" },
          stats: {
            type: "array",
            items: {
              type: "object",
              properties: {
                value: { type: "string" },
                label: { type: "string" },
                color: { type: "string" }
              },
              required: ["value", "label"]
            }
          },
          cta: {
            type: "object",
            properties: {
              primary: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  action: { type: "string" }
                },
                required: ["text", "action"]
              },
              secondary: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  href: { type: "string" }
                },
                required: ["text", "href"]
              }
            },
            required: ["primary", "secondary"]
          }
        },
        required: ["badge", "headline", "subheadline", "cta"]
      },
      challenges: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            problem: { type: "string" },
            solution: { type: "string" },
            outcome: { type: "string" },
            icon: { type: "string" }
          },
          required: ["title", "problem", "solution", "outcome"]
        }
      },
      capabilities: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            icon: { type: "string" },
            features: { type: "array", items: { type: "string" } },
            badge: { type: "string" }
          },
          required: ["title", "description", "icon", "features"]
        }
      },
      implementation: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          timeline: {
            type: "array",
            items: {
              type: "object",
              properties: {
                phase: { type: "string" },
                duration: { type: "string" },
                title: { type: "string" },
                activities: { type: "array", items: { type: "string" } },
                milestone: { type: "string" }
              },
              required: ["phase", "duration", "title", "activities"]
            }
          }
        },
        required: ["title", "description", "timeline"]
      },
      metrics: {
        type: "object",
        properties: {
          beforeAfter: {
            type: "array",
            items: {
              type: "object",
              properties: {
                metric: { type: "string" },
                before: { type: "string" },
                after: { type: "string" },
                improvement: { type: "string" }
              },
              required: ["metric", "before", "after", "improvement"]
            }
          },
          financial: {
            type: "object",
            properties: {
              headline: { type: "string" },
              stats: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    label: { type: "string" },
                    value: { type: "string" },
                    description: { type: "string" }
                  },
                  required: ["label", "value"]
                }
              },
              totalImpact: { type: "string" },
              impactPeriod: { type: "string" }
            },
            required: ["headline", "stats", "totalImpact", "impactPeriod"]
          }
        }
      },
      useCases: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            industry: { type: "string" },
            challenge: { type: "string" },
            solution: { type: "string" },
            results: { type: "array", items: { type: "string" } },
            metric: {
              type: "object",
              properties: {
                value: { type: "string" },
                label: { type: "string" }
              },
              required: ["value", "label"]
            }
          },
          required: ["title", "challenge", "solution", "results"]
        }
      },
      pricing: {
        type: "object",
        properties: {
          tiers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "string" },
                duration: { type: "string" },
                description: { type: "string" },
                features: { type: "array", items: { type: "string" } },
                highlighted: { type: "boolean" },
                badge: { type: "string" }
              },
              required: ["name", "price", "duration", "description", "features"]
            }
          }
        },
        required: ["tiers"]
      },
      testimonials: {
        type: "array",
        items: {
          type: "object",
          properties: {
            quote: { type: "string" },
            author: { type: "string" },
            role: { type: "string" },
            company: { type: "string" },
            metric: { type: "string" }
          },
          required: ["quote", "author", "role", "company"]
        }
      },
      cta: {
        type: "object",
        properties: {
          headline: { type: "string" },
          description: { type: "string" },
          buttons: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                href: { type: "string" },
                variant: { type: "string", enum: ["default", "outline", "ghost", "secondary", "destructive"] },
                icon: { type: "string" }
              },
              required: ["text", "href", "variant"]
            }
          }
        },
        required: ["headline", "description", "buttons"]
      },
      customBlocks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: { type: "string" },
            position: { type: "string" },
            data: { type: "object" }
          },
          required: ["type", "position", "data"]
        }
      },
      viewConfig: {
        type: "object",
        properties: {
          layout: { type: "string", enum: ["standard", "technical", "sales", "education", "custom"] },
          theme: {
            type: "object",
            properties: {
              primaryColor: { type: "string" },
              secondaryColor: { type: "string" },
              accentColor: { type: "string" }
            },
            required: ["primaryColor", "secondaryColor", "accentColor"]
          },
          animations: {
            type: "object",
            properties: {
              enabled: { type: "boolean" },
              type: { type: "string", enum: ["fade", "slide", "scale", "none"] }
            },
            required: ["enabled", "type"]
          },
          components: {
            type: "object",
            properties: {
              showPricing: { type: "boolean" },
              showTestimonials: { type: "boolean" },
              showCalculator: { type: "boolean" },
              showDemo: { type: "boolean" },
              showComparison: { type: "boolean" }
            },
            required: ["showPricing", "showTestimonials", "showCalculator", "showDemo", "showComparison"]
          }
        },
        required: ["layout", "theme", "animations", "components"]
      },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      createdBy: { type: "string", format: "uuid" },
      updatedBy: { type: "string", format: "uuid" },
      publishedAt: { type: "string", format: "date-time" },
      version: { type: "number" },
      tenantId: { type: "number" }
    },
    required: ["slug", "name", "category", "status", "metadata", "hero", "cta", "viewConfig"]
  },
  uiConfig: {
    icon: "Package",
    displayName: "Service",
    pluralName: "Services",
    listView: {
      columns: ["name", "slug", "category", "status"],
      defaultSort: { field: "updatedAt", direction: "desc" },
      filters: ["status", "category"],
      searchFields: ["name", "slug", "metadata.description"]
    },
    formView: {
      tabs: ["basic", "hero", "content", "metrics", "pricing", "settings"],
      sections: {
        basic: ["name", "slug", "category", "status", "metadata"],
        hero: ["hero.badge", "hero.headline", "hero.subheadline", "hero.stats", "hero.cta"],
        content: ["challenges", "capabilities", "implementation", "useCases"],
        metrics: ["metrics.beforeAfter", "metrics.financial"],
        pricing: ["pricing.tiers"],
        settings: ["viewConfig", "customBlocks"]
      }
    }
  },
  entityMapping: {
    toolMappings: {
      "service-manager": {
        reads: ["*"],
        writes: ["*"],
        required: ["slug", "name"]
      },
      "content-generator": {
        reads: ["metadata", "hero", "challenges", "capabilities"],
        writes: ["hero.subheadline", "metadata.description"],
        required: []
      },
      "seo-optimizer": {
        reads: ["metadata", "slug"],
        writes: ["metadata.title", "metadata.description", "metadata.keywords"],
        required: ["slug"]
      }
    },
    allowedTypes: ["service"],
    constraints: {
      uniqueFields: ["slug"],
      requiredFields: ["slug", "name", "category", "status"],
      maxLength: {
        "metadata.description": 160,
        "metadata.title": 60
      }
    }
  },
  version: 1
};

// Register the entity type
export function registerServiceEntity() {
  try {
    entityRegistry.registerEntityType(serviceEntityType);
    console.log("Service entity type registered successfully");
  } catch (error) {
    console.error("Failed to register service entity type:", error);
  }
}

// Auto-register on module import
if (typeof window === "undefined") {
  // Only auto-register on server side
  registerServiceEntity();
}