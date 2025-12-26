import type { PortableTextBlock } from "@portabletext/types";

export type Review = {
  slug: string;
  title: string;
  artist: string;
  author: string;
  reviewType: "Album review" | "Live review";
  date: string;
  pullQuote: string;
  cover: string;
  alt: string;
  summary: string;
  tracklist: string[];
  streaming?: {
    spotify?: string;
    apple?: string;
    appleMusic?: string;
    youtubeMusic?: string;
    bandcamp?: string;
  };
  tags?: string[];
  genreTags?: string[];
  ogImage?: string;
  body: PortableTextBlock[];
  artistLinks?: {
    instagram?: string;
    youtube?: string;
    website?: string;
  };
};

export type Episode = {
  slug: string;
  title: string;
  guest: string;
  date: string;
  pullQuote: string;
  cover: string;
  alt: string;
  youtubeId: string;
  youtubeUrl?: string;
  notes?: string;
  transcriptUrl?: string;
  tags?: string[];
  ogImage?: string;
  body: {
    raw: string;
    html: string;
  };
  aboutTheArtist?: PortableTextBlock[];
  artistLinks?: {
    instagram?: string;
    youtube?: string;
    website?: string;
  };
};

import { client } from "./sanity";
import {
  allReviewsQuery,
  allPodcastEpisodesQuery,
  reviewBySlugQuery,
  podcastEpisodeBySlugQuery,
} from "./sanity/queries";
import { getImageUrl } from "./sanity/image";

function extractSummaryFromPortableText(body: PortableTextBlock[]): string {
  if (!body || body.length === 0) return "";

  const MAX_WORDS = 20;

  for (const block of body) {
    if (block._type === "block" && block.children) {

      const text = block.children
        .filter((child: any) => child._type === "span")
        .map((child: any) => child.text)
        .join(" ")
        .trim();

      if (!text) continue;

      const words = text.split(/\s+/);

      if (words.length <= MAX_WORDS) {
        return text; // No ellipsis needed
      }

      const summary = words.slice(0, MAX_WORDS).join(" ") + "…";
      return summary;
    }
  }

  return "";
}

function extractTextFromPortableText(body: PortableTextBlock[]): string {
  if (!body || body.length === 0) return "";
  
  const textParts: string[] = [];
  for (const block of body) {
    if (block._type === "block" && block.children) {
      const text = block.children
        .filter((child: any) => child._type === "span")
        .map((child: any) => child.text)
        .join("");
      if (text.trim()) {
        textParts.push(text);
      }
    }
  }
  return textParts.join("\n\n");
}

function mapSanityReviewToReview(sanityReview: any): Review {
  if (!sanityReview) {
    throw new Error("Review data is missing");
  }

  // Ensure slug is always a string, never null/undefined
  const slug = sanityReview.slug && typeof sanityReview.slug === "string" 
    ? sanityReview.slug 
    : "";

  if (!slug) {
    console.warn("Review missing slug:", sanityReview._id, sanityReview.title);
  }

  const summary = extractSummaryFromPortableText(sanityReview.body || []);

  return {
    slug,
    title: sanityReview.title || "",
    artist: sanityReview.artist || "",
    author: sanityReview.author || "",
    reviewType: sanityReview.reviewType || "Album review",
    date: sanityReview.date || new Date().toISOString(),
    pullQuote: sanityReview.pullQuote ?? "",
    cover: sanityReview.cover || "",
    alt: sanityReview.alt || "",
    summary: summary || "",
    tracklist: Array.isArray(sanityReview.tracklist) ? sanityReview.tracklist : [],
    streaming: sanityReview.streamingLinks
      ? {
          spotify: sanityReview.streamingLinks.spotify,
          apple: sanityReview.streamingLinks.appleMusic,
          appleMusic: sanityReview.streamingLinks.appleMusic,
          youtubeMusic: sanityReview.streamingLinks.youtubeMusic,
          bandcamp: sanityReview.streamingLinks.bandcamp,
        }
      : undefined,
    tags: Array.isArray(sanityReview.genreTags) ? sanityReview.genreTags : [],
    genreTags: Array.isArray(sanityReview.genreTags) ? sanityReview.genreTags : [],
    body: Array.isArray(sanityReview.body) ? sanityReview.body : [],
    artistLinks: sanityReview.artistLinks,
  };
}

