"use client";

import { motion } from "framer-motion";
import { Users, Heart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookDemoButton } from "@/components/shared/book-demo-button";

export function PeopleFirstHero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8">
            <Heart className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">People-First Approach</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Our People-First Approach to AI
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Technology isn't the hard part—adoption is. We start small with a use case that improves everyday work.
            When employees feel the win, momentum takes care of the rest.
          </p>

          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card/50 backdrop-blur-sm border rounded-lg p-6"
            >
              <Users className="w-8 h-8 text-blue-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">From "AI done to me" to "AI done for me"</h3>
              <p className="text-sm text-muted-foreground">
                Transform fear into excitement by showing how AI makes work enjoyable again.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-card/50 backdrop-blur-sm border rounded-lg p-6"
            >
              <Heart className="w-8 h-8 text-purple-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Lunch breaks are back</h3>
              <p className="text-sm text-muted-foreground">
                Let computers do the paper, so people do the thinking. Work on what matters.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-card/50 backdrop-blur-sm border rounded-lg p-6"
            >
              <TrendingUp className="w-8 h-8 text-green-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Start where it improves someone's day</h3>
              <p className="text-sm text-muted-foreground">
                Begin with one specific use case. Build trust. Then expand.
              </p>
            </motion.div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookDemoButton text="Book People-First Workshop" size="lg" />
            <Button asChild variant="outline" size="lg">
              <Link href="/approach/wedge">Find Your Wedge →</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}