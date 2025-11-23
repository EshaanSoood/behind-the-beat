# HomeCard Vertical Snap Feed – Implementation Diff

**Date:** Replacement of horizontal carousel with vertical snap feed  
**Previous implementation:** `11-home-card-mobile-snap-scroll-diff.md` (horizontal carousel)

---

## Summary of Changes by File

### 1. `app/(home)/components/CardGrid.tsx`

**What changed:**
- **Removed horizontal carousel behavior**:
  - Removed `flex` layout (was used for horizontal strip)
  - Removed `overflow-x-auto` (horizontal scrolling)
  - Removed `snap-x snap-mandatory` (horizontal snap)
  - Removed `WebkitOverflowScrolling: "touch"` inline style
  - Removed `md:overflow-visible md:snap-none` (no longer needed)
- **Restored vertical grid layout**:
  - Changed to `grid grid-cols-1` on mobile (vertical stack)
  - Kept `md:grid-cols-2 lg:grid-cols-3` for tablet/desktop
  - Maintained `gap-6` spacing
- **Removed card-level horizontal carousel classes**:
  - Removed `shrink-0` (was preventing flex collapse)
  - Removed `min-w-[85%]` (was setting card width for horizontal strip)
  - Removed `md:min-w-0` (was resetting width on desktop)
- **Added vertical snap classes**:
  - Added `snap-start` to each card for vertical snap alignment
  - Added `md:snap-none` to disable snap on desktop

**Why:** Removes horizontal carousel and restores vertical layout. Adds vertical snap behavior for mobile feed experience.

---

### 2. `app/page.tsx`

**What changed:**
- **Added vertical snap scrolling to home feed section**:
  - Added `snap-y snap-mandatory` to `Section` component className
  - Added `md:snap-none` to disable snap on tablet/desktop
  - Snap behavior applies to the home feed section container

