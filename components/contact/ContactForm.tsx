"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Lightbulb, Wand2, CheckCircle } from "lucide-react";

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

const inputClass =
  "w-full rounded-[var(--spr-radius-sm)] border [border-color:var(--spr-border)] bg-[color:var(--spr-surface)] px-4 py-2.5 text-sm text-[color:var(--spr-text)] placeholder:text-[color:var(--spr-text-muted)] outline-none transition-colors focus:border-[color:var(--spr-primary)] focus:ring-1 focus:ring-[color:var(--spr-primary)]";

const selectClass =
  "w-full appearance-none rounded-[var(--spr-radius-sm)] border [border-color:var(--spr-border)] bg-[color:var(--spr-surface)] px-4 py-2.5 text-sm text-[color:var(--spr-text)] outline-none transition-colors focus:border-[color:var(--spr-primary)] focus:ring-1 focus:ring-[color:var(--spr-primary)]";

const labelClass = "text-sm font-medium text-[color:var(--spr-text)]";

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

  const calculateCompletionScore = useMemo(() => {
    const requiredFields = ['name', 'email', 'message', 'projectType'];
    const optionalFields = ['company', 'role', 'fundSize', 'portfolioCount', 'timeline'];

    const requiredFilled = requiredFields.filter(field =>
      formData[field as keyof FormData].trim() !== ''
    ).length;
    const optionalFilled = optionalFields.filter(field =>
      formData[field as keyof FormData].trim() !== ''
    ).length;

    const requiredScore = (requiredFilled / requiredFields.length) * 60;
    const optionalScore = (optionalFilled / optionalFields.length) * 40;

    return Math.round(requiredScore + optionalScore);
  }, [formData]);

  useEffect(() => {
    setCompletionScore(calculateCompletionScore);
  }, [calculateCompletionScore]);

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

  const generateAISuggestions = async (projectType: string) => {
    if (!projectType || projectType === 'other') return;

    setIsGeneratingSuggestions(true);

    try {
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

    validateField(name, value);

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
        className="spr-card spr-card-accent p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[color:rgba(106,167,255,0.18)]">
          <Sparkles className="h-8 w-8 text-[color:var(--spr-primary)]" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-[color:var(--spr-text)] mb-2">Message Received!</h2>
        <p className="text-[color:var(--spr-text-muted)] mb-4">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours to
          discuss your AI project.
        </p>
        <button
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
          className="text-[color:var(--spr-primary)] underline-offset-4 hover:underline text-sm font-medium"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="spr-card p-8"
      noValidate
      aria-label="Contact form"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[color:var(--spr-text)]">Start Your AI Journey</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm text-[color:var(--spr-text-muted)]">Progress</div>
          <div className="w-20 h-2 rounded-full overflow-hidden bg-[color:var(--spr-surface-strong)]">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, var(--spr-primary), var(--spr-accent))" }}
              initial={{ width: 0 }}
              animate={{ width: `${completionScore}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-sm font-medium text-[color:var(--spr-primary)]">{completionScore}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label htmlFor="name" className={labelClass}>Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="name-required"
            className={inputClass}
          />
          <span id="name-required" className="sr-only">Required field</span>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="email-required"
            className={`${inputClass} ${validationErrors.email ? 'border-red-500' : ''}`}
          />
          {validationErrors.email && (
            <p className="text-sm text-red-400">{validationErrors.email}</p>
          )}
          <span id="email-required" className="sr-only">Required field</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label htmlFor="company" className={labelClass}>Company / Fund</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={inputClass}
            placeholder="Vista Equity Partners"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className={labelClass}>Your Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Select role</option>
            <option value="partner">Partner / Managing Director</option>
            <option value="principal">Principal / VP</option>
            <option value="associate">Associate / Analyst</option>
            <option value="operating">Operating Partner</option>
            <option value="portfolio">Portfolio Company Exec</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label htmlFor="fundSize" className={labelClass}>Fund Size (AUM)</label>
          <select
            id="fundSize"
            name="fundSize"
            value={formData.fundSize}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Select range</option>
            <option value="<500M">&lt; $500M</option>
            <option value="500M-1B">$500M - $1B</option>
            <option value="1B-5B">$1B - $5B</option>
            <option value="5B-10B">$5B - $10B</option>
            <option value="10B+">$10B+</option>
            <option value="not-pe">Not a PE firm</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="portfolioCount" className={labelClass}>Portfolio Companies</label>
          <select
            id="portfolioCount"
            name="portfolioCount"
            value={formData.portfolioCount}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Select range</option>
            <option value="1-5">1-5 companies</option>
            <option value="6-15">6-15 companies</option>
            <option value="16-30">16-30 companies</option>
            <option value="30+">30+ companies</option>
            <option value="n/a">Not applicable</option>
          </select>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <label htmlFor="projectType" className={labelClass}>What can we help you with? *</label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          aria-required="true"
          aria-describedby="projectType-required"
          className={selectClass}
        >
          <option value="">Select an option</option>
          <option value="portfolio-ai">Portfolio AI Transformation</option>
          <option value="deal-sourcing">Deal Sourcing Automation</option>
          <option value="due-diligence">Due Diligence Acceleration</option>
          <option value="value-creation">Portfolio Value Creation</option>
          <option value="operating-partner">Operating Partnership</option>
          <option value="lp-reporting">LP Reporting Automation</option>
          <option value="discovery">AI Discovery Workshop</option>
          <option value="other">Other</option>
        </select>
        <span id="projectType-required" className="sr-only">Required field</span>
      </div>

      <div className="mb-6 space-y-2">
        <label htmlFor="timeline" className={labelClass}>Timeline</label>
        <select
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="">When do you need this?</option>
          <option value="immediate">Immediate (This quarter)</option>
          <option value="next-quarter">Next Quarter</option>
          <option value="h2">Second Half of Year</option>
          <option value="exploring">Just exploring</option>
        </select>
      </div>

      <div className="mb-6 space-y-2">
        <label htmlFor="message" className={labelClass}>Tell us about your project *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          aria-required="true"
          aria-describedby="message-required"
          rows={5}
          className={`${inputClass} resize-none ${validationErrors.message ? 'border-red-500' : ''}`}
          placeholder="Describe your vision, challenges, or ideas..."
        />
        {validationErrors.message && (
          <p className="text-sm text-red-400">{validationErrors.message}</p>
        )}
        <span id="message-required" className="sr-only">Required field</span>
      </div>

      {/* AI Suggestions */}
      <AnimatePresence>
        {(isGeneratingSuggestions || aiSuggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 rounded-[var(--spr-radius-sm)] border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.08)] p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="w-4 h-4 text-[color:var(--spr-primary)]" />
              <h3 className="text-sm font-medium text-[color:var(--spr-primary)]">AI Suggestions</h3>
              {isGeneratingSuggestions && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--spr-primary)] border-t-transparent" />
              )}
            </div>

            {isGeneratingSuggestions ? (
              <p className="text-sm text-[color:var(--spr-text-muted)]">Generating personalized suggestions...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-[color:var(--spr-text-muted)] mb-3">
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
                    className="flex items-start gap-2 p-3 rounded-[var(--spr-radius-sm)] border [border-color:var(--spr-border)] bg-[color:var(--spr-surface)] hover:border-[color:var(--spr-primary)] transition-colors text-left w-full group"
                  >
                    <Lightbulb className="w-4 h-4 text-[color:var(--spr-accent)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-[color:var(--spr-text-soft)] group-hover:text-[color:var(--spr-text)] transition-colors">
                        {suggestion}
                      </p>
                    </div>
                    <span className="spr-chip opacity-0 group-hover:opacity-100 transition-opacity">Add</span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isSubmitting}
        className="spr-button spr-button-primary w-full md:w-auto disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <div
              className="h-5 w-5 animate-spin rounded-full border-2 border-[#071122]/30 border-t-[#071122]"
              aria-hidden="true"
            />
            <span>Sending...</span>
            <span className="sr-only">Form is being submitted</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
