import type { Review } from "../../../../lib/content";
import { PortableTextRenderer } from "../../../../components/PortableTextRenderer";

type ReviewBodyProps = {
  review: Review;
};

export function ReviewBody({ review }: ReviewBodyProps) {
  return (
    <article className="review-body flex max-w-prose flex-col gap-4 text-base leading-relaxed text-[var(--text)]" data-role="review-body">
      {review.summary && <p>{review.summary}</p>}
      {review.body && review.body.length > 0 && (
        <PortableTextRenderer value={review.body} />
      )}
    </article>
  );
}

