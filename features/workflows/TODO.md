# Workflows Module TODO

Based on the 7-stage release plan and existing workflow implementation.

## Current State
The workflow system is already 95% complete in the main codebase. This module serves as the feature-flagged parallel implementation for the new architecture.

## Stage 1-5: Not Required
Workflows are not part of the initial 5 stages. Focus is on tools, agents, and chat.

## Stage 6: Database Integration
- [ ] Migrate workflow definitions to features/
  - [ ] Copy workflow engine from existing implementation
  - [ ] Update imports to use features/ paths
  - [ ] Maintain compatibility with existing DB schema
- [ ] Workflow templates
  - [ ] Broker admin onboarding
  - [ ] Loan officer onboarding
  - [ ] Lender admin setup
  - [ ] Support team configuration
- [ ] Tool bridge integration
  - [ ] Connect to features/tools implementations
  - [ ] Map tool slugs to new locations
  - [ ] Maintain backward compatibility

## Stage 7: Full Migration
- [ ] Complete feature module structure
  - [ ] Create engine/executor.ts
  - [ ] Create engine/state.ts
  - [ ] Create engine/transitions.ts
  - [ ] Create types.ts with interfaces
- [ ] UI Components
  - [ ] Create components/workflow-view.tsx
  - [ ] Create components/progress.tsx
  - [ ] Step rendering components
- [ ] Integration with new tools
  - [ ] Update tool bridge for all migrated tools
  - [ ] Test with new tool implementations
  - [ ] Validate all workflow templates

## Existing Implementation Reference
Based on CLAUDE.md, the workflow system already includes:
- ✅ Database tables (workflows, workflow_instances, workflow_step_logs)
- ✅ Account management tools integration
- ✅ Onboarding workflows implemented
- ✅ TypeScript type safety
- ✅ JSON field casting for compiled_steps

## Tool Bridge Mapping
Current tools used in workflows:
```typescript
// Existing tools that need bridge mapping
const toolBridge = {
  'profile-update': '@/features/tools/account/profile-update',
  'manage-entities': '@/features/tools/account/manage-entities',
  'manage-ae-connections': '@/features/tools/account/manage-ae-connections',
  'manage-preferred-lenders': '@/features/tools/account/manage-preferred-lenders',
  'create-tenant': '@/features/tools/account/create-tenant',
  'manage-tenant-users': '@/features/tools/account/manage-tenant-users',
  'invite-team-members': '@/features/tools/account/invite-team-members',
};
```

## Migration Strategy
1. Keep existing workflow system operational
2. Create parallel implementation in features/
3. Feature flag new workflow UI
4. Gradually migrate workflows to new system
5. Remove old implementation after validation

## Testing Requirements
- [ ] Engine tests
  - [ ] Step execution
  - [ ] State management
  - [ ] Decision node logic
- [ ] Template tests
  - [ ] Each onboarding flow
  - [ ] Tool integration
  - [ ] Error handling
- [ ] E2E tests
  - [ ] Complete workflow execution
  - [ ] Tool bridge functionality
  - [ ] State persistence

## Verification Commands
```bash
# Check existing workflow tables
echo "SELECT COUNT(*) FROM workflows;" | npx supabase db query

# Verify workflow instances
echo "SELECT COUNT(*) FROM workflow_instances;" | npx supabase db query

# Test workflow execution
npm test -- features/workflows/engine/__tests__/
```

## Dependencies
- Requires tools module for tool execution
- Requires entities module for data management
- Existing database schema (already in place)

## Notes
- Workflow system is lower priority (Stages 6-7)
- Existing implementation is production-ready
- Focus on tools/agents/chat first (Stages 1-5)
- This module provides architectural alignment, not new functionality