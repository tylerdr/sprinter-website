"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Share2, FileJson, FileText, Link as LinkIcon, Send } from "lucide-react";
import { toast } from "sonner";
import {
  buildToolSharePayload,
  copyToolShareJSON,
  copyToolShareMarkdown,
  shareToolViaNavigator
} from "@/features/tools/lib/share-utils";
import { copyToClipboard } from "@/lib/utils";

export interface ToolShareButtonProps {
  slug: string;
  output: unknown;
  input?: unknown;
  toolName?: string;
  url?: string;
  className?: string;
}

type ShareAction = "system" | "json" | "markdown" | "link";

export function ToolShareButton({
  slug,
  output,
  input,
  toolName,
  url,
  className
}: ToolShareButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const resolvedUrl = url ?? (typeof window !== "undefined" ? window.location.href : undefined);

  const handleAction = async (action: ShareAction) => {
    const payload = buildToolSharePayload({
      slug,
      toolName,
      url: resolvedUrl,
      input,
      output
    });

    setIsProcessing(true);
    try {
      switch (action) {
        case "system": {
          const shared = await shareToolViaNavigator(payload, { preferMarkdown: true });
          if (shared) {
            toast.success("Share dialog opened");
            break;
          }
          const copied = await copyToolShareMarkdown(payload);
          if (!copied) {
            throw new Error("Sharing is not supported in this environment");
          }
          toast.success("Share markdown copied to clipboard");
          break;
        }
        case "json": {
          const copied = await copyToolShareJSON(payload);
          if (!copied) {
            throw new Error("Failed to copy share JSON");
          }
          toast.success("Share JSON copied to clipboard");
          break;
        }
        case "markdown": {
          const copied = await copyToolShareMarkdown(payload);
          if (!copied) {
            throw new Error("Failed to copy share markdown");
          }
          toast.success("Share markdown copied to clipboard");
          break;
        }
        case "link": {
          if (!resolvedUrl) {
            throw new Error("No shareable URL available");
          }
          const copied = await copyToClipboard(resolvedUrl);
          if (!copied) {
            throw new Error("Failed to copy link");
          }
          toast.success("Tool link copied to clipboard");
          break;
        }
        default: {
          const exhaustiveCheck: never = action;
          throw new Error(`Unhandled share action: ${exhaustiveCheck}`);
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to complete share action";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const supportsShareAPI =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isProcessing}
          size="sm"
          variant="outline"
          className={className}
        >
          <Share2 className="w-4 h-4 mr-2" />
          {isProcessing ? "Sharing..." : "Share"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportsShareAPI && (
          <DropdownMenuItem disabled={isProcessing} onClick={() => handleAction("system")}>
            <Send className="w-4 h-4 mr-2" />
            Share via device
          </DropdownMenuItem>
        )}
        <DropdownMenuItem disabled={isProcessing} onClick={() => handleAction("json")}>
          <FileJson className="w-4 h-4 mr-2" />
          Copy share JSON
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isProcessing} onClick={() => handleAction("markdown")}>
          <FileText className="w-4 h-4 mr-2" />
          Copy share markdown
        </DropdownMenuItem>
        {resolvedUrl && (
          <DropdownMenuItem disabled={isProcessing} onClick={() => handleAction("link")}>
            <LinkIcon className="w-4 h-4 mr-2" />
            Copy tool link
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ToolShareButton;
