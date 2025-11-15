import Image from "next/image";

import { Section } from "../../../components/Section";

export function HomeHero() {
  return (
    <Section as="section" className="home-hero-section" aria-labelledby="home-hero-heading">
      <div className="home-hero-shell surface-chamfer paper-grain">
        <div className="home-hero-badge surface-chamfer" aria-hidden="true">
          <Image src="/images/logo.png" alt="" width={56} height={56} priority />
        </div>
        <div className="home-hero-copy">
          <h1 id="home-hero-heading">Welcome to Behind the Beat</h1>
          <p className="text-lg text-brand-purple800/80">
            Interviews and reviews crafted for slow listening, deep dives, and late-night inspiration.
          </p>
        </div>
      </div>
      <p className="home-hero-credit">
        Illustration direction by Behind the Beat. Designed for a calm, focused read.
      </p>
    </Section>
  );
}


