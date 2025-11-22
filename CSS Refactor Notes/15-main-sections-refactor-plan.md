# Main sections CSS → Tailwind refactor plan + prune

## Context

- We're refactoring 5 section groups: home hero, review strip, newsletter, mission, footer.
- Tailwind theme mirrors design tokens, so layout/spacing/typography can be done with utilities.
- Complex visuals (gradients, color-mix, clip-path, nth-child art direction, "electric" borders, etc.) will stay in CSS.
- We only prune CSS that is clearly fully covered by Tailwind on the relevant elements.

---

## Home hero

### Selectors and usage

| selector              | role / description                          | used? (yes/no) | primary file(s) using it            |
|-----------------------|----------------------------------------------|---------------|-------------------------------------|
| `.home-hero-section`  | Section wrapper, hidden on mobile, margin-top | yes           | `app/(home)/components/HomeHero.tsx` |
| `.home-hero-shell`    | Main container with flex layout, padding, background | yes | `app/(home)/components/HomeHero.tsx` |
| `.home-hero-copy`     | Text content container with flex column, gap, center align | yes | `app/(home)/components/HomeHero.tsx` |
| `.home-hero-badge`    | Badge/icon container (not currently used in component) | no | - |
| `.home-hero-credit`   | Credit text styling (not currently used in component) | no | - |

### Mapping to Tailwind (planning)

| selector          | current behavior (CSS summary)                          | proposed Tailwind classes (approx)                            | keep CSS for? (yes/no + why) |
|-------------------|---------------------------------------------------------|---------------------------------------------------------------|------------------------------|
| `.home-hero-section` | `display: none` on mobile, `display: block` on tablet+, `margin-top: var(--space-8)`, `margin-bottom: 0` | `hidden md:block mt-8 mb-0` | no - straightforward responsive display and spacing |
| `.home-hero-shell` | Flex column, center align, gap `var(--space-3)`, padding `var(--space-6)`, min-height `var(--hero-min-height)`, background `var(--surface)`, box-shadow `var(--shadow-soft)` | `flex flex-col items-center gap-3 p-6 min-h-[var(--hero-min-height)] bg-[var(--surface)] shadow-[var(--shadow-soft)]` | yes - min-height uses CSS var, shadow uses CSS var, background may need CSS var |
| `.home-hero-copy` | Flex column, gap `var(--space-3)`, text-align center, width 100% | `flex flex-col gap-3 text-center w-full` | no - straightforward layout |
| `.home-hero-badge` | Inline-flex, center align/justify, 72x72px, background color-mix, border, shadow, margin-bottom | N/A (not used) | yes - complex color-mix background, keep for potential future use |
| `.home-hero-credit` | Margin-top `var(--space-3)`, font-size 0.85rem, color `var(--text-muted)` | `mt-3 text-[0.85rem] text-[var(--text-muted)]` | no - straightforward typography/spacing (if used) |

---

## Review strip

### Selectors and usage

| selector              | role / description                          | used? (yes/no) | primary file(s) using it            |
|-----------------------|----------------------------------------------|---------------|-------------------------------------|
| `.review-strip-button .button-trapezoid` | Button styling override for review strip | yes | `components/ReviewStrip.tsx` |
| `.review-strip-button .button-trapezoid:hover` | Hover state with color-mix background | yes | `components/ReviewStrip.tsx` |
| `.review-strip-artwork` | Artwork container with min-width, responsive width | yes | `components/ReviewStrip.tsx` |
| `.review-strip-artwork > a` | Link wrapper flex layout (desktop) | yes | `components/ReviewStrip.tsx` |
| `.review-strip-artwork > a > div` | Aspect ratio container (desktop) | yes | `components/ReviewStrip.tsx` |

### Mapping to Tailwind (planning)

| selector          | current behavior (CSS summary)                          | proposed Tailwind classes (approx)                            | keep CSS for? (yes/no + why) |
|-------------------|---------------------------------------------------------|---------------------------------------------------------------|------------------------------|
| `.review-strip-button .button-trapezoid` | Transparent bg, pink-500 color, pink-100 border, min-width 44px, padding | Already handled via component props/classes | yes - component-specific override, keep for specificity |
| `.review-strip-button .button-trapezoid:hover` | Color-mix background on hover | Already handled via component hover classes | yes - color-mix requires CSS |
| `.review-strip-artwork` | Min-width 200px, responsive width auto on desktop | `min-w-[200px] md:w-auto md:min-w-[200px]` | no - straightforward sizing |
| `.review-strip-artwork > a` | Flex, align-items stretch (desktop) | `md:flex md:items-stretch` | no - straightforward layout |
| `.review-strip-artwork > a > div` | Width/height 100%, aspect-ratio 1/1 (desktop) | `md:w-full md:h-full md:aspect-square` | no - straightforward sizing |

---

## Newsletter

### Selectors and usage

