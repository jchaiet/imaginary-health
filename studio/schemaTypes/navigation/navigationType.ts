import { defineType, defineField } from "sanity";
import { MenuIcon } from "@sanity/icons";

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "title",
      title: "Menu Title",
      description:
        'Used to identify the menu. e.g., "Main Menu", "Footer Menu"',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifier",
      description:
        'A unique identifier for this menu (e.g., "main-menu", "footer-menu")',
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error("A unique identifier is required for the menu"),
    }),
    defineField({
      name: "primaryItems",
      title: "Menu Items",
      type: "array",
      of: [{ type: "navigationItem" }],
    }),
    defineField({
      name: "alignment",
      title: "Primary Nav Alignment",
      type: "string",
      options: {
        list: [
          {
            title: "Left",
            value: "left",
          },
          {
            title: "Center",
            value: "center",
          },
          {
            title: "Right",
            value: "right",
          },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
      name: "utilityItems",
      title: "Utility Items",
      description: 'Additional CTAs. e.g., "Sign in", "Sign up"',
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoLink",
      title: "Logo Link",
      description: "Page the logo should link to",
      type: "reference",
      to: [{ type: "page" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title: title || "Untitled Navigation Menu",
        subtitle: `ID: ${slug || "N/A"}`,
        media: MenuIcon,
      };
    },
  },
});
