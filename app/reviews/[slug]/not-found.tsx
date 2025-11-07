import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";

export default function NotFound() {
  return (
    <div className="not-found-state">
      <h1>Review not found</h1>
      <p>The review you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      <div className="not-found-state-actions">
        <ButtonTrapezoid href="/reviews" tone="primary" size="md">
          Browse Reviews
        </ButtonTrapezoid>
        <ButtonTrapezoid href="/" tone="neutral" size="md">
          Back to Home
        </ButtonTrapezoid>
      </div>
    </div>
  );
}

