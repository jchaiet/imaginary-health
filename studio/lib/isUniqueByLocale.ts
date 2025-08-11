/**
 * Locale-aware slug uniqueness check for Sanity
 *
 * Allows different locales to share the same slug
 * whicle preventing duplicates within the same locale
 */

import { SlugValidationContext } from "sanity";

export const isUniqueByLocale = async (
  slug: string | undefined,
  context: SlugValidationContext
): Promise<boolean> => {
  const { document, getClient } = context;
  if (!document?.locale) return true;
  const client = getClient({ apiVersion: "2025-02-19" });

  const id = document._id.replace(/^drafts\./, "");

  const params = {
    id,
    locale: document.locale,
    slug,
  };
  const query = `
    !defined(
      *[
        !(sanity::versionOf($id)) &&
        slug.current == $slug &&
        locale == $locale
      ][0]._id
    )
  `;

  const result = await client.fetch(query, params);
  return result;

  // const locale = (document as any)?.locale || "en";

  // const isDraft = document._id.startsWith("drafts.");
  // const publishedId = isDraft ? document._id.slice(7) : document._id;
  // const draftId = isDraft ? document._id : `drafts.${document._id}`;
  // const query = `
  //   !defined(
  //     *[
  //       _type == $type &&
  //       slug.current == $slug &&
  //       locale == $locale &&
  //       !(_id in [$draftId, $publishedId])
  //     ][0]._id
  //   )
  // `;

  // const params = {
  //   type: document._type,
  //   slug,
  //   locale,
  //   draftId: draftId,
  //   publishedId: publishedId,
  // };

  // try {
  //   const result = await client.fetch(query, params);
  //   return result;
  // } catch (err) {
  //   console.error("Error during slug uniqueness check", err);
  //   return false;
  // }
};
