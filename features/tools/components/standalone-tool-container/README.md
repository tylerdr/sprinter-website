# StandaloneToolContainer Component

A production-ready React component for executing tools with integrated UI, form generation, and state management. This component provides a complete standalone interface for tool execution with automatic form generation from schemas and custom UI component support.

## Features
- ✨ **Two-column responsive layout** - Input on left, output on right
- 🎨 **Custom UI components** - Support for Result, Loading, Error, and InputForm components
- 📝 **Automatic form generation** - JsonSchemaForm integration for schema-based tools
- 🤖 **AI-powered badge** - Visual indicator for AI-enabled tools
- 🔔 **Toast notifications** - Success/error feedback using Sonner
- ⚡ **Loading states** - Animated indicators during execution
- 📱 **Mobile-friendly** - Responsive grid layout
- 🛡️ **Type-safe** - Full TypeScript support with enhanced type definitions
- 🎯 **Smart fallbacks** - Graceful degradation for missing UI components

## Installation

```bash
# This component is part of the features/tools module
# Import directly from the components directory
```

## Quick Start

```typescript
import { StandaloneToolContainer } from '@/features/tools/components/standalone-tool-container';

// Basic usage
<StandaloneToolContainer 
  tool={myTool}
  executeViaAPI={true}
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tool` | `SprinterToolSpec & ToolMetadata` | Required | Tool specification with optional metadata |
| `executeViaAPI` | `boolean` | `true` | Execute via API endpoint or directly |
| `UIComponents` | `UIComponentSet` | `undefined` | Custom UI components for rendering |

### Type Definitions

```typescript
interface StandaloneToolContainerProps {
  tool: SprinterToolSpec & {
    name?: string;           // Display name for the tool
    description?: string;    // Tool description
    aiEnabled?: boolean;     // Show AI-powered badge
    requiresAuth?: boolean;  // Requires authentication
    inputSchema?: any;       // JSON Schema for input form
  };
  executeViaAPI?: boolean;
  UIComponents?: {
    Result?: React.ComponentType<{ data: any }>;
    InputForm?: React.ComponentType<{ onSubmit: Function; isLoading: boolean }>;
    Loading?: React.ComponentType<{}>;
    Error?: React.ComponentType<{ message: string }>;
  };
}
```

## Usage Examples

### Basic Implementation

```typescript
import { StandaloneToolContainer } from '@/features/tools/components/standalone-tool-container';

function MyToolPage() {
  const tool = {
    slug: 'my-tool',
    name: 'My Tool',
    description: 'A sample tool',
    execute: async (input) => {
      // Tool execution logic
      return { result: 'success' };
    }
  };

  return <StandaloneToolContainer tool={tool} />;
}
```

### With Custom UI Components

```typescript
const CustomResult = ({ data }) => (
  <div className="custom-result">
    <h3>Results</h3>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

const CustomLoading = () => (
  <div className="custom-loading">Processing...</div>
);

<StandaloneToolContainer 
  tool={myTool}
  UIComponents={{
    Result: CustomResult,
    Loading: CustomLoading
  }}
/>
```

### With JSON Schema Form

```typescript
const calculatorTool = {
  slug: 'calculator',
  name: 'Calculator',
  inputSchema: {
    type: 'object',
    properties: {
      a: { type: 'number', title: 'First Number' },
      b: { type: 'number', title: 'Second Number' },
      operation: {
        type: 'string',
        enum: ['add', 'subtract', 'multiply', 'divide'],
        enumNames: ['Add', 'Subtract', 'Multiply', 'Divide']
      }
    },
    required: ['a', 'b', 'operation']
  },
  execute: async ({ a, b, operation }) => {
    // Calculator logic
  }
};

<StandaloneToolContainer tool={calculatorTool} />
```

### Direct Execution Mode (Testing)

```typescript
// Bypasses API, executes tool.execute() directly
<StandaloneToolContainer 
  tool={myTool}
  executeViaAPI={false}
/>
```

## Layout Structure

The component renders in a two-column responsive grid:

```
┌─────────────────────────────────────┐
│         Tool Header                 │
│  [Name] [AI Badge] [Description]    │
├──────────────┬──────────────────────┤
│              │                      │
│    Input     │      Output          │
│    Form      │      Display         │
│              │                      │
│  [Submit]    │   [Results/Loading]  │
│              │                      │
└──────────────┴──────────────────────┘
```

## Styling

The component uses Tailwind CSS and shadcn/ui components. To customize styling:

1. **Override Tailwind classes** - Pass custom className props to UI components
2. **Theme variables** - Modify CSS variables in your global styles
3. **Custom components** - Provide your own UI components via `UIComponents` prop

## Error Handling

The component handles errors gracefully:

- Network errors display toast notifications
- Validation errors show inline messages
- Custom Error component support for branded error states
- Fallback to default error display when no Error component provided

## Performance Considerations

- **Lazy loading** - UI components can be dynamically imported
- **Memoization** - Use React.memo for custom UI components
- **Debouncing** - Consider debouncing input for real-time validation

## Testing

```typescript
import { StandaloneToolContainerDemo } from '@/features/tools/components';

// Render the demo component
<StandaloneToolContainerDemo />
```

The demo includes:
- Web Search tool with custom UI
- Calculator tool with schema-based form
- Tool switching functionality
- Direct execution examples

## Migration Guide

### From ToolExecutor

```typescript
// Old
import { ToolExecutor } from '@/features/tools/components';
<ToolExecutor tool={tool} />

// New
import { StandaloneToolContainer } from '@/features/tools/components/standalone-tool-container';
<StandaloneToolContainer tool={tool} />
```

Legacy alias available for backward compatibility:
```typescript
import { ToolExecutor } from '@/features/tools/components';
// This still works but is deprecated
```

## Contributing

When contributing to this component:

1. Maintain TypeScript strict mode compliance
2. Add JSDoc comments for public methods
3. Include unit tests for new features
4. Update this README with new examples
5. Follow the existing code style

## License

This component is part of the MortgageQ platform and follows the project's licensing terms.