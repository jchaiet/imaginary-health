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
      type: "heading",
      title: "Heading",
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
