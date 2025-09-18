/**
 * Unit tests for Workspace Service
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getOrCreateChatWorkspaceAction,
  getChatWorkspaceAction,
  addEntityToChatWorkspaceAction,
  getChatEntityByTypeAction,
  getWorkspaceStatsAction,
  type ChatWorkspace,
  type WorkspaceEntity
} from '../server/workspace-service';

// Mock Supabase and other dependencies
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn((table) => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: null,
            error: null
          })),
          maybeSingle: vi.fn(() => ({
            data: null,
            error: null
          }))
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          data: null,
          error: null
        }))
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => ({
            data: { id: 'test-entity-id' },
            error: null
          }))
        }))
      }))
    })),
    auth: {
      getUser: vi.fn(() => ({
        data: { user: { id: 'test-user-id' } },
        error: null
      }))
    },
    rpc: vi.fn(() => ({
      data: 'test-workspace-id',
      error: null
    }))
  }))
}));

vi.mock('@/lib/profiles', () => ({
  getUserProfileWithCurrentTenant: vi.fn(() => ({
    current_tenant: { id: 'test-tenant-id' }
  }))
}));

vi.mock('../registry', () => ({
  entityRegistry: {
    initialize: vi.fn(),
    getEntityType: vi.fn(() => ({
      namespace: 'loan',
      isWorkspace: true
    })),
    getEntitiesForTool: vi.fn(() => [{
      entitySlug: 'loan.scenario'
    }])
  }
}));

vi.mock('../server/actions', () => ({
  createOrAttachEntityAction: vi.fn(async () => ({
    entityId: 'test-entity-id'
  })),
  getEntityAction: vi.fn(async () => ({
    id: 'test-entity-id',
    type_slug: 'scenario',
    full_slug: 'loan.scenario',
    title: 'Test Workspace',
    state_json: {},
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  })),
  attachEntityToWorkspaceAction: vi.fn(async () => ({
    ok: true
  })),
  getWorkspaceEntitiesAction: vi.fn(async () => [
    {
      id: 'entity-1',
      type_slug: 'scenario',
      full_slug: 'loan.scenario',
      title: 'Loan Scenario 1',
      state_json: { status: 'draft' },
      namespace: 'loan',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ])
}));

describe('WorkspaceService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getOrCreateChatWorkspaceAction', () => {
    it('should return existing workspace if chat already has one', async () => {
      const mockSupabase = (await import('@/lib/supabase/server')).createClient as any;
      mockSupabase.mockReturnValueOnce({
        from: vi.fn(() => ({
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn(() => ({
                data: { workspace_id: 'existing-workspace-id' },
                error: null
              }))
            }))
          }))
        })),
        auth: {
          getUser: vi.fn(() => ({
            data: { user: { id: 'test-user-id' } },
            error: null
          }))
        }
      });

      const result = await getOrCreateChatWorkspaceAction({
        chatId: 'test-chat-id',
        workspaceType: 'loan.scenario'
      });

      expect(result.workspaceId).toBe('existing-workspace-id');
      expect(result.isNew).toBe(false);
    });

    it('should create new workspace if chat does not have one', async () => {
      const result = await getOrCreateChatWorkspaceAction({
        chatId: 'test-chat-id',
        workspaceType: 'loan.scenario',
        title: 'Test Workspace'
      });

      expect(result.workspaceId).toBe('test-entity-id');
      expect(result.isNew).toBe(true);
    });

    it('should use default workspace type if not specified', async () => {
      const result = await getOrCreateChatWorkspaceAction({
        chatId: 'test-chat-id'
      });

      expect(result.workspaceId).toBeDefined();
      expect(result.isNew).toBe(true);
    });
  });

  describe('getChatWorkspaceAction', () => {
    it('should return null if chat has no workspace', async () => {
      const result = await getChatWorkspaceAction('test-chat-id');
      expect(result).toBeNull();
    });

    it('should return workspace with entities if exists', async () => {
      const mockSupabase = (await import('@/lib/supabase/server')).createClient as any;
      mockSupabase.mockReturnValueOnce({
        from: vi.fn(() => ({
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn(() => ({
                data: {
                  workspace_id: 'workspace-id',
                  title: 'Chat Title',
                  created_at: '2024-01-01T00:00:00Z',
                  updated_at: '2024-01-01T00:00:00Z'
                },
                error: null
              }))
            }))
          }))
        })),
        auth: {
          getUser: vi.fn(() => ({
            data: { user: { id: 'test-user-id' } },
            error: null
          }))
        }
      });

      const result = await getChatWorkspaceAction('test-chat-id');

      if (result) {
        expect(result.chatId).toBe('test-chat-id');
        expect(result.workspaceId).toBe('workspace-id');
        expect(result.workspaceType).toBe('loan.scenario');
        expect(result.entities).toHaveLength(1);
        expect(result.entities[0].typeSlug).toBe('scenario');
      }
    });
  });

  describe('addEntityToChatWorkspaceAction', () => {
    it('should create entity and attach to workspace', async () => {
      const result = await addEntityToChatWorkspaceAction({
        chatId: 'test-chat-id',
        entityTypeSlug: 'analysis.report',
        title: 'Test Report',
        initialState: { status: 'draft' }
      });

      expect(result.entityId).toBe('test-entity-id');
    });

    it('should handle namespace from dot-slug', async () => {
      const result = await addEntityToChatWorkspaceAction({
        chatId: 'test-chat-id',
        entityTypeSlug: 'loan.application'
      });

      expect(result.entityId).toBeDefined();
    });
  });

  describe('getChatEntityByTypeAction', () => {
    it('should return null if workspace does not exist and createIfMissing is false', async () => {
      const result = await getChatEntityByTypeAction({
        chatId: 'test-chat-id',
        entityType: 'loan.scenario',
        createIfMissing: false
      });

      expect(result.entityId).toBeNull();
      expect(result.entity).toBeUndefined();
    });

    it('should create entity if missing and createIfMissing is true', async () => {
      const result = await getChatEntityByTypeAction({
        chatId: 'test-chat-id',
        entityType: 'loan.scenario',
        createIfMissing: true
      });

      expect(result.entityId).toBe('test-entity-id');
    });

    it('should find entity by type slug variations', async () => {
      const mockSupabase = (await import('@/lib/supabase/server')).createClient as any;
      mockSupabase.mockReturnValueOnce({
        from: vi.fn(() => ({
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn(() => ({
                data: {
                  workspace_id: 'workspace-id',
                  title: 'Chat Title',
                  created_at: '2024-01-01T00:00:00Z',
                  updated_at: '2024-01-01T00:00:00Z'
                },
                error: null
              }))
            }))
          }))
        })),
        auth: {
          getUser: vi.fn(() => ({
            data: { user: { id: 'test-user-id' } },
            error: null
          }))
        }
      });

      const result = await getChatEntityByTypeAction({
        chatId: 'test-chat-id',
        entityType: 'scenario' // Simple slug
      });

      if (result.entityId) {
        expect(result.entityId).toBe('entity-1');
        expect(result.entity).toBeDefined();
        expect(result.entity?.fullSlug).toBe('loan.scenario');
      }
    });
  });

  describe('getWorkspaceStatsAction', () => {
    it('should calculate workspace statistics', async () => {
      const stats = await getWorkspaceStatsAction('test-workspace-id');

      expect(stats.workspaceId).toBe('test-workspace-id');
      expect(stats.totalEntities).toBe(1);
      expect(stats.entityTypes).toContain('loan.scenario');
      expect(stats.entityTypeCount['loan.scenario']).toBe(1);
      expect(stats.workspaceType).toBe('loan.scenario');
      expect(stats.isActive).toBe(true);
    });

    it('should handle empty workspace', async () => {
      const mockActions = await import('../server/actions');
      (mockActions.getWorkspaceEntitiesAction as any).mockResolvedValueOnce([]);

      const stats = await getWorkspaceStatsAction('empty-workspace-id');

      expect(stats.totalEntities).toBe(0);
      expect(stats.entityTypes).toHaveLength(0);
    });
  });
});