import { Section } from "../components/Section";

import { HomeHero } from "./(home)/components/HomeHero";
import { HomeTiles } from "./(home)/components/HomeTiles";

export default function HomePage() {
  return (
    <>
      <Section>
        <HomeHero />
      </Section>
      <Section>
        <HomeTiles />
      </Section>
    </>
  );
}
