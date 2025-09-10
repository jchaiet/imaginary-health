"use client";
import { AppProviders } from "@/app/providers";

type ClientAppProvidersProps = {
  children: React.ReactNode;
  currentLocale: string;
};

export const ClientAppProviders = ({
  children,
  currentLocale,
}: ClientAppProvidersProps) => {
  return <AppProviders currentLocale={currentLocale}>{children}</AppProviders>;
};