| selector              | role / description                          | used? (yes/no) | primary file(s) using it            |
|-----------------------|----------------------------------------------|---------------|-------------------------------------|
| `.newsletter-section` | Section wrapper with top margin | yes | `app/(home)/components/NewsletterSignup.tsx` |
| `.newsletter-shell`   | Grid container with gap, background, border, padding, shadow | yes | `app/(home)/components/NewsletterSignup.tsx` |
| `.newsletter-form`    | Flex container with align-items center | yes | `app/(home)/components/NewsletterSignup.tsx` |

### Mapping to Tailwind (planning)

| selector          | current behavior (CSS summary)                          | proposed Tailwind classes (approx)                            | keep CSS for? (yes/no + why) |
|-------------------|---------------------------------------------------------|---------------------------------------------------------------|------------------------------|
| `.newsletter-section` | Margin-top `var(--space-16)` | `mt-16` | no - straightforward spacing |
| `.newsletter-shell` | Grid, gap `var(--space-4)`, background `var(--newsletter-surface)`, border `var(--newsletter-border)`, padding `var(--space-6)`, shadow `var(--shadow-soft)` | `grid gap-4 bg-[var(--newsletter-surface)] border border-[var(--newsletter-border)] p-6 shadow-[var(--shadow-soft)]` | yes - CSS vars for colors/shadow, keep for consistency |
| `.newsletter-form` | Flex, align-items center | `flex items-center` | no - straightforward layout |

---

## Mission

### Selectors and usage

| selector              | role / description                          | used? (yes/no) | primary file(s) using it            |
|-----------------------|----------------------------------------------|---------------|-------------------------------------|
| `.mission-columns-wrapper` | Position relative wrapper | yes | `app/mission/components/MissionProse.tsx` |
| `.mission-divider`    | Slanted divider with width, background color-mix, transform rotate, hidden on mobile | yes | `app/mission/components/MissionProse.tsx` |

### Mapping to Tailwind (planning)

| selector          | current behavior (CSS summary)                          | proposed Tailwind classes (approx)                            | keep CSS for? (yes/no + why) |
|-------------------|---------------------------------------------------------|---------------------------------------------------------------|------------------------------|
| `.mission-columns-wrapper` | Position relative | `relative` | no - straightforward positioning |
| `.mission-divider` | Width `var(--divider-thickness)`, min-width same, background color-mix, transform rotate `var(--slant-base)`, pointer-events none, align-self stretch, hidden on mobile | `w-[var(--divider-thickness)] min-w-[var(--divider-thickness)] bg-[color-mix(...)] rotate-[var(--slant-base)] pointer-events-none self-stretch hidden md:block` | yes - color-mix, CSS vars for transform, complex visual effect |

---

## Footer

### Selectors and usage

| selector              | role / description                          | used? (yes/no) | primary file(s) using it            |
|-----------------------|----------------------------------------------|---------------|-------------------------------------|
| `.site-footer`        | Footer wrapper with top margin | yes | `components/Footer.tsx` |
| `.site-footer__bar`   | Full-width bar with pink-500 background, padding-block | yes | `components/Footer.tsx` |
| `.site-footer__inner` | Flex container with align-items center, gap, flex-wrap | yes | `components/Footer.tsx` |
| `.site-footer__social` | Flex container with align-items center, gap | yes | `components/Footer.tsx` |
| `.site-footer__social-link` | Inline-flex, center align/justify, color, transition | yes | `components/Footer.tsx` |
| `.site-footer__social-link:hover` | Opacity 0.8 on hover | yes | `components/Footer.tsx` |
| `.site-footer__social-link:focus-visible` | Outline styling for focus | yes | `components/Footer.tsx` |
| `.site-footer__nav`   | Flex: 1 | yes | `components/Footer.tsx` |
| `.site-footer__nav .nav-list` | Flex, align-items center, gap, flex-wrap | yes | `components/Footer.tsx` |
| `.site-footer__meta`  | Padding-block, color-mix color | yes | `components/Footer.tsx` |
| `.site-footer__meta .caption` | Color inherit | yes | `components/Footer.tsx` |
| `.site-footer__meta a` | Color inherit, underline, underline-offset | yes | `components/Footer.tsx` |
| `.site-footer__meta a:hover` | Color change on hover | yes | `components/Footer.tsx` |

### Mapping to Tailwind (planning)

