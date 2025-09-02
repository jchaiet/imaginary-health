"use client";
import { HeroProvider } from "quirk-ui/next";
import { LocaleProvider } from "@/context/LocaleContext";

export function AppProviders({
  children,
  currentLocale,
}: {
  children: React.ReactNode;
  currentLocale: string;
}) {
  return (
    <HeroProvider>
      <LocaleProvider localeParam={currentLocale}>{children}</LocaleProvider>
    </HeroProvider>
  );
}
