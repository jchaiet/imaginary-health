import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const heroType = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Full screen", value: "fullscreen" },
          { title: "Split layout", value: "split" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "richText",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "richText",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "callToAction",
      title: "Call to Action",
      type: "array",
      of: [{ type: "link" }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "alignment",
      title: "Text Alignment",
      type: "string",
      options: {
        list: ["left", "center", "right"],
        layout: "radio",
      },
      initialValue: "center",
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
