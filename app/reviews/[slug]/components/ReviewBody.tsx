import type { Review } from "../../../../lib/content";

type ReviewBodyProps = {
  review: Review;
};

export function ReviewBody({ review }: ReviewBodyProps) {
  return (
    <article className="review-body flex max-w-prose flex-col gap-4 text-base leading-relaxed text-[var(--text)]" data-role="review-body">
      <p>{review.summary}</p>
      {review.body.raw && (
        <div
          className="space-y-4"
          dangerouslySetInnerHTML={{ __html: review.body.raw }}
        />
      )}
    </article>
  );
}

