"use client";
import { useState, useEffect } from "react";
import {
  Navbar,
  type UtilityItem,
  type NavItem,
  type NavGroup,
} from "quirk-ui/core";
import { useLocaleBridge } from "quirk-ui/next";
import { usePathname } from "next/navigation";
import { locales, getLocaleLink } from "@/lib/i18n";
// import styles from "./styles.module.css";

type HeaderWrapperProps = {
  navItems: NavItem[];
  navGroups: NavGroup[];
  utilityItems: UtilityItem[];
  alignment: "left" | "center" | "right";
  logoUrl: string | null;
  logoAlt: string;
  logoLinkSlug?: string;
  variant: "standard" | "transparent";
  navigationType: "default" | "advanced";
  showSearch?: boolean;
  showLocaleSelect?: boolean;
  searchComponent?: React.ReactNode;
  localeSelectComponent?: React.ReactNode;
};

export default function Header({
  variant,
  navigationType = "default",
  navItems,
  navGroups,
  utilityItems,
  alignment,
  logoUrl,
  logoAlt,
  logoLinkSlug,
  showSearch,
  showLocaleSelect,
}: HeaderWrapperProps) {
  const [localeLinks, setLocaleLinks] = useState<{ [key: string]: string }>({});
  const { locale } = useLocaleBridge();
  const currentPath = usePathname();
  const currentLocale = locale;

  //Prebuild locale links
  useEffect(() => {
    async function buildLinks() {
      const result: { [key: string]: string } = {};
      for (const locale of locales) {
        result[locale.id] = await getLocaleLink(
          currentPath,
          locale.id,
          currentLocale
        );
      }
      setLocaleLinks(result);
    }
    if (currentPath) {
      buildLinks();
    }
  }, [currentPath]);

  return (
    <Header
      showSearch={showSearch}
      showLocaleSelect={showLocaleSelect}
      variant={variant}
      navigationType={navigationType}
      alignment={alignment}
      navItems={navItems ?? []}
      navGroups={navGroups ?? []}
      utilityItems={utilityItems ?? []}
      logoUrl={logoUrl}
      logoAlt={logoAlt}
      logoLinkSlug={logoLinkSlug}
    />
  );
}
