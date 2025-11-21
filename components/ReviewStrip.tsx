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
    <article
      className="review-strip paper-grain surface-chamfer flex flex-col gap-4 border border-brand-pink100 bg-[var(--surface)] p-6 md:flex-row md:items-stretch md:gap-8"
      data-kind="review-strip"
    >
      {/* Text block - left side on desktop */}
      <div className="review-strip-text flex-1 flex flex-col" data-role="text-block">
        <h2 className="mb-2 font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)]" data-role="headline">
          <Link href={`/reviews/${review.slug}`} className="focus-chamfer hover:underline">
            {review.title}
          </Link>
        </h2>
        <p className="mb-3 text-sm uppercase tracking-wide text-[var(--text-muted)]" data-role="meta">
          {review.artist} · {formattedDate}
        </p>
        <p className="line-clamp-3 text-base leading-relaxed text-[var(--text)] flex-1" data-role="excerpt">
          {excerpt}
          {isTruncated && "..."}
        </p>
        <div className="review-strip-button mt-4 flex justify-center md:mt-auto">
          <ButtonTrapezoid
            href={`/reviews/${review.slug}`}
            size="sm"
            className="!bg-transparent !text-brand-pink500 !border-brand-pink100 hover:!bg-brand-pink100/20"
          >
            Read More <span className="ml-2 font-display text-xl leading-none">+</span>
          </ButtonTrapezoid>
        </div>
      </div>

      {/* Album art - right side on desktop */}
      {review.cover && (
        <div className="review-strip-artwork flex-shrink-0 md:self-stretch" data-role="artwork">
          <Link href={`/reviews/${review.slug}`} className="focus-chamfer block h-full">
            <div className="surface-chamfer relative h-full overflow-hidden border border-[var(--border-accent-strong)] bg-[var(--surface)]" style={{ aspectRatio: "1 / 1", width: "100%" }}>
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
          </Link>
        </div>
      )}
    </article>
  );
}




