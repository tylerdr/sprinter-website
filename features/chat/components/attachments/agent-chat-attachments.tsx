"use client";

import { FileIcon, X as XIcon } from "lucide-react";

import {
  AgentChatAttachmentItem,
  formatBytes,
  getAttachmentAppearance
} from "./utils";

export interface AgentChatAttachmentsProps {
  attachments: AgentChatAttachmentItem[];
  isUploading: boolean;
  isDisabled?: boolean;
  onRemove: (index: number) => void;
}

export default function AgentChatAttachments({
  attachments,
  isUploading,
  isDisabled = false,
  onRemove
}: AgentChatAttachmentsProps) {
  if ((!attachments || attachments.length === 0) && !isUploading) return null;

  return (
    <div className="rounded-xl border border-blue-200/60 dark:border-indigo-900/40 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-2 px-3">
      {attachments?.length ? (
        <div className="flex flex-wrap gap-2">
          {attachments.map((attachment, index) => {
            const isImage = (attachment.content_type || "").startsWith(
              "image/"
            );
            const sizeLabel = formatBytes(attachment.size);
            const appearance = getAttachmentAppearance(
              attachment.content_type,
              attachment.filename
            );
            return (
              <div
                key={`uploaded-${index}`}
                className="group flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg border border-blue-200/40 dark:border-slate-800/60 bg-background/60 dark:bg-slate-900/50 hover:bg-background transition-colors"
                title={attachment.filename}
              >
                {/* Accent dot for quick type recognition */}
                <span
                  className={`h-1.5 w-1.5 rounded-full ${appearance.dotClass}`}
                />
                {isImage && attachment.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={attachment.url}
                    alt={attachment.filename}
                    className="h-6 w-6 rounded border border-blue-200/40 dark:border-slate-800/60 object-cover"
                  />
                ) : (
                  <>
                    {appearance.Icon ? (
                      <appearance.Icon
                        className={`h-4 w-4 ${appearance.iconClass}`}
                      />
                    ) : (
                      <FileIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </>
                )}
                <span className="text-xs text-foreground/90 max-w-[220px] truncate">
                  {attachment.filename}
                  {sizeLabel ? (
                    <span className="text-muted-foreground">
                      {" "}
                      · {sizeLabel}
                    </span>
                  ) : null}
                </span>
                <button
                  onClick={() => onRemove(index)}
                  className="ml-1 inline-flex items-center justify-center rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-50 disabled:pointer-events-none"
                  type="button"
                  disabled={isDisabled || isUploading}
                  aria-label={`Remove ${attachment.filename}`}
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      ) : null}

      {isUploading && (
        <div className="flex w-48 mt-2 items-center gap-2 pl-2 pr-1 py-1 rounded-lg border border-blue-200/40 dark:border-slate-800/60 bg-background/60 dark:bg-slate-900/50">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 animate-pulse" />
          <div className="h-6 w-6 rounded border border-blue-200/40 dark:border-slate-800/60 bg-muted/40 animate-pulse" />
          <span className="h-3 w-24 rounded bg-muted/50 animate-pulse" />
          <span className="h-6 w-6 rounded-md bg-muted/40 animate-pulse" />
        </div>
      )}
    </div>
  );
}
