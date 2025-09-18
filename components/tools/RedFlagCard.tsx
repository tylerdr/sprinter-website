"use client";

import { AlertTriangle, AlertCircle, Info, CheckCircle, ExternalLink, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type RedFlagSeverity = "critical" | "high" | "medium" | "low";

export interface RedFlag {
  id: string;
  title: string;
  description: string;
  severity: RedFlagSeverity;
  category: string;
  location?: {
    page: number;
    paragraph: number;
    text: string;
  };
  suggestedClause?: string;
  impact: string;
  recommendation: string;
  riskScore: number; // 1-10 scale
}

interface RedFlagCardProps {
  redFlag: RedFlag;
  showSuggestedClause?: boolean;
  onViewSource?: (location: RedFlag['location']) => void;
  className?: string;
}

const severityConfig = {
  critical: {
    color: "text-red-700 bg-red-50 border-red-200",
    badgeVariant: "destructive" as const,
    icon: AlertTriangle,
    label: "Critical Risk"
  },
  high: {
    color: "text-orange-700 bg-orange-50 border-orange-200",
    badgeVariant: "destructive" as const,
    icon: AlertCircle,
    label: "High Risk"
  },
  medium: {
    color: "text-yellow-700 bg-yellow-50 border-yellow-200",
    badgeVariant: "secondary" as const,
    icon: Info,
    label: "Medium Risk"
  },
  low: {
    color: "text-blue-700 bg-blue-50 border-blue-200",
    badgeVariant: "secondary" as const,
    icon: CheckCircle,
    label: "Low Risk"
  }
};

export function RedFlagCard({
  redFlag,
  showSuggestedClause = true,
  onViewSource,
  className
}: RedFlagCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  const config = severityConfig[redFlag.severity];
  const IconComponent = config.icon;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const getRiskScoreColor = (score: number): string => {
    if (score >= 8) return "text-red-600";
    if (score >= 6) return "text-orange-600";
    if (score >= 4) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      {/* Severity indicator bar */}
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full",
        redFlag.severity === 'critical' && "bg-red-500",
        redFlag.severity === 'high' && "bg-orange-500",
        redFlag.severity === 'medium' && "bg-yellow-500",
        redFlag.severity === 'low' && "bg-blue-500"
      )} />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <IconComponent className={cn("w-5 h-5", 
                redFlag.severity === 'critical' && "text-red-600",
                redFlag.severity === 'high' && "text-orange-600", 
                redFlag.severity === 'medium' && "text-yellow-600",
                redFlag.severity === 'low' && "text-blue-600"
              )} />
              <CardTitle className="text-lg">{redFlag.title}</CardTitle>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant={config.badgeVariant} className="text-xs">
                {config.label}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {redFlag.category}
              </Badge>
              <span className={cn("text-sm font-medium", getRiskScoreColor(redFlag.riskScore))}>
                Risk: {redFlag.riskScore}/10
              </span>
            </div>
          </div>

          {redFlag.location && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewSource?.(redFlag.location)}
              className="shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{redFlag.description}</p>

        {/* Location info */}
        {redFlag.location && (
          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              Found on page {redFlag.location.page}, paragraph {redFlag.location.paragraph}
              {redFlag.location.text && (
                <div className="mt-2 text-xs bg-muted p-2 rounded italic">
                  "{redFlag.location.text.slice(0, 100)}..."
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Impact */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Potential Impact</h4>
          <p className="text-sm text-muted-foreground">{redFlag.impact}</p>
        </div>

        {/* Recommendation */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Recommendation</h4>
          <p className="text-sm text-muted-foreground">{redFlag.recommendation}</p>
        </div>

        {/* Suggested clause */}
        {showSuggestedClause && redFlag.suggestedClause && (
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                {isExpanded ? "Hide" : "Show"} Suggested Clause Language
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="relative">
                <div className="bg-muted/50 p-4 rounded-lg border text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">Suggested Contract Language</h5>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(redFlag.suggestedClause!, 'clause')}
                      className="h-6 px-2"
                    >
                      {copiedText === 'clause' ? (
                        <span className="text-xs text-green-600">Copied!</span>
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {redFlag.suggestedClause}
                  </p>
                </div>
                
                <Alert className="mt-3">
                  <Info className="w-4 h-4" />
                  <AlertDescription className="text-xs">
                    This is a suggested template. Please consult with legal counsel before using this language in your contracts.
                  </AlertDescription>
                </Alert>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}

interface RedFlagSummaryProps {
  redFlags: RedFlag[];
  className?: string;
}

export function RedFlagSummary({ redFlags, className }: RedFlagSummaryProps) {
  const counts = redFlags.reduce((acc, flag) => {
    acc[flag.severity] = (acc[flag.severity] || 0) + 1;
    return acc;
  }, {} as Record<RedFlagSeverity, number>);

  const totalRiskScore = redFlags.reduce((sum, flag) => sum + flag.riskScore, 0);
  const avgRiskScore = redFlags.length > 0 ? Math.round(totalRiskScore / redFlags.length) : 0;

  const getRiskLevel = (score: number): { label: string; color: string } => {
    if (score >= 8) return { label: "Very High Risk", color: "text-red-600 bg-red-50 border-red-200" };
    if (score >= 6) return { label: "High Risk", color: "text-orange-600 bg-orange-50 border-orange-200" };
    if (score >= 4) return { label: "Medium Risk", color: "text-yellow-600 bg-yellow-50 border-yellow-200" };
    return { label: "Low Risk", color: "text-green-600 bg-green-50 border-green-200" };
  };

  const riskLevel = getRiskLevel(avgRiskScore);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Risk Assessment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['critical', 'high', 'medium', 'low'] as RedFlagSeverity[]).map(severity => (
            <div key={severity} className="text-center space-y-1">
              <div className={cn("text-2xl font-bold", 
                severity === 'critical' && "text-red-600",
                severity === 'high' && "text-orange-600",
                severity === 'medium' && "text-yellow-600", 
                severity === 'low' && "text-blue-600"
              )}>
                {counts[severity] || 0}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {severity} Risk
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <div className="text-sm text-muted-foreground">Overall Risk Level</div>
            <Badge className={cn("mt-1", riskLevel.color)}>
              {riskLevel.label} ({avgRiskScore}/10)
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Issues</div>
            <div className="text-2xl font-bold">{redFlags.length}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}