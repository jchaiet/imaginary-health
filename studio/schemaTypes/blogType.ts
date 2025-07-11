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
      name: "timeToRead",
      title: "Time to Read",
      type: "number",
    }),
    defineField({
      name: "articleType",
      title: "Article Type",
      type: "string",
      options: {
        list: [
          { title: "Article", value: "article" },
          { title: "Recipe", value: "recipe" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      initialValue: [
        {
          _type: "reference",
          _ref: "d685ac53-99d4-405c-8654-798b487eefac", //Library category
        },
      ],
    }),
    defineField({
      name: "pageBuilder",
      title: "Article Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "heroBlock",
          name: "heroBlock",
          title: "Hero",
          icon: InlineIcon,
        }),
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
          initialValue: {
            styleOptions: {
              padding: ["paddingTop4", "paddingBottom4"],
            },
          },
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
      initialValue: [
        {
          _type: "heroBlock",
        },
        {
          _type: "contentBlock",
        },
      ],
    }),
  ],
});
