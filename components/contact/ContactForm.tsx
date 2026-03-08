"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Lightbulb, Wand2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  companySize: string;
  industry: string;
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
    companySize: "",
    industry: "",
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
    const optionalFields = ['company', 'role', 'companySize', 'industry', 'timeline'];

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
        'ai-sprint': [
          'Map our key operational workflows and identify automation opportunities',
          'Quantify time spent on repetitive tasks across departments',
          'Identify the top 3 highest-ROI AI agent deployments for our business'
        ],
        'ai-deployment': [
          'Deploy AI agents to handle quoting, follow-ups, or data entry',
          'Automate invoice processing and approval routing',
          'Build AI-powered customer communication and lead response'
        ],
        'custom-build': [
          'Build a custom AI platform for our specific industry needs',
          'Create a multi-source data intelligence system',
          'Develop AI-powered analytics and reporting dashboards'
        ],
        'advisory': [
          'Get executive-level guidance on AI strategy and roadmap',
          'Evaluate current AI tools and vendor relationships',
          'Build an internal AI capability development plan'
        ],
        'discovery': [
          'Understand what AI can do for our specific business',
          'Get a clear picture of ROI before committing to a project',
          'Learn how other businesses in our industry use AI agents'
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
              companySize: "",
              industry: "",
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
            className={inputClass}
          />
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
            className={`${inputClass} ${validationErrors.email ? 'border-red-500' : ''}`}
          />
          {validationErrors.email && (
            <p className="text-sm text-red-400">{validationErrors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label htmlFor="company" className={labelClass}>Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your company name"
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
            <option value="owner">Owner / Founder</option>
            <option value="ceo">CEO / President</option>
            <option value="cto">CTO / VP Engineering</option>
            <option value="coo">COO / VP Operations</option>
            <option value="director">Director / Manager</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label htmlFor="companySize" className={labelClass}>Company Size</label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Select range</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="industry" className={labelClass}>Industry</label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Select industry</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="construction">Construction / Trades</option>
            <option value="kitchen-bath">Kitchen &amp; Bath</option>
            <option value="wine-spirits">Wine &amp; Spirits</option>
            <option value="healthcare">Healthcare</option>
            <option value="financial-services">Financial Services</option>
            <option value="real-estate">Real Estate</option>
            <option value="retail">Retail / E-commerce</option>
            <option value="professional-services">Professional Services</option>
            <option value="other">Other</option>
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
          className={selectClass}
        >
          <option value="">Select an option</option>
          <option value="ai-sprint">AI Readiness Sprint ($2,500)</option>
          <option value="ai-deployment">AI Agent Deployment (monthly)</option>
          <option value="custom-build">Custom AI System Build</option>
          <option value="advisory">AI Strategy / Advisory</option>
          <option value="discovery">Just exploring what AI can do</option>
          <option value="other">Other</option>
        </select>
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
          <option value="asap">ASAP</option>
          <option value="this-month">This month</option>
          <option value="this-quarter">This quarter</option>
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
          rows={5}
          className={`${inputClass} resize-none ${validationErrors.message ? 'border-red-500' : ''}`}
          placeholder="What processes eat the most time? What would you automate first?"
        />
        {validationErrors.message && (
          <p className="text-sm text-red-400">{validationErrors.message}</p>
        )}
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
              <h3 className="text-sm font-medium text-[color:var(--spr-primary)]">Ideas to Get Started</h3>
              {isGeneratingSuggestions && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--spr-primary)] border-t-transparent" />
              )}
            </div>

            {isGeneratingSuggestions ? (
              <p className="text-sm text-[color:var(--spr-text-muted)]">Generating suggestions...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-[color:var(--spr-text-muted)] mb-3">
                  Click any of these to add to your message:
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
