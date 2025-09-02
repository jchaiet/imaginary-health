"use client";
import React, { createContext, useContext } from "react";
import { defaultLocale, resolveLocale, type locales } from "@/lib/i18n";

type LocaleContextType = {
  locale: string;
  isDefault: boolean;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  isDefault: true,
});

export function LocaleProvider({
  children,
  localeParam,
}: {
  children: React.ReactNode;
  localeParam?: string;
}) {
  const locale = resolveLocale(localeParam);
  const isDefault = locale === defaultLocale;

  return (
    <LocaleContext.Provider value={{ locale, isDefault }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context)
    throw new Error("useLocaleContext must be used within LocaleProvider");
  return context;
}
