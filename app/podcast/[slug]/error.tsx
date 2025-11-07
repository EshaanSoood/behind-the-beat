"use client";

import { useEffect } from "react";
import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-state">
      <h1>Something went wrong</h1>
      <p>We couldn&apos;t load this episode. Please try again.</p>
      <div className="error-state-actions">
        <ButtonTrapezoid onClick={reset} tone="primary" size="md">
          Try again
        </ButtonTrapezoid>
        <ButtonTrapezoid href="/podcast" tone="neutral" size="md">
          Back to Podcasts
        </ButtonTrapezoid>
      </div>
    </div>
  );
}

