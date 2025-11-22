# HomeCard CSS Prune Notes - Step 11

## Removed rules

The following `.home-card*` and `.card-actions*` selectors were removed because they are fully covered by Tailwind utilities in `HomeCard.tsx`:

- `.home-card-head` - Flex layout and gap covered by `flex flex-col gap-2`
- `.home-card-title-heading` - Margin reset covered by `m-0` (font inheritance is default)
- `.home-card-title` - Typography covered by `font-display text-[clamp(...)] leading-snug text-brand-purple-800`
- `.home-card-meta` - Typography covered by `text-[0.85rem] tracking-[0.06em] uppercase text-text-muted`
- `.home-card-meta-primary` - Resets covered by `border-0 outline-none shadow-none bg-transparent`
- `.home-card-meta-secondary` - Overrides covered by `normal-case tracking-[0] text-[color-mix(...)]`
- `.home-card-media[data-media-layout="youtube-pullquote"]` - Grid layout covered by `grid grid-rows-[9fr_1fr_6fr] overflow-hidden`
- `.home-card-media-image` - Sizing covered by `w-full h-full object-cover`
- `.home-card-youtube-embed` - Layout covered by `relative w-full h-full overflow-hidden bg-black`
- `.home-card-youtube-iframe` - Positioning covered by `absolute inset-0 w-full h-full border-0`
- `.home-card-pullquote-spacer` - Width covered by `w-full`
- `.home-card-pullquote-text` - Typography covered by `text-[0.95rem] leading-normal text-[color-mix(...)] text-left m-0`
- `.home-card-pullquote` - Typography covered by `text-[0.95rem] leading-normal text-center max-w-[26ch]`
- `.home-card-copy` - Flex layout covered by `flex-1 flex flex-col`
- `.home-card--podcast .home-card-copy` - Justify-content covered by conditional `justify-end`
- `.home-card-text` - Typography covered by `text-[0.95rem] leading-normal text-[color-mix(...)]`
- `.card-actions` - Positioning covered by `mt-auto relative z-[3]`

## Kept rules (partial / complex)

The following selectors were kept because they contain complex styling not fully covered by Tailwind utilities:

- `.home-card` - Kept for clip-path chamfer polygon and interaction state shadows
- `.home-card[data-interaction="hover"]`, `.home-card[data-interaction="focus"]` - Kept for interaction state shadow transitions
- `.home-card--review` / `.home-card--podcast` - Kept because CSS uses !important flags (may be needed for specificity)
- `.home-card-media` - Kept for color-mix background and inset shadow (complex values)
- `.home-card-pullquote-container` - Kept for color-mix background (complex value)
- `.home-card-media-overlay` and all variants - Kept for color-mix backgrounds and complex conditional styling based on data attributes
- `.home-card-media[data-media-layout="split"]` variants - Kept for complex conditional styling with !important flags
- `.card-actions .button-trapezoid` - Kept for color-mix background and border styling (complex values)

## Summary

Removed 17 CSS rule blocks that were fully duplicated by Tailwind utilities. Kept 8+ rule blocks that contain complex art-direction (clip-path chamfer, color-mix backgrounds, interaction states, conditional styling) that cannot be cleanly replaced with Tailwind utilities.

