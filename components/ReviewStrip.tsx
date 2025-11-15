import Image from "next/image";
import Link from "next/link";
import type { Review } from "../lib/content";
import { formatDate } from "../lib/format";

type ReviewStripProps = {
  review: Review;
};

export function ReviewStrip({ review }: ReviewStripProps) {
  const formattedDate = formatDate(review.date);
  const excerpt = review.summary.split(".").slice(0, 2).join(". ") + ".";

  return (
    <article
      className="review-strip paper-grain surface-chamfer flex flex-col gap-4 border-[var(--border-strong-width)] border-[var(--card-border-review)] bg-[var(--surface)] p-6 md:flex-row md:items-center md:gap-8"
      data-kind="review-strip"
    >
      {/* Text block - left side on desktop */}
      <div className="review-strip-text flex-1" data-role="text-block">
        <h2 className="mb-2 font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)]" data-role="headline">
          <Link href={`/reviews/${review.slug}`} className="focus-chamfer hover:underline">
            {review.title}
          </Link>
        </h2>
        <p className="mb-3 text-sm uppercase tracking-wide text-[var(--text-muted)]" data-role="meta">
          {review.artist} · {formattedDate}
        </p>
        <p className="line-clamp-3 text-base leading-relaxed text-[var(--text)]" data-role="excerpt">
          {excerpt}
        </p>
      </div>

      {/* Album art - right side on desktop */}
      {review.cover && (
        <div className="review-strip-artwork flex-shrink-0" data-role="artwork">
          <Link href={`/reviews/${review.slug}`} className="focus-chamfer block">
            <div className="surface-chamfer ratio-1x1 relative overflow-hidden border border-[var(--border-accent-strong)] bg-[var(--surface)]">
              <Image
                src={review.cover}
                alt={review.alt}
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



