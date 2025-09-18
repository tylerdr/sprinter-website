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
import { Shield, AlertTriangle, Droplets, Flame, Wind, Mountain, DollarSign } from "lucide-react";
import type { InsuranceRate, CreateInsuranceRate } from "./schema";

interface InsuranceRateFormProps {
  form: UseFormReturn<CreateInsuranceRate>;
  onSubmit?: (data: CreateInsuranceRate) => void;
  isLoading?: boolean;
}

export function InsuranceRateForm({ form, onSubmit, isLoading }: InsuranceRateFormProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <form onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Location Information</CardTitle>
          <CardDescription>Specify the location for this insurance rate</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stateCode">State Code *</Label>
            <Input
              id="stateCode"
              {...register("stateCode")}
              disabled={isLoading}
              placeholder="FL"
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
              placeholder="Florida"
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
            />
          </div>

          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              {...register("zipCode")}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Insurance Rates</CardTitle>
          <CardDescription>Enter insurance rates by property type</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="baseRate">Base Rate (%) *</Label>
            <Input
              id="baseRate"
              type="number"
              step="0.0001"
              {...register("baseRate", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="0.0035"
            />
            {errors.baseRate && (
              <p className="text-sm text-red-500 mt-1">{errors.baseRate.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Enter as decimal (e.g., 0.0035 for 0.35%)</p>
          </div>

          <div>
            <Label htmlFor="riskCategory">Risk Category *</Label>
            <Select
              value={watch("riskCategory")}
              onValueChange={(value) => setValue("riskCategory", value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select risk category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="moderate">Moderate Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="very_high">Very High Risk</SelectItem>
              </SelectContent>
            </Select>
            {errors.riskCategory && (
              <p className="text-sm text-red-500 mt-1">{errors.riskCategory.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="singleFamilyRate">Single Family Rate (%)</Label>
            <Input
              id="singleFamilyRate"
              type="number"
              step="0.0001"
              {...register("singleFamilyRate", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="0.0035"
            />
          </div>

          <div>
            <Label htmlFor="condoRate">Condo Rate (%)</Label>
            <Input
              id="condoRate"
              type="number"
              step="0.0001"
              {...register("condoRate", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="0.0021"
            />
          </div>

          <div>
            <Label htmlFor="townhouseRate">Townhouse Rate (%)</Label>
            <Input
              id="townhouseRate"
              type="number"
              step="0.0001"
              {...register("townhouseRate", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="0.0028"
            />
          </div>

          <div>
            <Label htmlFor="multiFamilyRate">Multi-Family Rate (%)</Label>
            <Input
              id="multiFamilyRate"
              type="number"
              step="0.0001"
              {...register("multiFamilyRate", { valueAsNumber: true })}
              disabled={isLoading}
              placeholder="0.0045"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Factors</CardTitle>
          <CardDescription>Identify natural disaster risks</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hurricaneZone"
              checked={watch("hurricaneZone")}
              onCheckedChange={(checked) => setValue("hurricaneZone", checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="hurricaneZone" className="flex items-center gap-2">
              <Wind className="h-4 w-4" />
              Hurricane Zone
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="floodZone"
              checked={watch("floodZone")}
              onCheckedChange={(checked) => setValue("floodZone", checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="floodZone" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Flood Zone
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="earthquakeZone"
              checked={watch("earthquakeZone")}
              onCheckedChange={(checked) => setValue("earthquakeZone", checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="earthquakeZone" className="flex items-center gap-2">
              <Mountain className="h-4 w-4" />
              Earthquake Zone
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="wildfireZone"
              checked={watch("wildfireZone")}
              onCheckedChange={(checked) => setValue("wildfireZone", checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="wildfireZone" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Wildfire Zone
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="tornadoZone"
              checked={watch("tornadoZone")}
              onCheckedChange={(checked) => setValue("tornadoZone", checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="tornadoZone" className="flex items-center gap-2">
              <Wind className="h-4 w-4" />
              Tornado Zone
            </Label>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

interface InsuranceRateDisplayProps {
  rate: InsuranceRate;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function InsuranceRateDisplay({ rate, showActions, onEdit, onDelete }: InsuranceRateDisplayProps) {
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(3)}%`;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "default";
      case "moderate": return "secondary";
      case "high": return "outline";
      case "very_high": return "destructive";
      default: return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {rate.stateName} ({rate.stateCode})
              {rate.countyName && ` - ${rate.countyName}`}
            </CardTitle>
            <CardDescription>
              {rate.zipCode && `ZIP: ${rate.zipCode} • `}
              Effective: {new Date(rate.effectiveDate).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getRiskColor(rate.riskCategory)}>
              {rate.riskCategory.toUpperCase()} RISK
            </Badge>
            {rate.isActive ? (
              <Badge variant="default">Active</Badge>
            ) : (
              <Badge variant="secondary">Inactive</Badge>
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
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Base Rate</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPercentage(rate.baseRate)}
            </div>
          </div>

          {rate.averagePremium && (
            <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Annual Premium</div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                ${rate.averagePremium.toLocaleString()}
              </div>
            </div>
          )}
        </div>

        {/* Risk Indicators */}
        <div className="flex flex-wrap gap-2 mb-4">
          {rate.hurricaneZone && (
            <Badge variant="destructive">
              <Wind className="h-3 w-3 mr-1" />
              Hurricane
            </Badge>
          )}
          {rate.floodZone && (
            <Badge variant="destructive">
              <Droplets className="h-3 w-3 mr-1" />
              Flood
            </Badge>
          )}
          {rate.earthquakeZone && (
            <Badge variant="destructive">
              <Mountain className="h-3 w-3 mr-1" />
              Earthquake
            </Badge>
          )}
          {rate.wildfireZone && (
            <Badge variant="destructive">
              <Flame className="h-3 w-3 mr-1" />
              Wildfire
            </Badge>
          )}
          {rate.tornadoZone && (
            <Badge variant="destructive">
              <Wind className="h-3 w-3 mr-1" />
              Tornado
            </Badge>
          )}
        </div>

        {/* Property Type Rates */}
        {(rate.singleFamilyRate || rate.condoRate || rate.townhouseRate || rate.multiFamilyRate) && (
          <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            {rate.singleFamilyRate && (
              <div>
                <span className="text-xs text-gray-500">Single Family:</span>
                <span className="ml-2 font-medium">{formatPercentage(rate.singleFamilyRate)}</span>
              </div>
            )}
            {rate.condoRate && (
              <div>
                <span className="text-xs text-gray-500">Condo:</span>
                <span className="ml-2 font-medium">{formatPercentage(rate.condoRate)}</span>
              </div>
            )}
            {rate.townhouseRate && (
              <div>
                <span className="text-xs text-gray-500">Townhouse:</span>
                <span className="ml-2 font-medium">{formatPercentage(rate.townhouseRate)}</span>
              </div>
            )}
            {rate.multiFamilyRate && (
              <div>
                <span className="text-xs text-gray-500">Multi-Family:</span>
                <span className="ml-2 font-medium">{formatPercentage(rate.multiFamilyRate)}</span>
              </div>
            )}
          </div>
        )}

        {/* Additional Requirements */}
        {(rate.requiresFloodInsurance || rate.requiresEarthquakeInsurance) && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">Additional Requirements</span>
            </div>
            <div className="text-sm space-y-1">
              {rate.requiresFloodInsurance && <div>• Flood insurance required</div>}
              {rate.requiresEarthquakeInsurance && <div>• Earthquake insurance required</div>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default {
  Form: InsuranceRateForm,
  Display: InsuranceRateDisplay
};