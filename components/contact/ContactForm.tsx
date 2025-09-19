"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Lightbulb, Wand2, CheckCircle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-states";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  fundSize: string;
  portfolioCount: string;
  timeline: string;
  message: string;
  projectType: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    fundSize: "",
    portfolioCount: "",
    timeline: "",
    message: "",
    projectType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({});
  const [completionScore, setCompletionScore] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      setSubmitted(true);
    } catch (err) {
      alert("We could not send your message. Please email hello@sprinter.ai.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate form completion score
  const calculateCompletionScore = useMemo(() => {
    const requiredFields = ['name', 'email', 'message', 'projectType'];
    const optionalFields = ['company', 'role', 'fundSize', 'portfolioCount', 'timeline'];

    const requiredFilled = requiredFields.filter(field =>
      formData[field as keyof FormData].trim() !== ''
    ).length;
    const optionalFilled = optionalFields.filter(field =>
      formData[field as keyof FormData].trim() !== ''
    ).length;

    const requiredScore = (requiredFilled / requiredFields.length) * 60; // 60% for required
    const optionalScore = (optionalFilled / optionalFields.length) * 40; // 40% for optional

    return Math.round(requiredScore + optionalScore);
  }, [formData]);

  useEffect(() => {
    setCompletionScore(calculateCompletionScore);
  }, [calculateCompletionScore]);

  // AI-powered form validation
  const validateField = (name: string, value: string) => {
    const errors: Partial<FormData> = {};

    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      case 'message':
        if (value.length > 0 && value.length < 10) {
          errors.message = 'Please provide more details (at least 10 characters)';
        }
        break;
    }

    setValidationErrors(prev => ({ ...prev, [name]: errors[name as keyof FormData] }));
  };

  // Generate AI suggestions based on selected project type
  const generateAISuggestions = async (projectType: string) => {
    if (!projectType || projectType === 'other') return;

    setIsGeneratingSuggestions(true);

    try {
      // Simulate AI suggestion generation with predefined suggestions
      await new Promise(resolve => setTimeout(resolve, 1500));

      const suggestionMap: Record<string, string[]> = {
        'portfolio-ai': [
          'Implement automated data extraction from portfolio company reports',
          'Create AI-powered performance dashboards for real-time insights',
          'Develop predictive models for identifying value creation opportunities'
        ],
        'deal-sourcing': [
          'Build automated deal screening using market data and criteria',
          'Create AI-powered market analysis for sector opportunities',
          'Implement intelligent CRM integration for deal flow management'
        ],
        'due-diligence': [
          'Automate document review and data room analysis',
          'Create risk assessment models using historical data',
          'Implement automated reference checking and verification'
        ],
        'value-creation': [
          'Develop operational efficiency optimization algorithms',
          'Create predictive analytics for revenue growth opportunities',
          'Implement automated benchmarking against industry peers'
        ],
        'operating-partner': [
          'Build portfolio company performance monitoring systems',
          'Create automated reporting and insights generation',
          'Implement AI-driven operational improvement recommendations'
        ],
        'lp-reporting': [
          'Automate quarterly report generation and formatting',
          'Create dynamic performance visualization dashboards',
          'Implement real-time portfolio valuation tracking'
        ],
        'discovery': [
          'Conduct AI readiness assessment across your portfolio',
          'Identify high-impact automation opportunities',
          'Create custom AI implementation roadmap'
        ]
      };

      setAiSuggestions(suggestionMap[projectType] || []);
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field on change
    validateField(name, value);

    // Generate suggestions when project type changes
    if (name === 'projectType' && value) {
      generateAISuggestions(value);
    }
  };

  const applySuggestion = (suggestion: string) => {
    const currentMessage = formData.message;
    const newMessage = currentMessage
      ? `${currentMessage}\n\n${suggestion}`
      : suggestion;

    setFormData(prev => ({ ...prev, message: newMessage }));
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl text-center border border-success-30 bg-success-10"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-success-10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-success" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Message Received!</h2>
        <p className="text-muted-foreground mb-4">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours to
          discuss your AI project.
        </p>
        <Button
          variant="link"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              company: "",
              role: "",
              fundSize: "",
              portfolioCount: "",
              timeline: "",
              message: "",
              projectType: "",
            });
          }}
          className="text-info hover:text-foreground"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 rounded-2xl bg-card/20 border border-border/30 backdrop-blur-sm"
      noValidate
      aria-label="Contact form"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Start Your AI Journey</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Progress</div>
          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${completionScore}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-sm font-medium text-brand">{completionScore}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="name-required"
            className="bg-background/50"
          />
          <span id="name-required" className="sr-only">
            Required field
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="email-required"
            className={`bg-background/50 ${
              validationErrors.email ? 'border-destructive' : ''
            }`}
          />
          {validationErrors.email && (
            <p className="text-sm text-destructive">{validationErrors.email}</p>
          )}
          <span id="email-required" className="sr-only">
            Required field
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="company">Company / Fund</Label>
          <Input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="bg-background/50"
            placeholder="Vista Equity Partners"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Your Role</Label>
          <Select
            name="role"
            value={formData.role}
            onValueChange={(value) => 
              setFormData((prev) => ({ ...prev, role: value }))
            }
          >
            <SelectTrigger id="role" className="bg-background/50">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="partner">Partner / Managing Director</SelectItem>
              <SelectItem value="principal">Principal / VP</SelectItem>
              <SelectItem value="associate">Associate / Analyst</SelectItem>
              <SelectItem value="operating">Operating Partner</SelectItem>
              <SelectItem value="portfolio">Portfolio Company Exec</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="fundSize">Fund Size (AUM)</Label>
          <Select
            name="fundSize"
            value={formData.fundSize}
            onValueChange={(value) => 
              setFormData((prev) => ({ ...prev, fundSize: value }))
            }
          >
            <SelectTrigger id="fundSize" className="bg-background/50">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="&lt;500M">&lt; $500M</SelectItem>
              <SelectItem value="500M-1B">$500M - $1B</SelectItem>
              <SelectItem value="1B-5B">$1B - $5B</SelectItem>
              <SelectItem value="5B-10B">$5B - $10B</SelectItem>
              <SelectItem value="10B+">$10B+</SelectItem>
              <SelectItem value="not-pe">Not a PE firm</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolioCount">Portfolio Companies</Label>
          <Select
            name="portfolioCount"
            value={formData.portfolioCount}
            onValueChange={(value) => 
              setFormData((prev) => ({ ...prev, portfolioCount: value }))
            }
          >
            <SelectTrigger id="portfolioCount" className="bg-background/50">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5 companies</SelectItem>
              <SelectItem value="6-15">6-15 companies</SelectItem>
              <SelectItem value="16-30">16-30 companies</SelectItem>
              <SelectItem value="30+">30+ companies</SelectItem>
              <SelectItem value="n/a">Not applicable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <Label htmlFor="projectType">What can we help you with? *</Label>
        <Select
          name="projectType"
          value={formData.projectType}
          onValueChange={(value) => 
            setFormData((prev) => ({ ...prev, projectType: value }))
          }
          required
          aria-required="true"
          aria-describedby="projectType-required"
        >
          <SelectTrigger id="projectType" className="bg-background/50">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portfolio-ai">Portfolio AI Transformation</SelectItem>
            <SelectItem value="deal-sourcing">Deal Sourcing Automation</SelectItem>
            <SelectItem value="due-diligence">Due Diligence Acceleration</SelectItem>
            <SelectItem value="value-creation">Portfolio Value Creation</SelectItem>
            <SelectItem value="operating-partner">Operating Partnership</SelectItem>
            <SelectItem value="lp-reporting">LP Reporting Automation</SelectItem>
            <SelectItem value="discovery">AI Discovery Workshop</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <span id="projectType-required" className="sr-only">
          Required field
        </span>
      </div>

      <div className="mb-6 space-y-2">
        <Label htmlFor="timeline">Timeline</Label>
        <Select
          name="timeline"
          value={formData.timeline}
          onValueChange={(value) => 
            setFormData((prev) => ({ ...prev, timeline: value }))
          }
        >
          <SelectTrigger id="timeline" className="bg-background/50">
            <SelectValue placeholder="When do you need this?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Immediate (This quarter)</SelectItem>
            <SelectItem value="q1-2025">Q1 2025</SelectItem>
            <SelectItem value="q2-2025">Q2 2025</SelectItem>
            <SelectItem value="h2-2025">H2 2025</SelectItem>
            <SelectItem value="exploring">Just exploring</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6 space-y-2">
        <Label htmlFor="message">Tell us about your project *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          aria-required="true"
          aria-describedby="message-required"
          rows={5}
          className={`bg-background/50 resize-none ${
            validationErrors.message ? 'border-destructive' : ''
          }`}
          placeholder="Describe your vision, challenges, or ideas..."
        />
        {validationErrors.message && (
          <p className="text-sm text-destructive">{validationErrors.message}</p>
        )}
        <span id="message-required" className="sr-only">
          Required field
        </span>
      </div>

      {/* AI Suggestions */}
      <AnimatePresence>
        {(isGeneratingSuggestions || aiSuggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-lg bg-info/5 border border-info/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="w-4 h-4 text-info" />
              <h3 className="text-sm font-medium text-info">AI Suggestions</h3>
              {isGeneratingSuggestions && <LoadingSpinner size="sm" />}
            </div>

            {isGeneratingSuggestions ? (
              <p className="text-sm text-muted-foreground">Generating personalized suggestions...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your project type, here are some ideas you might want to include:
                </p>
                {aiSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    type="button"
                    onClick={() => applySuggestion(suggestion)}
                    className="flex items-start gap-2 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors text-left w-full group"
                  >
                    <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm group-hover:text-foreground transition-colors">
                        {suggestion}
                      </p>
                    </div>
                    <Badge variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Add
                    </Badge>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        disabled={isSubmitting}
        variant="gradient"
        size="lg"
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <div
              className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"
              aria-hidden="true"
            />
            <span>Sending...</span>
            <span className="sr-only">Form is being submitted</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" aria-hidden="true" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
