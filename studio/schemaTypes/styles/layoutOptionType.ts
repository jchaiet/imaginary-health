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
          title: "Blog",
          value: "blog",
        },
        {
          title: "Centered Layout",
          value: "centered",
        },
        {
          title: "Full Bleed",
          value: "full-bleed",
        },
        {
          title: "Split 50/50",
          value: "split",
        },
        {
          title: "Split 35/65",
          value: "split-35-65",
        },
      ],
    },
  }),
];
