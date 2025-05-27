import {
  SanityDocument,
  SchemaType,
  SlugSourceContext,
  SlugifierFn,
} from "sanity";
import { client } from "./client";

interface PageDocument extends SanityDocument {
  title?: string;
  parent?: {
    _ref?: string;
    _type: "reference";
  };
}

export const asyncSlugifier: SlugifierFn = async (
  input: string,
  schemaType: SchemaType,
  context: any
) => {
  const page = context.parent;

  const parentQuery = `*[_id == $id][0]`;
  const parentQueryParams = {
    id: context.parent?.parent?._ref || "",
  };

  const parent = await client.fetch(parentQuery, parentQueryParams);

  const parentSlug = parent?.slug?.current ? `${parent.slug.current}/` : "";

  const pageSlug = page.title
    ?.toLocaleLowerCase()
    .replace(/\s+/g, "-")
    .slice(0, 200);

  return `${parentSlug}${pageSlug}`;
};

export default asyncSlugifier;
