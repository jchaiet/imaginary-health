import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { paddingOptionType } from "../styles/paddingOptionType";
import { layoutOptionType } from "../styles/layoutOptionType";
import { backgroundOptionType } from "../styles/backgroundOptionType";

export const contentBlockType = defineType({
  name: "contentBlock",
  title: "Content Block",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "layout",
      title: "Layout",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "orientation",
          title: "Orientation",
          type: "string",
          options: {
            list: [
              { title: "No Image", value: "no-image" },
              { title: "Vertical (Image Top)", value: "vertical-image-top" },
              {
                title: "Vertical (Image Bottom)",
                value: "vertical-image-bottom",
              },
              {
                title: "Horizontal (Image Right)",
                value: "horizontal-image-right",
              },
              {
                title: "Horizontal (Image Left)",
                value: "horizontal-image-left",
              },
            ],
            layout: "radio",
          },
          initialValue: "no-image",
        }),
        defineField({
          name: "gap",
          title: "Custom Gap",
          type: "string",
          description:
            "Gap between image and content (e.g. '1rem'). Default for vertical is 1rem, default for Horizonal is 5rem",
        }),
      ],
    }),
    defineField({
      name: "heading",
      type: "heading",
      title: "Heading",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "display",
          title: "Display Style",
          type: "string",
          options: {
            list: [
              { title: "Default", value: "default" },
              { title: "Max Width", value: "max-width" },
              { title: "Full Bleed", value: "full-bleed" },
            ],
            layout: "radio",
          },
          initialValue: "default",
        }),
        defineField({
          name: "maxWidth",
          title: "Max Width",
          type: "string",
          hidden: ({ parent }) => parent?.display !== "max-width",
        }),
      ],
      hidden: ({ parent }) => parent?.layout?.orientation === "no-image",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "string",
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          name: "metricItem",
          type: "object",
          fields: [
            defineField({
              name: "metricDescription",
              title: "Description",
              type: "richText",
            }),
            defineField({
              name: "metricValue",
              title: "Metric Value",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "callToAction",
      type: "callToAction",
      title: "Call To Action",
    }),
    defineField({
      name: "disclaimer",
      title: "Disclaimer",
      type: "richText",
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
      media: "image",
    },
    prepare({ titleBlock, media }) {
      let subtitle = "";

      if (Array.isArray(titleBlock)) {
        const block = titleBlock.find((b) => b._type === "block");
        subtitle = block?.children?.map((c: any) => c.text).join(" ");
      }
      return {
        title: "Content Block",
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
