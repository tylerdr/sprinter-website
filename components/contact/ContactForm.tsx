"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
  projectType: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    projectType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        <p className="text-gray-400 mb-4">
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
              message: "",
              projectType: "",
            });
          }}
          className="text-info hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background rounded-sm"
        >
          Send another message
        </button>
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
      <h2 className="text-2xl font-bold mb-6">Start Your AI Journey</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="name-required"
            className="w-full px-4 py-3 rounded-lg bg-card/30 border border-border/20 focus:border-[color:var(--brand-start)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] transition-colors"
          />
          <span id="name-required" className="sr-only">
            Required field
          </span>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="email-required"
            className="w-full px-4 py-3 rounded-lg bg-card/30 border border-border/20 focus:border-[color:var(--brand-start)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] transition-colors"
          />
          <span id="email-required" className="sr-only">
            Required field
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-card/30 border border-border/20 focus:border-[color:var(--brand-start)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] transition-colors"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="projectType" className="block text-sm font-medium mb-2">
          What can we help you with? *
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          aria-required="true"
          aria-describedby="projectType-required"
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="">Select an option</option>
          <option value="discovery">AI Discovery Workshop</option>
          <option value="development">Custom AI Development</option>
          <option value="venture">Venture Partnership</option>
          <option value="speaking">Speaking/Training</option>
          <option value="other">Other</option>
        </select>
        <span id="projectType-required" className="sr-only">
          Required field
        </span>
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Tell us about your project *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          aria-required="true"
          aria-describedby="message-required"
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-card/30 border border-border/20 focus:border-[color:var(--brand-start)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] transition-colors resize-none"
          placeholder="Describe your vision, challenges, or ideas..."
        />
        <span id="message-required" className="sr-only">
          Required field
        </span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center gap-2 px-8 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2"
      >
        {isSubmitting ? (
          <>
            <div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
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
