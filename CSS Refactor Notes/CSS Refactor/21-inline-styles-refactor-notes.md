# Inline styles refactor notes

## Summary

- **Files refactored:**
  - `components/ReviewStrip.tsx` - Removed inline style for aspect ratio and width
  - `components/SubscribeModal.tsx` - Removed 6 inline styles (background color, display properties, positioning, margins, badge styling)
  - `components/SpecialH1.tsx` - Removed complex inline style block for background text effect
  - `app/podcast/[slug]/components/EpisodePlayer.tsx` - Removed inline style for min-height

- **Markdown inline styles:** Intentionally left untouched (IS-010, IS-011, IS-012 in `content/reviews/acoustic-sessions.md`). These live in markdown content files and are acceptable as one-off content formatting. If we later convert to MDX/components, we can revisit them.

## Changes by id

- **IS-001** – Aspect ratio in ReviewStrip now uses `aspect-square w-full` Tailwind utilities instead of inline style
- **IS-002** – SubscribeModal dialog background now uses `bg-[var(--magazine-white)]` Tailwind class instead of inline style
- **IS-003** – MailChimp error response container now uses `hidden` Tailwind class instead of inline `display: none`
- **IS-004** – MailChimp success response container now uses `hidden` Tailwind class instead of inline `display: none`
- **IS-005** – Honeypot field now uses `absolute -left-[5000px]` Tailwind utilities instead of inline positioning
- **IS-006** – MailChimp badge paragraph now uses `m-0` Tailwind class instead of inline margin reset
- **IS-007** – MailChimp badge wrapper now uses `inline-block bg-transparent rounded` Tailwind utilities instead of inline styles
- **IS-008** – SpecialH1 background text now uses Tailwind arbitrary values (`text-[88px]`, `text-[rgb(255,211,232)]`, etc.) instead of inline style object
- **IS-009** – EpisodePlayer iframe now uses `min-h-[200px]` Tailwind class instead of inline min-height

