"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Copy,
  RefreshCw,
  Wand2,
  Eye,
  CheckCircle,
  Moon,
  Sun,
  Bell,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface ComponentData {
  name: string;
  code: string;
  keywords: string[];
}

const preBuiltComponents: ComponentData[] = [
  {
    name: "PricingCard",
    keywords: ["pricing", "card", "plan", "subscription", "price", "gradient", "border"],
    code: `function PricingCard() {
  return (
    <div className="relative p-6 rounded-xl bg-card/5 border border-border/10 hover:border-brand/30 transition-all duration-300 group">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Pro Plan</h3>
          <span className="px-2 py-1 text-xs bg-brand/20 text-brand rounded-full">Popular</span>
        </div>
        <div className="mb-4">
          <span className="text-3xl font-bold">$29</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2 mb-6 text-sm">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            <span>Unlimited projects</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            <span>Priority support</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            <span>Advanced analytics</span>
          </li>
        </ul>
        <button className="w-full py-2 px-4 bg-brand-gradient text-white rounded-lg hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </div>
    </div>
  );
}`
  },
  {
    name: "DarkModeToggle",
    keywords: ["dark", "mode", "toggle", "theme", "switch", "moon", "sun"],
    code: `function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={\`
        relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2
        \\\${isDark ? 'bg-brand' : 'bg-muted'}
      \`}
    >
      <span
        className={\`
          inline-block w-4 h-4 transform bg-white rounded-full transition-transform
          \\\${isDark ? 'translate-x-6' : 'translate-x-1'}
        \`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-brand m-0.5" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500 m-0.5" />
        )}
      </span>
    </button>
  );
}`
  },
  {
    name: "NotificationBadge",
    keywords: ["notification", "badge", "count", "bell", "alert", "indicator"],
    code: `function NotificationBadge() {
  const [count, setCount] = useState(3);
  
  return (
    <div className="relative inline-block">
      <button className="p-2 rounded-lg bg-card/10 hover:bg-card/20 transition-colors">
        <Bell className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>
    </div>
  );
}`
  },
  {
    name: "ProgressStepper",
    keywords: ["progress", "stepper", "step", "wizard", "flow", "stage"],
    code: `function ProgressStepper() {
  const [currentStep, setCurrentStep] = useState(2);
  const steps = ['Setup', 'Configure', 'Deploy', 'Complete'];
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={\\\`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                \${index < currentStep 
                  ? 'bg-success text-white' 
                  : index === currentStep 
                  ? 'bg-brand text-white' 
                  : 'bg-muted text-muted-foreground'
                }
              \\\`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={\\\`
                  w-12 h-0.5 mx-2
                  \${index < currentStep ? 'bg-success' : 'bg-muted'}
                \\\`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm">
        {steps.map((step, index) => (
          <span
            key={step}
            className={index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}`
  },
  {
    name: "MetricCard",
    keywords: ["metric", "stat", "analytics", "dashboard", "kpi", "chart", "trending"],
    code: `function MetricCard() {
  return (
    <div className="p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
        <TrendingUp className="w-4 h-4 text-success" />
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold">$24,580</span>
        <span className="text-sm text-success font-medium">+12%</span>
      </div>
      <div className="mt-4 flex items-center gap-1">
        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-success to-brand rounded-full" />
        </div>
        <span className="text-xs text-muted-foreground">75%</span>
      </div>
    </div>
  );
}`
  }
];

const samplePrompts = [
  "a dark mode toggle with smooth animation",
  "notification badge with count indicator",
  "progress stepper with 4 steps",
  "modern pricing card with gradient border",
  "metric card showing revenue with chart"
];

