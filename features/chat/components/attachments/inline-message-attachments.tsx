"use client";

import { useState, useCallback } from "react";
import { refreshChatAttachmentUrlAction } from "@/lib/file-upload/actions";
import { getAttachmentAppearance, getFileCategory } from "./utils";

export interface MessageFilePart {
  type: "file";
  url: string;
  filename?: string;
  mediaType?: string;
  metadata?: {
    storagePath?: string;
  };
}

interface InlineMessageAttachmentProps {
  part: MessageFilePart;
  index?: number;
}

export function InlineMessageAttachment({
  part,
  index
}: InlineMessageAttachmentProps) {
  const [url, setUrl] = useState(part.url);
  const [expired, setExpired] = useState(false);
  const category = getFileCategory(part.mediaType, part.filename);
  const appearance = getAttachmentAppearance(part.mediaType, part.filename);
  const isImage = category === "image";

  const refreshUrlAndOpen = useCallback(async () => {
    if (!part.metadata?.storagePath) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    const { url: freshUrl } = await refreshChatAttachmentUrlAction(
      part.metadata.storagePath
    );
    if (freshUrl) {
      setUrl(freshUrl);
      setExpired(false);
      window.open(freshUrl, "_blank", "noopener,noreferrer");
    } else {
      setExpired(true);
    }
  }, [part.metadata?.storagePath, url]);

  const refreshImageUrl = useCallback(async () => {
    if (!part.metadata?.storagePath) return;
    const { url: freshUrl } = await refreshChatAttachmentUrlAction(
      part.metadata.storagePath
    );
    if (freshUrl) {
      setUrl(freshUrl);
      setExpired(false);
    } else {
      setExpired(true);
    }
  }, [part.metadata?.storagePath]);

  const onError = () => setExpired(true);

  if (isImage) {
    const Icon = appearance.Icon;
    return (
      <div key={index} className="my-2">
        {!expired ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={part.filename || "image attachment"}
            className="rounded-md border border-blue-200/40 dark:border-slate-800/60 max-w-full h-auto"
            onError={onError}
          />
        ) : (
          <button
            type="button"
            onClick={refreshImageUrl}
            className="group inline-flex items-center gap-2 pl-2 pr-2 py-1 rounded-lg border border-blue-200/40 dark:border-slate-800/60 bg-background/60 dark:bg-slate-900/50 hover:bg-background transition-colors text-xs text-muted-foreground hover:text-foreground"
            title={part.filename}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${appearance.dotClass}`}
            />
            {Icon ? (
              <Icon className={`h-4 w-4 ${appearance.iconClass}`} />
            ) : null}
            <span className="max-w-[220px] truncate">
              Link expired — refresh
            </span>
          </button>
        )}
      </div>
    );
  }

  const Icon = appearance.Icon;

  return (
    <div key={index} className="my-1">
      {!expired ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg border border-blue-200/40 dark:border-slate-800/60 bg-background/60 dark:bg-slate-900/50 hover:bg-background transition-colors text-sm"
          onClick={e => {
            e.preventDefault();
            refreshUrlAndOpen();
          }}
          title={part.filename}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${appearance.dotClass}`} />
          {Icon ? <Icon className={`h-4 w-4 ${appearance.iconClass}`} /> : null}
          <span className="text-xs text-foreground/90 max-w-[220px] truncate">
            {part.filename || "attachment"}
          </span>
        </a>
      ) : (
        <button
          type="button"
          onClick={refreshUrlAndOpen}
          className="group flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg border border-blue-200/40 dark:border-slate-800/60 bg-background/60 dark:bg-slate-900/50 hover:bg-background transition-colors text-sm text-muted-foreground hover:text-foreground"
          title={part.filename}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${appearance.dotClass}`} />
          {Icon ? <Icon className={`h-4 w-4 ${appearance.iconClass}`} /> : null}
          <span className="text-xs max-w-[220px] truncate">
            Link expired — refresh
          </span>
        </button>
      )}
    </div>
  );
}

interface InlineMessageAttachmentsProps {
  parts: MessageFilePart[];
}

export function InlineMessageAttachments({
  parts
}: InlineMessageAttachmentsProps) {
  if (!Array.isArray(parts) || parts.length === 0) return null;
  return (
    <div className="flex flex-col">
      {parts.map((p, i) => (
        <InlineMessageAttachment key={`${p.url}-${i}`} part={p} index={i} />
      ))}
    </div>
  );
}
