"use client";
import Image from "next/image";
import { SearchModal } from "../ui/SearchModal";
import { LocaleModal } from "../ui/LocaleModal";
import { RichText } from "quirk-ui/next";
import {
  Navbar,
  type UtilityItem,
  type NavItem,
  type NavGroup,
} from "quirk-ui/core";
import { RichContent } from "quirk-ui";
// import styles from "./styles.module.css";

type HeaderProps = {
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
  localeLinks: { [key: string]: string };
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
  localeLinks,
}: HeaderProps) {
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

  const LogoImage = logoUrl ? (
    <Image
      src={logoUrl}
      alt={logoAlt || "Content image"}
      width={200}
      height={73}
      sizes="100px"
      priority={true}
      style={{ width: "100px", height: "auto" }}
    />
  ) : null;

  if (!navItems || !Array.isArray(navItems)) {
    return null;
  }

  const defaultRenderText = (content?: RichContent, className?: string) => {
    if (!content) return null;

    if (typeof content === "string") return content;

    if (typeof content === "object") {
      if (content.type === "markdown") {
        return content.content;
      }

      if (content.type === "portableText") {
        return <RichText className={className} blocks={content.content} />;
      }
    }
    return null;
  };

  return (
    <Navbar
      renderText={defaultRenderText}
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
