# Inline styles usage audit

| id | file | location | snippet | type | notes | action | rationale |
|----|------|----------|---------|------|-------|--------|-----------|
| IS-001 | `components/ReviewStrip.tsx` | line 52 | `style={{ aspectRatio: "1 / 1", width: "100%" }}` | static | Aspect ratio and width for album artwork container | `refactor-to-tailwind` | Aspect ratio + full width can be expressed as Tailwind (aspect-square w-full); no token needed. |
| IS-002 | `components/SubscribeModal.tsx` | line 127 | `style={{ backgroundColor: "var(--magazine-white)" }}` | css-var | Sets background color using CSS custom property for modal dialog | `refactor-to-tailwind-using-existing-token` | Use bg-[var(--magazine-white)] so we keep the token but avoid inline style. |
| IS-003 | `components/SubscribeModal.tsx` | line 349 | `style={{ display: "none" }}` | static | MailChimp error response container (hidden by default) | `refactor-to-tailwind` | Static display: none can be replaced with Tailwind 'hidden'; any runtime changes to style.display will still override the class. |
| IS-004 | `components/SubscribeModal.tsx` | line 350 | `style={{ display: "none" }}` | static | MailChimp success response container (hidden by default) | `refactor-to-tailwind` | Static display: none can be replaced with Tailwind 'hidden'; any runtime changes to style.display will still override the class. |
| IS-005 | `components/SubscribeModal.tsx` | line 352 | `style={{ position: "absolute", left: "-5000px" }}` | static | Accessibility screen reader trap for honeypot field (visually hidden) | `refactor-to-tailwind` | Accessibility honeypot can use Tailwind positioning (absolute -left-[5000px]) instead of inline style; no new token needed. |
| IS-006 | `components/SubscribeModal.tsx` | line 371 | `style={{ margin: 0 }}` | static | Removes default margin on MailChimp badge paragraph | `refactor-to-tailwind` | Margin reset can use Tailwind m-0; simple layout concern. |
| IS-007 | `components/SubscribeModal.tsx` | line 373 | `style={{ display: "inline-block", backgroundColor: "transparent", borderRadius: "4px" }}` | static | MailChimp referral badge wrapper styling | `refactor-to-tailwind` | Inline-block, transparent bg, border radius can be mirrored with Tailwind (inline-block bg-transparent rounded). |
| IS-008 | `components/SpecialH1.tsx` | lines 20-30 | `style={{ fontFamily: 'var(--font-display)', fontSize: '88px', color: 'rgb(255, 211, 232)', lineHeight: '1', textAlign: 'center', whiteSpace: 'nowrap', display: 'block', visibility: 'visible', opacity: '1' }}` | mixed | Background text styling for special H1 effect - uses CSS var for fontFamily, RGB for color, static values for layout | `refactor-to-tailwind-arbitrary` | Art-directed background text for SpecialH1; can use Tailwind with arbitrary values (text-[88px], text-[rgb(...)]). No additional token needed since it's highly specific. |
| IS-009 | `app/podcast/[slug]/components/EpisodePlayer.tsx` | line 84 | `style={{ minHeight: "200px" }}` | static | Minimum height for YouTube iframe container | `refactor-to-tailwind` | Static minHeight can be expressed as min-h-[200px]; simple layout tweak. |
| IS-010 | `content/reviews/acoustic-sessions.md` | line 25 | `style="width: 60%; max-width: 400px; margin: 1rem 0;"` | static | Image sizing and spacing in markdown content | `keep-inline-for-now` | Inline styles live inside markdown content; moving them to tokens or globals would add more complexity (MDX / remark plugins). Inline is acceptable for one-off content formatting at this stage. |
| IS-011 | `content/reviews/acoustic-sessions.md` | line 29 | `style="width: 40%; max-width: 250px; margin: 1rem 0;"` | static | Image sizing and spacing in markdown content | `keep-inline-for-now` | Inline styles live inside markdown content; moving them to tokens or globals would add more complexity (MDX / remark plugins). Inline is acceptable for one-off content formatting at this stage. |
| IS-012 | `content/reviews/acoustic-sessions.md` | line 33 | `style="width: 100%; max-width: 600px; margin: 1rem 0;"` | static | Image sizing and spacing in markdown content | `keep-inline-for-now` | Inline styles live inside markdown content; moving them to tokens or globals would add more complexity (MDX / remark plugins). Inline is acceptable for one-off content formatting at this stage. |

## Summary

**Total inline style usages found: 12**

**Breakdown by type:**
- **static**: 10 usages (83%)
- **css-var**: 1 usage (8%)
- **mixed**: 1 usage (8%)
- **dynamic**: 0 usages (0%)

**Observations:**
- Most inline styles are static values used for one-off layout adjustments (aspect ratios, min-heights, display properties)
- The `SubscribeModal` component contains the most inline styles (6 instances), primarily for MailChimp form integration and accessibility features
- Three inline styles are in markdown content files (`acoustic-sessions.md`) for image sizing - these may need special handling if migrating to a CMS or markdown processor
- The `SpecialH1` component uses inline styles for a decorative background text effect with explicit pixel values for Puppeteer detection
- No dynamic/runtime style calculations were found (all values are literal strings or CSS variables)
- Several inline styles serve accessibility purposes (screen reader traps, hidden form responses)

**Note:** Runtime DOM style manipulations (`document.body.style.overflow`) were found in `SubscribeModal.tsx` but are not included in this audit as they are not JSX/TSX inline style props.

**Refactoring notes:**
- Markdown inline styles (IS-010, IS-011, IS-012) were intentionally left as-is. These live in markdown content files and are acceptable as one-off content formatting. If we later convert to MDX/components, we can revisit them.

