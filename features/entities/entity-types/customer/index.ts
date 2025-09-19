import { EntityType } from "../../types";
import { CustomerSchema, type Customer } from "./schema";

export const CustomerEntity: EntityType<Customer> = {
  slug: "customer",
  name: "Customer",
  namespace: "sprinter",
  isWorkspace: true,
  schema: CustomerSchema,
  uiConfig: {
    icon: "Users",
    displayName: "Customer",
    pluralName: "Customers",
    listView: {
      columns: ["name", "type", "status", "company_info.industry"],
      defaultSort: { field: "created_at", direction: "desc" },
      filters: ["status", "type"],
      searchFields: ["name", "company_info.legal_name"]
    },
    formView: {
      tabs: ["basic", "company", "billing", "contacts"],
      sections: {
        basic: ["name", "slug", "type", "status"],
        company: ["company_info"],
        billing: ["billing_info"],
        contacts: ["contacts"]
      }
    }
  },
  entityMapping: {
    toolMappings: {
      "customer-manager": {
        reads: ["*"],
        writes: ["*"],
        required: ["name", "slug"]
      },
      "crm-sync": {
        reads: ["*"],
        writes: ["status", "contacts", "metadata"],
        required: ["slug"]
      }
    },
    allowedTypes: ["customer"],
    constraints: {
      uniqueFields: ["slug"],
      requiredFields: ["name", "slug", "type", "status"]
    }
  },
  version: 1
};

export * from "./schema";