import { Section } from "../../../components/Section";

export function HomeHero() {
  return (
    <Section as="section" className="home-hero-section hidden md:block mt-8 mb-0" aria-labelledby="home-hero-heading">
      <div className="home-hero-shell surface-chamfer paper-grain flex flex-col items-center gap-3 py-6 px-0 min-h-[var(--hero-min-height)] bg-[var(--surface)] shadow-soft">
        <div className="home-hero-copy flex flex-col gap-3 text-center w-full">
          <h1 id="home-hero-heading" className="font-display">Welcome To Behind The Beat</h1>
          <p className="text-lg text-brand-purple800/80">
            A quiet corner of the internet away from algorithmic noise.
            <br />
            Bringingon the ground coverage of live music and deep dives into artists we love and their process
          </p>
        </div>
      </div>
    </Section>
  );
}


