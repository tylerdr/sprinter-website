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
      // Convert to registry format using the new entity structure
      const registryType = {
        slug: entityType.name, // Use name as slug
        name: (entityType as any).displayName || entityType.name,
        namespace: "sprinter-ai",
        parentSlug: undefined,
        isWorkspace: false,
        schema: (entityType as any).schema || entityType,
        uiConfig: (entityType as any).ui || {},
        entityMapping: {},
        version: 1
      };

      entityRegistry.registerEntityType(registryType);
      console.log(`Registered entity type: ${slug}`);
    } catch (error) {
      console.error(`Failed to register entity type ${slug}:`, error);
    }
  }
  
  console.log(`Successfully registered ${Object.keys(entityTypes).length} entity types`);
}