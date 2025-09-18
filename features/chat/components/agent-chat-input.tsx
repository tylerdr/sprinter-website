"use client";

import type { ReactNode } from "react";
import type { AgentConfig } from "@/features/agents/registry";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputSubmit,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectValue
} from "@/components/ai-elements/prompt-input";

// Define the type locally since it's not exported from the module
type PromptInputMessage = string;
import { Button } from "@/components/ui/button";
import { AttachmentMenu } from "./attachments/attachment-menu";
import {
  ArrowUp,
  SquarePen,
  Lock,
  PanelLeftOpen,
  PanelLeftClose
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooleanQueryParam } from "@/features/chat/hooks/use-query-params";

export interface AgentChatInputProps {
  /** Current textarea value */
  value: string;
  /** Called when textarea changes */
  onChange: (value: string) => void;
  /** Submit handler for the form */
  onSubmit: (message: PromptInputMessage, e: React.FormEvent) => void;
  /** Placeholder text for the textarea */
  placeholder?: string;
  /** Disable input while loading */
  isLoading?: boolean;
  /** Disable file actions while uploading */
  isUploading?: boolean;
  /** Optional: stop generation callback (shows Stop button) */
  onStop?: () => void;
  /** Optional: retry/regenerate callback (no button rendered) */
  onRetry?: () => void;
  /** Optional: reset/new chat callback (shows Reset button) */
  onNewChat?: () => void;
  /** Optional: handle file selection */
  onFileSelect?: (files: FileList) => void;
  /** Optional: allow switching agents */
  enableAgentSwitching?: boolean;
  /** Optional: available agents list */
  agents?: AgentConfig[];
  /** Optional: selected agent id */
  currentAgentId?: string;
  /** Optional: on agent change */
  onAgentChange?: (id: string) => void;
  /** Optional: extra actions to render at the end of the toolbar */
  rightActions?: ReactNode;
  /** Optional: className for the outer PromptInput container */
  className?: string;
  /** Optional: lock input and show message */
  isLocked?: boolean;
  lockMessage?: string;
}

/**
 * AgentChatInput
 *
 * Reusable chat input bar with toolbar actions and optional agent switching.
 * Encapsulates the PromptInput components and common actions (Stop, Reset, Attach).
 */
export default function AgentChatInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Type your message...",
  isLoading = false,
  isUploading = false,
  onStop,
  onNewChat,
  onFileSelect,
  enableAgentSwitching = false,
  agents = [],
  currentAgentId,
  onAgentChange,
  rightActions,
  className,
  isLocked = false,
  lockMessage
}: AgentChatInputProps) {
  const disabled = isLoading || isUploading || isLocked;

  const selectedAgent = agents.find(a => a.id === currentAgentId);
  const [historyOpen, setHistoryOpen] = useBooleanQueryParam("history", true);

  return (
    <div className="relative">
      <PromptInput
        onSubmit={(e: React.FormEvent) => onSubmit(value, e)}
        className={
          className ||
          "group rounded-xl border border-blue-200/60 dark:border-indigo-900/40 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm focus-within:ring-2 focus-within:ring-indigo-400 dark:focus-within:ring-indigo-700 focus-within:ring-offset-2 focus-within:ring-offset-background"
        }
        aria-disabled={isLocked}
      >
        <PromptInputTextarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading || isLocked}
          className="focus-visible:ring-0 group-focus-within:border-indigo-400 dark:group-focus-within:border-indigo-700 group-focus-within:bg-background/80"
        />

        <PromptInputToolbar>
          <PromptInputTools>
            {/* Mobile-only history toggle */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 sm:hidden"
              onClick={() => setHistoryOpen(!historyOpen)}
              title={historyOpen ? "Hide history" : "Show history"}
            >
              {historyOpen ? (
                <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
              ) : (
                <PanelLeftOpen className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>

            {onFileSelect && !isLocked && (
              <AttachmentMenu onFileSelect={onFileSelect} />
            )}

            {isLoading && onStop && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onStop}
                title="Stop generation"
              >
                Stop
              </Button>
            )}

            {/* Retry button intentionally removed */}

            {/* Agent switcher remains on the left side */}
            {enableAgentSwitching &&
              agents.length > 0 &&
              currentAgentId &&
              onAgentChange && (
                <PromptInputModelSelect
                  value={currentAgentId}
                  onValueChange={onAgentChange}
                >
                  <PromptInputModelSelectTrigger>
                    <PromptInputModelSelectValue />
                  </PromptInputModelSelectTrigger>
                  <PromptInputModelSelectContent>
                    {agents.map(agent => (
                      <PromptInputModelSelectItem
                        key={agent.id}
                        value={agent.id}
                        disabled={agent.isActive === false}
                      >
                        {agent.icon ? (
                          <span className="mr-2">{agent.icon}</span>
                        ) : null}
                        {agent.name}
                      </PromptInputModelSelectItem>
                    ))}
                  </PromptInputModelSelectContent>
                </PromptInputModelSelect>
              )}

            {/* Selected agent label when switching is disabled and not locked */}
            {!enableAgentSwitching && !isLocked && selectedAgent && (
              <div className="inline-flex items-center gap-1.5 mx-3 text-xs text-muted-foreground select-none">
                {selectedAgent.icon ? (
                  <span className="opacity-80">{selectedAgent.icon}</span>
                ) : null}
                <span className="text-foreground font-medium">
                  {selectedAgent.name}
                </span>
              </div>
            )}

            {rightActions}
          </PromptInputTools>

          <div className="flex items-center gap-2 pr-1">
            {onNewChat && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onNewChat}
                title="Start a new chat"
                className="h-8 px-3 text-xs font-medium border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-700 transition-all duration-200 hover:shadow-sm active:scale-[0.98] gap-1.5"
              >
                <SquarePen className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">New Scenario</span>
              </Button>
            )}

            <PromptInputSubmit
              size="sm"
              className={cn(
                "gap-1.5 relative overflow-hidden transition-colors duration-300 bg-indigo-500 text-white hover:bg-indigo-600",
                disabled || !(value && value.trim().length > 0)
                  ? "bg-muted text-muted-foreground hover:bg-muted"
                  : "animate-soft-pulse"
              )}
              disabled={disabled || !(value && value.trim().length > 0)}
            >
              <ArrowUp className="size-4" />
            </PromptInputSubmit>
          </div>
        </PromptInputToolbar>
      </PromptInput>

      {isLocked && (
        <div className="absolute inset-0 rounded-xl bg-background/70 backdrop-blur-sm border border-blue-200/60 dark:border-indigo-900/40 flex items-center justify-center p-4">
          <div className="text-center text-sm text-muted-foreground">
            <div className="mx-auto mb-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-700 ring-1 ring-amber-200">
              <Lock className="h-3 w-3" aria-hidden="true" />
            </div>
            <p className="font-medium text-foreground mb-2">
              {lockMessage || "You no longer have access to this agent."}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={onNewChat}
            >
              <SquarePen className="size-3.5" />
              <span className="hidden sm:inline">New Scenario</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
