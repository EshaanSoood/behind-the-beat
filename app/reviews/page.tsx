import { Section } from "../../components/Section";
import { generateMetadata as genMeta } from "../../lib/seo";
import { allReviewsSorted } from "../../lib/content";

import { ReviewList } from "./components/ReviewList";

export const metadata = genMeta({
  title: "Reviews",
  description: "Deep-dive album reviews with tracklists, streaming links, and pull quotes.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const reviews = await allReviewsSorted();

  return (
    <Section className="flex flex-col gap-12" data-page="review-list">
      <ReviewList initialReviews={reviews} />
    </Section>
  );
}

