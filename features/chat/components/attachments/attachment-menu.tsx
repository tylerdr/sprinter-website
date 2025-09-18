"use client";

import { useRef, useState } from "react";
import {
  PlusIcon,
  FileIcon,
  ImageIcon,
  CameraIcon,
  ScanIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

export type AttachmentMenuProps = {
  onFileSelect?: (files: FileList) => void;
  onImageCapture?: () => void;
  onDocumentScan?: () => void;
  className?: string;
};

export const AttachmentMenu = ({
  onFileSelect,
  onImageCapture,
  onDocumentScan,
  className
}: AttachmentMenuProps) => {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
    setOpen(false);
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
    setOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect?.(files);
      e.target.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect?.(files);
      e.target.value = "";
    }
  };

  const handleCameraClick = () => {
    if (onImageCapture) {
      onImageCapture();
    } else {
      // Fallback to file input with camera capture
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "environment";
      input.onchange = e => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          onFileSelect?.(target.files);
        }
      };
      input.click();
    }
    setOpen(false);
  };

  const handleDocumentScanClick = () => {
    onDocumentScan?.();
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant="ghost"
            size="icon"
            className={cn(
              "shrink-0 gap-1.5 rounded-lg text-muted-foreground transition-colors",
              "border border-blue-200/40 dark:border-slate-800/60 bg-background/50 hover:bg-background",
              className
            )}
            type="button"
            aria-label="Add attachments"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          sideOffset={8}
          className="w-48 p-2 rounded-lg border border-blue-200/40 dark:border-slate-800/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md"
        >
          <div className="flex flex-col gap-1">
            <button
              onClick={handleFileClick}
              className="flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-accent hover:text-accent-foreground transition-colors w-full text-left"
              aria-label="Upload file"
              type="button"
            >
              <FileIcon className="h-4 w-4 text-muted-foreground" />
              <span>Upload File</span>
            </button>
            <button
              onClick={handleImageClick}
              className="flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-accent hover:text-accent-foreground transition-colors w-full text-left"
              aria-label="Upload image"
              type="button"
            >
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              <span>Upload Image</span>
            </button>
            {onImageCapture && (
              <button
                onClick={handleCameraClick}
                className="flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-accent hover:text-accent-foreground transition-colors w-full text-left"
                aria-label="Take photo"
                type="button"
              >
                <CameraIcon className="h-4 w-4 text-muted-foreground" />
                <span>Take Photo</span>
              </button>
            )}
            {onDocumentScan && (
              <button
                onClick={handleDocumentScanClick}
                className="flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-accent hover:text-accent-foreground transition-colors w-full text-left"
                aria-label="Scan document"
                type="button"
              >
                <ScanIcon className="h-4 w-4 text-muted-foreground" />
                <span>Scan Document</span>
              </button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        multiple
        accept=".pdf,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.txt,text/plain,.csv,text/csv,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.zip,.rar,.7z,application/zip"
      />
      <input
        ref={imageInputRef}
        type="file"
        className="hidden"
        onChange={handleImageChange}
        multiple
        accept="image/*"
      />
    </>
  );
};
