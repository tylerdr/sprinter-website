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
  FolderOpen, Calendar, Clock, Users, Target, DollarSign,
  CheckCircle, AlertTriangle, Plus, Trash2, Edit, Eye,
  AlertCircle, X, TrendingUp
} from "lucide-react";
import type { EntityUI, EntityFormProps, EntityListProps, EntityDetailProps } from "../../types";
import type { Project, CreateProject, UpdateProject } from "./schema";
import { CreateProjectSchema, UpdateProjectSchema } from "./schema";

// Project List View
export function ProjectList({ items, onSelect, onCreate }: EntityListProps<Project>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const filteredProjects = items.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    const matchesPriority = filterPriority === "all" || project.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      planning: "outline",
      active: "default",
      on_hold: "secondary",
      completed: "default",
      cancelled: "destructive"
    };
    const colors: Record<string, string> = {
      planning: "text-gray-600",
      active: "text-green-600",
      on_hold: "text-yellow-600",
      completed: "text-blue-600",
      cancelled: "text-red-600"
    };
    return (
      <Badge variant={variants[status] || "outline"} className={colors[status]}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      low: "text-gray-500",
      medium: "text-blue-500",
      high: "text-orange-500",
      critical: "text-red-500"
    };
    return (
      <span className={`text-xs font-medium ${colors[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search projects..."
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
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="on_hold">On Hold</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onCreate} className="ml-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(project)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </div>
                <div className="flex flex-col gap-1">
                  {getStatusBadge(project.status)}
                  {getPriorityBadge(project.priority)}
                </div>
              </div>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(project.start_date)} - {formatDate(project.end_date)}</span>
                </div>
                {project.budget && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    <span>${project.budget.estimated?.toLocaleString()} estimated</span>
                  </div>
                )}
                {project.team?.members && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{project.team.members.length} member{project.team.members.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No projects found</p>
        </div>
      )}
    </div>
  );
}

// Project Form (Create/Edit)
export function ProjectForm({
  mode,
  initialData,
  onSubmit,
  onCancel
}: EntityFormProps<Project, CreateProject, UpdateProject>) {
  const form = useForm({
    resolver: zodResolver(mode === "create" ? CreateProjectSchema : UpdateProjectSchema),
    defaultValues: initialData || {
      slug: "",
      name: "",
      customer_id: "",
      status: "planning",
      priority: "medium",
      description: "",
      objectives: [],
      deliverables: [],
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      milestones: [],
      team: {
        members: [],
        stakeholders: []
      },
      settings: {
        notifications: true,
        auto_archive: false,
        visibility: "team"
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
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Core project details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Q1 Digital Transformation" />
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
                          <Input {...field} placeholder="q1-digital-transformation" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                            <SelectItem value="planning">Planning</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="on_hold">On Hold</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief description of the project..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional tabs for details, timeline, budget, team... */}
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <CheckCircle className="w-4 h-4 mr-2" />
            {mode === "create" ? "Create Project" : "Update Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Project Detail View
export function ProjectDetail({ item, onEdit, onDelete }: EntityDetailProps<Project>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "active": return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case "on_hold": return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FolderOpen className="w-6 h-6" />
            {item.name}
          </h2>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
        <div className="flex gap-2">
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
              Status & Priority
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Status:</span>
              <p className="font-medium capitalize">{item.status.replace('_', ' ')}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Priority:</span>
              <p className="font-medium capitalize">{item.priority}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Start Date:</span>
              <p className="font-medium">{formatDate(item.start_date)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">End Date:</span>
              <p className="font-medium">{formatDate(item.end_date)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Members:</span>
                <p className="font-medium">{item.team?.members?.length || 0}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Stakeholders:</span>
                <p className="font-medium">{item.team?.stakeholders?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {item.budget && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Estimated</p>
                <p className="text-lg font-bold">${item.budget.estimated?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-lg font-bold">${item.budget.approved?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-lg font-bold">${item.budget.spent?.toLocaleString()}</p>
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
            Are you sure you want to delete this project? This action cannot be undone.
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
export const ProjectUI: EntityUI<Project, CreateProject, UpdateProject> = {
  list: ProjectList,
  form: ProjectForm,
  detail: ProjectDetail,
  icon: FolderOpen,
  displayField: "name",
  searchFields: ["name", "slug", "description"],
};