#!/usr/bin/env node

import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Read all content slugs
function getAllContentSlugs() {
  const reviewsDir = join(projectRoot, "content", "reviews");
  const episodesDir = join(projectRoot, "content", "episodes");

  const reviewSlugs = readdirSync(reviewsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));

  const episodeSlugs = readdirSync(episodesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));

  return {
    reviews: new Set(reviewSlugs),
    episodes: new Set(episodeSlugs),
    static: new Set(["/", "/mission", "/reviews", "/podcast", "/contact"]),
  };
}

// Find all href patterns in the codebase
function findInternalLinks() {
  const slugs = getAllContentSlugs();
  const brokenLinks = [];

  // Simple grep for href patterns
  const patterns = [
    { pattern: /href=["']\/reviews\/([^"']+)["']/g, type: "reviews" },
    { pattern: /href=["']\/podcast\/([^"']+)["']/g, type: "episodes" },
  ];

  function walkDir(dir) {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        // Skip node_modules and .next
        if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
          walkDir(fullPath);
        }
      } else if (
        entry.isFile() &&
        (entry.name.endsWith(".tsx") ||
          entry.name.endsWith(".ts") ||
          entry.name.endsWith(".jsx") ||
          entry.name.endsWith(".js") ||
          entry.name.endsWith(".md"))
      ) {
        try {
          const content = readFileSync(fullPath, "utf8");
          for (const { pattern, type } of patterns) {
            let match;
            while ((match = pattern.exec(content)) !== null) {
              const slug = match[1];
              if (type === "reviews" && !slugs.reviews.has(slug)) {
                brokenLinks.push({
                  file: fullPath.replace(projectRoot, ""),
                  type: "review",
                  slug,
                });
              } else if (type === "episodes" && !slugs.episodes.has(slug)) {
                brokenLinks.push({
                  file: fullPath.replace(projectRoot, ""),
                  type: "episode",
                  slug,
                });
              }
            }
          }
        } catch {
          // Skip binary files or unreadable files
        }
      }
    }
  }

  walkDir(join(projectRoot, "app"));
  walkDir(join(projectRoot, "components"));

  return brokenLinks;
}

// Main
const brokenLinks = findInternalLinks();

if (brokenLinks.length === 0) {
  console.log("✓ All internal links are valid!");
} else {
  console.log(`✗ Found ${brokenLinks.length} broken internal link(s):\n`);
  for (const link of brokenLinks) {
    console.log(`  ${link.file}: ${link.type} slug "${link.slug}" not found`);
  }
  process.exit(1);
}

