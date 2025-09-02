"use client";
import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";

import BlogHeader from "../layout/BlogHeader";
import { NavItem } from "quirk-ui/core";
import { Link } from "@/types";

type PageTemplateProps = {
  children: ReactNode;
  layoutType?: "default" | "minimal" | "dashboard";
  hideHeader?: boolean;
  hideFooter?: boolean;
  isBlog?: boolean;
  siteSettings?: any;
  navigationData?: any;
  footerNavigationData?: any;
  blogNavItems?: NavItem[];
  socialItems?: Link[];
};

export default function PageTemplate({
  children,
  layoutType = "default",
  hideHeader = false,
  hideFooter = false,
  isBlog = false,
  siteSettings,
  navigationData,
  footerNavigationData,
  blogNavItems,
  socialItems,
}: PageTemplateProps) {
  //Layout variants
  if (layoutType === "minimal") {
    return <div>{children}</div>;
  }

  return (
    <Layout
      variant={navigationData?.variant ?? "default"}
      navigationType={navigationData?.navigationType}
      utilityItems={navigationData?.utilityItems}
      navItems={navigationData?.navigationItems}
      navGroups={navigationData?.navigationGroups}
      alignment={navigationData?.alignment}
      logo={navigationData?.logo}
      logoLinkSlug={navigationData?.logoLinkSlug}
      hideHeader={hideHeader}
      hideFooter={hideFooter}
      socialItems={siteSettings?.socialLinks}
      footerNavItems={footerNavigationData?.footerNavItems}
      footerUtilityItems={footerNavigationData?.footerUtilityItems}
      footerLogo={footerNavigationData?.logo}
      footerlogoLinkSlug={footerNavigationData?.footerLinkSlug}
      footerAlignment={footerNavigationData?.alignment}
      footerPrimaryInfo={footerNavigationData?.primaryInfo}
      footerSecondaryInfo={footerNavigationData?.secondaryInfo}
      footerSocialItems={socialItems}
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
