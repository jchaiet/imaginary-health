"use client";
import { ThemeProvider } from "quirk-ui/core";
import React from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
