import { createClient } from "@sanity/client";

if (!process.env.SANITY_PROJECT_ID) {
  throw new Error("Missing SANITY_PROJECT_ID environment variable");
}

if (!process.env.SANITY_DATASET) {
  throw new Error("Missing SANITY_DATASET environment variable");
}

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || "2024-10-01",
  useCdn: true,
  perspective: "published",
});

