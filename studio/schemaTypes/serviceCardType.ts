import { defineType, defineField } from "sanity";
import { InlineElementIcon } from "@sanity/icons";

export const serviceCardType = defineType({
  name: "serviceCard",
  type: "object",
  title: "Service Card",
  icon: InlineElementIcon,
  fields: [
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
        title: "Service Card",
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
