import { createClient } from "next-sanity";
import { sanityConfig } from "./config";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Link } from "@/types";

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

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
