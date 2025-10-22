# JavaScript Console Errors Fix Guide

## Current Issues

### 🚨 Error Summary
**Evidence:** Red notification showing "2-3 issues" in bottom-left corner across multiple pages
**Impact:** Affects user experience and may prevent features from working

---

## Common JavaScript Errors to Check

### 1. Hydration Mismatches
**Common Cause:** Server and client render different content
**Locations to Check:**
- Dynamic content in components
- Date/time displays
- User-specific content
- Random values

**Fix Pattern:**
```typescript
// Bad - causes hydration mismatch
export function Component() {
  return <div>{Math.random()}</div>
}

// Good - consistent between server and client
export function Component() {
  const [randomValue, setRandomValue] = useState<number>();

  useEffect(() => {
    setRandomValue(Math.random());
  }, []);

  return <div>{randomValue ?? 'Loading...'}</div>
}
```

### 2. Missing Environment Variables
**Common Locations:**
- Supabase client initialization
- API routes
- Third-party service configs

**Fix:**
```typescript
// lib/supabase/client.ts
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}
```

### 3. Undefined Window/Document References
**Common in:**
- Animation libraries
- Analytics code
- Browser-only APIs

**Fix Pattern:**
```typescript
// Bad
const width = window.innerWidth;

// Good
const [width, setWidth] = useState<number>();

useEffect(() => {
  if (typeof window !== 'undefined') {
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }
}, []);
```

### 4. React Hooks Violations
**Common Issues:**
- Conditional hooks
- Hooks in loops
- Hooks outside components

**Fix Pattern:**
```typescript
// Bad
if (condition) {
  useState(); // Error!
}

// Good
const [state, setState] = useState();
if (condition) {
  setState(value);
}
```

### 5. Async Component Issues
**Problem:** Components can't be async directly
**Common in:** Data fetching components

**Fix Pattern:**
```typescript
// Bad
async function Component() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Good
function Component() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return <div>{data}</div>;
}
```

---

## Debugging Strategy

### 1. Enable Verbose Logging
```typescript
// app/layout.tsx
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    // Log all errors
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
    });

    // Log unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });
  }
}, []);
```

### 2. Add Error Boundary
```typescript
// components/ErrorBoundary.tsx
import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-red-700 font-semibold">Something went wrong</h2>
          <p className="text-red-600">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

### 3. Check React DevTools
```bash
# Install React DevTools browser extension
# Then check:
1. Components tab for errors
2. Profiler tab for performance issues
3. Console for React warnings
```

---

## Lab-Specific Errors

### Common Lab Page Issues
**Files to check:**
- `/app/labs/agent-simulator/page.tsx`
- `/app/labs/workflow-tool/page.tsx`
- `/app/labs/ideation/page.tsx`
- `/app/labs/sketch-studio/page.tsx`

**Common Problems:**
1. Canvas API usage without checks
2. WebGL context issues
3. Audio API permissions
4. WebSocket connections

**Fix Pattern for Canvas:**
```typescript
// components/labs/SketchCanvas.tsx
useEffect(() => {
  if (typeof window === 'undefined') return;

  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Failed to get canvas context');
    return;
  }

  // Canvas operations here
}, []);
```

---

## Animation Library Errors

### Framer Motion Issues
**Common Problems:**
- SSR incompatibility
- Missing AnimatePresence
- Invalid variants

**Fixes:**
```typescript
// Disable SSR for animation-heavy components
const AnimatedComponent = dynamic(
  () => import('./AnimatedComponent'),
  { ssr: false }
);

// Wrap exit animations
<AnimatePresence mode="wait">
  {isVisible && <motion.div key="unique" exit={{ opacity: 0 }} />}
</AnimatePresence>

// Fix variant errors
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 } // Ensure all properties match
};
```

### React Bits Components
**Check for:**
- Missing CSS imports
- Incorrect installation
- Version conflicts

**Fix:**
```typescript
// Ensure globals.css has required styles
@import '@/components/hyperspeed/styles.css';
@import '@/components/blur-text/styles.css';

// Check component imports
import HyperSpeed from '@/components/hyperspeed';
// NOT from '@/components/HyperSpeed' (case sensitive)
```

---

## Performance-Related Errors

### Memory Leaks
**Common in:**
- Event listeners
- Timers/intervals
- Subscriptions

**Fix Pattern:**
```typescript
useEffect(() => {
  const timer = setInterval(() => {
    // Do something
  }, 1000);

  // Cleanup function
  return () => clearInterval(timer);
}, []);
```

### Infinite Loops
**Common Causes:**
- Missing dependency arrays
- State updates in render

**Fix:**
```typescript
// Bad - infinite loop
useEffect(() => {
  setState(value); // This triggers re-render
}); // No dependency array!

// Good
useEffect(() => {
  setState(value);
}, []); // Empty array = run once
```

---

## Testing & Validation

### 1. Run Type Check
```bash
npm run typecheck
# or
npx tsc --noEmit
```

### 2. Run Linter
```bash
npm run lint
# Fix automatically
npm run lint -- --fix
```

### 3. Check Bundle Size
```bash
# Analyze bundle
npx next build
npx next-bundle-analyzer
```

### 4. Browser Console Checks
```javascript
// Run in browser console
// Check for errors
console.clear();
// Navigate through site
// Look for red error messages
```

---

## Quick Fix Script

Create a diagnostic script to find all errors:

```typescript
// scripts/diagnose-errors.js
const { execSync } = require('child_process');

console.log('🔍 Checking for TypeScript errors...');
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ No TypeScript errors');
} catch (e) {
  console.log('❌ TypeScript errors found');
}

console.log('\n🔍 Checking for ESLint errors...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ No ESLint errors');
} catch (e) {
  console.log('❌ ESLint errors found');
}

console.log('\n🔍 Checking for missing env vars...');
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'RESEND_API_KEY'
];

requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar} is set`);
  } else {
    console.log(`❌ ${envVar} is missing`);
  }
});

// Run with: node scripts/diagnose-errors.js
```

---

## Prevention Strategies

### 1. Pre-commit Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run typecheck && npm run lint"
    }
  }
}
```

### 2. CI/CD Checks
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
```

### 3. Error Monitoring
```typescript
// Install Sentry or similar
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

---

## Success Metrics

- ✅ Zero console errors in production
- ✅ All TypeScript checks pass
- ✅ All ESLint rules pass
- ✅ No hydration warnings
- ✅ Clean browser console
- ✅ Error boundary catches edge cases
- ✅ Performance monitoring active