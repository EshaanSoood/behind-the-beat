"use client";

import { useEffect, useState } from "react";

import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";
import { EmptyState } from "../../../components/EmptyState";
import type { Review } from "../../../lib/content";

import { ReviewListItem } from "./ReviewListItem";

type ReviewListProps = {
  initialReviews: Review[];
};

export function ReviewList({ initialReviews }: ReviewListProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.matchMedia("(max-width: 640px)").matches);
        setVisibleCount(window.matchMedia("(max-width: 640px)").matches ? 5 : 8);
      }
    };

    checkMobile();
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(max-width: 640px)");
      const handleChange = () => {
        setIsMobile(mediaQuery.matches);
        if (visibleCount === initialReviews.length) {
          setVisibleCount(mediaQuery.matches ? 5 : 8);
        }
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [visibleCount, initialReviews.length]);

  const handleLoadMore = () => {
    const increment = isMobile ? 5 : 8;
    setVisibleCount((prev) => Math.min(prev + increment, initialReviews.length));
  };

  const visibleReviews = initialReviews.slice(0, visibleCount);
  const hasMore = visibleCount < initialReviews.length;

  if (initialReviews.length === 0) {
    return (
      <section className="stack-md">
        <h1>Reviews</h1>
        <p className="tile-meta">
          Deep-dive album reviews with tracklists, streaming links, and pull
          quotes. Explore the stories behind the music.
        </p>
        <EmptyState
          title="Nothing here yet"
          description="We haven't published any reviews yet. Check back soon for album reviews, tracklists, and streaming links."
        />
      </section>
    );
  }

  return (
    <section className="stack-md">
      <h1>Reviews</h1>
      <p className="tile-meta">
        Deep-dive album reviews with tracklists, streaming links, and pull
        quotes. Explore the stories behind the music.
      </p>
      <ul id="review-grid" className="post-grid">
        {visibleReviews.map((review) => (
          <ReviewListItem key={review.slug} review={review} />
        ))}
      </ul>
      {hasMore && (
        <div>
          <ButtonTrapezoid
            tone="neutral"
            size="md"
            aria-controls="review-grid"
            onClick={handleLoadMore}
          >
            Load more reviews
          </ButtonTrapezoid>
        </div>
      )}
    </section>
  );
}

