import { PodcastStrip } from "../../../components/PodcastStrip";
import type { Episode } from "../../../lib/content";

type PodcastListItemProps = {
  episode: Episode;
};

export function PodcastListItem({ episode }: PodcastListItemProps) {
  return (
    <li>
      <PodcastStrip episode={episode} />
    </li>
  );
}

