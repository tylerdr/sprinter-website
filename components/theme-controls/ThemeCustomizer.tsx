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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HexColorPicker } from "react-colorful";

type Preset = {
  name: string;
  start: string;
  end: string;
  angle?: number;
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
    name: "Sprinter (Default)",
    start: DEFAULT_THEME.start,
    end: DEFAULT_THEME.end,
    angle: DEFAULT_THEME.angle,
  },
  {
    name: "Sunset",
    start: "oklch(0.769 0.188 70.08)",
    end: "oklch(0.627 0.265 303.9)",
    angle: 120,
  },
  {
    name: "Aurora",
    start: "oklch(0.488 0.243 264.376)",
    end: "oklch(0.828 0.189 84.429)",
    angle: 45,
  },
  {
    name: "Crimson",
    start: "oklch(0.704 0.191 22.216)",
    end: "oklch(0.551 0.027 264.364)",
    angle: 90,
  },
  {
    name: "Mint",
    start: "oklch(0.6 0.118 184.704)",
    end: "oklch(0.769 0.188 70.08)",
    angle: 90,
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

export function ThemeCustomizer() {
  const [open, setOpen] = React.useState(false);
  const [start, setStart] = React.useState<string>("#1d7dff");
  const [end, setEnd] = React.useState<string>("#0a3bcf");
  const [angle, setAngle] = React.useState<number>(90);
  const [primary, setPrimary] = React.useState<string>("");
  const [accent, setAccent] = React.useState<string>("");

  React.useEffect(() => {
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
    // Reset to default Sprinter theme
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-[320px] rounded-xl border border-border bg-background/90 backdrop-blur-xl shadow-xl p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Theme customizer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-brand" aria-hidden="true" />
                <h3 className="text-sm font-semibold">Theme Customizer</h3>
              </div>
              <button
                className="p-2 rounded-md hover:bg-accent"
                onClick={() => setOpen(false)}
                aria-label="Close theme customizer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Presets
                </div>
                <div className="grid grid-cols-3 gap-2">
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
                      className="group rounded-lg border border-border overflow-hidden focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)]"
                      aria-label={`Apply ${p.name} preset`}
                    >
                      <div
                        className="h-8 w-full"
                        style={{
                          background: `linear-gradient(${p.angle ?? 90}deg, ${p.start}, ${p.end})`,
                        }}
                      />
                      <div className="px-2 py-1 text-[11px] text-center text-muted-foreground group-hover:text-foreground">
                        {p.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Custom
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs mb-1">Brand start</div>
                    <div className="rounded-md border border-input p-2 bg-background">
                      <HexColorPicker
                        color={start}
                        onChange={setStart}
                        className="!w-full !h-32"
                      />
                    </div>
                    <div className="mt-2 text-[11px] text-muted-foreground">
                      {start}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs mb-1">Brand end</div>
                    <div className="rounded-md border border-input p-2 bg-background">
                      <HexColorPicker
                        color={end}
                        onChange={setEnd}
                        className="!w-full !h-32"
                      />
                    </div>
                    <div className="mt-2 text-[11px] text-muted-foreground">
                      {end}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-xs mb-1">Primary</div>
                    <div className="rounded-md border border-input p-2 bg-background">
                      <HexColorPicker
                        color={primary}
                        onChange={setPrimary}
                        className="!w-full !h-32"
                      />
                    </div>
                    <div className="mt-2 text-[11px] text-muted-foreground">
                      {primary}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs mb-1">Accent</div>
                    <div className="rounded-md border border-input p-2 bg-background">
                      <HexColorPicker
                        color={accent}
                        onChange={setAccent}
                        className="!w-full !h-32"
                      />
                    </div>
                    <div className="mt-2 text-[11px] text-muted-foreground">
                      {accent}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-xs text-muted-foreground">
                    Angle: {angle}°
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full"
                    aria-label="Brand gradient angle"
                  />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button variant="gradient" size="sm" onClick={onApply}>
                    <Check className="h-4 w-4" /> Apply
                  </Button>
                  <Button variant="outline" size="sm" onClick={onReset}>
                    <RotateCcw className="h-4 w-4" /> Reset
                  </Button>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Preview
                </div>
                <div
                  className="rounded-lg border border-border p-3 flex items-center justify-between"
                  style={{
                    background: `linear-gradient(${angle}deg, ${start}, ${end})`,
                    opacity: 0.9,
                  }}
                  aria-label="Gradient preview"
                >
                  <span className="text-xs font-medium text-primary-foreground">
                    Brand gradient
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="glass">
                      Glass
                    </Button>
                    <Button size="sm" variant="soft">
                      Soft
                    </Button>
                    <Button size="sm" variant="gradient">
                      Gradient
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        aria-label="Open theme customizer"
        onClick={() => setOpen((v) => !v)}
        variant="glass"
        size="lg"
        className="shadow-lg"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="hidden sm:inline">Theme</span>
        <Sparkles className="h-4 w-4" />
      </Button>
    </div>
  );
}
