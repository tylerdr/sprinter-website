/**
 * UI Registry - Maps tool results to custom React components
 * Provides fallback rendering for tools without custom UI
 */

import React from "react";
import { Card } from "@/components/ui/card";

// Tool result component props
export interface ToolResultProps {
  state: "loading" | "input" | "output" | "error";
  part: any; // Tool part from AI SDK
  addToolResult?: (args: { 
    tool: string; 
    toolCallId: string; 
    output: unknown 
  }) => void;
}

/**
 * Example custom tool result component for KB search
 */
const KBSearchResult: React.FC<ToolResultProps> = ({ state, part }) => {
  if (state === "loading") {
    return (
      <Card className="p-3 bg-blue-500/5">
        <div className="animate-pulse">Searching knowledge base...</div>
      </Card>
    );
  }

  if (state === "output" && part.output?.results) {
    return (
      <Card className="p-3 bg-green-500/5 border-green-500/20">
        <div className="font-medium mb-2">Search Results</div>
        <div className="space-y-2">
          {part.output.results.map((result: any) => (
            <a
              key={result.id}
              href={result.url}
              className="block p-2 rounded hover:bg-muted transition-colors"
            >
              <div className="font-medium text-sm">{result.title}</div>
              {result.snippet && (
                <div className="text-xs text-muted-foreground mt-1">
                  {result.snippet}
                </div>
              )}
            </a>
          ))}
        </div>
      </Card>
    );
  }

  return null;
};

/**
 * AP Calculator result component
 */
const APCalculatorResult: React.FC<ToolResultProps> = ({ state, part }) => {
  if (state === "output" && part.output) {
    const { annualSavings, touchlessRate, roiMonths } = part.output;
    
    return (
      <Card className="p-4 bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-500/20">
        <div className="font-medium mb-3">AP Automation Savings</div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-500">
              ${(annualSavings / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground">Annual Savings</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">
              {(touchlessRate * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">Touchless Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-500">
              {roiMonths}mo
            </div>
            <div className="text-xs text-muted-foreground">ROI Timeline</div>
          </div>
        </div>
      </Card>
    );
  }

  return null;
};

/**
 * UI Registry singleton
 * Maps tool keys to custom result components
 */
export const uiRegistry = {
  tools: {
    results: {
      // Map tool keys to custom components
      "kb_search": KBSearchResult,
      "ap_calculator": APCalculatorResult,
      
      // Default fallback renderer
      "__fallback__": ({ state, part }: ToolResultProps) => (
        <Card className="p-3 bg-muted/50">
          <div className="text-sm font-medium mb-1">
            Tool: {(part as any).toolName ?? (part as any).type}
          </div>
          <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
            {JSON.stringify(part, null, 2)}
          </pre>
        </Card>
      ),
    } as Record<string, React.FC<ToolResultProps>>,
    
    // Tool input forms could be registered here
    inputs: {} as Record<string, React.FC<any>>,
  },
  
  // Entity renderers
  entities: {
    list: {} as Record<string, React.FC<any>>,
    detail: {} as Record<string, React.FC<any>>,
    form: {} as Record<string, React.FC<any>>,
  },
  
  // View components
  views: {
    blocks: {} as Record<string, React.FC<any>>,
  },
};

/**
 * Register a custom tool result component
 */
export function registerToolResult(
  toolKey: string, 
  component: React.FC<ToolResultProps>
) {
  uiRegistry.tools.results[toolKey] = component;
}

/**
 * Get tool result component or fallback
 */
export function getToolResultComponent(toolKey: string): React.FC<ToolResultProps> {
  return uiRegistry.tools.results[toolKey] ?? uiRegistry.tools.results["__fallback__"];
}