import { MetadataRoute } from "next";
import { siteDefaults } from "../lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteDefaults.url;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

