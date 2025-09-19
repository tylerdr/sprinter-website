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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Users, Mail, Phone, MapPin, Calendar, Clock,
  Shield, Settings, Award, Languages, Plus,
  Trash2, Edit, Eye, AlertCircle, X, CheckCircle,
  Briefcase, GraduationCap, Star, Activity
} from "lucide-react";
import type { EntityUI, EntityFormProps, EntityListProps, EntityDetailProps } from "../../types";
import type { TeamMember, CreateTeamMember, UpdateTeamMember } from "./schema";
import { CreateTeamMemberSchema, UpdateTeamMemberSchema } from "./schema";

// Team Member List View
export function TeamMemberList({ items, onSelect, onCreate }: EntityListProps<TeamMember>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");

  const filteredMembers = items.filter(member => {
    const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || member.status === filterStatus;
    const matchesRole = filterRole === "all" || member.role === filterRole;
    const matchesDepartment = filterDepartment === "all" || member.profile?.department === filterDepartment;
    return matchesSearch && matchesStatus && matchesRole && matchesDepartment;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      active: "default",
      inactive: "outline",
      pending: "secondary",
      suspended: "destructive"
    };
    const colors: Record<string, string> = {
      active: "text-green-600",
      inactive: "text-gray-600",
      pending: "text-blue-600",
      suspended: "text-red-600"
    };
    return (
      <Badge variant={variants[status] || "outline"} className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      owner: "text-purple-600",
      admin: "text-red-600",
      manager: "text-blue-600",
      member: "text-green-600",
      viewer: "text-gray-600"
    };
    return (
      <Badge variant="outline" className={colors[role]}>
        {role}
      </Badge>
    );
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatLastActivity = (dateString?: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="product">Product</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onCreate} className="ml-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Team Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(member)}
          >
            <CardHeader>
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={member.profile?.avatar_url} />
                  <AvatarFallback>
                    {getInitials(member.first_name, member.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {member.first_name} {member.last_name}
                      </CardTitle>
                      <CardDescription className="truncate">
                        {member.profile?.title || "Team Member"}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-1">
                      {getStatusBadge(member.status)}
                      {getRoleBadge(member.role)}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{member.email}</span>
                </div>
                {member.profile?.department && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-3 h-3" />
                    <span className="capitalize">{member.profile.department}</span>
                  </div>
                )}
                {member.skills && member.skills.length > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-3 h-3" />
                    <span>{member.skills.length} skill{member.skills.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="w-3 h-3" />
                  <span>Last active: {formatLastActivity(member.activity?.last_activity)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No team members found</p>
        </div>
      )}
    </div>
  );
}

// Team Member Form (Create/Edit)
export function TeamMemberForm({
  mode,
  initialData,
  onSubmit,
  onCancel
}: EntityFormProps<TeamMember, CreateTeamMember, UpdateTeamMember>) {
  const form = useForm({
    resolver: zodResolver(mode === "create" ? CreateTeamMemberSchema : UpdateTeamMemberSchema),
    defaultValues: initialData || {
      user_id: "",
      email: "",
      first_name: "",
      last_name: "",
      role: "member",
      status: "active",
      profile: {},
      contact: {},
      skills: [],
      certifications: [],
      languages: [],
      permissions: {
        can_create_projects: false,
        can_manage_team: false,
        can_view_financials: false,
        can_approve_invoices: false,
        custom: {}
      },
      activity: {
        total_hours: 0,
        projects_completed: 0
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
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Core team member details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="john.doe@company.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
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
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
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

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Additional profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="profile.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Software Engineer" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="profile.department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="hr">HR</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="profile.location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="San Francisco, CA" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="profile.timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="America/Los_Angeles" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="profile.bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief bio or description..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional tabs for contact, skills, permissions... */}
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <CheckCircle className="w-4 h-4 mr-2" />
            {mode === "create" ? "Add Member" : "Update Member"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Team Member Detail View
export function TeamMemberDetail({ item, onEdit, onDelete }: EntityDetailProps<TeamMember>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending": return <Clock className="w-5 h-5 text-blue-600" />;
      case "suspended": return <Shield className="w-5 h-5 text-red-600" />;
      default: return <Users className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={item.profile?.avatar_url} />
            <AvatarFallback className="text-lg">
              {getInitials(item.first_name, item.last_name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {item.first_name} {item.last_name}
            </h2>
            <p className="text-muted-foreground">{item.profile?.title || "Team Member"}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="capitalize">{item.role}</Badge>
              <Badge variant="outline" className="capitalize">{item.status}</Badge>
            </div>
          </div>
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
            Remove
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Email:</span>
              <p className="font-medium">{item.email}</p>
            </div>
            {item.contact?.phone && (
              <div>
                <span className="text-sm text-muted-foreground">Phone:</span>
                <p className="font-medium">{item.contact.phone}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Department:</span>
              <p className="font-medium capitalize">{item.profile?.department || "N/A"}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Location:</span>
              <p className="font-medium">{item.profile?.location || "N/A"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Last Login:</span>
              <p className="font-medium">{formatDate(item.activity?.last_login)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Total Hours:</span>
              <p className="font-medium">{item.activity?.total_hours || 0}h</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="w-4 h-4" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{item.skills?.length || 0} skills</p>
            <p className="text-sm text-muted-foreground">
              {item.certifications?.length || 0} certifications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Skills & Expertise */}
      {item.skills && item.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {item.skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{skill.level}</p>
                  </div>
                  {skill.years && (
                    <Badge variant="outline">{skill.years} years</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Create Projects</span>
                <Badge variant={item.permissions?.can_create_projects ? "default" : "outline"}>
                  {item.permissions?.can_create_projects ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Manage Team</span>
                <Badge variant={item.permissions?.can_manage_team ? "default" : "outline"}>
                  {item.permissions?.can_manage_team ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">View Financials</span>
                <Badge variant={item.permissions?.can_view_financials ? "default" : "outline"}>
                  {item.permissions?.can_view_financials ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Approve Invoices</span>
                <Badge variant={item.permissions?.can_approve_invoices ? "default" : "outline"}>
                  {item.permissions?.can_approve_invoices ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Are you sure you want to remove this team member? This action cannot be undone.
            <div className="flex gap-2 mt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onDelete();
                  setShowDeleteConfirm(false);
                }}
              >
                Remove
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
export const TeamMemberUI: EntityUI<TeamMember, CreateTeamMember, UpdateTeamMember> = {
  list: TeamMemberList,
  form: TeamMemberForm,
  detail: TeamMemberDetail,
  icon: Users,
  displayField: "first_name",
  searchFields: ["first_name", "last_name", "email"],
};