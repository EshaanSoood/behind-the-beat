import Image from "next/image";
import { SpecialH1 } from "../../../components/SpecialH1";

export function MissionProse() {
  return (
    <article className="flex flex-col gap-8">
      <SpecialH1>Our Mission</SpecialH1>
      
      {/* Mission body - full width */}
      <div className="mission-body" data-section="mission-body" data-role="mission-body">
        <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-[var(--text)]">
          <h2 className="mb-2 font-display text-[var(--text-h2)] leading-tight text-[var(--text-strong)]">
            Welcome to Behind The Beat
          </h2>
          <p>
            A quiet corner of the internet, far from algorithmic noise.
          </p>
          <p>
            We&apos;re an independent music commentary platform run by people who care deeply about music, not metrics. Our goal is simple, to bring you artists and albums the way a friend would, with warmth and excitement.
          </p>
          <p>
            We believe that looking behind the curtain doesn&apos;t break the magic, it deepens it. Through thoughtful conversations with artists and reviews written after many deep listens, we hope to capture that spark and share it with you.
          </p>
          <p>
            We strongly believe that every piece of art captures a little bit of the artist&apos;s essence and our mission at Behind The Beat is to bring that to the forefront. Every interview, every deep dive, every review is written with love and curiosity.
          </p>
          <p>
            Come on in.
          </p>
        </div>
      </div>

      {/* Meet The Team section */}
      <div className="flex flex-col gap-8">
        <h2 className="mb-4 font-display text-[var(--text-h2)] leading-tight text-[var(--text-strong)]">
          Meet The Team
        </h2>

        {/* Three-column layout: Team member, divider, team member */}
        <div className="mission-columns-wrapper relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          {/* Left column: Eshaan Sood */}
          <div className="mission-editor" data-section="mission-editor" data-role="mission-editor">
            <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-[var(--text)]">
              <p>
                Eshaan Sood is a musician and fellow traveller of the human experience. Originally from New Delhi, India, he currently lives in New York.
              </p>
              <p>
                I started Behind The Beat because at the end of the day, the only recommendations I take seriously and actually check out are ones from real people.
              </p>
            </div>
          </div>

          {/* Center column: Slanted divider - visible on desktop */}
          <div
            className="mission-divider hidden md:block"
            data-role="mission-divider"
            aria-hidden="true"
          />

          {/* Right column: Reagan Grant */}
          <div className="mission-editor" data-section="mission-editor" data-role="mission-editor">
            <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-[var(--text)]">
              <div className="mb-4">
                <Image
                  src="/images/raegan.JPG"
                  alt="Reagan Grant"
                  width={200}
                  height={200}
                  className="w-full max-w-[200px] h-auto object-cover"
                  sizes="(min-width: 768px) 200px, 100vw"
                />
              </div>
              <p>
                Reagan Grant is a music journalist based in Bushwick Brooklyn. With a Spotify listening age of 74, her favorite artists include Jimi Hendrix, The Doors, Nina Simone, and The Zombies. She writes narrative driven articles, stringing facts along a humanistic storyline. Her writing includes heavy imagery with tactile language because musical and arts+culture scenes are incredible sensory experiences. She hopes to unearth the gems of what makes New York City&apos;s music past so rich and what will make its future so vibrant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

