"use client";
import { createContext, useContext, useState } from "react";

type HeroContextType = {
  isFullbleedHeroAtTop: boolean;
  setIsFullbleedHeroAtTop: (val: boolean) => void;
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [isFullbleedHeroAtTop, setIsFullbleedHeroAtTop] = useState(false);

  return (
    <HeroContext.Provider
      value={{ isFullbleedHeroAtTop, setIsFullbleedHeroAtTop }}
    >
      {children}
    </HeroContext.Provider>
  );
}

export function useHeroContext() {
  const context = useContext(HeroContext);
  if (!context)
    throw new Error("useHeroContext must be used within HeroProvider");
  return context;
}
