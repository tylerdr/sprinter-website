"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface LabGateProps {
  labId: string;
  labName: string;
  onUnlock?: () => void;
  className?: string;
}

export function LabGate({ labId, labName, onUnlock, className }: LabGateProps) {
  const [email, setEmail] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if user has already unlocked labs
    const unlockedLabs = localStorage.getItem("unlocked_labs");
    const userEmail = localStorage.getItem("lab_email");
    
    if (unlockedLabs === "all" || userEmail) {
      setIsUnlocked(true);
      onUnlock?.();
    }
  }, [onUnlock]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    try {
      // Save to localStorage
      localStorage.setItem("lab_email", email);
      localStorage.setItem("unlocked_labs", "all");
      
      // Track in Supabase
      await supabase.from("leads").insert({
        email,
        source: `lab_${labId}`,
        metadata: { lab_name: labName },
      });
      
      // Show success state
      setShowSuccess(true);
      setTimeout(() => {
        setIsUnlocked(true);
        onUnlock?.();
      }, 1500);
      
    } catch (error) {
      console.error("Error unlocking lab:", error);
      // Still unlock even if tracking fails
      setIsUnlocked(true);
      onUnlock?.();
    } finally {
      setIsLoading(false);
    }
  };

  if (isUnlocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm",
          className
        )}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
            {!showSuccess ? (
              <>
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-brand-gradient rounded-full">
                    <Lock className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-center mb-3">
                  Unlock All AI Labs
                </h2>
                
                <p className="text-muted-foreground text-center mb-6">
                  Get unlimited access to all interactive AI demonstrations. 
                  We&apos;ll also send you implementation guides and best practices.
                </p>

                <form onSubmit={handleUnlock} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="work@company.com"
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-gradient"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        Unlocking...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Unlock All Labs Free
                      </span>
                    )}
                  </Button>
                </form>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  No credit card required • Instant access • Implementation guides included
                </p>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-success-10 rounded-full">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">All Labs Unlocked!</h3>
                <p className="text-muted-foreground">
                  Check your email for implementation guides
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}