import {
  defineConfig,
  DocumentActionComponent,
  DocumentActionsContext,
  Template,
} from "sanity";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { presentationTool } from "sanity/presentation";

import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemaTypes";
import { deskContent } from "./deskStructure";
import { slugPrefixTpl } from "./lib/slugPrefixTemplate";
import { SetSlugAndPublishAction } from "./lib/setSlugAndPublishAction";
import { customStudioStyles } from "./plugins/customStudioStyles";

export default defineConfig({
  name: "default",
  title: "Imaginary Health",

  projectId: "m4mnm2dh",
  dataset: "production",

  plugins: [
    codeInput(),
    deskContent,
    visionTool(),
    media(),
    customStudioStyles(),
    presentationTool({
      previewUrl: {
        origin:
          process.env.SANITY_STUDIO_PREVIEW_ORIGIN || "http://localhost:300",
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],
  actions: (
    prev: DocumentActionComponent[],
    context: DocumentActionsContext
  ) => {
    switch (context.schemaType) {
      case "blog":
      case "category":
      case "page":
        return [SetSlugAndPublishAction, ...prev];
      default:
        return prev;
    }
  },
  schema: {
    types: schemaTypes,
    templates: (prev: Template<any, any>[]) => {
      return [
        ...prev,
        slugPrefixTpl("page"),
        slugPrefixTpl("blog"),
        slugPrefixTpl("category"),
      ];
    },
  },
});
