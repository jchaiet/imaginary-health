import { defineType, defineField } from "sanity";
import { InlineIcon } from "@sanity/icons";
import { paddingOptionType } from "../styles/paddingOptionType";
import { layoutOptionType } from "../styles/layoutOptionType";
import { backgroundOptionType } from "../styles/backgroundOptionType";

export const faqBlockType = defineType({
  name: "faqBlock",
  title: "FAQ Block",
  type: "object",
  icon: InlineIcon,
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
          name: "headingLayout",
          title: "Heading Layout",
          type: "string",
          options: {
            list: [
              { title: "Vertical", value: "vertical" },
              {
                title: "Horizontal",
                value: "horizontal",
              },
            ],
            layout: "radio",
          },
          initialValue: "vertical",
        }),
      ],
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          name: "faqItem",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "richText",
            }),
          ],
          preview: {
            select: {
              title: "question",
            },
          },
        },
      ],
    }),
    defineField({
      name: "styleOptions",
      title: "Style Options",
      type: "object",
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
      titleBlock: "heading",
      media: "image",
    },
    prepare({ titleBlock, media }) {
      let subtitle = "";

      if (Array.isArray(titleBlock)) {
        const block = titleBlock.find((b) => b._type === "block");
        subtitle = block?.children?.map((c: any) => c.text).join(" ");
      }
      return {
        title: "FAQ Block",
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
