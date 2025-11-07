# Launch Checklist

## Content

- [ ] At least **6** Reviews published
- [ ] At least **3** Podcast Episodes published
- [ ] Each entry has:
  - [ ] Title
  - [ ] Date (ISO format: YYYY-MM-DD)
  - [ ] Cover image (path under `/public/images/`)
  - [ ] **Meaningful alt text** (required, non-empty)
  - [ ] Pull quote
  - [ ] Body content (markdown)
  - [ ] Reviews: tracklist (array) + streaming links (optional)
  - [ ] Episodes: youtubeId + notes (optional) + transcriptUrl (optional)

## A11y

- [ ] One `h1` per page; headings nested correctly (h1 → h2 → h3)
- [ ] Keyboard navigation: tab through Skip → Header → Main → Footer without traps
- [ ] Focus ring visible on nav, cards, buttons, links
- [ ] `prefers-reduced-motion` disables transforms (test with OS reduced motion setting)
- [ ] All images have meaningful `alt` text (or `alt=""` for decorative)
- [ ] Form inputs have associated labels
- [ ] Skip link is keyboard accessible and visible on focus

## SEO/Sharing

- [ ] `CANONICAL_BASE` updated to production domain in `/lib/seo.ts`
- [ ] Home, listings, entries set correct titles/descriptions
- [ ] OG image present for each entry (cover or `ogImage`), 1200×630 min recommended
- [ ] `sitemap.xml` reachable at `/sitemap.xml`
- [ ] `robots.txt` allows indexing (`/robots.txt`)
- [ ] All entry pages have `generateMetadata` with proper OG/Twitter cards
- [ ] Test OG previews on:
  - [ ] Facebook Debugger
  - [ ] Twitter Card Validator
  - [ ] LinkedIn Post Inspector

## Performance

- [ ] Images lazy/async where appropriate (cover images below fold)
- [ ] No blocking fonts (display font uses `font-display: swap`)
- [ ] No console errors in dev tools across pages
- [ ] YouTube embeds use `youtube-nocookie.com` and `loading="lazy"`
- [ ] No layout shifts on hover (transforms don't affect layout)

## Visual

- [ ] 1080p and 2K: grids add columns; content container capped at 1200px; no ballooning padding
- [ ] Footer links and newsletter input readable and focused
- [ ] Logo displays correctly in header
- [ ] Brand font (GrobeDeutschmeister) loads and displays
- [ ] Review Trackbox (cream-glass) renders with chamfer and blur
- [ ] Pull quotes display with gradient left bar
- [ ] Breadcrumbs truncate long titles correctly

## Links & Navigation

- [ ] Run `node scripts/check-links.mjs` and verify 0 broken internal links
- [ ] All nav links work (Home, Mission, Reviews, Podcasts, Contact)
- [ ] Breadcrumbs link correctly
- [ ] Share chips work (copy link, external share links)
- [ ] Streaming buttons link to correct services
- [ ] Footer social links point to correct profiles

## Error States

- [ ] Global 404 page (`/app/not-found.tsx`) renders with consistent layout
- [ ] Global error page (`/app/error.tsx`) renders with consistent layout
- [ ] Entry-specific 404 pages work (`/app/reviews/[slug]/not-found.tsx`, `/app/podcast/[slug]/not-found.tsx`)
- [ ] Entry-specific error pages work (`/app/reviews/[slug]/error.tsx`, `/app/podcast/[slug]/error.tsx`)

## Manifest & Favicons

- [ ] `favicon.ico` present in `/public/`
- [ ] `apple-touch-icon.png` (180×180) present
- [ ] `icon-192.png` and `icon-512.png` present
- [ ] `safari-pinned-tab.svg` present (monochrome)
- [ ] `manifest.webmanifest` configured correctly
- [ ] Theme color set to `#6D2B79` in manifest and metadata

## Pre-Launch

- [ ] Update `CANONICAL_BASE` in `/lib/seo.ts`
- [ ] Replace placeholder OG default image (`/images/og-default.jpg`)
- [ ] Update footer social links with actual URLs
- [ ] Wire up newsletter subscription API (currently uses mailto:)
- [ ] Test all pages in production build (`npm run build && npm start`)
- [ ] Verify sitemap includes all entries
- [ ] Run link checker script (`node scripts/check-links.mjs`)

## Post-Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Verify OG previews on social platforms
- [ ] Monitor analytics (if applicable)
- [ ] Test newsletter subscription flow
- [ ] Verify all external links work



