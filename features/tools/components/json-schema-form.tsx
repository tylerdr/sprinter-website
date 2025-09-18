"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface JsonSchemaFormProps {
  schema: any;
  uiSchema?: any;
  onSubmit: (data: any) => void | Promise<void>;
  title?: string;
  description?: string;
  submitLabel?: string;
  initialData?: any;
  loading?: boolean;
}

export function JsonSchemaForm({
  schema,
  uiSchema = {},
  onSubmit,
  title,
  description,
  submitLabel = "Submit",
  initialData = {},
  loading = false
}: JsonSchemaFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const properties = schema.properties || {};
  const required = schema.required || [];

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Check required fields
    for (const field of required) {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    }

    // Validate field types and constraints
    for (const [field, config] of Object.entries(properties)) {
      const value = formData[field];
      const fieldConfig = config as any;

      if (value !== undefined && value !== null && value !== "") {
        // Number validation
        if (fieldConfig.type === "number" || fieldConfig.type === "integer") {
          const numValue = Number(value);
          if (isNaN(numValue)) {
            newErrors[field] = `${field} must be a number`;
          } else {
            if (fieldConfig.minimum !== undefined && numValue < fieldConfig.minimum) {
              newErrors[field] = `${field} must be at least ${fieldConfig.minimum}`;
            }
            if (fieldConfig.maximum !== undefined && numValue > fieldConfig.maximum) {
              newErrors[field] = `${field} must be at most ${fieldConfig.maximum}`;
            }
          }
        }

        // String validation
        if (fieldConfig.type === "string") {
          if (fieldConfig.minLength && value.length < fieldConfig.minLength) {
            newErrors[field] = `${field} must be at least ${fieldConfig.minLength} characters`;
          }
          if (fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
            newErrors[field] = `${field} must be at most ${fieldConfig.maxLength} characters`;
          }
          if (fieldConfig.format === "email" && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors[field] = `${field} must be a valid email`;
          }
          if (fieldConfig.format === "uri" && !value.match(/^https?:\/\/.+/)) {
            newErrors[field] = `${field} must be a valid URL`;
          }
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Convert form data types based on schema
    const convertedData: any = {};
    for (const [field, value] of Object.entries(formData)) {
      const fieldConfig = properties[field];
      if (fieldConfig) {
        if ((fieldConfig.type === "number" || fieldConfig.type === "integer") && value !== "" && value !== null && value !== undefined) {
          convertedData[field] = Number(value);
        } else if (fieldConfig.type === "boolean") {
          convertedData[field] = Boolean(value);
        } else {
          convertedData[field] = value;
        }
      } else {
        convertedData[field] = value;
      }
    }

    setIsSubmitting(true);
    try {
      await onSubmit(convertedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: string, config: any) => {
    const uiConfig = uiSchema[field] || {};
    const value = formData[field] || "";
    const isRequired = required.includes(field);
    const error = errors[field];

    // Custom widget from UI schema
    const widget = uiConfig["ui:widget"];

    // Handle different field types
    if (config.enum) {
      // Enum renders as select
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {config.title || field}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Select
            value={value}
            onValueChange={(val) => handleFieldChange(field, val)}
            disabled={loading || isSubmitting}
          >
            <SelectTrigger id={field} className={error ? "border-red-500" : ""}>
              <SelectValue placeholder={`Select ${field}`} />
            </SelectTrigger>
            <SelectContent>
              {config.enum.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {config.description && (
            <p className="text-sm text-muted-foreground">{config.description}</p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      );
    }

    if (config.type === "boolean") {
      return (
        <div key={field} className="flex items-center space-x-2">
          <Switch
            id={field}
            checked={value || false}
            onCheckedChange={(checked) => handleFieldChange(field, checked)}
            disabled={loading || isSubmitting}
          />
          <Label htmlFor={field}>
            {config.title || field}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {error && <p className="text-sm text-red-500 ml-auto">{error}</p>}
        </div>
      );
    }

    if (config.type === "number" || config.type === "integer") {
      // Use slider if min and max are defined
      if (config.minimum !== undefined && config.maximum !== undefined && widget === "slider") {
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor={field}>
              {config.title || field}: {value || config.minimum}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Slider
              id={field}
              min={config.minimum}
              max={config.maximum}
              step={config.type === "integer" ? 1 : 0.01}
              value={[value || config.minimum]}
              onValueChange={([val]) => handleFieldChange(field, val)}
              disabled={loading || isSubmitting}
              className={error ? "border-red-500" : ""}
            />
            {config.description && (
              <p className="text-sm text-muted-foreground">{config.description}</p>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        );
      }

      // Regular number input
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {config.title || field}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id={field}
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value ? Number(e.target.value) : "")}
            placeholder={config.placeholder || `Enter ${field}`}
            min={config.minimum}
            max={config.maximum}
            step={config.type === "integer" ? 1 : "any"}
            disabled={loading || isSubmitting}
            className={error ? "border-red-500" : ""}
          />
          {config.description && (
            <p className="text-sm text-muted-foreground">{config.description}</p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      );
    }

    if (config.type === "array") {
      // Simple array handling (tags, keywords)
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {config.title || field}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id={field}
            value={Array.isArray(value) ? value.join(", ") : value}
            onChange={(e) => 
              handleFieldChange(field, e.target.value.split(",").map(s => s.trim()).filter(Boolean))
            }
            placeholder={`Enter ${field} separated by commas`}
            disabled={loading || isSubmitting}
            className={error ? "border-red-500" : ""}
          />
          {config.description && (
            <p className="text-sm text-muted-foreground">{config.description}</p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      );
    }

    // Default to text input/textarea
    const isTextarea = widget === "textarea" || config.maxLength > 200;
    
    return (
      <div key={field} className="space-y-2">
        <Label htmlFor={field}>
          {config.title || field}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {isTextarea ? (
          <Textarea
            id={field}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            placeholder={config.placeholder || `Enter ${field}`}
            rows={uiConfig["ui:rows"] || 4}
            maxLength={config.maxLength}
            disabled={loading || isSubmitting}
            className={error ? "border-red-500" : ""}
          />
        ) : (
          <Input
            id={field}
            type={config.format === "email" ? "email" : config.format === "uri" ? "url" : "text"}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            placeholder={config.placeholder || `Enter ${field}`}
            maxLength={config.maxLength}
            disabled={loading || isSubmitting}
            className={error ? "border-red-500" : ""}
          />
        )}
        {config.description && (
          <p className="text-sm text-muted-foreground">{config.description}</p>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  };

  return (
    <Card>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(properties).map(([field, config]) => 
            renderField(field, config)
          )}
          
          <Button 
            type="submit" 
            disabled={loading || isSubmitting}
            className="w-full"
          >
            {(loading || isSubmitting) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Processing..." : submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}