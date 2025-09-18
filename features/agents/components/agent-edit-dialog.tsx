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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { AgentConfig } from "@/features/agents/registry";
import { getModelMetadata, MODEL_REGISTRY } from "@/features/ai/models";

interface AgentEditDialogProps {
  agent: AgentConfig | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (agent: Partial<AgentConfig>) => Promise<void>;
  availableTools: Array<{ slug: string; name: string }>;
}

export function AgentEditDialog({
  agent,
  open,
  onOpenChange,
  onSave,
  availableTools
}: AgentEditDialogProps) {
  const [formData, setFormData] = useState<Partial<AgentConfig>>({});
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name,
        description: agent.description,
        model: agent.model,
        temperature: agent.temperature,
        maxOutputTokens: agent.maxOutputTokens,
        maxSteps: agent.maxSteps,
        systemPrompt: agent.systemPrompt,
        icon: agent.icon,
        isActive: agent.isActive
      });
      setSelectedTools(agent.tools || []);
    }
  }, [agent]);

  const handleSave = async () => {
    if (!agent) return;

    setSaving(true);
    try {
      await onSave({
        ...formData,
        id: agent.id,
        slug: agent.slug,
        tools: selectedTools
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save agent:", error);
    } finally {
      setSaving(false);
    }
  };

  const toggleTool = (toolSlug: string) => {
    setSelectedTools(prev =>
      prev.includes(toolSlug)
        ? prev.filter(t => t !== toolSlug)
        : [...prev, toolSlug]
    );
  };

  const availableModels = Object.keys(MODEL_REGISTRY).map(id => ({
    id,
    name: id
      .replace(":", " ")
      .replace(/-/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase())
  }));

  if (!agent) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{agent.icon || "🤖"}</span>
            Edit Agent: {agent.name}
          </DialogTitle>
          <DialogDescription>
            Customize the agent configuration. Changes will override
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
                value={formData.name || ""}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="icon">Icon (Emoji)</Label>
              <Input
                id="icon"
                value={formData.icon || ""}
                onChange={e =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                placeholder="🤖"
                className="w-24"
              />
            </div>
          </div>

          {/* Model Configuration */}
          <div className="grid gap-4">
            <h3 className="text-sm font-semibold">Model Configuration</h3>

            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Select
                value={formData.model || ""}
                onValueChange={value =>
                  setFormData({ ...formData, model: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={formData.temperature || 0.7}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      temperature: parseFloat(e.target.value)
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maxOutputTokens">Max Tokens</Label>
                <Input
                  id="maxOutputTokens"
                  type="number"
                  min="100"
                  max="100000"
                  value={formData.maxOutputTokens || ""}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      maxOutputTokens: parseInt(e.target.value) || undefined
                    })
                  }
                  placeholder="Default"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maxSteps">Max Tool Calls</Label>
              <Input
                id="maxSteps"
                type="number"
                min="1"
                max="20"
                value={formData.maxSteps || 5}
                onChange={e =>
                  setFormData({
                    ...formData,
                    maxSteps: parseInt(e.target.value)
                  })
                }
              />
            </div>
          </div>

          {/* System Prompt */}
          <div className="grid gap-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              value={formData.systemPrompt || ""}
              onChange={e =>
                setFormData({
                  ...formData,
                  systemPrompt: e.target.value
                })
              }
              rows={6}
              className="font-mono text-xs"
              placeholder="Enter the system prompt for this agent..."
            />
          </div>

          {/* Tools Selection */}
          <div className="grid gap-2">
            <Label>Available Tools ({selectedTools.length} selected)</Label>
            <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {availableTools.map(tool => {
                  const isSelected = selectedTools.includes(tool.slug);
                  return (
                    <Badge
                      key={tool.slug}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer select-none"
                      onClick={() => toggleTool(tool.slug)}
                    >
                      {tool.name}
                      {isSelected && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Active</Label>
            <Switch
              id="isActive"
              checked={formData.isActive !== false}
              onCheckedChange={checked =>
                setFormData({ ...formData, isActive: checked })
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
