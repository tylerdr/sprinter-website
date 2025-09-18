/**
 * Entity Registry - Manages entity types with dot-slug architecture
 * Provides schema validation, workspace management, and tool mapping
 */

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { logger } from "@/lib/logger";

// ============================================
// TYPES & SCHEMAS
// ============================================

export const EntityTypeSchema = z.object({
  slug: z.string(),
  name: z.string(),
  namespace: z.string().optional(),
  parentSlug: z.string().optional(),
  isWorkspace: z.boolean().default(false),
  schema: z.record(z.string(), z.any()),
  uiConfig: z.record(z.string(), z.any()).default({}),
  entityMapping: z.record(z.string(), z.any()).default({}),
  version: z.number().default(1)
});

export const EntityMappingSchema = z.object({
  toolMappings: z.record(z.string(), z.object({
    reads: z.array(z.string()).default([]),
    writes: z.array(z.string()).default([]),
    required: z.array(z.string()).default([])
  })).default({}),
  allowedTypes: z.array(z.string()).default(['*']),
  constraints: z.record(z.string(), z.any()).default({})
});

export type EntityType = z.infer<typeof EntityTypeSchema>;
export type EntityMapping = z.infer<typeof EntityMappingSchema>;

// Tool-Entity integration interface
export interface ToolEntityMapping {
  toolSlug: string;
  entitySlug: string;
  reads: string[];
  writes: string[];
  required: string[];
}

// ============================================
// ENTITY REGISTRY
// ============================================

class EntityRegistry {
  private static instance: EntityRegistry;
  private entityTypes = new Map<string, EntityType>();
  private toolMappings = new Map<string, ToolEntityMapping[]>();
  private initialized = false;

  private constructor() {}

  static getInstance(): EntityRegistry {
    if (!EntityRegistry.instance) {
      EntityRegistry.instance = new EntityRegistry();
    }
    return EntityRegistry.instance;
  }

  /**
   * Initialize the registry by loading entity types from database
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const supabase = await createClient();
      const { data: entityTypes, error } = await supabase
        .from("entity_types")
        .select("*")
        .order("namespace", { ascending: true });

      if (error) {
        logger.error("Failed to load entity types", { error });
        return;
      }

      // Register each entity type
      for (const dbType of entityTypes || []) {
        const entityType: EntityType = {
          slug: dbType.slug,
          name: dbType.name,
          namespace: dbType.namespace || undefined,
          parentSlug: dbType.parent_slug || undefined,
          isWorkspace: dbType.is_workspace || false,
          schema: (dbType.schema_json as Record<string, any>) || {},
          uiConfig: (dbType.ui_config_json as Record<string, any>) || {},
          entityMapping: (dbType.entity_mapping as Record<string, any>) || {},
          version: dbType.version || 1
        };

        this.registerEntityType(entityType);
      }

      this.initialized = true;
      logger.info(`Entity registry initialized with ${this.entityTypes.size} types`);
    } catch (error) {
      logger.error("Failed to initialize entity registry", { error });
      throw error;
    }
  }

  /**
   * Register an entity type
   */
  registerEntityType(entityType: EntityType): void {
    // Validate the entity type
    const validated = EntityTypeSchema.parse(entityType);

    // Generate full slug (dot notation)
    const fullSlug = this.generateFullSlug(validated.slug, validated.namespace);

    // Store the entity type
    this.entityTypes.set(fullSlug, validated);

    // Extract and register tool mappings
    if (validated.entityMapping.toolMappings) {
      this.extractToolMappings(fullSlug, validated.entityMapping.toolMappings);
    }

    logger.debug(`Registered entity type: ${fullSlug}`);
  }

  /**
   * Get entity type by slug (supports both dot and non-dot notation)
   */
  getEntityType(slug: string): EntityType | undefined {
    // Try exact match first
    let entityType = this.entityTypes.get(slug);

    if (!entityType) {
      // Try to find by simple slug if no namespace provided
      if (!slug.includes('.')) {
        const entries = Array.from(this.entityTypes.entries());
        for (const [fullSlug, type] of entries) {
          if (fullSlug.endsWith('.' + slug) || fullSlug === slug) {
            entityType = type;
            break;
          }
        }
      }
    }

    return entityType;
  }

  /**
   * Get all entity types in a namespace
   */
  getEntityTypesByNamespace(namespace: string): EntityType[] {
    return Array.from(this.entityTypes.values())
      .filter(type => type.namespace === namespace);
  }

  /**
   * Get workspace entity types
   */
  getWorkspaceTypes(): EntityType[] {
    return Array.from(this.entityTypes.values())
      .filter(type => type.isWorkspace);
  }

  /**
   * Get tool mappings for an entity type
   */
  getToolMappingsForEntity(entitySlug: string): ToolEntityMapping[] {
    const fullSlug = this.resolveFullSlug(entitySlug);
    return this.toolMappings.get(fullSlug) || [];
  }

  /**
   * Get all entity types
   */
  getAllTypes(): EntityType[] {
    return Array.from(this.entityTypes.values());
  }

  /**
   * Get entity types that can be used by a tool
   */
  getEntitiesForTool(toolSlug: string): ToolEntityMapping[] {
    const mappings: ToolEntityMapping[] = [];

    const entries = Array.from(this.toolMappings.entries());
    for (const [entitySlug, entityMappings] of entries) {
      const toolMapping = entityMappings.find(m => m.toolSlug === toolSlug);
      if (toolMapping) {
        mappings.push(toolMapping);
      }
    }

    return mappings;
  }

