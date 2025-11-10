"use client";

import { useMemo } from "react";

import type { Review, Episode } from "../../../lib/content";
import { PodcastCard } from "./PodcastCard";
import { ReviewCard } from "./ReviewCard";
import { CardGrid } from "./CardGrid";
import { SectionHeading } from "./SectionHeading";

type PostItem =
  | { type: "review"; data: Review }
  | { type: "episode"; data: Episode };

type HomeTilesClientProps = {
  reviews: Review[];
  episodes: Episode[];
  sectionLabel?: string;
};

export function HomeTilesClient({ reviews, episodes, sectionLabel }: HomeTilesClientProps) {
  const posts = useMemo<PostItem[]>(() => {
    return [
      ...reviews.map((review) => ({ type: "review" as const, data: review })),
      ...episodes.map((episode) => ({ type: "episode" as const, data: episode })),
    ].sort((a, b) => {
      const dateA = new Date(a.data.date).getTime();
      const dateB = new Date(b.data.date).getTime();
      return dateB - dateA;
    });
  }, [reviews, episodes]);

  const displayedPosts = posts;
  const ariaLabel = sectionLabel ?? "Latest on Behind the Beat";

  if (displayedPosts.length === 0) {
    return (
      <section className="home-section" aria-label={ariaLabel}>
        <SectionHeading title="Latest" eyebrow="New on Behind the Beat" />
        <p className="home-section-empty">No posts available yet.</p>
      </section>
    );
  }

  return (
    <section className="home-section" aria-label={ariaLabel}>
      <SectionHeading title="Latest" eyebrow="New on Behind the Beat" />
      <CardGrid>
        {displayedPosts.map((post) => {
          if (post.type === "review") {
            return <ReviewCard key={`review-${post.data.slug}`} review={post.data} />;
          }
          return <PodcastCard key={`episode-${post.data.slug}`} episode={post.data} />;
        })}
      </CardGrid>
    </section>
  );
}

