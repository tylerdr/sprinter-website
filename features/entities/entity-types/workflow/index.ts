import { EntityType } from "../../types";
import { WorkflowSchema, type Workflow } from "./schema";

export const WorkflowEntity: EntityType<Workflow> = {
  slug: "workflow",
  name: "Workflow",
  namespace: "sprinter",
  isWorkspace: false,
  schema: WorkflowSchema,
  uiConfig: {
    icon: "GitBranch",
    displayName: "Workflow",
    pluralName: "Workflows",
    listView: {
      columns: ["name", "status", "trigger.type", "stats.total_runs", "last_run.started_at"],
      defaultSort: { field: "updated_at", direction: "desc" },
      filters: ["status", "trigger.type"],
      searchFields: ["name", "description"]
    },
    formView: {
      tabs: ["basic", "trigger", "steps", "settings", "history"],
      sections: {
        basic: ["name", "slug", "status", "description"],
        trigger: ["trigger"],
        steps: ["steps", "variables"],
        settings: ["settings"],
        history: ["last_run", "stats"]
      }
    }
  },
  entityMapping: {
    toolMappings: {
      "workflow-builder": {
        reads: ["*"],
        writes: ["*"],
        required: ["name", "slug", "trigger"]
      },
      "workflow-executor": {
        reads: ["*"],
        writes: ["last_run", "stats", "status"],
        required: ["slug"]
      }
    },
    allowedTypes: ["workflow"],
    constraints: {
      uniqueFields: ["slug"],
      requiredFields: ["name", "slug", "status", "trigger"]
    }
  },
  version: 1
};

export * from "./schema";