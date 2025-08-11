"use client";
import { ReactNode } from "react";
import type { NavGroup, NavItem } from "quirk-ui";

import Header from "./Header";
import Footer from "./Footer";
import { Link } from "@/types";
import { SanityImage } from "@/types";
import { PortableTextBlock } from "next-sanity";
import type { UtilityItem } from "quirk-ui";

type LayoutProps = {
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  showSearch?: boolean;
  searchComponent?: React.ReactNode;
  showLocaleSelect?: boolean;
  localeSelectComponent?: React.ReactNode;
  navItems?: NavItem[];
  navGroups?: NavGroup[];
  alignment: "left" | "center" | "right";
  utilityItems: UtilityItem[];
  logo: SanityImage;
  logoLinkSlug?: string;
  variant: "standard" | "transparent" | "minimal";
  navigationType: "default" | "advanced";
  socialItems: Link[];
  primaryInfo?: string;
  secondaryInfo?: string;
  footerNavItems: NavItem[];
  footerUtilityItems: UtilityItem[];
  footerLogo: SanityImage;
  footerlogoLinkSlug?: string;
  footerAlignment?: "left" | "center" | "right";
  footerPrimaryInfo?: PortableTextBlock[];
  footerSecondaryInfo?: PortableTextBlock[];
  footerSocialItems?: NavItem[];
  locale?: string;
};

export default function Layout({
  children,
  hideHeader,
  hideFooter,
  showSearch,
  searchComponent,
  showLocaleSelect,
  localeSelectComponent,
  navItems,
  navGroups,
  alignment,
  utilityItems,
  logo,
  logoLinkSlug,
  variant,
  navigationType,
  footerNavItems,
  footerUtilityItems,
  footerLogo,
  footerlogoLinkSlug,
  footerAlignment,
  footerPrimaryInfo,
  footerSecondaryInfo,
  footerSocialItems,
  locale,
}: LayoutProps) {
  return (
    <>
      {!hideHeader && (
        <Header
          utilityItems={utilityItems}
          navItems={navItems ?? []}
          navGroups={navGroups ?? []}
          alignment={alignment}
          logoUrl={logo?.asset?.url}
          logoAlt={logo?.asset?.altText}
          logoLinkSlug={logoLinkSlug}
          variant={variant}
          navigationType={navigationType}
          showSearch={showSearch}
          searchComponent={searchComponent}
          showLocaleSelect={showSearch}
          localeSelectComponent={localeSelectComponent}
          locale={locale}
        />
      )}
      <main>{children}</main>
      {!hideFooter && (
        <Footer
          variant="default"
          navItems={footerNavItems}
          utilityItems={footerUtilityItems}
          alignment={footerAlignment}
          logoUrl={footerLogo?.asset?.url}
          logoAlt={footerLogo?.asset?.altText}
          logoLinkSlug={footerlogoLinkSlug}
          socialItems={footerSocialItems}
          primaryInfo={footerPrimaryInfo}
          secondaryInfo={footerSecondaryInfo}
        />
      )}
    </>
  );
}
