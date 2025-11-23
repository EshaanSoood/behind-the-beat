# Review & Podcast Listing Interactions – Implementation Diff

**Date:** Listing tile interactions implementation  
**Reference Documents:**
- HomeCard interactions: `04-home-card-refactor-diff.md`, `14-home-card-mobile-interactions-diff.md`
- Vertical snap behavior: `12-home-card-vertical-snap-feed-diff.md`, `13-home-card-vertical-snap-height-diff.md`

---

## Summary of Changes by File

### 1. `components/ReviewStrip.tsx`

**What changed:**

#### Made whole tile clickable:
- **Wrapped entire tile in `<Link>` component**:
  - Added `<Link>` wrapper around the `<article>` with `href={`/reviews/${review.slug}`}`
  - Added `group` class for hover state management
  - Added `focus-chamfer` for accessible focus styles
  - Added `aria-label` for screen reader clarity
- **Removed nested interactive elements**:
  - Removed `<Link>` from title (now a `<span>` with `md:group-hover:underline`)
  - Removed `<Link>` from artwork (now a `<div>` with `role="presentation"`)
  - Removed `<ButtonTrapezoid>` link (now a styled `<div>` with `role="presentation"`)
  - All nested elements are now decorative/non-interactive

#### Added press/active state:
- Added `active:scale-[0.99] active:shadow-[var(--card-shadow-rest)]` to tile
- Added `motion-reduce:active:scale-100` for reduced motion

#### Added hover lift effect (desktop-only):
- Added `md:motion-safe:hover:-translate-y-1 md:motion-safe:hover:scale-[1.01] md:motion-safe:hover:shadow-[var(--card-shadow-hover)]`
- Added `motion-reduce:md:hover:translate-y-0 motion-reduce:md:hover:scale-100` for reduced motion

**Why:** Makes the entire tile clickable for better UX, adds tactile feedback on press, and provides visual affordance on hover (desktop). Removes nested interactive elements to maintain accessibility and semantic correctness.

---

### 2. `components/PodcastStrip.tsx`

**What changed:**

#### Made whole tile clickable:
- **Wrapped entire tile in `<Link>` component**:
  - Added `<Link>` wrapper around the `<article>` with `href={`/podcast/${episode.slug}`}`
  - Added `group` class for hover state management
  - Added `focus-chamfer` for accessible focus styles
  - Added `aria-label` for screen reader clarity
- **Removed nested interactive elements**:
  - Removed `<Link>` from title (now a `<span>` with `md:group-hover:underline`)
  - Removed `<Link>` from artwork (now a `<div>` with `role="presentation"`)
  - Removed `<ButtonTrapezoid>` link (now a styled `<div>` with `role="presentation"`)
  - All nested elements are now decorative/non-interactive

#### Added press/active state:
- Added `active:scale-[0.99] active:shadow-[var(--card-shadow-rest)]` to tile
- Added `motion-reduce:active:scale-100` for reduced motion

#### Added hover lift effect (desktop-only):
- Added `md:motion-safe:hover:-translate-y-1 md:motion-safe:hover:scale-[1.01] md:motion-safe:hover:shadow-[var(--card-shadow-hover)]`
- Added `motion-reduce:md:hover:translate-y-0 motion-reduce:md:hover:scale-100` for reduced motion

**Why:** Same rationale as ReviewStrip - consistent interaction patterns across listing tiles, better UX with whole-tile clickability, and proper accessibility.

---

### 3. `styles/globals.css`

**What changed:**

#### Added listing tile base styles:
- **Added base shadow and transition**:
  - `.review-strip, .podcast-strip` now have `box-shadow: var(--card-shadow-rest)`
  - Added `transition: box-shadow 200ms ease-out, transform 200ms ease-out`

#### Added delayed hover expansion for ReviewStrip excerpt:
- **Base state** (`.review-strip-excerpt`):
  - Uses `-webkit-line-clamp: 3` for truncation
  - `max-height: 4.5rem` (approximate height for 3 lines)
  - `transition-property: max-height`
  - `transition-duration: 300ms`
  - `transition-delay: 0ms` (immediate return when hover ends)
- **Hover state** (desktop-only, `@media (min-width: 768px)`):
  - `.review-strip-link:hover .review-strip-excerpt` and `.review-strip-link:focus-within .review-strip-excerpt`
  - `-webkit-line-clamp: none` (removes clamp)
  - `max-height: 999px` (allows full expansion)
  - `transition-delay: 2000ms` (2s delay before expansion starts)
- **Reduced motion**:
  - Disables transitions when `prefers-reduced-motion: reduce`

**How delayed expansion works:**
- When user hovers, the CSS state changes immediately (`-webkit-line-clamp: none`, `max-height: 999px`)
- However, the `transition-delay: 2000ms` means the transition doesn't start for 2 seconds
- If user hovers for < 2s and leaves, the transition never starts (text stays truncated)
- If user hovers for ≥ 2s, the transition begins and text expands smoothly over 300ms
- When hover ends, `transition-delay: 0ms` on base state means immediate return to truncated state

