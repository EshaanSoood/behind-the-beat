import { PodcastListItem } from "./PodcastListItem";

export function PodcastList() {
  return (
    <div>
      <h1>Podcast Episodes</h1>
      <ul>
        <PodcastListItem />
        <PodcastListItem placeholder="Another episode placeholder." />
      </ul>
    </div>
  );
}

