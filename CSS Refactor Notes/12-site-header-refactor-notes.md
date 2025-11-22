# Site header CSS → Tailwind refactor notes

## Summary

- Updated `components/Header.tsx` with Tailwind utility classes for layout, spacing, and typography.
- Added Tailwind classes alongside existing `.site-header*` and `.nav-*` class names (additive only).
- Focused on layout/spacing/typography utilities; complex decorative elements (clip-path, color-mix, pseudo-elements) remain in CSS.
- Pruned only CSS rules that are fully covered by Tailwind utilities in the header component.

## Removed CSS rules

- `.site-header__layout` - Flex layout wrapper (replaced by `flex items-center justify-between gap-4`)
- `.site-header__cluster` - Brand + nav cluster wrapper (replaced by `flex items-stretch gap-0 min-w-0`)
- `.site-header__brand-mark` - Logo image wrapper (replaced by `inline-flex items-center justify-center w-[clamp(120px,10vw,176px)]`)
- `.site-header__brand-mark img` - Logo image sizing (replaced by Tailwind width/height utilities)
- `.site-header__mobile` - Mobile menu wrapper (replaced by `flex items-center ml-auto relative`)
- `.site-header__mobile-trigger svg` - Mobile menu icon sizing (replaced by `w-[22px] h-[22px]`)
- `.site-header__mobile-panel` - Mobile menu dropdown (replaced by Tailwind positioning/layout utilities)
- `.site-header__mobile-panel[data-open="true"]` - Mobile menu open state (replaced by `data-[open=true]:flex`)
- `.site-header__mobile-panel a` - Mobile menu link typography (replaced by `font-display uppercase tracking-[0.08em] text-brand-purple-800`)
- `.site-header__nav .nav-list` - Header nav list gap/justify (replaced by `justify-center gap-[1.5rem]`)

## Kept CSS rules (complex / partial)

- `.site-header` - Base header container (kept for `::before` pseudo-element full-width background)
- `.site-header::before` - Full-width background pseudo-element (complex positioning)
- `.site-header__brand` - Brand link (kept for `::after` pseudo-element chamfered background)
- `.site-header__brand::after` - Chamfered background with clip-path (complex clip-path and color-mix)
- `.site-header__nav` - Desktop navigation panel (kept for complex background color-mix, border color-mix, clip-path)
- `.site-header__nav-divider` - Angled divider stripe (complex gradient and clip-path)
- `.site-header__mobile-trigger` - Mobile menu button (kept for complex background color-mix)
- `.nav-list` - Navigation list base (used in Footer.tsx - keep for now)
- `.nav-link` - Navigation link base (kept for `::before` pseudo-element angled divider)
- `.nav-link:hover` - Nav link hover state (used in Footer.tsx - keep for now)
- `.nav-link::before` - Angled divider pseudo-element (complex transform and color-mix)
- `.nav-link.nav-angle-1::before` - Angle variant 1 (complex transform)
- `.nav-link.nav-angle-2::before` - Angle variant 2 (complex transform)
- `.nav-link:first-child::before` - Hide divider on first link (pseudo-element control)
- `.nav-link.is-active::after` - Active link underline (complex clip-path and color-mix)
- `.nav-link[aria-current="page"]::after` - Current page underline (complex clip-path and color-mix)
- `.nav-list--wrap` - Nav list wrap modifier (used in Header mobile panel - keep for now)
- `.site-header__nav .nav-link::before` - Hide nav link divider in header (pseudo-element control)
- `.site-header__nav .nav-list > li` - Header nav list item (kept for CSS variable assignment)
- `.site-header__nav .nav-list > li::after` - Header nav divider between items (complex transform and color-mix)
- `.site-header__nav .nav-list > li:last-child::after` - Hide divider on last item (pseudo-element control)
- `.site-header__nav .nav-list > li:nth-child(4n + 1)` - Header nav divider angle variant 1 (CSS variable assignment)
- `.site-header__nav .nav-list > li:nth-child(4n + 2)` - Header nav divider angle variant 2 (CSS variable assignment)
- `.site-header__nav .nav-list > li:nth-child(4n + 3)` - Header nav divider angle variant 3 (CSS variable assignment)
- `.site-header__nav .nav-list > li:nth-child(4n + 4)` - Header nav divider angle variant 4 (CSS variable assignment)
- `.site-header__mobile-panel .nav-link::before` - Hide nav link divider in mobile panel (pseudo-element control)

