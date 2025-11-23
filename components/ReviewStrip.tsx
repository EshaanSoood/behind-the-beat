import Image from "next/image";
import Link from "next/link";
import type { Review } from "../lib/content";
import { formatDate } from "../lib/format";

import { ButtonTrapezoid } from "./ButtonTrapezoid";

type ReviewStripProps = {
  review: Review;
};

export function ReviewStrip({ review }: ReviewStripProps) {
  const formattedDate = formatDate(review.date);
  const sentences = review.summary.split(".").filter(s => s.trim().length > 0);
  const excerpt = sentences.slice(0, 2).join(". ") + (sentences.length > 2 ? "." : "");
  const isTruncated = sentences.length > 2 || review.summary.length > excerpt.length;

  return (
    <Link
      href={`/reviews/${review.slug}`}
      className="review-strip-link group block h-full focus-chamfer"
      aria-label={`Read review: ${review.title}`}
    >
      <article
        className="review-strip paper-grain surface-chamfer flex flex-col gap-4 border border-brand-pink100 bg-[var(--surface)] p-6 md:flex-row md:items-stretch md:gap-8 transition-all duration-200 ease-out md:motion-safe:hover:-translate-y-1 md:motion-safe:hover:scale-[1.01] md:motion-safe:hover:shadow-[var(--card-shadow-hover)] active:scale-[0.99] active:shadow-[var(--card-shadow-rest)] motion-reduce:md:hover:translate-y-0 motion-reduce:md:hover:scale-100 motion-reduce:active:scale-100"
        data-kind="review-strip"
      >
        {/* Text block - left side on desktop */}
        <div className="review-strip-text flex-1 flex flex-col" data-role="text-block">
          <h2 className="mb-2 font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)]" data-role="headline">
            <span className="md:group-hover:underline">
              {review.title}
            </span>
          </h2>
          <p className="mb-3 text-sm uppercase tracking-wide text-[var(--text-muted)]" data-role="meta">
            {review.artist} · {formattedDate}
          </p>
          <p className="review-strip-excerpt text-base leading-relaxed text-[var(--text)] flex-1" data-role="excerpt">
            {excerpt}
            {isTruncated && "..."}
          </p>
          <div className="review-strip-button mt-4 flex justify-center md:mt-auto" role="presentation">
            <div className="button-trapezoid inline-flex items-center justify-center px-4 py-2 text-sm bg-transparent text-brand-pink500 border border-brand-pink100 md:group-hover:bg-brand-pink100/20 transition-colors duration-150">
              Read More <span className="ml-2 font-display text-xl leading-none">+</span>
            </div>
          </div>
        </div>

        {/* Album art - right side on desktop */}
        {review.cover && (
          <div className="review-strip-artwork flex-shrink-0 md:self-stretch min-w-[200px] md:w-auto md:min-w-[200px]" data-role="artwork" role="presentation">
            <div className="surface-chamfer relative h-full overflow-hidden border border-[var(--border-accent-strong)] bg-[var(--surface)] aspect-square w-full md:w-full md:h-full md:aspect-square">
              <Image
                src={review.cover}
                alt={review.alt}
                width={200}
                height={200}
                className="h-full w-full object-cover"
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




