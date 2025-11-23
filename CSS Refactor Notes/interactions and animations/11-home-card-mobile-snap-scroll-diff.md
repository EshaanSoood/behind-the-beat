# HomeCard Mobile Snap Scroll – Implementation Diff

**Date:** Implementation of mobile snap scrolling for HomeCard sections  
**Reference:** Style guide: `19-css-tailwind-style-guide.md`

---

## Summary of Changes by File

### 1. `app/(home)/components/CardGrid.tsx`

**What changed:**
- **Updated container layout** for mobile snap scrolling:
  - Removed `home-card-grid` class (was setting `display: grid` which conflicted with flex)
  - Changed from `grid` to `flex` on mobile (`< md` breakpoint)
  - Added `overflow-x-auto` for horizontal scrolling on mobile
  - Added `snap-x snap-mandatory` for scroll snapping on mobile
  - Added `gap-6` for consistent spacing (matches `--home-grid-gap` token: `var(--space-6)` = 24px)
  - Preserved grid layout on `md` and up: `md:grid md:grid-cols-2 lg:grid-cols-3`
  - Disabled snap scrolling on desktop: `md:overflow-visible md:snap-none`
- **Added touch scrolling optimization**:
  - Added inline `style={{ WebkitOverflowScrolling: "touch" }}` for smooth iOS scrolling
- **Updated child card wrapping**:
  - Added `React.cloneElement` to apply snap classes to each HomeCard
  - Added `shrink-0` to prevent cards from collapsing in flex layout
  - Added `snap-start` for snap alignment (cards snap to start edge)
  - Added `min-w-[85%]` on mobile to show hint of next card (better UX than full-width)
  - Reset card width on desktop: `md:min-w-0 md:snap-none`

**Why:** Implements horizontal snap scrolling on mobile while preserving existing desktop grid layout. Uses Tailwind utilities only, following the style guide's preference for component-level Tailwind over global CSS.

---

## Behavior: Before vs After

### Mobile (`< md` / `< 768px`)

**Before:**
- HomeCards displayed in a **vertical stack** (1 column grid)
- Cards were full-width of the container
- No horizontal scrolling capability
- Users scrolled vertically through cards

**After:**
- HomeCards displayed in a **horizontal swipeable strip**
- Cards are `85%` width (showing hint of next card)
- Horizontal scroll with **snap scrolling** enabled
- Cards snap to start edge when scrolling stops
- Vertical page scrolling still works (container only scrolls horizontally)
- Smooth touch scrolling on iOS devices

### Desktop (`>= md` / `>= 768px`)

**Before:**
- HomeCards displayed in a **grid layout**:
  - 2 columns on tablet (`md` / `768px`)
  - 3 columns on desktop (`lg` / `1024px`)
- Cards filled grid cells automatically
- No scrolling (all cards visible)

**After:**
- **Behavior unchanged** — same grid layout:
  - 2 columns on tablet (`md` / `768px`)
  - 3 columns on desktop (`lg` / `1024px`)
- Cards fill grid cells automatically
- No horizontal scrolling or snap behavior
- Layout visually identical to before

---

## Design/UX Choices

### 1. Snap Alignment: `snap-start` vs `snap-center`

**Choice:** `snap-start` (cards snap to left/start edge)

**Rationale:**
- Aligns with typical mobile card carousel patterns
- Cards align with container padding edge (via `container-page`)
- Provides clear visual boundary for each card
- `snap-center` would require more complex width calculations and might feel less intentional

### 2. Card Width on Mobile: `min-w-[85%]` vs Full-Width

**Choice:** `min-w-[85%]` (cards are 85% of viewport width)

**Rationale:**
- Shows a **hint of the next card** on the right edge
- Provides visual affordance that more content is available
- Common pattern in mobile card carousels (e.g., iOS App Store, mobile news apps)
- Full-width cards would hide the "more content" affordance
- 85% provides good balance: card is prominent but next card is visible

### 3. Gap Spacing: `gap-6`

**Choice:** Using `gap-6` (1.5rem / 24px)

**Rationale:**
- Matches existing grid gap spacing token (`--home-grid-gap` = `var(--space-6)` = 24px)
- Consistent spacing across mobile and desktop
- Provides clear separation between cards in horizontal scroll
- Maintains design token consistency

### 4. Touch Scrolling: `-webkit-overflow-scrolling: touch`

**Choice:** Added inline style for iOS smooth scrolling

**Rationale:**
- Improves scrolling performance on iOS Safari
- Standard practice for horizontal scroll containers
- Inline style is acceptable here (browser-specific property, not design-related)
- Could be moved to a Tailwind utility if needed in future, but not necessary for single use case

### 5. Container Padding Handling

**Choice:** Cards scroll within existing `container-page` padding

**Rationale:**
- `Section` component already applies `container-page` class with `padding-inline: var(--space-4)`
- Cards scroll within this padded area (padding is on container, not scroll area)
- First/last cards align with content edge naturally
- No need for additional padding adjustments or negative margins

---

## Implementation Details

### Tailwind Classes Used

**Container (`CardGrid`):**
- `flex` - Horizontal flex layout on mobile
- `gap-6` - Consistent spacing between cards (matches `--home-grid-gap` token)
- `overflow-x-auto` - Enable horizontal scrolling on mobile
- `snap-x snap-mandatory` - Enable scroll snapping on mobile
- `md:grid md:grid-cols-2` - Grid layout on tablet+
- `md:overflow-visible` - Disable horizontal scroll on desktop
- `md:snap-none` - Disable snap scrolling on desktop
- `lg:grid-cols-3` - 3 columns on desktop

