import { defineType, defineField } from "sanity";
import { InlineElementIcon } from "@sanity/icons";

export const customCardType = defineType({
  name: "customCard",
  type: "object",
  title: "Custom Card",
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
    defineField({
      name: "callToAction",
      title: "Call to Action",
      type: "link",
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
        title: "Custom Card",
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
