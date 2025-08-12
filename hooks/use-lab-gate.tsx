"use client";

import { useState, useEffect } from "react";

export function useLabGate(labId: string) {
  const [runCount, setRunCount] = useState(0);
  const [shouldShowGate, setShouldShowGate] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if labs are unlocked
    const unlockedLabs = localStorage.getItem("unlocked_labs");
    const userEmail = localStorage.getItem("lab_email");
    
    if (unlockedLabs === "all" || userEmail) {
      setIsUnlocked(true);
      return;
    }

    // Get run count for this lab
    const runs = parseInt(localStorage.getItem(`lab_runs_${labId}`) || "0");
    setRunCount(runs);
    
    // Show gate after first run
    if (runs >= 1) {
      setShouldShowGate(true);
    }
  }, [labId]);

  const trackRun = () => {
    if (isUnlocked) return;
    
    const newCount = runCount + 1;
    setRunCount(newCount);
    localStorage.setItem(`lab_runs_${labId}`, newCount.toString());
    
    // Show gate after first run
    if (newCount >= 1) {
      setShouldShowGate(true);
    }
  };

  const unlock = () => {
    setIsUnlocked(true);
    setShouldShowGate(false);
  };

  return {
    runCount,
    shouldShowGate,
    isUnlocked,
    trackRun,
    unlock,
  };
}