"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookDemoButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
  text?: string;
}

export function BookDemoButton({
  variant = "default",
  size = "default",
  className = "",
  text = "Book a Demo",
}: BookDemoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleBookDemo = () => {
    // For now, we'll use Calendly embed or redirect to calendar link
    // In production, you'd integrate with actual calendar API
    window.open("https://calendly.com/sprinter-ai/demo", "_blank");
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={`gap-2 ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <Calendar className="w-4 h-4" />
        {text}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-500" />
              Schedule Your AI Strategy Session
            </DialogTitle>
            <DialogDescription>
              Get a personalized demo and discover how AI can transform your portfolio companies.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  handleBookDemo();
                  setIsOpen(false);
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all"
              >
                <Clock className="w-8 h-8 text-blue-500" />
                <div className="text-center">
                  <div className="font-semibold">30-min Demo</div>
                  <div className="text-xs text-muted-foreground">Quick overview</div>
                </div>
              </button>

              <button
                onClick={() => {
                  window.open("https://calendly.com/sprinter-ai/strategy", "_blank");
                  setIsOpen(false);
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-border hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all"
              >
                <Calendar className="w-8 h-8 text-purple-500" />
                <div className="text-center">
                  <div className="font-semibold">Strategy Call</div>
                  <div className="text-xs text-muted-foreground">Deep dive session</div>
                </div>
              </button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>🗓️ Available times: Mon-Fri, 9am-5pm EST</p>
              <p>📧 Or email us at <a href="mailto:hello@sprinter.ai" className="text-blue-500 hover:underline">hello@sprinter.ai</a></p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}