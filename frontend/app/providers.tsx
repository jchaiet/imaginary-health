"use client";
import { HeroProvider } from "quirk-ui/next";
import { LocaleProvider, useLocaleContext } from "@/context/LocaleContext";
import { LocaleBridgeProvider } from "quirk-ui/next";

function LocaleBridgeWrapper({ children }: { children: React.ReactNode }) {
  const { locale, isDefault } = useLocaleContext();

  return (
    <LocaleBridgeProvider value={{ locale, isDefault }}>
      {children}
    </LocaleBridgeProvider>
  );
}

export function AppProviders({
  children,
  currentLocale,
}: {
  children: React.ReactNode;
  currentLocale: string;
}) {
  return (
    <HeroProvider>
      <LocaleProvider localeParam={currentLocale}>
        <LocaleBridgeWrapper>{children}</LocaleBridgeWrapper>
      </LocaleProvider>
    </HeroProvider>
  );
}
