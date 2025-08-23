"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with game client
const PETycoonClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="text-center">
        <div className="text-3xl font-bold animate-pulse mb-4">Loading PE Tycoon...</div>
        <div className="text-sm text-white/60">Initializing market simulation</div>
      </div>
    </div>
  ),
});

export default function PETycoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <PETycoonClient />
    </div>
  );
}