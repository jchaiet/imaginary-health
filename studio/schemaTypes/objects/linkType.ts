import { defineType, defineField } from "sanity";

export const linkType = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Action Type",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Link", value: "link" },
          { title: "Open Modal", value: "modal" },
          { title: "Play Video", value: "video" },
          { title: "Download Asset", value: "download" },
        ],
        layout: "radio",
      },
      initialValue: "none",
    }),
    defineField({
      name: "displayType",
      title: "Display Type",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "text",
      hidden: ({ parent }) => parent?.type === "none",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) =>
        parent?.type === "none" || parent?.displayType !== "image",
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Primary Inverted", value: "primaryInverted" },
          { title: "Secondary", value: "secondary" },
          { title: "Secondary Inverted", value: "secondaryInverted" },
          { title: "Link", value: "link" },
          { title: "Link Inverted", value: "linkInverted" },
          { title: "Underline", value: "underline" },
          { title: "Underline Inverted", value: "underlineInverted" },
          { title: "Blurred", value: "blurred" },
          { title: "Blurred Inverted", value: "blurredInverted" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
      hidden: ({ parent }) =>
        parent?.type === "none" || parent?.displayType === "image",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      hidden: ({ parent }) => parent?.type === "none",
    }),
    defineField({
      name: "ariaLabel",
      title: "ARIA Label",
      type: "string",
      hidden: ({ parent }) => parent?.type === "none",
    }),
    defineField({
      name: "linkOptions",
      title: "Link Options",
      type: "object",
      hidden: ({ parent }) =>
        parent?.type !== "link" || parent?.type === "none",
      fields: [
        defineField({
          name: "linkType",
          title: "Link Type",
          type: "string",
          options: {
            list: [
              { title: "Internal Page", value: "internal" },
              { title: "External Page", value: "external" },
            ],
            layout: "radio",
          },
          initialValue: "internal",
        }),
        defineField({
          name: "internalUrl",
          title: "Internal Page",
          type: "reference",
          to: [{ type: "page" }],
          hidden: ({ parent }) => parent?.linkType !== "internal",
        }),
        defineField({
          name: "externalUrl",
          title: "External URL",
          type: "url",
          hidden: ({ parent }) => parent?.linkType !== "external",
        }),
      ],
    }),
    defineField({
      name: "modalContent",
      title: "Modal Content",
      type: "text",
      hidden: ({ parent }) => parent?.type !== "modal",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({
      name: "assetUrl",
      title: "Asset URL",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "download",
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "linkType",
    },
  },
});
