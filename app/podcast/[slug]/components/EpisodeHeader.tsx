import type { Episode } from "../../../../lib/content";
import { formatDate } from "../../../../lib/format";
import { SpecialH1 } from "../../../../components/SpecialH1";
import { ShareChips } from "../../../../components/ShareChips";
import { siteDefaults } from "../../../../lib/seo";

type EpisodeHeaderProps = {
  episode: Episode;
};

export function EpisodeHeader({ episode }: EpisodeHeaderProps) {
  const formattedDate = formatDate(episode.date);
  const currentUrl = `${siteDefaults.url}/podcast/${episode.slug}`;

  return (
    <header className="entry-header flex flex-col gap-4" data-role="entry-header">
      <div data-role="headline">
        <SpecialH1>{episode.title}</SpecialH1>
      </div>
      <p className="text-base text-[var(--text-muted)]" data-role="meta">
        {episode.guest} · {formattedDate}
        {episode.tags && episode.tags.length > 0 && ` · ${episode.tags.join(", ")}`}
      </p>
      <div data-role="share-chips">
        <ShareChips title={episode.title} url={currentUrl} quote={episode.pullQuote} />
      </div>
    </header>
  );
}

