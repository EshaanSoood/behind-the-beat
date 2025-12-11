import { Section } from "../../components/Section";
import { generateMetadata as genMeta } from "../../lib/seo";
import { allEpisodesSorted } from "../../lib/content";

import { PodcastList } from "./components/PodcastList";

export const metadata = genMeta({
  title: "Podcasts",
  description: "Intimate conversations with artists about their creative process and the stories behind their music.",
  path: "/podcast",
});

// Revalidate every 60 seconds to pick up new content
export const revalidate = 60;

export default async function PodcastPage() {
  const episodes = await allEpisodesSorted();

  return (
    <Section className="flex flex-col gap-12" data-page="podcast-list">
      <PodcastList initialEpisodes={episodes} />
    </Section>
  );
}

