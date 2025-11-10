import Image from "next/image";

import { Section } from "../../../components/Section";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { ShareChips } from "../../../components/ShareChips";
import { getReviewBySlug } from "../../../lib/content";
import { buildEntryMeta, siteDefaults } from "../../../lib/seo";
import { pickOgImage, sanitizeDescription } from "../../../lib/sharePreview";
import type { Metadata } from "next";

import { ReviewBody } from "./components/ReviewBody";
import { ReviewHeader } from "./components/ReviewHeader";
import { TracklistBox } from "./components/TracklistBox";

type ReviewEntryPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: ReviewEntryPageProps): Promise<Metadata> {
  const review = getReviewBySlug(params.slug);

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

export default function ReviewEntryPage({ params }: ReviewEntryPageProps) {
  const review = getReviewBySlug(params.slug);
  const currentUrl = `${siteDefaults.url}/reviews/${params.slug}`;

  if (!review) {
    return (
      <Section as="article" className="stack-lg">
        <h1>Review not found</h1>
        <p>The review you&apos;re looking for doesn&apos;t exist.</p>
      </Section>
    );
  }

  return (
    <>
      <Section as="article" className="stack-lg">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Reviews", href: "/reviews" },
            { label: review.title },
          ]}
        />
        <ReviewHeader review={review} />
        {review.cover && (
          <div className="review-cover chamfered chamfered-border ch-14">
            <Image
              src={review.cover}
              alt={review.alt}
              width={800}
              height={800}
              className="review-cover-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      </Section>
      <Section className="stack-lg">
        <ReviewBody review={review} />
      </Section>
      <Section className="stack-lg">
        <TracklistBox review={review} />
      </Section>
      <Section className="stack-lg">
        <ShareChips title={review.title} url={currentUrl} quote={review.pullQuote} />
      </Section>
    </>
  );
}

