"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useId, useMemo } from "react";

import { ButtonTrapezoid } from "../../../components/ButtonTrapezoid";
import { ElectricBorder } from "../../../components/ElectricBorder";

declare global {
  interface Window {
    __overlayClicks?: Record<number, number>;
  }
}

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
  youtubeId?: string;
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
  youtubeId,
  cta,
  overlayAction,
}: HomeCardProps) {
  const headingId = useId();
  const publishedId = useId();
  const isPodcastCard = variant === "podcast";
  const { displaySummary, displayPullQuote } = useMemo(() => {
    const trimmedSummary = summary.trim();
    const trimmedPullQuote = pullQuote.trim();
    const computedPullQuote = trimmedPullQuote.length > 0 ? trimmedPullQuote : trimmedSummary;
    // For podcast cards, if summary is empty, don't fall back to pullQuote to avoid duplication
    const computedSummary = isPodcastCard && trimmedSummary.length === 0 
      ? "" 
      : trimmedSummary.length > 0 
        ? trimmedSummary 
        : trimmedPullQuote;
    return {
      displaySummary: computedSummary,
      displayPullQuote: computedPullQuote,
    };
  }, [pullQuote, summary, isPodcastCard]);
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

  const overlayPullQuote = (
    <p
            className={`home-card-pullquote line-clamp-3 text-[0.95rem] leading-normal text-center max-w-[26ch] ${
        !isPodcastCard
          ? "opacity-0 group-focus-within:opacity-100 md:group-hover:opacity-100 transition-opacity duration-200 ease-out min-h-[4.5rem] motion-reduce:transition-none"
          : ""
      }`}
      aria-hidden={isPodcastCard ? "false" : "true"}
    >
      {displayPullQuote}
    </p>
  );

  return (
    <article
      className={`group paper-grain surface-chamfer home-card home-card--${variant} flex flex-col gap-4 p-6 bg-surface shadow-card-rest border-[1.5px] border-solid ${
        variant === "review" ? "border-[var(--card-border-review)]" : ""
      } ${
        variant === "podcast" ? "border-brand-purple-800" : ""
      }`}
      data-card="true"
      data-type={variant}
      data-interacting="false"
      onMouseEnter={(e) => {
        e.currentTarget.setAttribute("data-interacting", "true");
      }}
      onMouseLeave={(e) => {
        e.currentTarget.setAttribute("data-interacting", "false");
      }}
      onFocus={(e) => {
        e.currentTarget.setAttribute("data-interacting", "true");
      }}
      onBlur={(e) => {
        e.currentTarget.setAttribute("data-interacting", "false");
      }}
      role="listitem"
      aria-labelledby={headingId}
    >
      <ElectricBorder variant={variant} />
      <header className="home-card-head flex flex-col gap-2">
        <h3 id={headingId} className="home-card-title-heading m-0">
          <Link href={href} className="focus-chamfer home-card-title font-display text-[clamp(1.35rem,1vw+1rem,1.65rem)] leading-snug text-brand-purple-800">
            <span className="line-clamp-2">{title}</span>
          </Link>
        </h3>
        <p className="home-card-meta home-card-meta-primary text-[0.85rem] tracking-[0.06em] uppercase text-text-muted border-0 outline-none shadow-none bg-transparent">{metaPrimary}</p>
        <time
          id={publishedId}
          className="home-card-meta home-card-meta-secondary text-[0.85rem] tracking-[0.06em] uppercase text-text-muted normal-case tracking-[0] text-[color-mix(in_oklab,var(--brand-purple-600)_70%,transparent)]"
          dateTime={published.iso}
        >
          {published.display}
        </time>
      </header>

      <div
        className={`paper-grain surface-chamfer home-card-media relative aspect-square flex-none w-full border-0 bg-[color-mix(in_oklab,var(--brand-pink-100)_12%,transparent)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--brand-purple-600)_10%,transparent)] ${
          isPodcastCard ? "grid grid-rows-[9fr_1fr_6fr] overflow-hidden" : ""
        }`}
        data-media-layout={isPodcastCard ? "youtube-pullquote" : undefined}
      >
        {isPodcastCard && youtubeId ? (
          <>
            <div className="home-card-youtube-embed relative w-full h-full overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1&autoplay=0`}
                title={`Watch ${title}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="home-card-youtube-iframe absolute inset-0 w-full h-full border-0"
              />
            </div>
            <div className="home-card-pullquote-spacer w-full" />
            <div className="home-card-pullquote-container flex items-center p-4 bg-[color-mix(in_oklab,var(--brand-pink-100)_40%,transparent)] overflow-hidden">
              <p className="home-card-pullquote-text line-clamp-3 text-[0.95rem] leading-normal text-[color-mix(in_oklab,var(--brand-purple-800)_90%,transparent)] text-left m-0">
                {displayPullQuote}
              </p>
            </div>
            {overlayAction ? (
              <button
                type="button"
                className={`focus-chamfer home-card-media-overlay absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color-mix(in_oklab,var(--brand-purple-800)_40%,transparent)] text-brand-pink-100 z-[2] pointer-events-none opacity-0 group-focus-within:opacity-100 md:group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                  variant === "podcast" ? "bg-[color-mix(in_oklab,var(--brand-purple-600)_30%,transparent)]" : ""
                }`}
                aria-label={overlayAction.label}
                aria-hidden="true"
                onClick={handleOverlayClick}
              >
                <svg aria-hidden="true" width="52" height="52" viewBox="0 0 52 52" fill="currentColor">
                  <path d="M21 16.667 37 26l-16 9.333V16.667Z" />
                </svg>
                {overlayPullQuote}
              </button>
            ) : (
              <div
                className={`home-card-media-overlay absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color-mix(in_oklab,var(--brand-purple-800)_40%,transparent)] text-brand-pink-100 z-[2] pointer-events-none opacity-0 group-focus-within:opacity-100 md:group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                  variant === "podcast" ? "bg-[color-mix(in_oklab,var(--brand-purple-600)_30%,transparent)]" : ""
                }`}
                aria-hidden="true"
              >
                {overlayPullQuote}
              </div>
            )}
          </>
        ) : (
          <>
            <Image
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              priority={media.priority}
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 640px) 340px, 88vw"
              className="home-card-media-image w-full h-full object-cover md:motion-safe:group-hover:blur-sm md:motion-safe:group-focus-within:blur-sm md:group-hover:brightness-[0.85] md:group-focus-within:brightness-[0.85] transition-[filter] duration-200 ease-out motion-reduce:blur-0 motion-reduce:brightness-100 motion-reduce:transition-none"
              loading={media.priority ? "eager" : "lazy"}
              decoding="async"
            />
            {overlayAction ? (
              <button
                type="button"
                className={`focus-chamfer home-card-media-overlay absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color-mix(in_oklab,var(--brand-purple-800)_40%,transparent)] text-brand-pink-100 z-[2] pointer-events-none opacity-0 group-focus-within:opacity-100 md:group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                  variant === "review" ? "bg-[color-mix(in_oklab,var(--brand-pink-500)_30%,transparent)]" : ""
                } ${
                  variant === "podcast" ? "bg-[color-mix(in_oklab,var(--brand-purple-600)_30%,transparent)]" : ""
                }`}
                aria-label={overlayAction.label}
                aria-hidden="true"
                onClick={handleOverlayClick}
              >
                <svg aria-hidden="true" width="52" height="52" viewBox="0 0 52 52" fill="currentColor">
                  <path d="M21 16.667 37 26l-16 9.333V16.667Z" />
                </svg>
                {overlayPullQuote}
              </button>
            ) : (
              <div
                className={`home-card-media-overlay absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color-mix(in_oklab,var(--brand-purple-800)_40%,transparent)] text-brand-pink-100 z-[2] pointer-events-none opacity-0 group-focus-within:opacity-100 md:group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                  variant === "review" ? "bg-[color-mix(in_oklab,var(--brand-pink-500)_30%,transparent)]" : ""
                } ${
                  variant === "podcast" ? "bg-[color-mix(in_oklab,var(--brand-purple-600)_30%,transparent)]" : ""
                }`}
                aria-hidden="true"
              >
                {overlayPullQuote}
              </div>
            )}
          </>
        )}
      </div>

      {displaySummary && (
        <div className={`home-card-copy flex-1 flex flex-col ${
          isPodcastCard ? "justify-end" : ""
        }`}>
          <p
            className="home-card-text line-clamp-3 text-[0.95rem] leading-normal text-[color-mix(in_oklab,var(--brand-purple-800)_90%,transparent)] opacity-100 md:group-hover:opacity-20 md:group-focus-within:opacity-20 transition-opacity duration-200 ease-out motion-reduce:transition-none"
            aria-hidden="false"
          >
            {displaySummary}
          </p>
        </div>
      )}

      <div className="card-actions mt-auto relative z-[3]">
        <ButtonTrapezoid href={cta.href} tone={cta.tone} size="sm" aria-describedby={publishedId}>
          {cta.label}
        </ButtonTrapezoid>
      </div>
    </article>
  );
}
