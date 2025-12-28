import Image from "next/image";
import type { Review } from "../../../../lib/content";
import { formatDate } from "../../../../lib/format";
import { ShareChips } from "../../../../components/ShareChips";
import { siteDefaults } from "../../../../lib/seo";

type ReviewHeaderProps = {
  review: Review;
};

export function ReviewHeader({ review }: ReviewHeaderProps) {
  const formattedDate = formatDate(review.date);
  const currentUrl = `${siteDefaults.url}/reviews/${review.slug}`;

  return (
    <header className="entry-header flex flex-col gap-6 md:flex-row md:items-start md:gap-8" data-role="entry-header">
      {/* Left column: Headline, meta, share chips */}
      <div className="entry-header-left flex-1 flex flex-col gap-4 md:min-h-[240px] md:justify-between">
        <div className="flex flex-col items-center gap-4">
          <div data-role="headline">
            <h1 className="font-display text-[clamp(2rem,2vw+1.2rem,2.75rem)] leading-tight text-[var(--text-deep-purple)]">{review.title}</h1>
          </div>
          <p className="text-base text-center text-[var(--text-muted)]" data-role="meta">
            {review.artist} · {review.author} · {formattedDate}
            {(review.tags && review.tags.length > 0) || (review.genreTags && review.genreTags.length > 0)
              ? ` · ${(review.genreTags || review.tags || []).join(", ")}`
              : ""}
          </p>
        </div>
        <div data-role="share-chips" className="flex justify-center">
          <ShareChips title={review.title} url={currentUrl} quote={review.pullQuote} />
        </div>
      </div>

      {/* Right column: Album art */}
      {review.cover && (
        <div className="entry-header-right flex-shrink-0" data-role="album-art">
          <div className="surface-chamfer ratio-1x1 relative overflow-hidden border border-[var(--border-accent-strong)] bg-[var(--surface)] w-[200px] md:w-[240px] md:h-[240px]">
            <Image
              src={review.cover}
              alt={review.alt}
              width={240}
              height={240}
              className="home-card-media-image h-full w-full object-cover"
              sizes="(min-width: 768px) 240px, 200px"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      )}
    </header>
  );
}

