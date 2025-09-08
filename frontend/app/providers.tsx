"use client";
import { HeroProvider, LocaleBridgeProvider } from "quirk-ui/next";
import { defaultLocale, resolveLocale } from "@/lib/i18n";
// import { LocaleProvider, useLocaleContext } from "@/context/LocaleContext";

// function LocaleBridgeWrapper({ children }: { children: React.ReactNode }) {
//   const { locale, isDefault } = useLocaleContext();

//   return (
//     <LocaleBridgeProvider value={{ locale, isDefault }}>
//       {children}
//     </LocaleBridgeProvider>
//   );
// }

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
