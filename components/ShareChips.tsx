"use client";

import { useState } from "react";

import { LinkIcon } from "./icons/Link";
import { XIcon } from "./icons/X";
import { FacebookIcon } from "./icons/Facebook";
import { LinkedInIcon } from "./icons/LinkedIn";
import { MailIcon } from "./icons/Mail";

type ShareChipsProps = {
  title: string;
  url: string;
  quote?: string;
};

const chipClassName =
  "focus-chamfer surface-chamfer inline-flex items-center gap-2 border border-neutral-ui-border bg-neutral-ui-offwhite px-3 py-2 text-sm font-medium text-neutral-ui-text shadow-soft transition hover:bg-neutral-ui-bg";

export function ShareChips({ title, url, quote }: ShareChipsProps) {
  const [copied, setCopied] = useState(false);
  const [copyButtonRef, setCopyButtonRef] = useState<HTMLButtonElement | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        // Restore focus to button after feedback
        copyButtonRef?.focus();
      }, 2000);
    } catch (err) {
      // Fallback for browsers without clipboard API
      console.error("Failed to copy:", err);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = quote
    ? encodeURIComponent(`${title} — ${quote}`)
    : encodedTitle;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  return (
    <div className="flex flex-col gap-4" role="group" aria-label="Share options">
      <h3 className="text-2xl font-semibold text-neutral-ui-text">Share</h3>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative inline-flex items-center">
          <button
            type="button"
            ref={setCopyButtonRef}
            className={chipClassName}
            onClick={handleCopy}
            aria-label="Copy link"
          >
            <LinkIcon className="h-4 w-4 text-brand-purple800" />
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            {copied ? "Link copied to clipboard" : ""}
          </span>
        </div>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={chipClassName}
          aria-label="Share on Twitter"
        >
          <XIcon className="h-4 w-4 text-brand-purple800" />
          <span>Twitter</span>
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={chipClassName}
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="h-4 w-4 text-brand-purple800" />
          <span>Facebook</span>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={chipClassName}
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon className="h-4 w-4 text-brand-purple800" />
          <span>LinkedIn</span>
        </a>
        <a
          href={shareLinks.email}
          className={chipClassName}
          aria-label="Share via email"
        >
          <MailIcon className="h-4 w-4 text-brand-purple800" />
          <span>Email</span>
        </a>
      </div>
    </div>
  );
}