**Why:** Provides a "preview on intent" pattern - users who hover briefly don't see expansion, but users who hover longer (indicating interest) get more content. Desktop-only since mobile doesn't have hover.

---

## Behavior Comparison: Before vs After

### Review Listing Tiles

#### Mobile (`< md`, < 768px)

| Aspect | Before | After | Status |
|--------|--------|-------|--------|
| **Whole tile clickable** | ❌ Only title, artwork, and button clickable | ✅ Entire tile is clickable | ✅ Implemented |
| **Press feedback** | ❌ No press feedback | ✅ `scale(0.99)` + shadow soften on tap | ✅ Implemented |
| **Hover lift** | ❌ No hover effect | ❌ No hover effect (mobile) | ✅ Correct (mobile) |
| **Excerpt expansion** | ❌ Always truncated (3 lines) | ❌ Always truncated (3 lines) | ✅ Unchanged (mobile) |
| **Navigation** | ✅ Works via nested links | ✅ Works via tile link | ✅ Improved |

#### Desktop (`md+`, ≥ 768px)

| Aspect | Before | After | Status |
|--------|--------|-------|--------|
| **Whole tile clickable** | ❌ Only title, artwork, and button clickable | ✅ Entire tile is clickable | ✅ Implemented |
| **Press feedback** | ❌ No press feedback | ✅ `scale(0.99)` + shadow soften on click | ✅ Implemented |
| **Hover lift** | ❌ No hover effect | ✅ `translateY(-1px)` + `scale(1.01)` + shadow deepen | ✅ Implemented |
| **Excerpt expansion** | ❌ Always truncated (3 lines) | ✅ Expands after 2s hover | ✅ Implemented |
| **Navigation** | ✅ Works via nested links | ✅ Works via tile link | ✅ Improved |

---

### Podcast Listing Tiles

#### Mobile (`< md`, < 768px)

| Aspect | Before | After | Status |
|--------|--------|-------|--------|
| **Whole tile clickable** | ❌ Only title, artwork, and button clickable | ✅ Entire tile is clickable | ✅ Implemented |
| **Press feedback** | ❌ No press feedback | ✅ `scale(0.99)` + shadow soften on tap | ✅ Implemented |
| **Hover lift** | ❌ No hover effect | ❌ No hover effect (mobile) | ✅ Correct (mobile) |
| **Navigation** | ✅ Works via nested links | ✅ Works via tile link | ✅ Improved |

#### Desktop (`md+`, ≥ 768px)

| Aspect | Before | After | Status |
|--------|--------|-------|--------|
| **Whole tile clickable** | ❌ Only title, artwork, and button clickable | ✅ Entire tile is clickable | ✅ Implemented |
| **Press feedback** | ❌ No press feedback | ✅ `scale(0.99)` + shadow soften on click | ✅ Implemented |
| **Hover lift** | ❌ No hover effect | ✅ `translateY(-1px)` + `scale(1.01)` + shadow deepen | ✅ Implemented |
| **Navigation** | ✅ Works via nested links | ✅ Works via tile link | ✅ Improved |

**Note:** PodcastStrip doesn't have excerpt text, so no expansion behavior needed.

---

## Implementation Details

### Whole Tile Clickable Pattern

**Structure:**
```tsx
<Link href={href} className="group block h-full focus-chamfer" aria-label={...}>
  <article className="... transition-all ... active:scale-[0.99] ...">
    {/* All content, no nested interactive elements */}
  </article>
</Link>
```

**Key points:**
- Single `<Link>` wrapper covers entire tile
- Nested elements use `role="presentation"` or are non-interactive (`<span>` instead of `<Link>`)
- `aria-label` on Link provides context for screen readers
- `focus-chamfer` utility provides accessible focus styles

---

### Delayed Hover Expansion Pattern

