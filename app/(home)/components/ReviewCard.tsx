import { format } from "date-fns";

import type { Review } from "../../../lib/content";
import { HomeCard } from "./HomeCard";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const releaseDate = format(new Date(review.date), "MMM d, yyyy");

  return (
    <HomeCard
      variant="review"
      title={review.title}
      href={`/reviews/${review.slug}`}
      metaPrimary={review.artist}
      summary={review.summary}
      pullQuote={review.pullQuote}
      published={{
        display: releaseDate,
        iso: new Date(review.date).toISOString(),
      }}
      media={{
        src: review.cover,
        alt: review.alt,
        width: 640,
        height: 640,
      }}
      cta={{
        href: `/reviews/${review.slug}`,
        label: "Read more",
        tone: "primary",
      }}
    />
  );
}

