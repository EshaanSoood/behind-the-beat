import type { Episode } from "../../../../lib/content";
import { formatDate } from "../../../../lib/format";

type EpisodeHeaderProps = {
  episode: Episode;
};

export function EpisodeHeader({ episode }: EpisodeHeaderProps) {
  const formattedDate = formatDate(episode.date);

  return (
    <header className="stack-sm">
      <h1>{episode.title}</h1>
      <p className="tile-meta">
        {episode.guest} · {formattedDate}
        {episode.tags && episode.tags.length > 0 && ` · ${episode.tags.join(", ")}`}
      </p>
      {episode.pullQuote && (
        <p className="tile-meta" style={{ fontStyle: "italic", fontSize: "var(--text-body-lg)" }}>
          {episode.pullQuote}
        </p>
      )}
    </header>
  );
}

