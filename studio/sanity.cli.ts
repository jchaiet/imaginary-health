import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  studioHost: "imaginary",
  api: {
    projectId: "m4mnm2dh",
    dataset: "production",
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: false,
});
