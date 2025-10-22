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
  Building2, Users, Mail, Phone, MapPin, Globe,
  DollarSign, Calendar, Plus, Trash2, Edit, Eye,
  CheckCircle, AlertCircle, X
} from "lucide-react";
import type { EntityUI, EntityFormProps, EntityListProps, EntityDetailProps } from "../../types";
import type { Customer, CreateCustomer, UpdateCustomer } from "./schema";
import { CreateCustomerSchema, UpdateCustomerSchema } from "./schema";

// Customer List View
export function CustomerList({ items, onSelect, onCreate }: EntityListProps<Customer>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredCustomers = items.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus;
    const matchesType = filterType === "all" || customer.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      lead: "outline",
      prospect: "secondary",
      active: "default",
      churned: "destructive",
      suspended: "destructive"
    };
    const colors: Record<string, string> = {
      lead: "text-gray-600",
      prospect: "text-blue-600",
      active: "text-green-600",
      churned: "text-red-600",
      suspended: "text-orange-600"
    };
    return (
      <Badge variant={variants[status] || "outline"} className={colors[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search customers..."
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
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="churned">Churned</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
            <SelectItem value="mid-market">Mid-Market</SelectItem>
            <SelectItem value="smb">SMB</SelectItem>
            <SelectItem value="startup">Startup</SelectItem>
            <SelectItem value="individual">Individual</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onCreate} className="ml-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Customer
        </Button>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <Card
            key={customer.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(customer)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{customer.name}</CardTitle>
                </div>
                {getStatusBadge(customer.status)}
              </div>
              <CardDescription>
                {customer.type} • {customer.company_info?.industry || "N/A"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {customer.company_info?.website && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-3 h-3" />
                    <span>{customer.company_info.website}</span>
                  </div>
                )}
                {customer.contacts && customer.contacts.length > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{customer.contacts.length} contact{customer.contacts.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No customers found</p>
        </div>
      )}
    </div>
  );
}

// Customer Form (Create/Edit)
export function CustomerForm({
  mode,
  initialData,
  onSubmit,
  onCancel
}: EntityFormProps<Customer, CreateCustomer, UpdateCustomer>) {
  const form = useForm({
    resolver: zodResolver(mode === "create" ? CreateCustomerSchema : UpdateCustomerSchema),
    defaultValues: initialData || {
      slug: "",
      name: "",
      type: "mid-market",
      status: "lead",
      company_info: {},
      billing_info: {},
      contacts: [],
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
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Core customer details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Acme Corporation" />
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
                          <Input {...field} placeholder="acme-corp" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                            <SelectItem value="mid-market">Mid-Market</SelectItem>
                            <SelectItem value="smb">SMB</SelectItem>
                            <SelectItem value="startup">Startup</SelectItem>
                            <SelectItem value="individual">Individual</SelectItem>
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
                            <SelectItem value="lead">Lead</SelectItem>
                            <SelectItem value="prospect">Prospect</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="churned">Churned</SelectItem>
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

          {/* Additional tabs for company, billing, contacts... */}
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <CheckCircle className="w-4 h-4 mr-2" />
            {mode === "create" ? "Create Customer" : "Update Customer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Customer Detail View
export function CustomerDetail({ item, onEdit, onDelete }: EntityDetailProps<Customer>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            {item.name}
          </h2>
          <p className="text-muted-foreground">
            {item.type} • {item.status}
          </p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Legal Name:</span>
              <p className="font-medium">{item.company_info?.legal_name || item.name}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Industry:</span>
              <p className="font-medium">{item.company_info?.industry || "N/A"}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Website:</span>
              <p className="font-medium">{item.company_info?.website || "N/A"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            {item.contacts && item.contacts.length > 0 ? (
              <div className="space-y-2">
                {item.contacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{contact.name} - {contact.email}</span>
                    {contact.is_primary && (
                      <Badge variant="secondary" className="text-xs">Primary</Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No contacts added</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Are you sure you want to delete this customer? This action cannot be undone.
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
export const CustomerUI: EntityUI<Customer, CreateCustomer, UpdateCustomer> = {
  list: CustomerList,
  form: CustomerForm,
  detail: CustomerDetail,
  icon: Building2,
  displayField: "name",
  searchFields: ["name", "slug", "company_info.legal_name"],
};