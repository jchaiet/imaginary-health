import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { mapNavigation } from "@/lib/mapNavigation";
import {
  fetchNavigation,
  fetchSiteSettings,
  urlForImage,
} from "@/sanity/client";
import BlogHeader from "../layout/BlogHeader";
import { mapUtilityItems } from "@/lib/mapUtilityItems";
import { mapSocialLinks } from "@/lib/mapSocialLinks";

type PageTemplateProps = {
  children: ReactNode;
  layoutType?: "default" | "minimal" | "dashboard";
  hideHeader?: boolean;
  hideFooter?: boolean;
  isBlog?: boolean;
};

export default async function PageTemplate({
  children,
  layoutType = "default",
  hideHeader = false,
  hideFooter = false,
  isBlog = false,
}: PageTemplateProps) {
  const settings = await fetchSiteSettings();

  const navigationData = await fetchNavigation("main-navigation");
  const navItems = await mapNavigation(navigationData);
  console.log("MAPPED", navItems);

  const utilityItems = navigationData.utilityItems;
  const logoLinkSlug = navigationData.logoLink?.slug?.current;

  const footerNavigationData = await fetchNavigation("main-footer");
  const footerLinkSlug = footerNavigationData.logoLink?.slug?.current;

  const footerNavItems = footerNavigationData
    ? await mapNavigation(footerNavigationData)
    : [];

  const footerUtilityItems = await mapUtilityItems(
    footerNavigationData.utilityItems
  );

  console.log("U", settings);

  const blogNavigationData = isBlog ? await fetchNavigation("blog") : null;
  const blogNavItems = blogNavigationData
    ? await mapNavigation(blogNavigationData)
    : [];

  const socialItems = await mapSocialLinks(settings.socialLinks);

  //Layout variants
  if (layoutType === "minimal") {
    return <div>{children}</div>;
  }

  return (
    <Layout
      variant={navigationData.variant}
      utilityItems={utilityItems}
      navItems={navItems}
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
    >
      {isBlog && (
        <BlogHeader title="Blog" navItems={blogNavItems} alignment="right" />
      )}
      {children}
    </Layout>
  );
}
