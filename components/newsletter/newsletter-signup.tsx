"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface NewsletterSignupProps {
  className?: string;
  variant?: "default" | "compact" | "footer";
  placeholder?: string;
  title?: string;
  description?: string;
}

export function NewsletterSignup({
  className = "",
  variant = "default",
  placeholder = "Enter your email",
  title = "Stay Updated",
  description = "Get the latest AI insights and case studies delivered to your inbox"
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");

    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      // Check if already subscribed (from localStorage)
      const existingSubscriptions = JSON.parse(
        localStorage.getItem("newsletter_subscriptions") || "[]"
      );

      if (existingSubscriptions.includes(email.toLowerCase())) {
        setStatus("success");
        setIsSignedUp(true);
        toast.success("You're already subscribed!");
        return;
      }

      // Try to save to Supabase
      try {
        const supabase = createClient();
        const { error: dbError } = await supabase
          .from("newsletter_subscribers")
          .insert({
            email: email.toLowerCase(),
            source: "footer_signup",
            subscribed_at: new Date().toISOString(),
            status: "active",
            tags: ["ai-insights", "case-studies"]
          });

        if (dbError && !dbError.message.includes("duplicate")) {
          console.error("Database error:", dbError);
          // Continue with local storage fallback
        }
      } catch (dbError) {
        console.error("Supabase error:", dbError);
        // Continue with local storage fallback
      }

      // Always save to localStorage as fallback
      existingSubscriptions.push(email.toLowerCase());
      localStorage.setItem(
        "newsletter_subscriptions",
        JSON.stringify(existingSubscriptions)
      );

      // Save additional data for later sync
      const pendingSubscriptions = JSON.parse(
        localStorage.getItem("pending_newsletter_subscriptions") || "[]"
      );
      pendingSubscriptions.push({
        email: email.toLowerCase(),
        timestamp: Date.now(),
        source: "footer_signup"
      });
      localStorage.setItem(
        "pending_newsletter_subscriptions",
        JSON.stringify(pendingSubscriptions)
      );

      setStatus("success");
      setIsSignedUp(true);
      toast.success("Successfully subscribed to our newsletter!");

      // Clear email after successful signup
      setTimeout(() => {
        setEmail("");
        setStatus("idle");
      }, 2000);

    } catch (error) {
      console.error("Newsletter signup error:", error);
      setStatus("error");
      toast.error(error instanceof Error ? error.message : "Failed to subscribe. Please try again.");

      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  if (variant === "compact") {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || isSignedUp}
          className="flex-1"
        />
        <Button
          onClick={handleSubmit}
          disabled={!email.trim() || status === "loading" || isSignedUp}
          size="sm"
          className="bg-brand-gradient"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`max-w-md ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-5 h-5 text-brand-start" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || isSignedUp}
            className="w-full"
          />
          <Button
            type="submit"
            disabled={!email.trim() || status === "loading" || isSignedUp}
            className="w-full bg-brand-gradient text-sm"
            size="sm"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Subscribed!
              </>
            ) : status === "error" ? (
              <>
                <AlertCircle className="w-4 h-4 mr-2" />
                Try Again
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </>
            )}
          </Button>
        </form>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-muted-foreground mt-2"
          >
            Check your email for confirmation.
          </motion.p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-gradient rounded-lg mb-4">
          <Mail className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || isSignedUp}
          className="w-full"
        />

        <Button
          type="submit"
          disabled={!email.trim() || status === "loading" || isSignedUp}
          className="w-full bg-brand-gradient"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Successfully Subscribed!
            </>
          ) : status === "error" ? (
            <>
              <AlertCircle className="w-4 h-4 mr-2" />
              Try Again
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Subscribe to Newsletter
            </>
          )}
        </Button>
      </form>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
        >
          <p className="text-sm text-green-600 dark:text-green-400">
            Welcome aboard! You'll receive our latest AI insights and case studies.
          </p>
        </motion.div>
      )}

      <p className="text-xs text-muted-foreground mt-4 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}