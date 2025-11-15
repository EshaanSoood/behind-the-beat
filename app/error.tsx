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
    <Section className="flex flex-col items-center gap-8">
      <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-neutral-ui-text">
        <h1 className="font-display text-[clamp(1.75rem,1.6vw+1rem,2.25rem)] leading-tight text-brand-purple800">
          Something went wrong
        </h1>
        <p className="text-neutral-ui-textMuted">
          We encountered an unexpected error. Please try again, or return to the home page to
          continue browsing.
        </p>
        <div className="flex flex-wrap items-center gap-3">
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



