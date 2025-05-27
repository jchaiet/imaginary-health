import { defineType, defineField } from "sanity";

export const linkType = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "type",
      title: "Action Type",
      type: "string",
      options: {
        list: [
          { title: "Link", value: "link" },
          { title: "Open Modal", value: "modal" },
          { title: "Play Video", value: "video" },
          { title: "Download Asset", value: "download" },
        ],
        layout: "radio",
      },
      initialValue: "link",
    },
    {
      name: "label",
      title: "Label",
      type: "string",
    },
    defineField({
      name: "linkOptions",
      title: "Link Options",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "link",
      fields: [
        {
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
        },
        {
          name: "internalUrl",
          title: "Internal Page",
          type: "reference",
          to: [{ type: "page" }],
          hidden: ({ parent }) => parent?.linkType !== "internal",
        },
        {
          name: "externalUrl",
          title: "External URL",
          type: "url",
          hidden: ({ parent }) => parent?.linkType !== "external",
        },
      ],
    }),
    {
      name: "modalContent",
      title: "Modal Content",
      type: "text",
      hidden: ({ parent }) => parent?.type !== "modal",
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "video",
    },
    {
      name: "assetUrl",
      title: "Asset URL",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "download",
    },
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "linkType",
    },
  },
});
