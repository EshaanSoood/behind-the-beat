import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";

export default function NotFound() {
  return (
    <div className="not-found-state">
      <h1>Episode not found</h1>
      <p>The episode you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      <div className="not-found-state-actions">
        <ButtonTrapezoid href="/podcast" tone="primary" size="md">
          Browse Episodes
        </ButtonTrapezoid>
        <ButtonTrapezoid href="/" tone="neutral" size="md">
          Back to Home
        </ButtonTrapezoid>
      </div>
    </div>
  );
}

