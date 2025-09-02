"use client";
import { ReactNode } from "react";
import type { NavGroup, NavItem } from "quirk-ui/core";

import Header from "./Header";
import Footer from "./Footer";
import { Link } from "@/types";
import { SanityImage } from "@/types";
import { PortableTextBlock } from "next-sanity";
import type { UtilityItem } from "quirk-ui/core";
import { urlForImage } from "@/sanity/client";

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
  variant: "standard" | "transparent";
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
}: LayoutProps) {
  const logoUrl = logo?.asset?._id
    ? urlForImage(logo?.asset?._id).width(200).quality(100).url()
    : null;

  console.log(navGroups);
  return (
    <>
      {!hideHeader && (
        <Header
          utilityItems={utilityItems ?? []}
          navItems={navItems ?? []}
          navGroups={navGroups ?? []}
          alignment={alignment}
          logoUrl={logoUrl}
          logoAlt={logo?.asset?.altText}
          logoLinkSlug={logoLinkSlug}
          variant={variant}
          navigationType={navigationType}
          showSearch={showSearch}
          searchComponent={searchComponent}
          showLocaleSelect={showLocaleSelect}
          localeSelectComponent={localeSelectComponent}
        />
      )}
      <main>{children}</main>
      {!hideFooter && (
        <Footer
          variant="default"
          navItems={footerNavItems}
          utilityItems={footerUtilityItems}
          alignment={footerAlignment}
          logoUrl={logoUrl}
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
