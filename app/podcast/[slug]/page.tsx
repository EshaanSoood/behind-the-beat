import { Section } from "../../../components/Section";
import { EntryColumn } from "../../../components/EntryColumn";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { getEpisodeBySlug } from "../../../lib/content";
import { buildEntryMeta, siteDefaults } from "../../../lib/seo";
import { pickOgImage, sanitizeDescription } from "../../../lib/sharePreview";
import type { Metadata } from "next";

import { EpisodeHeader } from "./components/EpisodeHeader";
import { EpisodeNotes } from "./components/EpisodeNotes";
import { EpisodePlayer } from "./components/EpisodePlayer";

type PodcastEntryPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    autoplay?: string;
  }>;
};

export async function generateMetadata({
  params,
}: PodcastEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

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

export default async function PodcastEntryPage({ params, searchParams }: PodcastEntryPageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  const currentUrl = `${siteDefaults.url}/podcast/${slug}`;
  const resolvedSearchParams = await searchParams;
  const wantsAutoplay = resolvedSearchParams?.autoplay === "1";

  if (!episode) {
    return (
      <Section as="article" className="flex flex-col gap-6">
        <h1 className="font-display text-[clamp(1.75rem,1.6vw+1rem,2.25rem)] leading-tight text-brand-purple800">
          Episode not found
        </h1>
        <p className="text-base text-neutral-ui-textMuted">
          The episode you&apos;re looking for doesn&apos;t exist.
        </p>
      </Section>
    );
  }

  return (
    <div data-page="podcast-entry">
      {/* Breadcrumbs and Header - wider container */}
      <Section as="article" className="flex flex-col gap-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Podcasts", href: "/podcast" },
            { label: episode.title },
          ]}
        />

        {/* Header - wider container for title + metadata */}
        <div className="podcast-header-container mx-auto flex w-full max-w-[900px] flex-col px-6">
          <EpisodeHeader episode={episode} />
        </div>
      </Section>

      {/* Player - wider container for video */}
      <Section className="flex flex-col gap-8">
        <div className="podcast-player-container mx-auto w-full max-w-[900px] px-6">
          <EpisodePlayer
            youtubeId={episode.youtubeId}
            title={episode.title}
            autoplay={wantsAutoplay}
          />
        </div>
      </Section>

      {/* Episode notes - constrained prose width for readability */}
      <Section className="mt-8 flex flex-col gap-8">
        <EntryColumn variant="podcast">
          <EpisodeNotes episode={episode} />
        </EntryColumn>
      </Section>
    </div>
  );
}

