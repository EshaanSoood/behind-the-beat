import { createClient } from "@sanity/client";

// Helper to clean and validate environment variables
function cleanEnvVar(value: string | undefined, defaultValue: string): string {
  if (!value) return defaultValue;
  // Remove any whitespace, newlines, and quotes that might have been included
  const cleaned = value.trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "").trim();
  return cleaned || defaultValue;
}

// Use defaults for build time if env vars are not set
// These will be overridden by actual env vars at runtime
const projectId = cleanEnvVar(process.env.SANITY_PROJECT_ID, "74f8ikg7");
const dataset = cleanEnvVar(process.env.SANITY_DATASET, "production");
const apiVersion = cleanEnvVar(process.env.SANITY_API_VERSION, "2024-10-01");

// Default client with CDN enabled for better performance
// CDN cache is typically cleared within seconds of content updates
// Combined with Next.js revalidation (60s), this provides a good balance
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

// Non-CDN client for when immediate fresh data is needed
// Use this sparingly, as it bypasses CDN caching
export const clientNoCdn = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});

