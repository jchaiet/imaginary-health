import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";
import asyncSlugifier from "../../lib/asyncSlugifier";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The name of the category.",
      validation: (Rule) => Rule.required(),
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
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "children",
      title: "Children",
      type: "array",
      of: [{ type: "string" }],
      hidden: true,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Short description of what this category is about.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      parent: "parent.title",
    },
    prepare({ title, parent }) {
      return {
        title,
        subtitle: parent ? `Parent: ${parent}` : "Top-level",
      };
    },
  },
});
