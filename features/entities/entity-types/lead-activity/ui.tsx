"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Activity,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Bot,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import type { LeadActivity, CreateLeadActivity, ActivityTimelineItem } from "./schema";

interface LeadActivityFormProps {
  form: UseFormReturn<CreateLeadActivity>;
  onSubmit?: (data: CreateLeadActivity) => void;
  isLoading?: boolean;
  leadId?: string;
}

export function LeadActivityForm({ form, onSubmit, isLoading, leadId }: LeadActivityFormProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  // Set leadId if provided
  React.useEffect(() => {
    if (leadId) {
      setValue("leadId", leadId);
    }
  }, [leadId, setValue]);

  return (
    <form onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Activity Details</CardTitle>
          <CardDescription>Record a new activity for this lead</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="activityType">Activity Type *</Label>
            <Select
              value={watch("activityType")}
              onValueChange={(value) => setValue("activityType", value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="email_sent">Email Sent</SelectItem>
                <SelectItem value="phone_call">Phone Call</SelectItem>
                <SelectItem value="text_sent">Text Sent</SelectItem>
                <SelectItem value="meeting_scheduled">Meeting Scheduled</SelectItem>
                <SelectItem value="meeting_completed">Meeting Completed</SelectItem>
                <SelectItem value="note_added">Note Added</SelectItem>
                <SelectItem value="document_requested">Document Requested</SelectItem>
                <SelectItem value="document_received">Document Received</SelectItem>
                <SelectItem value="qualification_changed">Qualification Changed</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
              </SelectContent>
            </Select>
            {errors.activityType && (
              <p className="text-sm text-red-500 mt-1">{errors.activityType.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register("description")}
              disabled={isLoading}
              rows={3}
              placeholder="Describe the activity..."
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={watch("priority")}
                onValueChange={(value) => setValue("priority", value as any)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) => setValue("status", value as any)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {watch("activityType") && ["email_sent", "phone_call", "text_sent", "meeting_completed"].includes(watch("activityType")) && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="communicationType">Communication Type</Label>
                <Select
                  value={watch("communicationType")}
                  onValueChange={(value) => setValue("communicationType", value as any)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="in_person">In Person</SelectItem>
                    <SelectItem value="video_call">Video Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="communicationDirection">Direction</Label>
                <Select
                  value={watch("communicationDirection")}
                  onValueChange={(value) => setValue("communicationDirection", value as any)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbound">Inbound</SelectItem>
                    <SelectItem value="outbound">Outbound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="outcome">Outcome</Label>
            <Textarea
              id="outcome"
              {...register("outcome")}
              disabled={isLoading}
              rows={2}
              placeholder="What was the result?"
            />
          </div>

          <div>
            <Label htmlFor="nextAction">Next Action</Label>
            <Input
              id="nextAction"
              {...register("nextAction")}
              disabled={isLoading}
              placeholder="What should happen next?"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAutomated"
              checked={watch("isAutomated")}
              onCheckedChange={(checked) => setValue("isAutomated", checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="isAutomated">Automated Activity</Label>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

interface ActivityTimelineProps {
  activities: ActivityTimelineItem[];
  onActivityClick?: (activity: ActivityTimelineItem) => void;
}

export function ActivityTimeline({ activities, onActivityClick }: ActivityTimelineProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "email_sent":
      case "email_opened":
      case "email_clicked":
        return <Mail className="h-4 w-4" />;
      case "phone_call":
        return <Phone className="h-4 w-4" />;
      case "text_sent":
        return <MessageSquare className="h-4 w-4" />;
      case "meeting_scheduled":
      case "meeting_completed":
        return <Calendar className="h-4 w-4" />;
      case "document_requested":
      case "document_received":
        return <FileText className="h-4 w-4" />;
      case "qualification_changed":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    if (type.includes("completed") || type.includes("received")) return "text-green-600";
    if (type.includes("scheduled") || type.includes("requested")) return "text-yellow-600";
    if (type.includes("rejected") || type.includes("lost")) return "text-red-600";
    return "text-blue-600";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`relative flex gap-4 pb-4 ${index < activities.length - 1 ? 'border-b' : ''}`}
          >
            {/* Timeline line */}
            {index < activities.length - 1 && (
              <div className="absolute left-5 top-10 bottom-0 w-[2px] bg-gray-200" />
            )}

            {/* Icon */}
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white ${getActivityColor(activity.activityType)}`}>
              {activity.isAutomated ? (
                <Bot className="h-4 w-4" />
              ) : (
                getActivityIcon(activity.activityType)
              )}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {activity.activityType.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                {onActivityClick && (
                  <button
                    onClick={() => onActivityClick(activity)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{formatDate(activity.createdAt)}</span>
                {activity.createdBy && (
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{activity.createdBy.name}</span>
                  </div>
                )}
                {activity.isAutomated && (
                  <Badge variant="secondary" className="text-xs">
                    Automated
                  </Badge>
                )}
              </div>

              {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                <div className="mt-2 rounded-md bg-gray-50 p-2">
                  <dl className="text-xs">
                    {Object.entries(activity.metadata).map(([key, value]) => (
                      <div key={key} className="flex gap-2">
                        <dt className="font-medium capitalize">{key.replace(/_/g, " ")}:</dt>
                        <dd>{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

interface LeadActivityDisplayProps {
  activity: LeadActivity;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function LeadActivityDisplay({ activity, showActions, onEdit, onDelete }: LeadActivityDisplayProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "default";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in_progress": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "pending": return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(activity.status)}
              {activity.activityType.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
            </CardTitle>
            <CardDescription>{activity.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {activity.priority && (
              <Badge variant={getPriorityColor(activity.priority)}>
                {activity.priority.toUpperCase()}
              </Badge>
            )}
            {showActions && (
              <div className="flex gap-2">
                {onEdit && (
                  <button onClick={onEdit} className="text-sm text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button onClick={onDelete} className="text-sm text-red-600 hover:text-red-800">
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          {activity.communicationType && (
            <div>
              <dt className="text-gray-500">Communication</dt>
              <dd className="font-medium capitalize">
                {activity.communicationType} ({activity.communicationDirection})
              </dd>
            </div>
          )}
          {activity.communicationDuration && (
            <div>
              <dt className="text-gray-500">Duration</dt>
              <dd className="font-medium">{activity.communicationDuration} minutes</dd>
            </div>
          )}
          {activity.outcome && (
            <div className="col-span-2">
              <dt className="text-gray-500 mb-1">Outcome</dt>
              <dd className="font-medium">{activity.outcome}</dd>
            </div>
          )}
          {activity.nextAction && (
            <div className="col-span-2">
              <dt className="text-gray-500 mb-1">Next Action</dt>
              <dd className="font-medium">{activity.nextAction}</dd>
            </div>
          )}
          <div>
            <dt className="text-gray-500">Created</dt>
            <dd className="font-medium">
              {new Date(activity.createdAt).toLocaleDateString()}
            </dd>
          </div>
          {activity.completedAt && (
            <div>
              <dt className="text-gray-500">Completed</dt>
              <dd className="font-medium">
                {new Date(activity.completedAt).toLocaleDateString()}
              </dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}

export default {
  Form: LeadActivityForm,
  Timeline: ActivityTimeline,
  Display: LeadActivityDisplay
};