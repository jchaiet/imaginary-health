import { urlForImage, sanityClient } from "@/sanity/client";
import { PageSection, SanityImage } from "quirk-ui/next";
import { documentListQuery } from "@/sanity/queries/fragments";
import { CategoryProps } from "@/types";

export type ResolveSectionOptions = {
  locale?: string;
  site: string;
  isDraft?: boolean;
  categoryOverride?: string[] | undefined;
};

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
      clone.imageUrl = urlForImage(obj).width(1200).quality(90).url();
    }

    for (const [key, value] of Object.entries(obj)) {
      clone[key] = resolveImagesDeep(value);
    }

    return clone as T;
  }

  return obj;
}

function normalizeCategoryFilters(filters: CategoryProps[]): string[] {
  if (!filters) return [];

  return filters.map((f) => (typeof f === "string" ? f : f._id));
}

export function resolveSections(
  sections: PageSection[],
  { locale, site, isDraft, categoryOverride }: ResolveSectionOptions
): Promise<PageSection[]> {
  return Promise.all(
    sections.map(async (section) => {
      let resolved = resolveImagesDeep(section);

      if (section._type === "documentListBlock") {
        try {
          const baseInclude = normalizeCategoryFilters(
            section.includeFilters ?? []
          );
          const excludeCategories = normalizeCategoryFilters(
            section.excludeFilters ?? []
          );

          const includeCategories =
            categoryOverride && categoryOverride?.length > 0
              ? [...baseInclude, ...categoryOverride]
              : baseInclude;

          const result = await sanityClient.fetch(
            documentListQuery,
            {
              locale,
              site,
              excludeCategories: excludeCategories,
              includeCategories,
              limit: section.limit ?? 3,
              documentType: section.documentType,
            },
            isDraft
              ? { perspective: "drafts", useCdn: false, stega: true }
              : undefined
          );

          const resolvedInitialArticles = resolveImagesDeep(result.articles);

          resolved = {
            ...resolved,
            initialArticles: resolvedInitialArticles,
            initialTotalCount: result.count,
            initialIncludeCategories: includeCategories,
          };
        } catch (err) {
          console.error("Failed to fetch document list for section", err);
        }
      }

      return resolved;
    })
  );
}
