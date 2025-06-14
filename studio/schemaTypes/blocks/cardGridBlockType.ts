import { defineType, defineField } from "sanity";
import { ThLargeIcon } from "@sanity/icons";
import { layoutOptionType } from "../styles/layoutOptionType";
import { paddingOptionType } from "../styles/paddingOptionType";
import { backgroundOptionType } from "../styles/backgroundOptionType";

export const cardGridBlockType = defineType({
  name: "cardGridBlock",
  type: "object",
  title: "Card Grid",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "heading",
      type: "object",
      title: "Heading",
      fields: [
        defineField({ name: "title", type: "richText", title: "Title" }),
        defineField({
          name: "description",
          type: "richText",
          title: "Description",
        }),
        defineField({
          name: "animateText",
          type: "boolean",
          title: "Animate text?",
        }),
      ],
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "object",
      fields: [
        { name: "xs", title: "XS", type: "string" },
        { name: "sm", title: "SM (480px)", type: "string" },
        { name: "md", title: "MD (768px)", type: "string" },
        { name: "lg", title: "LG (1024px)", type: "string" },
        { name: "xl", title: "XL (1280px)", type: "string" },
      ],
      description: "Set the number of columns per breakpoint",
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "gap",
      title: "Gap",
      type: "string",
      description: "Gap between grid items (e.g. '1rem')",
    }),
    defineField({
      name: "autoFitMinMax",
      title: "AutoFit MinMax",
      type: "string",
      description: "Auto-fit items with min size",
    }),
    defineField({
      name: "areas",
      title: "Grid Areas",
      type: "array",
      description:
        "Define named grid areas. Each row is an array of area names, e.g. ['header header', 'sidebar main]",
      of: [
        {
          type: "string",
          description:
            "Enter a space-separated list of area names for one row, e.g. 'sidebar main main'",
        },
      ],
      options: {
        layout: "list",
      },
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "card" }],
    }),
    defineField({
      name: "className",
      type: "string",
      title: "Custom Grid className",
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
      titleBlock: "title",
    },
    prepare({ titleBlock }) {
      let subtitle = "";

      if (Array.isArray(titleBlock)) {
        const block = titleBlock.find((b) => b._type === "block");
        subtitle = block?.children?.map((c: any) => c.text).join(" ");
      }
      return {
        title: "Card Grid",
        subtitle: subtitle,
      };
    },
  },
});
