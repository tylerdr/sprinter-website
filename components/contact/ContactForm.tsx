"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
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
      <h2 className="text-2xl font-bold mb-6">Start Your AI Journey</h2>

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
            className="bg-background/50"
          />
          <span id="email-required" className="sr-only">
            Required field
          </span>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="bg-background/50"
        />
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
            <SelectItem value="discovery">AI Discovery Workshop</SelectItem>
            <SelectItem value="development">Custom AI Development</SelectItem>
            <SelectItem value="venture">Venture Partnership</SelectItem>
            <SelectItem value="speaking">Speaking/Training</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <span id="projectType-required" className="sr-only">
          Required field
        </span>
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
          className="bg-background/50 resize-none"
          placeholder="Describe your vision, challenges, or ideas..."
        />
        <span id="message-required" className="sr-only">
          Required field
        </span>
      </div>

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
