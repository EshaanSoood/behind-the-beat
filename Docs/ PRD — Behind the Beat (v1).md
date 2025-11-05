# PRD — Behind the Beat (v1)

## 1) Overview

**Vision (1-liner):** A one-stop home for your interview podcasts and written reviews—easy to read, easy to share, and inviting to return to.

**3-month goals:**

* Publish a healthy library of readable, skimmable reviews and podcast entries.
* Make sharing effortless so readers bring friends.
* Create a sticky, magazine-like experience that feels fun and alive.

## 2) Audience

* **Primary:** People who love artist stories.
* **Secondary:** Artists (to feel proud being featured and want to be on the site).
* **Tertiary:** Publicists/labels (to submit their artists).

**Core tasks:**

* Consume content (read/watch/listen).
* Share content.
* Subscribe to channels / mailing lists.

## 3) Scope (v1)

**In:**

* 7 pages: Home, Mission, Review Listing, Podcast Listing, Contact, Review Entry, Podcast Entry.
* “Modern digital magazine” feel (alive but simple).
* Share surfaces + basic subscribe CTAs (link-out OK).

**Later (v2+):**

* On-site search.
* Rich filter UX (beyond SEO-oriented metadata).
* Full CMS.
* Custom audio hosting.
* Advanced animations.

## 4) Information Architecture

* **Nav order:** Home / Mission / Reviews / Podcasts / Contact.
* **URLs:**

  * `/` (Home)
  * `/mission`
  * `/reviews` → entries at `/reviews/[slug]`
  * `/podcast` → entries at `/podcast/[slug]`
  * `/contact`

## 5) Experience, Brand & Design

**Vibe:** A magical, living magazine—like finding a stash of street-art zines under a coffee table and getting lost with coffee/whiskey.

**Look (3 words):** cozy • modern • playful (inferred from “magazine-ish + alive”).
**Inspirations:** The Verge, Johnny Cupcakes.

**Color direction:**

* Brand gradient between **light pink → dark purple** (both from logo family).
* Neutrals elsewhere; all accent colors sit on that pink↔purple gradient.

**Type:**

* Headings: your brand display font.
* Body: Helvetica (optionally pair with a calm serif like Georgia for long reads).

**Shapes:**

* Chamfered/trapezoid used widely (cards, buttons, header dividers/slants).
* Frosted/outlined variants available.

**Motion:**

* “Alive” but respectful: subtle hovers on nav; cards can “wiggle” with small reveals.
* Keep micro-motions 150–220 ms; no layout jump.
* Reduced motion **not required**, but we’ll still honor `prefers-reduced-motion` for accessibility.
* On mobile, consider gentle haptics on key interactions (where supported).

## 6) Content Model

### Review Entry (always show)

* **title** (string)
* **artist** (string)
* **releaseDate** (date)
* **headline/pullQuote** (string)
* **coverImage** (src + alt)
* **metadata** (e.g., genre, label, rating if used)
* **body** (rich text/MDX)
* **tracklist** (ordered list)
* **streamingLinks** (Spotify/Apple/YouTube Music icons/links)
* **shareChips** (pre-built sharing)

### Podcast Episode (always show)

* **title** (string)
* **date** (date)
* **guest** (string or list)
* **pullQuote** (string)
* **coverImage** (src + alt)
* **embed** (YouTube)
* **showNotes** (rich text/links)
* **transcriptLink** (optional for v1; TBD timing)
* **shareChips**

### Global

* Site title/tagline; social links; footer copy; subscribe CTAs.

**Authoring flow (v1):** Plain Markdown/MDX files in folders; CSS/components handle the look.

## 7) Browsing & Lists

* **Reviews** and **Podcasts**: “Load more” (no classic pagination).

  * **Page size:** ~8 on desktop, ~5 on mobile.
* Basic filters/sort exist in metadata (good for SEO), UI filters can be minimal at launch.

## 8) Contact

* Fields: Full Name, Email, Reason for contacting, Message.
* Submission handling: **TBD** (mailto vs. simple serverless later). For v1, a11y-clean form + optional mailto is acceptable.

## 9) Accessibility

* Screen-reader friendly structure (landmarks, headings, alt-text required).
* Keyboard navigable with visible focus.
* Respect `prefers-reduced-motion` (disables wiggle/reveals).
* Consider gentle mobile haptics on taps (non-blocking enhancement).

## 10) Media & Embeds

* Podcasts are **YouTube embeds** (no local audio hosting).
* “Open in your podcast app” link later (TBD).
* Use privacy-enhanced embeds where possible.

## 11) Performance

* Aim for “snappy” overall; light JS where feasible.
* Fancy visuals are okay within reason; prioritize fast first contentful paint for article text.

## 12) SEO & Sharing

* **Open Graph**:

  * Reviews → album cover + pull quote.
  * Podcasts → episode title + pull quote (consider cover if available).
* **Yes** to sitemap and base SEO (title/description per page type).

## 13) Analytics (TBD)

* Preference: privacy-friendly (e.g., Plausible).
* Events to consider: share clicks, outbound streaming clicks, YouTube play (basic).

## 14) Hosting & Deploy

* **Vercel** with preview deploys on PRs.
* Branching: `main` for prod; `feature/*` for PRs.

## 15) Success Criteria (v1)

* All 7 routes render with componentized shells and pass basic a11y checks.
* “Load more” lists work smoothly on mobile/desktop.
* Share metadata renders correct OG images/titles on entries.
* Readers can move from Home → Listing → Entry and share in ≤2 clicks.
* Performance: visibly fast on typical broadband; no jank on hover/reveals.

## 16) Risks & Mitigations

* **Content volume:** Have starter entries to validate layout early.
* **CSS complexity:** Centralize tokens + components to prevent ripple.
* **Accessibility:** Enforce alt-text in content pipeline; test with screen reader.
* **Embeds:** Use `youtube-nocookie` and defer loading to keep pages snappy.

## 17) Open Items (please confirm or fill)

* Contact form handling for v1 (mailto vs. real submit).
* Do you want transcripts on day one or later?
* Analytics: adopt Plausible now, or add later?
* Launch date/window and any content minimums (e.g., “≥10 reviews, ≥6 episodes”).

---

# Next micro-step (Step 1: scaffold only)

**Objective:** Create the project skeleton + 7 pages + local components—no styling, no data.

**Deliverable after Step 1:**

* Navigable site with Header/Footer, Skip link, and empty shells for all pages and their local components.
* Runs locally with no TS errors; deploys to Vercel preview.