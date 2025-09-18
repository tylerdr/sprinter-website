"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  FileSearch, 
  HelpCircle, 
  PenTool,
  Sparkles,
  Save,
  RotateCcw,
  FileText
} from "lucide-react";
import { toast } from "sonner";

interface AgentToolManagerProps {
  agentId: string;
  agentType?: string;
  currentTools: string[];
  onSave: (tools: string[]) => Promise<void>;
}

// Map categories to icons
const categoryIcons: Record<string, any> = {
  search: FileSearch,
  calculator: Calculator,
  document: FileText,
  content: PenTool,
  utility: Sparkles,
};

export function AgentToolManager({ 
  agentId, 
  agentType = "general",
  currentTools, 
  onSave 
}: AgentToolManagerProps) {
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set(currentTools));
  const [availableTools, setAvailableTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTools, setLoadingTools] = useState(true);

  useEffect(() => {
    // Load available tools from the registry/database
    const loadTools = async () => {
      try {
        const response = await fetch('/api/tools/list');
        if (response.ok) {
          const tools = await response.json();
          setAvailableTools(tools);
        }
      } catch (error) {
        console.error('Failed to load tools:', error);
      } finally {
        setLoadingTools(false);
      }
    };

    loadTools();
  }, []);

  const handleToggle = (toolSlug: string) => {
    const newSelection = new Set(selectedTools);
    if (newSelection.has(toolSlug)) {
      newSelection.delete(toolSlug);
    } else {
      newSelection.add(toolSlug);
    }
    setSelectedTools(newSelection);
  };

  const handleSelectAll = () => {
    const allToolSlugs = availableTools.map(t => t.slug);
    setSelectedTools(new Set(allToolSlugs));
    toast.success("All tools selected");
  };

  const handleClearAll = () => {
    setSelectedTools(new Set());
    toast.success("All tools cleared");
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(Array.from(selectedTools));
      toast.success("Tool configuration saved");
    } catch (error) {
      toast.error("Failed to save configuration");
    } finally {
      setLoading(false);
    }
  };

  // Group tools by category
  const toolsByCategory = availableTools.reduce((acc, tool) => {
    const category = tool.category || 'utility';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, any[]>);

  if (loadingTools) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">Loading tools...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Tool Configuration</CardTitle>
        <CardDescription>
          Select the tools this agent should have access to
        </CardDescription>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={handleSelectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={Object.keys(toolsByCategory)[0] || 'all'}>
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${Object.keys(toolsByCategory).length}, 1fr)` }}>
            {Object.keys(toolsByCategory).map(category => {
              const Icon = categoryIcons[category] || Sparkles;
              const selectedCount = toolsByCategory[category].filter((t: any) => selectedTools.has(t.slug)).length;
              const totalCount = toolsByCategory[category].length;
              
              return (
                <TabsTrigger key={category} value={category}>
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="capitalize">{category}</span>
                  <Badge variant="secondary" className="ml-2">
                    {selectedCount}/{totalCount}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {Object.entries(toolsByCategory).map(([category, tools]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid gap-3">
                {(tools as any[]).map((tool: any) => (
                  <div key={tool.slug} className="flex items-start space-x-3">
                    <Checkbox
                      id={tool.slug}
                      checked={selectedTools.has(tool.slug)}
                      onCheckedChange={() => handleToggle(tool.slug)}
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={tool.slug}
                        className="text-sm font-medium cursor-pointer hover:underline"
                      >
                        {tool.name}
                      </label>
                      {tool.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {tool.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}