"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Calendar,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
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

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              Let's Build Together
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Work With <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to build something amazing with AI? Let&apos;s discuss your
            vision and how we can help bring it to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Start Your AI Journey
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    What can we help you with? *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select an option</option>
                    <option value="discovery">AI Discovery Workshop</option>
                    <option value="development">Custom AI Development</option>
                    <option value="venture">Venture Partnership</option>
                    <option value="speaking">Speaking/Training</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    placeholder="Describe your vision, challenges, or ideas..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Message Received!</h2>
                <p className="text-gray-400 mb-4">
                  Thanks for reaching out. We&apos;ll get back to you within 24
                  hours to discuss your AI project.
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
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>

              <div className="space-y-4">
                <a
                  href="mailto:hello@sprinter.ai"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>hello@sprinter.ai</span>
                </a>

                <a
                  href="tel:+14155551234"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+1 (415) 555-1234</span>
                </a>

                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 mt-0.5" />
                  <span>
                    San Francisco, CA
                    <br />
                    United States
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/30">
              <Calendar className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-xl font-semibold mb-2">
                Book a Discovery Call
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Prefer to talk? Schedule a 30-minute call to discuss your AI
                needs.
              </p>
              <a
                href="mailto:hello@sprinter.ai?subject=Discovery%20Call"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 font-medium rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Schedule Call
              </a>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Response Time</h3>
              <p className="text-sm text-gray-400">
                We typically respond within 24 hours during business days. For
                urgent matters, please call directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
