"use client";

import { useEffect, useState } from "react";
import { TOOL_UI_IMPORTS } from "@/features/tools/ui-registry";

interface ToolRunResultViewerProps {
  toolSlug: string;
  data: any;
  type: "result" | "input";
}

export function ToolRunResultViewer({ toolSlug, data, type }: ToolRunResultViewerProps) {
  const [UI, setUI] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUI = async () => {
      try {
        setError(null);
        const importer = TOOL_UI_IMPORTS[toolSlug];
        if (importer) {
          const module = await importer();
          setUI(module.default || module);
        }
      } catch (err) {
        console.error("Failed to load UI for tool:", toolSlug, err);
        setError(`Failed to load UI components for ${toolSlug}.`);
      } finally {
        setIsLoading(false);
      }
    };

    if (toolSlug) {
      loadUI();
    }
  }, [toolSlug]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-24 bg-muted rounded-lg"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-16 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-muted-foreground">
        {error}
      </div>
    );
  }

  // For result type
  if (type === "result") {
    const Result = UI?.Result;
    if (Result) {
      return <Result data={data} />;
    }
  }

  // For input type - check if there's a dedicated Input display component
  if (type === "input") {
    // Some tools might have an InputDisplay component for read-only viewing
    const InputDisplay = UI?.InputDisplay;
    if (InputDisplay) {
      return <InputDisplay data={data} />;
    }

    // Otherwise, show a nicely formatted table of input values
    return (
      <div className="space-y-3">
        {Object.entries(data as Record<string, any>).map(([key, value]) => (
          <div
            key={key}
            className="grid grid-cols-3 gap-4 py-2 border-b last:border-0"
          >
            <div className="font-medium text-muted-foreground">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()).trim()}
            </div>
            <div className="col-span-2">
              {typeof value === "object" && value !== null ? (
                Array.isArray(value) ? (
                  <div className="space-y-1">
                    {value.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        {typeof item === "object" ? JSON.stringify(item) : String(item)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <pre className="text-sm bg-muted/50 rounded p-2 overflow-auto">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                )
              ) : (
                <span className="font-mono text-sm">
                  {value === null || value === undefined ? "—" : String(value)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Fallback to JSON display
  if (typeof data === "string") {
    return <p>{data}</p>;
  }

  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <pre className="text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}