"use client";

import { useEffect } from "react";
import { Section } from "../components/Section";
import { ButtonTrapezoid } from "../components/ButtonTrapezoid";

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
    <Section className="stack-lg">
      <div className="prose-measure">
        <h1>Something went wrong</h1>
        <p>
          We encountered an unexpected error. Please try again, or return to the home page to
          continue browsing.
        </p>
        <div className="error-state-actions">
          <ButtonTrapezoid onClick={reset} tone="primary" size="md">
            Try again
          </ButtonTrapezoid>
          <ButtonTrapezoid href="/" tone="neutral" size="md">
            Back to Home
          </ButtonTrapezoid>
        </div>
      </div>
    </Section>
  );
}



