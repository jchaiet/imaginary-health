import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "m4mnm2dh",
    dataset: "production",
  },
  project: {
    basePath: "/studio",
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: false,
});
