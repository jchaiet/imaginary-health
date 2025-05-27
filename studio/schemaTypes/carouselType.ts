import { defineType, defineField } from "sanity";
import { ThLargeIcon } from "@sanity/icons";

export const carouselType = defineType({
  name: "carousel",
  type: "object",
  title: "Carousel",
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
      name: "gap",
      title: "Gap",
      type: "string",
      description: "Gap between grid items (e.g. '1rem')",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        { type: "segmentCard" },
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
        title: "Carousel",
        subtitle: subtitle,
      };
    },
  },
});
