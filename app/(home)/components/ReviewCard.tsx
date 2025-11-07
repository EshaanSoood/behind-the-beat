"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [isActive, setIsActive] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");
  const cardRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const handleFocusIn = () => {
      setIsActive(true);
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (card.contains(event.relatedTarget as Node)) {
        return;
      }
      setIsActive(false);
    };

    card.addEventListener("focusin", handleFocusIn);
    card.addEventListener("focusout", handleFocusOut);

    return () => {
      card.removeEventListener("focusin", handleFocusIn);
      card.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      setLiveMessage(review.pullQuote);
      return;
    }
    setLiveMessage("");
  }, [isActive, review.pullQuote]);

  const highlight = review.summary || review.pullQuote;

  return (
    <article
      ref={cardRef}
      className="home-card surface-chamfer"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="home-card-content">
        <div className="home-card-header">
          <Link href={`/reviews/${review.slug}`} className="home-card-title-link">
            <h3 className="home-card-title">{review.title}</h3>
          </Link>
          <div className="home-card-meta-block" aria-live="off">
            <p
              className="home-card-meta home-card-meta-primary"
              aria-hidden={isActive}
            >
              {review.artist} • {formattedDate}
            </p>
            <p
              className="home-card-meta home-card-meta-secondary"
              aria-hidden={!isActive}
            >
              {review.pullQuote}
            </p>
          </div>
        </div>
        <div className={`home-card-media surface-chamfer${showPlaceholder ? " is-placeholder" : ""}`}>
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
        <p className="home-card-text" aria-label="Review summary">
          {highlight}
        </p>
        <div className="card-actions">
          <ButtonTrapezoid href={`/reviews/${review.slug}`} tone="primary" size="sm">
            Read more
          </ButtonTrapezoid>
        </div>
        <div className="sr-only" aria-live="polite">
          {liveMessage}
        </div>
      </div>
    </article>
  );
}

