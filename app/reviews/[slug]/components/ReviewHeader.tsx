import type { Review } from "../../../../lib/content";
import { formatDate } from "../../../../lib/format";
import { PullQuote } from "../../../../components/PullQuote";

type ReviewHeaderProps = {
  review: Review;
};

export function ReviewHeader({ review }: ReviewHeaderProps) {
  const formattedDate = formatDate(review.date);

  return (
    <header className="stack-sm">
      <h1>{review.title}</h1>
      <p className="tile-meta">
        {review.artist} · {formattedDate}
        {review.tags && review.tags.length > 0 && ` · ${review.tags.join(", ")}`}
      </p>
      {review.pullQuote && (
        <PullQuote cite={review.artist}>{review.pullQuote}</PullQuote>
      )}
    </header>
  );
}

