/**
 * Unit tests for Entity Registry
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { entityRegistry } from '../registry';
import type { EntityType } from '../registry';

// Mock the Supabase client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          data: [],
          error: null
        }))
      }))
    }))
  }))
}));

describe('EntityRegistry', () => {
  beforeEach(() => {
    // Clear registry before each test
    entityRegistry.clear();
  });

  describe('registerEntityType', () => {
    it('should register an entity type successfully', () => {
      const entityType: EntityType = {
        slug: 'scenario',
        name: 'Loan Scenario',
        namespace: 'loan',
        isWorkspace: true,
        schema: {
          type: 'object',
          properties: {
            borrower: { type: 'object' },
            property: { type: 'object' },
            loan: { type: 'object' }
          }
        },
        uiConfig: {},
        entityMapping: {},
        version: 1
      };

      entityRegistry.registerEntityType(entityType);
      const retrieved = entityRegistry.getEntityType('loan.scenario');

      expect(retrieved).toBeDefined();
      expect(retrieved?.slug).toBe('scenario');
      expect(retrieved?.namespace).toBe('loan');
      expect(retrieved?.isWorkspace).toBe(true);
    });

    it('should generate full dot-slug notation', () => {
      const entityType: EntityType = {
        slug: 'report',
        name: 'Eligibility Report',
        namespace: 'analysis',
        isWorkspace: false,
        schema: {},
        uiConfig: {},
        entityMapping: {},
        version: 1
      };

      entityRegistry.registerEntityType(entityType);

      // Should find by full slug
      expect(entityRegistry.getEntityType('analysis.report')).toBeDefined();

      // Should also find by simple slug
      expect(entityRegistry.getEntityType('report')).toBeDefined();
    });
  });

  describe('getEntityType', () => {
    beforeEach(() => {
      const entityType: EntityType = {
        slug: 'scenario',
        name: 'Loan Scenario',
        namespace: 'loan',
        isWorkspace: true,
        schema: {},
        uiConfig: {},
        entityMapping: {},
        version: 1
      };
      entityRegistry.registerEntityType(entityType);
    });

    it('should retrieve entity by full slug', () => {
      const entity = entityRegistry.getEntityType('loan.scenario');
      expect(entity).toBeDefined();
      expect(entity?.slug).toBe('scenario');
    });

    it('should retrieve entity by simple slug', () => {
      const entity = entityRegistry.getEntityType('scenario');
      expect(entity).toBeDefined();
      expect(entity?.slug).toBe('scenario');
    });

    it('should return undefined for non-existent entity', () => {
      const entity = entityRegistry.getEntityType('non.existent');
      expect(entity).toBeUndefined();
    });
  });

  describe('validateEntityState', () => {
    beforeEach(() => {
      const entityType: EntityType = {
        slug: 'scenario',
        name: 'Loan Scenario',
        namespace: 'loan',
        isWorkspace: true,
        schema: {
          type: 'object',
          properties: {
            borrower: {
              type: 'object',
              properties: {
                fico: { type: 'number', minimum: 300, maximum: 850 }
              }
            }
          }
        },
        uiConfig: {},
        entityMapping: {},
        version: 1
      };
      entityRegistry.registerEntityType(entityType);
    });

    it('should validate valid entity state', () => {
      const state = {
        borrower: {
          fico: 720
        }
      };

      const result = entityRegistry.validateEntityState('loan.scenario', state);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid entity state', () => {
      const state = {
        borrower: {
          fico: 900 // Above max
        }
      };

      const result = entityRegistry.validateEntityState('loan.scenario', state);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.[0]).toContain('fico');
    });

    it('should return error for non-existent entity type', () => {
      const result = entityRegistry.validateEntityState('non.existent', {});
      expect(result.valid).toBe(false);
      expect(result.errors?.[0]).toContain('Entity type not found');
    });
  });

  describe('Tool Mappings', () => {
    beforeEach(() => {
      const entityType: EntityType = {
        slug: 'scenario',
        name: 'Loan Scenario',
        namespace: 'loan',
        isWorkspace: true,
        schema: {},
        uiConfig: {},
        entityMapping: {
          toolMappings: {
            'marketplace-search': {
              reads: ['borrower', 'property', 'loan'],
              writes: ['eligibleLenders', 'missedLenders'],
              required: ['borrower.fico', 'property.value', 'loan.amount']
            }
          }
        },
        version: 1
      };
      entityRegistry.registerEntityType(entityType);
    });

    it('should extract tool mappings from entity', () => {
      const mappings = entityRegistry.getToolMappingsForEntity('loan.scenario');
      expect(mappings).toHaveLength(1);
      expect(mappings[0].toolSlug).toBe('marketplace-search');
      expect(mappings[0].reads).toContain('borrower');
      expect(mappings[0].writes).toContain('eligibleLenders');
    });

    it('should get entities for a specific tool', () => {
      const entities = entityRegistry.getEntitiesForTool('marketplace-search');
      expect(entities).toHaveLength(1);
      expect(entities[0].entitySlug).toBe('loan.scenario');
    });

    it('should check read permissions', () => {
      const canRead = entityRegistry.canToolReadFromEntity(
        'marketplace-search',
        'loan.scenario',
        'borrower'
      );
      expect(canRead).toBe(true);

      const cannotRead = entityRegistry.canToolReadFromEntity(
        'marketplace-search',
        'loan.scenario',
        'calculations'
      );
      expect(cannotRead).toBe(false);
    });

    it('should check write permissions', () => {
      const canWrite = entityRegistry.canToolWriteToEntity(
        'marketplace-search',
        'loan.scenario',
        'eligibleLenders'
      );
      expect(canWrite).toBe(true);

      const cannotWrite = entityRegistry.canToolWriteToEntity(
        'marketplace-search',
        'loan.scenario',
        'borrower'
      );
      expect(cannotWrite).toBe(false);
    });

    it('should get required fields for tool', () => {
      const required = entityRegistry.getRequiredFieldsForTool(
        'marketplace-search',
        'loan.scenario'
      );
      expect(required).toContain('borrower.fico');
      expect(required).toContain('property.value');
      expect(required).toContain('loan.amount');
    });
  });

  describe('Namespace Operations', () => {
    beforeEach(() => {
      const entities: EntityType[] = [
        {
          slug: 'scenario',
          name: 'Loan Scenario',
          namespace: 'loan',
          isWorkspace: true,
          schema: {},
          uiConfig: {},
          entityMapping: {},
          version: 1
        },
        {
          slug: 'application',
          name: 'Loan Application',
          namespace: 'loan',
          isWorkspace: false,
          schema: {},
          uiConfig: {},
          entityMapping: {},
          version: 1
        },
        {
          slug: 'report',
          name: 'Eligibility Report',
          namespace: 'analysis',
          isWorkspace: false,
          schema: {},
          uiConfig: {},
          entityMapping: {},
          version: 1
        }
      ];

      entities.forEach(e => entityRegistry.registerEntityType(e));
    });

    it('should get all entities in a namespace', () => {
      const loanEntities = entityRegistry.getEntityTypesByNamespace('loan');
      expect(loanEntities).toHaveLength(2);
      expect(loanEntities.map(e => e.slug)).toContain('scenario');
      expect(loanEntities.map(e => e.slug)).toContain('application');
    });

    it('should get workspace types', () => {
      const workspaces = entityRegistry.getWorkspaceTypes();
      expect(workspaces).toHaveLength(1);
      expect(workspaces[0].slug).toBe('scenario');
      expect(workspaces[0].isWorkspace).toBe(true);
    });

    it('should get all types', () => {
      const allTypes = entityRegistry.getAllTypes();
      expect(allTypes).toHaveLength(3);
    });
  });
});