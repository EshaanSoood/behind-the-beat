import { Section } from "../../../components/Section";
import { EntryColumn } from "../../../components/EntryColumn";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { PullQuote } from "../../../components/PullQuote";
import { getReviewBySlug } from "../../../lib/content";
import { buildEntryMeta, siteDefaults } from "../../../lib/seo";
import { pickOgImage, sanitizeDescription } from "../../../lib/sharePreview";
import type { Metadata } from "next";

import { ReviewBody } from "./components/ReviewBody";
import { ReviewHeader } from "./components/ReviewHeader";
import { TracklistBox } from "./components/TracklistBox";

type ReviewEntryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ReviewEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  if (!review) {
    return {
      title: "Review not found",
      description: "The review you're looking for doesn't exist.",
    };
  }

  const description = sanitizeDescription(review.pullQuote || review.summary);
  const image = pickOgImage(review);

  return buildEntryMeta({
    title: review.title,
    description,
    pathname: `/reviews/${review.slug}`,
    image,
    type: "article",
    publishedTime: review.date,
  });
}

export default async function ReviewEntryPage({ params }: ReviewEntryPageProps) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  const currentUrl = `${siteDefaults.url}/reviews/${slug}`;

  if (!review) {
    return (
      <Section as="article" className="flex flex-col gap-6">
        <h1 className="font-display text-[clamp(1.75rem,1.6vw+1rem,2.25rem)] leading-tight text-brand-purple800">
          Review not found
        </h1>
        <p className="text-base text-neutral-ui-textMuted">
          The review you&apos;re looking for doesn&apos;t exist.
        </p>
      </Section>
    );
  }

  return (
    <div data-page="review-entry">
      <Section as="article" className="flex flex-col gap-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Reviews", href: "/reviews" },
            { label: review.title },
          ]}
        />
        <EntryColumn variant="review">
          <ReviewHeader review={review} />
          {review.pullQuote && (
            <div className="mt-6" data-role="pull-quote">
              <PullQuote cite={review.artist}>{review.pullQuote}</PullQuote>
            </div>
          )}
        </EntryColumn>
      </Section>
      <Section className="flex flex-col gap-8">
        <EntryColumn variant="review">
          <ReviewBody review={review} />
        </EntryColumn>
      </Section>
      <Section className="flex flex-col gap-8">
        <EntryColumn variant="review">
          <TracklistBox review={review} />
        </EntryColumn>
      </Section>
    </div>
  );
}

