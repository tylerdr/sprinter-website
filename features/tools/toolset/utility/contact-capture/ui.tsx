"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ToolUI } from "@/features/tools/types";
import {
  contactCaptureInputSchema as Input,
  contactCaptureOutputSchema as Output
} from "./tool";
import { z } from "zod";

type InputType = z.infer<typeof Input>;
type OutputType = z.infer<typeof Output>;

export const Result: React.FC<{ data: OutputType }> = ({ data: result }) => {
  const getQualificationColor = (qual: string) => {
    switch (qual) {
      case "hot":
        return "destructive";
      case "warm":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Lead Captured</CardTitle>
          <Badge variant={getQualificationColor(result.qualification)}>
            {result.qualification.toUpperCase()} Lead
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Lead ID</Label>
            <p className="text-sm font-mono">{result.leadId}</p>
          </div>
          <div>
            <Label>Lead Score</Label>
            <p className="text-2xl font-bold">{result.leadScore}/100</p>
          </div>
        </div>

        {result.estimatedLoanAmount && (
          <div>
            <Label>Estimated Loan Amount</Label>
            <p className="text-lg font-semibold">
              ${result.estimatedLoanAmount.toLocaleString()}
            </p>
          </div>
        )}

        <div>
          <Label>Next Steps</Label>
          <ul className="mt-2 space-y-1">
            {result.nextSteps.map((step, i) => (
              <li key={i} className="text-sm">
                • {step}
              </li>
            ))}
          </ul>
        </div>

        <Alert>
          <AlertDescription>
            Follow up by: {new Date(result.followUpDate).toLocaleDateString()}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export const Loading: React.FC = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="font-medium">Capturing contact...</p>
      </div>
    </CardContent>
  </Card>
);

export const Error: React.FC<{ message: string }> = ({ message }) => (
  <Alert variant="destructive">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export const InputForm: React.FC<{
  onSubmit: (data: InputType) => void;
  isLoading?: boolean;
}> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<Partial<InputType>>({
    preferredContact: "email",
    preApproved: false,
    consentToContact: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as InputType);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <InputField
            id="firstName"
            value={formData.firstName || ""}
            onChange={e =>
              setFormData(prev => ({ ...prev, firstName: e.target.value }))
            }
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <InputField
            id="lastName"
            value={formData.lastName || ""}
            onChange={e =>
              setFormData(prev => ({ ...prev, lastName: e.target.value }))
            }
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <InputField
          id="email"
          type="email"
          value={formData.email || ""}
          onChange={e =>
            setFormData(prev => ({ ...prev, email: e.target.value }))
          }
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <InputField
          id="phone"
          value={formData.phone || ""}
          onChange={e =>
            setFormData(prev => ({ ...prev, phone: e.target.value }))
          }
          required
          disabled={isLoading}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Capturing..." : "Capture Lead"}
      </Button>
    </form>
  );
};

const ui: ToolUI<typeof Input, typeof Output> = {
  Result,
  Loading,
  Error,
  InputForm
};

export default ui;
