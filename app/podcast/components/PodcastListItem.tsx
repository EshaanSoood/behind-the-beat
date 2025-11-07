import { TrapezoidCard } from "../../../components/TrapezoidCard";
import { Tag } from "../../../components/Tag";
import type { Episode } from "../../../lib/content";
import { formatDate } from "../../../lib/format";

type PodcastListItemProps = {
  episode: Episode;
};

export function PodcastListItem({ episode }: PodcastListItemProps) {
  const formattedDate = formatDate(episode.date);
  const summary = episode.notes || episode.body.raw.split("\n")[0];
  const displayTags = episode.tags?.slice(0, 3) || [];

  return (
    <li>
      <TrapezoidCard
        variant="solid"
        as="article"
        title={episode.title}
        kicker={episode.guest}
        meta={formattedDate}
        href={`/podcast/${episode.slug}`}
      >
        {summary.split(".")[0]}.
        {displayTags.length > 0 && (
          <div className="episode-item-tags">
            {displayTags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        )}
      </TrapezoidCard>
    </li>
  );
}

