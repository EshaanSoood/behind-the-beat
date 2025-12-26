# HomeCard – interactions & animations audit

**Component:** `app/(home)/components/HomeCard.tsx`  
**Related styles:**
- `styles/globals.css` → `.home-card-*` rules
- `styles/tokens.css` → `--card-shadow-*`, `--card-border-*` variables
- `components/ElectricBorder.tsx` → animated border component
- `components/ButtonTrapezoid.tsx` → CTA button with hover states

---

## 1. Card-level interactions

### 1.1 Hover on card (pointer)

**Trigger:** `onPointerEnter` handler sets `interactionMode` to `"hover"`, which applies `data-interaction="hover"` attribute to the `<article>` element.

**Visual effects:**

- [x] Position (lifts up slightly: `translateY(-4px)` via `-translate-y-1`)
- [x] Scale (slightly larger: `scale-[1.02]`)
- [x] Shadow (changes from `--card-shadow-rest` to `--card-shadow-hover`)
- [ ] Border / outline (border color stays the same, but ElectricBorder activates)
- [ ] Background (no background change)
- [ ] Opacity / blur / filter (no opacity/blur changes on card itself)
- [x] Electric border animation (via `ElectricBorder` component with `isActive={true}`)

**Implementation:**

- Tailwind utilities: 
  - `transition-transform transition-shadow duration-200 ease-out`
  - `-translate-y-1 scale-[1.02]` (conditionally applied when `isInteracting` is true)
  - `motion-reduce:transform-none` (disables transform in reduced motion)
- Global CSS selectors (`globals.css`):  
  - `.home-card[data-interaction="hover"]` → `box-shadow: var(--card-shadow-hover);`
  - `.home-card[data-interaction="focus"]` → same shadow as hover
- JS / libraries: 
  - React state management via `useState<InteractionMode>("rest")`
  - `onPointerEnter={setHoverMode}` handler
  - `onPointerLeave={clearInteraction}` handler

**Motion details:**

- `transition-property`: `transform`, `box-shadow`
- `transition-duration`: `200ms` (via `duration-200`)
- `transition-timing-function`: `ease-out` (via `ease-out`)
- `transition-delay`: `0ms` (no delay)

**Notes:**
- Transform is disabled via `motion-reduce:transform-none` when `prefers-reduced-motion` is active
- Shadow transition still applies even with reduced motion (via CSS `transition-shadow`)

---

## 2. Inner content interactions (on hover)

### 2.1 Image / thumbnail

**Trigger:** Card hover (no direct image hover handler; image effects are triggered by parent card hover state).

**Visual effects:**

- [ ] Image zoom (`scale-*` / `transform: scale()`) — **NO image zoom effect**
- [ ] Pan / parallax (`translate-*`) — **NO pan/parallax effect**
- [ ] Filter (e.g. `brightness`, `contrast`, `blur`, `grayscale`) — **NO filter effects**
- [x] Overlay (gradient overlay appears on hover)
- [ ] Any other: `___________________________`

**Implementation:**

- Tailwind: 
  - Image itself: `home-card-media-image w-full h-full object-cover` (no hover classes)
  - Overlay: `home-card-media-overlay` with `transition-opacity duration-200 ease-out`
  - Overlay opacity: `opacity-0` (rest) → `opacity-100` (hover/focus)
- `.home-card-media-overlay` rules in `globals.css`: 
  - Base styles: `position: absolute; inset: 0; display: flex; ...`
  - Background colors vary by variant:
    - Review: `bg-[color-mix(in_oklab,var(--brand-pink-500)_30%,transparent)]`
    - Podcast: `bg-[color-mix(in_oklab,var(--brand-purple-600)_30%,transparent)]`
- JS/Framer Motion: None (pure CSS transitions)

**Motion details:**

- duration: `200ms`
- easing: `ease-out`
- delay: `0ms`

**Overlay content:**
- For review cards: Shows pull quote text (opacity transitions from `opacity-10` to `opacity-100`)
- For podcast cards: Shows play button SVG icon + pull quote (if `overlayAction` prop provided)
- Overlay can be clickable button (`<button>`) or non-interactive div (`<div>`)

### 2.2 Title / metadata / badges

**Trigger:** Hover on card (no direct title hover; effects triggered by parent card hover state).

#### a. Title

**Effects:**

- [ ] Color change (e.g. text → brand accent) — **NO color change on hover**
- [ ] Underline / decoration — **NO underline/decoration**
- [ ] Position / transform — **NO position/transform changes**
- [ ] Opacity / blur — **NO opacity/blur changes**
- [ ] Any other: **NO title-specific hover effects**

