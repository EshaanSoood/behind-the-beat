import { createClient } from "@sanity/client";

// Use defaults for build time if env vars are not set
// These will be overridden by actual env vars at runtime
const projectId = process.env.SANITY_PROJECT_ID || "74f8ikg7";
const dataset = process.env.SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION || "2024-10-01",
  useCdn: true,
  perspective: "published",
});

