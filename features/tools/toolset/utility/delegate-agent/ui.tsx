"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { Input, Output } from "./tool";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, Bot, CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

type DelegateAgentInput = z.infer<typeof Input>;
type DelegateAgentOutput = z.infer<typeof Output>;

interface Agent {
  id: string;
  slug: string;
  name: string;
  description: string | null;
}

/**
 * Result Component
 */
export function Result({ result }: { result: DelegateAgentOutput }) {
  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Task Delegated Successfully
          </CardTitle>
          {result.delegatedTo && (
            <Badge variant="secondary">
              <Bot className="h-3 w-3 mr-1" />
              {result.delegatedTo}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="p-4 bg-muted/50 rounded-lg">{result.answer}</div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Loading Component
 */
export function Loading({
  progressPct,
  note
}: {
  progressPct?: number;
  note?: string;
}) {
  return (
    <Card className="border-border">
      <CardContent className="py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <Bot className="h-8 w-8 text-primary animate-pulse" />
            <Loader2 className="h-12 w-12 text-muted-foreground animate-spin absolute -top-2 -left-2" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-foreground">
              Delegating task to agent...
            </p>
            {note && <p className="text-xs text-muted-foreground">{note}</p>}
            {progressPct !== undefined && (
              <div className="w-48 bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Error Component
 */
export function Error({ error }: { error: Error }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Failed to delegate task: {error?.message}
      </AlertDescription>
    </Alert>
  );
}

/**
 * Input Form Component
 */
export function InputForm({
  onSubmit,
  initialValues
}: {
  onSubmit: (data: DelegateAgentInput) => void;
  initialValues?: Partial<DelegateAgentInput>;
}) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(
    initialValues?.agentSlug || ""
  );
  const [task, setTask] = useState(initialValues?.task || "");
  const [style, setStyle] = useState<"brief" | "detailed">(
    initialValues?.style || "brief"
  );

  // Load available agents
  useEffect(() => {
    const loadAgents = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("ai_agents")
          .select("id, slug, name, description")
          .eq("is_active", true)
          .order("name", { ascending: true });

        if (data) {
          setAgents(data);
        }
      } catch (error) {
        console.error("Error loading agents:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      agentSlug: selectedAgent,
      task,
      style
    });
  };

  const selectedAgentData = agents.find(a => a.slug === selectedAgent);

  // Group agents by system vs custom
  // Since is_system_agent doesn't exist, treat all agents equally
  const allAgents = agents;

  if (loading) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Delegate to Agent</CardTitle>
          <CardDescription className="text-muted-foreground">
            Loading available agents...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bot className="h-5 w-5" />
            Delegate to Agent
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Select an agent to handle a specific task
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Agent Selection */}
          <div className="space-y-2">
            <Label htmlFor="agent">Select Agent</Label>
            <Select
              value={selectedAgent}
              onValueChange={setSelectedAgent}
              required
            >
              <SelectTrigger id="agent" className="w-full">
                <SelectValue placeholder="Choose an agent to delegate to">
                  {selectedAgent && (
                    <div className="flex items-center gap-2">
                      <span>{selectedAgentData?.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {allAgents.map(agent => (
                  <SelectItem key={agent.id} value={agent.slug}>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{agent.name}</span>
                        </div>
                        {agent.description && (
                          <span className="text-xs text-muted-foreground">
                            {agent.description.substring(0, 60)}...
                          </span>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedAgentData && (
              <p className="text-sm text-muted-foreground mt-2">
                {selectedAgentData.description}
              </p>
            )}
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <Label htmlFor="task">Task Description</Label>
            <Textarea
              id="task"
              value={task}
              onChange={e => setTask(e.target.value)}
              placeholder="Describe the task you want the agent to handle..."
              className="min-h-[120px]"
              required
            />
          </div>

          {/* Response Style */}
          <div className="space-y-2">
            <Label>Response Style</Label>
            <RadioGroup
              value={style}
              onValueChange={value => setStyle(value as "brief" | "detailed")}
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="brief" id="brief" />
                <Label htmlFor="brief" className="cursor-pointer flex-1">
                  <div className="font-medium">Brief</div>
                  <div className="text-sm text-muted-foreground">
                    Get a concise, focused response
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="detailed" id="detailed" />
                <Label htmlFor="detailed" className="cursor-pointer flex-1">
                  <div className="font-medium">Detailed</div>
                  <div className="text-sm text-muted-foreground">
                    Get a comprehensive, in-depth response
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!selectedAgent || !task}
          >
            <Bot className="h-4 w-4 mr-2" />
            Delegate Task
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

// Export UI components
const ui = {
  Result,
  Loading,
  Error,
  InputForm
};

export default ui;
