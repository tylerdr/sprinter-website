"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, File, X, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  maxPages?: number;
  className?: string;
  multiple?: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;
}

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export function FileUploader({
  onFileSelect,
  accept = ".pdf,.doc,.docx",
  maxSizeMB = 25,
  maxPages,
  className,
  multiple = false,
  disabled = false,
  title = "Upload Document",
  description = "Drag and drop your file here, or click to browse"
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    // Check file type
    const validTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type;
    
    const isValidType = validTypes.some(type => 
      type === fileExtension || 
      (type.startsWith('.') && fileExtension === type) ||
      (!type.startsWith('.') && mimeType.includes(type))
    );

    if (!isValidType) {
      return `File type not supported. Please upload: ${accept}`;
    }

    return null;
  }, [accept, maxSizeMB]);

  const handleFiles = useCallback((files: FileList) => {
    setError(null);
    const fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) {
      setError("Please select only one file");
      return;
    }

    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      const uploadedFile: UploadedFile = {
        file,
        progress: 0,
        status: 'uploading'
      };

      setUploadedFiles(prev => [...prev, uploadedFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.file === file && f.progress < 100) {
            const newProgress = f.progress + 10;
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 100);

      // Complete upload after 1 second
      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(f => {
          if (f.file === file) {
            return { ...f, progress: 100, status: 'success' };
          }
          return f;
        }));
        onFileSelect(file);
      }, 1000);
    }
  }, [multiple, validateFile, onFileSelect]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [disabled, handleFiles]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }, [disabled, handleFiles]);

  const onButtonClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const removeFile = useCallback((fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== fileToRemove));
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      <Card className={cn(
        "border-2 border-dashed transition-colors cursor-pointer",
        dragActive ? "border-brand bg-brand/5" : "border-muted-foreground/25",
        disabled && "opacity-50 cursor-not-allowed"
      )}>
        <CardContent className="p-6">
          <div
            className="flex flex-col items-center justify-center text-center space-y-4"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              dragActive ? "bg-brand text-white" : "bg-muted"
            )}>
              <Upload className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Supported: {accept}</div>
                <div>Max size: {maxSizeMB}MB</div>
                {maxPages && <div>Max pages: {maxPages}</div>}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              className="mt-4"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File{multiple ? 's' : ''}
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            multiple={multiple}
            disabled={disabled}
            className="hidden"
            aria-label="File upload"
          />
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((uploadedFile, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <File className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(uploadedFile.file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {uploadedFile.status === 'uploading' && (
                    <div className="w-24">
                      <Progress value={uploadedFile.progress} className="h-2" />
                    </div>
                  )}
                  
                  {uploadedFile.status === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  
                  {uploadedFile.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadedFile.file)}
                    className="p-1"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {uploadedFile.status === 'error' && uploadedFile.error && (
                <p className="text-xs text-red-500 mt-2">{uploadedFile.error}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}