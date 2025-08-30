/**
 * ToolPartRenderer - Renders tool parts with registry-based UI
 * Falls back to generic viewer if no custom UI is registered
 */

"use client";

import type { UIMessagePart } from "ai";
import { uiRegistry } from "@/lib/ui-registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

type Props = {
  part: UIMessagePart<any, any>;
  addToolResult: (args: { 
    tool: string; 
    toolCallId: string; 
    output: unknown 
  }) => void;
};

/**
 * Extract tool name from typed part ("tool-<key>") or dynamic tool
 */
function extractToolKey(part: UIMessagePart<any, any>): string | null {
  if (part.type.startsWith("tool-")) {
    return part.type.slice("tool-".length);
  }
  if (part.type === "dynamic-tool") {
    return (part as any).toolName ?? null;
  }
  return null;
}

/**
 * Render tool parts via registered UI or fallback
 */
export function ToolPartRenderer({ part, addToolResult }: Props) {
  const toolKey = extractToolKey(part);

  // Non-tool parts (text, step-start, etc)
  if (!toolKey) {
    if (part.type === "text") {
      return <span>{(part as any).text}</span>;
    }
    if (part.type === "step-start") {
      return <hr className="my-2 opacity-40" />;
    }
    return null;
  }

  // Get custom renderer or fallback
  const Comp = uiRegistry.tools.results[toolKey] ?? FallbackToolRenderer;

  // Tool parts have states in v5
  const state = (part as any).state;
  
  return <Comp part={part} state={state} addToolResult={addToolResult} />;
}

/**
 * Fallback renderer for tools without custom UI
 */
function FallbackToolRenderer({ 
  part, 
  state,
  addToolResult 
}: { 
  part: any; 
  state: string;
  addToolResult: Props["addToolResult"];
}) {
  const toolName = part.toolName ?? part.type;
  
  switch (state) {
    case "input-streaming":
      return (
        <Card className="p-3 bg-muted/50">
          <div className="flex items-center gap-2 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="font-medium">Calling {toolName}...</span>
          </div>
        </Card>
      );

    case "input-available":
      // Interactive tool - user needs to provide input
      return (
        <Card className="p-3 border-orange-500/50">
          <div className="space-y-2">
            <div className="text-sm font-medium">
              Tool requires input: {toolName}
            </div>
            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
              {JSON.stringify(part.input, null, 2)}
            </pre>
            <Button
              size="sm"
              onClick={() => {
                // For demo, auto-approve with mock result
                addToolResult({
                  tool: toolName,
                  toolCallId: part.toolCallId,
                  output: { approved: true, result: "Mock result" },
                });
              }}
            >
              Approve & Continue
            </Button>
          </div>
        </Card>
      );

    case "output-available":
      return (
        <Card className="p-3 bg-green-500/5 border-green-500/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">{toolName}</span>
            </div>
            {part.output && (
              <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                {typeof part.output === "string" 
                  ? part.output 
                  : JSON.stringify(part.output, null, 2)}
              </pre>
            )}
          </div>
        </Card>
      );

    case "output-error":
      return (
        <Card className="p-3 bg-red-500/5 border-red-500/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="font-medium">Error: {toolName}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {part.error?.message ?? "Unknown error"}
            </div>
          </div>
        </Card>
      );

    default:
      return (
        <Card className="p-3 text-sm text-muted-foreground">
          Unknown tool state: {state}
        </Card>
      );
  }
}