# HomeCard Mobile Interactions Refactor – Implementation Diff

**Date:** Mobile interaction adjustments  
**Reference Documents:**
- Previous behavior: `04-home-card-refactor-diff.md`
- Vertical snap behavior: `12-home-card-vertical-snap-feed-diff.md`, `13-home-card-vertical-snap-height-diff.md`

---

## Summary of Changes by File

### 1. `styles/globals.css`

**What changed:**

#### Card-level wiggle/lift/shadow (desktop-only):
- **Wrapped hover/focus shadow and wiggle animation in `@media (min-width: 768px)`**:
  - `.home-card:hover` and `.home-card:focus-within` shadow changes now only apply on `md+` breakpoint
  - `.home-card:hover:not(:active)` and `.home-card:focus-within:not(:active)` wiggle animation now only applies on `md+` breakpoint
- **Kept active/pressed state global**:
  - `.home-card:active` transform and shadow changes remain global (work on all breakpoints)
  - Reduced motion handling unchanged

#### ElectricBorder intensification (desktop-only):
- **Wrapped ElectricBorder activation in `@media (min-width: 768px)`**:
  - `.home-card:hover .electric-border::before` and `.home-card:focus-within .electric-border::before` intensification (opacity, border-width, animation-duration) now only applies on `md+` breakpoint
  - Updated reduced motion handling to also respect the breakpoint

**Why:** On mobile, touch interactions don't benefit from hover effects. Making these desktop-only ensures mobile users only see the essential interactions (overlay fade + press feedback) while desktop users retain the full v2 interaction set.

---

### 2. `app/(home)/components/HomeCard.tsx`

**What changed:**

#### Album art blur + dim (desktop-only):
- **Image blur and brightness**:
  - Changed `motion-safe:group-hover:blur-sm` → `md:motion-safe:group-hover:blur-sm`
  - Changed `motion-safe:group-focus-within:blur-sm` → `md:motion-safe:group-focus-within:blur-sm`
  - Changed `group-hover:brightness-[0.85]` → `md:group-hover:brightness-[0.85]`
  - Changed `group-focus-within:brightness-[0.85]` → `md:group-focus-within:brightness-[0.85]`
- **Summary text dimming**:
  - Changed `group-hover:opacity-20` → `md:group-hover:opacity-20`
  - Changed `group-focus-within:opacity-20` → `md:group-focus-within:opacity-20`

#### Pull quote overlay (mobile: focus-within only, desktop: hover + focus-within):
- **Pull quote text** (line 114):
  - Changed `group-hover:opacity-100` → `md:group-hover:opacity-100`
  - Kept `group-focus-within:opacity-100` without `md:` prefix (works on mobile)
- **Media overlay** (lines 194, 210):
  - Changed `group-hover:opacity-100` → `md:group-hover:opacity-100`
  - Kept `group-focus-within:opacity-100` without `md:` prefix (works on mobile)

**Why:** On mobile, the only visual interaction should be the pull quote overlay fade (via focus-within when card is tapped/focused). On desktop, both hover and focus-within trigger the overlay. Blur and dim effects are desktop-only since they don't enhance mobile touch interactions.

---

## Behavior Comparison: Before vs After

### Mobile (`< md` breakpoint, < 768px)

| Aspect | Before | After | Status |
|--------|--------|-------|--------|
| **Card wiggle/lift** | ✅ Triggered on hover/focus | ❌ No wiggle/lift | ✅ Desktop-only |
| **Card shadow change** | ✅ Deepened on hover/focus | ❌ No shadow change | ✅ Desktop-only |
| **ElectricBorder intensification** | ✅ Opacity/border/speed increased on hover/focus | ❌ Stays subtle/static | ✅ Desktop-only |
| **Album art blur** | ✅ Blurred on hover/focus | ❌ No blur | ✅ Desktop-only |
| **Album art dim** | ✅ Dimmed on hover/focus | ❌ No dim | ✅ Desktop-only |
| **Summary dimming** | ✅ Opacity reduced on hover/focus | ❌ Stays fully visible | ✅ Desktop-only |
| **Pull quote overlay fade** | ✅ Faded in on hover/focus | ✅ Fades in on focus-within (tap/focus) | ✅ Mobile-optimized |
| **Press/active feedback** | ✅ Scale down + shadow soften | ✅ Scale down + shadow soften | ✅ Unchanged (global) |

**Net effect on mobile:**
- No wiggle, lift, blur, dim, or ElectricBorder intensification
- Only pull quote overlay fades in when card is tapped/focused
- Press feedback (scale + shadow) remains for tactile feedback

---

### Desktop (`md+` breakpoint, ≥ 768px)