function mapSanityEpisodeToEpisode(sanityEpisode: any): Episode {
  if (!sanityEpisode) {
    throw new Error("Episode data is missing");
  }

  // Ensure slug is always a string, never null/undefined
  const slug = sanityEpisode.slug && typeof sanityEpisode.slug === "string" 
    ? sanityEpisode.slug 
    : "";

  if (!slug) {
    console.warn("Episode missing slug:", sanityEpisode._id, sanityEpisode.title);
  }

  // Extract YouTube ID from URL
  const youtubeId = extractYouTubeId(sanityEpisode.youtubeUrl || "");

  // Generate summary from aboutTheArtist or use empty string
  const summary = extractTextFromPortableText(sanityEpisode.aboutTheArtist || []);

  return {
    slug,
    title: sanityEpisode.title || "",
    guest: sanityEpisode.guest || "",
    date: sanityEpisode.date || new Date().toISOString(),
    pullQuote: sanityEpisode.pullQuote ?? "",
    cover: sanityEpisode.cover || "",
    alt: sanityEpisode.alt || "",
    youtubeId: youtubeId || "",
    youtubeUrl: sanityEpisode.youtubeUrl || "",
    body: {
      raw: summary,
      html: summary,
    },
    aboutTheArtist: Array.isArray(sanityEpisode.aboutTheArtist) ? sanityEpisode.aboutTheArtist : [],
    artistLinks: sanityEpisode.artistLinks,
  };
}

function extractYouTubeId(url: string): string {
  if (!url) return "";
  
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return "";
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    const sanityReviews = await client.fetch(allReviewsQuery);
    if (!Array.isArray(sanityReviews)) {
      console.error("Sanity returned non-array for reviews:", sanityReviews);
      return [];
    }
    return sanityReviews
      .filter((review) => review != null)
      .map((review) => {
        try {
          return mapSanityReviewToReview(review);
        } catch (error) {
          console.error("Error mapping review:", error, review);
          return null;
        }
      })
      .filter((review): review is Review => review !== null);
  } catch (error) {
    console.error("Error fetching reviews from Sanity:", error);
    return [];
  }
}

export async function getAllEpisodes(): Promise<Episode[]> {
  try {
    const sanityEpisodes = await client.fetch(allPodcastEpisodesQuery);
    if (!Array.isArray(sanityEpisodes)) {
      console.error("Sanity returned non-array for episodes:", sanityEpisodes);
      return [];
    }
    return sanityEpisodes
      .filter((episode) => episode != null)
      .map((episode) => {
        try {
          return mapSanityEpisodeToEpisode(episode);
        } catch (error) {
          console.error("Error mapping episode:", error, episode);
          return null;
        }
      })
      .filter((episode): episode is Episode => episode !== null);
  } catch (error) {
    console.error("Error fetching episodes from Sanity:", error);
    return [];
  }
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  try {
    const sanityReview = await client.fetch(reviewBySlugQuery, { slug });
    if (!sanityReview) return null;
    return mapSanityReviewToReview(sanityReview);
  } catch (error) {
    console.error("Error fetching review by slug from Sanity:", error);
    return null;
  }
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  try {
    const sanityEpisode = await client.fetch(podcastEpisodeBySlugQuery, { slug });
    if (!sanityEpisode) return null;
    return mapSanityEpisodeToEpisode(sanityEpisode);
  } catch (error) {
    console.error("Error fetching episode by slug from Sanity:", error);
    return null;
  }
}

export async function allReviewsSorted(): Promise<Review[]> {
  return getAllReviews();
}

export async function allEpisodesSorted(): Promise<Episode[]> {
  return getAllEpisodes();
}

