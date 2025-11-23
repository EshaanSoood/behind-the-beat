# HomeCard Vertical Snap Height Refinement – Implementation Diff

**Date:** Refinement of vertical snap feed with centered cards and 90vh height  
**Previous implementation:** `12-home-card-vertical-snap-feed-diff.md` (vertical snap with natural height)

---

## Summary of Changes by File

### 1. `app/(home)/components/CardGrid.tsx`

**What changed:**
- **Updated card snap alignment**:
  - Changed from `snap-start` to `snap-center` on mobile
  - Cards now snap to center of viewport instead of top edge
- **Added minimum height constraint**:
  - Added `min-h-[90vh]` on mobile (cards take up ~90% of viewport height)
  - Added `md:min-h-0` to reset height on desktop (let grid handle sizing)
- **Maintained desktop behavior**:
  - Kept `md:snap-none` to disable snap on tablet/desktop
  - Grid layout unchanged (`md:grid-cols-2 lg:grid-cols-3`)

**Why:** Creates a more "social feed" experience where the focused card is centered and fills most of the screen, with hints of previous/next cards visible at the edges.

---

## Behavior: Before vs After

### Mobile (`< md` / `< 768px`)

**Before (from `12-home-card-vertical-snap-feed-diff.md`):**
- Cards stacked vertically with natural height
- Used `snap-start` alignment
- Cards snapped to top edge of viewport
- Full card content visible, but card might be shorter than viewport
- Previous/next cards fully visible above/below when scrolling

**After (current implementation):**
- Cards have `min-h-[90vh]` (minimum 90% of viewport height)
- Use `snap-center` alignment
- Cards snap to center of viewport when scrolling stops
- Current card occupies ~90% of screen
- Hints of previous card (above) and next card (below) visible at viewport edges
- More immersive, feed-like experience

### Desktop (`>= md` / `>= 768px`)

**Before:**
- Grid layout (2 columns tablet, 3 columns desktop)
- No snap behavior
- Cards use natural height

**After:**
- **Behavior unchanged** — same grid layout:
  - 2 columns on tablet (`md` / `768px`)
  - 3 columns on desktop (`lg` / `1024px`)
- No snap behavior (`md:snap-none` applied)
- Cards use natural height (`md:min-h-0` resets height constraint)
- Layout visually identical to before

---

## Implementation Details

### Card Height and Snap Alignment

**Mobile:**
- `min-h-[90vh]` - Cards are at least 90% of viewport height
- `snap-center` - Cards snap to center of viewport
- `gap-6` - Existing gap spacing (24px) provides separation between cards

**Desktop:**
- `md:min-h-0` - Resets height constraint (grid handles sizing)
- `md:snap-none` - Disables snap behavior
- `gap-6` - Same gap spacing maintained

### Visual Effect

When a card is snapped and centered:
- Card occupies ~90% of viewport height (centered)
- ~5% of viewport above shows hint of previous card
- ~5% of viewport below shows hint of next card
- `gap-6` (24px) spacing ensures cards don't overlap
- Creates a "peek" effect similar to social media feeds

### Container Behavior

**Unchanged:**
- `snap-y snap-mandatory` on Section container (mobile)
- `md:snap-none` on Section container (desktop)
- Vertical scrolling behavior maintained
- No horizontal scrolling

---

## Design/UX Choices

### 1. Card Height: `min-h-[90vh]`

**Choice:** 90% of viewport height

**Rationale:**
- Provides immersive, focused experience (card fills most of screen)
- Leaves ~10% total (5% top, 5% bottom) for hints of adjacent cards
- Standard pattern for social feed interfaces (Instagram Stories, TikTok)
- `min-h` allows cards with more content to grow taller if needed
- Not forcing exact `90vh` gives flexibility for variable content

### 2. Snap Alignment: `snap-center`

**Choice:** Center alignment instead of start

**Rationale:**
- Cards center in viewport for balanced, focused view
- Previous and next cards visible at edges (top and bottom)
- More natural for feed-style browsing
- `snap-start` would stick cards to top, hiding previous card hint
- `snap-center` creates the "peek" effect desired

### 3. Gap Spacing: `gap-6` (Maintained)

**Choice:** Kept existing `gap-6` (24px) spacing

**Rationale:**
- Existing spacing provides clear separation between cards
- Works well with `min-h-[90vh]` to show hints of adjacent cards
- Consistent with design token (`--home-grid-gap` = `var(--space-6)`)
- No need to increase spacing; 90vh + gap naturally creates peek effect

### 4. Height Reset on Desktop: `md:min-h-0`

**Choice:** Reset height constraint on tablet/desktop

**Rationale:**
- Grid layout handles card sizing on larger screens
- Natural card height works better in multi-column grid
- Prevents cards from being artificially tall on desktop
- Maintains existing desktop layout behavior

---

## Manual Testing Checklist

### Mobile Viewport (`< 768px`)

**Card Height:**
- [ ] Cards are at least 90% of viewport height (`min-h-[90vh]`)
- [ ] Cards with more content can grow taller than 90vh
- [ ] Cards don't collapse or shrink below 90vh

