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
    year: "Before Sprinter",
    title: "Engineering Foundation",
    description: "Engineer at Exxon; led digital transformation initiatives and built software to run maintenance planning. Launched a construction/roofing business; built the operations systems we needed when off-the-shelf options failed.",
    icon: Building,
    highlight: true
  },
  {
    year: "2018",
    title: "Founded Sprinter",
    description: "Left Exxon. Founded Sprinter to build software that helps people do more of the work only they can do.",
    icon: Rocket,
    highlight: true
  },
  {
    year: "2019",
    title: "First AI Workshops",
    description: "First AI workshops (design thinking + agile) to identify use cases and ship prototypes with clients. Began building and iterating on multiple SaaS ideas (learned a lot the hard way).",
    icon: Users
  },
  {
    year: "2020",
    title: "GPT-3 Integration",
    description: "First GPT-3 integration. Realized text → actions → agents would become the new UI.",
    icon: Zap,
    highlight: true
  },
  {
    year: "2021",
    title: "Agentic Patterns",
    description: "Formalized agentic patterns (APIs, tools, decisions, actions).",
    icon: Heart
  },
  {
    year: "2022",
    title: "Workshop Platform",
    description: "Launched a formal workshop offering; built Amble Ideation to run collaborative, AI-powered workshops at scale.",
    icon: TrendingUp
  },
  {
    year: "2023–2025",
    title: "Production Systems",
    description: "Built and shipped production systems and products across finance, healthcare, manufacturing and logistics—turning unstructured data and messy workflows into decisions and outcomes.",
    icon: Trophy,
    highlight: true,
    metrics: "Production systems across multiple industries"
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
          From engineering foundations to production AI systems, we&apos;ve stayed true 
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
              : "bg-card/20 border-border/30"
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