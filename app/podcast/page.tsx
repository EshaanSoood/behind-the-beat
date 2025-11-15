import { Section } from "../../components/Section";
import { generateMetadata as genMeta } from "../../lib/seo";
import { allEpisodesSorted } from "../../lib/content";

import { PodcastList } from "./components/PodcastList";

export const metadata = genMeta({
  title: "Podcasts",
  description: "Intimate conversations with artists about their creative process and the stories behind their music.",
  path: "/podcast",
});

export default function PodcastPage() {
  const episodes = allEpisodesSorted();

  return (
    <Section className="flex flex-col gap-12" data-page="podcast-list">
      <PodcastList initialEpisodes={episodes} />
    </Section>
  );
}

