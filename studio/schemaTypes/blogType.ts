import { defineType, defineField, defineArrayMember } from "sanity";
import {
  DocumentTextIcon,
  InfoOutlineIcon,
  InlineElementIcon,
  InlineIcon,
  ThLargeIcon,
  DoubleChevronDownIcon,
} from "@sanity/icons";
import asyncSlugifier from "../lib/asyncSlugifier";

export const blogType = defineType({
  name: "blog",
  title: "Blog Article",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent Page",
      type: "reference",
      to: [
        {
          type: "blog",
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
      name: "publishDate",
      title: "Publish Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short summary of the article for previews and SEO",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(250),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "pageBuilder",
      title: "Article Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "cardGridBlock",
          name: "cardGridBlock",
          title: "Card Grid",
          icon: ThLargeIcon,
        }),
        defineArrayMember({
          type: "carouselBlock",
          name: "carouselBlock",
          title: "Carousel",
          icon: InlineElementIcon,
        }),
        defineArrayMember({
          type: "contentBlock",
          name: "contentBlock",
          title: "Content Block",
          icon: InlineIcon,
        }),
        defineArrayMember({
          type: "accordionBlock",
          name: "accordionBlock",
          title: "Accordion Block",
          icon: DoubleChevronDownIcon,
        }),
        defineArrayMember({
          type: "disclaimerBlock",
          name: "disclaimerBlock",
          title: "Disclaimer Block",
          icon: InfoOutlineIcon,
        }),
      ],
    }),
  ],
});
