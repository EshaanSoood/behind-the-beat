"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FocusEvent, PointerEvent, MouseEvent } from "react";
import { useId, useMemo, useState } from "react";

import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";

declare global {
  interface Window {
    __overlayClicks?: Record<number, number>;
  }
}

type InteractionMode = "rest" | "hover" | "focus";

type HomeCardProps = {
  variant: "review" | "podcast";
  title: string;
  href: string;
  metaPrimary: string;
  summary: string;
  pullQuote: string;
  published: {
    display: string;
    iso: string;
  };
  media: {
    src: string;
    alt: string;
    priority?: boolean;
    width: number;
    height: number;
  };
  cta: {
    href: string;
    label: string;
    tone: "primary" | "neutral";
  };
  overlayAction?: {
    href: string;
    label: string;
  };
};

export function HomeCard({
  variant,
  title,
  href,
  metaPrimary,
  summary,
  pullQuote,
  published,
  media,
  cta,
  overlayAction,
}: HomeCardProps) {
  const headingId = useId();
  const publishedId = useId();
  const isPodcastCard = variant === "podcast";
  const [interactionMode, setInteractionMode] = useState<InteractionMode>("rest");
  const isInteracting = interactionMode !== "rest";
  const { displaySummary, displayPullQuote } = useMemo(() => {
    const trimmedSummary = summary.trim();
    const trimmedPullQuote = pullQuote.trim();
    const computedPullQuote = trimmedPullQuote.length > 0 ? trimmedPullQuote : trimmedSummary;
    const computedSummary = trimmedSummary.length > 0 ? trimmedSummary : trimmedPullQuote;
    return {
      displaySummary: computedSummary,
      displayPullQuote: computedPullQuote,
    };
  }, [pullQuote, summary]);
  const router = useRouter();

  function registerOverlayClick(event: MouseEvent<HTMLButtonElement>) {
    if (typeof window === "undefined") {
      return;
    }
    const cardElement = event.currentTarget.closest(".home-card");
    const indexValue = cardElement?.getAttribute("data-home-card-acceptance");
    if (!indexValue) {
      return;
    }
    const index = Number.parseInt(indexValue, 10);
    if (Number.isNaN(index)) {
      return;
    }
    window.__overlayClicks = window.__overlayClicks ?? {};
    window.__overlayClicks[index] = (window.__overlayClicks[index] ?? 0) + 1;
  }

  function handleOverlayClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    registerOverlayClick(event);
    if (overlayAction) {
      const targetHref = overlayAction.href;
      window.requestAnimationFrame(() => {
        router.push(targetHref);
      });
    }
  }

  function setHoverMode() {
    setInteractionMode("hover");
  }

  function setFocusMode() {
    setInteractionMode("focus");
  }

  function clearInteraction(event: FocusEvent<HTMLElement> | PointerEvent<HTMLElement>) {
    const activeElement = typeof document !== "undefined" ? (document.activeElement as Element | null) : null;
    if (activeElement && event.currentTarget.contains(activeElement)) {
      setInteractionMode("focus");
      return;
    }
    setInteractionMode("rest");
  }

  const overlayPullQuote = (
    <p
      className="home-card-pullquote line-clamp-3"
      aria-hidden={isPodcastCard ? undefined : isInteracting ? "false" : "true"}
    >
      {displayPullQuote}
    </p>
  );

  return (
    <article
      className={`paper-grain surface-chamfer home-card home-card--${variant}`}
      data-card="true"
      data-type={variant}
      role="listitem"
      data-interacting={isInteracting ? "true" : "false"}
      data-interaction={interactionMode}
      aria-labelledby={headingId}
      onPointerEnter={setHoverMode}
      onPointerLeave={clearInteraction}
      onFocusCapture={setFocusMode}
      onBlurCapture={clearInteraction}
    >
      <header className="home-card-head">
        <h3 id={headingId} className="home-card-title-heading">
          <Link href={href} className="focus-chamfer home-card-title">
            <span className="line-clamp-2">{title}</span>
          </Link>
        </h3>
        <p className="home-card-meta home-card-meta-primary">{metaPrimary}</p>
        <time
          id={publishedId}
          className="home-card-meta home-card-meta-secondary"
          dateTime={published.iso}
        >
          {published.display}
        </time>
      </header>

      <div
        className="paper-grain surface-chamfer home-card-media ratio-1x1"
        data-media-layout={isPodcastCard ? "split" : undefined}
      >
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          priority={media.priority}
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 640px) 340px, 88vw"
          className="home-card-media-image"
          loading={media.priority ? "eager" : "lazy"}
          decoding="async"
        />
        {isPodcastCard ? (
          <div className="home-card-media-overlay" aria-live="polite">
            {overlayPullQuote}
          </div>
        ) : overlayAction ? (
          <button
            type="button"
            className="focus-chamfer home-card-media-overlay"
            aria-label={overlayAction.label}
            aria-hidden={isInteracting ? "false" : "true"}
            onClick={handleOverlayClick}
          >
            <svg aria-hidden="true" width="52" height="52" viewBox="0 0 52 52" fill="currentColor">
              <path d="M21 16.667 37 26l-16 9.333V16.667Z" />
            </svg>
            {overlayPullQuote}
          </button>
        ) : (
          <div className="home-card-media-overlay" aria-hidden={isInteracting ? "false" : "true"}>
            {overlayPullQuote}
          </div>
        )}
      </div>

      <div className="home-card-copy">
        <p className="home-card-text line-clamp-3" aria-hidden={isInteracting ? "true" : "false"}>
          {displaySummary}
        </p>
      </div>

      <div className="card-actions">
        <ButtonTrapezoid href={cta.href} tone={cta.tone} size="sm" aria-describedby={publishedId}>
          {cta.label}
        </ButtonTrapezoid>
      </div>
    </article>
  );
}
