# HomeCard – target interactions (v2)

## 0. Design goals

- No spinning cards or spinning album art. ElectricBorder animation must be visually confined to the border layer itself, never transforming the card or its contents.
- Subtle but expressive motion that matches the editorial / magazine vibe. The wiggle should feel playful but refined, not jarring.
- Tailwind-first implementation, backed by `tokens.css` and `globals.css`. Prefer CSS pseudo-classes (`:hover`, `:focus-within`, `:focus-visible`, `:active`) over JavaScript state management where possible.
- Respect `prefers-reduced-motion`:
  - Remove wiggle/lift animation and transform-heavy motion.
  - Keep visual state changes (overlay, blur, dimming), but with minimal or instant transitions.

---

## 1. Card shell

### 1.1 Rest state

- Static, non-spinning card.
- Uses existing chamfered stroke / art-directed outline from current styles.
- Electric border:
  - Very subtle at rest: opacity around `0.2-0.3`, low animation speed (if animated at all, e.g. 8-10s rotation cycle).
  - If animated, movement is barely noticeable and visually confined to the border itself (internal gradient movement, not card transform).
  - Border width: `1.5px` at rest.
- Shadow:
  - Uses `--card-shadow-rest` (current: `0 4px 14px rgba(109, 43, 121, 0.08)`).
- Transform:
  - No translate/scale/rotate in rest state.
- Background:
  - Uses `--surface` (white) with `paper-grain` texture overlay.

### 1.2 Hover / focus (pointer or keyboard)

- Interaction can be driven by CSS (`:hover`, `:focus-within`, `:focus-visible`) rather than JS state where possible. Consider using Tailwind `group` utilities with `group-hover:` and `group-focus-within:` for child element effects.

- First-time interaction (wiggle then settle):
  - Card performs a tiny "wiggle then settle" animation:
    - Small rotate/translate jitter sequence:
      - Frame 1 (0%): `rotate(0deg) translateY(0) scale(1)`
      - Frame 2 (25%): `rotate(-0.5deg) translateY(-1px) scale(1.005)` (quick jitter)
      - Frame 3 (50%): `rotate(0.5deg) translateY(-2px) scale(1.01)` (counter-jitter)
      - Frame 4 (75%): `rotate(-0.25deg) translateY(-3px) scale(1.015)` (settling)
      - Frame 5 (100%): `rotate(0deg) translateY(-4px) scale(1.02)` (settled state)
    - Total duration: `300-400ms` with `ease-out` timing.
    - Animation only plays once per hover session (use CSS `animation-fill-mode: forwards` or JS to prevent replay on hover persistence).
  - Ends with card slightly lifted and scaled:
    - `translateY(-4px)` (equivalent to Tailwind `-translate-y-1`).
    - `scale(1.02)` (equivalent to Tailwind `scale-[1.02]`).

- Steady state while hovered/focused:
  - Card remains slightly lifted and scaled (`translateY(-4px) scale(1.02)`).
  - Shadow deepens to `--card-shadow-hover` (current: `0 10px 28px rgba(109, 43, 121, 0.18)`).
  - Electric border becomes a bit more active:
    - Opacity increases to `0.6-0.7`.
    - Border width increases to `2px`.
    - Animation speed increases modestly (e.g. from 8s to 4-5s rotation cycle, if animated).
    - Still visually confined to the border; does not transform card contents.
    - Any visual motion is internal to the border graphics (gradient rotation within the border stroke), not applied as transform to the entire card.

- Focus (keyboard):
  - Includes all the above "active" visuals (lift, shadow, border activation).
  - Plus an accessible chamfered focus outline on key focusable elements (title link, CTA button).
  - Focus outline uses `focus-chamfer` utility:
    - `outline: 2px solid` with `outline-offset: 4px`.
    - Chamfered border overlay via `::after` pseudo-element with clip-path matching card chamfer.
    - Outline color: `color-mix(in oklab, var(--brand-purple-800) 55%, transparent)`.
    - Box shadow: `var(--card-shadow-focus)` (3px purple ring).

### 1.3 Active / pressed

