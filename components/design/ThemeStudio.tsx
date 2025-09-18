"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  X,
  SlidersHorizontal,
  Check,
  Sparkles,
  RotateCcw,
  Sun,
  Moon,
  Monitor,
  Wand2,
  Code,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HexColorPicker } from "react-colorful";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Preset = {
  name: string;
  start: string;
  end: string;
  angle?: number;
  description?: string;
};

// Default theme that matches the Sprinter brand
const DEFAULT_THEME = {
  start: "oklch(0.488 0.243 264.376)", // Blue
  end: "oklch(0.6 0.118 184.704)",     // Teal/Cyan
  angle: 90,
  primary: "oklch(0.269 0.055 265.755)",
  accent: "oklch(0.828 0.189 84.429)",
};

const PRESETS: Array<Preset> = [
  {
    name: "Sprinter",
    start: DEFAULT_THEME.start,
    end: DEFAULT_THEME.end,
    angle: DEFAULT_THEME.angle,
    description: "Our signature gradient",
  },
  {
    name: "Sunset",
    start: "oklch(0.769 0.188 70.08)",
    end: "oklch(0.627 0.265 303.9)",
    angle: 120,
    description: "Warm and inviting",
  },
  {
    name: "Aurora",
    start: "oklch(0.488 0.243 264.376)",
    end: "oklch(0.828 0.189 84.429)",
    angle: 45,
    description: "Northern lights inspired",
  },
  {
    name: "Crimson",
    start: "oklch(0.704 0.191 22.216)",
    end: "oklch(0.551 0.027 264.364)",
    angle: 90,
    description: "Bold and powerful",
  },
  {
    name: "Mint",
    start: "oklch(0.6 0.118 184.704)",
    end: "oklch(0.769 0.188 70.08)",
    angle: 90,
    description: "Fresh and modern",
  },
  {
    name: "Ocean",
    start: "oklch(0.45 0.15 220)",
    end: "oklch(0.55 0.2 200)",
    angle: 135,
    description: "Deep sea vibes",
  },
];

function applyTheme(args: {
  start?: string;
  end?: string;
  angle?: number;
  primary?: string;
  accent?: string;
}) {
  const root = document.documentElement;
  const { start, end, angle, primary, accent } = args;
  if (start) root.style.setProperty("--brand-start", start);
  if (end) root.style.setProperty("--brand-end", end);
  if (typeof angle === "number")
    root.style.setProperty("--brand-angle", `${angle}deg`);
  if (primary) root.style.setProperty("--primary", primary);
  if (accent) root.style.setProperty("--accent", accent);
  try {
    const raw = localStorage.getItem("sprinter-theme");
    const prev = raw ? JSON.parse(raw) : {};
    localStorage.setItem(
      "sprinter-theme",
      JSON.stringify({ ...prev, ...args })
    );
  } catch {}
}

function loadSavedTheme() {
  try {
    const raw = localStorage.getItem("sprinter-theme");
    if (!raw) return;
    const data = JSON.parse(raw) as {
      start?: string;
      end?: string;
      angle?: number;
      primary?: string;
      accent?: string;
    };
    applyTheme(data);
  } catch {}
}

