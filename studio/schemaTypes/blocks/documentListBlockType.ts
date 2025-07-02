import { defineType, defineField } from "sanity";
import { ThLargeIcon } from "@sanity/icons";
import { layoutOptionType } from "../styles/layoutOptionType";
import { paddingOptionType } from "../styles/paddingOptionType";
import { backgroundOptionType } from "../styles/backgroundOptionType";

export const documentBlockType = defineType({
  name: "documentListBlock",
  type: "object",
  title: "Document List Block",
  icon: ThLargeIcon,
  groups: [
    { name: "heading", title: "Heading" },
    { name: "settings", title: "Settings" },
    { name: "social", title: "Social Media" },
  ],
  fields: [
    defineField({
      name: "heading",
      type: "heading",
      title: "Heading",
      group: "heading",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      group: "settings",
      type: "string",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "List", value: "list" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "limit",
      title: "Maximum number of articles",
      group: "settings",
      type: "number",
      description: "Optional: Limit the number of articles shown",
    }),
    defineField({
      name: "filterByCategory",
      title: "Filter by category",
      group: "settings",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "styleOptions",
      title: "Style Options",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      groups: [
        { name: "padding", title: "Padding" },
        { name: "layout", title: "Layout" },
        { name: "background", title: "Background" },
      ],
      fields: [
        ...paddingOptionType,
        ...layoutOptionType,
        ...backgroundOptionType,
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Blog List Block",
      };
    },
  },
});
