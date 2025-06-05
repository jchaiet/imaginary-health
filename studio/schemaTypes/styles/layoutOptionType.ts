import { defineField } from "sanity";

export const layoutOptionType = [
  defineField({
    name: "layout",
    title: "Layout Options",
    type: "string",
    group: "layout",
    options: {
      layout: "radio",
      list: [
        {
          title: "Default",
          value: "default",
        },
        {
          title: "Centered Layout",
          value: "centered",
        },
        {
          title: "Split Layout",
          value: "split",
        },
      ],
    },
  }),
];