interface ThemeStudioProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeStudio({ open, onOpenChange }: ThemeStudioProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [start, setStart] = React.useState<string>("#1d7dff");
  const [end, setEnd] = React.useState<string>("#0a3bcf");
  const [angle, setAngle] = React.useState<number>(90);
  const [primary, setPrimary] = React.useState<string>("");
  const [accent, setAccent] = React.useState<string>("");

  React.useEffect(() => {
    setMounted(true);
    loadSavedTheme();
    const cs = getComputedStyle(document.documentElement);
    setStart(cs.getPropertyValue("--brand-start").trim());
    setEnd(cs.getPropertyValue("--brand-end").trim());
    const a = cs.getPropertyValue("--brand-angle").trim();
    if (a.endsWith("deg")) {
      const n = Number(a.replace("deg", ""));
      if (!Number.isNaN(n)) setAngle(n);
    }
    setPrimary(cs.getPropertyValue("--primary").trim());
    setAccent(cs.getPropertyValue("--accent").trim());
  }, []);

  const onApply = () => {
    applyTheme({ start, end, angle, primary, accent });
  };

  const onReset = () => {
    setStart(DEFAULT_THEME.start);
    setEnd(DEFAULT_THEME.end);
    setAngle(DEFAULT_THEME.angle);
    setPrimary(DEFAULT_THEME.primary);
    setAccent(DEFAULT_THEME.accent);
    applyTheme(DEFAULT_THEME);
    try {
      localStorage.removeItem("sprinter-theme");
    } catch {}
  };

  if (!mounted) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-brand" />
            Design Studio
          </DialogTitle>
          <DialogDescription>
            Customize your experience with personalized themes and styling. We believe in empowering
            builders and curating taste - make it yours!
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="theme" className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-3 px-6">
            <TabsTrigger value="theme" className="gap-2">
              <Palette className="h-4 w-4" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2">
              <Code className="h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="theme" className="p-6 space-y-6 m-0">
              <div>
                <h3 className="text-sm font-semibold mb-3">Quick Presets</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PRESETS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setStart(p.start);
                        setEnd(p.end);
                        if (typeof p.angle === "number") setAngle(p.angle);
                        applyTheme({
                          start: p.start,
                          end: p.end,
                          angle: p.angle,
                        });
                      }}
                      className="group relative rounded-xl border border-border overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand/50 hover:border-brand/50 transition-all"
                      aria-label={`Apply ${p.name} preset`}
                    >
                      <div
                        className="h-20 w-full"
                        style={{
                          background: `linear-gradient(${p.angle ?? 90}deg, ${p.start}, ${p.end})`,
                        }}
                      />
                      <div className="p-3 bg-background/80 backdrop-blur">
                        <div className="font-medium text-sm">{p.name}</div>
                        {p.description && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {p.description}
                          </div>
                        )}
                      </div>
                      {p.name === "Sprinter" && (
                        <Badge className="absolute top-2 right-2 text-[10px]" variant="default">
                          Default
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Custom Colors</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Gradient Start
                    </label>
                    <div className="mt-2 rounded-lg border border-input p-3 bg-card">
                      <HexColorPicker
                        color={start}
                        onChange={setStart}
                        className="!w-full !h-32"
                      />
                      <div className="mt-3 flex items-center justify-between">
                        <code className="text-xs text-muted-foreground">{start}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigator.clipboard.writeText(start)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Gradient End
                    </label>
                    <div className="mt-2 rounded-lg border border-input p-3 bg-card">
                      <HexColorPicker
                        color={end}
                        onChange={setEnd}
                        className="!w-full !h-32"
                      />
                      <div className="mt-3 flex items-center justify-between">
                        <code className="text-xs text-muted-foreground">{end}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigator.clipboard.writeText(end)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-medium text-muted-foreground">
                    Gradient Angle: {angle}°
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full mt-2"
                    aria-label="Brand gradient angle"
                  />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Button variant="gradient" onClick={onApply}>
                    <Check className="h-4 w-4 mr-1" /> Apply Changes
                  </Button>
                  <Button variant="outline" onClick={onReset}>
                    <RotateCcw className="h-4 w-4 mr-1" /> Reset to Default
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
                <div
                  className="rounded-xl border border-border p-6"
                  style={{
                    background: `linear-gradient(${angle}deg, ${start}, ${end})`,
                    opacity: 0.1,
                  }}
                >
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold">Example Content</h4>
                      <Badge variant="default">Featured</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This is how your theme looks with various UI elements. The gradient affects
                      buttons, badges, and accent colors throughout the interface.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="gradient">Gradient Button</Button>
                      <Button size="sm" variant="outline">Outline Button</Button>
                      <Button size="sm" variant="ghost">Ghost Button</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="p-6 space-y-6 m-0">
              <div>
                <h3 className="text-sm font-semibold mb-3">Theme Mode</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border-2 p-4 hover:bg-accent transition-colors",
                      theme === "light" ? "border-brand bg-accent" : "border-border"
                    )}
                  >
                    <Sun className="h-8 w-8" />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border-2 p-4 hover:bg-accent transition-colors",
                      theme === "dark" ? "border-brand bg-accent" : "border-border"
                    )}
                  >
                    <Moon className="h-8 w-8" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border-2 p-4 hover:bg-accent transition-colors",
                      theme === "system" ? "border-brand bg-accent" : "border-border"
                    )}
                  >
                    <Monitor className="h-8 w-8" />
                    <span className="text-sm font-medium">System</span>
                  </button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Choose between light, dark, or system theme. System theme follows your device's
                  preference automatically.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Interface Density</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors">
                    <div>
                      <div className="font-medium text-sm">Comfortable</div>
                      <div className="text-xs text-muted-foreground">More spacing, easier to read</div>
                    </div>
                    <input type="radio" name="density" defaultChecked className="ml-4" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors">
                    <div>
                      <div className="font-medium text-sm">Compact</div>
                      <div className="text-xs text-muted-foreground">Less spacing, more content</div>
                    </div>
                    <input type="radio" name="density" className="ml-4" />
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Motion & Animations</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <div className="font-medium text-sm">Enable animations</div>
                      <div className="text-xs text-muted-foreground">Smooth transitions and effects</div>
                    </div>
                    <input type="checkbox" defaultChecked className="ml-4" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <div className="font-medium text-sm">Reduce motion</div>
                      <div className="text-xs text-muted-foreground">Minimize animations for accessibility</div>
                    </div>
                    <input type="checkbox" className="ml-4" />
                  </label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="p-6 space-y-6 m-0">
              <div>
                <h3 className="text-sm font-semibold mb-3">Export Theme</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Copy your custom theme configuration to use in other projects or share with your team.
                </p>
                <div className="rounded-lg border border-border bg-card p-4">
                  <pre className="text-xs overflow-x-auto">
                    <code>{`/* Custom Theme Variables */
:root {
  --brand-start: ${start};
  --brand-end: ${end};
  --brand-angle: ${angle}deg;
  --primary: ${primary};
  --accent: ${accent};
}

/* Usage Example */
.gradient-bg {
  background: linear-gradient(
    var(--brand-angle),
    var(--brand-start),
    var(--brand-end)
  );
}`}</code>
                  </pre>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const css = `:root {\n  --brand-start: ${start};\n  --brand-end: ${end};\n  --brand-angle: ${angle}deg;\n  --primary: ${primary};\n  --accent: ${accent};\n}`;
                      navigator.clipboard.writeText(css);
                    }}
                  >
                    <Code className="h-4 w-4 mr-1" /> Copy CSS
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const json = JSON.stringify({ start, end, angle, primary, accent }, null, 2);
                      navigator.clipboard.writeText(json);
                    }}
                  >
                    <Layers className="h-4 w-4 mr-1" /> Copy JSON
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Integration</h3>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      React/Next.js
                    </h4>
                    <pre className="text-xs overflow-x-auto">
                      <code>{`import { applyTheme } from '@/lib/theme';

applyTheme({
  start: "${start}",
  end: "${end}",
  angle: ${angle},
  primary: "${primary}",
  accent: "${accent}"
});`}</code>
                    </pre>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Tailwind CSS
                    </h4>
                    <pre className="text-xs overflow-x-auto">
                      <code>{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-start': '${start}',
        'brand-end': '${end}',
      }
    }
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}