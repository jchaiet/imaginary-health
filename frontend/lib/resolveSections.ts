import { urlForImage } from "@/sanity/client";
import { PageSection, SanityImage } from "quirk-ui/next";

function isSanityImage(obj: unknown): obj is SanityImage {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "asset" in obj &&
    typeof (obj as { asset?: { _id?: unknown } }).asset?._id === "string"
  );
}

function resolveImagesDeep<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(resolveImagesDeep) as unknown as T;
  }

  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    const clone = { ...(obj as Record<string, unknown>) };

    if (isSanityImage(obj)) {
      clone.imageUrl = urlForImage(obj).width(1600).quality(90).url();
    }

    for (const [key, value] of Object.entries(obj)) {
      clone[key] = resolveImagesDeep(value);
    }

    return clone as T;
  }

  return obj;
}

export function resolveSections(sections: PageSection[]): PageSection[] {
  return sections.map((section) => resolveImagesDeep(section));
}

// async function resolveItems(items: ItemType[]) {
//   return await Promise.all(
//     items.map(async (item: ItemType) => {
//       if (item.callToAction) {
//         return {
//           ...item,
//           callToAction: {
//             ...item.callToAction,
//             resolvedUrl: await resolveLinkURL(item.callToAction),
//           },
//         };
//       }
//       return item;
//     })
//   );
// }
