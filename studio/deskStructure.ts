import {
  StructureBuilder,
  StructureResolverContext,
  structureTool,
  DefaultDocumentNodeResolver,
} from "sanity/structure";
import {
  ComposeSparklesIcon,
  ControlsIcon,
  DocumentsIcon,
  LeaveIcon,
  SunIcon,
  TagsIcon,
} from "@sanity/icons";
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
      .items([
        S.listItem()
          .title("Site Settings")
          .icon(ControlsIcon)
          .child(
            S.document().schemaType("siteSettings").documentId("siteSettings")
          ),

        S.divider(),

        parentChild("page", "Pages", DocumentsIcon, S, context.documentStore),
        parentChild(
          "blog",
          "Articles",
          ComposeSparklesIcon,
          S,
          context.documentStore
        ),

        S.divider(),

        S.documentTypeListItem("navigation").title("Navigation"),

        parentChild(
          "category",
          "Categories",
          TagsIcon,
          S,
          context.documentStore
        ),

        parentChild(
          "singleton",
          "Singletons",
          SunIcon,
          S,
          context.documentStore
        ),

        S.documentTypeListItem("redirect").title("Redirects").icon(LeaveIcon),
      ]);
  },
});
