"use client";

/**
 * @author: @dorian_baffier
 * @description: Bento Grid
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import Anthropic from "@/components/kokonutui/anthropic";
import AnthropicDark from "@/components/kokonutui/anthropic-dark";
import Google from "@/components/kokonutui/gemini";
import OpenAI from "@/components/kokonutui/open-ai";
import OpenAIDark from "@/components/kokonutui/open-ai-dark";
import MistralAI from "@/components/kokonutui/mistral";
import DeepSeek from "@/components/kokonutui/deepseek";
import { cn } from "@/lib/utils";
import {
    Mic,
    Plus,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Sparkles,
    Zap,
} from "lucide-react";
import {
    motion,
    useMotionValue,
    useTransform,
    type Variants,
} from "motion/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface BentoItem {
    id: string;
    title: string;
    description: string;
    icons?: boolean;
    href?: string;
    feature?:
        | "chart"
        | "counter"
        | "timeline"
        | "spotlight"
        | "icons"
        | "metrics";
    spotlightItems?: string[];
    timeline?: Array<{ year: string; event: string }>;
    metrics?: Array<{
        label: string;
        value: number;
        suffix?: string;
        color?: string;
    }>;
    statistic?: {
        value: string;
        label: string;
        start?: number;
        end?: number;
        suffix?: string;
    };
    size?: "sm" | "md" | "lg";
    className?: string;
}

const bentoItems: BentoItem[] = [
    {
        id: "main",
        title: "PE-Native AI Solutions",
        description:
            "Purpose-built AI for private equity operations. From deal sourcing to portfolio optimization, we deliver production-ready solutions in weeks.",
        href: "/operating-partner",
        feature: "spotlight",
        spotlightItems: [
            "AP & Invoice Automation",
            "Quote Intelligence Systems",
            "3PL Operations Optimization",
            "Deal Flow Analysis",
            "Portfolio Reporting",
        ],
        size: "lg",
        className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
    },
    {
        id: "stat1",
        title: "Fixed-Fee Scoping Workshops",
        description:
            "2-week diagnostics with clear deliverables. Options memo, pilot SOW, and ROI model included. No surprises.",
        href: "/ai-scoping-workshop",
        feature: "metrics",
        metrics: [
            { label: "Diagnostic Complete", value: 100, suffix: "%", color: "emerald" },
            { label: "Options Delivered", value: 3, suffix: "+", color: "blue" },
            { label: "ROI Clarity", value: 100, suffix: "%", color: "violet" },
        ],
        size: "md",
        className: "col-span-2 row-span-1 col-start-1 col-end-3",
    },
    {
        id: "partners",
        title: "Vendor Neutral",
        description:
            "We recommend, not resell. Build, buy, or hybrid - we show all options with clear trade-offs.",
        icons: true,
        href: "/governance",
        feature: "icons",
        size: "md",
        className: "col-span-1 row-span-1",
    },
    {
        id: "innovation",
        title: "Proven PE Track Record",
        description:
            "100+ portfolio companies transformed. From mid-market to enterprise, we've been there.",
        href: "/case-studies",
        feature: "timeline",
        timeline: [
            { year: "Day 1-10", event: "Diagnostic & Options Memo" },
            { year: "Day 11-45", event: "Pilot with Acceptance Criteria" },
            { year: "Day 46-60", event: "Validation & Optimization" },
            { year: "Day 61-90", event: "Portfolio Replication" },
            {
                year: "Day 90+",
                event: "LP Reporting & Governance",
            },
        ],
        size: "sm",
        className: "col-span-1 row-span-1",
    },
];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const SpotlightFeature = ({ items }: { items: string[] }) => {
    return (
        <ul className="mt-2 space-y-1.5">
            {items.map((item, index) => (
                <motion.li
                    key={`spotlight-${item.toLowerCase().replace(/\s+/g, "-")}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-2"
                >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-foreground">
                        {item}
                    </span>
                </motion.li>
            ))}
        </ul>
    );
};

const CounterAnimation = ({
    start,
    end,
    suffix = "",
}: {
    start: number;
    end: number;
    suffix?: string;
}) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        const duration = 2000;
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);

        let currentFrame = 0;
        const counter = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const easedProgress = 1 - (1 - progress) ** 3;
            const current = start + (end - start) * easedProgress;

            setCount(Math.min(current, end));

            if (currentFrame === totalFrames) {
                clearInterval(counter);
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [start, end]);

    return (
        <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                {count.toFixed(1).replace(/\.0$/, "")}
            </span>
            <span className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                {suffix}
            </span>
        </div>
    );
};

const ChartAnimation = ({ value }: { value: number }) => {
    return (
        <div className="mt-2 w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
        </div>
    );
};

const IconsFeature = () => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-4">
            <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <OpenAI className="w-7 h-7 dark:hidden transition-transform " />
                    <OpenAIDark className="w-7 h-7 hidden dark:block transition-transform " />
                </div>
                <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
                    OpenAI
                </span>
            </motion.div>
            <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <Anthropic className="w-7 h-7 dark:hidden transition-transform " />
                    <AnthropicDark className="w-7 h-7 hidden dark:block transition-transform " />
                </div>
                <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
                    Anthropic
                </span>
            </motion.div>
            <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <Google className="w-7 h-7 transition-transform " />
                </div>
                <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
                    Google
                </span>
            </motion.div>
            <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <MistralAI className="w-7 h-7 transition-transform " />
                </div>
                <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
                    Mistral
                </span>
            </motion.div>
            <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <DeepSeek className="w-7 h-7 transition-transform " />
                </div>
                <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
                    DeepSeek
                </span>
            </motion.div>
            <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-neutral-600 dark:text-neutral-400 transition-transform " />
                </div>
                <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
                    More
                </span>
            </motion.div>
        </div>
    );
};

const TimelineFeature = ({
    timeline,
}: {
    timeline: Array<{ year: string; event: string }>;
}) => {
    return (
        <div className="mt-3 relative">
            <div className="absolute top-0 bottom-0 left-[9px] w-[2px] bg-neutral-200 dark:bg-neutral-700" />
            {timeline.map((item) => (
                <motion.div
                    key={`timeline-${item.year}-${item.event
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    className="flex gap-3 mb-3 relative"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: (0.15 * Number.parseInt(item.year)) % 10,
                    }}
                >
                    <div className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 flex-shrink-0 z-10 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {item.year}
                        </div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {item.event}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// Removed TypingCodeFeature - no longer needed

const MetricsFeature = ({
    metrics,
}: {
    metrics: Array<{
        label: string;
        value: number;
        suffix?: string;
        color?: string;
    }>;
}) => {
    const getColorClass = (color = "emerald") => {
        const colors = {
            emerald: "bg-emerald-500 dark:bg-emerald-400",
            blue: "bg-blue-500 dark:bg-blue-400",
            violet: "bg-violet-500 dark:bg-violet-400",
            amber: "bg-amber-500 dark:bg-amber-400",
            rose: "bg-rose-500 dark:bg-rose-400",
        };
        return colors[color as keyof typeof colors] || colors.emerald;
    };

    return (
        <div className="mt-3 space-y-3">
            {metrics.map((metric, index) => (
                <motion.div
                    key={`metric-${metric.label
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    className="space-y-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 * index }}
                >
                    <div className="flex justify-between items-center text-sm">
                        <div className="text-neutral-700 dark:text-neutral-300 font-medium flex items-center gap-1.5">
                            {metric.label === "Uptime" && (
                                <Clock className="w-3.5 h-3.5" />
                            )}
                            {metric.label === "Response time" && (
                                <Zap className="w-3.5 h-3.5" />
                            )}
                            {metric.label === "Cost reduction" && (
                                <Sparkles className="w-3.5 h-3.5" />
                            )}
                            {metric.label}
                        </div>
                        <div className="text-neutral-700 dark:text-neutral-300 font-semibold">
                            {metric.value}
                            {metric.suffix}
                        </div>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${getColorClass(
                                metric.color
                            )}`}
                            initial={{ width: 0 }}
                            animate={{
                                width: `${Math.min(100, metric.value)}%`,
                            }}
                            transition={{
                                duration: 1.2,
                                ease: "easeOut",
                                delay: 0.15 * index,
                            }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

function AIInput_Voice() {
    const [submitted, setSubmitted] = useState(false);
    const [time, setTime] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [isDemo, setIsDemo] = useState(true);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (submitted) {
            intervalId = setInterval(() => {
                setTime((t) => t + 1);
            }, 1000);
        } else {
            setTime(0);
        }

        return () => clearInterval(intervalId);
    }, [submitted]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    useEffect(() => {
        if (!isDemo) return;

        let timeoutId: NodeJS.Timeout;
        const runAnimation = () => {
            setSubmitted(true);
            timeoutId = setTimeout(() => {
                setSubmitted(false);
                timeoutId = setTimeout(runAnimation, 1000);
            }, 3000);
        };

        const initialTimeout = setTimeout(runAnimation, 100);
        return () => {
            clearTimeout(timeoutId);
            clearTimeout(initialTimeout);
        };
    }, [isDemo]);

    const handleClick = () => {
        if (isDemo) {
            setIsDemo(false);
            setSubmitted(false);
        } else {
            setSubmitted((prev) => !prev);
        }
    };

    return (
        <div className="w-full py-4">
            <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
                <button
                    className={cn(
                        "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
                        submitted
                            ? "bg-none"
                            : "bg-none hover:bg-black/10 dark:hover:bg-white/10"
                    )}
                    type="button"
                    onClick={handleClick}
                >
                    {submitted ? (
                        <div
                            className="w-6 h-6 rounded-sm animate-spin bg-black  dark:bg-white cursor-pointer pointer-events-auto"
                            style={{ animationDuration: "3s" }}
                        />
                    ) : (
                        <Mic className="w-6 h-6 text-black/70 dark:text-white/70" />
                    )}
                </button>

                <span
                    className={cn(
                        "font-mono text-sm transition-opacity duration-300",
                        submitted
                            ? "text-black/70 dark:text-white/70"
                            : "text-black/30 dark:text-white/30"
                    )}
                >
                    {formatTime(time)}
                </span>

                <div className="h-4 w-64 flex items-center justify-center gap-0.5">
                    {[...Array(48)].map((_, i) => (
                        <div
                            key={`voice-bar-${i}`}
                            className={cn(
                                "w-0.5 rounded-full transition-all duration-300",
                                submitted
                                    ? "bg-black/50 dark:bg-white/50 animate-pulse"
                                    : "bg-black/10 dark:bg-white/10 h-1"
                            )}
                            style={
                                submitted && isClient
                                    ? {
                                          height: `${20 + Math.random() * 80}%`,
                                          animationDelay: `${i * 0.05}s`,
                                      }
                                    : undefined
                            }
                        />
                    ))}
                </div>

                <p className="h-4 text-xs text-black/70 dark:text-white/70">
                    {submitted ? "Listening..." : "Click to speak"}
                </p>
            </div>
        </div>
    );
}

const BentoCard = ({ item }: { item: BentoItem }) => {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [2, -2]);
    const rotateY = useTransform(x, [-100, 100], [-2, 2]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 100);
        y.set(yPct * 100);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    }

    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
        >
            <Link
                href={item.href || "#"}
                className={`
                    group relative flex flex-col gap-4 h-full rounded-xl p-5
                    bg-card/50 backdrop-blur-sm
                    border border-border
                    shadow-sm
                    hover:border-primary/20
                    hover:shadow-lg hover:shadow-primary/5
                    hover:bg-card/80
                    transition-all duration-300 ${item.className}
                `}
                tabIndex={0}
                aria-label={`${item.title} - ${item.description}`}
            >
                <div
                    className="relative z-10 flex flex-col gap-3 h-full"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <div className="space-y-2 flex-1 flex flex-col">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors duration-300">
                                {item.title}
                            </h3>
                            <div className="text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <ArrowUpRight className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground tracking-tight">
                            {item.description}
                        </p>

                        {/* Feature specific content */}
                        {item.feature === "spotlight" &&
                            item.spotlightItems && (
                                <SpotlightFeature items={item.spotlightItems} />
                            )}

                        {item.feature === "counter" && item.statistic && (
                            <div className="mt-auto pt-3">
                                <CounterAnimation
                                    start={item.statistic.start || 0}
                                    end={item.statistic.end || 100}
                                    suffix={item.statistic.suffix}
                                />
                            </div>
                        )}

                        {item.feature === "chart" && item.statistic && (
                            <div className="mt-auto pt-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        {item.statistic.label}
                                    </span>
                                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        {item.statistic.end}
                                        {item.statistic.suffix}
                                    </span>
                                </div>
                                <ChartAnimation
                                    value={item.statistic.end || 0}
                                />
                            </div>
                        )}

                        {item.feature === "timeline" && item.timeline && (
                            <TimelineFeature timeline={item.timeline} />
                        )}

                        {item.feature === "icons" && <IconsFeature />}

                        {item.feature === "metrics" && item.metrics && (
                            <MetricsFeature metrics={item.metrics} />
                        )}

                        {item.icons && !item.feature && (
                            <div className="mt-auto pt-4 flex items-center flex-wrap gap-4 border-t border-neutral-200/70 dark:border-neutral-800/70">
                                <OpenAI className="w-5 h-5 dark:hidden opacity-70 hover:opacity-100 transition-opacity" />
                                <OpenAIDark className="w-5 h-5 hidden dark:block opacity-70 hover:opacity-100 transition-opacity" />
                                <AnthropicDark className="w-5 h-5 dark:block hidden opacity-70 hover:opacity-100 transition-opacity" />
                                <Anthropic className="w-5 h-5 dark:hidden opacity-70 hover:opacity-100 transition-opacity" />
                                <Google className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
                                <MistralAI className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
                                <DeepSeek className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default function BentoGrid() {
    return (
        <section className="relative py-24 sm:py-32 bg-white dark:bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Bento Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid gap-6"
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-1"
                        >
                            <BentoCard item={bentoItems[0]} />
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-2"
                        >
                            <BentoCard item={bentoItems[1]} />
                        </motion.div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-1"
                        >
                            <BentoCard item={bentoItems[2]} />
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-1 rounded-xl overflow-hidden bg-gradient-to-b from-neutral-50/80 to-neutral-50 dark:from-neutral-900/80 dark:to-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-400/30 dark:hover:border-neutral-600/30 hover:shadow-lg hover:shadow-neutral-200/20 dark:hover:shadow-neutral-900/20 transition-all duration-300"
                        >
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                                        Voice Assistant
                                    </h3>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 tracking-tight mb-4">
                                    Interact with our AI using natural voice
                                    commands. Experience seamless voice-driven
                                    interactions with advanced speech
                                    recognition.
                                </p>
                                <AIInput_Voice />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
