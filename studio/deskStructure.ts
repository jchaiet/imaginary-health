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

const locales = [
  { id: "en-us", title: "English (US)" },
  { id: "es-us", title: "Spanish (US)" },
];

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

        S.listItem()
          .title("Pages by Locale")
          .child(
            S.list()
              .title("Pages by Locale")
              .items(
                locales.map((locale) => {
                  const filter =
                    locale.id === "en-us"
                      ? `locale == "${locale.id}" || !defined(locale)`
                      : `locale == "${locale.id}"`;

                  return parentChild(
                    "page",
                    `Pages (${locale.title})`,
                    DocumentsIcon,
                    S,
                    context.documentStore,
                    filter
                  ).id(`pages-${locale.id}`);
                })
              )
          ),
        S.listItem()
          .title("Articles by Locale")
          .child(
            S.list()
              .title("Articles by Locale")
              .items(
                locales.map((locale) => {
                  const filter =
                    locale.id === "en-us"
                      ? `locale == "${locale.id}" || !defined(locale)`
                      : `locale == "${locale.id}"`;

                  return parentChild(
                    "blog",
                    `Articles (${locale.title})`,
                    ComposeSparklesIcon,
                    S,
                    context.documentStore,
                    filter
                  ).id(`pages-${locale.id}`);
                })
              )
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
