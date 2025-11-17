import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sanity client configuration
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "74f8ikg7",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Will be needed for write operations
});

// Extract image info from HTML img tag
function parseImageTag(line) {
  const imgMatch = line.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/i);
  if (!imgMatch) return null;

  const src = imgMatch[1];
  const alt = imgMatch[2] || "";

  // Extract size from style attribute
  let size = "medium";
  let alignment = "center";
  const styleMatch = line.match(/style="[^"]*width:\s*(\d+)%[^"]*"/i);
  if (styleMatch) {
    const widthPercent = parseInt(styleMatch[1]);
    if (widthPercent <= 30) size = "small";
    else if (widthPercent <= 60) size = "medium";
    else if (widthPercent < 100) size = "large";
    else size = "featured";
  }

  return { src, alt, size, alignment };
}

// Convert markdown to Portable Text blocks
async function markdownToPortableText(markdown) {
  const blocks = [];
  const lines = markdown.split("\n");

  let currentParagraph = [];
  let inList = false;
  let listItems = [];
  let blockKeyCounter = 0;

  function addParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        blocks.push({
          _type: "block",
          _key: `block-${blockKeyCounter++}`,
          style: "normal",
          children: [{ _type: "span", text: text }],
          markDefs: [],
        });
      }
      currentParagraph = [];
    }
  }

  function addList() {
    if (listItems.length > 0) {
      listItems.forEach((item) => {
        blocks.push({
          _type: "block",
          _key: `block-${blockKeyCounter++}`,
          style: "normal",
          listItem: "bullet",
          children: [{ _type: "span", text: item }],
          markDefs: [],
        });
      });
      listItems = [];
      inList = false;
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for HTML img tag
    if (trimmed.includes("<img")) {
      addParagraph();
      addList();
      const imgInfo = parseImageTag(trimmed);
      if (imgInfo) {
        // Upload image and create reviewImage block
        const imageAssetId = await uploadImageToSanity(imgInfo.src);
        if (imageAssetId) {
          blocks.push({
            _type: "reviewImage",
            _key: `image-${blockKeyCounter++}`,
            asset: {
              _type: "reference",
              _ref: imageAssetId,
            },
            alt: imgInfo.alt,
            size: imgInfo.size,
            alignment: imgInfo.alignment,
          });
        }
      }
      continue;
    }

    // Headings
    if (trimmed.startsWith("# ")) {
      addParagraph();
      addList();
      blocks.push({
        _type: "block",
        _key: `block-${blockKeyCounter++}`,
        style: "h1",
        children: [{ _type: "span", text: trimmed.substring(2).trim() }],
        markDefs: [],
      });
    } else if (trimmed.startsWith("## ")) {
      addParagraph();
      addList();
      blocks.push({
        _type: "block",
        _key: `block-${blockKeyCounter++}`,
        style: "h2",
        children: [{ _type: "span", text: trimmed.substring(3).trim() }],
        markDefs: [],
      });
    } else if (trimmed.startsWith("### ")) {
      addParagraph();
      addList();
      blocks.push({
        _type: "block",
        _key: `block-${blockKeyCounter++}`,
        style: "h3",
        children: [{ _type: "span", text: trimmed.substring(4).trim() }],
        markDefs: [],
      });
    }
    // List items
    else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      addParagraph();
      listItems.push(trimmed.substring(2).trim());
      inList = true;
    }
    // Bold/italic text (simple handling)
    else if (trimmed.length > 0) {
      if (inList && trimmed.length === 0) {
        addList();
      } else if (!inList) {
        // Remove markdown formatting for now (can be enhanced later)
        const cleanText = trimmed
          .replace(/\*\*(.+?)\*\*/g, "$1") // Bold
          .replace(/\*(.+?)\*/g, "$1"); // Italic
        currentParagraph.push(cleanText);
      }
    } else {
      // Empty line
      addParagraph();
      addList();
    }
  }

  // Add remaining content
  addParagraph();
  addList();

  return blocks;
}

// Upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    const filePath = join(process.cwd(), "public", imagePath);
    const asset = await client.assets.upload("image", createReadStream(filePath), {
      filename: imagePath.split("/").pop(),
    });
    return asset._id;
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

