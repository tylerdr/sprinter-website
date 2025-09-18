"use client";

import { useEffect, useState, useRef } from "react";
import {
  Loader2,
  PanelLeftClose,
  Undo2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TOOL_UI_IMPORTS } from "@/features/tools/ui-registry";
import { JsonSchemaForm } from "@/features/tools/components/json-schema-form";
import { useToolsContext } from "@/features/tools/components/tool-context-bridge";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";
import { ToolShareButton } from "./tool-share-button";
import { ToolExportButton } from "./tool-export-button";
import { ToolHistorySidebar } from "./tool-history-sidebar";

type RunAction = (
  values: unknown
) => Promise<{ ok: boolean; data?: unknown; error?: string; eventId?: string | null }>;

interface ToolClientRunnerProps {
  slug: string;
  toolName?: string;
  executionMode?: "server" | "client" | "interactive" | "hybrid";
  run: RunAction;
  inputSchemaJSON?: Record<string, any> | null;
  showEdit?: boolean;
  entityId?: string;
  onArtifactsCreated?: () => void;
  generatedByName?: string | null;
  generatedByEmail?: string | null;
}

export default function ToolClientRunner({
  slug,
  toolName,
  executionMode = "server",
  run,
  inputSchemaJSON,
  showEdit = true,
  entityId,
  onArtifactsCreated,
  generatedByName,
  generatedByEmail
}: ToolClientRunnerProps) {
  const [isUILoading, setUILoading] = useState(true);
  const [UI, setUI] = useState<any>(null);
  const [uiError, setUIError] = useState<string | null>(null);

  const [isRunning, setRunning] = useState(false);
  const [data, setData] = useState<unknown | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRunInput, setLastRunInput] = useState<unknown | null>(null);
  const [shareUrl, setShareUrl] = useState<string | undefined>(undefined);
  const [eventId, setEventId] = useState<string | null>(null);

  const [isInputCollapsed, setInputCollapsed] = useState(false);
  const [isOutputCollapsed, setOutputCollapsed] = useState(false);
  const inputPanelRef = useRef<ImperativePanelHandle>(null);
  const outputPanelRef = useRef<ImperativePanelHandle>(null);

  // Lazy-load UI components by slug
  useEffect(() => {
    const loadUI = async () => {
      try {
        setUIError(null);
        const importer = TOOL_UI_IMPORTS[slug];
        if (importer) {
          const module = await importer();
          setUI(module.default || module);
        }
      } catch (err) {
        console.error("Failed to load UI for tool:", slug, err);
        setUIError(
          `Failed to load UI components for ${slug}. Please try refreshing the page.`
        );
      } finally {
        setUILoading(false);
      }
    };

    loadUI();
  }, [slug]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const InputForm = UI?.InputForm;
  const Result = UI?.Result;
  const ErrorComp = UI?.Error;
  const LoadingComp = UI?.Loading;

  const handleLoadRun = (run: any) => {
    // Load the run's input and output
    if (run.input) {
      setLastRunInput(run.input);
    }
    if (run.output) {
      setData(run.output);
      setError(null);
      setEventId(run.id);

      // Expand output panel to show results
      try {
        if (outputPanelRef.current?.isCollapsed?.()) {
          outputPanelRef.current.resize(50);
          setOutputCollapsed(false);
        }
      } catch (err) {
        console.warn("Failed to resize panels:", err);
      }
    } else if (run.error) {
      setError(run.error);
      setData(null);
      setEventId(run.id);
    }
  };

  const handleSubmit = async (values: unknown) => {
    setRunning(true);
    setError(null);
    setData(null);
    setLastRunInput(values);

    try {
      if (typeof run !== "function") {
        throw new Error("Tool execution function not available");
      }

      const res = await run(values);

      if (res?.ok) {
        setData(res.data ?? null);
        setEventId(res.eventId ?? null);

        // Check if artifacts were created
        if (entityId && onArtifactsCreated) {
          // The server action will have created artifacts if tool returned them
          onArtifactsCreated();
        }

        // Automatically expand output panel when results are received
        try {
          if (outputPanelRef.current?.isCollapsed?.()) {
            outputPanelRef.current.resize(50);
            setOutputCollapsed(false);
            // Also ensure input panel is at 50%
            if (
              inputPanelRef.current &&
              !inputPanelRef.current.isCollapsed?.()
            ) {
              inputPanelRef.current.resize(50);
            }
          }
        } catch (panelErr) {
          console.warn("Failed to resize panels:", panelErr);
        }
      } else {
        const errorMessage =
          res?.error ??
          "Tool execution failed. Please check your input and try again.";
        setError(errorMessage);
        // Also expand output panel for errors
        try {
          if (outputPanelRef.current?.isCollapsed?.()) {
            outputPanelRef.current.resize(50);
            setOutputCollapsed(false);
            if (
              inputPanelRef.current &&
              !inputPanelRef.current.isCollapsed?.()
            ) {
              inputPanelRef.current.resize(50);
            }
          }
        } catch (panelErr) {
          console.warn("Failed to resize panels:", panelErr);
        }
      }
    } catch (e: any) {
      console.error("Tool execution error:", e);
      const errorMessage =
        e?.message || "An unexpected error occurred. Please try again.";
      setError(errorMessage);

      // Also expand output panel for errors
      try {
        if (outputPanelRef.current?.isCollapsed?.()) {
          outputPanelRef.current.resize(50);
          setOutputCollapsed(false);
          if (inputPanelRef.current && !inputPanelRef.current.isCollapsed?.()) {
            inputPanelRef.current.resize(50);
          }
        }
      } catch (panelErr) {
        console.warn("Failed to resize panels:", panelErr);
      }
    } finally {
      setRunning(false);
    }
  };

  if (isUILoading) {
    return (
      <div className="mt-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (uiError) {
    return (
      <div className="mt-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <h3 className="font-semibold text-destructive">
            Failed to Load Tool
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{uiError}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  // INTERACTIVE MODE: render the interactive view or custom InputForm full-width
  if (executionMode === "interactive") {
    const Interactive = UI?.Interactive || InputForm;
    if (!Interactive) {
      return (
        <div className="mt-6 text-sm text-muted-foreground">
          This tool is interactive but does not provide an interactive UI.
        </div>
      );
    }
    return (
      <div className="mt-6">
        <Interactive onSubmit={handleSubmit} isLoading={isRunning} />
      </div>
    );
  }

  const toggleInputPanel = () => {
    if (inputPanelRef.current) {
      if (inputPanelRef.current.isCollapsed()) {
        // When expanding input, make sure output is also expanded to 50%
        inputPanelRef.current.resize(50);
        setInputCollapsed(false);
        if (outputPanelRef.current && outputPanelRef.current.isCollapsed()) {
          outputPanelRef.current.resize(50);
          setOutputCollapsed(false);
        }
      } else {
        inputPanelRef.current.collapse();
      }
    }
  };

  // Removed unused toggleOutputPanel function

  // STANDARD MODE with resizable panels
  return (
    <div className="mt-6">
      {!(isInputCollapsed && isOutputCollapsed) && (
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[600px] rounded-lg"
        >
          {/* Input Panel */}
          <ResizablePanel
            ref={inputPanelRef}
            defaultSize={50}
            minSize={0}
            collapsible={true}
            collapsedSize={0}
            className="min-w-0"
            onCollapse={() => {
              setInputCollapsed(true);
            }}
            onExpand={() => setInputCollapsed(false)}
            style={{ display: isInputCollapsed ? "none" : undefined }}
          >
            <div className="relative flex h-full flex-col">
              {/* View Result button when output is collapsed */}
              {isOutputCollapsed && !isInputCollapsed && data != null ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-2 z-10"
                  onClick={() => {
                    // Expand both panels to 50/50
                    if (inputPanelRef.current) {
                      inputPanelRef.current.resize(50);
                      setInputCollapsed(false);
                    }
                    if (outputPanelRef.current) {
                      outputPanelRef.current.resize(50);
                      setOutputCollapsed(false);
                    }
                  }}
                >
                  View Result
                </Button>
              ) : data != null || error ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 z-10 h-6 w-6"
                  onClick={toggleInputPanel}
                >
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              ) : null}

              <div className="p-4 pb-2">
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Input
                </h3>
              </div>

              <div className="flex-1 overflow-auto px-4 pb-4">
                <div data-tool-input="form">
                  {InputForm ? (
                    <InputForm onSubmit={handleSubmit} isLoading={isRunning} ctx={useToolsContext()} />
                  ) : inputSchemaJSON ? (
                    <JsonSchemaForm
                      schema={inputSchemaJSON}
                      uiSchema={inputSchemaJSON}
                      onSubmit={handleSubmit}
                      submitLabel="Run"
                      loading={isRunning}
                    />
                  ) : (
                    <Card>
                      <CardContent className="py-6">
                        <div className="text-center text-muted-foreground">
                          <p>No input form configured for this tool.</p>
                          <Button
                            onClick={() => handleSubmit({})}
                            disabled={isRunning}
                            className="mt-4"
                          >
                            {isRunning ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Running...
                              </>
                            ) : (
                              "Run Tool"
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </ResizablePanel>

          {!isInputCollapsed && !isOutputCollapsed && (
            <ResizableHandle withHandle />
          )}

          {/* Output Panel */}
          <ResizablePanel
            ref={outputPanelRef}
            defaultSize={50}
            minSize={(data != null || error) ? 25 : 0}
            collapsible={true}
            collapsedSize={0}
            className="min-w-0"
            onCollapse={() => {
              setOutputCollapsed(true);
            }}
            onExpand={() => setOutputCollapsed(false)}
            style={{ display: isOutputCollapsed ? "none" : undefined }}
          >
            <div className="relative flex h-full flex-col">
              {/* Edit button shows on left when input is collapsed */}
              {isInputCollapsed && !isOutputCollapsed && (
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-2 top-2 z-10"
                  onClick={() => {
                    // Expand both panels to 50/50
                    if (inputPanelRef.current) {
                      inputPanelRef.current.resize(50);
                      setInputCollapsed(false);
                    }
                    if (outputPanelRef.current) {
                      outputPanelRef.current.resize(50);
                      setOutputCollapsed(false);
                    }
                  }}
                >
                  Edit
                </Button>
              )}

              <div className="p-4 pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Output
                  </h3>
                  <div className="flex items-center gap-2">
                    <ToolHistorySidebar
                      toolSlug={slug}
                      toolName={toolName}
                      currentRunId={eventId}
                      onLoadRun={handleLoadRun}
                    />
                    {data != null && (
                      <>
                        {eventId && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={`/tools/${slug}/runs/${eventId}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Run
                            </a>
                          </Button>
                        )}
                        <ToolShareButton
                          slug={slug}
                          toolName={toolName}
                          input={lastRunInput ?? undefined}
                          output={data}
                          url={shareUrl}
                        />
                        <ToolExportButton
                          data={data}
                          filename={slug}
                          title={toolName ?? "Tool Result"}
                          generatedByName={generatedByName}
                          generatedByEmail={generatedByEmail}
                          eventId={eventId ?? undefined}
                        />
                      </>
                    )}
                    {showEdit && data != null && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setData(null);
                          setError(null);
                          setLastRunInput(null);
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground -my-1 gap-1"
                      >
                        <Undo2 className="h-4 w-4" />
                        Clear Results
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto px-4 pb-4">
                <div data-tool-result="panel">
                  {isRunning ? (
                    LoadingComp ? (
                      <LoadingComp />
                    ) : (
                      <div className="flex items-center justify-center h-full min-h-[150px]">
                        <div className="flex items-center gap-3">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Processing...</span>
                        </div>
                      </div>
                    )
                  ) : error ? (
                    ErrorComp ? (
                      <ErrorComp message={error} />
                    ) : (
                      <div className="rounded-md border p-4 text-sm text-destructive">
                        Error: {error}
                      </div>
                    )
                  ) : data != null ? (
                    Result ? (
                      <Result data={data} />
                    ) : typeof data === "string" ? (
                      <p>{data}</p>
                    ) : (
                      <pre className="text-sm overflow-auto whitespace-pre-wrap bg-muted p-3 rounded">
                        {JSON.stringify(data, null, 2)}
                      </pre>
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[150px] text-muted-foreground">
                      <div className="text-center">
                        <p>Results will appear here</p>
                        <p className="text-sm mt-2">
                          Fill in the form and click submit to see results.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
}

