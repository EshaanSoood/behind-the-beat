"use client";

import { useId, useState } from "react";

import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";
import { SubscribeModal } from "../../../components/SubscribeModal";

export function NewsletterSignup() {
  const headingId = useId();
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  return (
    <>
      <section className="newsletter-section" role="region" aria-labelledby={headingId} data-newsletter="true">
        <div className="newsletter-shell surface-chamfer paper-grain">
          <div>
            <h2 id={headingId} className="font-display text-[clamp(1.5rem,1.4vw+1rem,2rem)] leading-tight text-brand-purple800">
              Be The First To Know
            </h2>
            <p className="text-brand-purple800/80">
              Subscribe to the newsletter and get{" "}
              <span className="font-display">Behind The Beat</span> before anyone else.
            </p>
          </div>
          <div className="newsletter-form">
            <ButtonTrapezoid
              type="button"
              tone="primary"
              size="md"
              onClick={() => setSubscribeOpen(true)}
            >
              Subscribe
            </ButtonTrapezoid>
          </div>
        </div>
      </section>
      <SubscribeModal isOpen={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </>
  );
}


