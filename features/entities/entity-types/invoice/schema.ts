import { z } from "zod";

// Invoice status enum
export const InvoiceStatus = z.enum([
  "draft",
  "sent",
  "viewed",
  "paid",
  "overdue",
  "cancelled",
  "refunded"
]);

// Line item schema
export const LineItemSchema = z.object({
  description: z.string(),
  quantity: z.number(),
  rate: z.number(),
  amount: z.number(),
  tax_rate: z.number().default(0),
  discount: z.number().default(0)
});

// Payment schema
export const PaymentSchema = z.object({
  date: z.string().datetime(),
  amount: z.number(),
  method: z.string(),
  reference: z.string().optional(),
  notes: z.string().optional()
});

// Invoice schema
export const InvoiceSchema = z.object({
  id: z.string().uuid().optional(),
  invoice_number: z.string(),
  customer_id: z.string().uuid(),
  project_id: z.string().uuid().optional(),
  status: InvoiceStatus,
  
  // Dates
  issue_date: z.string().datetime(),
  due_date: z.string().datetime(),
  paid_date: z.string().datetime().optional(),
  
  // Line items
  line_items: z.array(LineItemSchema).min(1),
  
  // Amounts
  amounts: z.object({
    subtotal: z.number(),
    tax: z.number(),
    discount: z.number().default(0),
    total: z.number(),
    paid: z.number().default(0),
    balance: z.number()
  }),
  
  // Payment terms
  payment_terms: z.object({
    days: z.number().default(30),
    late_fee: z.number().optional(),
    early_payment_discount: z.number().optional()
  }).default({
    days: 30
  }),
  
  // Billing details
  billing_details: z.object({
    bill_to: z.object({
      name: z.string(),
      address: z.string(),
      email: z.string().email().optional(),
      phone: z.string().optional()
    }),
    bill_from: z.object({
      name: z.string(),
      address: z.string(),
      email: z.string().email().optional(),
      phone: z.string().optional()
    })
  }),
  
  // Payment history
  payments: z.array(PaymentSchema).default([]),
  
  // Notes and attachments
  notes: z.string().optional(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
    size: z.number()
  })).default([]),
  
  // Custom fields
  metadata: z.record(z.string(), z.any()).default({}),
  
  // Timestamps
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  sent_at: z.string().datetime().optional(),
  viewed_at: z.string().datetime().optional(),
  tenant_id: z.number().optional()
});

// Create and Update schemas
export const CreateInvoiceSchema = InvoiceSchema.omit({ id: true, created_at: true, updated_at: true });
export const UpdateInvoiceSchema = CreateInvoiceSchema.partial();

// Export types
export type Invoice = z.infer<typeof InvoiceSchema>;
export type CreateInvoice = z.infer<typeof CreateInvoiceSchema>;
export type UpdateInvoice = z.infer<typeof UpdateInvoiceSchema>;
export type InvoiceStatus = z.infer<typeof InvoiceStatus>;