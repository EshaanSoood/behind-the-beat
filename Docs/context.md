# Behind the Beat - Full Context

## Project Overview

Behind the Beat is a static, magazine-style website for music reviews and podcast interviews. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and a custom content layer using Markdown files.

## Architecture

### Tech Stack
- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + tokenized globals (tokens.css, globals.css)
- **Content**: Markdown files with front-matter (custom content layer)
- **Content Parsing**: `gray-matter` for front-matter, `remark` + `remark-html` for Markdown
- **Fonts**: GrobeDeutschmeister (display font), System fonts (body)
- **Deployment**: Vercel (static site)

### Design System

**Brand Colors**:
- Pink: `#FFD3E8` (100), `#FFB0DA` (300), `#FF8CCB` (500)
- Purple: `#7A3A8C` (600), `#6D2B79` (800)
- Gradient: `linear-gradient(135deg, #FF8CCB 0%, #6D2B79 100%)`

**Typography**:
- Display: GrobeDeutschmeister (custom font)
- Body: System stack (Helvetica Neue, Arial, sans-serif)
- Responsive: Fluid typography with `clamp()`

**Spacing**: 4/8px system (4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 64px)

**Shadows & Radii**: Token-driven soft shadows and rounded corners

**Trapezoid Motifs**: Chamfered corners and trapezoid shapes throughout UI

## Content Structure

### Content Files
- **Location**: `/content/reviews/` and `/content/episodes/`
- **Format**: Markdown (`.md`) with YAML front-matter
- **Slug**: Derived from filename (e.g., `my-album-review.md` → slug: `my-album-review`)

### Review Schema
```typescript
{
  slug: string                    // From filename
  title: string                   // Required
  artist: string                   // Required
  date: string                    // ISO date, required
  pullQuote: string               // Required
  cover: string                   // Path under /public/images/, required
  alt: string                     // Required, non-empty
  summary: string                 // Required
  tracklist: string[]             // Array of strings, required
  streaming?: {                   // Optional
    spotify?: string
    apple?: string
    youtubeMusic?: string
  }
  tags?: string[]                 // Optional
  ogImage?: string                // Optional (for custom OG image)
  body: {                         // Markdown content
    raw: string
    html: string
  }
}
```

### Episode Schema
```typescript
{
  slug: string                    // From filename
  title: string                   // Required
  guest: string                   // Required
  date: string                    // ISO date, required
  pullQuote: string               // Required
  cover: string                   // Path under /public/images/, required
  alt: string                     // Required, non-empty
  youtubeId: string              // Required
  notes?: string                  // Optional
  transcriptUrl?: string          // Optional
  tags?: string[]                 // Optional
  ogImage?: string               // Optional (for custom OG image)
  body: {                        // Markdown content
    raw: string
    html: string
  }
}
```

### Content Layer (`/lib/content.ts`)
- `getAllReviews()`: Returns all reviews sorted by date (desc)
- `getAllEpisodes()`: Returns all episodes sorted by date (desc)
- `getReviewBySlug(slug)`: Returns single review or null
- `getEpisodeBySlug(slug)`: Returns single episode or null
- `allReviewsSorted()`: Alias for getAllReviews
- `allEpisodesSorted()`: Alias for getAllEpisodes
- **Validation**: Build fails if required fields are missing (especially `alt`)

## Page Structure

### Static Pages
1. **Home** (`/app/page.tsx`)
   - Hero section
   - Featured tiles (Reviews, Podcasts, Mission)
   - Metadata: Site description

2. **Mission** (`/app/mission/page.tsx`)
   - Mission statement prose
   - Metadata: "Mission" page

3. **Contact** (`/app/contact/page.tsx`)
   - Contact form (labels only, no submit)
   - Metadata: "Contact" page

### Listing Pages
4. **Reviews** (`/app/reviews/page.tsx`)
   - Server component that fetches all reviews
   - Passes to client `ReviewList` component
   - Metadata: "Reviews" page

5. **Podcasts** (`/app/podcast/page.tsx`)
   - Server component that fetches all episodes
   - Passes to client `PodcastList` component
   - Metadata: "Podcasts" page

### Entry Pages
6. **Review Entry** (`/app/reviews/[slug]/page.tsx`)
   - Server component with `generateMetadata()`
   - Renders: Breadcrumbs, ReviewHeader, Cover Image, ReviewBody, TracklistBox, ShareChips
   - SEO: Per-entry OG/Twitter metadata

