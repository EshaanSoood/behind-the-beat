import matter from "gray-matter";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

export type Review = {
  slug: string;
  title: string;
  artist: string;
  date: string;
  pullQuote: string;
  cover: string;
  alt: string;
  summary: string;
  tracklist: string[];
  streaming?: {
    spotify?: string;
    apple?: string;
    youtubeMusic?: string;
  };
  tags?: string[];
  ogImage?: string;
  body: {
    raw: string;
    html: string;
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
  notes?: string;
  transcriptUrl?: string;
  tags?: string[];
  ogImage?: string;
  body: {
    raw: string;
    html: string;
  };
};

const contentDir = join(process.cwd(), "content");

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

type ReviewData = {
  title?: string;
  artist?: string;
  date?: string;
  pullQuote?: string;
  cover?: string;
  alt?: string;
  summary?: string;
  tracklist?: unknown;
  [key: string]: unknown;
};

function validateReview(data: ReviewData): Review {
  if (!data.title) throw new Error("Review missing required field: title");
  if (!data.artist) throw new Error("Review missing required field: artist");
  if (!data.date) throw new Error("Review missing required field: date");
  if (!data.pullQuote) throw new Error("Review missing required field: pullQuote");
  if (!data.cover) throw new Error("Review missing required field: cover");
  if (!data.alt || String(data.alt).trim() === "")
    throw new Error("Review missing required field: alt (must be non-empty)");
  if (!data.summary) throw new Error("Review missing required field: summary");
  if (!data.tracklist || !Array.isArray(data.tracklist))
    throw new Error("Review missing required field: tracklist (must be array)");

  return data as Review;
}

type EpisodeData = {
  title?: string;
  guest?: string;
  date?: string;
  pullQuote?: string;
  cover?: string;
  alt?: string;
  youtubeId?: string;
  [key: string]: unknown;
};

function validateEpisode(data: EpisodeData): Episode {
  if (!data.title) throw new Error("Episode missing required field: title");
  if (!data.guest) throw new Error("Episode missing required field: guest");
  if (!data.date) throw new Error("Episode missing required field: date");
  if (!data.pullQuote) throw new Error("Episode missing required field: pullQuote");
  if (!data.cover) throw new Error("Episode missing required field: cover");
  if (!data.alt || String(data.alt).trim() === "")
    throw new Error("Episode missing required field: alt (must be non-empty)");
  if (!data.youtubeId) throw new Error("Episode missing required field: youtubeId");

  return data as Episode;
}

export function getAllReviews(): Review[] {
  const reviewsDir = join(contentDir, "reviews");
  const filenames = readdirSync(reviewsDir).filter((f) => f.endsWith(".md"));

  const reviews = filenames.map((filename) => {
    const filePath = join(reviewsDir, filename);
    const fileContents = readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const review: Review = {
      ...validateReview({
        slug: getSlugFromFilename(filename),
        ...data,
        body: {
          raw: content,
          html: content, // For now, just return raw markdown; can add MDX processing later
        },
      }),
    };

    return review;
  });

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllEpisodes(): Episode[] {
  const episodesDir = join(contentDir, "episodes");
  const filenames = readdirSync(episodesDir).filter((f) => f.endsWith(".md"));

  const episodes = filenames.map((filename) => {
    const filePath = join(episodesDir, filename);
    const fileContents = readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const episode: Episode = {
      ...validateEpisode({
        slug: getSlugFromFilename(filename),
        ...data,
        body: {
          raw: content,
          html: content, // For now, just return raw markdown; can add MDX processing later
        },
      }),
    };

    return episode;
  });

  return episodes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getReviewBySlug(slug: string): Review | null {
  const reviews = getAllReviews();
  return reviews.find((r) => r.slug === slug) || null;
}

export function getEpisodeBySlug(slug: string): Episode | null {
  const episodes = getAllEpisodes();
  return episodes.find((e) => e.slug === slug) || null;
}

export function allReviewsSorted(): Review[] {
  return getAllReviews();
}

export function allEpisodesSorted(): Episode[] {
  return getAllEpisodes();
}

