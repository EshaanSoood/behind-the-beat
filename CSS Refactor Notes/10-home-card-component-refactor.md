# HomeCard Component Refactor - Step 10

## Summary

Added Tailwind utility classes alongside existing `.home-card*` CSS classes in `HomeCard.tsx` to mirror the styling currently defined in `globals.css`. All existing CSS classes were preserved to ensure no visual changes occur.

## Changes Made

- **Card container**: Added `flex flex-col gap-4 p-6 bg-surface shadow-card-rest border-[1.5px] border-solid` with conditional border colors for review/podcast variants
- **Header section**: Added `flex flex-col gap-2` to `.home-card-head`
- **Title**: Added `m-0` to heading wrapper, `font-display text-[clamp(1.35rem,1vw+1rem,1.65rem)] leading-snug text-brand-purple-800` to title link
- **Meta elements**: Added typography utilities (`text-[0.85rem] tracking-[0.06em] uppercase text-text-muted`) with overrides for secondary meta (`normal-case tracking-[0]` and color-mix color)
- **Media container**: Added layout utilities (`relative aspect-square flex-none w-full border-0`) with conditional grid layout for podcast YouTube layout
- **YouTube embed**: Added `relative w-full h-full overflow-hidden bg-black` to embed wrapper, `absolute inset-0 w-full h-full border-0` to iframe
- **Pullquote elements**: Added typography and layout utilities to pullquote container and text
- **Media overlay**: Added positioning and layout utilities (`absolute inset-0 flex flex-col items-center justify-center gap-3`) with variant-specific color-mix backgrounds
- **Copy section**: Added `flex-1 flex flex-col` with conditional `justify-end` for podcast variant
- **Text content**: Added typography utilities (`text-[0.95rem] leading-normal`) with color-mix color
- **Card actions**: Added `mt-auto relative z-[3]` for positioning

## Arbitrary Values Used

The following Tailwind arbitrary values were used to match exact CSS behavior:

- `text-[clamp(1.35rem,1vw+1rem,1.65rem)]` - Responsive title font size
- `border-[1.5px]` - Border width matching CSS variable
- `border-[var(--card-border-review)]` - Review variant border color (CSS variable)
- `bg-[color-mix(in_oklab,var(--brand-pink-100)_12%,transparent)]` - Media container background
- `shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--brand-purple-600)_10%,transparent)]` - Inset shadow on media container
- `bg-[color-mix(in_oklab,var(--brand-pink-100)_40%,transparent)]` - Pullquote container background
- `text-[color-mix(in_oklab,var(--brand-purple-800)_90%,transparent)]` - Text colors using color-mix
- `bg-[color-mix(in_oklab,var(--brand-purple-800)_40%,transparent)]` - Overlay background (default)
- `bg-[color-mix(in_oklab,var(--brand-pink-500)_30%,transparent)]` - Review variant overlay background
- `bg-[color-mix(in_oklab,var(--brand-purple-600)_30%,transparent)]` - Podcast variant overlay background
- `max-w-[26ch]` - Pullquote max width
- `tracking-[0.06em]` - Letter spacing
- `tracking-[0]` - Letter spacing override for secondary meta
- `opacity-[0.15]` - Text opacity on interaction

## CSS Left Intact

The following complex styling remains handled purely by CSS:

- **Chamfered corners**: `.surface-chamfer` utility and `.home-card` clip-path polygon
- **Paper grain texture**: `.paper-grain` utility with pseudo-element background
- **Interaction state shadows**: `.home-card[data-interaction]` shadow transitions
- **Complex conditional styling**: `.home-card-media[data-media-layout="split"]` overrides for split layout
- **Electric border**: Component-specific styling handled by `ElectricBorder` component
- **Focus chamfer**: `.focus-chamfer` utility with complex clip-path focus ring

## Notes

- All existing `.home-card*` classes were preserved to ensure CSS continues to apply complex art-direction
- Variant-specific border colors were added as conditional Tailwind classes in addition to the BEM variant classes
- Color-mix values were preserved as arbitrary values since they don't map cleanly to standard Tailwind tokens
- The refactor is purely additive - no CSS classes were removed, ensuring visual appearance remains unchanged

