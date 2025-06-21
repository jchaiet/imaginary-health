import { defineType, defineField } from "sanity";

export const headingType = defineType({
  name: "heading",
  type: "object",
  title: "Heading",
  options: {
    collapsible: true,
    collapsed: true,
  },
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
  ],
});