// Migrate reviews
async function migrateReviews() {
  const reviewsDir = join(process.cwd(), "content", "reviews");
  const filenames = readdirSync(reviewsDir).filter((f) => f.endsWith(".md"));

  console.log(`Found ${filenames.length} reviews to migrate`);

  for (const filename of filenames) {
    const filePath = join(reviewsDir, filename);
    const fileContents = readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const slug = filename.replace(/\.md$/, "");

    console.log(`Migrating review: ${data.title} (${slug})`);

    // Convert markdown body to Portable Text
    const body = await markdownToPortableText(content);

    // Upload cover image
    let albumArtAssetId = null;
    if (data.cover) {
      albumArtAssetId = await uploadImageToSanity(data.cover);
    }

    // Create review document
    const reviewDoc = {
      _type: "review",
      title: data.title,
      slug: {
        _type: "slug",
        current: slug,
      },
      reviewType: "Album review", // Default to Album review
      artist: data.artist,
      author: data.author || "Editor", // Default author if not specified
      publishedAt: new Date(data.date).toISOString(),
      albumArt: albumArtAssetId
        ? {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: albumArtAssetId,
            },
            alt: data.alt || "",
          }
        : undefined,
      genreTags: data.tags || [],
      pullQuote: data.pullQuote || "",
      body: body,
      tracklist: (data.tracklist || []).map((title) => ({
        _type: "object",
        title: title,
      })),
      streamingLinks: data.streaming
        ? {
            spotify: data.streaming.spotify,
            appleMusic: data.streaming.apple,
            youtubeMusic: data.streaming.youtubeMusic,
            bandcamp: data.streaming.bandcamp,
          }
        : undefined,
    };

    try {
      const result = await client.create(reviewDoc);
      console.log(`✓ Created review: ${data.title} (ID: ${result._id})`);
    } catch (error) {
      console.error(`✗ Error creating review ${data.title}:`, error.message);
    }
  }
}

// Migrate episodes
async function migrateEpisodes() {
  const episodesDir = join(process.cwd(), "content", "episodes");
  const filenames = readdirSync(episodesDir).filter((f) => f.endsWith(".md"));

  console.log(`Found ${filenames.length} episodes to migrate`);

  for (const filename of filenames) {
    const filePath = join(episodesDir, filename);
    const fileContents = readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const slug = filename.replace(/\.md$/, "");

    console.log(`Migrating episode: ${data.title} (${slug})`);

    // Convert markdown body to Portable Text
    const aboutTheArtist = await markdownToPortableText(content || data.notes || "");

    // Upload cover image
    let coverAssetId = null;
    if (data.cover) {
      coverAssetId = await uploadImageToSanity(data.cover);
    }

    // Convert YouTube ID to URL if needed
    let youtubeUrl = data.youtubeId;
    if (youtubeUrl && !youtubeUrl.startsWith("http")) {
      youtubeUrl = `https://www.youtube.com/watch?v=${data.youtubeId}`;
    }

    // Create episode document
    const episodeDoc = {
      _type: "podcastEpisode",
      title: data.title,
      slug: {
        _type: "slug",
        current: slug,
      },
      publishedAt: new Date(data.date).toISOString(),
      guest: data.guest,
      pullQuote: data.pullQuote || "",
      cover: coverAssetId
        ? {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: coverAssetId,
            },
            alt: data.alt || "",
          }
        : undefined,
      youtubeUrl: youtubeUrl,
      aboutTheArtist: aboutTheArtist,
    };

    try {
      const result = await client.create(episodeDoc);
      console.log(`✓ Created episode: ${data.title} (ID: ${result._id})`);
    } catch (error) {
      console.error(`✗ Error creating episode ${data.title}:`, error.message);
    }
  }
}

// Main migration function
async function migrate() {
  console.log("Starting migration to Sanity...\n");

  if (!process.env.SANITY_API_TOKEN) {
    console.error(
      "ERROR: SANITY_API_TOKEN environment variable is required for write operations."
    );
    console.log(
      "Please set it by running: export SANITY_API_TOKEN=your-token-here"
    );
    process.exit(1);
  }

  try {
    await migrateReviews();
    console.log("\n");
    await migrateEpisodes();
    console.log("\n✓ Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();

