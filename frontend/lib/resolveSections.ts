import { urlForImage } from "@/sanity/client";
import { PageSection } from "@/types";

function resolveImagesDeep(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(resolveImagesDeep);
  }

  if (obj && typeof obj === "object") {
    const clone: Record<string, any> = { ...obj };

    if (obj.asset?._id) {
      clone.imageUrl = urlForImage(obj).width(1600).quality(90).url();
    }

    for (const [key, value] of Object.entries(obj)) {
      clone[key] = resolveImagesDeep(value);
    }

    return clone;
  }

  return obj;
}

export function resolveSections(sections: PageSection[]) {
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
