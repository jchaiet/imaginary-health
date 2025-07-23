"use client";
import { ReactNode } from "react";
import type { NavItem } from "quirk-ui";

import Header from "./Header";
import Footer from "./Footer";
import { Link } from "@/types";
import { SanityImage } from "@/types";
import { PortableTextBlock } from "next-sanity";
import { UtilityItem } from "@/types/utilityItem";

type LayoutProps = {
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  navItems: NavItem[];
  alignment: "left" | "center" | "right";
  utilityItems: Link[];
  logo: SanityImage;
  logoLinkSlug?: string;
  variant: "default" | "minimal";
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
  navItems,
  alignment,
  utilityItems,
  logo,
  logoLinkSlug,
  variant,
  footerNavItems,
  footerUtilityItems,
  footerLogo,
  footerlogoLinkSlug,
  footerAlignment,
  footerPrimaryInfo,
  footerSecondaryInfo,
  footerSocialItems,
}: LayoutProps) {
  return (
    <>
      {!hideHeader && (
        <Header
          utilityItems={utilityItems}
          navItems={navItems}
          alignment={alignment}
          logoUrl={logo?.asset?.url}
          logoAlt={logo?.asset?.altText}
          logoLinkSlug={logoLinkSlug}
          variant={variant}
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
