import { defineType, defineField } from "sanity";
import { ThLargeIcon } from "@sanity/icons";

export const cardGridType = defineType({
  name: "cardGrid",
  type: "object",
  title: "Card Grid",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "titleOptions",
      type: "object",
      title: "Title",
      fields: [
        defineField({ name: "title", type: "richText", title: "Title Text" }),
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
        { name: "xs", title: "XS", type: "number" },
        { name: "sm", title: "SM (480px)", type: "number" },
        { name: "md", title: "MD (768px)", type: "number" },
        { name: "lg", title: "LG (1024px)", type: "number" },
        { name: "xl", title: "XL (1280px)", type: "number" },
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
      description: "Auto-fit cards with min size",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        { type: "productCard" },
        { type: "serviceCard" },
        { type: "customCard" },
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
