import type { Review, Episode } from "./content";

const DEFAULT_OG = "/images/og-default.jpg";

export function sanitizeDescription(s: string): string {
  return s
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

export function pickOgImage(review?: Review, episode?: Episode): string {
  if (review) {
    return review.ogImage || review.cover || DEFAULT_OG;
  }
  if (episode) {
    return episode.ogImage || episode.cover || DEFAULT_OG;
  }
  return DEFAULT_OG;
}



