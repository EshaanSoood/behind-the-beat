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
  tracklist: Array<{ title: string }>;
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
  
  // Find the first text block and extract text
  for (const block of body) {
    if (block._type === "block" && block.children) {
      const text = block.children
        .filter((child: any) => child._type === "span")
        .map((child: any) => child.text)
        .join("");
      if (text.trim()) {
        // Return first 200 characters or first sentence
        const firstSentence = text.split(/[.!?]/)[0];
        return firstSentence.length > 200 ? text.substring(0, 200) + "..." : firstSentence;
      }
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

  const summary = extractSummaryFromPortableText(sanityReview.body || []);

  return {
    slug: sanityReview.slug || "",
    title: sanityReview.title || "",
    artist: sanityReview.artist || "",
    author: sanityReview.author || "",
    reviewType: sanityReview.reviewType || "Album review",
    date: sanityReview.date || new Date().toISOString(),
    pullQuote: sanityReview.pullQuote || "",
    cover: sanityReview.cover || "",
    alt: sanityReview.alt || "",
    summary: summary || "",
    tracklist: (sanityReview.tracklist || []).map((track: any) => ({
      title: track.title || "",
    })),
    streaming: sanityReview.streamingLinks
      ? {
          spotify: sanityReview.streamingLinks.spotify,
          apple: sanityReview.streamingLinks.appleMusic,
          appleMusic: sanityReview.streamingLinks.appleMusic,
          youtubeMusic: sanityReview.streamingLinks.youtubeMusic,
          bandcamp: sanityReview.streamingLinks.bandcamp,
        }
      : undefined,
    tags: sanityReview.genreTags || [],
    genreTags: sanityReview.genreTags || [],
    body: sanityReview.body || [],
    artistLinks: sanityReview.artistLinks,
  };
}

function mapSanityEpisodeToEpisode(sanityEpisode: any): Episode {
  if (!sanityEpisode) {
    throw new Error("Episode data is missing");
  }

  // Extract YouTube ID from URL
  const youtubeId = extractYouTubeId(sanityEpisode.youtubeUrl || "");

  // Generate summary from aboutTheArtist or use empty string
  const summary = extractTextFromPortableText(sanityEpisode.aboutTheArtist || []);

  return {
    slug: sanityEpisode.slug || "",
    title: sanityEpisode.title || "",
    guest: sanityEpisode.guest || "",
    date: sanityEpisode.date || new Date().toISOString(),
    pullQuote: sanityEpisode.pullQuote || "",
    cover: sanityEpisode.cover || "",
    alt: sanityEpisode.alt || "",
    youtubeId: youtubeId || "",
    youtubeUrl: sanityEpisode.youtubeUrl || "",
    body: {
      raw: summary,
      html: summary,
    },
    aboutTheArtist: sanityEpisode.aboutTheArtist || [],
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
    return sanityReviews.map(mapSanityReviewToReview);
  } catch (error) {
    console.error("Error fetching reviews from Sanity:", error);
    return [];
  }
}

export async function getAllEpisodes(): Promise<Episode[]> {
  try {
    const sanityEpisodes = await client.fetch(allPodcastEpisodesQuery);
    return sanityEpisodes.map(mapSanityEpisodeToEpisode);
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

