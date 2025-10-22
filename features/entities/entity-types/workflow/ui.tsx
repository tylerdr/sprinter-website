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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  GitBranch, Play, Pause, Square, Clock, Zap,
  CheckCircle, AlertTriangle, BarChart3, Settings,
  Plus, Trash2, Edit, Eye, AlertCircle, X,
  Calendar, Timer, Activity, TrendingUp
} from "lucide-react";
import type { EntityUI, EntityFormProps, EntityListProps, EntityDetailProps } from "../../types";
import type { Workflow, CreateWorkflow, UpdateWorkflow } from "./schema";
import { CreateWorkflowSchema, UpdateWorkflowSchema } from "./schema";

// Workflow List View
export function WorkflowList({ items, onSelect, onCreate }: EntityListProps<Workflow>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterTriggerType, setFilterTriggerType] = useState<string>("all");

  const filteredWorkflows = items.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          workflow.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || workflow.status === filterStatus;
    const matchesTrigger = filterTriggerType === "all" || workflow.trigger.type === filterTriggerType;
    return matchesSearch && matchesStatus && matchesTrigger;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      draft: "outline",
      active: "default",
      paused: "secondary",
      completed: "default",
      archived: "outline"
    };
    const colors: Record<string, string> = {
      draft: "text-gray-600",
      active: "text-green-600",
      paused: "text-yellow-600",
      completed: "text-blue-600",
      archived: "text-gray-500"
    };
    return (
      <Badge variant={variants[status] || "outline"} className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const getTriggerIcon = (triggerType: string) => {
    const icons: Record<string, any> = {
      manual: Play,
      schedule: Calendar,
      event: Zap,
      webhook: Activity,
      api: Settings
    };
    const Icon = icons[triggerType] || Play;
    return <Icon className="w-4 h-4" />;
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${Math.round(ms / 1000)}s`;
    return `${Math.round(ms / 60000)}m`;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search workflows..."
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
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterTriggerType} onValueChange={setFilterTriggerType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Triggers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Triggers</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="schedule">Schedule</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="webhook">Webhook</SelectItem>
            <SelectItem value="api">API</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onCreate} className="ml-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Workflow
        </Button>
      </div>

      {/* Workflow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkflows.map((workflow) => (
          <Card
            key={workflow.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(workflow)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{workflow.name}</CardTitle>
                </div>
                {getStatusBadge(workflow.status)}
              </div>
              <CardDescription className="line-clamp-2">
                {workflow.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  {getTriggerIcon(workflow.trigger.type)}
                  <span className="capitalize">{workflow.trigger.type}</span>
                  {workflow.trigger.schedule && (
                    <>
                      <span>•</span>
                      <span>{workflow.trigger.schedule}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Settings className="w-3 h-3" />
                  <span>{workflow.steps?.length || 0} steps</span>
                </div>
                {workflow.stats && (
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{workflow.stats.total_runs} runs</span>
                    </div>
                    {workflow.stats.average_duration_ms > 0 && (
                      <div className="flex items-center gap-1">
                        <Timer className="w-3 h-3" />
                        <span>{formatDuration(workflow.stats.average_duration_ms)} avg</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No workflows found</p>
        </div>
      )}
    </div>
  );
}

// Workflow Form (Create/Edit)
export function WorkflowForm({
  mode,
  initialData,
  onSubmit,
  onCancel
}: EntityFormProps<Workflow, CreateWorkflow, UpdateWorkflow>) {
  const form = useForm({
    resolver: zodResolver(mode === "create" ? CreateWorkflowSchema : UpdateWorkflowSchema),
    defaultValues: initialData || {
      slug: "",
      name: "",
      status: "draft",
      description: "",
      trigger: {
        type: "manual",
        config: {},
        events: []
      },
      steps: [],
      variables: {},
      settings: {
        timeout: 3600,
        max_retries: 3,
        parallel_execution: false,
        notifications: {
          on_success: false,
          on_failure: true,
          recipients: []
        }
      },
      stats: {
        total_runs: 0,
        successful_runs: 0,
        failed_runs: 0,
        average_duration_ms: 0
      },
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
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="trigger">Trigger</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Core workflow details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workflow Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Document Processing Pipeline" />
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
                          <Input {...field} placeholder="document-processing-pipeline" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief description of the workflow..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trigger" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trigger Configuration</CardTitle>
                <CardDescription>Configure when the workflow should run</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="trigger.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trigger Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select trigger type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="schedule">Schedule</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="webhook">Webhook</SelectItem>
                          <SelectItem value="api">API</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Schedule field for schedule trigger */}
                <FormField
                  control={form.control}
                  name="trigger.schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule (Cron)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="0 9 * * 1-5" />
                      </FormControl>
                      <FormDescription>
                        Cron expression for scheduled execution (e.g., "0 9 * * 1-5" for weekdays at 9 AM)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional tabs for steps, settings, history... */}
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <CheckCircle className="w-4 h-4 mr-2" />
            {mode === "create" ? "Create Workflow" : "Update Workflow"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Workflow Detail View
export function WorkflowDetail({ item, onEdit, onDelete }: EntityDetailProps<Workflow>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Play className="w-5 h-5 text-green-600" />;
      case "paused": return <Pause className="w-5 h-5 text-yellow-600" />;
      case "completed": return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case "archived": return <Square className="w-5 h-5 text-gray-600" />;
      default: return <GitBranch className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${Math.round(ms / 1000)}s`;
    return `${Math.round(ms / 60000)}m`;
  };

  const getSuccessRate = () => {
    if (!item.stats || item.stats.total_runs === 0) return 0;
    return Math.round((item.stats.successful_runs / item.stats.total_runs) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GitBranch className="w-6 h-6" />
            {item.name}
          </h2>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Run Now
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {getStatusIcon(item.status)}
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium capitalize">{item.status}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Trigger
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium capitalize">{item.trigger.type}</p>
            {item.trigger.schedule && (
              <p className="text-xs text-muted-foreground">{item.trigger.schedule}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{item.steps?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{getSuccessRate()}%</p>
          </CardContent>
        </Card>
      </div>

      {item.stats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Execution Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Runs</p>
                <p className="text-2xl font-bold">{item.stats.total_runs}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold text-green-600">{item.stats.successful_runs}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{item.stats.failed_runs}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
                <p className="text-2xl font-bold">{formatDuration(item.stats.average_duration_ms)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {item.last_run && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Last Execution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Started:</span>
                <span className="font-medium">
                  {new Date(item.last_run.started_at).toLocaleString()}
                </span>
              </div>
              {item.last_run.completed_at && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completed:</span>
                  <span className="font-medium">
                    {new Date(item.last_run.completed_at).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge 
                  variant={item.last_run.status === "completed" ? "default" : 
                          item.last_run.status === "failed" ? "destructive" : "secondary"}
                >
                  {item.last_run.status}
                </Badge>
              </div>
              {item.last_run.error && (
                <div className="mt-2">
                  <span className="text-sm text-muted-foreground">Error:</span>
                  <p className="text-sm text-red-600 mt-1">{item.last_run.error}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Are you sure you want to delete this workflow? This action cannot be undone.
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
export const WorkflowUI: EntityUI<Workflow, CreateWorkflow, UpdateWorkflow> = {
  list: WorkflowList,
  form: WorkflowForm,
  detail: WorkflowDetail,
  icon: GitBranch,
  displayField: "name",
  searchFields: ["name", "slug", "description"],
};