import type { Metadata } from "next";
import { cache } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import { PageBuilder } from "@/lib/pageBuilder";
import {
  fetchSiteSettings,
  fetchNavigation,
  urlForImage,
  sanityClient,
} from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { resolveSections } from "@/lib/resolveSections";
import { mapNavigation } from "@/lib/mapNavigation";
import { mapUtilityItems } from "@/lib/mapUtilityItems";
import { mapSocialLinks } from "@/lib/mapSocialLinks";
import { mapGroups } from "@/lib/mapGroups";

interface PageProps {
  params: Promise<{ site: string; slug: string[]; locale: string }>;
  searchParams?: Promise<{ categories: string | string[] }>;
}

const getPage = cache(
  async (
    slug: string[] | null,
    locale: string,
    isDraft: boolean,
    site: string
  ) => {
    const formattedSlug = slug?.length ? slug.join("/") : "home";

    return sanityClient.fetch(
      pageBySlugQuery,
      { slug: formattedSlug, locale, site },
      isDraft
        ? {
            perspective: "drafts",
            useCdn: false,
            stega: true,
          }
        : undefined
    );
  }
);

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

  const ogImageUrl = settings?.defaultSEO?.image
    ? urlForImage(settings.defaultSEO.image)
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
              url: urlForImage(settings?.siteIcon?.maskIcon).quality(100).url(),
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

export default async function Page({ params, searchParams }: PageProps) {
  const { slug, locale, site } = await params;
  const { isEnabled } = await draftMode();

  const resolvedParams = await searchParams;

  let categoryOverride: string[] | undefined;
  if (resolvedParams?.categories) {
    categoryOverride = Array.isArray(resolvedParams.categories)
      ? resolvedParams.categories
      : [resolvedParams.categories];
  }

  let page = await getPage(slug, locale, isEnabled, site);

  if (!page && locale !== "en-us") {
    page = await getPage(slug, "en-us", isEnabled, site);
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

  const resolvedSections = await resolveSections(pageBuilder ?? [], {
    locale,
    site,
    isDraft: isEnabled,
    categoryOverride,
  });

  const isBlog = page?.slug?.current?.startsWith("blog");

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

  const blogNavigationData = isBlog ? await fetchNavigation("blog") : null;

  const blogNavItems = blogNavigationData?.navigationItems?.length
    ? await mapNavigation(blogNavigationData.navigationItems)
    : [];

  return (
    <PageTemplate
      isBlog={isBlog}
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
      <PageBuilder sections={resolvedSections} pageData={page} />
    </PageTemplate>
  );
}
