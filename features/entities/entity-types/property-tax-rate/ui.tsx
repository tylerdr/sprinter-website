"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, DollarSign, Calendar, MapPin, AlertCircle, TrendingUp } from "lucide-react";
import type { PropertyTaxRate, CreatePropertyTaxRate } from "./schema";

interface PropertyTaxRateFormProps {
  form: UseFormReturn<CreatePropertyTaxRate>;
  onSubmit?: (data: CreatePropertyTaxRate) => void;
  isLoading?: boolean;
}

export function PropertyTaxRateForm({ form, onSubmit, isLoading }: PropertyTaxRateFormProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <form onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Location Information</CardTitle>
          <CardDescription>Specify the location for this tax rate</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stateCode">State Code *</Label>
            <Input
              id="stateCode"
              {...register("stateCode")}
              disabled={isLoading}
              placeholder="CA"
              maxLength={2}
            />
            {errors.stateCode && (
              <p className="text-sm text-red-500 mt-1">{errors.stateCode.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="stateName">State Name *</Label>
            <Input
              id="stateName"
              {...register("stateName")}
              disabled={isLoading}
              placeholder="California"
            />
            {errors.stateName && (
              <p className="text-sm text-red-500 mt-1">{errors.stateName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="countyName">County Name</Label>
            <Input
              id="countyName"
              {...register("countyName")}
              disabled={isLoading}
              placeholder="Los Angeles County"
            />
          </div>

          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              {...register("zipCode")}
              disabled={isLoading}
              placeholder="90210"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Rate Details</CardTitle>
          <CardDescription>Enter the property tax rates</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="effectiveRate">Effective Rate (%) *</Label>
            <Input
              id="effectiveRate"
              type="number"
              step="0.0001"
              {...register("effectiveRate", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="0.011"
            />
            {errors.effectiveRate && (
              <p className="text-sm text-red-500 mt-1">{errors.effectiveRate.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Enter as decimal (e.g., 0.011 for 1.1%)</p>
          </div>

          <div>
            <Label htmlFor="medianRate">Median Rate (%)</Label>
            <Input
              id="medianRate"
              type="number"
              step="0.0001"
              {...register("medianRate", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="0.012"
            />
            <p className="text-xs text-gray-500 mt-1">Enter as decimal</p>
          </div>

          <div>
            <Label htmlFor="annualTaxPerMedianHome">Annual Tax (Median Home)</Label>
            <Input
              id="annualTaxPerMedianHome"
              type="number"
              {...register("annualTaxPerMedianHome", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="5000"
            />
          </div>

          <div>
            <Label htmlFor="medianHomeValue">Median Home Value</Label>
            <Input
              id="medianHomeValue"
              type="number"
              {...register("medianHomeValue", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="500000"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
          <CardDescription>Additional information about this rate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="effectiveDate">Effective Date *</Label>
              <Input
                id="effectiveDate"
                type="datetime-local"
                {...register("effectiveDate")}
                disabled={isLoading}
              />
              {errors.effectiveDate && (
                <p className="text-sm text-red-500 mt-1">{errors.effectiveDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input
                id="expirationDate"
                type="datetime-local"
                {...register("expirationDate")}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              {...register("source")}
              disabled={isLoading}
              placeholder="State Department of Revenue"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              disabled={isLoading}
              rows={3}
              placeholder="Additional information about this rate..."
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={watch("isActive")}
                onCheckedChange={(checked) => setValue("isActive", checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isHighCostArea"
                checked={watch("isHighCostArea")}
                onCheckedChange={(checked) => setValue("isHighCostArea", checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="isHighCostArea">High Cost Area</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasLocalSurtax"
                checked={watch("hasLocalSurtax")}
                onCheckedChange={(checked) => setValue("hasLocalSurtax", checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="hasLocalSurtax">Has Local Surtax</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

interface PropertyTaxRateDisplayProps {
  rate: PropertyTaxRate;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function PropertyTaxRateDisplay({ rate, showActions, onEdit, onDelete }: PropertyTaxRateDisplayProps) {
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(3)}%`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {rate.stateName} ({rate.stateCode})
              {rate.countyName && ` - ${rate.countyName}`}
            </CardTitle>
            <CardDescription>
              {rate.zipCode && `ZIP: ${rate.zipCode} • `}
              Effective: {new Date(rate.effectiveDate).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {rate.isActive ? (
              <Badge variant="default">Active</Badge>
            ) : (
              <Badge variant="secondary">Inactive</Badge>
            )}
            {rate.isHighCostArea && (
              <Badge variant="destructive">High Cost</Badge>
            )}
            {rate.hasLocalSurtax && (
              <Badge variant="outline">Local Surtax</Badge>
            )}
            {showActions && (
              <div className="flex gap-2 ml-2">
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
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <TrendingUp className="h-4 w-4" />
              Effective Rate
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPercentage(rate.effectiveRate)}
            </div>
          </div>

          {rate.medianRate && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <Building className="h-4 w-4" />
                Median Rate
              </div>
              <div className="text-2xl font-bold">
                {formatPercentage(rate.medianRate)}
              </div>
            </div>
          )}

          {rate.annualTaxPerMedianHome && (
            <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <DollarSign className="h-4 w-4" />
                Annual Tax (Median)
              </div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(rate.annualTaxPerMedianHome)}
              </div>
            </div>
          )}

          {rate.medianHomeValue && (
            <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <Building className="h-4 w-4" />
                Median Home Value
              </div>
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(rate.medianHomeValue)}
              </div>
            </div>
          )}
        </div>

        {(rate.source || rate.notes) && (
          <div className="mt-4 pt-4 border-t">
            {rate.source && (
              <div className="mb-2">
                <span className="text-sm text-gray-500">Source: </span>
                <span className="text-sm">{rate.source}</span>
              </div>
            )}
            {rate.notes && (
              <div>
                <span className="text-sm text-gray-500">Notes: </span>
                <span className="text-sm">{rate.notes}</span>
              </div>
            )}
          </div>
        )}

        {rate.expirationDate && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">
                Expires: {new Date(rate.expirationDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default {
  Form: PropertyTaxRateForm,
  Display: PropertyTaxRateDisplay
};