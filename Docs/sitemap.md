# Behind the Beat - Site Map & Component Interactions

## Site Structure

```
/
├── / (Home)
│   ├── HomeHero
│   └── HomeTiles
│
├── /mission
│   └── MissionProse
│
├── /contact
│   └── ContactForm
│
├── /reviews (Listing)
│   ├── ReviewList (Client)
│   │   ├── ReviewListItem (×8 initially, +8 on "Load more")
│   │   │   └── TrapezoidCard
│   │   │       └── Tag (up to 3)
│   │   └── ButtonTrapezoid ("Load more")
│   └── EmptyState (if no reviews)
│
├── /reviews/[slug] (Entry)
│   ├── Breadcrumbs
│   ├── ReviewHeader
│   │   ├── PullQuote (if pullQuote exists)
│   │   └── Tag (if tags exist)
│   ├── ReviewCover (Image)
│   ├── ReviewBody
│   │   └── MDX content (body.raw)
│   ├── TracklistBox
│   │   ├── Tracklist (ol)
│   │   ├── StreamTitle
│   │   └── StreamingButtons
│   │       ├── SpotifyIcon + ButtonTrapezoid
│   │       ├── AppleMusicIcon + ButtonTrapezoid
│   │       └── YouTubeMusicIcon + ButtonTrapezoid
│   └── ShareChips
│       ├── LinkIcon + Copy Link button
│       ├── XIcon + Twitter link
│       ├── FacebookIcon + Facebook link
│       ├── LinkedInIcon + LinkedIn link
│       └── MailIcon + Email link
│
├── /podcast (Listing)
│   ├── PodcastList (Client)
│   │   ├── PodcastListItem (×8 initially, +8 on "Load more")
│   │   │   └── TrapezoidCard
│   │   │       └── Tag (up to 3)
│   │   └── ButtonTrapezoid ("Load more")
│   └── EmptyState (if no episodes)
│
└── /podcast/[slug] (Entry)
    ├── Breadcrumbs
    ├── EpisodeHeader
    │   ├── PullQuote (if pullQuote exists)
    │   └── Tag (if tags exist)
    ├── EpisodeCover (Image)
    ├── EpisodePlayer
    │   └── YouTube iframe (youtube-nocookie)
    ├── EpisodeNotes
    │   ├── PullQuote (if pullQuote exists)
    │   ├── Notes (if notes exist)
    │   ├── MDX content (body.raw)
    │   └── Transcript link (if transcriptUrl exists)
    └── ShareChips
        ├── LinkIcon + Copy Link button
        ├── XIcon + Twitter link
        ├── FacebookIcon + Facebook link
        ├── LinkedInIcon + LinkedIn link
        └── MailIcon + Email link
```

## Global Layout

```
RootLayout
├── SkipLink
├── site-container
    ├── Header
    │   ├── Logo (Image)
    │   ├── angled-divider
    │   └── Nav
    │       ├── Home link
    │       ├── Mission link
    │       ├── Reviews link (active if pathname starts with /reviews)
    │       ├── Podcasts link (active if pathname starts with /podcast)
    │       └── Contact link
    │
    ├── main#main (page-well)
    │   └── {children} (page content)
    │
    └── Footer
        ├── Social Links
        │   ├── XIcon + X/Twitter link
        │   ├── InstagramIcon + Instagram link
        │   ├── YouTubeIcon + YouTube link
        │   └── LinkedInIcon + LinkedIn link
        ├── Newsletter CTA
        │   ├── Email input
        │   └── ButtonTrapezoid (Subscribe)
        └── Copyright
```

## Component Interaction Flow

### Data Flow

```
Content Files (Markdown)
    ↓
/lib/content.ts (parseMarkdownFile, getAllReviews, getAllEpisodes)
    ↓
Server Components (page.tsx)
    ↓
Client Components (ReviewList, PodcastList)
    ↓
UI Components (ReviewListItem, PodcastListItem)
    ↓
TrapezoidCard → User Interaction
```

### SEO Flow

```
Content Files
    ↓
/lib/content.ts (getReviewBySlug, getEpisodeBySlug)
    ↓
/lib/sharePreview.ts (pickOgImage, sanitizeDescription)
    ↓
/lib/seo.ts (buildEntryMeta)
    ↓
generateMetadata() (in page.tsx)
    ↓
Next.js Metadata API
    ↓
HTML <head> tags
```

### Navigation Flow

