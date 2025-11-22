# HomeCard CSS Prune Plan

## Analysis of `.home-card*` and `.card-actions*` rules

| selector | properties in CSS | Tailwind covers all? (yes/partial/no) | keep reason (if partial/no) |
|----------|-------------------|--------------------------------------|------------------------------|
| `.home-card` | position: relative, display: flex, flex-direction: column, gap, padding, background, overflow: visible, box-shadow, border-width, border-style, **clip-path (chamfer)** | **partial** | Keep for clip-path chamfer polygon and interaction state shadows |
| `.home-card[data-interaction="hover"]`, `.home-card[data-interaction="focus"]` | box-shadow (hover state) | **partial** | Keep for interaction state shadow transitions |
| `.home-card--review` | border-color with !important | **partial** | Keep because CSS uses !important flag (may be needed for specificity) |
| `.home-card--podcast` | border-color with !important | **partial** | Keep because CSS uses !important flag (may be needed for specificity) |
| `.home-card-head` | display: flex, flex-direction: column, gap | **yes** | Fully covered by `flex flex-col gap-2` |
| `.home-card-title-heading` | margin: 0, font-size: inherit, font-weight: inherit, line-height: inherit, color: inherit | **yes** | Fully covered by `m-0` (inheritance is default) |
| `.home-card-title` | font-family, font-size (clamp), line-height, color | **yes** | Fully covered by `font-display text-[clamp(...)] leading-snug text-brand-purple-800` |
| `.home-card-meta` | font-size, letter-spacing, text-transform: uppercase, color | **yes** | Fully covered by `text-[0.85rem] tracking-[0.06em] uppercase text-text-muted` |
| `.home-card-meta-primary` | border: none, outline: none, box-shadow: none, background: transparent | **yes** | Fully covered by `border-0 outline-none shadow-none bg-transparent` |
| `.home-card-meta-secondary` | text-transform: none, letter-spacing: 0, color (color-mix) | **yes** | Fully covered by `normal-case tracking-[0] text-[color-mix(...)]` |
| `.home-card-media` | position: relative, flex: none, width: 100%, border-width: 0, border-color: transparent, **background (color-mix)**, **box-shadow (inset)** | **partial** | Keep for color-mix background and inset shadow (complex values) |
| `.home-card-media[data-media-layout="youtube-pullquote"]` | display: grid, grid-template-rows, overflow: hidden | **yes** | Fully covered by `grid grid-rows-[9fr_1fr_6fr] overflow-hidden` |
| `.home-card-media-image` | width: 100%, height: 100%, object-fit: cover | **yes** | Fully covered by `w-full h-full object-cover` |
| `.home-card-youtube-embed` | position: relative, width: 100%, height: 100%, overflow: hidden, background: #000 | **yes** | Fully covered by `relative w-full h-full overflow-hidden bg-black` |
| `.home-card-youtube-iframe` | position: absolute, inset: 0, width: 100%, height: 100%, border: 0 | **yes** | Fully covered by `absolute inset-0 w-full h-full border-0` |
| `.home-card-pullquote-spacer` | width: 100% | **yes** | Fully covered by `w-full` |
| `.home-card-pullquote-container` | display: flex, align-items: center, padding, **background (color-mix)**, overflow: hidden | **partial** | Keep for color-mix background (complex value) |
| `.home-card-pullquote-text` | font-size, line-height, color (color-mix), text-align: left, margin: 0 | **yes** | Fully covered by `text-[0.95rem] leading-normal text-[color-mix(...)] text-left m-0` |
| `.home-card-media-overlay` | position: absolute, inset: 0, display: flex, flex-direction: column, align-items: center, justify-content: center, gap, **background (color-mix)**, color, z-index, pointer-events: none | **partial** | Keep for color-mix background and variant-specific overrides |
| `.home-card--review .home-card-media-overlay` | background (color-mix) | **partial** | Keep for variant-specific color-mix background |
| `.home-card--podcast .home-card-media-overlay` | background (color-mix), opacity: 1 !important, pointer-events: none | **partial** | Keep for variant-specific styling and !important flag |
| `.home-card-media[data-media-layout="split"] .home-card-media-overlay` | Complex conditional styling (position, grid-row, padding, background, border-top, etc.) | **partial** | Keep for complex conditional styling based on data attribute |
| `.home-card--podcast .home-card-media[data-media-layout="split"] .home-card-media-overlay` | pointer-events: auto, box-shadow: none | **partial** | Keep for complex conditional styling |
| `.home-card-pullquote` | font-size, line-height, text-align: center, max-width: 26ch | **yes** | Fully covered by `text-[0.95rem] leading-normal text-center max-w-[26ch]` |
| `.home-card-media[data-media-layout="split"] .home-card-pullquote` | text-align: left, max-width: none, opacity: 1 !important, min-height: auto !important | **partial** | Keep for conditional styling and !important flags |
| `.home-card-copy` | flex: 1, display: flex, flex-direction: column | **yes** | Fully covered by `flex-1 flex flex-col` |
| `.home-card--podcast .home-card-copy` | justify-content: flex-end | **yes** | Fully covered by conditional `justify-end` |
| `.home-card-text` | font-size, line-height, color (color-mix) | **yes** | Fully covered by `text-[0.95rem] leading-normal text-[color-mix(...)]` |
| `.card-actions` | margin-top: auto, position: relative, z-index: 3 | **yes** | Fully covered by `mt-auto relative z-[3]` |
| `.card-actions .button-trapezoid` | **background-color (color-mix)**, color, border, width: 100%, text-align: center, justify-content: center | **partial** | Keep for color-mix background and border styling (complex values) |
| `.card-actions--image-button` | Not used in HomeCard | **no** | Not used by HomeCard component - leave as-is |

## Summary

**Rules to remove (fully covered by Tailwind):**
- `.home-card-head`
- `.home-card-title-heading`
- `.home-card-title`
- `.home-card-meta`
- `.home-card-meta-primary`
- `.home-card-meta-secondary`
- `.home-card-media[data-media-layout="youtube-pullquote"]`
- `.home-card-media-image`
- `.home-card-youtube-embed`
- `.home-card-youtube-iframe`
- `.home-card-pullquote-spacer`
- `.home-card-pullquote-text`
- `.home-card-pullquote`
- `.home-card-copy`
- `.home-card--podcast .home-card-copy`
- `.home-card-text`
- `.card-actions`

**Rules to keep (partial/complex):**
- `.home-card` - clip-path chamfer, interaction states
- `.home-card[data-interaction]` - interaction state shadows
- `.home-card--review` / `.home-card--podcast` - !important flags
- `.home-card-media` - color-mix background, inset shadow
- `.home-card-pullquote-container` - color-mix background
- `.home-card-media-overlay` and variants - color-mix backgrounds, conditional styling
- `.home-card-media[data-media-layout="split"]` variants - complex conditional styling
- `.card-actions .button-trapezoid` - color-mix background, border styling