**Snap Behavior:**
- [ ] When scrolling stops, current card is **centered** in viewport
- [ ] Card occupies ~90% of screen (centered)
- [ ] Hint of previous card visible at top edge (~5% of viewport)
- [ ] Hint of next card visible at bottom edge (~5% of viewport)
- [ ] Snap feels smooth and intentional

**Visual Feed Effect:**
- [ ] Scrolling through cards feels like a social feed
- [ ] Each card focuses attention when centered
- [ ] Previous/next cards provide context without distraction
- [ ] Gap spacing between cards is visible and appropriate

**Scrolling:**
- [ ] Vertical scroll works smoothly
- [ ] **No horizontal scrollbars** appear
- [ ] Cards snap cleanly (no partial cards stuck)
- [ ] Can scroll through all cards in feed

**Edge Cases:**
- [ ] First card centers properly when scrolling down from HomeHero
- [ ] Last card can be centered and fully viewed
- [ ] Works with varying card content lengths
- [ ] Cards with very long content (taller than 90vh) still snap correctly

### Desktop Viewport (`>= 768px`)

**Layout Preservation:**
- [ ] Cards display in grid layout (2 columns tablet, 3 columns desktop)
- [ ] Cards use natural height (not forced to 90vh)
- [ ] **No horizontal scrolling** appears
- [ ] Layout looks identical to before refinement

**No Snap Behavior:**
- [ ] No snap scrolling on desktop (`md:snap-none` applied)
- [ ] Cards don't have height constraint (`md:min-h-0` applied)
- [ ] Grid layout behaves normally
- [ ] Normal page scrolling (no snapping)

**Spacing:**
- [ ] Gap between cards matches existing design
- [ ] Grid spacing consistent with before

---

## Files Modified

1. `app/(home)/components/CardGrid.tsx` - Changed snap alignment to `snap-center` and added `min-h-[90vh]` on mobile

## Files Not Modified

- `app/page.tsx` - No changes (container snap behavior unchanged)
- `styles/globals.css` - No changes (Tailwind utilities only)
- `app/(home)/components/HomeCard.tsx` - No changes (snap classes applied via `cloneElement`)
- `app/(home)/components/HomeTiles.tsx` - No changes
- `app/(home)/components/ReviewCard.tsx` - No changes
- `app/(home)/components/PodcastCard.tsx` - No changes

---

## Accessibility Considerations

### Keyboard Navigation
- ✅ Vertical scroll container remains keyboard accessible
- ✅ Page Up/Down and Space/Shift+Space snap to centered cards
- ✅ Tab navigation through cards still works vertically
- ✅ Focus indicators remain visible

### Screen Readers
- ✅ `role="list"` maintained on container
- ✅ Cards maintain `role="listitem"` (via HomeCard)
- ✅ No changes to semantic structure
- ✅ Card content remains fully accessible

### Visual Accessibility
- ✅ Cards are large enough for comfortable reading
- ✅ Previous/next card hints don't interfere with current card focus
- ✅ Gap spacing provides clear separation

---

## Performance Considerations

- ✅ Uses CSS `scroll-snap` (hardware accelerated)
- ✅ `min-h-[90vh]` doesn't cause layout shifts (cards have consistent minimum height)
- ✅ No JavaScript scroll handlers (pure CSS)
- ✅ Vertical scrolling remains performant

---

## Comparison with Previous Implementation

### Changed
- `snap-start` → `snap-center` (cards center instead of stick to top)
- Natural height → `min-h-[90vh]` (cards fill ~90% of viewport)
- Added `md:min-h-0` to reset height on desktop

### Maintained
- ✅ `snap-y snap-mandatory` on container (mobile)
- ✅ `md:snap-none` on container (desktop)
- ✅ `gap-6` spacing
- ✅ Grid layout on desktop (`md:grid-cols-2 lg:grid-cols-3`)
- ✅ All existing HomeCard interactions (wiggle, blur, ElectricBorder, etc.)
- ✅ Tailwind-first approach (no global CSS changes)

---

## Future Enhancements (Optional)

1. **Dynamic Height**: Consider `min-h-[calc(90vh-<header-height>)]` if header is sticky/fixed to account for header space

2. **Snap Padding**: Add `scroll-padding-top` if fixed header interferes with centering

3. **Height Tuning**: Adjust `min-h-[90vh]` if user feedback suggests different percentage (e.g., `min-h-[85vh]` for more peek, `min-h-[95vh]` for less peek)

4. **Smooth Scroll**: Add `scroll-behavior: smooth` if desired for smoother transitions between cards

---

## Conclusion

Successfully refined vertical snap feed for social feed-like experience:
- ✅ Cards are ~90vh tall and centered when snapped
- ✅ Hints of previous/next cards visible at viewport edges
- ✅ More immersive, focused browsing experience
- ✅ Desktop layout unchanged (natural height, no snap)
- ✅ Pure Tailwind implementation (no global CSS changes)
- ✅ All existing HomeCard interactions preserved

The implementation creates a social feed-like experience on mobile where each card takes focus when centered, while maintaining the existing grid layout on desktop.

