import { EntityType } from "../../types";
import { DocumentSchema, type Document } from "./schema";

export const DocumentEntity: EntityType<Document> = {
  slug: "document",
  name: "Document",
  namespace: "sprinter",
  isWorkspace: false,
  schema: DocumentSchema,
  uiConfig: {
    icon: "FileText",
    displayName: "Document",
    pluralName: "Documents",
    listView: {
      columns: ["name", "type", "status", "file_info.size", "created_at"],
      defaultSort: { field: "created_at", direction: "desc" },
      filters: ["status", "type"],
      searchFields: ["name", "extracted_data.text"]
    },
    formView: {
      tabs: ["basic", "processing", "extraction", "classification"],
      sections: {
        basic: ["name", "slug", "type", "status", "project_id"],
        processing: ["processing"],
        extraction: ["extracted_data"],
        classification: ["classification"]
      }
    }
  },
  entityMapping: {
    toolMappings: {
      "document-processor": {
        reads: ["*"],
        writes: ["*"],
        required: ["name", "slug", "file_info"]
      },
      "extraction-engine": {
        reads: ["file_info", "type"],
        writes: ["extracted_data", "processing", "status"],
        required: ["slug"]
      }
    },
    allowedTypes: ["document"],
    constraints: {
      uniqueFields: ["slug"],
      requiredFields: ["name", "slug", "type", "file_info"]
    }
  },
  version: 1
};

export * from "./schema";