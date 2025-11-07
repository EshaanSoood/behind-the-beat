import { Section } from "../components/Section";
import { generateMetadata as genMeta } from "../lib/seo";

import { HomeHero } from "./(home)/components/HomeHero";
import { HomeTiles } from "./(home)/components/HomeTiles";

export const metadata = genMeta({
  title: undefined,
  description: "A cozy digital magazine for music reviews and artist interviews. Discover thoughtful album reviews with tracklists, and intimate podcast conversations with musicians.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Section as="article" className="home-hero-section">
        <HomeHero />
      </Section>
      <Section className="home-feed-section">
        <HomeTiles />
      </Section>
    </>
  );
}
