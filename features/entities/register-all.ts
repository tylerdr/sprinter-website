/**
 * Register all entity types with the entity registry
 */

import { entityRegistry } from "./registry";
import { entityTypes } from "./entity-types";

// Register all entity types
export async function registerAllEntityTypes() {
  // First initialize from database
  await entityRegistry.initialize();
  
  // Then register code-defined entity types
  // These will override database definitions if they exist
  for (const [slug, entityType] of Object.entries(entityTypes)) {
    try {
      // Convert to registry format
      const registryType = {
        slug: entityType.slug,
        name: entityType.name,
        namespace: entityType.namespace,
        parentSlug: entityType.parentSlug,
        isWorkspace: entityType.isWorkspace || false,
        schema: entityType.schema as any,
        uiConfig: entityType.uiConfig || {},
        entityMapping: entityType.entityMapping || {},
        version: entityType.version || 1
      };
      
      entityRegistry.registerEntityType(registryType);
      console.log(`Registered entity type: ${slug}`);
    } catch (error) {
      console.error(`Failed to register entity type ${slug}:`, error);
    }
  }
  
  console.log(`Successfully registered ${Object.keys(entityTypes).length} entity types`);
}