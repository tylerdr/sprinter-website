"use client";

import { useState, useEffect, useCallback } from "react";
import { JsonSchemaForm } from "../json-schema-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { SprinterToolSpec } from "@/features/tools/types";
import { ToolShareButton } from "../tool-share-button";
import { ToolExportButton } from "../tool-export-button";

interface StandaloneToolContainerProps {
  tool: SprinterToolSpec & {
    requiresAuth?: boolean;
  };
  /** If true, execute via API POST /api/tools/execute; otherwise call tool.execute directly (for demos/tests) */
  executeViaAPI?: boolean;
  /** Optional UI components for the tool */
  UIComponents?: {
    Result?: React.ComponentType<any>;
    InputForm?: React.ComponentType<any>;
    Loading?: React.ComponentType<any>;
    Error?: React.ComponentType<any>;
  };
  generatedByName?: string | null;
  generatedByEmail?: string | null;
}

export function StandaloneToolContainer({
  tool,
  executeViaAPI = true,
  UIComponents: providedUI,
  generatedByName,
  generatedByEmail
}: StandaloneToolContainerProps) {
  const [inputData, setInputData] = useState<any>({});
  const [outputData, setOutputData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRunInput, setLastRunInput] = useState<any>(null);
  const [shareUrl, setShareUrl] = useState<string | undefined>(undefined);
  const [UIComponents, setUIComponents] = useState<{
    Result?: React.ComponentType<any>;
    InputForm?: React.ComponentType<any>;
    Loading?: React.ComponentType<any>;
    Error?: React.ComponentType<any>;
  }>(providedUI || {});
  // UI must be injected via props or rendered via JsonSchemaForm fallback.
  useEffect(() => {
    if (providedUI) {
      setUIComponents(providedUI);
    }
  }, [providedUI]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleSubmit = useCallback(
    async (formData?: any) => {
      const dataToSubmit = formData || inputData;
      setInputData(dataToSubmit);
      setLastRunInput(dataToSubmit);
      setIsLoading(true);
      setOutputData(null);

      try {
        let result;

        if (executeViaAPI) {
          const response = await fetch("/api/tools/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug: tool.slug,
              input: dataToSubmit
            })
          });

          const json = await response.json();

          if (!response.ok || json.error) {
            throw new Error(json.error || "Execution failed");
          }

          result = json.data || json.result || json;
        } else {
          // Direct execution for testing
          result = await tool.execute(dataToSubmit);
        }

        setOutputData(result);
        toast.success("Tool executed successfully!");
      } catch (error: any) {
        console.error("Tool execution error:", error);
        const errorMessage = error?.message || "Failed to execute tool";
        toast.error(errorMessage);

        if (UIComponents.Error) {
          setOutputData({ error: errorMessage });
        } else {
          setOutputData(null);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [executeViaAPI, tool, inputData, UIComponents.Error]
  );

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      {(tool.name || tool.description) && (
        <div className="mb-6">
          {tool.name && (
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{tool.name}</h2>
            </div>
          )}
          {tool.description && (
            <p className="text-muted-foreground">{tool.description}</p>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div>
          {UIComponents.InputForm ? (
            <UIComponents.InputForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          ) : tool.inputSchema ? (
            <JsonSchemaForm
              schema={tool.inputSchema}
              uiSchema={tool.inputSchema}
              onSubmit={handleSubmit}
              submitLabel="Execute"
              loading={isLoading}
            />
          ) : (
            <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
              <p>No input form available for this tool</p>
              <Button
                onClick={() => handleSubmit({})}
                disabled={isLoading}
                className="mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  "Run Tool"
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div>
          {outputData ? (
            outputData.error && UIComponents.Error ? (
              <UIComponents.Error message={outputData.error} />
            ) : (
              <div className="space-y-4" data-tool-result="panel">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Output
                  </h3>
                  <div className="flex items-center gap-2">
                    <ToolShareButton
                      slug={tool.slug}
                      toolName={tool.name}
                      input={lastRunInput ?? undefined}
                      output={outputData}
                      url={shareUrl}
                    />
                    <ToolExportButton
                      data={outputData}
                      filename={tool.slug}
                      title={tool.name ?? "Tool Result"}
                      generatedByName={generatedByName}
                      generatedByEmail={generatedByEmail}
                    />
                  </div>
                </div>
                <div data-tool-result="panel">
                  {UIComponents.Result ? (
                    <UIComponents.Result data={outputData} />
                  ) : (
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <pre className="text-sm overflow-auto whitespace-pre-wrap">
                        {typeof outputData === "string"
                          ? outputData
                          : JSON.stringify(outputData, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )
          ) : isLoading ? (
            UIComponents.Loading ? (
              <UIComponents.Loading />
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg p-12">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              </div>
            )
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg p-12">
              <div className="text-center text-muted-foreground">
                <p>Results will appear here</p>
                <p className="text-sm mt-2">
                  Fill in the form and click submit to see results
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StandaloneToolContainer;
