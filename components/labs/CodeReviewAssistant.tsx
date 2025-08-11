"use client";

import { useState } from "react";
import { Code2, Upload, CheckCircle, AlertTriangle, Zap, Shield, Copy, Check } from "lucide-react";

interface ReviewResult {
  language: string;
  issues: Array<{
    type: 'security' | 'performance' | 'quality' | 'style';
    severity: 'high' | 'medium' | 'low';
    line: number;
    title: string;
    description: string;
    suggestion: string;
    improvedCode?: string;
  }>;
  summary: {
    totalIssues: number;
    securityIssues: number;
    performanceIssues: number;
    codeQuality: string;
  };
}

export default function CodeReviewAssistant() {
  const [code, setCode] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [language, setLanguage] = useState("javascript");

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
    if (review) setReview(null);
  };

  const loadSampleCode = () => {
    const sampleCode = `function processUserData(users) {
  var result = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].password == "admin123") {
      result.push(users[i]);
    }
    // Calculate expensive operation in loop
    users[i].score = Math.pow(users[i].points, 3) + fibonacci(20);
  }
  return result;
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;
    setCode(sampleCode);
    setReview(null);
  };

  const reviewCode = async () => {
    if (!code.trim()) return;

    setIsReviewing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock review results
    const mockReview: ReviewResult = {
      language: "JavaScript",
      issues: [
        {
          type: 'security',
          severity: 'high',
          line: 4,
          title: 'Hardcoded Password Vulnerability',
          description: 'Using hardcoded passwords is a critical security vulnerability',
          suggestion: 'Use environment variables or secure configuration for passwords',
          improvedCode: `if (users[i].password === process.env.ADMIN_PASSWORD) {`
        },
        {
          type: 'performance',
          severity: 'high',
          line: 7,
          title: 'Expensive Operation in Loop',
          description: 'Computing fibonacci inside a loop causes O(n²) complexity',
          suggestion: 'Cache or pre-compute expensive operations',
          improvedCode: `const fibCache = new Map();
users[i].score = users[i].points ** 3 + getCachedFib(20);`
        },
        {
          type: 'quality',
          severity: 'medium',
          line: 2,
          title: 'Use const/let instead of var',
          description: 'var has function scope which can lead to unexpected behavior',
          suggestion: 'Use const for arrays that won\'t be reassigned',
          improvedCode: `const result = [];`
        },
        {
          type: 'style',
          severity: 'low',
          line: 4,
          title: 'Use strict equality',
          description: 'Using == can cause type coercion issues',
          suggestion: 'Always use === for comparisons',
          improvedCode: `if (users[i].password === "admin123") {`
        }
      ],
      summary: {
        totalIssues: 4,
        securityIssues: 1,
        performanceIssues: 1,
        codeQuality: "Needs Improvement"
      }
    };
    
    setReview(mockReview);
    setIsReviewing(false);
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'performance':
        return <Zap className="w-4 h-4" />;
      case 'quality':
        return <CheckCircle className="w-4 h-4" />;
      case 'style':
        return <Code2 className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getIssueColor = (type: string, severity: string) => {
    const baseColors = {
      security: 'text-destructive',
      performance: 'text-warning',
      quality: 'text-info',
      style: 'text-success'
    };
    
    const severityBg = {
      high: 'bg-destructive/20 border-destructive/30',
      medium: 'bg-warning/20 border-warning/30',
      low: 'bg-info/20 border-info/30'
    };

    return {
      text: baseColors[type as keyof typeof baseColors] || 'text-muted-foreground',
      bg: severityBg[severity as keyof typeof severityBg] || 'bg-muted/20 border-muted/30'
    };
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const reset = () => {
    setCode("");
    setReview(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Code Input Section */}
      <div className="bg-card/20 border border-border/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-semibold">Code Input</h3>
          <div className="flex gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 bg-card/30 border border-border/20 rounded-lg text-sm"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="go">Go</option>
            </select>
            <button
              onClick={loadSampleCode}
              className="px-4 py-2 text-sm border border-border/20 rounded-lg hover:bg-card/30 transition-colors"
            >
              Load Sample
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={code}
            onChange={handleCodeChange}
            placeholder="Paste your code here for AI-powered review..."
            className="w-full h-64 p-4 bg-card/30 border border-border/20 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="px-4 py-2 text-sm border border-border/20 rounded-lg hover:bg-card/30 transition-colors min-h-[40px]"
            >
              Clear Code
            </button>
            <button
              onClick={reviewCode}
              disabled={!code.trim() || isReviewing}
              className="px-6 py-2 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm min-h-[40px] flex items-center gap-2"
            >
              {isReviewing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Reviewing...
                </>
              ) : (
                <>
                  <Code2 className="w-4 h-4" />
                  Review Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Processing Animation */}
      {isReviewing && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 text-muted-foreground">
            <div className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
            <span className="text-sm sm:text-base">AI is analyzing your code...</span>
          </div>
          <div className="mt-4 space-y-2 text-xs sm:text-sm text-muted-foreground">
            <p>🔍 Scanning for security vulnerabilities</p>
            <p>⚡ Analyzing performance bottlenecks</p>
            <p>✨ Checking code quality and best practices</p>
          </div>
        </div>
      )}

      {/* Review Results */}
      {review && !isReviewing && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="p-4 sm:p-6 bg-brand-10 border border-brand-30 rounded-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Review Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand">{review.summary.totalIssues}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Total Issues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{review.summary.securityIssues}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Security</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{review.summary.performanceIssues}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Performance</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">Code Quality</div>
                <div className="text-xs text-brand">{review.summary.codeQuality}</div>
              </div>
            </div>
          </div>

          {/* Issues */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Issues Found</h4>
            {review.issues.map((issue, index) => {
              const colors = getIssueColor(issue.type, issue.severity);
              return (
                <div key={index} className={`p-4 sm:p-6 border rounded-xl ${colors.bg}`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 p-2 rounded-lg bg-card/20 ${colors.text}`}>
                      {getIssueIcon(issue.type)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <h5 className="font-medium text-sm sm:text-base">{issue.title}</h5>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-card/20 capitalize">
                            {issue.type}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${colors.bg} capitalize`}>
                            {issue.severity}
                          </span>
                          <span className="text-xs text-muted-foreground">Line {issue.line}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {issue.description}
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Suggestion:</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {issue.suggestion}
                        </p>
                      </div>
                      {issue.improvedCode && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">Improved Code:</p>
                            <button
                              onClick={() => copyToClipboard(issue.improvedCode!, index)}
                              className="text-xs px-2 py-1 bg-card/20 rounded hover:bg-card/30 transition-colors flex items-center gap-1"
                            >
                              {copiedIndex === index ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="text-xs p-3 bg-card/30 rounded-lg overflow-x-auto">
                            <code>{issue.improvedCode}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}