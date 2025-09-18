/**
 * Shared UI components for dynamic form fields loaded from database
 */

"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FieldOption {
  value: string;
  label: string;
  description?: string;
}

interface DynamicSelectFieldProps {
  name: string;
  label: string;
  options: FieldOption[];
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
}

export function DynamicSelectField({
  name,
  label,
  options,
  defaultValue,
  required = false,
  placeholder = "Select an option",
  description
}: DynamicSelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {!required && <span className="text-muted-foreground ml-1">(Optional)</span>}
      </Label>
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger id={name}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

interface DynamicNumberFieldProps {
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  required?: boolean;
  placeholder?: string;
  description?: string;
  unit?: string;
}

export function DynamicNumberField({
  name,
  label,
  min,
  max,
  step = 1,
  defaultValue,
  required = false,
  placeholder,
  description,
  unit
}: DynamicNumberFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {unit && <span className="text-muted-foreground ml-1">({unit})</span>}
        {!required && <span className="text-muted-foreground ml-1">(Optional)</span>}
      </Label>
      <Input
        type="number"
        id={name}
        name={name}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full"
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

interface CurrencyFieldProps {
  name: string;
  label: string;
  defaultValue?: number;
  required?: boolean;
  placeholder?: string;
  description?: string;
}

export function CurrencyField({
  name,
  label,
  defaultValue,
  required = false,
  placeholder = "$0",
  description
}: CurrencyFieldProps) {
  const [displayValue, setDisplayValue] = React.useState(
    defaultValue ? formatCurrency(defaultValue) : ""
  );
  const [actualValue, setActualValue] = React.useState(defaultValue || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const numValue = parseInt(value || "0");
    setActualValue(numValue);
    setDisplayValue(formatCurrency(numValue));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {!required && <span className="text-muted-foreground ml-1">(Optional)</span>}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          $
        </span>
        <Input
          type="text"
          id={name}
          value={displayValue}
          onChange={handleChange}
          required={required}
          placeholder={placeholder}
          className="pl-8"
        />
        <input type="hidden" name={name} value={actualValue} />
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US");
}

interface PercentageFieldProps {
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  required?: boolean;
  placeholder?: string;
  description?: string;
}

export function PercentageField({
  name,
  label,
  min = 0,
  max = 100,
  step = 0.01,
  defaultValue,
  required = false,
  placeholder = "0",
  description
}: PercentageFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {!required && <span className="text-muted-foreground ml-1">(Optional)</span>}
      </Label>
      <div className="relative">
        <Input
          type="number"
          id={name}
          name={name}
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          className="pr-8"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          %
        </span>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}