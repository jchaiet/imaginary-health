import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "m4mnm2dh",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
