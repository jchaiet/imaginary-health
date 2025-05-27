import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentsIcon, InlineIcon, ThLargeIcon } from "@sanity/icons";
import asyncSlugifier from "../lib/asyncSlugifier";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Page Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent Page",
      type: "reference",
      to: [
        {
          type: "page",
        },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Used for the page URL",
      type: "slug",
      options: {
        source: "title",
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        slugify: asyncSlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metadata",
      title: "Metadata",
      type: "pageMetadata",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "children",
      title: "Children",
      type: "array",
      of: [{ type: "string" }],
      hidden: true,
    }),
    defineField({
      name: "pageBuilder",
      type: "array",
      title: "Page Content",
      of: [
        defineArrayMember({
          type: "hero",
          name: "hero",
          title: "Hero",
          icon: InlineIcon,
        }),
        defineArrayMember({
          type: "cardGrid",
          name: "cardGrid",
          title: "Card Grid",
          icon: ThLargeIcon,
        }),
      ],
    }),
  ],
});
