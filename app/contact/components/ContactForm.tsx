"use client";

import { useState, FormEvent } from "react";
import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";

export function ContactForm() {
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/mkgqqljp", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("Thank you! Your message has been sent.");
        (event.target as HTMLFormElement).reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          setStatus(`Error: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
        } else {
          setStatus("Sorry, there was an error sending your message. Please try again.");
        }
      }
    } catch (error) {
      setStatus("Sorry, there was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article className="flex flex-col gap-8">
      <h1 className="font-display text-[clamp(1.5rem,1.4vw+1rem,2rem)] leading-tight text-brand-purple800">
        Contact
      </h1>
      
      <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-[var(--text)]">
        <p>
          Feel free to send us some mail at: <a href="mailto:info@behindbeats.com" className="hover:underline">info@behindbeats.com</a>
        </p>
        <p>
          If you&apos;re a reader/listener, we&apos;d love to hear from you. Please feel free to email us or fill the form below.
        </p>
        <p>
          If you&apos;re an artist and would like to send us your album to review, please fill out the form below or email us. Please be sure to send a download-free link. We do not use Spotify in this house so anything apart from that should be good.
        </p>
        <p>
          We only review things that can be spoken about positively from our own <u>subjective</u> point of view.
        </p>
      </div>

      <form
        action="https://formspree.io/f/mkgqqljp"
        method="POST"
        onSubmit={handleSubmit}
        className="contact-form flex flex-col gap-6"
        noValidate
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="field-group flex flex-col gap-2">
            <label htmlFor="cf-first" className="text-sm font-medium text-[var(--text)]">
              First Name
            </label>
            <input
              type="text"
              id="cf-first"
              name="first_name"
              required
              className="focus-chamfer surface-chamfer border border-neutral-ui-border bg-neutral-ui-surface px-4 py-3 text-base text-neutral-ui-text shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-purple800"
            />
          </div>
          <div className="field-group flex flex-col gap-2">
            <label htmlFor="cf-last" className="text-sm font-medium text-[var(--text)]">
              Last Name
            </label>
            <input
              type="text"
              id="cf-last"
              name="last_name"
              required
              className="focus-chamfer surface-chamfer border border-neutral-ui-border bg-neutral-ui-surface px-4 py-3 text-base text-neutral-ui-text shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-purple800"
            />
          </div>
        </div>
        <div className="field-group flex flex-col gap-2">
          <label htmlFor="cf-email" className="text-sm font-medium text-[var(--text)]">
            Email
          </label>
          <input
            type="email"
            id="cf-email"
            name="email"
            required
            className="focus-chamfer surface-chamfer border border-neutral-ui-border bg-neutral-ui-surface px-4 py-3 text-base text-neutral-ui-text shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-purple800"
          />
        </div>
        <div className="field-group flex flex-col gap-2">
          <label htmlFor="cf-subject" className="text-sm font-medium text-[var(--text)]">
            Subject
          </label>
          <input
            type="text"
            id="cf-subject"
            name="subject"
            required
            className="focus-chamfer surface-chamfer border border-neutral-ui-border bg-neutral-ui-surface px-4 py-3 text-base text-neutral-ui-text shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-purple800"
          />
        </div>
        <div className="field-group flex flex-col gap-2">
          <label htmlFor="cf-message" className="text-sm font-medium text-[var(--text)]">
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={6}
            required
            className="focus-chamfer surface-chamfer border border-neutral-ui-border bg-neutral-ui-surface px-4 py-3 text-base text-neutral-ui-text shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-purple800 resize-y"
          />
        </div>
        <div className="flex flex-col gap-4">
          <ButtonTrapezoid
            type="submit"
            disabled={isSubmitting}
            size="md"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </ButtonTrapezoid>
          {status && (
            <div className="form-status text-sm text-[var(--text)]" aria-live="polite" aria-atomic="true">
              {status}
            </div>
          )}
        </div>
      </form>
    </article>
  );
}

