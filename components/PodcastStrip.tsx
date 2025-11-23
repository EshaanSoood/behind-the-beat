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
    <Link
      href={`/podcast/${episode.slug}`}
      className="podcast-strip-link group block h-full focus-chamfer"
      aria-label={`Listen to podcast: ${episode.title}`}
    >
      <article
        className="podcast-strip paper-grain surface-chamfer flex flex-col gap-4 border border-brand-purple800 bg-[var(--surface)] p-6 md:flex-row md:items-center md:gap-8 transition-all duration-200 ease-out md:motion-safe:hover:-translate-y-1 md:motion-safe:hover:scale-[1.01] md:motion-safe:hover:shadow-[var(--card-shadow-hover)] active:scale-[0.99] active:shadow-[var(--card-shadow-rest)] motion-reduce:md:hover:translate-y-0 motion-reduce:md:hover:scale-100 motion-reduce:active:scale-100"
        data-kind="podcast-strip"
      >
        {/* Text block - left side on desktop */}
        <div className="podcast-strip-text flex-1" data-role="text-block">
          <h2 className="mb-2 font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)]" data-role="headline">
            <span className="md:group-hover:underline">
              {episode.title}
            </span>
          </h2>
          <p className="mb-3 text-sm uppercase tracking-wide text-[var(--text-muted)]" data-role="meta">
            {episode.guest} · {formattedDate}
          </p>
          <div className="mt-4" data-role="listen-button" role="presentation">
            <div className="button-trapezoid inline-flex items-center justify-center px-4 py-2 text-sm bg-brand-purple-800 text-brand-pink-500 border-none transition-colors duration-150 md:group-hover:bg-brand-purple-600">
              Listen now
            </div>
          </div>
        </div>

        {/* Cover art - right side on desktop */}
        {episode.cover && (
          <div className="podcast-strip-artwork flex-shrink-0" data-role="artwork" role="presentation">
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
          </div>
        )}
      </article>
    </Link>
  );
}