**Implementation:** 
- Title link: `home-card-title font-display text-[clamp(1.35rem,1vw+1rem,1.65rem)] leading-snug text-brand-purple-800`
- Uses `focus-chamfer` utility for focus-visible styling (see Focus section)
- No hover-specific classes on title

#### b. Pull quote (overlay text)

**Effects:**

- [x] Opacity change (for review cards: `opacity-10` → `opacity-100` on hover)
- [x] Visibility toggle (via `aria-hidden` attribute: `"true"` → `"false"`)

**Implementation:**
- Review cards: `opacity-10 transition-opacity duration-200 ease-out min-h-[4.5rem]` with conditional `opacity-100` when `isInteracting`
- Podcast cards: Pull quote always visible (no opacity transition)
- `aria-hidden` attribute changes: `isInteracting ? "false" : "true"`

**Motion details:**
- duration: `200ms`
- easing: `ease-out`
- delay: `0ms`

#### c. Summary text

**Effects:**

- [x] Opacity change (reduces to `opacity-[0.15]` on hover to de-emphasize)
- [x] Visibility toggle (via `aria-hidden` attribute: `"false"` → `"true"`)

**Implementation:**
- `transition-opacity duration-200 ease-out`
- Conditional classes: `isInteracting ? "opacity-[0.15]" : "opacity-100"`
- `aria-hidden={isInteracting ? "true" : "false"}`

**Motion details:**
- duration: `200ms`
- easing: `ease-out`
- delay: `0ms`

#### d. Meta (artist/guest, date)

**Effects:**

- [ ] Color change — **NO color change**
- [ ] Position / transform — **NO position/transform changes**
- [ ] Opacity / blur — **NO opacity/blur changes**
- [ ] Any other: **NO meta-specific hover effects**

**Implementation:** 
- Meta elements have no hover-specific styling
- Static classes: `text-text-muted`, `text-[0.85rem]`, etc.

---

## 3. Focus / keyboard interactions

### 3.1 Focus-visible

**Trigger:** `onFocusCapture` handler sets `interactionMode` to `"focus"`, which applies `data-interaction="focus"` attribute. Also triggered by keyboard tabbing to focusable elements within the card.

**Effects:**

- [x] Outline (via `focus-chamfer` utility on title link)
- [ ] Ring (no Tailwind `focus:ring-*` classes)
- [x] Border / background change (ElectricBorder activates, same as hover)
- [x] Motion (uses same transition as hover: `transition-transform transition-shadow`)
- [x] Shadow (same as hover: `--card-shadow-hover`)

**Implementation:**

- Tailwind `focus:*` utilities: 
  - Title link uses `focus-chamfer` utility class
  - Card uses same transform/shadow classes as hover: `-translate-y-1 scale-[1.02]` when `isInteracting`
- `.home-card-…:focus-visible` in `globals.css`: 
  - `.home-card[data-interaction="focus"]` → `box-shadow: var(--card-shadow-hover);`
  - `.focus-chamfer:focus-visible` → custom outline with chamfered corners (see lines 174-197 in `globals.css`)
- JS handlers:
  - `onFocusCapture={setFocusMode}` on card `<article>`
  - `onBlurCapture={clearInteraction}` on card `<article>`

**Notes:**

- Focus state matches hover state visually (same shadow, transform, ElectricBorder activation)
- Focus-visible-only refinements: 
  - Title link gets chamfered outline via `.focus-chamfer:focus-visible` (purple outline with chamfered clip-path)
  - Outline color: `color-mix(in oklab, var(--brand-purple-800) 55%, transparent)`
  - Box shadow on focus: `var(--card-shadow-focus)` (3px purple ring)
  - Chamfered border via `::after` pseudo-element with clip-path

**Focus-chamfer details:**
- Outline: `2px solid` with `outline-offset: 4px`
- Chamfered border overlay: `2px solid` with clip-path matching card chamfer
- Border color: `color-mix(in oklab, var(--brand-purple-800) 70%, transparent)`

### 3.2 Focus on CTA button

**Trigger:** Keyboard tabbing to the `ButtonTrapezoid` component.

**Effects:**

- [x] Outline (via `focus-chamfer` utility on button)
- [x] Shadow (via `focus-chamfer:focus-visible` → `box-shadow: var(--card-shadow-focus)`)

**Implementation:**
- Button uses `focus-chamfer` class
- Same chamfered outline system as title link

---

## 4. Active / pressed / click behavior

### 4.1 Mouse / touch down

**Trigger:** `:active` pseudo-class (CSS only, no JS handlers for active state).

**Effects:**

- [ ] Slight depress (e.g. `translate-y-*`) — **NO active state transform**
- [ ] Scale down slightly — **NO active state scale**
- [ ] Shadow reduced / removed — **NO active state shadow change**
- [ ] Background/border tweak — **NO active state background/border changes**
- [ ] Any JS-driven microinteraction (e.g. ripple, spring) — **NO JS active handlers**