| selector          | current behavior (CSS summary)                          | proposed Tailwind classes (approx)                            | keep CSS for? (yes/no + why) |
|-------------------|---------------------------------------------------------|---------------------------------------------------------------|------------------------------|
| `.site-footer` | Margin-top `var(--space-12)` | `mt-12` | no - straightforward spacing |
| `.site-footer__bar` | Background `var(--brand-pink-500)`, width 100%, padding-block `var(--space-6)` | `bg-brand-pink500 w-full py-6` | no - straightforward styling |
| `.site-footer__inner` | Flex, align-items center, gap `var(--space-6)`, flex-wrap | `flex items-center gap-6 flex-wrap` | no - straightforward layout |
| `.site-footer__social` | Flex, align-items center, gap `var(--space-4)` | `flex items-center gap-4` | no - straightforward layout |
| `.site-footer__social-link` | Inline-flex, center align/justify, color `var(--brand-purple-800)`, transition | `inline-flex items-center justify-center text-brand-purple800 transition-opacity` | partial - transition can be Tailwind, but keep for specificity if needed |
| `.site-footer__social-link:hover` | Opacity 0.8 | `hover:opacity-80` | no - straightforward hover state |
| `.site-footer__social-link:focus-visible` | Outline 2px solid, offset 2px, border-radius 2px | `focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-purple800 focus-visible:outline-offset-2 focus-visible:rounded-sm` | no - straightforward focus styling |
| `.site-footer__nav` | Flex: 1 | `flex-1` | no - straightforward flex property |
| `.site-footer__nav .nav-list` | Flex, align-items center, gap `var(--space-4)`, flex-wrap | Already handled by `.nav-list` component class | yes - component-specific override, keep for specificity |
| `.site-footer__meta` | Padding-block `var(--space-4)`, color-mix color | `py-4 text-[color-mix(...)]` | yes - color-mix requires CSS |
| `.site-footer__meta .caption` | Color inherit | `text-inherit` | no - straightforward inheritance |
| `.site-footer__meta a` | Color inherit, underline, underline-offset 2px | `text-inherit underline underline-offset-2` | no - straightforward link styling |
| `.site-footer__meta a:hover` | Color `var(--brand-purple-800)` | `hover:text-brand-purple800` | no - straightforward hover state |

---

## Classification table (to fill after refactor)

| selector              | section group | properties in CSS (key ones)           | Tailwind covers all? (yes/partial/no) | keep reason (if partial/no)           |
|-----------------------|---------------|----------------------------------------|----------------------------------------|---------------------------------------|
| `.home-hero-section`  | hero          | display none/block responsive, margin-top | yes | - |
| `.home-hero-shell`    | hero          | flex column, gap, padding, min-height var, background var, shadow var | partial | CSS vars for min-height, background, shadow |
| `.home-hero-copy`     | hero          | flex column, gap, text-align, width | yes | - |
| `.home-hero-badge`    | hero          | inline-flex, sizing, color-mix bg, border, shadow | no | Not used in component, but keep for potential future use |
| `.home-hero-credit`   | hero          | margin-top, font-size, color | no | Not used in component, but keep for potential future use |
| `.review-strip-button .button-trapezoid` | review-strip | transparent bg, color, border, min-width, padding | partial | Component-specific override, keep for specificity |
| `.review-strip-button .button-trapezoid:hover` | review-strip | color-mix background | yes | Color-mix requires CSS |
| `.review-strip-artwork` | review-strip | min-width, responsive width | yes | - |
| `.review-strip-artwork > a` | review-strip | flex, align-items stretch (desktop) | yes | - |
| `.review-strip-artwork > a > div` | review-strip | width/height 100%, aspect-ratio (desktop) | yes | - |
| `.newsletter-section` | newsletter    | margin-top | yes | - |
| `.newsletter-shell`   | newsletter    | grid, gap, background var, border var, padding, shadow var | partial | CSS vars for colors/shadow |
| `.newsletter-form`    | newsletter    | flex, align-items center | yes | - |
| `.mission-columns-wrapper` | mission       | position relative | yes | - |
| `.mission-divider`    | mission       | width var, background color-mix, transform rotate var, hidden mobile | partial | Color-mix, CSS vars for transform, complex visual effect |
| `.site-footer`        | footer        | margin-top | yes | - |
| `.site-footer__bar`   | footer        | background, width, padding-block | yes | - |
| `.site-footer__inner` | footer        | flex, align-items, gap, flex-wrap | yes | - |
| `.site-footer__social` | footer        | flex, align-items, gap | yes | - |
| `.site-footer__social-link` | footer        | inline-flex, center, color, transition | yes | - |
| `.site-footer__social-link:hover` | footer        | opacity 0.8 | yes | - |
| `.site-footer__social-link:focus-visible` | footer        | outline, offset, border-radius | yes | - |
| `.site-footer__nav`   | footer        | flex: 1 | yes | - |
| `.site-footer__nav .nav-list` | footer        | flex, align-items, gap, flex-wrap | partial | Component-specific override, keep for specificity |
| `.site-footer__meta`  | footer        | padding-block, color-mix color | partial | Color-mix requires CSS |
| `.site-footer__meta .caption` | footer        | color inherit | yes | - |
| `.site-footer__meta a` | footer        | color inherit, underline, offset | yes | - |
| `.site-footer__meta a:hover` | footer        | color change | yes | - |

