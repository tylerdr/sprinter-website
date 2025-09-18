import {
  Image as ImageIcon,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileCode,
  FileAudio,
  FileVideo,
  FileIcon
} from "lucide-react";

export interface AgentChatAttachmentItem {
  filename: string;
  url?: string | null;
  content_type?: string | null;
  size?: number | null;
  storage_path?: string; // for re-signing
  bucket?: string; // optional, defaults to chat-attachments
}

export function formatBytes(bytes?: number | null): string | null {
  if (!bytes || bytes <= 0) return null;
  const units = ["B", "KB", "MB", "GB"] as const;
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value % 1 === 0 ? value : value.toFixed(1)} ${units[unit]}`;
}

/**
 * Determine category from MIME type or filename extension.
 */
export function getFileCategory(
  contentType?: string | null,
  filename?: string
):
  | "image"
  | "pdf"
  | "doc"
  | "sheet"
  | "archive"
  | "audio"
  | "video"
  | "code"
  | "text"
  | "other" {
  const type = (contentType || "").toLowerCase();
  const ext = (filename || "").split(".").pop()?.toLowerCase() || "";

  if (type.startsWith("image/")) return "image";
  if (type === "application/pdf" || ext === "pdf") return "pdf";
  if (
    type.includes("officedocument.wordprocessingml") ||
    type === "application/msword" ||
    ["doc", "docx"].includes(ext)
  )
    return "doc";
  if (type.includes("spreadsheet") || ["csv", "xls", "xlsx"].includes(ext))
    return "sheet";
  if (type.startsWith("audio/") || ["mp3", "wav", "m4a", "flac"].includes(ext))
    return "audio";
  if (type.startsWith("video/") || ["mp4", "mov", "webm", "mkv"].includes(ext))
    return "video";
  if (["zip", "rar", "7z", "gz", "tar"].includes(ext)) return "archive";
  if (
    [
      "ts",
      "js",
      "jsx",
      "tsx",
      "json",
      "yml",
      "yaml",
      "xml",
      "css",
      "scss",
      "md"
    ].includes(ext)
  )
    return "code";
  if (type.startsWith("text/") || ["txt"].includes(ext)) return "text";
  return "other";
}

interface AttachmentAppearance {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
  iconClass: string;
  dotClass: string; // accent dot
}

/**
 * Map file category to icon and accent colors.
 */
export function getAttachmentAppearance(
  contentType?: string | null,
  filename?: string
): AttachmentAppearance {
  const category = getFileCategory(contentType, filename);

  switch (category) {
    case "image":
      return {
        Icon: ImageIcon,
        iconClass: "text-rose-600 dark:text-rose-400",
        dotClass: "bg-rose-500"
      };
    case "pdf":
    case "doc":
    case "text":
      return {
        Icon: FileText,
        iconClass: "text-blue-600 dark:text-blue-400",
        dotClass: "bg-blue-500"
      };
    case "sheet":
      return {
        Icon: FileSpreadsheet,
        iconClass: "text-emerald-600 dark:text-emerald-400",
        dotClass: "bg-emerald-500"
      };
    case "archive":
      return {
        Icon: FileArchive,
        iconClass: "text-amber-600 dark:text-amber-400",
        dotClass: "bg-amber-500"
      };
    case "audio":
      return {
        Icon: FileAudio,
        iconClass: "text-pink-600 dark:text-pink-400",
        dotClass: "bg-pink-500"
      };
    case "video":
      return {
        Icon: FileVideo,
        iconClass: "text-purple-600 dark:text-purple-400",
        dotClass: "bg-purple-500"
      };
    case "code":
      return {
        Icon: FileCode,
        iconClass: "text-sky-600 dark:text-sky-400",
        dotClass: "bg-sky-500"
      };
    default:
      return {
        Icon: FileIcon,
        iconClass: "text-muted-foreground",
        dotClass: "bg-muted-foreground/60"
      };
  }
}
