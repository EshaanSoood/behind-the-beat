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
      <p>We couldn&apos;t load this review. Please try again.</p>
      <div className="error-state-actions">
        <ButtonTrapezoid onClick={reset} tone="primary" size="md">
          Try again
        </ButtonTrapezoid>
        <ButtonTrapezoid href="/reviews" tone="neutral" size="md">
          Back to Reviews
        </ButtonTrapezoid>
      </div>
    </div>
  );
}

