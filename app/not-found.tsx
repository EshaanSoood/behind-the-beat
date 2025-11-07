import { Section } from "../components/Section";
import { ButtonTrapezoid } from "../components/ButtonTrapezoid";

export default function NotFound() {
  return (
    <Section className="stack-lg">
      <div className="prose-measure">
        <h1>Page not found</h1>
        <p>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. You can browse
          our reviews and podcast episodes, or return to the home page.
        </p>
        <div className="not-found-state-actions">
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

