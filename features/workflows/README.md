# Workflows Module

Workflow engine for orchestrating multi-step processes and onboarding flows.

## Structure

```
workflows/
├── engine/               # Core workflow execution
│   ├── executor.ts       # Step execution logic
│   ├── state.ts         # State management
│   └── transitions.ts   # Decision node logic
├── types.ts             # TypeScript interfaces
├── templates/           # Pre-built workflows
│   ├── broker-admin.ts  # Broker onboarding
│   ├── loan-officer.ts  # LO onboarding
│   ├── lender-admin.ts  # Lender setup
│   └── support.ts       # Support team flow
├── components/          # UI components
│   ├── workflow-view.tsx # Step rendering
│   └── progress.tsx     # Progress indicator
└── __tests__/          # Workflow tests
```

## Workflow Interface

```typescript
interface Workflow {
  id: string;
  slug: string;
  name: string;
  description: string;
  triggers: WorkflowTrigger[];
  compiledSteps: WorkflowStep[];
  settings: {
    allowSkip?: boolean;
    saveProgress?: boolean;
    notifyOnComplete?: boolean;
  };
}

interface WorkflowStep {
  id: string;
  type: 'tool' | 'decision' | 'parallel' | 'wait';
  tool?: string;          // Tool slug for tool steps
  inputs?: Record<string, any>;
  conditions?: Condition[]; // For decision nodes
  next?: string | null;    // Next step ID
}
```

## Step Types

- **tool**: Execute a tool with inputs
- **decision**: Branch based on conditions
- **parallel**: Run multiple steps concurrently
- **wait**: Pause for time or external event

## Execution Flow

```typescript
import { WorkflowExecutor } from '@/features/workflows/engine/executor';

const executor = new WorkflowExecutor(workflow);
const result = await executor.execute({
  tenantId,
  userId,
  initialInputs: { /* data */ }
});
```

## Tool Bridge

Workflows integrate with tools via bridge pattern:
```typescript
// Bridge maps tool slugs to implementations
const toolBridge = {
  'profile-update': profileUpdateTool,
  'manage-entities': manageEntitiesTool,
  'invite-team-members': inviteTeamMembersTool,
  // ...
};
```

## Template Workflows

### Broker Admin Onboarding
1. Profile setup (photo, contact info)
2. Company entity creation
3. Team member invitations
4. Preferred lender selection
5. Configuration review

### Loan Officer Onboarding
1. Profile completion
2. License verification
3. AE connection
4. Preferred lenders
5. Tool access setup

### Lender Admin Setup
1. Lender profile creation
2. Program configuration
3. AE assignment
4. Document requirements
5. Integration setup

## Database Schema

```sql
-- Workflow definitions
CREATE TABLE workflows (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  triggers JSONB DEFAULT '[]',
  compiled_steps JSONB NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Workflow instances
CREATE TABLE workflow_instances (
  id UUID PRIMARY KEY,
  workflow_id UUID REFERENCES workflows(id),
  tenant_id UUID NOT NULL,
  user_id UUID,
  state JSONB NOT NULL,
  current_step TEXT,
  status TEXT CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Step execution logs
CREATE TABLE workflow_step_logs (
  id UUID PRIMARY KEY,
  instance_id UUID REFERENCES workflow_instances(id),
  step_id TEXT NOT NULL,
  status TEXT NOT NULL,
  inputs JSONB,
  outputs JSONB,
  error TEXT,
  executed_at TIMESTAMPTZ DEFAULT now()
);
```

## Testing

```bash
# Engine tests
npm test -- features/workflows/engine/__tests__/

# Template tests
npm test -- features/workflows/templates/__tests__/

# E2E workflow execution
npx cypress run --spec "cypress/e2e/workflow-*.cy.ts"
```

## Migration Notes

Workflows integrate with account management tools:
- `profile-update`: User profile management
- `manage-entities`: Entity CRUD operations
- `manage-ae-connections`: AE relationships
- `manage-preferred-lenders`: Lender preferences
- `create-tenant`: Tenant creation
- `manage-tenant-users`: User management
- `invite-team-members`: Team invitations