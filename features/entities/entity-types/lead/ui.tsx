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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Home, DollarSign, Clock, MessageSquare, TrendingUp } from "lucide-react";
import type { Lead, CreateLead } from "./schema";

interface LeadFormProps {
  form: UseFormReturn<CreateLead>;
  onSubmit?: (data: CreateLead) => void;
  isLoading?: boolean;
}

export function LeadForm({ form, onSubmit, isLoading }: LeadFormProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <form onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>Basic contact details for the lead</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="preferredContact">Preferred Contact Method</Label>
            <Select
              value={watch("preferredContact")}
              onValueChange={(value) => setValue("preferredContact", value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="text">Text</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Loan Details
          </CardTitle>
          <CardDescription>Information about the loan they're seeking</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="loanPurpose">Loan Purpose *</Label>
            <Select
              value={watch("loanPurpose")}
              onValueChange={(value) => setValue("loanPurpose", value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="refinance">Refinance</SelectItem>
                <SelectItem value="cash-out">Cash-Out</SelectItem>
                <SelectItem value="heloc">HELOC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="propertyType">Property Type *</Label>
            <Select
              value={watch("propertyType")}
              onValueChange={(value) => setValue("propertyType", value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single-family">Single Family</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="multi-family">Multi-Family</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="occupancy">Occupancy *</Label>
            <Select
              value={watch("occupancy")}
              onValueChange={(value) => setValue("occupancy", value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select occupancy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary Residence</SelectItem>
                <SelectItem value="secondary">Secondary Home</SelectItem>
                <SelectItem value="investment">Investment Property</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timeframe">Timeframe *</Label>
            <Select
              value={watch("timeframe")}
              onValueChange={(value) => setValue("timeframe", value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="1-3-months">1-3 Months</SelectItem>
                <SelectItem value="3-6-months">3-6 Months</SelectItem>
                <SelectItem value="6-12-months">6-12 Months</SelectItem>
                <SelectItem value="exploring">Just Exploring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Financial Information
          </CardTitle>
          <CardDescription>Optional financial details for qualification</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="estimatedCreditScore">Estimated Credit Score</Label>
            <Select
              value={watch("estimatedCreditScore")}
              onValueChange={(value) => setValue("estimatedCreditScore", value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent (750+)</SelectItem>
                <SelectItem value="good">Good (700-749)</SelectItem>
                <SelectItem value="fair">Fair (650-699)</SelectItem>
                <SelectItem value="poor">Poor (&lt;650)</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="estimatedIncome">Estimated Annual Income</Label>
            <Input
              id="estimatedIncome"
              type="number"
              {...register("estimatedIncome", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="$0"
            />
          </div>

          <div>
            <Label htmlFor="estimatedDownPayment">Estimated Down Payment</Label>
            <Input
              id="estimatedDownPayment"
              type="number"
              {...register("estimatedDownPayment", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="$0"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="preApproved"
              checked={watch("preApproved")}
              onCheckedChange={(checked) => setValue("preApproved", checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="preApproved">Pre-Approved</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              disabled={isLoading}
              rows={4}
              placeholder="Any additional information..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="consentToContact"
              checked={watch("consentToContact")}
              onCheckedChange={(checked) => setValue("consentToContact", checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="consentToContact">Consent to Contact</Label>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

interface LeadDisplayProps {
  lead: Lead;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function LeadDisplay({ lead, showActions, onEdit, onDelete }: LeadDisplayProps) {
  const getQualificationColor = (qualification: string) => {
    switch (qualification) {
      case "hot": return "destructive";
      case "warm": return "secondary";
      case "cold": return "outline";
      default: return "default";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">
            {lead.firstName} {lead.lastName}
          </h2>
          <Badge variant={getQualificationColor(lead.qualification)}>
            {lead.qualification.toUpperCase()}
          </Badge>
          <div className={`flex items-center gap-1 ${getScoreColor(lead.leadScore)}`}>
            <TrendingUp className="h-4 w-4" />
            <span className="font-semibold">{lead.leadScore}</span>
          </div>
        </div>
        {showActions && (
          <div className="flex gap-2">
            {onEdit && (
              <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
                Edit
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} className="text-red-600 hover:text-red-800">
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="loan">Loan Details</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="followup">Follow-Up</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="font-medium">{lead.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Phone</dt>
                  <dd className="font-medium">{lead.phone || "N/A"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Preferred Contact</dt>
                  <dd className="font-medium capitalize">{lead.preferredContact}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Source</dt>
                  <dd className="font-medium capitalize">{lead.source?.replace("-", " ")}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loan" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Purpose</dt>
                  <dd className="font-medium capitalize">{lead.loanPurpose}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Property Type</dt>
                  <dd className="font-medium capitalize">{lead.propertyType.replace("-", " ")}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Occupancy</dt>
                  <dd className="font-medium capitalize">{lead.occupancy}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Timeframe</dt>
                  <dd className="font-medium capitalize">{lead.timeframe.replace("-", " ")}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Credit Score</dt>
                  <dd className="font-medium capitalize">{lead.estimatedCreditScore || "Unknown"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Annual Income</dt>
                  <dd className="font-medium">
                    {lead.estimatedIncome
                      ? `$${lead.estimatedIncome.toLocaleString()}`
                      : "Not provided"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Down Payment</dt>
                  <dd className="font-medium">
                    {lead.estimatedDownPayment
                      ? `$${lead.estimatedDownPayment.toLocaleString()}`
                      : "Not provided"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Est. Loan Amount</dt>
                  <dd className="font-medium">
                    {lead.estimatedLoanAmount
                      ? `$${lead.estimatedLoanAmount.toLocaleString()}`
                      : "Not calculated"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Pre-Approved</dt>
                  <dd className="font-medium">{lead.preApproved ? "Yes" : "No"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="followup" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-500 mb-2">Follow-Up Date</dt>
                  <dd className="font-medium">
                    {new Date(lead.followUpDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-2">Next Steps</dt>
                  <dd className="space-y-1">
                    {lead.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </dd>
                </div>
                {lead.notes && (
                  <div>
                    <dt className="text-sm text-gray-500 mb-2">Notes</dt>
                    <dd className="text-sm">{lead.notes}</dd>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default {
  Form: LeadForm,
  Display: LeadDisplay
};