import { defineType, defineField } from "sanity";
import { TextIcon } from "@sanity/icons";
import { paddingOptionType } from "../styles/paddingOptionType";
import { layoutOptionType } from "../styles/layoutOptionType";
import { backgroundOptionType } from "../styles/backgroundOptionType";

export const richTextBlockType = defineType({
  name: "richTextBlock",
  title: "RichText Block",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({
      name: "text",
      title: "Text",
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
    prepare() {
      return {
        title: "RichText Block",
      };
    },
  },
});