  /**
   * Validate entity state against its schema
   */
  validateEntityState(entitySlug: string, state: any): { valid: boolean; errors?: string[] } {
    const entityType = this.getEntityType(entitySlug);

    if (!entityType) {
      return { valid: false, errors: [`Entity type not found: ${entitySlug}`] };
    }

    try {
      // Create a dynamic Zod schema from the JSON schema
      const zodSchema = this.jsonSchemaToZod(entityType.schema);
      zodSchema.parse(state);
      return { valid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        // ZodError has issues with types, so we'll handle it as any
        const zodError = error as any;
        const errors = zodError.errors ?
          zodError.errors.map((e: any) => `${e.path?.join('.') || 'field'}: ${e.message}`) :
          ['Validation failed'];
        return {
          valid: false,
          errors
        };
      }
      return { valid: false, errors: [error instanceof Error ? error.message : 'Unknown validation error'] };
    }
  }

  /**
   * Check if a tool can read from an entity
   */
  canToolReadFromEntity(toolSlug: string, entitySlug: string, field?: string): boolean {
    const mappings = this.getToolMappingsForEntity(entitySlug);
    const toolMapping = mappings.find(m => m.toolSlug === toolSlug);

    if (!toolMapping) return false;

    if (!field) return toolMapping.reads.length > 0;

    return toolMapping.reads.includes(field) || toolMapping.reads.includes('*');
  }

  /**
   * Check if a tool can write to an entity
   */
  canToolWriteToEntity(toolSlug: string, entitySlug: string, field?: string): boolean {
    const mappings = this.getToolMappingsForEntity(entitySlug);
    const toolMapping = mappings.find(m => m.toolSlug === toolSlug);

    if (!toolMapping) return false;

    if (!field) return toolMapping.writes.length > 0;

    return toolMapping.writes.includes(field) || toolMapping.writes.includes('*');
  }

  /**
   * Get required fields for a tool-entity interaction
   */
  getRequiredFieldsForTool(toolSlug: string, entitySlug: string): string[] {
    const mappings = this.getToolMappingsForEntity(entitySlug);
    const toolMapping = mappings.find(m => m.toolSlug === toolSlug);

    return toolMapping?.required || [];
  }

  /**
   * Generate full slug with dot notation
   */
  private generateFullSlug(slug: string, namespace?: string): string {
    if (namespace && !slug.startsWith(namespace + '.')) {
      return `${namespace}.${slug}`;
    }
    return slug;
  }

  /**
   * Resolve a slug to its full form
   */
  private resolveFullSlug(slug: string): string {
    if (slug.includes('.')) return slug;

    // Find the full slug for this simple slug
    const keys = Array.from(this.entityTypes.keys());
    for (const fullSlug of keys) {
      if (fullSlug.endsWith('.' + slug) || fullSlug === slug) {
        return fullSlug;
      }
    }

    return slug;
  }

  /**
   * Extract tool mappings from entity mapping configuration
   */
  private extractToolMappings(entitySlug: string, toolMappings: Record<string, any>): void {
    const mappings: ToolEntityMapping[] = [];

    for (const [toolSlug, mapping] of Object.entries(toolMappings)) {
      mappings.push({
        toolSlug,
        entitySlug,
        reads: mapping.reads || [],
        writes: mapping.writes || [],
        required: mapping.required || []
      });
    }

    this.toolMappings.set(entitySlug, mappings);
  }

  /**
   * Convert JSON Schema to Zod schema (basic implementation)
   * This is a simplified converter - could be expanded for more complex schemas
   */
  private jsonSchemaToZod(jsonSchema: any): z.ZodSchema {
    if (!jsonSchema || typeof jsonSchema !== 'object') {
      return z.any();
    }

    if (jsonSchema.type === 'object') {
      const shape: Record<string, z.ZodSchema> = {};

      if (jsonSchema.properties) {
        for (const [key, propSchema] of Object.entries(jsonSchema.properties)) {
          shape[key] = this.jsonSchemaToZod(propSchema);
        }
      }

      return z.object(shape);
    }

    if (jsonSchema.type === 'array') {
      const itemSchema = jsonSchema.items ? this.jsonSchemaToZod(jsonSchema.items) : z.any();
      return z.array(itemSchema);
    }

    if (jsonSchema.type === 'string') {
      if (jsonSchema.enum && Array.isArray(jsonSchema.enum)) {
        // z.enum requires tuple type, so we use union for dynamic enums
        return z.union(jsonSchema.enum.map((val: string) => z.literal(val)) as any);
      }
      return z.string();
    }

    if (jsonSchema.type === 'number') {
      let schema = z.number();
      if (jsonSchema.minimum !== undefined) {
        schema = schema.min(jsonSchema.minimum);
      }
      if (jsonSchema.maximum !== undefined) {
        schema = schema.max(jsonSchema.maximum);
      }
      return schema;
    }

    if (jsonSchema.type === 'integer') {
      return z.number().int();
    }

    if (jsonSchema.type === 'boolean') {
      return z.boolean();
    }

    return z.any();
  }

  /**
   * Clear the registry
   */
  clear(): void {
    this.entityTypes.clear();
    this.toolMappings.clear();
    this.initialized = false;
  }
}

// Export singleton instance
export const entityRegistry = EntityRegistry.getInstance();

// Helper functions for common operations
export const getEntityType = (slug: string) => entityRegistry.getEntityType(slug);
export const validateEntityState = (slug: string, state: any) => entityRegistry.validateEntityState(slug, state);
export const canToolReadFromEntity = (toolSlug: string, entitySlug: string, field?: string) =>
  entityRegistry.canToolReadFromEntity(toolSlug, entitySlug, field);
export const canToolWriteToEntity = (toolSlug: string, entitySlug: string, field?: string) =>
  entityRegistry.canToolWriteToEntity(toolSlug, entitySlug, field);