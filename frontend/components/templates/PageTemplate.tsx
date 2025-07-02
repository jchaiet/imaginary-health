import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { mapNavigation } from "@/lib/navigation";
import { fetchNavigation, urlForImage } from "@/sanity/client";

type PageTemplateProps = {
  children: ReactNode;
  layoutType?: "default" | "minimal" | "dashboard";
  hideHeader?: boolean;
  hideFooter?: boolean;
};

export default async function PageTemplate({
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
      hideHeader={hideHeader}
      hideFooter={hideFooter}
    >
      {children}
    </Layout>
  );
}
