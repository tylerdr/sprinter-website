"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Image as ImageIcon,
  Upload,
  Loader2,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface CMSImagesProps {
  profile: any;
  onUpdate?: () => void;
}

export function CMSImages({ profile, onUpdate }: CMSImagesProps) {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const supabase = createClient();

  const sections = [
    "home",
    "about",
    "solutions",
    "operating-partner",
    "insights",
    "labs",
    "general"
  ];

  useEffect(() => {
    loadImages();
  }, [selectedSection]);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });

      if (selectedSection !== "all") {
        query = query.eq("section", selectedSection);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Failed to load images:", error);
      toast.error("Failed to load images");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveImage = async (formData: any) => {
    try {
      const imageData = {
        ...formData,
        updated_by: profile.id
      };

      if (editingImage) {
        const { error } = await supabase
          .from("images")
          .update(imageData)
          .eq("id", editingImage.id);

        if (error) throw error;
        toast.success("Image updated successfully");
      } else {
        imageData.created_by = profile.id;

        const { error } = await supabase
          .from("images")
          .insert([imageData]);

        if (error) throw error;
        toast.success("Image added successfully");
      }

      setIsDialogOpen(false);
      setEditingImage(null);
      loadImages();
      onUpdate?.();
    } catch (error: any) {
      console.error("Failed to save image:", error);
      if (error.code === '23505') {
        toast.error("An image with this key already exists");
      } else {
        toast.error("Failed to save image");
      }
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const { error } = await supabase
        .from("images")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Image deleted");
      loadImages();
      onUpdate?.();
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("Failed to delete image");
    }
  };

  const handleUploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const filteredImages = images.filter(image =>
    image.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.alt_text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Images Management
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingImage(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingImage ? "Edit Image" : "Add New Image"}
                </DialogTitle>
                <DialogDescription>
                  Manage images for your website sections
                </DialogDescription>
              </DialogHeader>
              <ImageForm
                image={editingImage}
                sections={sections}
                onSave={handleSaveImage}
                onCancel={() => setIsDialogOpen(false)}
                onUpload={handleUploadImage}
                isUploading={isUploading}
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
                placeholder="Search images..."
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

        {/* Images Table */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Alt Text</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredImages.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <div className="relative w-16 h-16 bg-card rounded overflow-hidden">
                      {image.url ? (
                        <img
                          src={image.url}
                          alt={image.alt_text || ""}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-card px-2 py-1 rounded">
                        {image.key}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(image.key)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {image.section || "general"}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {image.alt_text || "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(image.url, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingImage(image);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteImage(image.id)}
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

function ImageForm({ image, sections, onSave, onCancel, onUpload, isUploading }: any) {
  const [formData, setFormData] = useState({
    key: image?.key || "",
    url: image?.url || "",
    alt_text: image?.alt_text || "",
    title: image?.title || "",
    description: image?.description || "",
    section: image?.section || sections[0],
    page: image?.page || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await onUpload(file);
    if (url) {
      setFormData({ ...formData, url });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="key">Image Key * (unique identifier)</Label>
        <Input
          id="key"
          value={formData.key}
          onChange={(e) => setFormData({ ...formData, key: e.target.value })}
          placeholder="hero-background"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Used to reference this image in the code
        </p>
      </div>

      <div>
        <Label htmlFor="url">Image URL *</Label>
        <div className="flex gap-2">
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://..."
            required
          />
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <Button type="button" disabled={isUploading}>
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {formData.url && (
        <div className="relative w-full h-48 bg-card rounded overflow-hidden">
          <img
            src={formData.url}
            alt={formData.alt_text || "Preview"}
            className="w-full h-full object-contain"
          />
        </div>
      )}

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

      <div>
        <Label htmlFor="alt_text">Alt Text (for accessibility)</Label>
        <Input
          id="alt_text"
          value={formData.alt_text}
          onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
          placeholder="Description of the image"
        />
      </div>

      <div>
        <Label htmlFor="title">Title (optional)</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="description">Description (optional)</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {image ? "Update Image" : "Add Image"}
        </Button>
      </div>
    </form>
  );
}