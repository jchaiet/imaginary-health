import { defineField } from "sanity";
import { ColorWheelIcon, ComposeIcon } from "@sanity/icons";

export const richTextType = defineField({
  name: "richText",
  title: "Rich Text",
  icon: ComposeIcon,
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 1", value: "h1" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Heading 5", value: "h5" },
        { title: "Heading 6", value: "h6" },
      ],
      lists: [],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "coloredText",
            title: "Colored Text",
            icon: ColorWheelIcon,
            type: "object",
            fields: [
              defineField({
                name: "colorClass",
                title: "Color Style",
                type: "string",
                options: {
                  list: [
                    { title: "Primary", value: "textPrimary" },
                    { title: "Secondary", value: "textSecondary" },
                  ],
                },
                initialValue: "textPrimary",
              }),
            ],
          },
        ],
      },
    },
  ],
});
