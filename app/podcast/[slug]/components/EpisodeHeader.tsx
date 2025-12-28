import type { Episode } from "../../../../lib/content";
import { formatDate } from "../../../../lib/format";
import { ShareChips } from "../../../../components/ShareChips";
import { siteDefaults } from "../../../../lib/seo";

type EpisodeHeaderProps = {
  episode: Episode;
};

export function EpisodeHeader({ episode }: EpisodeHeaderProps) {
  const formattedDate = formatDate(episode.date);
  const currentUrl = `${siteDefaults.url}/podcast/${episode.slug}`;

  return (
    <header className="flex flex-col items-center gap-4" data-role="entry-header">
      <div data-role="headline">
        <h1 className="font-display text-[clamp(2rem,2vw+1.2rem,2.75rem)] leading-tight text-[var(--text-deep-purple)]">{episode.title}</h1>
      </div>
      <p className="text-base text-center text-[var(--text-muted)]" data-role="meta">
        {episode.guest} · {formattedDate}
        {episode.tags && episode.tags.length > 0 && ` · ${episode.tags.join(", ")}`}
      </p>
      <div data-role="share-chips" className="flex justify-center">
        <ShareChips title={episode.title} url={currentUrl} quote={episode.pullQuote} />
      </div>
    </header>
  );
}

