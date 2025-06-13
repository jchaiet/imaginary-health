import { defineArrayMember, defineField } from "sanity";
import {
  CodeBlockIcon,
  CodeIcon,
  ColorWheelIcon,
  ComposeIcon,
  ImageIcon,
  LinkIcon,
} from "@sanity/icons";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const AlignLeftIcon = (
  <span
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <AlignLeft size={21} />
  </span>
);

const AlignCenterIcon = (
  <span
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <AlignCenter size={21} />
  </span>
);

const AlignRightIcon = (
  <span
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <AlignRight size={21} />
  </span>
);

export const richTextType = defineField({
  name: "richText",
  title: "Rich Text",
  icon: ComposeIcon,
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 1", value: "h1" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Heading 5", value: "h5" },
        { title: "Heading 6", value: "h6" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          {
            title: "left",
            value: "left",
            icon: AlignLeftIcon,
          },
          {
            title: "center",
            value: "center",
            icon: AlignCenterIcon,
          },
          {
            title: "right",
            value: "right",
            icon: AlignRightIcon,
          },
          {
            title: "Inline Code",
            value: "inlineCode",
            icon: CodeBlockIcon,
          },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            icon: LinkIcon,
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
              }),
              defineField({
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: false,
              }),
            ],
          },
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
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
    }),
    defineArrayMember({
      type: "code",
      icon: CodeIcon,
      options: {
        theme: "github",
        language: "javascript",
        withFilename: true,
      },
    }),
  ],
});
