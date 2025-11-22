# tokens.css usage audit

## Audit table

| token name | category | defined value (short) | used? (yes/no/maybe) | usage locations (files) | internal-only? (yes/no) | notes |
| ---------- | -------- | --------------------- | -------------------- | ----------------------- | ----------------------- | ----- |
| --magazine-white | color | #FFFFFF | yes | tokens.css (internal), globals.css, tailwind.config.ts | no | Base white color, used by surface tokens |
| --brand-pink-100 | color | #FFD3E8 | yes | tokens.css (internal), globals.css, tailwind.config.ts, components/Header.tsx, components/SpecialH1.tsx, app/(home)/components/HomeCard.tsx | no | Used extensively |
| --brand-pink-300 | color | #FFB0DA | yes | tokens.css (internal), globals.css, tailwind.config.ts, components/Header.tsx, app/(home)/components/HomeCard.tsx | no | Used extensively |
| --brand-pink-500 | color | #FF8CCB | yes | tokens.css (internal), globals.css, tailwind.config.ts, components/ReviewStrip.tsx, components/ElectricBorder.tsx, app/(home)/components/HomeCard.tsx | no | Used extensively |
| --brand-purple-600 | color | #7A3A8C | yes | tokens.css (internal), globals.css, tailwind.config.ts, components/Header.tsx, components/Footer.tsx, components/EntryColumn.tsx, components/ElectricBorder.tsx, app/(home)/components/HomeCard.tsx | no | Used extensively |
| --brand-purple-800 | color | #6D2B79 | yes | tokens.css (internal), globals.css, tailwind.config.ts, components/Header.tsx, components/Footer.tsx, components/EntryColumn.tsx, app/(home)/components/HomeCard.tsx | no | Used extensively |
| --surface | surface/background | var(--magazine-white) | yes | tokens.css (internal), globals.css, tailwind.config.ts, app/(home)/components/HomeCard.tsx | no | Used in components |
| --bg | surface/background | var(--magazine-white) | yes | globals.css, tailwind.config.ts | no | Used in base styles |
| --bg-elevated | surface/background | var(--magazine-white) | yes | tailwind.config.ts | no | Used in Tailwind config |
| --offwhite | surface/background | var(--magazine-white) | yes | tokens.css (internal), tailwind.config.ts | no | Used in surface-frost-white-90 |
| --surface-frost-pink-70 | surface/background | color-mix(...) | yes | tokens.css (internal), globals.css, tailwind.config.ts, components/TrapezoidCard.tsx, app/reviews/[slug]/components/TracklistBox.tsx | no | Used in components |
| --surface-frost-pink-85 | surface/background | color-mix(...) | yes | tailwind.config.ts | no | Available via Tailwind |
| --surface-frost-purple-30 | surface/background | color-mix(...) | yes | tailwind.config.ts | no | Available via Tailwind |
| --surface-frost-white-90 | surface/background | color-mix(...) | yes | tailwind.config.ts | no | Available via Tailwind |
| --gradient-card-review | misc | linear-gradient(...) | no | tokens.css only | yes | Not referenced anywhere |
| --gradient-card-podcast | misc | linear-gradient(...) | no | tokens.css only | yes | Not referenced anywhere |
| --gradient-hero-title | misc | linear-gradient(...) | no | tokens.css only | yes | Not referenced anywhere |
| --text-deep-purple | color | var(--brand-purple-800) | yes | tokens.css (internal), globals.css, tailwind.config.ts, components/SpecialH1.tsx, components/PortableTextRenderer.tsx | no | Used in components |
| --border-accent | color | rgba(...) / color-mix(...) | yes | tokens.css (internal), globals.css, tailwind.config.ts | no | Used in border token |
| --border-accent-strong | color | rgba(...) / color-mix(...) | yes | tokens.css (internal), globals.css, tailwind.config.ts, app/(home)/components/HomeHero.tsx | no | Used in components |
| --pink-outline | color | #ffc3d9 | yes | tokens.css (internal), tailwind.config.ts | no | Used in card-border-review |
| --purple-outline | color | #5a2a82 | yes | tokens.css (internal), tailwind.config.ts | no | Used in card-border-podcast |
| --text | typography | var(--text-deep-purple) | yes | globals.css, tailwind.config.ts, components/PullQuote.tsx, components/PortableTextRenderer.tsx | no | Used extensively |
| --text-strong | typography | var(--text-deep-purple) | yes | globals.css, tailwind.config.ts | no | Used in base styles |
| --text-muted | typography | var(--brand-purple-600) | yes | globals.css, tailwind.config.ts, components/PullQuote.tsx, components/PortableTextRenderer.tsx | no | Used in components |
| --brand-pink | color | var(--brand-pink-500) | yes | tailwind.config.ts | no | Alias, used in Tailwind |
| --brand-purple | color | var(--brand-purple-800) | yes | tailwind.config.ts | no | Alias, used in Tailwind |
| --brand-dark-pink | color | var(--brand-pink-500) | yes | tailwind.config.ts | no | Alias, used in Tailwind |
| --brand-gradient | misc | linear-gradient(...) | yes | tokens.css (internal), components/PullQuote.tsx | no | Used in PullQuote component |
| --border | color | var(--border-accent) | yes | tailwind.config.ts | no | Used in Tailwind config |
| --border-strong-width | layout | 1.5px | yes | globals.css | no | Used in home-card styling |
| --border-strong-color | color | var(--border-accent-strong) | yes | tokens.css (internal) | yes | Only referenced internally, but border-strong-width is used |
| --shadow-soft | shadow | rgba(...) / color-mix(...) | yes | tokens.css (internal), globals.css, tailwind.config.ts, components/Header.tsx, app/(home)/components/HomeHero.tsx | no | Used extensively |
| --shadow-card | shadow | rgba(...) / color-mix(...) | yes | tokens.css (internal), tailwind.config.ts | no | Used in Tailwind config |
| --card-shadow-rest | shadow | var(--shadow-soft) | yes | tokens.css (internal), globals.css | no | Used in home-card |
| --card-shadow-hover | shadow | rgba(...) / color-mix(...) | yes | tokens.css (internal), globals.css | no | Used in home-card |
| --card-shadow-focus | shadow | color-mix(...) | yes | tokens.css (internal), globals.css | no | Used in focus-chamfer |
| --card-border-review | color | var(--pink-outline) | yes | tokens.css (internal), globals.css, tailwind.config.ts | no | Used in home-card--review |
| --card-border-podcast | color | var(--purple-outline) | yes | tokens.css (internal), tailwind.config.ts | no | Available via Tailwind |
| --paper-grain-opacity | misc | 0.12 | yes | globals.css | no | Used in paper-grain utility |
| --asset-root | misc | / | no | tokens.css only | yes | Not referenced anywhere |
| --font-display | typography | "GrobeDeutschmeister", ... | yes | globals.css, tailwind.config.ts, components/SpecialH1.tsx | no | Used extensively |
| --font-body | typography | -apple-system, ... | yes | globals.css, tailwind.config.ts | no | Used in base styles |
| --text-h1 | typography | clamp(...) | yes | globals.css, tailwind.config.ts, components/SpecialH1.tsx | no | Used extensively |
| --text-h2 | typography | clamp(...) | yes | globals.css, tailwind.config.ts, components/PortableTextRenderer.tsx | no | Used extensively |
| --text-h3 | typography | clamp(...) | yes | globals.css, tailwind.config.ts | no | Used in base styles |
| --text-body-lg | typography | 1.125rem | yes | tailwind.config.ts | no | Available via Tailwind |
| --text-body | typography | 1rem | yes | globals.css, tailwind.config.ts | no | Used extensively |
| --text-caption | typography | 0.875rem | yes | globals.css, tailwind.config.ts, components/Footer.tsx | no | Used in components |
| --lh-tight | typography | 1.2 | yes | globals.css, tailwind.config.ts, components/SpecialH1.tsx | no | Used extensively |
| --lh-snug | typography | 1.3 | yes | globals.css, tailwind.config.ts | no | Used in base styles |
| --lh-normal | typography | 1.5 | yes | globals.css, tailwind.config.ts, components/PullQuote.tsx | no | Used extensively |
| --measure | layout | 70ch | yes | globals.css | no | Used in prose-measure utility |
| --space-1 | spacing | 4px | yes | tailwind.config.ts | no | Available via Tailwind |
| --space-2 | spacing | 8px | yes | globals.css, tailwind.config.ts, app/(home)/components/HomeCard.tsx | no | Used extensively |
| --space-3 | spacing | 12px | yes | globals.css, tailwind.config.ts, components/Header.tsx, app/(home)/components/HomeCard.tsx | no | Used extensively |
| --space-4 | spacing | 16px | yes | globals.css, tailwind.config.ts, app/(home)/components/HomeCard.tsx | no | Used extensively |
| --space-6 | spacing | 24px | yes | tokens.css (internal), globals.css, tailwind.config.ts, components/Header.tsx, app/(home)/components/HomeCard.tsx | no | Used extensively |
| --space-8 | spacing | 32px | yes | globals.css, tailwind.config.ts | no | Used in base styles |
| --space-10 | spacing | 40px | yes | tailwind.config.ts | no | Available via Tailwind |
| --space-12 | spacing | 48px | yes | tailwind.config.ts | no | Available via Tailwind |
| --space-16 | spacing | 64px | yes | globals.css, tailwind.config.ts | no | Used in home-feed-section |
| --radius-sm | radius | 10px | yes | tailwind.config.ts | no | Available via Tailwind |
| --radius-md | radius | 16px | yes | tailwind.config.ts | no | Available via Tailwind |
| --radius-lg | radius | 20px | yes | tailwind.config.ts | no | Available via Tailwind |
| --ch | layout | 14px | yes | tokens.css (internal), globals.css, components/Header.tsx, app/(home)/components/HomeCard.tsx | no | Chamfer size, used extensively |
| --nav-stripe | layout | 12px | yes | globals.css, components/Header.tsx | no | Used in header nav divider |
| --slant-base | layout | -18deg | yes | globals.css, app/mission/components/MissionProse.tsx | no | Used in mission divider |
| --slant-1 | layout | -14deg | no | tokens.css only | yes | Not referenced anywhere |
| --slant-2 | layout | -18deg | no | tokens.css only | yes | Not referenced anywhere (same as slant-base) |
| --slant-3 | layout | -22deg | no | tokens.css only | yes | Not referenced anywhere |
| --divider-thickness | layout | 8px | yes | globals.css, app/mission/components/MissionProse.tsx | no | Used in mission divider |
| --gutter-horizontal | layout | clamp(...) | no | tokens.css only | yes | Not referenced anywhere |
| --home-grid-gap | layout | var(--space-6) | yes | globals.css | no | Used in home-card-grid |
| --home-card-padding | layout | var(--space-6) | yes | globals.css | no | Used in home-card |
| --home-card-gap | layout | var(--space-4) | yes | globals.css | no | Used in home-card |
| --newsletter-surface | surface/background | color-mix(...) | yes | tokens.css (internal), globals.css, tailwind.config.ts, app/(home)/components/NewsletterSignup.tsx | no | Used in newsletter shell |
| --newsletter-border | color | color-mix(...) | yes | tokens.css (internal), globals.css, tailwind.config.ts, app/(home)/components/NewsletterSignup.tsx | no | Used in newsletter shell |
| --hero-min-height | layout | clamp(...) | yes | globals.css, app/(home)/components/HomeHero.tsx | no | Used in home-hero-shell |

