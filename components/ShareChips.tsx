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
    <div className="share-chips stack-sm" role="group" aria-label="Share options">
      <h3 className="share-chips-heading">Share</h3>
      <div className="share-chips-list">
        <div className="share-chip-wrapper">
          <button
            type="button"
            ref={setCopyButtonRef}
            className="share-chip share-chip-copy"
            onClick={handleCopy}
            aria-label="Copy link"
          >
            <LinkIcon className="share-chip-icon" />
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
          <span className="visually-hidden" aria-live="polite" aria-atomic="true">
            {copied ? "Link copied to clipboard" : ""}
          </span>
        </div>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="share-chip share-chip-twitter"
          aria-label="Share on Twitter"
        >
          <XIcon className="share-chip-icon" />
          <span>Twitter</span>
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="share-chip share-chip-facebook"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="share-chip-icon" />
          <span>Facebook</span>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="share-chip share-chip-linkedin"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon className="share-chip-icon" />
          <span>LinkedIn</span>
        </a>
        <a
          href={shareLinks.email}
          className="share-chip share-chip-email"
          aria-label="Share via email"
        >
          <MailIcon className="share-chip-icon" />
          <span>Email</span>
        </a>
      </div>
    </div>
  );
}

