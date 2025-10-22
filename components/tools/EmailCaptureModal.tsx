"use client";

import { useState } from "react";
import { Mail, Download, Building2, User, ArrowRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface LeadData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  jobTitle?: string;
  useCase?: string;
  marketingConsent: boolean;
}

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeadData) => Promise<void>;
  title?: string;
  description?: string;
  benefits?: string[];
  buttonText?: string;
  downloadType?: "report" | "export" | "access";
  previewContent?: React.ReactNode;
  className?: string;
}

const defaultBenefits = [
  "Full detailed analysis report",
  "Actionable recommendations", 
  "Priority risk assessment",
  "Industry benchmarking data"
];

export function EmailCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Get Your Complete Analysis",
  description = "Enter your details below to unlock the full analysis report and recommendations.",
  benefits = defaultBenefits,
  buttonText = "Get Full Report",
  downloadType = "report",
  previewContent,
  className
}: EmailCaptureModalProps) {
  const [formData, setFormData] = useState<LeadData>({
    email: "",
    firstName: "",
    lastName: "", 
    company: "",
    jobTitle: "",
    useCase: "",
    marketingConsent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'preview' | 'form'>('preview');

  const handleInputChange = (field: keyof LeadData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const validateForm = (): string | null => {
    if (!formData.email.trim()) return "Email is required";
    if (!formData.email.includes('@')) return "Please enter a valid email";
    if (!formData.firstName?.trim()) return "First name is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = () => {
    switch (downloadType) {
      case "export":
        return Download;
      case "access":
        return ArrowRight;
      default:
        return Mail;
    }
  };

  const IconComponent = getIcon();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("max-w-2xl max-h-[90vh] overflow-y-auto", className)}>
        <DialogHeader className="text-left space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <IconComponent className="w-5 h-5 text-brand" />
              {title}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription className="text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        {step === 'preview' && previewContent && (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/20">
              <h4 className="font-medium mb-2">Preview of what you'll get:</h4>
              <div className="max-h-40 overflow-y-auto">
                {previewContent}
              </div>
            </div>
            
            <Button 
              onClick={() => setStep('form')} 
              className="w-full"
              size="lg"
            >
              Continue to Get Full Access
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {(step === 'form' || !previewContent) && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Benefits List */}
            <Card className="bg-gradient-to-r from-brand/5 to-brand/10 border-brand/20">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  What's included:
                </h4>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName || ""}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text" 
                  value={formData.lastName || ""}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Work Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@company.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company || ""}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Company Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  type="text"
                  value={formData.jobTitle || ""}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  placeholder="Your role"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="useCase">What will you use this analysis for? (Optional)</Label>
              <Textarea
                id="useCase"
                value={formData.useCase || ""}
                onChange={(e) => handleInputChange("useCase", e.target.value)}
                placeholder="Contract review, risk assessment, compliance..."
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Marketing Consent */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="marketing"
                checked={formData.marketingConsent}
                onCheckedChange={(checked) => handleInputChange("marketingConsent", !!checked)}
                className="mt-1"
              />
              <Label htmlFor="marketing" className="text-sm leading-relaxed">
                I'd like to receive updates about new SpecSprint tools and contract analysis insights. 
                <span className="text-muted-foreground block text-xs mt-1">
                  You can unsubscribe at any time.
                </span>
              </Label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <IconComponent className="w-4 h-4 mr-2" />
                    {buttonText}
                  </>
                )}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>By submitting, you agree to receive the analysis report.</p>
              <p>We respect your privacy and never sell your data.</p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Simplified version for quick email capture
interface QuickEmailCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
  title?: string;
  placeholder?: string;
}

export function QuickEmailCapture({
  isOpen,
  onClose,
  onSubmit,
  title = "Get Full Access",
  placeholder = "Enter your email"
}: QuickEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(email);
      onClose();
    } catch (err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
          />
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Processing..." : "Continue"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}