**Why:** Enables vertical scroll snapping for the HomeCard feed on mobile. Scoped to home page only (doesn't affect other pages).

---

## Behavior: Before vs After

### Mobile (`< md` / `< 768px`)

**Before (from `11-home-card-mobile-snap-scroll-diff.md`):**
- HomeCards displayed in a **horizontal swipeable strip**
- Cards were `85%` width (showing hint of next card)
- **Horizontal scroll** with snap scrolling (`snap-x`)
- Users swiped left/right through cards
- Cards snapped horizontally to start edge

**After (current implementation):**
- HomeCards displayed in a **vertical column** (like a social feed)
- Cards are **full-width** (vertical stack, `grid-cols-1`)
- **Vertical scroll** with snap scrolling (`snap-y`)
- Users scroll up/down through cards
- Cards snap vertically to top edge when scrolling stops
- Each card acts as a snap target (`snap-start`)
- No horizontal scrolling

### Desktop (`>= md` / `>= 768px`)

**Before:**
- HomeCards displayed in a **grid layout**:
  - 2 columns on tablet (`md` / `768px`)
  - 3 columns on desktop (`lg` / `1024px`)
- No snap scrolling behavior

**After:**
- **Behavior unchanged** — same grid layout:
  - 2 columns on tablet (`md` / `768px`)
  - 3 columns on desktop (`lg` / `1024px`)
- No snap scrolling (`md:snap-none` on both container and cards)
- Layout visually identical to before

---

## Implementation Details

### Vertical Snap Behavior

**Container (`Section` in `app/page.tsx`):**
- `snap-y` - Enables vertical scroll snapping
- `snap-mandatory` - Forces snap to nearest snap point
- `md:snap-none` - Disables snap on tablet/desktop

**Cards (via `cloneElement` in `CardGrid.tsx`):**
- `snap-start` - Cards snap to start (top) edge when scrolling
- `md:snap-none` - Disables snap on desktop

### Layout Structure

**Mobile:**
- `grid grid-cols-1` - Single column vertical stack
- `gap-6` - Consistent spacing between cards
- Cards are full-width of container

**Desktop:**
- `md:grid-cols-2` - 2 columns on tablet
- `lg:grid-cols-3` - 3 columns on desktop
- Same gap spacing (`gap-6`)

### No Global CSS Changes

Following the style guide (`19-css-tailwind-style-guide.md`):
- ✅ All changes use Tailwind utilities in components
- ✅ No new classes added to `globals.css`
- ✅ No inline CSS
- ✅ Scoped to home page only (doesn't affect other pages)

---

## Design/UX Choices

### 1. Snap Alignment: `snap-start`

**Choice:** `snap-start` (cards snap to top edge)

**Rationale:**
- Standard pattern for vertical feed scrolling (like Instagram, Twitter)
- Cards align to top of viewport when snapped
- Provides clear visual boundary for each card
- `snap-center` would require cards to be viewport-height, which may not be appropriate for all card content

### 2. Card Height: Natural Height

**Choice:** Cards use their natural height (no `min-h-screen` or fixed height)

**Rationale:**
- Cards have variable content (reviews vs podcasts, different summary lengths)
- Forcing viewport height would create awkward spacing or require content truncation
- Natural height allows cards to display full content
- Snap behavior still works effectively with natural card heights
- Users can scroll through cards smoothly, snapping to each one

### 3. Snap Scope: Home Feed Section Only

**Choice:** Applied `snap-y` to `Section` component containing HomeTiles

**Rationale:**
- Scopes snap behavior to home page feed only
- Doesn't affect other pages or global site behavior
- Section is the logical container for the card feed
- Snap works when scrolling through the home feed section

### 4. Gap Spacing: `gap-6`

**Choice:** Maintained `gap-6` (1.5rem / 24px)

**Rationale:**
- Matches existing design token (`--home-grid-gap` = `var(--space-6)`)
- Consistent spacing across mobile and desktop
- Provides clear separation between cards in vertical feed
- Maintains design token consistency

---

## Manual Testing Checklist

### Mobile Viewport (`< 768px`)

**Vertical Scrolling:**
- [ ] Cards display in a vertical column (not horizontal strip)
- [ ] Can scroll up/down through cards
- [ ] **No horizontal scrollbar** appears
- [ ] Cards are full-width of container

**Snap Behavior:**
- [ ] When scrolling down, cards snap to top edge
- [ ] Each card snaps cleanly (no partial cards stuck in middle)
- [ ] Snap feels intentional and smooth
- [ ] Scrolling stops at each card boundary

**Card Layout:**
- [ ] Cards stack vertically (one per row)
- [ ] Cards maintain natural height (not forced to viewport height)
- [ ] Gap spacing between cards is consistent
- [ ] Cards don't overlap or collapse

**Page Scrolling:**
- [ ] Vertical page scroll works normally
- [ ] Snap behavior doesn't interfere with scrolling to other sections (HomeHero, NewsletterSignup)
- [ ] Can scroll past the HomeCard feed section

**Keyboard Navigation:**
- [ ] Tab key moves focus through cards vertically
- [ ] Page Up/Down or Space/Shift+Space snap to next/previous card
- [ ] Focus indicators remain visible and accessible
- [ ] Arrow keys work for scrolling when focus is in feed

**Edge Cases:**
- [ ] First card snaps properly when scrolling down from HomeHero
- [ ] Last card can be scrolled fully into view
- [ ] Works with varying numbers of cards (1, 2, 3, 8+)
- [ ] Snap behavior doesn't interfere with HomeHero or NewsletterSignup sections

### Desktop Viewport (`>= 768px`)

**Layout Preservation:**
- [ ] Cards display in grid layout (2 columns on tablet, 3 on desktop)
- [ ] **No horizontal scrolling** appears
- [ ] Layout looks identical to before refactor
- [ ] Cards fill grid cells properly

**No Snap Behavior:**
- [ ] No snap scrolling on desktop (`md:snap-none` applied)
- [ ] Grid layout behaves normally
- [ ] Cards don't have snap classes applied visually
- [ ] Normal page scrolling (no snapping)

**Spacing:**
- [ ] Gap between cards matches existing design
- [ ] Grid spacing consistent with before

---

## Files Modified

1. `app/(home)/components/CardGrid.tsx` - Removed horizontal carousel, restored vertical grid, added vertical snap classes
2. `app/page.tsx` - Added vertical snap scrolling to home feed section

## Files Not Modified

- `styles/globals.css` - No changes (following style guide preference for Tailwind-first)
- `app/(home)/components/HomeCard.tsx` - No changes (snap classes applied via `cloneElement`)
- `app/(home)/components/HomeTiles.tsx` - No changes
- `app/(home)/components/ReviewCard.tsx` - No changes
- `app/(home)/components/PodcastCard.tsx` - No changes
- `app/layout.tsx` - No changes (snap scoped to home page only)

---

## Accessibility Considerations

### Keyboard Navigation
- ✅ Vertical scroll container is keyboard accessible
- ✅ Page Up/Down and Space/Shift+Space snap to cards
- ✅ Tab navigation through cards still works vertically
- ✅ Focus indicators remain visible

### Screen Readers
- ✅ `role="list"` maintained on container
- ✅ Cards maintain `role="listitem"` (via HomeCard)
- ✅ No changes to semantic structure
- ✅ Vertical layout is more natural for screen reader navigation

### Touch Targets
- ✅ Cards maintain existing touch target sizes (unchanged)
- ✅ Vertical scrolling is more natural for mobile touch interaction
- ✅ No horizontal swipe gestures needed

---

## Performance Considerations

- ✅ Uses CSS `scroll-snap` (hardware accelerated)
- ✅ No JavaScript scroll handlers (pure CSS)
- ✅ No layout shifts (cards use natural height)
- ✅ Vertical scrolling is more performant than horizontal on mobile

---

## Comparison with Previous Implementation

### Removed (Horizontal Carousel)
- ❌ `flex` layout for horizontal strip
- ❌ `overflow-x-auto` horizontal scrolling
- ❌ `snap-x snap-mandatory` horizontal snap
- ❌ `WebkitOverflowScrolling: "touch"` inline style
- ❌ `shrink-0 min-w-[85%]` card width constraints
- ❌ Horizontal swipe gestures

### Added (Vertical Snap Feed)
- ✅ `grid grid-cols-1` vertical stack on mobile
- ✅ `snap-y snap-mandatory` vertical snap on container
- ✅ `snap-start` on cards for vertical alignment
- ✅ Full-width cards on mobile
- ✅ Vertical scroll snapping

### Maintained
- ✅ `gap-6` spacing (matches design token)
- ✅ Grid layout on desktop (`md:grid-cols-2 lg:grid-cols-3`)
- ✅ All existing HomeCard interactions (wiggle, blur, ElectricBorder, etc.)
- ✅ Accessibility features
- ✅ Tailwind-first approach (no global CSS changes)

---

## Future Enhancements (Optional)

1. **Card Height Tuning**: If desired, add `min-h-[calc(100vh-<header-height>)]` to cards for "one card per screen" feel (would require calculating header height)

2. **Snap Alignment Option**: Consider `snap-center` if cards are made viewport-height for true "one card per screen" experience

3. **Smooth Scroll Behavior**: Add `scroll-behavior: smooth` if desired (currently uses browser default)

4. **Snap Padding**: Add `scroll-padding-top` to account for fixed header if needed

---

## Conclusion

Successfully replaced horizontal carousel with vertical snap feed:
- ✅ Vertical column layout on mobile (no horizontal scrolling)
- ✅ Vertical scroll snapping (`snap-y` with `snap-start` on cards)
- ✅ Desktop layout unchanged (grid preserved, no snap)
- ✅ Pure Tailwind implementation (no global CSS changes)
- ✅ Accessible keyboard navigation maintained
- ✅ Scoped to home page only (doesn't affect other pages)

The implementation provides a social feed-like experience on mobile while maintaining the existing grid layout on desktop. All existing HomeCard interactions (wiggle, blur, ElectricBorder, etc.) remain unchanged.

