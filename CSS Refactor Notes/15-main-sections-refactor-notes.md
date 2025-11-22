# Main sections CSS → Tailwind refactor notes

## Summary

- Updated 5 section components (home hero, review strip, newsletter, mission, footer) with Tailwind utilities for layout, typography, and spacing.
- Added Tailwind classes alongside existing BEM classes (no BEM classes were removed from JSX).
- Tailwind utilities handle: responsive display, flex/grid layouts, gaps, padding/margins, typography sizing/alignment, colors, and basic interactions.
- Complex visuals (color-mix backgrounds, CSS var dependencies, component-specific overrides) remain in CSS.

## Removed CSS rules

### Hero
- `.home-hero-section` - responsive display and margin-top (now handled by `hidden md:block mt-8 mb-0`)
- `.home-hero-copy` - flex column layout, gap, text-align, width (now handled by `flex flex-col gap-3 text-center w-full`)

### Review strip
- `.review-strip-artwork` - min-width and responsive width (now handled by `min-w-[200px] md:w-auto md:min-w-[200px]`)
- `.review-strip-artwork > a` - flex layout on desktop (now handled by `md:flex md:items-stretch`)
- `.review-strip-artwork > a > div` - aspect ratio on desktop (now handled by `md:w-full md:h-full md:aspect-square`)

### Newsletter
- `.newsletter-section` - margin-top (now handled by `mt-16`)
- `.newsletter-form` - flex layout (now handled by `flex items-center`)

### Mission
- `.mission-columns-wrapper` - position relative (now handled by `relative`)

### Footer
- `.site-footer` - margin-top (now handled by `mt-12`)
- `.site-footer__bar` - background, width, padding (now handled by `bg-brand-pink500 w-full py-6`)
- `.site-footer__inner` - flex layout (now handled by `flex items-center gap-6 flex-wrap`)
- `.site-footer__social` - flex layout (now handled by `flex items-center gap-4`)
- `.site-footer__social-link` - inline-flex, center, color, transition (now handled by `inline-flex items-center justify-center text-brand-purple800 transition-opacity`)
- `.site-footer__social-link:hover` - opacity (now handled by `hover:opacity-80`)
- `.site-footer__social-link:focus-visible` - outline styling (now handled by `focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-purple800 focus-visible:outline-offset-2 focus-visible:rounded-sm`)
- `.site-footer__nav` - flex: 1 (now handled by `flex-1`)
- `.site-footer__meta .caption` - color inherit (now handled by `text-inherit`)
- `.site-footer__meta a` - link styling (now handled by `text-inherit underline underline-offset-2`)
- `.site-footer__meta a:hover` - hover color (now handled by `hover:text-brand-purple800`)

## Kept CSS rules (complex / partial)

### Hero
- `.home-hero-shell` - CSS vars for min-height, background, shadow (kept: `min-h-[var(--hero-min-height)] bg-[var(--surface)] shadow-soft` use CSS vars)
- `.home-hero-badge` - not used in component, but kept for potential future use
- `.home-hero-credit` - not used in component, but kept for potential future use

### Review strip
- `.review-strip-button .button-trapezoid` - component-specific override, keep for specificity
- `.review-strip-button .button-trapezoid:hover` - color-mix background requires CSS

### Newsletter
- `.newsletter-shell` - CSS vars for background, border, shadow (kept: `bg-[var(--newsletter-surface)] border border-[var(--newsletter-border)] shadow-soft` use CSS vars)

### Mission
- `.mission-divider` - color-mix background, CSS vars for transform, complex visual effect (kept: color-mix and CSS var dependencies)

### Footer
- `.site-footer__nav .nav-list` - component-specific override, keep for specificity
- `.site-footer__meta` - color-mix requires CSS (kept: `text-[color-mix(...)]` requires CSS)


