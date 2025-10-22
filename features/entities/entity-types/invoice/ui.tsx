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
  Receipt, DollarSign, Calendar, Send, Eye, Download,
  CheckCircle, AlertTriangle, Clock, CreditCard,
  Plus, Trash2, Edit, AlertCircle, X, FileText,
  TrendingUp, Users, Building
} from "lucide-react";
import type { EntityUI, EntityFormProps, EntityListProps, EntityDetailProps } from "../../types";
import type { Invoice, CreateInvoice, UpdateInvoice } from "./schema";
import { CreateInvoiceSchema, UpdateInvoiceSchema } from "./schema";

// Invoice List View
export function InvoiceList({ items, onSelect, onCreate }: EntityListProps<Invoice>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredInvoices = items.filter(invoice => {
    const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          invoice.billing_details?.bill_to?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      draft: "outline",
      sent: "secondary",
      viewed: "secondary",
      paid: "default",
      overdue: "destructive",
      cancelled: "destructive",
      refunded: "outline"
    };
    const colors: Record<string, string> = {
      draft: "text-gray-600",
      sent: "text-blue-600",
      viewed: "text-purple-600",
      paid: "text-green-600",
      overdue: "text-red-600",
      cancelled: "text-red-600",
      refunded: "text-orange-600"
    };
    return (
      <Badge variant={variants[status] || "outline"} className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = (invoice: Invoice) => {
    if (invoice.status === 'paid') return false;
    return new Date(invoice.due_date) < new Date();
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search invoices..."
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
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="viewed">Viewed</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onCreate} className="ml-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Invoice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInvoices.map((invoice) => (
          <Card
            key={invoice.id}
            className={`cursor-pointer hover:shadow-lg transition-shadow ${
              isOverdue(invoice) ? 'border-red-200 bg-red-50/30' : ''
            }`}
            onClick={() => onSelect(invoice)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{invoice.invoice_number}</CardTitle>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  {getStatusBadge(invoice.status)}
                  {isOverdue(invoice) && invoice.status !== 'paid' && (
                    <Badge variant="destructive" className="text-xs">Overdue</Badge>
                  )}
                </div>
              </div>
              <CardDescription>
                {invoice.billing_details?.bill_to?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-bold text-lg">{formatCurrency(invoice.amounts.total)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Due:</span>
                  <span className={isOverdue(invoice) && invoice.status !== 'paid' ? 'text-red-600 font-medium' : ''}>
                    {formatDate(invoice.due_date)}
                  </span>
                </div>
                {invoice.amounts.balance > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Balance:</span>
                    <span className="font-medium">{formatCurrency(invoice.amounts.balance)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-3 h-3" />
                  <span>{invoice.line_items.length} item{invoice.line_items.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Receipt className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No invoices found</p>
        </div>
      )}
    </div>
  );
}

// Invoice Form (Create/Edit)
export function InvoiceForm({
  mode,
  initialData,
  onSubmit,
  onCancel
}: EntityFormProps<Invoice, CreateInvoice, UpdateInvoice>) {
  const form = useForm({
    resolver: zodResolver(mode === "create" ? CreateInvoiceSchema : UpdateInvoiceSchema),
    defaultValues: initialData || {
      invoice_number: "",
      customer_id: "",
      status: "draft",
      issue_date: new Date().toISOString(),
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      line_items: [],
      amounts: {
        subtotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
        paid: 0,
        balance: 0
      },
      payment_terms: {
        days: 30
      },
      billing_details: {
        bill_to: {
          name: "",
          address: ""
        },
        bill_from: {
          name: "",
          address: ""
        }
      },
      payments: [],
      attachments: [],
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
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>Basic invoice information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="invoice_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="INV-2024-001" />
                        </FormControl>
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
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="viewed">Viewed</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
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
                    name="issue_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Date</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="date" 
                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                            onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="due_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="date" 
                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                            onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional tabs for items, billing, payment, attachments... */}
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <CheckCircle className="w-4 h-4 mr-2" />
            {mode === "create" ? "Create Invoice" : "Update Invoice"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Invoice Detail View
export function InvoiceDetail({ item, onEdit, onDelete }: EntityDetailProps<Invoice>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "sent": return <Send className="w-5 h-5 text-blue-600" />;
      case "overdue": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "viewed": return <Eye className="w-5 h-5 text-purple-600" />;
      default: return <Receipt className="w-5 h-5 text-gray-600" />;
    }
  };

  const isOverdue = () => {
    if (item.status === 'paid') return false;
    return new Date(item.due_date) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Receipt className="w-6 h-6" />
            {item.invoice_number}
          </h2>
          <p className="text-muted-foreground">
            {item.billing_details?.bill_to?.name}
          </p>
          {isOverdue() && (
            <Badge variant="destructive" className="mt-2">Overdue</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download
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
              <DollarSign className="w-4 h-4" />
              Total Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-lg">{formatCurrency(item.amounts.total)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Due Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`font-medium ${
              isOverdue() ? 'text-red-600' : ''
            }`}>
              {formatDate(item.due_date)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Balance Due
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-lg">
              {formatCurrency(item.amounts.balance)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Line Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {item.line_items.map((lineItem, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <p className="font-medium">{lineItem.description}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {lineItem.quantity} × {formatCurrency(lineItem.rate)}
                  </p>
                </div>
                <p className="font-bold">{formatCurrency(lineItem.amount)}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(item.amounts.subtotal)}</span>
            </div>
            {item.amounts.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-{formatCurrency(item.amounts.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>{formatCurrency(item.amounts.tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(item.amounts.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      {item.payments && item.payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {item.payments.map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">{formatDate(payment.date)}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.method} {payment.reference && `• ${payment.reference}`}
                    </p>
                  </div>
                  <p className="font-bold text-green-600">{formatCurrency(payment.amount)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Are you sure you want to delete this invoice? This action cannot be undone.
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
export const InvoiceUI: EntityUI<Invoice, CreateInvoice, UpdateInvoice> = {
  list: InvoiceList,
  form: InvoiceForm,
  detail: InvoiceDetail,
  icon: Receipt,
  displayField: "invoice_number",
  searchFields: ["invoice_number", "billing_details.bill_to.name"],
};