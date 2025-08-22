import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { mapNavigation } from "@/lib/mapNavigation";
import { fetchNavigation, fetchSiteSettings } from "@/sanity/client";
import BlogHeader from "../layout/BlogHeader";
import { mapUtilityItems } from "@/lib/mapUtilityItems";
import { mapSocialLinks } from "@/lib/mapSocialLinks";
import { mapGroups } from "@/lib/mapGroups";

type PageTemplateProps = {
  children: ReactNode;
  layoutType?: "default" | "minimal" | "dashboard";
  hideHeader?: boolean;
  hideFooter?: boolean;
  isBlog?: boolean;
  site?: string;
};

export default async function PageTemplate({
  children,
  layoutType = "default",
  hideHeader = false,
  hideFooter = false,
  isBlog = false,
  site,
}: PageTemplateProps) {
  const settings = site ? await fetchSiteSettings(site) : null;
  const socialItems = settings?.socialLinks
    ? await mapSocialLinks(settings?.socialLinks)
    : [];

  const navigationData = await fetchNavigation("main-navigation");
  const navItems = navigationData.primaryItems?.length
    ? await mapNavigation(navigationData.primaryItems)
    : [];
  const navGroups = navigationData.navigationGroups?.length
    ? await mapGroups(navigationData.navigationGroups)
    : [];

  const utilityItems = await mapUtilityItems(navigationData.utilityItems);
  const logoLinkSlug = navigationData.logoLink?.slug?.current;

  const footerNavigationData = await fetchNavigation("main-footer");
  const footerLinkSlug = footerNavigationData.logoLink?.slug?.current;

  const footerNavItems = footerNavigationData?.navigationItems?.length
    ? await mapNavigation(footerNavigationData.navigationItems)
    : [];

  const footerUtilityItems = await mapUtilityItems(
    footerNavigationData.utilityItems
  );

  const blogNavigationData = isBlog ? await fetchNavigation("blog") : null;
  const blogNavItems = blogNavigationData?.navigationItems?.length
    ? await mapNavigation(blogNavigationData.navigationItems)
    : [];

  //Layout variants
  if (layoutType === "minimal") {
    return <div>{children}</div>;
  }

  return (
    <Layout
      variant={navigationData.variant}
      navigationType={navigationData.navigationType}
      utilityItems={utilityItems}
      navItems={navItems}
      navGroups={navGroups}
      alignment={navigationData.alignment}
      logo={navigationData.logo}
      logoLinkSlug={logoLinkSlug}
      hideHeader={hideHeader}
      hideFooter={hideFooter}
      socialItems={settings?.socialLinks}
      footerNavItems={footerNavItems}
      footerUtilityItems={footerUtilityItems}
      footerLogo={footerNavigationData.logo}
      footerlogoLinkSlug={footerLinkSlug}
      footerAlignment={footerNavigationData.alignment}
      footerPrimaryInfo={footerNavigationData.primaryInfo}
      footerSecondaryInfo={footerNavigationData.secondaryInfo}
      footerSocialItems={socialItems}
      showLocaleSelect={navigationData.showLocaleSelect}
      showSearch={navigationData.showSearch}
    >
      {isBlog && (
        <BlogHeader title="Blog" navItems={blogNavItems} alignment="right" />
      )}
      {children}
    </Layout>
  );
}
