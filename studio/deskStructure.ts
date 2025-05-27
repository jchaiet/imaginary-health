import {
  StructureBuilder,
  StructureResolverContext,
  structureTool,
  DefaultDocumentNodeResolver,
} from "sanity/structure";
import parentChild from "./lib/parentChild";

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S: StructureBuilder,
  context
) => {
  if (context.schemaType === "page") {
    return S.document().views([S.view.form()]);
  }

  return S.document();
};

export const deskContent = structureTool({
  name: "content",
  title: "Content",
  defaultDocumentNode,
  structure: (S: StructureBuilder, context: StructureResolverContext) => {
    return S.list()
      .title("Website")
      .id("website-id")
      .items([parentChild("page", S, context.documentStore)]);
  },
});