7. **Episode Entry** (`/app/podcast/[slug]/page.tsx`)
   - Server component with `generateMetadata()`
   - Renders: Breadcrumbs, EpisodeHeader, Cover Image, EpisodePlayer, EpisodeNotes, ShareChips
   - SEO: Per-entry OG/Twitter metadata

### Error Pages
8. **Global 404** (`/app/not-found.tsx`)
   - Friendly message with navigation CTAs

9. **Global Error** (`/app/error.tsx`)
   - Client component with error logging
   - "Try again" and "Back to Home" buttons

10. **Entry 404** (`/app/reviews/[slug]/not-found.tsx`, `/app/podcast/[slug]/not-found.tsx`)
    - Entry-specific not-found pages

11. **Entry Error** (`/app/reviews/[slug]/error.tsx`, `/app/podcast/[slug]/error.tsx`)
    - Entry-specific error boundaries

### Loading States
12. **Loading Skeletons** (`/app/reviews/loading.tsx`, `/app/podcast/loading.tsx`)
    - 8 gray tile blocks using token colors
    - No shimmer (respects reduced motion)

## Component Architecture

### Global Components (`/components/`)

**Layout**:
- `Header.tsx`: Logo, navigation with active states, trapezoid underline
- `Footer.tsx`: Social links, newsletter CTA, copyright
- `SkipLink.tsx`: "Skip to content" link for keyboard navigation
- `Section.tsx`: Container wrapper with `container-page` class

**UI Components**:
- `TrapezoidCard.tsx`: Chamfered card with variants (solid, frosted, outline)
- `ButtonTrapezoid.tsx`: Trapezoid-shaped button with tones (primary, neutral)
- `Breadcrumbs.tsx`: Navigation breadcrumbs with truncation
- `PullQuote.tsx`: Pull quote component with gradient left bar
- `ShareChips.tsx`: Share buttons (Copy Link, Twitter, Facebook, LinkedIn, Email)
- `StreamingButtons.tsx`: Spotify, Apple Music, YouTube Music buttons
- `EmptyState.tsx`: Empty state component for listings
- `Tag.tsx`: Tag pill component
- `Rating.tsx`: Rating component (5 stars, optional)

**Icons** (`/components/icons/`):
- `Spotify.tsx`, `AppleMusic.tsx`, `YouTubeMusic.tsx`
- `Share.tsx`, `Link.tsx`, `Mail.tsx`
- `X.tsx`, `Facebook.tsx`, `LinkedIn.tsx`
- `Instagram.tsx`, `YouTube.tsx`
- `ChevronRight.tsx`

### Page-Specific Components

**Home** (`/app/(home)/components/`):
- `HomeHero.tsx`: Hero section
- `HomeTiles.tsx`: Featured tiles grid

**Mission** (`/app/mission/components/`):
- `MissionProse.tsx`: Mission statement

**Contact** (`/app/contact/components/`):
- `ContactForm.tsx`: Contact form (labels only)

**Reviews** (`/app/reviews/components/`):
- `ReviewList.tsx`: Client component with "Load more" functionality
- `ReviewListItem.tsx`: Individual review card

**Review Entry** (`/app/reviews/[slug]/components/`):
- `ReviewHeader.tsx`: Title, artist, date, tags, PullQuote
- `ReviewBody.tsx`: Summary + MDX body content
- `TracklistBox.tsx`: Review Trackbox (cream-glass) with tracklist + streaming buttons

**Podcasts** (`/app/podcast/components/`):
- `PodcastList.tsx`: Client component with "Load more" functionality
- `PodcastListItem.tsx`: Individual episode card

**Episode Entry** (`/app/podcast/[slug]/components/`):
- `EpisodeHeader.tsx`: Title, guest, date, tags, PullQuote
- `EpisodePlayer.tsx`: YouTube embed (privacy-enhanced)
- `EpisodeNotes.tsx`: Episode notes + MDX body + transcript link

## Styling System

### CSS Architecture

**`/styles/tokens.css`**:
- CSS variables for colors, typography, spacing, shadows, radii
- Brand tokens (pink/purple gradient)
- UI tokens (neutrals, text colors)
- Typography scale (fluid responsive)
- Spacing scale (4/8px system)

**`/styles/globals.css`**:
- Base styles (html, body, headings, paragraphs)
- Editorial typography (article, prose-measure)
- Utility classes (container-page, stack-*, prose-measure)
- Kicker, caption utilities
- Blockquote default styles
- Reduced motion guards