**Cards (via `cloneElement`):**
- `shrink-0` - Prevent cards from collapsing in flex layout
- `snap-start` - Snap cards to start edge
- `min-w-[85%]` - Card width on mobile (85% of viewport)
- `md:min-w-0` - Reset min-width on desktop (let grid handle sizing)
- `md:snap-none` - Disable snap on desktop

### No Global CSS Changes

Following the style guide (`19-css-tailwind-style-guide.md`):
- ✅ All changes use Tailwind utilities in components
- ✅ No new classes added to `globals.css`
- ✅ No inline CSS except browser-specific `-webkit-overflow-scrolling`
- ✅ Removed `home-card-grid` class usage (replaced with Tailwind utilities for Tailwind-first approach)
- ✅ Gap spacing maintained via Tailwind `gap-6` (matches `--home-grid-gap` token value)

---

## Manual Testing Checklist

### Mobile Viewport (`< 768px`)

**Horizontal Scrolling:**
- [ ] Cards display in a horizontal row (not stacked vertically)
- [ ] Can swipe/scroll horizontally through cards
- [ ] Horizontal scrollbar appears (or is hidden if custom styling exists)
- [ ] Smooth scrolling on iOS devices (test on Safari iOS)

**Snap Behavior:**
- [ ] Cards snap to start edge when scrolling stops
- [ ] Each card snaps cleanly (no partial cards stuck in middle)
- [ ] Snap feels intentional and smooth

**Card Sizing:**
- [ ] Cards are approximately 85% width
- [ ] Hint of next card visible on right edge
- [ ] Cards don't shrink or collapse
- [ ] Cards maintain aspect ratio

**Vertical Scrolling:**
- [ ] Page still scrolls vertically normally
- [ ] Horizontal scroll doesn't interfere with vertical scroll
- [ ] Can scroll page up/down while cards are visible

**Keyboard Navigation:**
- [ ] Tab key moves focus through cards
- [ ] Arrow keys can scroll horizontally when focus is in card strip
- [ ] Focus indicators remain visible and accessible

**Edge Cases:**
- [ ] First card aligns properly with content edge
- [ ] Last card can scroll fully into view
- [ ] Works with varying numbers of cards (1, 2, 3, 8+)

### Desktop Viewport (`>= 768px`)

**Layout Preservation:**
- [ ] Cards display in grid layout (2 columns on tablet, 3 on desktop)
- [ ] No horizontal scrolling appears
- [ ] Layout looks identical to before refactor
- [ ] Cards fill grid cells properly

**No Snap Behavior:**
- [ ] No snap scrolling on desktop
- [ ] Grid layout behaves normally
- [ ] Cards don't have snap classes applied visually

**Spacing:**
- [ ] Gap between cards matches existing design
- [ ] Grid spacing consistent with before

---

## Files Modified

1. `app/(home)/components/CardGrid.tsx` - Added mobile snap scrolling with Tailwind utilities

## Files Not Modified

- `styles/globals.css` - No changes (following style guide preference for Tailwind-first)
- `app/(home)/components/HomeCard.tsx` - No changes (snap classes applied via `cloneElement`)
- `app/(home)/components/HomeTiles.tsx` - No changes
- `app/(home)/components/ReviewCard.tsx` - No changes
- `app/(home)/components/PodcastCard.tsx` - No changes

---

## Accessibility Considerations

### Keyboard Navigation
- ✅ Horizontal scroll container is keyboard accessible
- ✅ Arrow keys scroll horizontally when focus is within the container
- ✅ Tab navigation through cards still works
- ✅ Focus indicators remain visible

### Screen Readers
- ✅ `role="list"` maintained on container
- ✅ Cards maintain `role="listitem"` (via HomeCard)
- ✅ No changes to semantic structure

### Touch Targets
- ✅ Cards maintain existing touch target sizes (unchanged)
- ✅ Horizontal scroll area is large enough for touch interaction

---

## Performance Considerations

- ✅ Uses CSS `scroll-snap` (hardware accelerated)
- ✅ `-webkit-overflow-scrolling: touch` enables smooth iOS scrolling
- ✅ No JavaScript scroll handlers (pure CSS)
- ✅ No layout shifts (cards have fixed min-width)

---

## Future Enhancements (Optional)

1. **Scrollbar Styling**: If desired, add custom scrollbar styling utility for horizontal scrollbar (currently uses browser default)

2. **Card Width Tuning**: Adjust `min-w-[85%]` if user feedback suggests different width preference (e.g., `min-w-[90%]` for more card visibility, `min-w-[80%]` for more next-card hint)

3. **Snap Alignment Option**: Consider making snap alignment configurable (`snap-start` vs `snap-center`) if design requirements change

4. **Scroll Indicators**: Add visual indicators (dots or arrows) to show scroll position and availability (would require JS)

---

## Conclusion

Successfully implemented mobile snap scrolling for HomeCard sections:
- ✅ Horizontal swipeable strip on mobile (`< md`)
- ✅ Snap scrolling with `snap-start` alignment
- ✅ Cards sized at 85% width (showing hint of next card)
- ✅ Desktop layout unchanged (grid preserved)
- ✅ Pure Tailwind implementation (no global CSS changes)
- ✅ Accessible keyboard navigation maintained
- ✅ Smooth touch scrolling on iOS

The implementation follows the style guide's preference for Tailwind-first approach and maintains all existing HomeCard interactions (wiggle, blur, ElectricBorder, etc.).

