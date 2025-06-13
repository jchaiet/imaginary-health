import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { paddingOptionType } from "../styles/paddingOptionType";
import { backgroundOptionType } from "../styles/backgroundOptionType";

export const stickyScrollBlockType = defineType({
  name: "stickyScrollBlock",
  title: "Sticky Scroll Block",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "heading",
      type: "object",
      title: "Heading",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "richText",
        }),
        defineField({ name: "title", type: "richText", title: "Title" }),
        defineField({
          name: "description",
          type: "richText",
          title: "Description",
        }),
        defineField({
          name: "disclaimer",
          title: "Disclaimer",
          type: "richText",
        }),
        defineField({
          name: "animateText",
          type: "boolean",
          title: "Animate text?",
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
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          name: "stickyScrollSection",
          type: "object",
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
          ],
        },
      ],
    }),
    defineField({
      name: "showNumbers",
      type: "boolean",
      title: "Show item numbers",
    }),
    defineField({
      name: "styleOptions",
      title: "Style Options",
      type: "object",
      groups: [
        { name: "padding", title: "Padding" },
        { name: "background", title: "Background" },
      ],
      fields: [...paddingOptionType, ...backgroundOptionType],
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
        title: "Sticky Scroll Block",
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
