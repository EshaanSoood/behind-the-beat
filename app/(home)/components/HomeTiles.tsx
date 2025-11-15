import type { Episode, Review } from "../../../lib/content";
import { CardGrid } from "./CardGrid";
import { PodcastCard } from "./PodcastCard";
import { ReviewCard } from "./ReviewCard";

const LATEST_HEADING_ID = "home-latest-heading";

type HomeTilesProps = {
  reviews: Review[];
  episodes: Episode[];
};

type PostItem =
  | { type: "review"; review: Review; date: string }
  | { type: "episode"; episode: Episode; date: string };

export function HomeTiles({ reviews, episodes }: HomeTilesProps) {
  const combined: PostItem[] = [
    ...reviews.map((review) => ({ type: "review" as const, review, date: review.date })),
    ...episodes.map((episode) => ({ type: "episode" as const, episode, date: episode.date })),
  ]
    .filter((item) => Boolean(item.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latest = combined.slice(0, 8);

  return (
    <section aria-labelledby={LATEST_HEADING_ID}>
      <header className="home-section-heading">
        <h2 id={LATEST_HEADING_ID}>
          Latest posts
        </h2>
      </header>
      {latest.length > 0 ? (
        <CardGrid>
          {latest.map((item) => {
            if (item.type === "review") {
              return <ReviewCard key={`review-${item.review.slug}`} review={item.review} />;
            }
            return <PodcastCard key={`episode-${item.episode.slug}`} episode={item.episode} />;
          })}
        </CardGrid>
      ) : (
        <p className="home-card-text" role="status">
          New stories are on the way. Check back soon or subscribe to the newsletter below.
        </p>
      )}
    </section>
  );
}

