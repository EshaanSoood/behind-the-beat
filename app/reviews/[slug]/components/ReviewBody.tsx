import type { Review } from "../../../../lib/content";

type ReviewBodyProps = {
  review: Review;
};

export function ReviewBody({ review }: ReviewBodyProps) {
  return (
    <article className="prose-measure stack-sm">
      <p>{review.summary}</p>
      {review.body.raw && (
        <div
          className="review-body-content"
          dangerouslySetInnerHTML={{ __html: review.body.raw }}
        />
      )}
    </article>
  );
}

