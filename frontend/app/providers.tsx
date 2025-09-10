"use client";
import { HeroProvider, LocaleBridgeProvider } from "quirk-ui/next";
import { defaultLocale, resolveLocale } from "@/lib/i18n";

export function AppProviders({
  children,
  currentLocale,
}: {
  children: React.ReactNode;
  currentLocale: string;
}) {
  const locale = resolveLocale(currentLocale);
  const isDefault = locale === defaultLocale;

  return (
    <HeroProvider>
      <LocaleBridgeProvider value={{ locale, isDefault }}>
        {children}
      </LocaleBridgeProvider>
    </HeroProvider>
  );
}
