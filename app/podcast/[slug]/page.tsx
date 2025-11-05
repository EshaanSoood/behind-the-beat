import { Section } from "../../../components/Section";

import { EpisodeHeader } from "./components/EpisodeHeader";
import { EpisodeNotes } from "./components/EpisodeNotes";
import { EpisodePlayer } from "./components/EpisodePlayer";

type PodcastEntryPageProps = {
  params: {
    slug: string;
  };
};

export default function PodcastEntryPage({ params }: PodcastEntryPageProps) {
  return (
    <>
      <Section>
        <EpisodeHeader />
        <p>Loaded podcast for: {params.slug}</p>
      </Section>
      <Section>
        <EpisodePlayer />
      </Section>
      <Section>
        <EpisodeNotes />
      </Section>
    </>
  );
}