- On press (mouse down / touch / keyboard activation via `:active` pseudo-class):
  - Card gives subtle pressed feedback:
    - Slight scale down: `scale(0.99)` (equivalent to Tailwind `scale-[0.99]`).
    - Shadow softens toward `--card-shadow-rest` (reduces intensity but doesn't fully return to rest).
    - Transform transition duration: `100-150ms` with `ease-in` timing for quick, responsive feedback.
  - Feedback should be quick and responsive, giving immediate tactile sense of press.

- After activation, navigation proceeds to the article/episode page via Next.js routing.

---

## 2. Album art and text content

### 2.1 Rest state

- Album art:
  - Sharp, unblurred image (no `blur-*` filter applied).
  - No dimming/overlay visible (overlay opacity `0`).
  - Framed within the card's chamfered clip-path system.
  - Image uses `object-cover` to fill the aspect-square container.

- Pull quote:
  - Not visible at rest (opacity `0`).
  - Not announced to screen readers at rest (`aria-hidden="true"`).
  - Positioned absolutely over the album art (bottom-aligned with gradient background).

- Summary text:
  - Fully visible and readable (opacity `1`).
  - Serves as the primary description under the art.
  - Accessible to screen readers (`aria-hidden="false"` or omitted).

### 2.2 Hover / focus behavior

- Triggered by hover/focus on the card (`group-hover:`, `group-focus-within:`), not by direct image hover only. This ensures consistent behavior whether user hovers card edge or image directly.

- Album art:
  - Gains a soft blur: Tailwind `blur-sm` (equivalent to `filter: blur(4px)`) or tokenized blur value.
  - Slightly dimmed: `brightness(0.85)` or equivalent filter, or subtle dark overlay (opacity `0.15-0.2`).
  - Changes use motion-safe transitions (`150-200ms ease-out`).
  - No zoom, pan, or parallax effects.

- Pull quote overlay:
  - Fades in over the image from opacity `0` → `1`.
  - Transition duration: `200ms` with `ease-out` timing.
  - Positioned near the bottom over a subtle gradient background:
    - Review cards: `bg-[color-mix(in_oklab,var(--brand-pink-500)_30%,transparent)]`.
    - Podcast cards: `bg-[color-mix(in_oklab,var(--brand-purple-600)_30%,transparent)]`.
  - For reviews: shows the pull quote text (centered, `line-clamp-3`, max-width `26ch`).
  - For podcasts: can show play affordance (SVG icon) + quote (if `overlayAction` prop provided).
  - Marked `aria-hidden="false"` when visible, `aria-hidden="true"` when hidden.

- Summary text:
  - Softly dimmed to opacity `0.2` when pull quote is shown (to de-emphasize but remain slightly visible).
  - Transition duration: `200ms` with `ease-out` timing.
  - Marked `aria-hidden="true"` while pull quote is visually primary (to avoid duplicate announcements).

### 2.3 Reduced motion behavior

- No transform-based animation (no wiggle, no lift) when `prefers-reduced-motion: reduce` is active.
- Card transform is disabled: `transform: none !important` in reduced motion media query.
- Album art:
  - May still change blur/dimming, but transitions are essentially instant or very fast (`transition-duration: 0.01ms` or `50ms` max).
- Pull quote overlay:
  - Appears/disappears with minimal or no animation (instant opacity change or `50ms` max).
- Summary:
  - Still dims/undims, but without large motion (instant or `50ms` max transition).

---

## 3. ElectricBorder behavior

- ElectricBorder wraps the outer card shell (or an outer wrapper), not the album art alone. It is a sibling or child of the card's main container, positioned absolutely with `inset: 0` and `z-index` above card background but below card content.

- Rest state:
  - Thin, subtle border that matches the existing chamfered outline clip-path.
  - Low opacity: `0.2-0.3`.
  - Low animation speed: if animated, rotation cycle is `8-10s` (slow, barely noticeable).
  - Border width: `1.5px`.
  - Border color:
    - Review cards: `var(--brand-pink-500)`.
    - Podcast cards: `var(--brand-purple-600)`.
  - Visual motion (if any) is confined to the border graphics themselves (internal conic gradient rotation within the border stroke), not applied as transform to the card or its contents.

- Hover/focus state:
  - Border becomes slightly more vivid:
    - Opacity increases to `0.6-0.7`.
    - Border width increases to `2px`.
    - Speed/chaos parameters increase modestly: animation cycle speeds up to `4-5s` (if animated).
  - Any visual motion is confined to the border graphics (e.g. internal gradient movement), not applied as transform to the entire card.
  - Border animation (if used) should use `@keyframes` with `transform: rotate()` applied only to the border's internal gradient/pattern, not the card element.

- Reduced motion:
  - ElectricBorder animation is disabled or drastically simplified (`animation: none`).
  - A static but still visible border is used instead:
    - Opacity increases slightly (e.g. `0.4` at rest, `0.6` on hover/focus) to compensate for lack of animation.
    - Border remains visible and provides visual feedback without motion.

---

## 4. Click → page transition

- Short-term implementation:
  - Card provides pressed feedback (see 1.3: scale down to `0.99`, shadow softens).
  - Navigation to the article/episode page is immediate (standard Next.js routing via `<Link>` components).
  - Click tracking (if needed) can be handled via `onClick` handlers or Next.js router events.

- Future enhancement (nice-to-have, not required in this refactor):
  - Implement a shared layout transition where the HomeCard appears to expand into the article header using a route transition library (e.g. Framer Motion's `layoutId` or `AnimatePresence`).
  - This would create a smooth visual connection between the card preview and the full article page.

---

## 5. Differences from current behavior (summary)

- **No spinning of the card or album art**: ElectricBorder animation is visually contained to the border layer itself. The card and its contents never rotate or spin. Any border animation uses internal gradient/pattern movement, not card-level transforms.

- **Wiggle + lift is a small, single animation that settles into a stable lifted state**: The wiggle is a quick `300-400ms` sequence of small rotate/translate jitters that ends in the lifted/scaled state (`translateY(-4px) scale(1.02)`). This animation only plays once per hover session, then the card remains in the lifted state until hover ends.

- **Album art blur/dim + pull-quote fade are clearly specified and driven by card hover/focus**: The art gains `blur-sm` and `brightness(0.85)` on hover, while the pull quote overlay fades in from opacity `0` to `1`. Summary text dims to opacity `0.2`. All transitions use `150-200ms ease-out`.

- **A real pressed state is added for better click/tap feedback**: Active state uses `scale(0.99)` and shadow softening with `100-150ms ease-in` transition for immediate tactile feedback.

- **Reduced-motion behavior is simplified to minimize transforms and long-running animations**: Wiggle/lift animations are disabled, but visual state changes (overlay, blur, dimming) still occur with instant or very fast transitions (`0.01ms` or `50ms` max). ElectricBorder animation is disabled, replaced with static border with slightly higher opacity.

---

## 6. Implementation approach

### 6.1 CSS-first strategy

- Prefer CSS pseudo-classes over JavaScript state management:
  - Use `:hover` and `:focus-within` on the card container.
  - Use Tailwind `group` utilities: `group` on card, `group-hover:` and `group-focus-within:` on children.
  - Use `:active` for pressed state.
  - Consider removing or simplifying the current `useState<InteractionMode>` pattern if CSS can handle all states.

### 6.2 Animation keyframes

- Wiggle animation should be defined in `globals.css` as `@keyframes home-card-wiggle`:
  ```css
  @keyframes home-card-wiggle {
    0% { transform: rotate(0deg) translateY(0) scale(1); }
    25% { transform: rotate(-0.5deg) translateY(-1px) scale(1.005); }
    50% { transform: rotate(0.5deg) translateY(-2px) scale(1.01); }
    75% { transform: rotate(-0.25deg) translateY(-3px) scale(1.015); }
    100% { transform: rotate(0deg) translateY(-4px) scale(1.02); }
  }
  ```
- Apply via Tailwind: `animate-[home-card-wiggle_400ms_ease-out_forwards]` or equivalent custom animation utility.

### 6.3 ElectricBorder containment

- Ensure ElectricBorder component or styles apply transforms only to the border element itself, not the card:
  - Use `::before` or `::after` pseudo-element for the animated border.
  - Apply `transform: rotate()` only to the border's internal gradient/pattern, not the card container.
  - Use `isolation: isolate` or `transform-style: preserve-3d` if needed to contain transforms.

### 6.4 Token additions (if needed)

- Consider adding to `tokens.css`:
  - `--card-wiggle-duration: 400ms`
  - `--card-active-scale: 0.99`
  - `--electric-border-opacity-rest: 0.25`
  - `--electric-border-opacity-active: 0.65`
  - `--electric-border-width-rest: 1.5px`
  - `--electric-border-width-active: 2px`

---

## 7. Accessibility considerations

- **Focus management**: Focus states must be clearly visible and match hover states for keyboard users.
- **Screen reader announcements**: Pull quote and summary text visibility should be managed via `aria-hidden` to avoid duplicate announcements.
- **Reduced motion**: All transform-heavy animations must be disabled in reduced motion, but visual state changes (opacity, blur, dimming) remain accessible.
- **Touch targets**: Ensure card and interactive elements meet minimum touch target size (44x44px).

---

## 8. Testing checklist

- [ ] Card wiggle animation plays once on first hover, then settles into lifted state.
- [ ] Card does not spin or rotate beyond the small wiggle jitter.
- [ ] Album art blurs and dims on hover, pull quote fades in.
- [ ] Summary text dims on hover when pull quote is visible.
- [ ] Active/pressed state provides clear feedback (scale down, shadow softens).
- [ ] Focus state matches hover state visually, plus chamfered outline on focusable elements.
- [ ] ElectricBorder animation is visually confined to border layer, does not transform card.
- [ ] Reduced motion disables wiggle/lift but preserves visual state changes.
- [ ] All transitions respect `prefers-reduced-motion` settings.
- [ ] Navigation works correctly from title link, CTA button, and overlay button (podcast cards).