**Implementation:**

- Tailwind `active:*` utilities: **NONE**
- `.home-card-…:active` in `globals.css`: **NONE**
- JS / Framer Motion `whileTap`: **NONE**

**Notes:**
- No explicit active/pressed state styling on the card itself
- Active state relies on browser default link/button behavior

### 4.2 Navigation / behavioral click

**Behavior:**

- [x] Navigates with `<Link>` (Next.js) — title link and CTA button both use Next.js `Link`
- [ ] Opens external URL — **NO external URLs**
- [x] Fires custom handler (analytics, state, etc.) — overlay button has `registerOverlayClick` for tracking
- [x] Plays audio / opens modal / something else — overlay button navigates to episode page

**Implementation details:**

- Main clickable wrapper: 
  - Title: `<Link href={href}>` (Next.js Link component)
  - CTA: `<ButtonTrapezoid href={cta.href}>` (renders as Next.js Link)
  - Overlay (podcast cards): `<button onClick={handleOverlayClick}>` (if `overlayAction` prop provided)
- `onClick` handler logic:
  - `handleOverlayClick`: Prevents default, stops propagation, registers click tracking, then navigates via `router.push(targetHref)`
  - `registerOverlayClick`: Tracks overlay clicks in `window.__overlayClicks` object for analytics

**Click tracking:**
- Overlay clicks are tracked via `data-home-card-acceptance` attribute on card
- Stored in `window.__overlayClicks[index]` as incrementing counter

---

## 5. Motion safety (prefers-reduced-motion)

- Does the card have any **explicit handling** of `prefers-reduced-motion` yet?

  - [x] Yes → where: 
    - Tailwind: `motion-reduce:transform-none` on card (disables transform)
    - CSS: `@media (prefers-reduced-motion: reduce)` block in `globals.css` (lines 137-146)
    - CSS: `.home-card[data-interaction="hover"]` and `.home-card[data-interaction="focus"]` have `transform: none !important` in reduced motion media query (lines 645-650)
    - ElectricBorder: Animation disabled in reduced motion (lines 1040-1051)

- Notes on current behavior for reduced motion users:

  - **Card transform disabled**: `transform: none !important` prevents lift/scale effects
  - **Shadow transitions still apply**: Box-shadow changes still animate (200ms ease-out)
  - **Opacity transitions still apply**: Overlay, pull quote, and summary text opacity changes still animate
  - **ElectricBorder animation disabled**: Rotating border animation stops, falls back to static border with reduced opacity (0.3 rest, 0.6 active)
  - **All transitions reduced to 0.01ms**: Global reduced motion rule makes transitions nearly instant, but some effects (shadow, opacity) still change state

---

## 6. ElectricBorder component interactions

### 6.1 ElectricBorder activation

**Trigger:** `isActive={isInteracting}` prop passed from HomeCard (true when `interactionMode !== "rest"`).

**Visual effects:**

- [x] Animated rotating border (conic gradient rotates 360deg over 4s)
- [x] Opacity increase (0.4 → 0.8 when active)
- [x] Border width increase (1.5px → 2px when active)
- [x] Animation speed increase (4s → 2s when active)

**Implementation:**

- Component: `components/ElectricBorder.tsx`
- CSS: `.electric-border` rules in `globals.css` (lines 934-1051)
- Animation: `@keyframes electric-border-rotate` (4s linear infinite, 2s when active)
- Border colors:
  - Review: `var(--brand-pink-500)`
  - Podcast: `var(--brand-purple-600)`

**Motion details:**

- duration: `4s` (rest), `2s` (active)
- easing: `linear` (infinite rotation)
- delay: `0ms`

**Reduced motion:**
- Animation disabled: `animation: none`
- Static border with reduced opacity: `opacity: 0.3` (rest), `0.6` (active)
- Background changes to solid color instead of conic gradient

---

## 7. ButtonTrapezoid (CTA button) interactions

### 7.1 Button hover

**Trigger:** `:hover` pseudo-class on button/link.

**Visual effects:**

- [x] Background color change:
  - Primary: `bg-[var(--brand-purple-800)]` → `hover:bg-brand-purple600`
  - Neutral: `bg-neutral-ui-offwhite` → `hover:bg-neutral-ui-bg`
- [ ] Border change — **NO border color change**
- [ ] Scale / transform — **NO transform effects**
- [ ] Shadow change — **NO shadow change**

**Implementation:**

- Tailwind: `hover:bg-brand-purple600` (primary), `hover:bg-neutral-ui-bg` (neutral)
- Base classes: `transition` (applies to all properties)
- No explicit transition duration/easing (uses Tailwind defaults)

**Motion details:**

