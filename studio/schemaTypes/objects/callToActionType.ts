import { defineType, defineField } from "sanity";

export const callToActionType = defineType({
  name: "callToAction",
  type: "object",
  title: "Call To Action",
  options: {
    collapsible: true,
    collapsed: false,
  },
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
});
