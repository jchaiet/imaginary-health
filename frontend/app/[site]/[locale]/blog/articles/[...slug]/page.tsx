import React from "react";
import {
  sanityClient,
  urlForImage,
  fetchSiteSettings,
  fetchNavigation,
} from "@/sanity/client";
import { articleBySlugQuery } from "@/sanity/queries";
import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import { resolveSections } from "@/lib/resolveSections";
import { mapNavigation } from "@/lib/mapNavigation";
import { mapUtilityItems } from "@/lib/mapUtilityItems";
import { mapSocialLinks } from "@/lib/mapSocialLinks";
import { mapGroups } from "@/lib/mapGroups";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
import { type CategoryProps, type PageSection } from "quirk-ui/next";

interface PageProps {
  params: Promise<{ site: string; slug: string[]; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { site } = await params;

  const settings = await fetchSiteSettings(site);

  const faviconUrl = settings?.siteIcon?.favicon
    ? urlForImage(settings.siteIcon.favicon)
        .width(32)
        .height(32)
        .quality(100)
        .url()
    : "/favicon.ico";

  const ogImageUrl = settings?.defaultSeo?.image
    ? urlForImage(settings.defaultSeo.image)
        .width(1200)
        .height(630)
        .quality(90)
        .url()
    : "/og-image.png";

  const siteName = settings?.title || "My Site";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
    ),
    title: settings?.defaultSEO?.title || settings?.title || "My Site",
    description: settings?.defaultSEO?.description || settings?.description,
    keywords: settings?.defaultSEO?.keywords || ["website"],
    robots: {
      index: settings?.defaultSEO?.robots !== "noindex",
      follow: settings?.defaultSEO?.robots !== "nofollow",
    },
    icons: {
      icon: [faviconUrl && { url: faviconUrl, sizes: "32x32" }].filter(
        Boolean
      ) as { url: string; sizes?: string }[],
      apple: settings?.siteIcon?.appleTouchIcon
        ? urlForImage(settings?.siteIcon?.appleTouchIcon).quality(100).url()
        : undefined,
      other: settings?.siteIcon?.maskIcon
        ? [
            {
              rel: "mask-icon",
              url: urlForImage(settings?.siteIcon?.appleTouchIcon)
                .quality(100)
                .url(),
            },
          ]
        : [],
    },
    openGraph: {
      type: "website",
      siteName,
      title: settings?.defaultSEO?.title || siteName,
      description: settings?.defaultSEO?.description || settings?.description,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: settings?.defaultSEO?.title || siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: settings?.social?.twitterHandle || "@yoursite",
      title: settings?.defaultSEO?.title || siteName,
      description: settings?.defaultSEO?.description || settings?.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL,
      languages: {
        "en-us": `${process.env.NEXT_PUBLIC_SITE_URL}/`,
        "es-us": `${process.env.NEXT_PUBLIC_SITE_URL}/es-us,`,
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug, locale, site } = await params;
  const { isEnabled } = await draftMode();

  const formattedSlug = slug.join("/") ?? "/";

  let page = await sanityClient.fetch(
    articleBySlugQuery,
    { slug: formattedSlug, locale, site },
    isEnabled
      ? {
          perspective: "drafts",
          useCdn: false,
          stega: true,
        }
      : undefined
  );

  if (!page && locale !== "en-us") {
    page = await sanityClient.fetch(
      articleBySlugQuery,
      { slug: formattedSlug, locale: "en-us" },
      isEnabled
        ? {
            perspective: "drafts",
            useCdn: false,
            stega: true,
          }
        : undefined
    );
  }

  if (!page) notFound();

  const {
    pageBuilder = [],
    hideHeader = false,
    hideFooter = false,
    navigationOverride,
    footerOverride,
    site: siteRef,
  } = page;

  const resolvedSections = resolveSections(pageBuilder);

  const type = page?._type === "blog" ? "article" : "other";

  const hasKeywordsCategory = page.categories?.some((cat: CategoryProps) =>
    cat.slug?.current?.includes("/keywords")
  );

  const sectionsWithStaticComponents = resolvedSections.flatMap(
    (section: PageSection) => {
      if (section._type === "featuredDocumentsBlock") {
        const newSections: PageSection[] = [];

        if (hasKeywordsCategory) {
          newSections.push({
            _type: "additionalCategoriesBlock",
            categories: page.categories ?? [],
            type,
          });
        }

        newSections.push({
          _type: "wasHelpfulBlock",
          page: page,
          type: type,
        });

        newSections.push(section);
        return newSections;
      }
      return [section];
    }
  );

  //Server data
  const settings = site ? await fetchSiteSettings(site) : null;

  const navigationData = await fetchNavigation(
    navigationOverride?.slug ??
      siteRef?.defaultNavigation?.slug ??
      "main-navigation"
  );

  const navItems = navigationData?.navigationItems
    ? await mapNavigation(navigationData.navigationItems)
    : [];

  const navGroups = navigationData?.navigationGroups
    ? await mapGroups(navigationData.navigationGroups)
    : [];

  const utilityItems = navigationData?.utilityItems
    ? await mapUtilityItems(navigationData.utilityItems)
    : [];

  const footerNavigationData = await fetchNavigation(
    footerOverride?.slug ?? siteRef?.defaultFooter?.slug ?? "main-footer"
  );

  const footerNavItems = footerNavigationData?.navigationItems
    ? await mapNavigation(footerNavigationData.navigationItems)
    : [];

  const footerUtilityItems = footerNavigationData?.utilityItems
    ? await mapUtilityItems(footerNavigationData.utilityItems)
    : [];

  const footerSocialItems = settings?.socialLinks
    ? await mapSocialLinks(settings?.socialLinks)
    : [];

  const blogNavigationData = await fetchNavigation("blog");

  const blogNavItems = blogNavigationData?.navigationItems?.length
    ? await mapNavigation(blogNavigationData.navigationItems)
    : [];

  return (
    <PageTemplate
      isBlog={true}
      hideHeader={hideHeader}
      hideFooter={hideFooter}
      siteSettings={settings}
      navigationData={navigationData}
      navItems={navItems}
      navGroups={navGroups}
      utilityItems={utilityItems}
      footerNavigationData={footerNavigationData}
      footerNavItems={footerNavItems}
      footerUtilityItems={footerUtilityItems}
      footerSocialItems={footerSocialItems}
      blogNavItems={blogNavItems}
    >
      <PageBuilder sections={sectionsWithStaticComponents} pageData={page} />
    </PageTemplate>
  );
}