**Component styling**:
- Tailwind utility classes live alongside components (e.g., `components/Footer.tsx`, `app/(home)/components/*.tsx`)
- Decorative geometry uses CSS variables (`--ch`, gradient tokens) via Tailwind arbitrary values
- Shared helpers: `Section`, `ButtonTrapezoid`, `TrapezoidCard`

### Tailwind Config (`tailwind.config.ts`)
- Extends theme with token variables
- Colors: brand.*, neutral.ui.*
- Fonts: display, body
- Shadows: soft, card
- Border radius: sm, md, lg

## SEO & Social Sharing

### SEO Helpers (`/lib/seo.ts`)
- `CANONICAL_BASE`: Production domain (TODO: update before launch)
- `DEFAULT_OG`: Default OG image path
- `siteDefaults`: Site metadata constants
- `buildEntryMeta()`: Builds Metadata object for entries
- `generateMetadata()`: Generates metadata for static pages

### Share Preview Helpers (`/lib/sharePreview.ts`)
- `sanitizeDescription()`: Trims to 160 chars, strips newlines
- `pickOgImage()`: Prefers `ogImage` → `cover` → `DEFAULT_OG`

### Metadata Strategy
- **Entry pages**: `generateMetadata()` with per-entry OG/Twitter
- **Listing pages**: Static metadata using `siteDefaults`
- **Static pages**: Static metadata using `siteDefaults`
- **Type**: `article` for entries, `website` for listings/static

### Sitemap & Robots
- **`/app/sitemap.ts`**: Generates sitemap with all static routes + entries
- **`/app/robots.ts`**: Allows all crawlers, points to sitemap

## Features Implemented

### Client-Side "Load More"
- Reviews: Starts with 8 items (5 on mobile), loads 8 more (5 on mobile) per click
- Episodes: Same behavior
- Responsive: Adjusts based on `window.matchMedia('(max-width: 640px)')`

### Micro-Motions
- Cards: Hover/focus `translateY(-2px)`, active `translateY(-1px)`
- Buttons: Same hover/active states
- Nav links: Hover color change
- **Reduced motion**: All transforms disabled under `prefers-reduced-motion: reduce`

### Active States
- Nav: Trapezoid underline + visible focus ring
- Breadcrumbs: `aria-current="page"` on last item
- Cards: Hover/focus/active states

### Accessibility
- One `h1` per page
- Semantic HTML (nav, article, section, aside)
- ARIA labels on interactive elements
- Focus rings visible on all focusable elements
- Skip link for keyboard navigation
- `prefers-reduced-motion` support
- Alt text required for all images (build-time validation)

### Empty/Error/Loading States
- Empty state: Shows when listings have no items
- Error boundaries: Global and entry-specific
- Loading skeletons: 8 gray tiles for listings
- Not-found pages: Global and entry-specific

### Tags & Ratings
- Tags: Optional, shows up to 3 per item
- Ratings: Optional component (5 stars), only renders if value provided

## File Organization

```
/app
  /(home)              # Home page route group
  /mission             # Mission page
  /contact             # Contact page
  /reviews             # Reviews listing
    /[slug]            # Review entry
    /loading.tsx        # Loading skeleton
  /podcast             # Podcasts listing
    /[slug]            # Episode entry
    /loading.tsx        # Loading skeleton
  /not-found.tsx       # Global 404
  /error.tsx           # Global error
  /layout.tsx          # Root layout
  /manifest.webmanifest # Web manifest
  /sitemap.ts          # Sitemap generator
  /robots.ts           # Robots.txt

/components
  /icons               # SVG icon components
  Header.tsx
  Footer.tsx
  SkipLink.tsx
  Section.tsx
  TrapezoidCard.tsx
  ButtonTrapezoid.tsx
  Breadcrumbs.tsx
  PullQuote.tsx
  ShareChips.tsx
  StreamingButtons.tsx
  EmptyState.tsx
  Tag.tsx
  Rating.tsx

/lib
  content.ts           # Content layer (read Markdown)
  seo.ts               # SEO helpers
  sharePreview.ts      # Share preview helpers
  format.ts            # Formatting utilities (dates, URLs)

/content
  /reviews             # Review Markdown files
  /episodes            # Episode Markdown files

/public
  /fonts               # Font files (GrobeDeutschmeister.ttf)
  /images              # Images
    /reviews           # Review cover images
    /episodes          # Episode cover images
    og-default.jpg     # Default OG image
  favicon.ico
  apple-touch-icon.png
  icon-192.png
  icon-512.png
  safari-pinned-tab.svg

/styles
  tokens.css           # CSS variables
  globals.css          # Base styles + utilities

/scripts
  check-links.mjs     # Link integrity checker

/docs
  PRD.md              # Project requirements
  SHARING.md          # Social sharing guide
  LAUNCH-CHECKLIST.md # Launch checklist
  context.md          # This file
  sitemap.md          # Site map
```