| Aspect | Before | After | Status |
|--------|--------|-------|--------|
| **Card wiggle/lift** | ✅ Triggered on hover/focus | ✅ Triggered on hover/focus | ✅ Unchanged |
| **Card shadow change** | ✅ Deepened on hover/focus | ✅ Deepened on hover/focus | ✅ Unchanged |
| **ElectricBorder intensification** | ✅ Opacity/border/speed increased on hover/focus | ✅ Opacity/border/speed increased on hover/focus | ✅ Unchanged |
| **Album art blur** | ✅ Blurred on hover/focus | ✅ Blurred on hover/focus | ✅ Unchanged |
| **Album art dim** | ✅ Dimmed on hover/focus | ✅ Dimmed on hover/focus | ✅ Unchanged |
| **Summary dimming** | ✅ Opacity reduced on hover/focus | ✅ Opacity reduced on hover/focus | ✅ Unchanged |
| **Pull quote overlay fade** | ✅ Faded in on hover/focus | ✅ Fades in on hover + focus-within | ✅ Unchanged |
| **Press/active feedback** | ✅ Scale down + shadow soften | ✅ Scale down + shadow soften | ✅ Unchanged |

**Net effect on desktop:**
- All v2 interactions remain fully functional
- Behavior effectively unchanged from previous implementation

---

## ElectricBorder Behavior: Mobile vs Desktop

### Mobile (`< md`)
- **Rest state**: Subtle border with slow rotation (8s duration), opacity 0.25
- **On tap/focus**: No intensification; border remains at rest state
- **Reduced motion**: Static border, opacity 0.4

### Desktop (`md+`)
- **Rest state**: Subtle border with slow rotation (8s duration), opacity 0.25
- **On hover/focus**: Intensifies to opacity 0.65, border-width 2px, animation-duration 4s
- **Reduced motion**: Static border, opacity 0.6 on hover/focus

**Key difference:** Mobile users don't see ElectricBorder "kick up" on interaction; it stays subtle. Desktop users see the full intensification effect.

---

## Vertical Snap Behavior

**Unchanged:** The vertical snap feed and 90vh behavior described in:
- `12-home-card-vertical-snap-feed-diff.md`
- `13-home-card-vertical-snap-height-diff.md`

Remains as-is. Cards still:
- Use `snap-y` and `snap-center` for vertical scrolling
- Have `min-h-[90vh]` for full-viewport snap behavior
- Expand/take over screen when tapped due to snap + height behavior

---

## Manual Test Checklist

### Mobile (`< md`, < 768px)

- [ ] **Scroll through snap feed**: Cards don't wiggle or blur on tap
- [ ] **Tap a card**: Pull quote overlay fades in (via focus-within)
- [ ] **Press and hold**: Card slightly scales down (press feedback)
- [ ] **ElectricBorder**: Stays subtle/static; doesn't intensify on tap
- [ ] **Album art**: No blur or dim on tap
- [ ] **Summary text**: Stays fully visible (no dimming on tap)
- [ ] **Navigation**: Card still navigates correctly when tapped

### Desktop (`md+`, ≥ 768px)

- [ ] **Hover over card**: 
  - [ ] Wiggle animation plays
  - [ ] Card lifts (shadow deepens)
  - [ ] ElectricBorder intensifies (opacity, border, speed)
  - [ ] Album art blurs and dims
  - [ ] Summary text dims
  - [ ] Pull quote overlay fades in
- [ ] **Focus card (keyboard)**:
  - [ ] Same visual affordances as hover (wiggle, lift, blur, dim, overlay)
- [ ] **Click/press card**: 
  - [ ] Press feedback (scale down + shadow soften)
  - [ ] Navigation works correctly
- [ ] **Reduced motion**: All animations disabled, reduced motion styles apply

---

## Files Changed

1. `styles/globals.css`
   - Wrapped card hover/focus wiggle/shadow in `@media (min-width: 768px)`
   - Wrapped ElectricBorder intensification in `@media (min-width: 768px)`
   - Kept active/pressed state global

2. `app/(home)/components/HomeCard.tsx`
   - Added `md:` prefix to image blur/brightness classes
   - Added `md:` prefix to summary opacity classes
   - Changed pull quote overlay: `group-hover:opacity-100` → `md:group-hover:opacity-100` (kept `group-focus-within:opacity-100` without prefix)

---

## Technical Notes

- **Breakpoint**: Uses Tailwind's `md` breakpoint (`768px`) consistently
- **Reduced motion**: All `motion-safe:` and `motion-reduce:` safeguards remain intact
- **Focus-within on mobile**: Reliable for touch interactions; triggers when card/title/link is focused/tapped
- **No JavaScript changes**: All adjustments are CSS-only (Tailwind classes and media queries)
- **Accessibility**: Focus states remain accessible on all breakpoints; reduced motion preferences respected

