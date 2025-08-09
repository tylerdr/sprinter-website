"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  logo?: string;
  image?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  showMetrics?: boolean;
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Sprinter AI's automation reduced our loan processing time by 70%, saving us over $3M annually. Their team delivered in weeks what others quoted months for.",
    author: "Michael Rodriguez",
    title: "SVP Operations",
    company: "Pacific Trust Bank",
    metrics: [
      { label: "Time Saved", value: "70%" },
      { label: "Annual Savings", value: "$3M+" }
    ]
  },
  {
    id: "2",
    quote: "The discovery workshop identified 3 high-ROI automation opportunities. We started with one sprint and now have AI handling 40% of our data operations.",
    author: "Sarah Martinez",
    title: "Managing Partner",
    company: "Beckway",
    metrics: [
      { label: "AI Coverage", value: "40%" },
      { label: "ROI", value: "320%" }
    ]
  },
  {
    id: "3",
    quote: "During COVID, they built our triage system in 10 days. It processed 10,000+ patients daily and reduced ER wait times by 4 hours.",
    author: "Dr. Sarah Chen",
    title: "Chief Medical Officer",
    company: "Seattle Health Network",
    metrics: [
      { label: "Patients/Day", value: "10K+" },
      { label: "Wait Reduction", value: "4 hrs" }
    ]
  },
  {
    id: "4",
    quote: "What impressed us most was their hands-on approach. They didn't just provide recommendations—they built, deployed, and trained our team.",
    author: "James Wilson",
    title: "CTO",
    company: "Vero Capital",
    metrics: [
      { label: "Deployment", value: "2 weeks" },
      { label: "Team Trained", value: "50+" }
    ]
  },
  {
    id: "5",
    quote: "The AI agents they built transformed our portfolio analysis. What took analysts days now happens in minutes with better accuracy.",
    author: "Lisa Thompson",
    title: "Principal",
    company: "Rock Hill Capital",
    metrics: [
      { label: "Speed", value: "100x" },
      { label: "Accuracy", value: "95%" }
    ]
  }
];

const clientLogos = [
  "Vero Capital",
  "Rock Hill Capital",
  "Beckway",
  "Wells Fargo",
  "Accenture",
  "Broadlume",
  "Pacific Trust Bank",
  "Seattle Health Network"
];

export function TestimonialCarousel({
  testimonials = defaultTestimonials,
  autoPlay = true,
  interval = 5000,
  showMetrics = true,
  className = ""
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, interval, testimonials.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className={cn("py-16", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-10 border border-success-30 mb-6">
            <Quote className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-success">
              Client Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From startups to Fortune 500s, we&apos;ve helped organizations transform 
            with AI that delivers measurable results.
          </p>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/20 border border-border/30 hover:bg-card/30 transition-all">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {client}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card/20 border border-border/30 rounded-2xl p-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quote Section */}
                <div className="lg:col-span-2">
                  <Quote className="w-12 h-12 text-brand mb-6" />
                  <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-6 leading-relaxed">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </blockquote>
                  
                  <div className="flex items-center gap-4">
                    {testimonials[currentIndex].image ? (
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].author}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand to-brand-end flex items-center justify-center text-white font-bold text-xl">
                        {testimonials[currentIndex].author
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-lg">
                        {testimonials[currentIndex].author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].title}
                      </div>
                      <div className="text-sm text-brand">
                        {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics Section */}
                {showMetrics && testimonials[currentIndex].metrics && (
                  <div className="lg:border-l lg:border-border/20 lg:pl-8">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                      Impact Metrics
                    </h3>
                    <div className="space-y-4">
                      {testimonials[currentIndex].metrics.map((metric, index) => (
                        <div key={index}>
                          <div className="text-3xl font-bold gradient-text">
                            {metric.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 rounded-full bg-card/30 border border-border/20 hover:bg-card/40 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 rounded-full bg-card/30 border border-border/20 hover:bg-card/40 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-8 bg-brand"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}