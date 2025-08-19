import { defineType, defineField, defineArrayMember } from "sanity";
import {
  DocumentTextIcon,
  InfoOutlineIcon,
  InlineElementIcon,
  InlineIcon,
  ThLargeIcon,
  DoubleChevronDownIcon,
  StarIcon,
  ImageIcon,
  SunIcon,
  BlockquoteIcon,
  BlockContentIcon,
} from "@sanity/icons";
import asyncSlugifier from "../lib/asyncSlugifier";
import { isUniqueByLocale } from "../lib/isUniqueByLocale";

export const blogType = defineType({
  name: "blog",
  title: "Blog Article",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "details", title: "Details" },
    { name: "metadata", title: "Metadata" },
    { name: "settings", title: "Settings" },
    { name: "content", title: "Content" },
  ],
  fields: [
    defineField({
      name: "locale",
      type: "string",
      group: "details",
      description: "Language for the document",
      readOnly: true,
      initialValue: "en-us",
    }),
    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent Page",
      type: "reference",
      group: "details",
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
      group: "details",
      options: {
        source: "title",
        isUnique: isUniqueByLocale,
        slugify: asyncSlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metadata",
      title: "Metadata",
      type: "pageMetadata",
      group: "metadata",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "children",
      title: "Children",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      hidden: true,
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "date",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      group: "details",
      description: "Short summary of the article for previews and SEO",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(250),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "details",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "timeToRead",
      title: "Time to Read",
      type: "number",
      group: "settings",
    }),
    defineField({
      name: "articleType",
      title: "Article Type",
      type: "string",
      group: "settings",
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
      description:
        "The first 3 categories in this list will be used for the Eyebrow component in the article.",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      initialValue: [
        {
          _type: "reference",
          _ref: "d685ac53-99d4-405c-8654-798b487eefac", //Library category
        },
      ],
    }),
    defineField({
      name: "helpfulYesCount",
      title: "Helpful - Yes Count",
      type: "number",
      initialValue: 0,
      readOnly: true,
      group: "details",
    }),
    defineField({
      name: "helpfulNoCount",
      title: "Helpful - No Count",
      type: "number",
      initialValue: 0,
      readOnly: true,
      group: "details",
    }),
    defineField({
      name: "pageBuilder",
      title: "Article Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "heroBlock",
          name: "heroBlock",
          title: "Hero",
          icon: InlineIcon,
          initialValue: {
            styleOptions: {
              layout: "blog",
            },
          },
        }),
        defineArrayMember({
          type: "richTextBlock",
          name: "richTextBlock",
          title: "RichText Block",
          icon: BlockContentIcon,
          initialValue: {
            styleOptions: {
              padding: ["paddingTop4", "paddingBottom2"],
              layout: "blog",
            },
          },
        }),
        defineArrayMember({
          type: "contentBlock",
          name: "contentBlock",
          title: "Content Block",
          icon: InlineIcon,
          initialValue: {
            styleOptions: {
              padding: ["paddingTop4", "paddingBottom2"],
              layout: "blog",
            },
          },
        }),
        defineArrayMember({
          type: "quoteBlock",
          name: "quoteBlock",
          title: "Quote Block",
          icon: BlockquoteIcon,
        }),
        defineArrayMember({
          type: "carouselBlock",
          name: "carouselBlock",
          title: "Carousel",
          icon: InlineElementIcon,
        }),
        defineArrayMember({
          type: "featuredDocumentsBlock",
          name: "featuredDocumentsBlock",
          title: "Featured Documents",
          icon: StarIcon,
          initialValue: {
            heading: {
              title: [
                {
                  _type: "block",
                  style: "h2",
                  markDefs: [],
                  children: [
                    {
                      _type: "span",
                      text: "You might also like",
                      marks: [],
                    },
                  ],
                },
              ],
            },
            selectionMode: "dynamic",
            layout: "carousel",
            styleOptions: {
              padding: ["paddingTop2", "paddingBottom4"],
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
          name: "singletonBlock",
          type: "singletonBlock",
          title: "Singleton Block",
          icon: SunIcon,
        }),
      ],
      initialValue: [
        {
          _type: "heroBlock",
        },
        {
          _type: "richTextBlock",
        },
        {
          _type: "featuredDocumentsBlock",
        },
        {
          _type: "singletonBlock",
          referencedSingleton: {
            _type: "reference",
            _ref: "cabf4035-2723-4cf5-b43e-74ff124cee4f",
          },
        },
        {
          _type: "singletonBlock",
          referencedSingleton: {
            _type: "reference",
            _ref: "254b6640-82d7-4f55-8b16-007492beff8b",
          },
        },
      ],
    }),
  ],
});