- duration: Tailwind default (`150ms`)
- easing: Tailwind default (`ease-in-out`)
- delay: `0ms`

### 7.2 Button focus

**Trigger:** `:focus-visible` (keyboard tabbing).

**Visual effects:**

- [x] Outline (via `focus-chamfer` utility, same as title link)
- [x] Shadow (via `.focus-chamfer:focus-visible` → `box-shadow: var(--card-shadow-focus)`)

**Implementation:**
- Uses same `focus-chamfer` system as title link
- Chamfered outline with purple border

---

## 8. Summary of current interaction behavior

> On hover, the HomeCard currently…
>
> - **Card lifts and scales**: Translates up 4px (`-translate-y-1`) and scales to 102% (`scale-[1.02]`)
> - **Shadow intensifies**: Changes from `--card-shadow-rest` to `--card-shadow-hover` (deeper, more spread)
> - **ElectricBorder activates**: Animated rotating border appears around card edges (pink for reviews, purple for podcasts)
> - **Overlay appears**: Semi-transparent overlay fades in over image (200ms ease-out)
> - **Pull quote reveals**: For review cards, pull quote opacity increases from 10% to 100%
> - **Summary text dims**: Summary text opacity reduces to 15% to de-emphasize
> - **Play button appears**: For podcast cards with `overlayAction`, play button SVG fades in
>
> On focus/keyboard, it…
>
> - **Same visual effects as hover**: Card lift, scale, shadow, ElectricBorder activation
> - **Chamfered outline on title**: Title link gets purple chamfered outline with 3px shadow ring
> - **Chamfered outline on button**: CTA button gets same chamfered outline when focused
> - **State persists**: Focus state maintained until blur (even if pointer leaves)
>
> On active/click, it…
>
> - **No visual active state**: No explicit pressed/depressed styling
> - **Navigation occurs**: Title link and CTA button navigate via Next.js routing
> - **Overlay click tracking**: Podcast overlay button tracks clicks in `window.__overlayClicks` before navigating
> - **Browser default active**: Relies on browser default `:active` pseudo-class for link/button feedback

---

## 9. Implementation locations summary

### Tailwind utilities (in HomeCard.tsx)
- `transition-transform transition-shadow duration-200 ease-out`
- `-translate-y-1 scale-[1.02]` (conditional)
- `motion-reduce:transform-none`
- `transition-opacity duration-200 ease-out` (overlay, pull quote, summary)
- `opacity-0` / `opacity-100` / `opacity-10` / `opacity-[0.15]` (conditional)
- `focus-chamfer` (title link, button)

### Global CSS (globals.css)
- `.home-card[data-interaction="hover"]` → shadow (line 640-643)
- `.home-card[data-interaction="focus"]` → shadow (line 640-643)
- `.home-card-media-overlay` → base overlay styles (line 681-693)
- `.home-card--review .home-card-media-overlay` → review overlay background (line 695-697)
- `.home-card--podcast .home-card-media-overlay` → podcast overlay background (line 699-701)
- `.focus-chamfer:focus-visible` → chamfered outline (line 174-197)
- `.electric-border` → animated border (line 934-1051)
- `@media (prefers-reduced-motion: reduce)` → motion safety (line 137-146, 645-650, 1040-1051)

### JavaScript/React (HomeCard.tsx)
- `useState<InteractionMode>("rest")` → interaction state management
- `onPointerEnter={setHoverMode}` → hover detection
- `onPointerLeave={clearInteraction}` → hover end detection
- `onFocusCapture={setFocusMode}` → focus detection
- `onBlurCapture={clearInteraction}` → blur detection
- `handleOverlayClick` → overlay button click handler
- `registerOverlayClick` → click tracking

### CSS Variables (tokens.css)
- `--card-shadow-rest` → `var(--shadow-soft)` (0 4px 14px rgba)
- `--card-shadow-hover` → `0 10px 28px rgba(109, 43, 121, 0.18)`
- `--card-shadow-focus` → `0 0 0 3px color-mix(...)`
- `--card-border-review` → `var(--pink-outline)`
- `--card-border-podcast` → `var(--purple-outline)`

---

## 10. Notes for future refactors

- **Interaction state is managed in JS**: Consider if this could be CSS-only using `:hover` and `:focus-visible` pseudo-classes
- **Transform disabled in reduced motion**: Good accessibility practice, but shadow/opacity transitions still occur
- **ElectricBorder is separate component**: Could be integrated into card styles or kept separate for reusability
- **No active state styling**: Consider adding subtle active/pressed feedback for better UX
- **Overlay click tracking**: Analytics system in place but may need cleanup/refinement
- **Multiple opacity transitions**: Overlay, pull quote, and summary all have separate opacity transitions (could be consolidated)







