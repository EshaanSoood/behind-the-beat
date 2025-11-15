import { ReviewStrip } from "../../../components/ReviewStrip";
import type { Review } from "../../../lib/content";

type ReviewListItemProps = {
  review: Review;
};

export function ReviewListItem({ review }: ReviewListItemProps) {
  return (
    <li>
      <ReviewStrip review={review} />
    </li>
  );
}

