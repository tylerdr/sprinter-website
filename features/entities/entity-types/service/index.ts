import { EntityType } from "../../types";
import { ServiceSchema, type Service } from "./schema";

export const ServiceEntity: EntityType<Service> = {
  slug: "service",
  name: "Service",
  namespace: "sprinter",
  isWorkspace: false,
  schema: ServiceSchema,
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

export * from "./schema";