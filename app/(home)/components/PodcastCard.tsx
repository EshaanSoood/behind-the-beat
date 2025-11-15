import { format } from "date-fns";

import type { Episode } from "../../../lib/content";
import { HomeCard } from "./HomeCard";

type PodcastCardProps = {
  episode: Episode;
};

export function PodcastCard({ episode }: PodcastCardProps) {
  const formattedDate = format(new Date(episode.date), "MMM d, yyyy");

  return (
    <HomeCard
      variant="podcast"
      title={episode.title}
      href={`/podcast/${episode.slug}`}
      metaPrimary={episode.guest}
      summary=""
      pullQuote={episode.pullQuote}
      published={{
        display: formattedDate,
        iso: new Date(episode.date).toISOString(),
      }}
      media={{
        src: episode.cover,
        alt: episode.alt,
        width: 640,
        height: 640,
      }}
      youtubeId={episode.youtubeId}
      cta={{
        href: `/podcast/${episode.slug}`,
        label: "Listen now",
        tone: "neutral",
      }}
      overlayAction={{
        href: `/podcast/${episode.slug}`,
        label: `Play ${episode.title}`,
      }}
    />
  );
}

