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
  const description = episode.pullQuote ?? episode.notes ?? "Long-form conversation coming soon.";
  const autoplayHref = `/podcast/${episode.slug}?autoplay=1`;

  const handlePlay = useCallback(() => {
    router.push(autoplayHref);
  }, [autoplayHref, router]);

  return (
    <article className="home-card surface-chamfer">
      <div className="home-card-content">
        <div className="home-card-header">
          <Link href={`/podcast/${episode.slug}`} className="home-card-title-link">
            <h3 className="home-card-title">{episode.title}</h3>
          </Link>
          <p className="home-card-meta">
            {episode.guest} • {formattedDate}
          </p>
        </div>
        <div className="home-card-media surface-chamfer">
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
            className="home-card-media-button surface-chamfer"
            aria-label={`Play episode: ${episode.title}`}
            onClick={handlePlay}
          >
            <span className="home-card-play-hit surface-chamfer">
              <Image src="/icons/play-chamfer.svg" alt="" width={48} height={48} aria-hidden="true" />
            </span>
          </button>
        </div>
        <p className="home-card-text" aria-label="Episode description">
          {description}
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

