"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FileText, Upload, Download, Eye, Search, Tag,
  CheckCircle, AlertTriangle, Clock, Plus, Trash2,
  Edit, AlertCircle, X, FileImage, FileSpreadsheet,
  FileCode, File, Brain, Zap
} from "lucide-react";
import type { EntityUI, EntityFormProps, EntityListProps, EntityDetailProps } from "../../types";
import type { Document, CreateDocument, UpdateDocument } from "./schema";
import { CreateDocumentSchema, UpdateDocumentSchema } from "./schema";

// Document List View
export function DocumentList({ items, onSelect, onCreate }: EntityListProps<Document>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredDocuments = items.filter(document => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          document.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || document.status === filterStatus;
    const matchesType = filterType === "all" || document.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      uploaded: "outline",
      processing: "secondary",
      processed: "default",
      failed: "destructive",
      archived: "outline"
    };
    const colors: Record<string, string> = {
      uploaded: "text-gray-600",
      processing: "text-blue-600",
      processed: "text-green-600",
      failed: "text-red-600",
      archived: "text-gray-500"
    };
    return (
      <Badge variant={variants[status] || "outline"} className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      pdf: FileText,
      word: FileText,
      excel: FileSpreadsheet,
      image: FileImage,
      text: FileCode,
      presentation: FileText,
      other: File
    };
    const Icon = icons[type] || File;
    return <Icon className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="uploaded">Uploaded</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="processed">Processed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="word">Word</SelectItem>
            <SelectItem value="excel">Excel</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="presentation">Presentation</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onCreate} className="ml-auto">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((document) => (
          <Card
            key={document.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(document)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(document.type)}
                  <CardTitle className="text-lg truncate">{document.name}</CardTitle>
                </div>
                {getStatusBadge(document.status)}
              </div>
              <CardDescription className="line-clamp-2">
                {document.file_info.original_name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <File className="w-3 h-3" />
                  <span>{formatFileSize(document.file_info.size)}</span>
                  <span>•</span>
                  <span>{document.type.toUpperCase()}</span>
                </div>
                {document.processing?.duration_ms && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Processed in {Math.round(document.processing.duration_ms / 1000)}s</span>
                  </div>
                )}
                {document.extracted_data?.fields && document.extracted_data.fields.length > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Brain className="w-3 h-3" />
                    <span>{document.extracted_data.fields.length} fields extracted</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No documents found</p>
        </div>
      )}
    </div>
  );
}

// Document Form (Create/Edit)
export function DocumentForm({
  mode,
  initialData,
  onSubmit,
  onCancel
}: EntityFormProps<Document, CreateDocument, UpdateDocument>) {
  const form = useForm({
    resolver: zodResolver(mode === "create" ? CreateDocumentSchema : UpdateDocumentSchema),
    defaultValues: initialData || {
      slug: "",
      name: "",
      type: "pdf",
      status: "uploaded",
      file_info: {
        size: 0,
        mime_type: "",
        storage_path: "",
        original_name: ""
      },
      processing: {},
      extracted_data: {
        fields: [],
        tables: [],
        metadata: {}
      },
      classification: {
        tags: []
      },
      versions: [],
      metadata: {}
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="extraction">Extraction</TabsTrigger>
            <TabsTrigger value="classification">Classification</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Information</CardTitle>
                <CardDescription>Basic document details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Contract Agreement Q1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="contract-agreement-q1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="word">Word Document</SelectItem>
                            <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="text">Text Document</SelectItem>
                            <SelectItem value="presentation">Presentation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="uploaded">Uploaded</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="processed">Processed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional tabs for processing, extraction, classification... */}
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <CheckCircle className="w-4 h-4 mr-2" />
            {mode === "create" ? "Create Document" : "Update Document"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Document Detail View
export function DocumentDetail({ item, onEdit, onDelete }: EntityDetailProps<Document>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "processing": return <Zap className="w-5 h-5 text-blue-600" />;
      case "failed": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6" />
            {item.name}
          </h2>
          <p className="text-muted-foreground">{item.file_info.original_name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {getStatusIcon(item.status)}
              Status & Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Status:</span>
              <p className="font-medium capitalize">{item.status}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Type:</span>
              <p className="font-medium uppercase">{item.type}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Size:</span>
              <p className="font-medium">{formatFileSize(item.file_info.size)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Extraction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Fields:</span>
              <p className="font-medium">{item.extracted_data?.fields?.length || 0}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Tables:</span>
              <p className="font-medium">{item.extracted_data?.tables?.length || 0}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Has Text:</span>
              <p className="font-medium">{item.extracted_data?.text ? "Yes" : "No"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Classification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Category:</span>
              <p className="font-medium">{item.classification?.category || "N/A"}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Confidence:</span>
              <p className="font-medium">
                {item.classification?.confidence 
                  ? `${Math.round(item.classification.confidence * 100)}%` 
                  : "N/A"}
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Tags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.classification?.tags && item.classification.tags.length > 0 ? (
                  item.classification.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No tags</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {item.processing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Processing Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Started</p>
                <p className="font-medium">
                  {item.processing.started_at 
                    ? new Date(item.processing.started_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="font-medium">
                  {item.processing.completed_at 
                    ? new Date(item.processing.completed_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">
                  {item.processing.duration_ms 
                    ? `${Math.round(item.processing.duration_ms / 1000)}s`
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{item.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Are you sure you want to delete this document? This action cannot be undone.
            <div className="flex gap-2 mt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onDelete();
                  setShowDeleteConfirm(false);
                }}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// Export the UI configuration
export const DocumentUI: EntityUI<Document, CreateDocument, UpdateDocument> = {
  list: DocumentList,
  form: DocumentForm,
  detail: DocumentDetail,
  icon: FileText,
  displayField: "name",
  searchFields: ["name", "slug", "extracted_data.text"],
};