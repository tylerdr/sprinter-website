"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Search,
  Type,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface CMSContentProps {
  profile: any;
  onUpdate?: () => void;
}

export function CMSContent({ profile, onUpdate }: CMSContentProps) {
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  
  const supabase = createClient();

  const sections = [
    "home",
    "about",
    "solutions",
    "operating-partner",
    "insights",
    "footer",
    "general"
  ];

  useEffect(() => {
    loadContent();
  }, [selectedSection]);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("content_blocks")
        .select("*")
        .order("created_at", { ascending: false });

      if (selectedSection !== "all") {
        query = query.eq("section", selectedSection);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setContentBlocks(data || []);
    } catch (error) {
      console.error("Failed to load content:", error);
      toast.error("Failed to load content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveContent = async (formData: any) => {
    try {
      const contentData = {
        ...formData,
        updated_by: profile.id
      };

      if (editingContent) {
        const { error } = await supabase
          .from("content_blocks")
          .update(contentData)
          .eq("id", editingContent.id);

        if (error) throw error;
        toast.success("Content updated successfully");
      } else {
        contentData.created_by = profile.id;

        const { error } = await supabase
          .from("content_blocks")
          .insert([contentData]);

        if (error) throw error;
        toast.success("Content block created successfully");
      }

      setIsDialogOpen(false);
      setEditingContent(null);
      loadContent();
      onUpdate?.();
    } catch (error: any) {
      console.error("Failed to save content:", error);
      if (error.code === '23505') {
        toast.error("A content block with this key already exists");
      } else {
        toast.error("Failed to save content");
      }
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content block?")) return;

    try {
      const { error } = await supabase
        .from("content_blocks")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Content deleted");
      loadContent();
      onUpdate?.();
    } catch (error) {
      console.error("Failed to delete content:", error);
      toast.error("Failed to delete content");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const filteredContent = contentBlocks.filter(block =>
    block.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Content Blocks Management
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingContent(null)}>
                <Plus className="w-4 h-4 mr-2" />
                New Content Block
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingContent ? "Edit Content Block" : "Create Content Block"}
                </DialogTitle>
                <DialogDescription>
                  Manage text content for your website sections
                </DialogDescription>
              </DialogHeader>
              <ContentForm
                content={editingContent}
                sections={sections}
                onSave={handleSaveContent}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-2 rounded-md border border-input bg-background"
          >
            <option value="all">All Sections</option>
            {sections.map((section: string) => (
              <option key={section} value={section}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Content Table */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((block) => (
                <TableRow key={block.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-card px-2 py-1 rounded">
                        {block.key}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(block.key)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate text-sm">
                      {block.content}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {block.section || "general"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {block.content_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingContent(block);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteContent(block.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function ContentForm({ content, sections, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    key: content?.key || "",
    content: content?.content || "",
    content_type: content?.content_type || "text",
    section: content?.section || sections[0],
    page: content?.page || "",
    language: content?.language || "en",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="key">Content Key * (unique identifier)</Label>
        <Input
          id="key"
          value={formData.key}
          onChange={(e) => setFormData({ ...formData, key: e.target.value })}
          placeholder="hero-title"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Used to reference this content in the code
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="section">Section *</Label>
          <select
            id="section"
            value={formData.section}
            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
          >
            {sections.map((section: string) => (
              <option key={section} value={section}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="page">Page (optional)</Label>
          <Input
            id="page"
            value={formData.page}
            onChange={(e) => setFormData({ ...formData, page: e.target.value })}
            placeholder="about, contact, etc."
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="content_type">Content Type</Label>
          <select
            id="content_type"
            value={formData.content_type}
            onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
          >
            <option value="text">Plain Text</option>
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
            <option value="json">JSON</option>
          </select>
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <Input
            id="language"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            placeholder="en"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={8}
          required
          className={formData.content_type === "json" ? "font-mono text-sm" : ""}
          placeholder={
            formData.content_type === "markdown" 
              ? "# Heading\n\nYour markdown content here..."
              : formData.content_type === "json"
              ? '{\n  "key": "value"\n}'
              : "Your content here..."
          }
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {content ? "Update Content" : "Create Content"}
        </Button>
      </div>
    </form>
  );
}