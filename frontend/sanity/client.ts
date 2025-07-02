import { createClient, defineLive } from "next-sanity";
import { sanityConfig } from "./config";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Link } from "@/types";
import { navigationQuery } from "./queries";

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export async function fetchSiteSettings() {
  return await sanityClient.fetch(`*[_type == "siteSettings"][0]`);
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

  if (options?.linkType === "internal" && options.internalUrl?._ref) {
    const refId = options.internalUrl._ref;

    const result = await sanityClient.fetch(`*[_id == $refId][0]{ slug }`, {
      refId,
    });

    if (result?.slug?.current) {
      return `/${result.slug.current}`;
    }
  }

  return "#";
}

// export const { sanityFetch, SanityLive} = defineLive({
//   client: sanityClient,
//   serverToken: process.env.SANITY_API_READ_TOKEN,
//   browserToken: process.env.SANITY_API_READ_TOKEN,
// })
