"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Calendar, 
  Rocket, 
  Heart,
  TrendingUp,
  Users,
  Building,
  Zap,
  Trophy
} from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
  metrics?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2018",
    title: "The Beginning",
    description: "Started in a garage with one mission: make AI practical for real businesses",
    icon: Rocket,
    highlight: true
  },
  {
    year: "2019",
    title: "First Production AI",
    description: "Deployed first production AI agent - automated 70% of loan processing for a regional bank",
    icon: Zap,
    metrics: "70% automation rate"
  },
  {
    year: "2020",
    title: "Pandemic Pivot",
    description: "Pivoted to healthcare during COVID - built triage systems handling 10K+ patients daily",
    icon: Heart,
    highlight: true,
    metrics: "10,000+ patients/day"
  },
  {
    year: "2021",
    title: "Venture Model Launch",
    description: "Launched venture model - became technical co-founders instead of just vendors",
    icon: Users,
    metrics: "5 partnerships"
  },
  {
    year: "2022",
    title: "Scale Milestone",
    description: "Our AI systems generated $5M+ in new revenue for clients",
    icon: TrendingUp,
    metrics: "$5M+ revenue generated"
  },
  {
    year: "2023",
    title: "Enterprise Breakthrough",
    description: "Fortune 500 breakthrough - deployed enterprise AI handling millions in transactions",
    icon: Building,
    highlight: true,
    metrics: "$100M+ transactions processed"
  },
  {
    year: "2024",
    title: "Industry Leader",
    description: "Now powering 50+ production AI systems generating $10M+ annually",
    icon: Trophy,
    metrics: "50+ live systems"
  }
];

export function CompanyTimeline() {
  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Journey
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From a garage startup to powering AI for Fortune 500s, we&apos;ve stayed true 
          to our mission: building AI that helps people thrive.
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        {/* Central line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-brand to-transparent hidden md:block" />

        {/* Timeline events */}
        <div className="space-y-12 md:space-y-16">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0;

            return (
              <TimelineItem
                key={event.year}
                event={event}
                index={index}
                isEven={isEven}
                Icon={Icon}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ 
  event, 
  index, 
  isEven, 
  Icon 
}: { 
  event: TimelineEvent; 
  index: number; 
  isEven: boolean; 
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
        !isEven ? "md:text-right" : ""
      }`}
    >
      {/* Content for desktop - left side */}
      <div className={`${!isEven ? "md:order-2" : ""}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl border transition-all ${
            event.highlight 
              ? "bg-gradient-to-br from-brand/10 to-brand-end/10 border-brand-30" 
              : "bg-card/5 border-border/10"
          }`}
        >
          <div className={`flex items-start gap-4 ${!isEven ? "md:flex-row-reverse md:text-left" : ""}`}>
            <div className={`p-3 rounded-lg ${
              event.highlight 
                ? "bg-brand-gradient" 
                : "bg-gradient-to-br from-purple-500/20 to-blue-500/20"
            }`}>
              <Icon className={`w-6 h-6 ${
                event.highlight ? "text-primary-foreground" : "text-purple-400"
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-brand">
                  {event.year}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {event.title}
              </h3>
              <p className="text-muted-foreground mb-3">
                {event.description}
              </p>
              {event.metrics && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-success-10 border border-success-30">
                  <span className="text-sm font-medium text-success">
                    {event.metrics}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline dot - center */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className={`w-4 h-4 rounded-full border-4 ${
            event.highlight 
              ? "bg-brand border-background shadow-lg shadow-brand/50" 
              : "bg-background border-brand-30"
          }`}
        />
      </div>

      {/* Spacer for desktop - right side */}
      <div className={`hidden md:block ${!isEven ? "md:order-1" : ""}`} />
    </motion.div>
  );
}