export default function ComponentStudio() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedComponent, setGeneratedComponent] = useState<ComponentData | null>(null);
  const [copied, setCopied] = useState(false);

  const findMatchingComponent = (input: string): ComponentData | null => {
    const inputLower = input.toLowerCase();
    
    // Find the component with the most keyword matches
    let bestMatch: ComponentData | null = null;
    let bestScore = 0;
    
    for (const component of preBuiltComponents) {
      const score = component.keywords.reduce((acc, keyword) => {
        return acc + (inputLower.includes(keyword) ? 1 : 0);
      }, 0);
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = component;
      }
    }
    
    return bestScore > 0 ? bestMatch : preBuiltComponents[0]; // Default to first component
  };

  const generateComponent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const matchedComponent = findMatchingComponent(prompt);
    setGeneratedComponent(matchedComponent);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    if (!generatedComponent) return;
    
    await navigator.clipboard.writeText(generatedComponent.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const refineComponent = async () => {
    if (!generatedComponent) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate refinement by picking a different component
    const otherComponents = preBuiltComponents.filter(c => c.name !== generatedComponent.name);
    const refinedComponent = otherComponents[Math.floor(Math.random() * otherComponents.length)];
    setGeneratedComponent(refinedComponent);
    setIsGenerating(false);
  };

  // Move state hooks to the main component
  const [currentStep] = useState(2);
  const [isDark, setIsDark] = useState(false);
  const [count] = useState(3);

  const renderComponent = (componentName: string) => {

    switch (componentName) {
      case "PricingCard":
        return (
          <div className="relative p-6 rounded-xl bg-card/5 border border-border/10 hover:border-brand/30 transition-all duration-300 group">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Pro Plan</h3>
                <span className="px-2 py-1 text-xs bg-brand/20 text-brand rounded-full">Popular</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <button className="w-full py-2 px-4 bg-brand-gradient text-white rounded-lg hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>
          </div>
        );
      
      case "DarkModeToggle":
        return (
          <button
            onClick={() => setIsDark(!isDark)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 ${isDark ? 'bg-brand' : 'bg-muted'}`}
          >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`}>
              {isDark ? (
                <Moon className="w-3 h-3 text-brand m-0.5" />
              ) : (
                <Sun className="w-3 h-3 text-yellow-500 m-0.5" />
              )}
            </span>
          </button>
        );
      
      case "NotificationBadge":
        return (
          <div className="relative inline-block">
            <button className="p-2 rounded-lg bg-card/10 hover:bg-card/20 transition-colors">
              <Bell className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
          </div>
        );
      
      case "ProgressStepper":
        const steps = ['Setup', 'Configure', 'Deploy', 'Complete'];
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${index < currentStep ? 'bg-success text-white' : index === currentStep ? 'bg-brand text-white' : 'bg-muted text-muted-foreground'}`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${index < currentStep ? 'bg-success' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              {steps.map((step, index) => (
                <span key={step} className={index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}>
                  {step}
                </span>
              ))}
            </div>
          </div>
        );
      
      case "MetricCard":
        return (
          <div className="p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold">$24,580</span>
              <span className="text-sm text-success font-medium">+12%</span>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-success to-brand rounded-full" />
              </div>
              <span className="text-xs text-muted-foreground">75%</span>
            </div>
          </div>
        );
      
      default:
        return <div className="p-4 rounded-lg bg-muted/10 text-muted-foreground">Component preview</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Input Section */}
      <div className="mb-8 p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Describe your component
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a modern pricing card with gradient border"
            className="w-full px-4 py-3 rounded-lg bg-card/10 border border-border/20 focus:border-accent focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && generateComponent()}
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={generateComponent}
            disabled={isGenerating || !prompt.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Component
              </>
            )}
          </button>

          {generatedComponent && (
            <button
              onClick={refineComponent}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-card/10 text-foreground font-medium rounded-lg hover:bg-card/20 disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" />
              Refine
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Try:</span>
          {samplePrompts.map((sample, index) => (
            <button
              key={index}
              onClick={() => setPrompt(sample)}
              className="px-3 py-1 text-xs bg-muted/20 hover:bg-muted/30 rounded-full transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {generatedComponent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Code Panel */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Generated Code
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1 bg-card/10 hover:bg-card/20 rounded-lg text-sm transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-success" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              
              <div className="relative">
                <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 text-sm overflow-x-auto border border-border/10">
                  <code className="language-tsx">
                    {generatedComponent.code}
                  </code>
                </pre>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </h3>
              
              <div className="p-8 rounded-lg bg-card/5 border border-border/10 backdrop-blur-sm min-h-[300px] flex items-center justify-center">
                {renderComponent(generatedComponent.name)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!generatedComponent && (
        <div className="text-center py-16">
          <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Ready to generate</h3>
          <p className="text-muted-foreground">
            Describe your component above to see it come to life
          </p>
        </div>
      )}
    </div>
  );
}