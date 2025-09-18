# Entities Module TODO

Based on the 7-stage release plan and AI Sprinter architecture.

## Stage 1-2: Not Required
Entities are not part of the initial chat and tool stages.

## Stage 3: Context Support
- [ ] Basic entity types for context
  - [ ] Define core entity interfaces
  - [ ] Create types.ts with Entity, EntityType
  - [ ] Schema definitions for validation

## Stage 4: Multi-Agent Context
- [ ] Entity loading for agents
  - [ ] Implement context policy support
  - [ ] Entity filtering by scope
  - [ ] Tenant/workspace isolation

## Stage 5: Tool Integration
- [ ] Entity service for tools
  - [ ] Create service.ts with CRUD operations
  - [ ] Query and filter methods
  - [ ] Validation utilities

## Stage 6: Full Implementation ✅ Priority
- [ ] Core service implementation
  - [ ] Create EntityService class
  - [ ] CRUD operations (create, read, update, delete)
  - [ ] List and search methods
  - [ ] Bulk operations support
- [ ] Schema system
  - [ ] Create schemas/ directory
  - [ ] Define company.ts schema
  - [ ] Define person.ts schema
  - [ ] Define document.ts schema
  - [ ] Other entity type schemas
- [ ] Validation layer
  - [ ] Create validators/index.ts
  - [ ] Zod schema compilation
  - [ ] Runtime validation
  - [ ] Error handling
- [ ] React hooks
  - [ ] Create hooks/use-entities.ts
  - [ ] Create hooks/use-entity.ts
  - [ ] Query optimization
  - [ ] Cache management
- [ ] Database integration
  - [ ] Use existing entities table
  - [ ] Use entity_types table
  - [ ] Relationship management
  - [ ] RLS policies

## Stage 7: Advanced Features
- [ ] Extended entity types
  - [ ] ae-connection entities
  - [ ] preferred-lender entities
  - [ ] team-member entities
  - [ ] workspace entities
- [ ] Performance optimization
  - [ ] Query batching
  - [ ] Lazy loading
  - [ ] Index optimization
- [ ] Advanced queries
  - [ ] Full-text search
  - [ ] Relationship traversal
  - [ ] Aggregations

## Entity Types to Implement
```typescript
// Core types
- company: Organizations, brokerages, lenders
- person: Contacts, team members, AEs
- document: Files, guidelines, contracts
- program: Loan programs, products
- qualifier: Eligibility criteria

// Extended types (Stage 7)
- ae-connection: Account executive relationships
- preferred-lender: Lender preferences
- team-member: Team invitations
- workspace: Isolated work areas
```

## Integration Points
- [ ] Tools integration
  - [ ] manage-entities tool support
  - [ ] Entity CRUD via tools
  - [ ] Validation in tool execution
- [ ] Workflow integration
  - [ ] Entity creation in workflows
  - [ ] Entity updates in steps
  - [ ] Workflow context loading
- [ ] Agent integration
  - [ ] Context policy implementation
  - [ ] Entity preloading
  - [ ] Scope-based filtering
- [ ] Chat integration
  - [ ] Entity references in messages
  - [ ] Entity cards in UI
  - [ ] Entity search in chat

## Database Schema (Existing)
```sql
-- Already exists in current implementation
CREATE TABLE entity_types (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  schema JSONB NOT NULL,
  ui_schema JSONB
);

CREATE TABLE entities (
  id UUID PRIMARY KEY,
  entity_type_slug TEXT REFERENCES entity_types(slug),
  tenant_id UUID NOT NULL,
  workspace_id UUID,
  data JSONB NOT NULL,
  metadata JSONB DEFAULT '{}'
);

CREATE TABLE entity_relations (
  id UUID PRIMARY KEY,
  source_id UUID REFERENCES entities(id),
  target_id UUID REFERENCES entities(id),
  relation_type TEXT NOT NULL
);
```

## Testing Requirements
- [ ] Service tests
  - [ ] CRUD operations
  - [ ] Query methods
  - [ ] Validation logic
- [ ] Hook tests
  - [ ] Data fetching
  - [ ] State management
  - [ ] Error handling
- [ ] Schema tests
  - [ ] Validation rules
  - [ ] Type safety
  - [ ] Edge cases
- [ ] Integration tests
  - [ ] Tool integration
  - [ ] Workflow usage
  - [ ] Agent context

## Verification Commands
```bash
# Check entity tables exist
echo "SELECT COUNT(*) FROM entities;" | npx supabase db query
echo "SELECT COUNT(*) FROM entity_types;" | npx supabase db query

# Test service
npm test -- features/entities/__tests__/service.test.ts

# Test hooks
npm test -- features/entities/hooks/__tests__/
```

## Migration Notes
- Entity system partially exists in current codebase
- Database schema already in place
- Focus on service layer and React hooks
- Maintain compatibility with existing entities

## Current Status
- Stage 1-2: N/A (not required)
- Stage 3-5: ⏳ Basic support needed
- Stage 6: 🚧 Full implementation priority
- Stage 7: ⏳ Extended features

## Dependencies
- Database tables (already exist)
- Zod for validation
- React Query for hooks (optional)
- Tools module for integration