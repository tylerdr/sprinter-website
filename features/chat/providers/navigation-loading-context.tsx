"use client";
import React, { createContext, useContext, useState } from "react";

interface NavigationLoadingContext {
  isNavigating: boolean;
  setNavigating: (v: boolean) => void;
}

const Ctx = createContext<NavigationLoadingContext | undefined>(undefined);

export function NavigationLoadingProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isNavigating, setNavigating] = useState(false);
  return (
    <Ctx.Provider value={{ isNavigating, setNavigating }}>
      {children}
    </Ctx.Provider>
  );
}

export function useNavigationLoading() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error(
      "useNavigationLoading must be used within NavigationLoadingProvider"
    );
  return ctx;
}
