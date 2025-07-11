"use client";
import { ReactNode } from "react";
import type { NavItem } from "quirk-ui";

import Header from "./Header";
import Footer from "./Footer";
import { Link } from "@/types";

type LayoutProps = {
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  navItems: NavItem[];
  alignment: "left" | "center" | "right";
  utilityItems: Link[];
  logoUrl: string | null;
  logoAlt: string;
  logoLinkSlug?: string;
  variant: "default" | "minimal";
};

export default function Layout({
  children,
  hideHeader,
  hideFooter,
  navItems,
  alignment,
  utilityItems,
  logoUrl,
  logoAlt,
  logoLinkSlug,
  variant,
}: LayoutProps) {
  return (
    <>
      {!hideHeader && (
        <Header
          utilityItems={utilityItems}
          navItems={navItems}
          alignment={alignment}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          logoLinkSlug={logoLinkSlug}
          variant={variant}
        />
      )}
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}
