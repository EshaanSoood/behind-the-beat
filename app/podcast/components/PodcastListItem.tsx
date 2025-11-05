type PodcastListItemProps = {
  placeholder?: string;
};

export function PodcastListItem({ placeholder = "PodcastListItem placeholder." }: PodcastListItemProps) {
  return <li>{placeholder}</li>;
}

