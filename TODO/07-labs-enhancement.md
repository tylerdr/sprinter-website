# Labs Enhancement Guide

## Current Labs Status

### ✅ Working Labs (45+)
All labs are functional with good UI/UX, but have minor JavaScript console errors that need resolution.

### 🚨 Priority Fixes
1. Resolve 2-3 JavaScript console errors per lab
2. Add proper error boundaries
3. Implement loading states
4. Add usage analytics
5. Improve mobile experience

---

## Lab-Specific Improvements

### 1. Agent Simulator (`/labs/agent-simulator`)

**Current State:** Functional with mission input and simulation
**Improvements Needed:**
```typescript
// Add error handling for API calls
try {
  const response = await simulateAgents(mission);
  setResults(response);
} catch (error) {
  toast.error('Simulation failed. Please try again.');
  console.error('Agent simulation error:', error);
}

// Add progress tracking
<div className="w-full bg-gray-800 rounded-full h-2">
  <div
    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
    style={{ width: `${progress}%` }}
  />
</div>

// Add example templates
const exampleMissions = [
  'Create a customer service chatbot',
  'Analyze sales data for Q4',
  'Generate marketing content',
];
```

### 2. Workflow Tool (`/labs/workflow-tool`)

**Current State:** Process mapping with automation identification
**Improvements Needed:**
```typescript
// Add drag-and-drop functionality
import { DndContext, DragEndEvent } from '@dnd-kit/core';

function WorkflowDesigner() {
  const handleDragEnd = (event: DragEndEvent) => {
    // Reorder workflow steps
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Draggable workflow nodes */}
    </DndContext>
  );
}

// Add export functionality
const exportWorkflow = () => {
  const data = JSON.stringify(workflow, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'workflow.json';
  a.click();
};
```

### 3. Ideation Lab (`/labs/ideation`)

**Current State:** Four creative games
**Improvements Needed:**
```typescript
// Add multiplayer support
const socket = io('/ideation');

socket.on('player-joined', (player) => {
  setPlayers(prev => [...prev, player]);
});

socket.on('idea-submitted', (idea) => {
  setIdeas(prev => [...prev, idea]);
});

// Add scoring system
interface Score {
  player: string;
  points: number;
  ideas: number;
}

// Add timer functionality
const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(prev => Math.max(0, prev - 1));
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

### 4. Sketch Studio (`/labs/sketch-studio`)

**Current State:** Drawing canvas with AI transformation
**Improvements Needed:**
```typescript
// Add undo/redo functionality
const [history, setHistory] = useState<ImageData[]>([]);
const [historyIndex, setHistoryIndex] = useState(0);

const undo = () => {
  if (historyIndex > 0) {
    setHistoryIndex(prev => prev - 1);
    ctx.putImageData(history[historyIndex - 1], 0, 0);
  }
};

const redo = () => {
  if (historyIndex < history.length - 1) {
    setHistoryIndex(prev => prev + 1);
    ctx.putImageData(history[historyIndex + 1], 0, 0);
  }
};

// Add brush presets
const brushPresets = [
  { name: 'Pencil', size: 2, opacity: 1 },
  { name: 'Marker', size: 8, opacity: 0.8 },
  { name: 'Brush', size: 15, opacity: 0.6 },
  { name: 'Eraser', size: 20, opacity: 1, mode: 'destination-out' },
];

// Add layer support
interface Layer {
  id: string;
  name: string;
  canvas: HTMLCanvasElement;
  visible: boolean;
  opacity: number;
}
```

---

## Common Lab Enhancements

### 1. Usage Analytics
```typescript
// Track lab usage
const trackLabUsage = (labName: string, action: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'lab_interaction', {
      lab_name: labName,
      action: action,
      timestamp: new Date().toISOString(),
    });
  }
};

// Track feature usage
const trackFeature = (feature: string) => {
  fetch('/api/analytics/lab-usage', {
    method: 'POST',
    body: JSON.stringify({ lab, feature, timestamp: Date.now() }),
  });
};
```

### 2. Sharing Capabilities
```typescript
// Share results
const shareResults = async () => {
  const shareData = {
    title: `Check out my ${labName} results!`,
    text: `I just used ${labName} on Sprinter AI`,
    url: window.location.href,
  };

  if (navigator.share) {
    await navigator.share(shareData);
  } else {
    // Fallback to copy link
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  }
};

