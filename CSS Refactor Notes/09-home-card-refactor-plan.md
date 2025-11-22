# HomeCard CSS → Tailwind refactor plan

## Context

- HomeCard currently relies on a set of global `.home-card*` and related classes in `globals.css`.
- Tailwind theme now mirrors our design tokens, so most layout, typography, and spacing can be done via Tailwind utilities.
- Goal: move as much as possible into Tailwind classes in `HomeCard.tsx`, keeping only the truly "art-direction / complex" bits in CSS.

## Relevant CSS selectors

| selector              | role / description                         | used? (from audit) | primary file(s) using it         |
|-----------------------|--------------------------------------------|--------------------|----------------------------------|
| `.home-card` | Main card container with flex column layout, chamfered corners, padding, gap, shadows, and interaction states | yes | `app/(home)/components/HomeCard.tsx`, `components/PodcastStrip.tsx` |
| `.home-card--review` | Variant modifier for review cards (border color) | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card--podcast` | Variant modifier for podcast cards (border color) | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-head` | Header section with flex column and gap | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-title-heading` | Heading wrapper reset (margin, font inheritance) | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-title` | Title link with display font, responsive clamp size, line-height, color | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-meta` | Base meta text styling (font-size, letter-spacing, uppercase, color) | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-meta-primary` | Primary meta variant (removes border/outline/shadow/background) | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-meta-secondary` | Secondary meta variant (removes uppercase, different color) | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-media` | Media container with positioning, flex, width, background, inset shadow | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-media[data-media-layout="youtube-pullquote"]` | Grid layout for YouTube + pullquote layout (9fr 1fr 6fr) | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-media-image` | Image element sizing and object-fit | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-youtube-embed` | YouTube embed wrapper with positioning and overflow | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-youtube-iframe` | YouTube iframe absolute positioning | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-pullquote-spacer` | Spacer element for grid layout (width 100%) | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-pullquote-container` | Pullquote container with flex, padding, background, overflow | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-pullquote-text` | Pullquote text styling (font-size, line-height, color, alignment, margin) | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-media-overlay` | Overlay with absolute positioning, flex centering, background, z-index | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card--review .home-card-media-overlay` | Review variant overlay background color | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card--podcast .home-card-media-overlay` | Podcast variant overlay background color | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-media[data-media-layout="split"] .home-card-media-overlay` | Split layout overlay positioning and styling overrides | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-pullquote` | Pullquote element styling (font-size, line-height, alignment, max-width) | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-media[data-media-layout="split"] .home-card-pullquote` | Split layout pullquote overrides | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-copy` | Copy section with flex and flex-direction | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card--podcast .home-card-copy` | Podcast variant copy justify-content override | yes | `app/(home)/components/HomeCard.tsx` |
| `.home-card-text` | Summary text styling (font-size, line-height, color) | yes | `app/(home)/components/HomeCard.tsx` |
| `.card-actions` | Actions container with margin-top auto, positioning, z-index | yes | `app/(home)/components/HomeCard.tsx` |
| `.card-actions .button-trapezoid` | Button styling within card actions (background, color, border, width, alignment) | yes | `app/(home)/components/HomeCard.tsx` |
| `.card-actions--image-button` | Image button variant (not used) | no | N/A |

## Mapping to Tailwind utilities

| selector          | current behavior (CSS summary)                    | proposed Tailwind classes (approx)                            | keep CSS for? (yes/no + why) |
|-------------------|---------------------------------------------------|----------------------------------------------------------------|------------------------------|
| `.home-card` | Flex column, gap (var(--home-card-gap)), padding (var(--home-card-padding)), background (var(--surface)), box-shadow (var(--card-shadow-rest)), border-width (var(--border-strong-width)), chamfered clip-path | `flex flex-col gap-4 p-6 bg-surface shadow-card-rest border-[1.5px] border-solid` | **yes** - Complex chamfered clip-path polygon, interaction state shadows, and `surface-chamfer` utility dependency |
| `.home-card--review` | Border color override (var(--card-border-review)) | `border-[var(--card-border-review)]` | **no** - Simple border color can be conditional class |
| `.home-card--podcast` | Border color override (var(--brand-purple-800)) | `border-brand-purple-800` | **no** - Simple border color can be conditional class |
| `.home-card-head` | Flex column, gap (var(--space-2)) | `flex flex-col gap-2` | **no** - Simple flex layout |
| `.home-card-title-heading` | Margin reset, font inheritance | `m-0` (font inheritance is default) | **no** - Simple reset |
| `.home-card-title` | Display font family, clamp font-size (1.35rem to 1.65rem), line-height (var(--lh-snug)), color (var(--brand-purple-800)) | `font-display text-[clamp(1.35rem,1vw+1rem,1.65rem)] leading-snug text-brand-purple-800` | **no** - Typography utilities |
| `.home-card-meta` | Font-size (0.85rem), letter-spacing (0.06em), uppercase, color (var(--text-muted)) | `text-[0.85rem] tracking-[0.06em] uppercase text-text-muted` | **no** - Typography utilities |
| `.home-card-meta-primary` | Removes border, outline, box-shadow, background | `border-0 outline-none shadow-none bg-transparent` | **no** - Simple resets |
| `.home-card-meta-secondary` | Removes uppercase, different color (color-mix) | `normal-case text-[color-mix(in_oklab,var(--brand-purple-600)_70%,transparent)]` | **maybe** - Color-mix might need CSS var or custom color in Tailwind config |
| `.home-card-media` | Position relative, flex-none, width 100%, border reset, background (color-mix), inset box-shadow | `relative flex-none w-full border-0 bg-[color-mix(in_oklab,var(--brand-pink-100)_12%,transparent)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--brand-purple-600)_10%,transparent)]` | **maybe** - Complex color-mix values might be better as CSS vars in Tailwind theme |
| `.home-card-media[data-media-layout="youtube-pullquote"]` | Grid with template-rows (9fr 1fr 6fr), overflow hidden | `grid grid-rows-[9fr_1fr_6fr] overflow-hidden` | **no** - Grid utilities |
| `.home-card-media-image` | Width/height 100%, object-fit cover | `w-full h-full object-cover` | **no** - Simple sizing |
| `.home-card-youtube-embed` | Position relative, width/height 100%, overflow hidden, background black | `relative w-full h-full overflow-hidden bg-black` | **no** - Simple layout |
| `.home-card-youtube-iframe` | Absolute positioning, inset 0, width/height 100%, border 0 | `absolute inset-0 w-full h-full border-0` | **no** - Simple positioning |
| `.home-card-pullquote-spacer` | Width 100% | `w-full` | **no** - Simple width |
| `.home-card-pullquote-container` | Flex, align-items center, padding (var(--space-4)), background (color-mix), overflow hidden | `flex items-center p-4 bg-[color-mix(in_oklab,var(--brand-pink-100)_40%,transparent)] overflow-hidden` | **maybe** - Color-mix might need CSS var |
| `.home-card-pullquote-text` | Font-size (0.95rem), line-height (var(--lh-normal)), color (color-mix), text-align left, margin 0 | `text-[0.95rem] leading-normal text-[color-mix(in_oklab,var(--brand-purple-800)_90%,transparent)] text-left m-0` | **maybe** - Color-mix might need CSS var |
| `.home-card-media-overlay` | Absolute, inset 0, flex column, center alignment, gap (var(--space-3)), background (color-mix), color, z-index 2, pointer-events none | `absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color-mix(in_oklab,var(--brand-purple-800)_40%,transparent)] text-brand-pink-100 z-[2] pointer-events-none` | **maybe** - Complex color-mix and variant-specific backgrounds might be better in CSS |
| `.home-card--review .home-card-media-overlay` | Background color override (color-mix) | Conditional class or CSS | **maybe** - Variant-specific color-mix |
| `.home-card--podcast .home-card-media-overlay` | Background color override (color-mix) | Conditional class or CSS | **maybe** - Variant-specific color-mix |
| `.home-card-media[data-media-layout="split"] .home-card-media-overlay` | Complex positioning and styling overrides for split layout | Conditional classes or CSS | **yes** - Complex conditional styling based on data attribute |
| `.home-card-pullquote` | Font-size (0.95rem), line-height (var(--lh-normal)), text-align center, max-width (26ch) | `text-[0.95rem] leading-normal text-center max-w-[26ch]` | **no** - Simple typography |
| `.home-card-media[data-media-layout="split"] .home-card-pullquote` | Split layout overrides (text-align, max-width, opacity, min-height) | Conditional classes | **maybe** - Conditional styling |
| `.home-card-copy` | Flex 1, flex column | `flex-1 flex flex-col` | **no** - Simple flex |
| `.home-card--podcast .home-card-copy` | Justify-content flex-end | `justify-end` (conditional) | **no** - Simple flex utility |
| `.home-card-text` | Font-size (0.95rem), line-height (var(--lh-normal)), color (color-mix) | `text-[0.95rem] leading-normal text-[color-mix(in_oklab,var(--brand-purple-800)_90%,transparent)]` | **maybe** - Color-mix might need CSS var |
| `.card-actions` | Margin-top auto, position relative, z-index 3 | `mt-auto relative z-[3]` | **no** - Simple layout |
| `.card-actions .button-trapezoid` | Background (color-mix), color, border, width 100%, text-align center, justify-content center | `bg-[color-mix(in_oklab,var(--brand-pink-300)_40%,transparent)] text-brand-purple-800 border-brand-pink-300 w-full text-center justify-center` | **maybe** - Color-mix might need CSS var, but button styling might stay in component CSS |

## Step-by-step refactor plan

1. **Start with the card container**: Update `HomeCard.tsx` to add Tailwind classes for basic layout (`flex flex-col gap-4 p-6`), background (`bg-surface`), and shadow (`shadow-card-rest`), while keeping `.home-card` class for chamfered corners and interaction states. Keep `.surface-chamfer` for clip-path.

2. **Migrate typography classes**: Replace `.home-card-title`, `.home-card-meta`, `.home-card-meta-primary`, `.home-card-meta-secondary`, `.home-card-text`, `.home-card-pullquote-text` with Tailwind typography utilities. Handle color-mix values by either adding them to Tailwind theme as custom colors or keeping minimal CSS for those specific color-mix values.

3. **Migrate layout classes**: Replace `.home-card-head`, `.home-card-copy`, `.card-actions` with Tailwind flex utilities. Replace `.home-card-media` basic layout with Tailwind, but keep complex color-mix backgrounds in CSS or add to Tailwind theme.

4. **Handle variant-specific styles**: Convert `.home-card--review` and `.home-card--podcast` border colors to conditional Tailwind classes. For variant-specific color-mix backgrounds (overlay), either add to Tailwind theme or keep minimal CSS.

5. **Migrate media-related classes**: Replace `.home-card-media-image`, `.home-card-youtube-embed`, `.home-card-youtube-iframe`, `.home-card-pullquote-spacer` with Tailwind utilities. Keep `.home-card-media[data-media-layout="youtube-pullquote"]` grid layout as Tailwind classes. Keep complex `.home-card-media[data-media-layout="split"]` conditional styling in CSS.

6. **Keep complex art-direction**: Maintain CSS for chamfered corners (via `.surface-chamfer`), complex color-mix backgrounds that don't map cleanly to Tailwind, and data-attribute conditional styling (split layout overrides).

7. **Cleanup**: Once Tailwind equivalents are verified visually, remove unused `.home-card*` rules from `globals.css`, keeping only the complex art-direction pieces (chamfered corners, complex color-mix, conditional data-attribute styling).


