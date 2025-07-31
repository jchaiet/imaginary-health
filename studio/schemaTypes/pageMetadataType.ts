import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

export const pageMetadataType = defineType({
  name: "pageMetadata",
  title: "Page Metadata",
  icon: DocumentsIcon,
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      description: "Appears in the browser tab and search results",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Appears in the search results",
      type: "string",
      validation: (rule) => rule.max(155),
    }),
    defineField({
      name: "robots",
      title: "Robots Settings",
      type: "string",
      options: {
        list: [
          { title: "Index, Follow (Default)", value: "index, follow" },
          { title: "No Index, Follow", value: "noindex, follow" },
          { title: "Index, No Follow", value: "index, nofollow" },
          { title: "No Index, No Follow", value: "noindex, nofollow" },
        ],
        layout: "radio",
      },
      initialValue: "index, follow",
    }),
  ],
});
