"use client";

import { useState } from "react";

import { FacebookIcon } from "./icons/Facebook";
import { MailIcon } from "./icons/Mail";
import { WhatsAppIcon } from "./icons/WhatsApp";
import { ButtonTrapezoid } from "./ButtonTrapezoid";

type ShareChipsProps = {
  title: string;
  url: string;
  quote?: string;
};

const shareButtonClassName =
  "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-brand-purple800 border border-neutral-ui-border bg-neutral-ui-offwhite hover:bg-neutral-ui-bg transition focus-chamfer";

export function ShareChips({ title, url, quote }: ShareChipsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = quote
    ? encodeURIComponent(`${title} — ${quote}`)
    : encodedTitle;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  return (
    <div className="flex flex-col gap-4" role="group" aria-label="Share options">
      <h3 className="text-2xl font-semibold text-neutral-ui-text">Share</h3>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={shareButtonClassName}
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="h-4 w-4" />
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={shareButtonClassName}
          aria-label="Share on WhatsApp"
        >
          <WhatsAppIcon className="h-4 w-4" />
        </a>
        <a
          href={shareLinks.email}
          className={shareButtonClassName}
          aria-label="Share via email"
        >
          <MailIcon className="h-4 w-4" />
        </a>
        <div className="share-copy-button">
          <ButtonTrapezoid
            onClick={handleCopy}
            size="sm"
          >
            {copied ? "Copied!" : "Copy Link"}
          </ButtonTrapezoid>
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            {copied ? "Link copied to clipboard" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

