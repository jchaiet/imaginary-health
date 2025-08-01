import { createClient } from "next-sanity";
import { sanityConfig } from "./config";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Link } from "@/types";
import { navigationQuery, siteSettingsQuery } from "./queries";

export const sanityClient = createClient(sanityConfig);
export const writeSanityClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_WRITE_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export async function fetchSiteSettings() {
  return await sanityClient.fetch(siteSettingsQuery);
}

export async function fetchNavigation(slug = "main-navigation") {
  return sanityClient.fetch(navigationQuery, { slug });
}

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export async function resolveLinkURL(cta: Link) {
  if (cta.type !== "link") return undefined;

  const options = cta.linkOptions;

  if (options?.linkType === "external" && options.externalUrl) {
    return options.externalUrl;
  }

  if (options?.linkType === "internal" && options.internalUrl?.slug) {
    return `/${options.internalUrl?.slug.current}`;
  }

  return "#";
}
