"use client";

import { useMemo, useState, useTransition } from "react";
import { Actions, Action } from "@/components/ai-elements/actions";
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  CopyIcon,
  RefreshCcwIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  upsertMessageFeedback,
  removeMyMessageFeedback
} from "@/features/chat/lib/feedback/actions";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
export interface AgentMessageFeedbackProps {
  userId: string;
  message: any; // UI message with id, role, parts, metadata
  onRetry?: () => void;
  onFeedbackUpdate?: (
    messageId: string,
    nextFeedback: {
      byUser: Record<
        string,
        { value: 1 | -1; comment?: string; updatedAt: string }
      >;
      summary: { positives: number; negatives: number };
    }
  ) => void;
  agentInfo?: { name?: string; imageUrl?: string };
}

/**
 * Renders like/dislike actions for an assistant message and persists feedback
 * into ai_messages.metadata.feedback.byUser[userId].
 */
export default function AgentMessageFeedback({
  userId,
  message,
  onRetry,
  onFeedbackUpdate,
  agentInfo
}: AgentMessageFeedbackProps) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingValue, setPendingValue] = useState<1 | -1 | null>(null);
  const [comment, setComment] = useState("");
  const feedbackValue: 1 | -1 | null = useMemo(() => {
    const byUser = message?.metadata?.feedback?.byUser;
    if (!byUser || !userId) return null;
    const entry = byUser[userId];
    if (!entry) return null;
    return entry.value === 1 ? 1 : -1;
  }, [message?.metadata?.feedback?.byUser, userId]);

  const [localValue, setLocalValue] = useState<1 | -1 | null>(feedbackValue);

  const currentTextContent = useMemo(() => {
    const textPart = Array.isArray(message?.parts)
      ? message.parts.find((p: any) => p?.type === "text")
      : null;
    return textPart?.text || "";
  }, [message?.parts]);

  const handleVote = (value: 1 | -1) => {
    if (!message?.id) return;
    const sameValueClicked = localValue === value;

    // If clicking the same value and user has an existing comment, open dialog to update instead of removing
    const existingEntry = (message?.metadata?.feedback?.byUser || {})[
      userId
    ] as { value: 1 | -1; comment?: string; updatedAt: string } | undefined;
    if (sameValueClicked && existingEntry?.comment) {
      setPendingValue(value);
      setComment(existingEntry.comment || "");
      setIsDialogOpen(true);
      return;
    }

    const next = sameValueClicked ? null : value;

    // If toggling off, remove immediately
    if (next === null) {
      setLocalValue(null);
      startTransition(async () => {
        try {
          const res = await removeMyMessageFeedback({ messageId: message.id });
          if (!res.ok) throw new Error(res.error);

          const byUser = {
            ...(message?.metadata?.feedback?.byUser || {})
          } as Record<
            string,
            { value: 1 | -1; comment?: string; updatedAt: string }
          >;
          if (byUser[userId]) delete byUser[userId];
          const summary = Object.values(byUser).reduce(
            (acc, e) => {
              if (e.value === 1) acc.positives += 1;
              else acc.negatives += 1;
              return acc;
            },
            { positives: 0, negatives: 0 }
          );
          onFeedbackUpdate?.(message.id, { byUser, summary });
          toast.success("Feedback removed successfully");
        } catch (e: any) {
          setLocalValue(feedbackValue);
          toast.error("Failed to remove feedback");
        }
      });
      return;
    }

    // Otherwise, open dialog for optional comment and confirmation
    setPendingValue(value);
    setComment(existingEntry?.comment || "");
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!message?.id || pendingValue == null) return;
    startTransition(async () => {
      try {
        const trimmed = comment.trim();
        const res = await upsertMessageFeedback({
          messageId: message.id,
          value: pendingValue,
          comment: trimmed ? trimmed : undefined
        });
        if (!res.ok) throw new Error(res.error);

        const byUser = {
          ...(message?.metadata?.feedback?.byUser || {})
        } as Record<
          string,
          { value: 1 | -1; comment?: string; updatedAt: string }
        >;
        byUser[userId] = {
          value: pendingValue,
          comment: trimmed ? trimmed : undefined,
          updatedAt: new Date().toISOString()
        };
        const summary = Object.values(byUser).reduce(
          (acc, e) => {
            if (e.value === 1) acc.positives += 1;
            else acc.negatives += 1;
            return acc;
          },
          { positives: 0, negatives: 0 }
        );

        setLocalValue(pendingValue);
        onFeedbackUpdate?.(message.id, { byUser, summary });

        toast.success(
          pendingValue === 1 ? "Marked as helpful" : "Marked as not helpful"
        );
        setIsDialogOpen(false);
        setPendingValue(null);
        setComment("");
      } catch (e: any) {
        toast.error("Failed to save feedback");
      }
    });
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open && !isPending) {
      setIsDialogOpen(false);
      setPendingValue(null);
      setComment("");
    } else {
      setIsDialogOpen(open);
    }
  };

  const agentName = agentInfo?.name || "Assistant";
  const agentImageUrl = agentInfo?.imageUrl;
  const userFeedbackEntry = (message?.metadata?.feedback?.byUser || {})[
    userId
  ] as { value: 1 | -1; comment?: string; updatedAt: string } | undefined;
  const userComment = userFeedbackEntry?.comment?.trim();
  const likeTooltip = userComment || "Helpful";
  const dislikeTooltip = userComment || "Not helpful";

  const handleRemove = () => {
    if (!message?.id) return;
    startTransition(async () => {
      try {
        const res = await removeMyMessageFeedback({ messageId: message.id });
        if (!res.ok) throw new Error(res.error);

        const byUser = {
          ...(message?.metadata?.feedback?.byUser || {})
        } as Record<
          string,
          { value: 1 | -1; comment?: string; updatedAt: string }
        >;
        if (byUser[userId]) delete byUser[userId];
        const summary = Object.values(byUser).reduce(
          (acc, e) => {
            if (e.value === 1) acc.positives += 1;
            else acc.negatives += 1;
            return acc;
          },
          { positives: 0, negatives: 0 }
        );

        setLocalValue(null);
        onFeedbackUpdate?.(message.id, { byUser, summary });
        toast.success("Feedback removed successfully");
        setIsDialogOpen(false);
        setPendingValue(null);
        setComment("");
      } catch (e: any) {
        toast.error("Failed to remove feedback");
      }
    });
  };

  function fallbackCopyToClipboard(text: string): boolean {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch {
      return false;
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentTextContent);
      toast.success("Copied to clipboard");
    } catch {
      const ok = fallbackCopyToClipboard(currentTextContent);

      if (ok) {
        toast.success("Copied to clipboard");
      } else {
        toast.error("Failed to copy");
      }
    }
  };

  return (
    <>
      <Actions className="mt-2 sm:mt-1">
        {onRetry && (
          <Action
            onClick={onRetry}
            label="Retry"
            tooltip="Retry"
            className="size-7 sm:size-8"
          >
            <RefreshCcwIcon className="size-3 sm:size-3.5" />
          </Action>
        )}

        <Action
          onClick={() => handleVote(-1)}
          label="Dislike"
          tooltip={dislikeTooltip}
          className={cn(
            "size-7 sm:size-8",
            localValue === -1 && "text-destructive"
          )}
          aria-pressed={localValue === -1}
          disabled={isPending}
        >
          <ThumbsDownIcon
            className={cn(
              "size-3 sm:size-3.5",
              localValue === -1 && "stroke-[2.5px]"
            )}
          />
        </Action>

        <Action
          onClick={() => handleVote(1)}
          label="Like"
          tooltip={likeTooltip}
          className={cn(
            "size-7 sm:size-8",
            localValue === 1 && "text-green-600 dark:text-green-400"
          )}
          aria-pressed={localValue === 1}
          disabled={isPending}
        >
          <ThumbsUpIcon
            className={cn(
              "size-3 sm:size-3.5",
              localValue === 1 && "stroke-[2.5px]"
            )}
          />
        </Action>

        {currentTextContent && (
          <Action
            onClick={handleCopy}
            label="Copy"
            tooltip="Copy"
            className="size-7 sm:size-8"
          >
            <CopyIcon className="size-3 sm:size-3.5" />
          </Action>
        )}
      </Actions>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-md p-0">
          <DialogTitle className="sr-only">
            {pendingValue === 1 ? "Mark as helpful" : "Mark as not helpful"}
          </DialogTitle>
          <div className="px-5 py-4 border-b bg-muted/40">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                {agentImageUrl ? (
                  <AvatarImage src={agentImageUrl} alt={agentName} />
                ) : (
                  <AvatarFallback>{agentName.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <div className="min-w-0">
                <div className="text-sm font-medium leading-tight truncate">
                  {agentName}
                </div>
                <div className="text-xs text-muted-foreground">
                  Rate this response
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 mr-6">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setPendingValue(1)}
                  aria-pressed={pendingValue === 1}
                  title="Mark as helpful"
                  className={cn(
                    "h-8 w-8",
                    pendingValue === 1 &&
                      "bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/30"
                  )}
                >
                  <ThumbsUpIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setPendingValue(-1)}
                  aria-pressed={pendingValue === -1}
                  title="Mark as not helpful"
                  className={cn(
                    "h-8 w-8",
                    pendingValue === -1 &&
                      "bg-destructive/15 text-destructive border border-destructive/30"
                  )}
                >
                  <ThumbsDownIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="px-5 py-4 space-y-2">
            <Label htmlFor="feedback-comment">Comment (optional)</Label>
            <Textarea
              id="feedback-comment"
              placeholder="What was helpful or what could be improved?"
              value={comment}
              onChange={e => setComment(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="px-5 py-3 border-t bg-background flex items-center justify-between gap-2">
            {userFeedbackEntry ? (
              <Button
                type="button"
                variant="ghost"
                className="text-destructive"
                onClick={handleRemove}
                disabled={isPending}
              >
                Remove feedback
              </Button>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDialogOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                disabled={isPending}
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
