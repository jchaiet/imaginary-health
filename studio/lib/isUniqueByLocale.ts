/**
 * Locale-aware slug uniqueness check for Sanity
 *
 * Allows different locales to share the same slug
 * whicle preventing duplicates within the same locale
 */

import { SlugValidationContext } from "sanity";

interface SiteReference {
  _ref: string;
}

export const isUniqueByLocale = async (
  slug: string | undefined,
  context: SlugValidationContext
): Promise<boolean> => {
  const { document, getClient } = context;

  const hasValidLocale = typeof document?.locale === "string";
  const hasValidSiteRef =
    document?.site && (document.site as SiteReference)._ref;

  if (!hasValidLocale || !hasValidSiteRef) return true;

  const client = getClient({ apiVersion: "2025-02-19" });

  const id = document._id.replace(/^drafts\./, "");

  const params = {
    id,
    locale: document.locale,
    siteRef: (document.site as SiteReference)._ref,
    slug,
  };
  const query = `
    !defined(
      *[
        !(sanity::versionOf($id)) &&
        slug.current == $slug &&
        locale == $locale &&
        site._ref == $siteRef
      ][0]._id
    )
  `;

  const result = await client.fetch(query, params);
  return result;
};
