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
  IceCreamIcon,
  LeaveIcon,
  SunIcon,
  TagsIcon,
} from "@sanity/icons";
import parentChild from "./lib/parentChild";
import { client } from "./lib/client";

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
  structure: async (S: StructureBuilder, context: StructureResolverContext) => {
    const sites = (await client.fetch('*[_type == "site"]')) as {
      _id: string;
      title: string;
    }[];

    const locales = [
      { id: "en-us", title: "English (US)" },
      { id: "es-us", title: "Spanish (US)" },
    ];

    return S.list()
      .title("Content")
      .id("content")
      .items([
        S.listItem()
          .title("Sites")
          .icon(ControlsIcon)
          .child(S.documentTypeList("site").title("Sites")),
        // S.listItem()
        //   .title("Site Settings")
        //   .icon(ControlsIcon)
        //   .child(
        //     S.document().schemaType("siteSettings").documentId("siteSettings")
        //   ),

        S.divider(),

        S.listItem()
          .title("Pages by Site")
          .child(
            S.list()
              .title("Pages by Site")
              .items(
                sites.map((site) =>
                  S.listItem()
                    .title(site.title)
                    .id(`site-pages-${site._id}`)
                    .child(
                      S.list()
                        .title(`${site.title} Pages`)
                        .id(`pages-by-site-${site._id}`)
                        .items(
                          locales.map((locale) => {
                            const filter =
                              locale.id === "en-us"
                                ? `(locale == "${locale.id}" || !defined(locale))`
                                : `locale == "${locale.id}"`;

                            return parentChild(
                              "page",
                              `Pages (${locale.title})`,
                              DocumentsIcon,
                              S,
                              context.documentStore,
                              filter,
                              site._id
                            ).id(`pages-${site._id}-${locale.id}`);
                          })
                        )
                    )
                )
              )
          ),
        // S.listItem()
        //   .title("Pages by Locale")
        //   .child(
        //     S.list()
        //       .title("Pages by Locale")
        //       .items(
        //         locales.map((locale) => {
        //           const filter =
        //             locale.id === "en-us"
        //               ? `locale == "${locale.id}" || !defined(locale)`
        //               : `locale == "${locale.id}"`;

        //           return parentChild(
        //             "page",
        //             `Pages (${locale.title})`,
        //             DocumentsIcon,
        //             S,
        //             context.documentStore,
        //             filter
        //           ).id(`pages-${locale.id}`);
        //         })
        //       )
        //   ),
        S.listItem()
          .title("Articles by Site")
          .child(
            S.list()
              .title("Articles by Site")
              .items(
                sites.map((site) =>
                  S.listItem()
                    .title(site.title)
                    .id(`site-articles-${site._id}`)
                    .child(
                      S.list()
                        .title(`${site.title} Articles`)
                        .id(`articles-by-site-${site._id}`)
                        .items(
                          locales.map((locale) => {
                            const filter =
                              locale.id === "en-us"
                                ? `(locale == "${locale.id}" || !defined(locale))`
                                : `locale == "${locale.id}"`;

                            return parentChild(
                              "blog",
                              `Articles (${locale.title})`,
                              DocumentsIcon,
                              S,
                              context.documentStore,
                              filter,
                              site._id
                            ).id(`articles-${site._id}-${locale.id}`);
                          })
                        )
                    )
                )
              )
          ),
        // S.listItem()
        //   .title("Articles by Locale")
        //   .child(
        //     S.list()
        //       .title("Articles by Locale")
        //       .items(
        //         locales.map((locale) => {
        //           const filter =
        //             locale.id === "en-us"
        //               ? `locale == "${locale.id}" || !defined(locale)`
        //               : `locale == "${locale.id}"`;

        //           return parentChild(
        //             "blog",
        //             `Articles (${locale.title})`,
        //             ComposeSparklesIcon,
        //             S,
        //             context.documentStore,
        //             filter
        //           ).id(`pages-${locale.id}`);
        //         })
        //       )
        //   ),

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
