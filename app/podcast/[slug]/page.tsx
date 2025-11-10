import Image from "next/image";

import { Section } from "../../../components/Section";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { ShareChips } from "../../../components/ShareChips";
import { getEpisodeBySlug } from "../../../lib/content";
import { buildEntryMeta, siteDefaults } from "../../../lib/seo";
import { pickOgImage, sanitizeDescription } from "../../../lib/sharePreview";
import type { Metadata } from "next";

import { EpisodeHeader } from "./components/EpisodeHeader";
import { EpisodeNotes } from "./components/EpisodeNotes";
import { EpisodePlayer } from "./components/EpisodePlayer";

type PodcastEntryPageProps = {
  params: {
    slug: string;
  };
  searchParams?: {
    autoplay?: string;
  };
};

export async function generateMetadata({
  params,
}: PodcastEntryPageProps): Promise<Metadata> {
  const episode = getEpisodeBySlug(params.slug);

  if (!episode) {
    return {
      title: "Episode not found",
      description: "The episode you're looking for doesn't exist.",
    };
  }

  const description = sanitizeDescription(
    episode.pullQuote || episode.notes || episode.body.raw.split("\n")[0],
  );
  const image = pickOgImage(undefined, episode);

  return buildEntryMeta({
    title: episode.title,
    description,
    pathname: `/podcast/${episode.slug}`,
    image,
    type: "article",
    publishedTime: episode.date,
  });
}

export default function PodcastEntryPage({ params, searchParams }: PodcastEntryPageProps) {
  const episode = getEpisodeBySlug(params.slug);
  const currentUrl = `${siteDefaults.url}/podcast/${params.slug}`;
  const wantsAutoplay = searchParams?.autoplay === "1";

  if (!episode) {
    return (
      <Section as="article" className="stack-lg">
        <h1>Episode not found</h1>
        <p>The episode you&apos;re looking for doesn&apos;t exist.</p>
      </Section>
    );
  }

  return (
    <>
      <Section as="article" className="stack-lg">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Podcasts", href: "/podcast" },
            { label: episode.title },
          ]}
        />
        <EpisodeHeader episode={episode} />
        {episode.cover && (
          <div className="episode-cover chamfered chamfered-border ch-14">
            <Image
              src={episode.cover}
              alt={episode.alt}
              width={800}
              height={800}
              className="episode-cover-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      </Section>
      <Section className="stack-lg">
        <EpisodePlayer
          youtubeId={episode.youtubeId}
          title={episode.title}
          autoplay={wantsAutoplay}
        />
      </Section>
      <Section className="stack-lg">
        <EpisodeNotes episode={episode} />
      </Section>
      <Section className="stack-lg">
        <ShareChips title={episode.title} url={currentUrl} quote={episode.pullQuote} />
      </Section>
    </>
  );
}

