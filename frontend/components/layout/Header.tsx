"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { SearchModal } from "../ui/SearchModal";
import { LocaleModal } from "../ui/LocaleModal";
import {
  Navbar,
  type UtilityItem,
  type NavItem,
  type NavGroup,
} from "quirk-ui";
import { useLocaleContext } from "@/context/LocaleContext";
import { usePathname } from "next/navigation";
import { locales, getLocaleLink } from "@/lib/i18n";
// import styles from "./styles.module.css";

type HeaderProps = {
  navItems: NavItem[];
  navGroups: NavGroup[];
  utilityItems: UtilityItem[];
  alignment: "left" | "center" | "right";
  logoUrl: string | null;
  logoAlt: string;
  logoLinkSlug?: string;
  variant: "standard" | "transparent" | "minimal";
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
  // searchComponent,
}: HeaderProps) {
  const [localeLinks, setLocaleLinks] = useState<{ [key: string]: string }>({});
  const { locale } = useLocaleContext();
  const currentPath = usePathname();
  const currentLocale = locale;

  const ImageContainer = ({ children }: { children: React.ReactNode }) => {
    const destination = logoLinkSlug;

    return destination ? (
      <a
        href={`${destination === "home" ? `/` : `/${destination}`}`}
        aria-label={logoAlt}
      >
        {children}
      </a>
    ) : (
      <>{children}</>
    );
  };

  const LogoImage = (
    <Image
      src={logoUrl ?? ""}
      alt={logoAlt || "Content image"}
      width={100}
      height={40}
      priority={true}
    />
  );

  if (!navItems || !Array.isArray(navItems)) {
    return null;
  }

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
    <Navbar
      searchComponent={<SearchModal />}
      showSearch={showSearch}
      showLocaleSelect={showLocaleSelect}
      localeSelectComponent={<LocaleModal links={localeLinks} />}
      isSticky
      variant={variant}
      navigationType={navigationType}
      alignment={alignment}
      items={navItems ?? []}
      groups={navGroups ?? []}
      utilityItems={utilityItems ?? []}
      logo={
        logoLinkSlug ? (
          <ImageContainer>{LogoImage}</ImageContainer>
        ) : (
          <>{LogoImage}</>
        )
      }
    />
  );
}
