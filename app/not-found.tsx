import { Section } from "../components/Section";
import { ButtonTrapezoid } from "../components/ButtonTrapezoid";

export default function NotFound() {
  return (
    <Section className="flex flex-col items-center gap-8">
      <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-neutral-ui-text">
        <h1 className="font-display text-[clamp(1.75rem,1.6vw+1rem,2.25rem)] leading-tight text-brand-purple800">
          Page not found
        </h1>
        <p className="text-neutral-ui-textMuted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. You can browse
          our reviews and podcast episodes, or return to the home page.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonTrapezoid href="/" tone="primary" size="md">
            Back to Home
          </ButtonTrapezoid>
          <ButtonTrapezoid href="/reviews" tone="neutral" size="md">
            Browse Reviews
          </ButtonTrapezoid>
          <ButtonTrapezoid href="/podcast" tone="neutral" size="md">
            Browse Podcasts
          </ButtonTrapezoid>
        </div>
      </div>
    </Section>
  );
}

