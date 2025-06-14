import { defineType, defineField } from "sanity";
import { InlineElementIcon } from "@sanity/icons";
import { layoutOptionType } from "../styles/layoutOptionType";
import { paddingOptionType } from "../styles/paddingOptionType";
import { backgroundOptionType } from "../styles/backgroundOptionType";

export const carouselBlockType = defineType({
  name: "carouselBlock",
  type: "object",
  title: "Carousel",
  icon: InlineElementIcon,
  fields: [
    defineField({
      name: "heading",
      type: "object",
      title: "Heading",
      fields: [
        defineField({ name: "title", type: "richText", title: "Title" }),
        defineField({
          name: "animateText",
          type: "boolean",
          title: "Animate text?",
        }),
      ],
    }),
    defineField({
      name: "description",
      type: "richText",
      title: "Description",
    }),
    defineField({
      name: "carouselOptions",
      type: "object",
      title: "Carousel Options",
      fields: [
        defineField({
          name: "itemsPerPage",
          title: "Items per Page",
          type: "number",
        }),
        defineField({
          name: "itemsPerRow",
          title: "Items per Row",
          type: "number",
        }),
        defineField({
          name: "autoplay",
          title: "Autoplay",
          type: "boolean",
          description: "Carousel will autoplay.",
        }),
        defineField({
          name: "autoplayInterval",
          title: "Autoplay Interval",
          type: "number",
          description: "Time in seconds before carousel moves to next item.",
        }),
      ],
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "card" }],
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
        title: "Carousel",
        subtitle: subtitle,
      };
    },
  },
});
