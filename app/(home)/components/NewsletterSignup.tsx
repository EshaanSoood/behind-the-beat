"use client";

import { FormEvent, useId, useState } from "react";

import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";

type FormState = "idle" | "error" | "success";

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function NewsletterSignup() {
  const headingId = useId();
  const inputId = useId();
  const feedbackId = useId();

  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string>(
    "Subscribe for monthly reviews and conversations delivered straight to your inbox."
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    if (!EMAIL_PATTERN.test(email)) {
      setState("error");
      setMessage("Enter a valid email address so we can reach you.");
      return;
    }

    setState("success");
    setMessage("Thanks for subscribing! Please check your inbox for a confirmation email.");
    form.reset();
  }

  return (
    <section className="newsletter-section" role="region" aria-labelledby={headingId} data-newsletter="true">
      <div className="newsletter-shell surface-chamfer paper-grain">
        <div>
          <p className="kicker text-brand-purple600">Newsletter</p>
          <h2 id={headingId}>Get the behind-the-scenes first</h2>
          <p className="text-brand-purple800/80">
            Early access to new interviews, thoughtful album write-ups, and the occasional mixtape.
          </p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit} noValidate aria-describedby={feedbackId}>
          <label htmlFor={inputId}>Email address</label>
          <input
            id={inputId}
            type="email"
            name="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={state === "error"}
            aria-describedby={feedbackId}
            placeholder="you@example.com"
          />
          <ButtonTrapezoid type="submit" tone="primary" size="md">
            Subscribe
          </ButtonTrapezoid>
        </form>
        <p
          id={feedbackId}
          className="newsletter-feedback"
          role="status"
          aria-live={state === "error" ? "assertive" : "polite"}
        >
          {message}
        </p>
      </div>
    </section>
  );
}


