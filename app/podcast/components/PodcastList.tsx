"use client";

import { useEffect, useState } from "react";

import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";
import { EmptyState } from "../../../components/EmptyState";
import type { Episode } from "../../../lib/content";

import { PodcastListItem } from "./PodcastListItem";

type PodcastListProps = {
  initialEpisodes: Episode[];
};

export function PodcastList({ initialEpisodes }: PodcastListProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.matchMedia("(max-width: 640px)").matches);
        setVisibleCount(window.matchMedia("(max-width: 640px)").matches ? 5 : 8);
      }
    };

    checkMobile();
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(max-width: 640px)");
      const handleChange = () => {
        setIsMobile(mediaQuery.matches);
        if (visibleCount === initialEpisodes.length) {
          setVisibleCount(mediaQuery.matches ? 5 : 8);
        }
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [visibleCount, initialEpisodes.length]);

  const handleLoadMore = () => {
    const increment = isMobile ? 5 : 8;
    setVisibleCount((prev) => Math.min(prev + increment, initialEpisodes.length));
  };

  const visibleEpisodes = initialEpisodes.slice(0, visibleCount);
  const hasMore = visibleCount < initialEpisodes.length;

  if (initialEpisodes.length === 0) {
    return (
      <section className="stack-md">
        <h1>Podcast Episodes</h1>
        <p className="tile-meta">
          Intimate conversations with artists about their creative process, the
          stories behind their music, and life in the studio.
        </p>
        <EmptyState
          title="Nothing here yet"
          description="We haven't published any podcast episodes yet. Check back soon for interviews and conversations with artists."
        />
      </section>
    );
  }

  return (
    <section className="stack-md">
      <h1>Podcast Episodes</h1>
      <p className="tile-meta">
        Intimate conversations with artists about their creative process, the
        stories behind their music, and life in the studio.
      </p>
      <ul id="podcast-grid" className="post-grid">
        {visibleEpisodes.map((episode) => (
          <PodcastListItem key={episode.slug} episode={episode} />
        ))}
      </ul>
      {hasMore && (
        <div>
          <ButtonTrapezoid
            tone="neutral"
            size="md"
            aria-controls="podcast-grid"
            onClick={handleLoadMore}
          >
            Load more episodes
          </ButtonTrapezoid>
        </div>
      )}
    </section>
  );
}

