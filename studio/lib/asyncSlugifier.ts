import {
  // SanityDocument,
  SchemaType,
  SlugSourceContext,
  SlugifierFn,
} from "sanity";
import { client } from "./client";

// interface PageDocument extends SanityDocument {
//   title?: string;
//   parent?: {
//     _ref?: string;
//     _type: "reference";
//   };
// }

const TYPE_SLUG_PREFIXES: { [key: string]: string } = {
  blog: "blog/articles/",
  news: "news/",
  resource: "resources/",
};

export const asyncSlugifier: SlugifierFn = async (
  input: string,
  schemaType: SchemaType,
  context: any
) => {
  // const document = context.parent;

  // if (document._type === "page") {
  //   const parentRef = document.parent?.parent?._ref;
  //   let parentSlug = "";

  //   if (parentRef) {
  //     const parentDoc = await client.fetch(`*[_id == $id][0]{slug}`, {
  //       id: parentRef,
  //     });
  //     if (parentDoc?.slug?.current) {
  //       parentSlug = `${parentDoc.slug.current}/`;
  //     }
  //   }

  //   const pageSlug = input
  //     ?.toLocaleLowerCase()
  //     .trim()
  //     .replace(/[^\w\s-]/g, "")
  //     .replace(/\s+/g, "-")
  //     .slice(0, 200);

  //   return `${parentSlug}${pageSlug}`;
  // }

  // if (TYPE_SLUG_PREFIXES[document._type as string]) {
  //   const baseSlug = input
  //     ?.toLocaleLowerCase()
  //     .trim()
  //     .replace(/[^\w\s-]/g, "")
  //     .replace(/\s+/g, "-")
  //     .slice(0, 200);

  //   return `${TYPE_SLUG_PREFIXES[document._type as string]}${baseSlug}`;
  // }

  // return input
  //   ?.toLocaleLowerCase()
  //   .trim()
  //   .replace(/[^\w\s-]/g, "")
  //   .replace(/\s+/g, "-")
  //   .slice(0, 200);

  const page = context.parent;

  const parentQuery = `*[_id == $id][0]`;
  const parentQueryParams = {
    id: context.parent?.parent?._ref || "",
  };

  const parent = await client.fetch(parentQuery, parentQueryParams);

  const parentSlug = parent?.slug?.current ? `${parent.slug.current}/` : "";

  const pageSlug = page.title
    ?.toLocaleLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 200);

  return `${parentSlug}${pageSlug}`;
};

export default asyncSlugifier;
