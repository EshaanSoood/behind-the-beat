 "use client";

import { useEffect, useMemo, useState } from "react";

type EpisodePlayerProps = {
  youtubeId: string;
  title: string;
  autoplay?: boolean;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function EpisodePlayer({ youtubeId, title, autoplay = false }: EpisodePlayerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Safari fallback
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const shouldAutoplay = autoplay && !prefersReducedMotion;

  const embedSrc = useMemo(() => {
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });

    if (shouldAutoplay) {
      params.set("autoplay", "1");
      params.set("mute", "1");
    } else {
      params.set("autoplay", "0");
    }

    return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
  }, [shouldAutoplay, youtubeId]);

  const loading = shouldAutoplay ? "eager" : "lazy";

  return (
    <section className="episode-player stack-sm">
      <h2 className="episode-player-heading">Listen in</h2>
      <div className="youtube-embed-container chamfered chamfered-border ch-14">
        <iframe
          key={embedSrc}
          src={embedSrc}
          title={`Watch ${title}`}
          loading={loading}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="youtube-embed"
        />
      </div>
    </section>
  );
}

