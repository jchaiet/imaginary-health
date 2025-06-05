import { defineType, defineField } from "sanity";
import { InlineElementIcon } from "@sanity/icons";

export const cardType = defineType({
  name: "card",
  type: "object",
  title: "Card",
  icon: InlineElementIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "Product", value: "product" },
          { title: "Segment", value: "segment" },
          { title: "Service", value: "service" },
          { title: "Testimonial", value: "testimonial" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Full Bleed", value: "full-bleed" },
          { title: "Text", value: "text" },
          { title: "Metric", value: "metric" },
          { title: "Image Left", value: "image-left" },
          { title: "Image Right", value: "image-right" },
          { title: "Image Top", value: "image-top" },
          { title: "Image Bottom", value: "image-bottom" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
      hidden: ({ parent }) => parent?.variant !== "grid",
    }),
    defineField({
      name: "metricValue",
      title: "Metric Value",
      type: "string",
      hidden: ({ parent }) => parent?.style !== "metric",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "richText",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "richText",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
    }),
    defineField({
      name: "callToAction",
      title: "Call to Action",
      type: "link",
    }),
    defineField({
      name: "gridArea",
      title: "Grid Area",
      description: "The corresponding grid area name from the parent grid.",
      type: "string",
    }),
  ],
  preview: {
    select: {
      titleBlock: "title",
      media: "image",
    },
    prepare({ titleBlock, media }) {
      let subtitle = "";

      if (Array.isArray(titleBlock)) {
        const block = titleBlock.find((b) => b._type === "block");
        subtitle = block?.children?.map((c: any) => c.text).join(" ");
      }
      return {
        title: "Card",
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
