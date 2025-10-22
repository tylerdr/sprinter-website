import { z } from "zod";

// Document type enum
export const DocumentType = z.enum([
  "pdf",
  "word",
  "excel",
  "image",
  "text",
  "presentation",
  "other"
]);

// Document status enum
export const DocumentStatus = z.enum([
  "uploaded",
  "processing",
  "processed",
  "failed",
  "archived"
]);

// Extraction field schema
export const ExtractionFieldSchema = z.object({
  name: z.string(),
  value: z.any(),
  confidence: z.number().min(0).max(1),
  location: z.object({
    page: z.number(),
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number()
  }).optional()
});

// Document schema
export const DocumentSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  type: DocumentType,
  status: DocumentStatus,
  project_id: z.string().uuid().optional(),
  
  // File information
  file_info: z.object({
    size: z.number(),
    mime_type: z.string(),
    storage_path: z.string(),
    original_name: z.string(),
    checksum: z.string().optional()
  }),
  
  // Processing information
  processing: z.object({
    started_at: z.string().datetime().optional(),
    completed_at: z.string().datetime().optional(),
    duration_ms: z.number().optional(),
    error: z.string().optional()
  }).default({}),
  
  // Extracted data
  extracted_data: z.object({
    text: z.string().optional(),
    fields: z.array(ExtractionFieldSchema).default([]),
    tables: z.array(z.record(z.string(), z.any())).default([]),
    metadata: z.record(z.string(), z.any()).default({})
  }).default({
    fields: [],
    tables: [],
    metadata: {}
  }),
  
  // Classification
  classification: z.object({
    category: z.string().optional(),
    confidence: z.number().min(0).max(1).optional(),
    tags: z.array(z.string()).default([])
  }).default({
    tags: []
  }),
  
  // Versions
  versions: z.array(z.object({
    version: z.number(),
    created_at: z.string().datetime(),
    storage_path: z.string(),
    changes: z.string().optional()
  })).default([]),
  
  // Custom fields
  metadata: z.record(z.string(), z.any()).default({}),
  
  // Timestamps
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  tenant_id: z.number().optional()
});

// Create and Update schemas
export const CreateDocumentSchema = DocumentSchema.omit({ id: true, created_at: true, updated_at: true });
export const UpdateDocumentSchema = CreateDocumentSchema.partial();

// Export types
export type Document = z.infer<typeof DocumentSchema>;
export type CreateDocument = z.infer<typeof CreateDocumentSchema>;
export type UpdateDocument = z.infer<typeof UpdateDocumentSchema>;
export type DocumentType = z.infer<typeof DocumentType>;
export type DocumentStatus = z.infer<typeof DocumentStatus>;