import { EntityType } from "../../types";
import { InvoiceSchema, type Invoice } from "./schema";

export const InvoiceEntity: EntityType<Invoice> = {
  slug: "invoice",
  name: "Invoice",
  namespace: "sprinter",
  isWorkspace: false,
  schema: InvoiceSchema,
  uiConfig: {
    icon: "Receipt",
    displayName: "Invoice",
    pluralName: "Invoices",
    listView: {
      columns: ["invoice_number", "customer_id", "amounts.total", "status", "due_date"],
      defaultSort: { field: "issue_date", direction: "desc" },
      filters: ["status", "customer_id"],
      searchFields: ["invoice_number", "billing_details.bill_to.name"]
    },
    formView: {
      tabs: ["basic", "items", "billing", "payment", "attachments"],
      sections: {
        basic: ["invoice_number", "customer_id", "project_id", "status", "issue_date", "due_date"],
        items: ["line_items", "amounts"],
        billing: ["billing_details", "payment_terms"],
        payment: ["payments", "paid_date"],
        attachments: ["notes", "attachments"]
      }
    }
  },
  entityMapping: {
    toolMappings: {
      "invoice-manager": {
        reads: ["*"],
        writes: ["*"],
        required: ["invoice_number", "customer_id", "line_items"]
      },
      "payment-processor": {
        reads: ["amounts", "payment_terms"],
        writes: ["payments", "status", "paid_date"],
        required: ["invoice_number"]
      }
    },
    allowedTypes: ["invoice"],
    constraints: {
      uniqueFields: ["invoice_number"],
      requiredFields: ["invoice_number", "customer_id", "status", "line_items"]
    }
  },
  version: 1
};

export * from "./schema";