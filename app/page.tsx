import { Section } from "../components/Section";
import { getAllReviews, getAllEpisodes } from "../lib/content";
import { generateMetadata as genMeta } from "../lib/seo";

import { HomeHero } from "./(home)/components/HomeHero";
import { NewsletterSignup } from "./(home)/components/NewsletterSignup";
import { HomeTiles } from "./(home)/components/HomeTiles";

export const metadata = genMeta({
  title: undefined,
  description:
    "A cozy digital magazine for music reviews and artist interviews. Discover thoughtful album reviews with tracklists, and intimate podcast conversations with musicians.",
  path: "/",
});

export default async function HomePage() {
  const reviews = await getAllReviews();
  const episodes = await getAllEpisodes();

  return (
    <>
      <HomeHero />
      <Section className="home-feed-section space-y-16 snap-y snap-mandatory md:snap-none" as="section" data-site-container="">
        <HomeTiles reviews={reviews} episodes={episodes} />
        <NewsletterSignup />
      </Section>
    </>
  );
}