**CSS approach:**
- Uses `transition-delay: 2000ms` on hover state
- Base state has `transition-delay: 0ms` for immediate return
- `max-height` transitions smoothly (300ms duration)
- `-webkit-line-clamp` switches immediately (doesn't transition, but max-height handles visual expansion)

**Why this works:**
- State change happens immediately on hover (CSS selector matches)
- But transition is delayed, so visual change waits 2s
- If hover ends before 2s, transition never starts
- If hover lasts ≥ 2s, transition begins and text expands

**Limitations:**
- `-webkit-line-clamp` doesn't animate smoothly, but `max-height` transition provides the visual expansion effect
- Approximate `max-height: 4.5rem` for 3 lines may not be exact for all content, but provides reasonable truncation

---

### Reused Patterns from HomeCard

**Active/press state:**
- Same pattern: `active:scale-[0.99] active:shadow-[var(--card-shadow-rest)]`
- Same reduced motion handling: `motion-reduce:active:scale-100`

**Hover lift:**
- Similar pattern: `md:motion-safe:hover:-translate-y-1 md:motion-safe:hover:scale-[1.01]`
- Same shadow variable: `var(--card-shadow-hover)`
- Same reduced motion safeguards

**Surface styles:**
- Reuses `paper-grain` and `surface-chamfer` utilities
- Consistent border and background patterns

---

## Visual Consistency with Entry Pages

**Review entry header (`ReviewHeader`):**
- Uses `entry-header` class with similar layout (flex-row on desktop)
- Album art uses `surface-chamfer` (matches listing tile artwork)
- Similar spacing and typography patterns
- **No changes needed** - already visually compatible

**Podcast entry header (`EpisodeHeader`):**
- Uses centered layout with `SpecialH1`
- Similar meta text pattern
- **No changes needed** - already visually compatible

**Result:** Navigation from listing tile to entry page feels like the tile "expands into" the page due to:
- Shared visual language (chamfered corners, paper grain, similar spacing)
- Press feedback on tile provides tactile connection
- Consistent card-like appearance

---

## Manual Test Checklist

### Review Listing Tiles

#### Desktop (`md+`, ≥ 768px)

- [ ] **Hover tile briefly (< 2s)**: 
  - [ ] Tile lifts slightly (`translateY(-1px)`, `scale(1.01)`)
  - [ ] Shadow deepens
  - [ ] Excerpt stays truncated (3 lines)
  - [ ] Title underlines on hover
- [ ] **Hover tile for ≥ 2s**:
  - [ ] After 2s, excerpt expands smoothly (300ms transition)
  - [ ] Full text becomes visible
  - [ ] Tile remains lifted
- [ ] **Click tile**:
  - [ ] Press feedback (`scale(0.99)`, shadow softens)
  - [ ] Navigation to review entry page
  - [ ] Entry page layout feels like tile expanded into it
- [ ] **Focus tile (keyboard)**:
  - [ ] Same hover behaviors apply (lift, expansion after 2s)
  - [ ] Focus chamfer visible
- [ ] **Reduced motion**: All animations disabled, reduced motion styles apply

#### Mobile (`< md`, < 768px)

- [ ] **Tap tile**:
  - [ ] Press feedback (`scale(0.99)`, shadow softens)
  - [ ] Navigation to review entry page
  - [ ] No hover effects (no lift, no expansion)
- [ ] **Excerpt**: Always truncated (3 lines), no expansion

---

### Podcast Listing Tiles

#### Desktop (`md+`, ≥ 768px)

- [ ] **Hover tile**:
  - [ ] Tile lifts slightly (`translateY(-1px)`, `scale(1.01)`)
  - [ ] Shadow deepens
  - [ ] Title underlines on hover
  - [ ] Button background darkens on hover
- [ ] **Click tile**:
  - [ ] Press feedback (`scale(0.99)`, shadow softens)
  - [ ] Navigation to podcast entry page
  - [ ] Entry page layout feels like tile expanded into it
- [ ] **Focus tile (keyboard)**:
  - [ ] Same hover behaviors apply
  - [ ] Focus chamfer visible
- [ ] **Reduced motion**: All animations disabled, reduced motion styles apply

#### Mobile (`< md`, < 768px)

- [ ] **Tap tile**:
  - [ ] Press feedback (`scale(0.99)`, shadow softens)
  - [ ] Navigation to podcast entry page
  - [ ] No hover effects (no lift)

---

## Files Changed

1. **`components/ReviewStrip.tsx`**
   - Wrapped tile in `<Link>` component
   - Removed nested interactive elements (title link, artwork link, button link)
   - Added `group` class for hover states
   - Added press/active state classes
   - Added hover lift effect classes (desktop-only)
   - Excerpt now uses `.review-strip-excerpt` class for CSS expansion

2. **`components/PodcastStrip.tsx`**
   - Wrapped tile in `<Link>` component
   - Removed nested interactive elements (title link, artwork link, button link)
   - Added `group` class for hover states
   - Added press/active state classes
   - Added hover lift effect classes (desktop-only)

3. **`styles/globals.css`**
   - Added base shadow and transition styles for `.review-strip` and `.podcast-strip`
   - Added `.review-strip-excerpt` styles with delayed hover expansion
   - Added media query for desktop-only expansion behavior
   - Added reduced motion handling

---

## Technical Notes

- **Breakpoint**: Uses Tailwind's `md` breakpoint (`768px`) consistently
- **Reduced motion**: All `motion-safe:` and `motion-reduce:` safeguards remain intact
- **Accessibility**: 
  - Single interactive element per tile (the Link wrapper)
  - `aria-label` provides context for screen readers
  - `focus-chamfer` provides visible focus indicators
  - No nested interactive elements (prevents accessibility issues)
- **CSS-only**: All interactions use CSS/Tailwind classes; no JavaScript required
- **Transition delay pattern**: Uses CSS `transition-delay` to create "hover ≥ 2s" behavior without JavaScript timers
- **Visual consistency**: Reuses HomeCard interaction patterns (active state, hover lift) for familiarity

---

## Future Considerations

- **Shared layout transitions**: Could add Framer Motion shared layout animations for smoother "expand into page" effect
- **Excerpt expansion**: Current `max-height: 4.5rem` approximation could be refined with CSS custom properties or JavaScript measurement if needed
- **Podcast excerpt**: If podcast tiles get excerpt text in the future, same delayed expansion pattern can be applied

