import { defineArrayMember, defineField, defineType } from "sanity";
import {
  DocumentsIcon,
  InfoOutlineIcon,
  InlineElementIcon,
  InlineIcon,
  HelpCircleIcon,
  ThLargeIcon,
  DoubleChevronDownIcon,
  ListIcon,
  StarIcon,
  BlockquoteIcon,
  BlockContentIcon,
} from "@sanity/icons";
import asyncSlugifier from "../lib/asyncSlugifier";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentsIcon,
  groups: [
    { name: "details", title: "Details" },
    { name: "metadata", title: "Metadata" },
    { name: "content", title: "Content" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page Name",
      type: "string",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent Page",
      type: "reference",
      group: "details",
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
      group: "details",
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
      name: "pageBuilder",
      type: "array",
      title: "Page Content",
      group: "content",
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
        }),
        defineArrayMember({
          type: "richTextBlock",
          name: "richTextBlock",
          title: "RichText Block",
          icon: BlockContentIcon,
        }),
        defineArrayMember({
          type: "documentListBlock",
          name: "documentListBlock",
          title: "Document List Block",
          icon: ListIcon,
        }),
        defineArrayMember({
          type: "featuredDocumentsBlock",
          name: "featuredDocumentsBlock",
          title: "Featured Documents Block",
          icon: StarIcon,
        }),
        defineArrayMember({
          type: "stickyScrollBlock",
          name: "stickyScrollBlock",
          title: "Sticky Scroll Block",
          icon: InlineElementIcon,
        }),
        defineArrayMember({
          type: "faqBlock",
          name: "faqBlock",
          title: "FAQ Block",
          icon: HelpCircleIcon,
        }),
        defineArrayMember({
          type: "tabsBlock",
          name: "tabsBlock",
          title: "Tabs Block",
          icon: InlineElementIcon,
        }),
        defineArrayMember({
          type: "accordionBlock",
          name: "accordionBlock",
          title: "Accordion Block",
          icon: DoubleChevronDownIcon,
        }),
        defineArrayMember({
          type: "quoteBlock",
          name: "quoteBlock",
          title: "Quote Block",
          icon: BlockquoteIcon,
        }),
      ],
    }),
  ],
});