// Generate shareable link
const generateShareLink = () => {
  const params = new URLSearchParams({
    data: btoa(JSON.stringify(results)),
  });
  return `${window.location.origin}${window.location.pathname}?${params}`;
};
```

### 3. Tutorial System
```typescript
// components/LabTutorial.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialStep {
  target: string;
  title: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

export function LabTutorial({ steps }: { steps: TutorialStep[] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const step = steps[currentStep];

  return (
    <AnimatePresence>
      {isActive && step && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed z-50"
          style={getPositionStyle(step.target, step.placement)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4">
            <h3 className="font-bold mb-2">{step.title}</h3>
            <p className="text-sm mb-4">{step.content}</p>
            <div className="flex justify-between">
              <button onClick={() => setIsActive(false)}>Skip</button>
              <div className="space-x-2">
                {currentStep > 0 && (
                  <button onClick={() => setCurrentStep(prev => prev - 1)}>
                    Previous
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button onClick={() => setCurrentStep(prev => prev + 1)}>
                    Next
                  </button>
                ) : (
                  <button onClick={() => setIsActive(false)}>
                    Finish
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 4. Performance Monitoring
```typescript
// Monitor lab performance
const measureLabPerformance = () => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(`${entry.name}: ${entry.duration}ms`);

      // Send to analytics
      if (entry.duration > 1000) {
        console.warn(`Slow operation: ${entry.name}`);
      }
    });
  });

  observer.observe({ entryTypes: ['measure'] });

  // Measure specific operations
  performance.mark('ai-transform-start');
  // ... AI transformation
  performance.mark('ai-transform-end');
  performance.measure('ai-transform', 'ai-transform-start', 'ai-transform-end');
};
```

---

## Lab Categories Organization

### Portfolio Operations Labs
- Deal Flow Analyzer
- Portfolio AI Blueprint
- PE Tycoon Game
- Opportunity Audit

**Enhancement Focus:** Financial data visualization, Excel export, benchmarking

### Document Intelligence Labs
- PDF Chat
- PDF Extractor
- Document Intelligence
- Data Analyzer

**Enhancement Focus:** OCR capabilities, batch processing, template recognition

### Creative Tools
- Sketch Studio
- Music Studio
- Component Studio
- Storyboarding

**Enhancement Focus:** Asset library, collaboration features, version control

### Voice & Communication
- Voice Chat
- Voice to Process
- AI Telestrations

**Enhancement Focus:** Speech recognition accuracy, multi-language support

---

## Mobile Lab Optimizations

```typescript
// Responsive lab layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  {/* Controls on mobile top, desktop left */}
  <div className="order-2 lg:order-1">
    <LabControls />
  </div>

  {/* Canvas/output on mobile bottom, desktop right */}
  <div className="order-1 lg:order-2">
    <LabOutput />
  </div>
</div>

// Touch-optimized controls
<button
  className="min-h-[48px] px-6 py-3 text-lg touch-manipulation"
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
>
  Run Simulation
</button>
```

---

## Lab Testing Framework

```typescript
// __tests__/labs/agent-simulator.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AgentSimulator from '@/app/labs/agent-simulator/page';

describe('Agent Simulator Lab', () => {
  it('should load without errors', () => {
    render(<AgentSimulator />);
    expect(screen.getByText('Agent Simulator')).toBeInTheDocument();
  });

  it('should handle mission input', async () => {
    render(<AgentSimulator />);
    const input = screen.getByPlaceholderText('Enter mission');
    fireEvent.change(input, { target: { value: 'Test mission' } });

    const button = screen.getByText('Start Simulation');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Simulation in progress')).toBeInTheDocument();
    });
  });

  it('should display results', async () => {
    // Test result display
  });

  it('should handle errors gracefully', async () => {
    // Test error handling
  });
});
```

---

## Success Metrics

- ✅ Zero console errors in all labs
- ✅ All labs load in < 2 seconds
- ✅ Mobile-friendly interfaces
- ✅ Tutorial available for complex labs
- ✅ Analytics tracking implemented
- ✅ Share functionality working
- ✅ Error boundaries prevent crashes
- ✅ 90%+ user satisfaction score