## Build Process

1. **Content Parsing**: Read Markdown files from `/content/*`
2. **Validation**: Check required fields (especially `alt`)
3. **Static Generation**: Generate all pages at build time
4. **Metadata**: Generate per-page metadata for SEO
5. **Sitemap**: Generate sitemap with all routes
6. **Robots**: Generate robots.txt

## Deployment

- **Platform**: Vercel (static site)
- **Build Command**: `npm run build`
- **Output**: Static files in `.next/` directory
- **No Server**: Fully static, no API routes

## Key Decisions

1. **Custom Content Layer**: Instead of Contentlayer (incompatible with Next.js 16), built custom layer using `gray-matter` and `remark`
2. **Client-Side "Load More"**: Kept client-side for better UX, no server-side pagination needed
3. **Static Site**: Everything is static, no CMS or database
4. **Token-Driven Design**: All styles use CSS variables for easy theming
5. **Accessibility First**: Built with a11y in mind from the start
6. **Progressive Enhancement**: Works without JavaScript for basic navigation

## TODOs Before Launch

1. Update `CANONICAL_BASE` in `/lib/seo.ts` with production domain
2. Replace placeholder OG default image (`/images/og-default.jpg`)
3. Update footer social links with actual URLs
4. Wire up newsletter subscription API (currently uses mailto:)
5. Add at least 6 Reviews and 3 Episodes with real content
6. Generate actual favicon files (currently placeholders)
7. Test OG previews on Facebook, Twitter, LinkedIn

## Performance Optimizations

- Images: Lazy loading with `loading="lazy"` and `decoding="async"`
- YouTube: Privacy-enhanced embeds with `youtube-nocookie.com`
- Fonts: `font-display: swap` for display font
- Static Generation: All pages pre-rendered at build time
- Code Splitting: Automatic via Next.js App Router

## Accessibility Features

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management (skip link, focus restoration)
- Reduced motion support
- Alt text required for all images
- Color contrast: AA compliant
- Screen reader friendly (breadcrumbs, landmarks)

## Recent Frontend Updates (2025-11-11)
- Homepage rhythm tightened: single plain H1, shared container alignment, responsive nav-to-hero spacing.
- Introduced kicker + section-title utilities with pseudo-element underline and applied across hero/sections.
- Home grid rebuilt (1/2/3 columns) with natural-height cards, chamfered media, clamped copy, and type-specific gradients.
- Trapezoid CTA buttons now sanitize props, guarantee ≥44px tap targets, and share the chamfered focus treatment.
- Global `.focus-chamfer` helper added; all interactive elements (nav, hero overlays, cards, footer links) now show chamfered focus outlines.
- Tokenized surface utilities (`surface-frost-*`) and gradient helpers (`gradient-card-*`) replace ad-hoc RGBA values; shadows (`shadow-soft`, `shadow-card`) confirmed in Tailwind config.
- Added CI guard (`scripts/enforce-no-rounded.mjs`) to fail builds if Tailwind `rounded-*` utilities appear.
- Footer and newsletter blocks restyled with chamfers, list resets, and design-token form controls for consistent spacing and contrast.
- Documented clarifications and the step-by-step execution plan in `Docs/clarifying questions.txt` and `Docs/homepage revamp plan.txt`.

## Homepage Stabilization Summary (2025-11-12)
- Removed fixed aspect ratios and overflow clipping from home cards; grid now flows naturally with uniform typography and hover states.
- Token-driven surfaces and gradients (`surface-frost-*`, `gradient-card-*`) replace inline RGBA values across hero, cards, and overlays.
- Added chamfer/focus utilities and a `check:rounded` CI guard to enforce geometry rules and keep focus rings visible.
- Confirmed Tailwind coverage, shadow utility mappings, SVG fixes, and alt-text fallbacks as part of the refactor gates.

