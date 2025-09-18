"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
// import { updateTool } from "@/app/(admin)/admin/tools/actions";
import { toast } from "sonner";

interface ToolEditDialogProps {
  tool: {
    slug: string;
    name: string;
    description: string;
    category?: string;
    isActive?: boolean;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
}

const TOOL_CATEGORIES = [
  "Search & Data",
  "Calculations",
  "Content",
  "Utility",
  "External Data",
  "Analysis",
  "Uncategorized"
];

export function ToolEditDialog({
  tool,
  open,
  onOpenChange,
  onSave
}: ToolEditDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    is_active: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (tool) {
      setFormData({
        name: tool.name,
        description: tool.description,
        category: tool.category || "Uncategorized",
        is_active: tool.isActive !== false
      });
    }
  }, [tool]);

  const handleSave = async () => {
    if (!tool) return;

    setSaving(true);
    try {
      // TODO: Implement updateTool when admin functionality is needed
      // await updateTool({
      //   slug: tool.slug,
      //   name: formData.name,
      //   description: formData.description,
      //   category: formData.category,
      //   is_active: formData.is_active
      // });

      toast.success(`Tool "${formData.name}" would be updated (admin not implemented)`);
      onOpenChange(false);
      onSave?.();
    } catch (error) {
      console.error("Failed to save tool:", error);
      toast.error("Failed to update tool");
    } finally {
      setSaving(false);
    }
  };

  if (!tool) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Tool: {tool.name}</DialogTitle>
          <DialogDescription>
            Update the tool configuration. These changes will override
            code-defined defaults.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Basic Information */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Tool display name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                placeholder="Describe what this tool does..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={value =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {TOOL_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tool Information (Read-only) */}
          <div className="grid gap-2">
            <Label className="text-muted-foreground">Tool Slug (ID)</Label>
            <div className="px-3 py-2 bg-muted rounded-md font-mono text-sm">
              {tool.slug}
            </div>
            <p className="text-xs text-muted-foreground">
              This identifier cannot be changed as it's used in code references.
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="is_active">Active</Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable this tool for AI agents
              </p>
            </div>
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={checked =>
                setFormData({ ...formData, is_active: checked })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
