import { ReviewListItem } from "./ReviewListItem";

export function ReviewList() {
  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        <ReviewListItem />
        <ReviewListItem placeholder="Another review placeholder." />
      </ul>
    </div>
  );
}

