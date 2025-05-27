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
  ],
});
