"use client";

import { useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";
import type { Episode } from "../../../lib/content";

type PodcastCardProps = {
  episode: Episode;
};

export function PodcastCard({ episode }: PodcastCardProps) {
  const router = useRouter();
  const formattedDate = useMemo(() => {
    try {
      return format(new Date(episode.date), "MMM d, yyyy");
    } catch {
      return episode.date;
    }
  }, [episode.date]);

  const thumbnailUrl = `https://i.ytimg.com/vi/${episode.youtubeId}/hqdefault.jpg`;
  const notes = episode.notes?.trim() ?? "";
  const pullQuote = episode.pullQuote?.trim() ?? "";
  const bodyCopy =
    notes.length > 0
      ? notes
      : pullQuote.length > 0
        ? pullQuote
        : "Episode details coming soon.";
  const autoplayHref = `/podcast/${episode.slug}?autoplay=1`;

  const handlePlay = useCallback(() => {
    router.push(autoplayHref);
  }, [autoplayHref, router]);

  return (
    <article className="home-card home-card--podcast chamfered chamfered-border ch-14 ratio-4x5">
      <div className="home-card-content">
        <Link href={`/podcast/${episode.slug}`} className="home-card-title-link">
          <h3 className="home-card-title">{episode.title}</h3>
        </Link>
        <div className="home-card-meta-block" data-has-secondary="false">
          <p className="home-card-meta-primary">
            <span className="sr-only">Guest and date: </span>
            {episode.guest} • {formattedDate}
          </p>
        </div>
        <div className="home-card-media chamfered chamfered-border ch-14">
          <Image
            src={thumbnailUrl}
            alt={`Episode art for ${episode.title} with ${episode.guest}`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 100vw"
            className="home-card-media-image"
            unoptimized
            loading="lazy"
            decoding="async"
          />
          <button
            type="button"
            className="home-card-media-overlay chamfered ch-14"
            aria-label={`Play episode: ${episode.title}`}
            onClick={handlePlay}
          >
            <span className="home-card-play-hit">
              <Image src="/icons/play-chamfer.svg" alt="" width={48} height={48} aria-hidden="true" />
            </span>
          </button>
        </div>
        <p className="home-card-text">
          {bodyCopy}
        </p>
        <div className="card-actions">
          <ButtonTrapezoid href={autoplayHref} tone="primary" size="sm">
            Listen now
          </ButtonTrapezoid>
        </div>
      </div>
    </article>
  );
}

