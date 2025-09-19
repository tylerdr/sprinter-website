import { EntityType } from "../../types";
import { ProjectSchema, type Project } from "./schema";

export const ProjectEntity: EntityType<Project> = {
  slug: "project",
  name: "Project",
  namespace: "sprinter",
  parentSlug: "customer",
  isWorkspace: false,
  schema: ProjectSchema,
  uiConfig: {
    icon: "FolderOpen",
    displayName: "Project",
    pluralName: "Projects",
    listView: {
      columns: ["name", "status", "priority", "start_date", "end_date"],
      defaultSort: { field: "created_at", direction: "desc" },
      filters: ["status", "priority"],
      searchFields: ["name", "description"]
    },
    formView: {
      tabs: ["basic", "details", "timeline", "budget", "team"],
      sections: {
        basic: ["name", "slug", "customer_id", "status", "priority"],
        details: ["description", "objectives", "deliverables"],
        timeline: ["start_date", "end_date", "milestones"],
        budget: ["budget"],
        team: ["team"]
      }
    }
  },
  entityMapping: {
    toolMappings: {
      "project-manager": {
        reads: ["*"],
        writes: ["*"],
        required: ["name", "slug", "customer_id"]
      },
      "timeline-tracker": {
        reads: ["milestones", "start_date", "end_date"],
        writes: ["milestones"],
        required: ["slug"]
      }
    },
    allowedTypes: ["project"],
    constraints: {
      uniqueFields: ["slug"],
      requiredFields: ["name", "slug", "customer_id", "status"]
    }
  },
  version: 1
};

export * from "./schema";