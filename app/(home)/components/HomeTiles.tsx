import { getAllReviews, getAllEpisodes } from "../../../lib/content";
import { HomeTilesClient } from "./HomeTilesClient";

export function HomeTiles() {
  const reviews = getAllReviews();
  const episodes = getAllEpisodes();

  return (
    <HomeTilesClient
      reviews={reviews}
      episodes={episodes}
      sectionLabel="Latest stories and podcasts"
    />
  );
}

