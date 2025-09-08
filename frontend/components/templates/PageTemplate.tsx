"use client";
import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";

import BlogHeader from "../layout/BlogHeader";
import { SocialLink } from "@/types";

import { type NavGroup, type NavItem, type UtilityItem } from "quirk-ui/core";
import { resolveLinkURL } from "@/sanity/client";

type PageTemplateProps = {
  children: ReactNode;
  layoutType?: "default" | "minimal" | "dashboard";
  hideHeader?: boolean;
  hideFooter?: boolean;
  isBlog?: boolean;
  siteSettings?: any;
  navigationData?: any;
  navItems?: NavItem[];
  navGroups?: NavGroup[];
  utilityItems?: UtilityItem[];
  footerNavigationData?: any;
  footerNavItems?: NavItem[];
  footerUtilityItems?: UtilityItem[];
  footerSocialItems?: NavItem[];
  blogNavItems?: NavItem[];
};

export default function PageTemplate({
  children,
  layoutType = "default",
  hideHeader = false,
  hideFooter = false,
  isBlog = false,
  navigationData,
  navItems,
  navGroups,
  utilityItems,
  footerNavigationData,
  footerNavItems,
  footerUtilityItems,
  footerSocialItems,
  blogNavItems,
}: PageTemplateProps) {
  //Layout variants
  if (layoutType === "minimal") {
    return <div>{children}</div>;
  }

  return (
    <Layout
      variant={navigationData?.variant ?? "default"}
      navigationType={navigationData?.navigationType}
      navItems={navItems}
      utilityItems={utilityItems ?? []}
      navGroups={navGroups}
      alignment={navigationData?.alignment}
      logo={navigationData?.logo}
      logoLinkSlug={navigationData?.logoLink?.slug.current}
      hideHeader={hideHeader}
      hideFooter={hideFooter}
      footerNavItems={footerNavItems ?? []}
      footerUtilityItems={footerUtilityItems ?? []}
      footerSocialItems={footerSocialItems ?? []}
      footerLogo={footerNavigationData?.logo}
      footerlogoLinkSlug={footerNavigationData?.footerLinkSlug}
      footerAlignment={footerNavigationData?.alignment}
      footerPrimaryInfo={footerNavigationData?.primaryInfo}
      footerSecondaryInfo={footerNavigationData?.secondaryInfo}
      showLocaleSelect={navigationData?.showLocaleSelect}
      showSearch={navigationData?.showSearch}
    >
      {isBlog && blogNavItems && (
        <BlogHeader title="Blog" navItems={blogNavItems} alignment="right" />
      )}
      {children}
    </Layout>
  );
}
