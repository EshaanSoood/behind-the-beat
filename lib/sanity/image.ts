import imageUrlBuilder from "@sanity/image-url";
import { client } from "../sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source) {
    // Return a builder that will produce an empty/invalid URL
    // This prevents crashes when source is null/undefined
    return builder.image({});
  }
  return builder.image(source);
}

export function getImageUrl(
  source: SanityImageSource | null | undefined,
  width?: number,
  height?: number
): string {
  if (!source) {
    // Return empty string or a placeholder if source is missing
    return "";
  }

  let imageBuilder = urlFor(source);

  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  try {
    return imageBuilder.url();
  } catch (error) {
    console.error("Error generating image URL:", error, source);
    return "";
  }
}