```
User clicks link
    ↓
Next.js Router (client-side navigation)
    ↓
usePathname() hook (Header, Breadcrumbs)
    ↓
Active state updates
    ↓
UI reflects current page
```

### "Load More" Flow

```
ReviewList/PodcastList (Client Component)
    ↓
useState (visibleCount, isMobile)
    ↓
useEffect (check mobile, set initial count)
    ↓
Slice array (initialReviews.slice(0, visibleCount))
    ↓
Map to ReviewListItem/PodcastListItem
    ↓
User clicks "Load more"
    ↓
handleLoadMore() → setVisibleCount(prev + increment)
    ↓
Re-render with more items
```

### Share Flow

```
ShareChips (Client Component)
    ↓
User clicks "Copy Link"
    ↓
navigator.clipboard.writeText(url)
    ↓
setCopied(true) → Visual feedback
    ↓
setTimeout → setCopied(false) + restore focus
    ↓
aria-live="polite" → Screen reader announcement
```

## Component Dependencies

### Header Component
- **Depends on**: `usePathname()` (Next.js)
- **Uses**: `Link` (Next.js), `Image` (Next.js)
- **Provides**: Navigation, active states

### ReviewList Component
- **Depends on**: `initialReviews` prop (from server component)
- **Uses**: `ReviewListItem`, `ButtonTrapezoid`, `EmptyState`
- **State**: `visibleCount`, `isMobile`
- **Provides**: Paginated list with "Load more"

### TrapezoidCard Component
- **Depends on**: Props (title, kicker, meta, href, children)
- **Uses**: CSS classes (trapezoid-card, chamfer)
- **Provides**: Card UI with hover/focus/active states

### ShareChips Component
- **Depends on**: `title`, `url`, `quote` props
- **Uses**: Icon components (Link, X, Facebook, LinkedIn, Mail)
- **State**: `copied`, `copyButtonRef`
- **Provides**: Share functionality with feedback

### TracklistBox Component
- **Depends on**: `review` prop
- **Uses**: `StreamingButtons`
- **Provides**: Review Trackbox (cream-glass) with tracklist + streaming

### StreamingButtons Component
- **Depends on**: `spotify`, `apple`, `youtubeMusic` props
- **Uses**: `ButtonTrapezoid`, Icon components (Spotify, AppleMusic, YouTubeMusic)
- **Provides**: Streaming service buttons

## Styling Cascade

```
/styles/tokens.css (CSS Variables)
    ↓
/styles/globals.css (Base styles, imports tokens.css)
    ↓
/styles/ui.css (Component styles, imports tokens.css)
    ↓
Tailwind Config (extends tokens)
    ↓
Components (use CSS classes + Tailwind utilities)
```

## Content Layer Flow

```
Markdown File (content/reviews/my-review.md)
    ↓
gray-matter (parse front-matter)
    ↓
validateReview() (check required fields)
    ↓
parseMarkdownFile() (convert body to HTML)
    ↓
Review type (TypeScript)
    ↓
getAllReviews() / getReviewBySlug()
    ↓
Server Component (page.tsx)
```

## Error Handling Flow

```
Page Error
    ↓
/app/error.tsx (Global)
    OR
/app/reviews/[slug]/error.tsx (Entry-specific)
    ↓
User sees friendly error message
    ↓
"Try again" button → reset()
    OR
"Back to..." button → navigate away
```

## Loading Flow

```
Route Navigation
    ↓
/app/reviews/loading.tsx (if exists)
    OR
/app/podcast/loading.tsx (if exists)
    ↓
Loading skeleton (8 gray tiles)
    ↓
Page loads → skeleton disappears
```

## SEO Metadata Flow

```
Entry Page Request
    ↓
generateMetadata() (async function)
    ↓
getReviewBySlug() / getEpisodeBySlug()
    ↓
pickOgImage() → ogImage || cover || DEFAULT_OG
    ↓
sanitizeDescription() → pullQuote || summary (truncated)
    ↓
buildEntryMeta() → Metadata object
    ↓
Next.js injects into <head>
```

## Component Props Interface

### TrapezoidCard
```typescript
{
  variant?: "solid" | "frosted" | "outline"
  as?: keyof JSX.IntrinsicElements
  title: string
  kicker?: string
  meta?: string
  href?: string
  media?: React.ReactNode
  children?: React.ReactNode
}
```

### ButtonTrapezoid
```typescript
{
  tone?: "primary" | "neutral"
  size?: "sm" | "md"
  href?: string
  onClick?: () => void
  children: React.ReactNode
  ...other button/link props
}
```

