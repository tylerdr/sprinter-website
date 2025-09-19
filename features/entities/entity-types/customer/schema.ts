import { z } from "zod";

// Customer status enum
export const CustomerStatus = z.enum([
  "lead",
  "prospect",
  "active",
  "churned",
  "suspended"
]);

// Customer type enum
export const CustomerType = z.enum([
  "enterprise",
  "mid-market",
  "smb",
  "startup",
  "individual"
]);

// Address schema
export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string()
});

// Contact schema
export const ContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.string().optional(),
  is_primary: z.boolean().default(false)
});

// Customer schema
export const CustomerSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  type: CustomerType,
  status: CustomerStatus,
  
  // Company information
  company_info: z.object({
    legal_name: z.string().optional(),
    tax_id: z.string().optional(),
    website: z.string().url().optional(),
    industry: z.string().optional(),
    size: z.string().optional(),
    founded: z.string().optional()
  }).default({}),
  
  // Billing information
  billing_info: z.object({
    address: AddressSchema.optional(),
    payment_method: z.string().optional(),
    payment_terms: z.string().optional(),
    credit_limit: z.number().optional()
  }).default({}),
  
  // Contacts
  contacts: z.array(ContactSchema).default([]),
  
  // Custom fields
  metadata: z.record(z.string(), z.any()).default({}),
  
  // Timestamps
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  tenant_id: z.number().optional()
});

// Create and Update schemas
export const CreateCustomerSchema = CustomerSchema.omit({ id: true, created_at: true, updated_at: true });
export const UpdateCustomerSchema = CreateCustomerSchema.partial();

// Export types
export type Customer = z.infer<typeof CustomerSchema>;
export type CreateCustomer = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomer = z.infer<typeof UpdateCustomerSchema>;
export type CustomerStatus = z.infer<typeof CustomerStatus>;
export type CustomerType = z.infer<typeof CustomerType>;