import { TrapezoidCard } from "../../../components/TrapezoidCard";
import { Tag } from "../../../components/Tag";
import type { Review } from "../../../lib/content";
import { formatDate } from "../../../lib/format";

type ReviewListItemProps = {
  review: Review;
};

export function ReviewListItem({ review }: ReviewListItemProps) {
  const formattedDate = formatDate(review.date);
  const displayTags = review.tags?.slice(0, 3) || [];

  return (
    <li>
      <TrapezoidCard
        variant="solid"
        as="article"
        title={review.title}
        kicker={review.artist}
        meta={formattedDate}
        href={`/reviews/${review.slug}`}
      >
        {review.summary.split(".")[0]}.
        {displayTags.length > 0 && (
          <div className="review-item-tags">
            {displayTags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        )}
      </TrapezoidCard>
    </li>
  );
}