### ShareChips
```typescript
{
  title: string
  url: string
  quote?: string
}
```

### StreamingButtons
```typescript
{
  spotify?: string
  apple?: string
  youtubeMusic?: string
  size?: "sm" | "md"
}
```

### PullQuote
```typescript
{
  children: React.ReactNode
  cite?: string
}
```

### Breadcrumbs
```typescript
{
  items: Array<{
    label: string
    href?: string
  }>
}
```

### Tag
```typescript
{
  children: React.ReactNode
  className?: string
}
```

### Rating
```typescript
{
  value: number
  outOf?: number (default: 5)
}
```

## State Management

### Client Components with State

1. **ReviewList / PodcastList**
   - `visibleCount`: Number of items to show
   - `isMobile`: Boolean for responsive behavior

2. **ShareChips**
   - `copied`: Boolean for copy feedback
   - `copyButtonRef`: Ref for focus restoration

3. **Footer**
   - `email`: String for newsletter input

4. **Error Boundaries**
   - Error state managed by Next.js
   - `reset()` function provided by Next.js

## Key Interactions

### Navigation
- Header nav links use `usePathname()` to detect active state
- Active link shows trapezoid underline + brand color
- Focus ring always visible (not replaced by underline)

### Cards
- Clickable cards use `TrapezoidCard` with `href` prop
- Hover: `translateY(-2px)` + shadow elevation
- Active: `translateY(-1px)` + softer shadow
- Focus: Visible outline ring

### Buttons
- `ButtonTrapezoid` can be `<button>` or `<Link>`
- Hover/active states same as cards
- Primary: Gradient background
- Neutral: Off-white background with border

### Share
- Copy link: Uses Clipboard API, provides feedback, restores focus
- External links: Open in new tab with `rel="noopener noreferrer"`
- Screen reader: `aria-live="polite"` for feedback

### Load More
- Responsive: 8 items desktop, 5 items mobile initially
- Increment: 8 more desktop, 5 more mobile per click
- Button hides when all items shown

## Accessibility Interactions

### Keyboard Navigation
1. Tab: Moves through interactive elements
2. Enter/Space: Activates buttons/links
3. Focus ring: Always visible on focus
4. Skip link: First focusable element (when visible)

### Screen Readers
- Semantic HTML: `<nav>`, `<article>`, `<section>`, `<aside>`
- ARIA labels: On all interactive elements
- ARIA live regions: For dynamic feedback (copy link)
- Landmarks: Proper page structure

### Reduced Motion
- All transforms disabled under `prefers-reduced-motion: reduce`
- Only shadow/contrast changes remain
- No animations or transitions

## Build-Time Validations

1. **Content Validation**: Required fields checked in `validateReview()` / `validateEpisode()`
2. **Alt Text**: Must be non-empty if cover exists
3. **Link Checker**: `scripts/check-links.mjs` validates internal links
4. **TypeScript**: Type checking catches missing props
5. **Linting**: ESLint enforces code quality

## Performance Considerations

- **Images**: Lazy loaded with `loading="lazy"` and `decoding="async"`
- **YouTube**: Privacy-enhanced embeds, lazy loaded
- **Fonts**: Display font uses `font-display: swap`
- **Code Splitting**: Automatic via Next.js App Router
- **Static Generation**: All pages pre-rendered at build time
- **Client Components**: Only where needed (lists, share, forms)

## Responsive Breakpoints

- **Mobile**: `< 640px` (5 items per load, stacked layout)
- **Desktop**: `≥ 640px` (8 items per load, grid layout)
- **2K/4K**: Additional grid columns at `1536px` and `1920px`

## Component Hierarchy Example

**Review Entry Page**:
```
ReviewEntryPage (Server)
├── Section
│   ├── Breadcrumbs
│   ├── ReviewHeader
│   │   └── PullQuote
│   └── Image (cover)
├── Section
│   └── ReviewBody
│       └── MDX content
├── Section
│   └── TracklistBox
│       ├── h2 (Tracklist)
│       ├── ol (tracklist)
│       ├── h2 (Stream the album)
│       └── StreamingButtons
│           ├── ButtonTrapezoid (Spotify)
│           ├── ButtonTrapezoid (Apple Music)
│           └── ButtonTrapezoid (YouTube Music)
└── Section
    └── ShareChips
        ├── button (Copy Link)
        ├── a (Twitter)
        ├── a (Facebook)
        ├── a (LinkedIn)
        └── a (Email)
```

This structure ensures clear separation of concerns, proper data flow, and maintainable code.



