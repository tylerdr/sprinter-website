"use client";

import { useEffect, useRef, useState } from "react";
import { X, Maximize2, Minimize2, Download, Share2, Trash2 } from "lucide-react";
import { ARTIFACT_VIEWERS } from "../viewer-registry";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

export interface ArtifactData {
  id: string;
  kind: string;
  title: string;
  data: any;
  meta?: any;
  created_at?: string;
}

interface ArtifactDockProps {
  open: boolean;
  onClose: () => void;
  artifact: ArtifactData | null;
  onDelete?: (id: string) => Promise<void>;
  onShare?: (id: string) => Promise<void>;
  onDownload?: (id: string) => Promise<void>;
}

export default function ArtifactDock({
  open,
  onClose,
  artifact,
  onDelete,
  onShare,
  onDownload,
}: ArtifactDockProps) {
  const [width, setWidth] = useState(600);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(600);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current || isMaximized) return;

      const deltaX = startX.current - e.clientX;
      const newWidth = Math.min(
        Math.max(startWidth.current + deltaX, 400),
        window.innerWidth - 100
      );
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      dragging.current = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    dragging.current = true;
    startX.current = e.clientX;
    startWidth.current = width;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  if (!open || !artifact) return null;

  const Viewer = ARTIFACT_VIEWERS[artifact.kind] ?? ARTIFACT_VIEWERS._default;

  const dockStyle = isMaximized
    ? {
        width: "calc(100vw - 320px)", // Account for sidebar
        left: 0,
      }
    : {
        width: `${width}px`,
      };

  return (
    <aside
      className="fixed inset-y-0 right-0 z-40 border-l bg-background shadow-2xl transition-all duration-200"
      style={dockStyle}
    >
      {/* Resize handle */}
      {!isMaximized && (
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-[-4px] top-0 h-full w-2 cursor-col-resize hover:bg-primary/20 transition-colors"
        />
      )}

      {/* Header */}
      <div className="h-14 px-4 border-b bg-background/95 backdrop-blur-sm flex items-center justify-between">
        <div className="flex-1 min-w-0 mr-4">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {artifact.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {artifact.kind.replace(/_/g, " ")}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleMaximize}
          >
            {isMaximized ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onDownload && (
                <DropdownMenuItem onClick={() => onDownload(artifact.id)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
              )}
              {onShare && (
                <DropdownMenuItem onClick={() => onShare(artifact.id)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
              )}
              {(onDownload || onShare) && onDelete && <DropdownMenuSeparator />}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(artifact.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
        <div className="p-6">
          <Viewer artifact={artifact} />
        </div>
      </div>
    </aside>
  );
}