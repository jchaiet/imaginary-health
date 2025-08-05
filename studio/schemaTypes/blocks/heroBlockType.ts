import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { paddingOptionType } from "../styles/paddingOptionType";
import { backgroundOptionType } from "../styles/backgroundOptionType";
import { layoutOptionType } from "../styles/layoutOptionType";
import { SyncedImageInput } from "../../components/SyncedImageInput";

export const heroBlockType = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  icon: ImageIcon,
  fields: [
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
      components: {
        input: SyncedImageInput,
      },
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "string",
    }),
    defineField({
      name: "callToAction",
      title: "Call to Action",
      type: "object",
      fields: [
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [{ type: "link" }],
          validation: (Rule) => Rule.max(3),
        }),
        defineField({
          name: "alignment",
          title: "Alignment",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Center", value: "center" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
          initialValue: "left",
        }),
      ],
    }),
    defineField({
      name: "styleOptions",
      title: "Style Options",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      groups: [
        { name: "layout", title: "Layout" },
        { name: "padding", title: "Padding" },
        { name: "background", title: "Background" },
      ],
      fields: [
        ...layoutOptionType,
        ...paddingOptionType,
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
        title: "Hero",
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
