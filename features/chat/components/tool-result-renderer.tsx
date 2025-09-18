"use client";

// Don't import tool implementations in client components
// import { TOOL_IMPORTS } from "@/features/tools/registry";
import { useEffect, useState } from "react";
import { TOOL_UI_IMPORTS } from "@/features/tools/ui-registry";
import { Tool, ToolContent, ToolHeader } from "@/components/ai-elements/tool";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// AI SDK v5 tool states
export type ToolState =
  | "input-streaming" // Tool call is being generated
  | "input-available" // Tool input is ready, execution pending
  | "output-available" // Tool execution completed successfully
  | "output-error"; // Tool execution failed

interface ToolResultProps {
  toolName: string;
  toolSlug: string;
  result: any;
  input?: any; // Tool input parameters
  errorText?: string; // Error message for output-error state
  toolCallId?: string; // Unique identifier for this tool call
  state?: ToolState;
}

function toHumanReadableToolName(nameOrSlug?: string) {
  if (!nameOrSlug) return "Tool";
  const raw = String(nameOrSlug);
  // If it contains hyphens/underscores, split and capitalize
  if (raw.includes("-") || raw.includes("_")) {
    return raw
      .split(/[\-_]+/)
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  // If camelCase or PascalCase, split before capitals
  if (/^[a-zA-Z]+$/.test(raw) && /[A-Z]/.test(raw)) {
    return raw
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/^\w/, c => c.toUpperCase());
  }
  // Otherwise title-case the string
  return raw
    .split(/\s+/)
    .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/**
 * Extract the total number of results from tool output
 * Handles multiple common patterns used across different tools
 */
function getResultCount(result: any): number | null {
  if (!result) return null;

  // Extract the data (handle both wrapped and unwrapped results)
  const data = result.data ?? result;

  // Pattern A: totalCount (unified-search, agency-guide-search)
  if (typeof data.totalCount === "number") {
    return data.totalCount;
  }

  // Pattern B: totalResults (guideline tools: USDA, VA, FHA)
  if (typeof data.totalResults === "number") {
    return data.totalResults;
  }

  // Pattern C: results array length
  if (Array.isArray(data.results)) {
    return data.results.length;
  }

  // Pattern D: sources array length (from SprinterToolResult)
  if (Array.isArray(result.sources)) {
    return result.sources.length;
  }

  // Pattern D: sources in data
  if (Array.isArray(data.sources)) {
    return data.sources.length;
  }

  return null;
}

/**
 * Renders tool results in the chat interface using the tool's own UI components
 * Follows AI SDK v5 best practices for tool state handling
 */
export function ToolResultRenderer({
  toolName,
  toolSlug,
  result,
  input,
  errorText,
  toolCallId,
  state = "output-available"
}: ToolResultProps) {
  const [ResultComponent, setResultComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [ErrorComponent, setErrorComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [LoadingComponent, setLoadingComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [loading, setLoading] = useState(true);

  const displayLabel = toHumanReadableToolName(toolName || toolSlug);
  const toolClassName =
    "bg-transparent border-none border-l-0 shadow-none mb-2 sm:mb-3 w-full";
  const headerClassName =
    "flex items-center justify-between gap-1 sm:gap-2 text-muted-foreground w-full px-2 py-1 sm:py-1.5 rounded-md transition-colors hover:bg-muted/60";

  useEffect(() => {
    // Handle empty or undefined results
    if (
      !result ||
      (typeof result === "object" && Object.keys(result).length === 0)
    ) {
      // Silently handle empty results
      setLoading(false);
      return;
    }

    // Load the tool's UI component(s) dynamically via flat registry
    const loadToolUI = async () => {
      try {
        const importer = TOOL_UI_IMPORTS[toolSlug];
        if (importer) {
          try {
            const uiModule = await importer();
            const ui = uiModule?.default || uiModule;
            if (ui) {
              if (ui.Result) setResultComponent(() => ui.Result);
              if (ui.Error) setErrorComponent(() => ui.Error);
              if (ui.Loading) setLoadingComponent(() => ui.Loading);
            }
          } catch (uiError) {
            // Silently handle UI loading failures
            console.warn(`Failed to load UI for ${toolSlug}:`, uiError);
          }
        } else {
          // No UI importer - will use fallback
        }
      } catch (error) {
        // Silently handle errors
        // console.error(`Error loading tool UI for ${toolSlug}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadToolUI();
  }, [toolSlug, result]);

  // For input-streaming and input-available states, we may not have results yet
  const isInputState =
    state === "input-streaming" || state === "input-available";

  // Only skip rendering if we have no data at all (neither input nor result)
  if (!isInputState && !result && !errorText) {
    return null;
  }

  // Determine if we have an error based on state or result
  const hasError =
    state === "output-error" ||
    Boolean(
      errorText || (result && (result.error || result.success === false))
    );

  // Use provided state or infer from data
  const effectiveState: ToolState =
    state || (hasError ? "output-error" : "output-available");

  // Handle error state with custom or fallback UI
  if (effectiveState === "output-error") {
    const message =
      errorText ||
      (typeof result?.error === "string"
        ? result.error
        : "An error occurred executing the tool");

    return (
      <Tool className={toolClassName}>
        <ToolHeader
          type={`tool-${toolSlug}` as `tool-${string}`}
          state={effectiveState}
          className={headerClassName}
        />
        <ToolContent className="px-2">
          {ErrorComponent && !loading ? (
            <ErrorComponent message={message} />
          ) : (
            <div className="text-xs sm:text-sm text-destructive break-words whitespace-pre-wrap">
              Error: {message}
            </div>
          )}
        </ToolContent>
      </Tool>
    );
  }

  // Handle input streaming/available states
  if (
    effectiveState === "input-streaming" ||
    effectiveState === "input-available"
  ) {
    return (
      <Tool className={toolClassName}>
        <ToolHeader
          type={`tool-${toolSlug}` as `tool-${string}`}
          state={effectiveState}
          className={headerClassName}
        />
        <ToolContent className="px-2">
          {LoadingComponent && !loading ? (
            <LoadingComponent />
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-xs sm:text-sm">
                  {effectiveState === "input-streaming"
                    ? `Preparing ${displayLabel}...`
                    : `Running ${displayLabel}...`}
                </span>
              </div>
              <div className="space-y-2 py-1">
                <Skeleton className="h-3 w-[92%]" />
                <Skeleton className="h-3 w-[85%]" />
                <div className="h-2" />
                <Skeleton className="h-3 w-[70%]" />
                <div className="h-2" />
                <Skeleton className="h-3 w-[88%]" />
                <Skeleton className="h-3 w-[62%]" />
                <Skeleton className="h-3 w-[52%]" />
              </div>
              {input && (
                <div className="mt-1 text[11px] sm:text-xs text-muted-foreground">
                  <details>
                    <summary className="cursor-pointer">
                      Input parameters
                    </summary>
                    <pre className="mt-1 bg-muted p-2 rounded overflow-auto max-h-48 text-[10px] sm:text-xs">
                      {JSON.stringify(input, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          )}
        </ToolContent>
      </Tool>
    );
  }

  // Handle output-available state with custom or fallback UI
  if (effectiveState === "output-available" && result) {
    // Extract sources if they exist in the standardized format
    const data = (result as any).data ?? result;
    const resultCount = getResultCount(result);

    return (
      <Tool className={toolClassName}>
        <ToolHeader
          type={`tool-${toolSlug}` as `tool-${string}`}
          state={effectiveState}
          className={headerClassName}
        />
        {ResultComponent && !loading ? (
          <ToolContent className="p-0">
            <ResultComponent data={result} />
          </ToolContent>
        ) : (
          <ToolContent className="px-2">
            <div className="space-y-2">
              {typeof data === "string" ? (
                <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed break-words text-muted-foreground/90 max-w-full p-1 pb-2">
                  {data}
                </p>
              ) : (
                <pre className="text-xs sm:text-sm leading-relaxed break-words text-muted-foreground/90 max-w-full p-1 pb-2 bg-muted rounded overflow-auto max-h-96">
                  {JSON.stringify(data, null, 2)}
                </pre>
              )}
            </div>
          </ToolContent>
        )}
      </Tool>
    );
  }

  // Default fallback - shouldn't reach here with proper state handling
  return (
    <Tool className={toolClassName}>
      <ToolHeader
        type={`tool-${toolSlug}` as `tool-${string}`}
        state={state || "output-available"}
        className={headerClassName}
      />
      <ToolContent className="px-2">
        <div className="text-xs sm:text-sm text-muted-foreground break-words whitespace-pre-wrap">
          Tool: {displayLabel} (State: {state})
        </div>
      </ToolContent>
    </Tool>
  );
}
