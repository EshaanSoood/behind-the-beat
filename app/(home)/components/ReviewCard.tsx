"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";
import type { Review } from "../../../lib/content";

type ReviewCardProps = {
  review: Review;
};

const SAMPLE_COVER = "/images/reviews/dream-river-front-cover-digital.jpg";

export function ReviewCard({ review }: ReviewCardProps) {
  const [coverSrc, setCoverSrc] = useState(review.cover || SAMPLE_COVER);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const formattedDate = useMemo(() => {
    try {
      return format(new Date(review.date), "MMM d, yyyy");
    } catch {
      return review.date;
    }
  }, [review.date]);

  const handleImageError = () => {
    if (coverSrc !== SAMPLE_COVER) {
      setCoverSrc(SAMPLE_COVER);
      return;
    }
    setShowPlaceholder(true);
  };

  const previewCopy = (
    review.summary?.trim() ||
    review.pullQuote?.trim() ||
    "Full review coming soon."
  );

  return (
    <article
      className="home-card home-card--review chamfered chamfered-border ch-14 ratio-4x5"
    >
      <div className="home-card-content">
        <Link href={`/reviews/${review.slug}`} className="home-card-title-link">
          <h3 className="home-card-title">{review.title}</h3>
        </Link>
        <div className="home-card-meta-block" data-has-secondary="false">
          <p className="home-card-meta-primary">
            <span className="sr-only">Artist and date: </span>
            {review.artist} • {formattedDate}
          </p>
        </div>
        <div className={`home-card-media chamfered chamfered-border ch-14${showPlaceholder ? " is-placeholder" : ""}`}>
          {showPlaceholder ? (
            <span aria-hidden="true" className="home-card-placeholder">
              BTB
            </span>
          ) : (
            <Image
              src={coverSrc}
              alt={`Album art for ${review.title} by ${review.artist}`}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 100vw"
              className="home-card-media-image"
              onError={handleImageError}
              priority={false}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <p className="home-card-text">{previewCopy}</p>
        <div className="card-actions">
          <ButtonTrapezoid href={`/reviews/${review.slug}`} tone="primary" size="sm">
            Read more
          </ButtonTrapezoid>
        </div>
      </div>
    </article>
  );
}

