import Image from "next/image";
import Link from "next/link";
import type { Episode } from "../lib/content";
import { formatDate } from "../lib/format";
import { ButtonTrapezoid } from "./ButtonTrapezoid";

type PodcastStripProps = {
  episode: Episode;
};

export function PodcastStrip({ episode }: PodcastStripProps) {
  const formattedDate = formatDate(episode.date);
  const summary = episode.notes || episode.body.raw.split("\n")[0];

  return (
    <article
      className="podcast-strip paper-grain surface-chamfer flex flex-col gap-4 border border-brand-purple800 bg-[var(--surface)] p-6 md:flex-row md:items-center md:gap-8"
      data-kind="podcast-strip"
    >
      {/* Text block - left side on desktop */}
      <div className="podcast-strip-text flex-1" data-role="text-block">
        <h2 className="mb-2 font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)]" data-role="headline">
          <Link href={`/podcast/${episode.slug}`} className="focus-chamfer hover:underline">
            {episode.title}
          </Link>
        </h2>
        <p className="mb-3 text-sm uppercase tracking-wide text-[var(--text-muted)]" data-role="meta">
          {episode.guest} · {formattedDate}
        </p>
        <div className="mt-4" data-role="listen-button">
          <ButtonTrapezoid href={`/podcast/${episode.slug}`} tone="primary" size="sm">
            Listen now
          </ButtonTrapezoid>
        </div>
      </div>

      {/* Cover art - right side on desktop */}
      {episode.cover && (
        <div className="podcast-strip-artwork flex-shrink-0" data-role="artwork">
          <Link href={`/podcast/${episode.slug}`} className="focus-chamfer block">
            <div className="surface-chamfer ratio-1x1 relative overflow-hidden border border-[var(--border-accent-strong)] bg-[var(--surface)]">
              <Image
                src={episode.cover}
                alt={episode.alt}
                width={200}
                height={200}
                className="home-card-media-image h-full w-full object-cover"
                sizes="(min-width: 768px) 200px, 100%"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Link>
        </div>
      )}
    </article>
  );
}




