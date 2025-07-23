import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { mapNavigation } from "@/lib/mapNavigation";
import { fetchNavigation, urlForImage } from "@/sanity/client";
import BlogHeader from "../layout/BlogHeader";

type PageTemplateProps = {
  children: ReactNode;
  layoutType?: "default" | "minimal" | "dashboard";
  hideHeader?: boolean;
  hideFooter?: boolean;
};

export default async function BlogTemplate({
  children,
  layoutType = "default",
  hideHeader = false,
  hideFooter = false,
}: PageTemplateProps) {
  const navigationData = await fetchNavigation("main-navigation");
  const navItems = await mapNavigation(navigationData);
  const utilityItems = navigationData.utilityItems;

  const logoUrl = navigationData.logo
    ? urlForImage(navigationData.logo).quality(100).url()
    : null;
  const logoAlt =
    navigationData.logo?.alt || navigationData.logo?.description || "Logo";
  const logoLinkSlug = navigationData.logoLink?.slug?.current;

  const blogNavigationData = await fetchNavigation("blog");
  const blogNavItems = await mapNavigation(blogNavigationData);

  //Layout variants
  if (layoutType === "minimal") {
    return <div>{children}</div>;
  }

  return (
    <Layout
      utilityItems={utilityItems}
      navItems={navItems}
      alignment={navigationData.alignment}
      logoUrl={logoUrl}
      logoAlt={logoAlt}
      logoLinkSlug={logoLinkSlug}
      variant={navigationData.variant}
      hideHeader={hideHeader}
      hideFooter={hideFooter}
    >
      <BlogHeader title="Blog" navItems={blogNavItems} alignment="right" />
      {children}
    </Layout>
  );
}
