# Site header CSS → Tailwind refactor plan + prune

## Context

- Header currently relies on `.site-header*` + `.nav-*` classes defined in `globals.css`.
- Tailwind theme mirrors design tokens, so layout/spacing/typography can be expressed as utilities.
- Complex decorative bits (electric border, gradients, clip-path, nth-child angle tricks, etc.) should remain in CSS.

## Relevant header selectors

| selector              | role / description                          | used? (yes/no) | primary file(s) using it            |
|-----------------------|---------------------------------------------|----------------|-------------------------------------|
| `.site-header` | Main header container | yes | components/Header.tsx |
| `.site-header::before` | Full-width background pseudo-element | yes | components/Header.tsx |
| `.site-header__layout` | Flex layout wrapper | yes | components/Header.tsx |
| `.site-header__cluster` | Brand + nav cluster wrapper | yes | components/Header.tsx |
| `.site-header__brand` | Brand/logo link | yes | components/Header.tsx |
| `.site-header__brand::after` | Chamfered background pseudo-element | yes | components/Header.tsx |
| `.site-header__brand-mark` | Logo image wrapper | yes | components/Header.tsx |
| `.site-header__logo-wordmark` | Logo wordmark text | no | (not used) |
| `.site-header__nav` | Desktop navigation panel | yes | components/Header.tsx |
| `.site-header__nav-divider` | Angled divider stripe | yes | components/Header.tsx |
| `.site-header__mobile` | Mobile menu wrapper | yes | components/Header.tsx |
| `.site-header__mobile-trigger` | Mobile menu button | yes | components/Header.tsx |
| `.site-header__mobile-trigger svg` | Mobile menu icon | yes | components/Header.tsx |
| `.site-header__mobile-panel` | Mobile menu dropdown | yes | components/Header.tsx |
| `.site-header__mobile-panel[data-open="true"]` | Mobile menu open state | yes | components/Header.tsx |
| `.site-header__mobile-panel a` | Mobile menu links | yes | components/Header.tsx |
| `.nav-list` | Navigation list base | yes | components/Header.tsx, components/Footer.tsx |
| `.nav-link` | Navigation link base | yes | components/Header.tsx, components/Footer.tsx |
| `.nav-link:hover` | Nav link hover state | yes | components/Header.tsx, components/Footer.tsx |
| `.nav-link::before` | Nav link angled divider | yes | components/Header.tsx, components/Footer.tsx |
| `.nav-link.nav-angle-1::before` | Nav link angle variant 1 | yes | components/Header.tsx |
| `.nav-link.nav-angle-2::before` | Nav link angle variant 2 | yes | components/Header.tsx |
| `.nav-link:first-child::before` | Hide divider on first link | yes | components/Header.tsx, components/Footer.tsx |
| `.nav-link.is-active::after` | Active link underline | yes | components/Header.tsx, components/Footer.tsx |
| `.nav-link[aria-current="page"]::after` | Current page underline | yes | components/Header.tsx, components/Footer.tsx |
| `.nav-list--wrap` | Nav list wrap modifier | yes | components/Header.tsx |
| `.nav-link--footer` | Footer nav link variant | yes | components/Footer.tsx |
| `.site-header__nav .nav-list` | Header nav list override | yes | components/Header.tsx |
| `.site-header__nav .nav-link::before` | Hide nav link divider in header | yes | components/Header.tsx |
| `.site-header__nav .nav-list > li` | Header nav list item | yes | components/Header.tsx |
| `.site-header__nav .nav-list > li::after` | Header nav divider between items | yes | components/Header.tsx |
| `.site-header__nav .nav-list > li:last-child::after` | Hide divider on last item | yes | components/Header.tsx |
| `.site-header__nav .nav-list > li:nth-child(4n + 1)` | Header nav divider angle variant 1 | yes | components/Header.tsx |
| `.site-header__nav .nav-list > li:nth-child(4n + 2)` | Header nav divider angle variant 2 | yes | components/Header.tsx |
| `.site-header__nav .nav-list > li:nth-child(4n + 3)` | Header nav divider angle variant 3 | yes | components/Header.tsx |
| `.site-header__nav .nav-list > li:nth-child(4n + 4)` | Header nav divider angle variant 4 | yes | components/Header.tsx |
| `.site-header__mobile-panel .nav-link::before` | Hide nav link divider in mobile panel | yes | components/Header.tsx |

## Mapping to Tailwind utilities (planning)

| selector          | current behavior (CSS summary)                          | proposed Tailwind classes (approx)                            | keep CSS for? (yes/no + why) |
|-------------------|----------------------------------------------------------|---------------------------------------------------------------|------------------------------|
| `.site-header` | `relative w-full max-w-[1200px] mx-auto mt-3 px-4 py-3 text-brand-purple-800` | `relative w-full max-w-[1200px] mx-auto mt-3 px-4 py-3 text-brand-purple-800` | yes - `::before` pseudo-element for full-width background |
| `.site-header::before` | Full-width background with border | (none - keep CSS) | yes - complex pseudo-element positioning |
| `.site-header__layout` | `flex items-center justify-between gap-4` | `flex items-center justify-between gap-4` | no - simple flex layout |
| `.site-header__cluster` | `flex items-stretch gap-0 min-w-0` | `flex items-stretch gap-0 min-w-0` | no - simple flex layout |
| `.site-header__brand` | `relative flex items-center gap-3 no-underline text-inherit py-2` | `relative flex items-center gap-3 no-underline text-inherit py-2` | yes - `::after` pseudo-element for chamfered background |
| `.site-header__brand::after` | Chamfered background with clip-path | (none - keep CSS) | yes - complex clip-path and color-mix |
| `.site-header__brand-mark` | `inline-flex items-center justify-center w-[clamp(120px,10vw,176px)]` | `inline-flex items-center justify-center w-[clamp(120px,10vw,176px)]` | no - simple flex + clamp width |
| `.site-header__logo-wordmark` | (not used) | (none) | N/A |
| `.site-header__nav` | `relative hidden md:flex items-center py-2 px-[calc(var(--space-6)+var(--nav-stripe))] -ml-0.5 mt-0 mb-0 self-stretch z-[1] bg-[color-mix(...)] border-[color-mix(...)] clip-path-[...] shadow-soft` | `relative hidden md:flex items-center py-2 px-[calc(var(--space-6)+var(--nav-stripe))] -ml-0.5 self-stretch z-[1] shadow-soft` | yes - complex background color-mix, border color-mix, clip-path |
| `.site-header__nav-divider` | `absolute left-0 top-0 bottom-0 w-[var(--nav-stripe)] bg-gradient-[...] clip-path-[...] pointer-events-none` | (none - keep CSS) | yes - complex gradient and clip-path |
| `.site-header__mobile` | `flex items-center ml-auto relative` | `flex items-center ml-auto relative` | no - simple flex layout |
| `.site-header__mobile-trigger` | `inline-flex items-center justify-center w-11 h-11 border-none bg-[color-mix(...)] text-brand-purple-800 shadow-soft` | `inline-flex items-center justify-center w-11 h-11 border-none text-brand-purple-800 shadow-soft` | yes - complex background color-mix |
| `.site-header__mobile-trigger svg` | `w-[22px] h-[22px]` | `w-[22px] h-[22px]` | no - simple size |
| `.site-header__mobile-panel` | `absolute top-[calc(100%+var(--space-2))] right-0 w-[min(320px,90vw)] bg-surface border border-accent-strong shadow-card p-4 hidden flex-col gap-3 z-20` | `absolute top-[calc(100%+var(--space-2))] right-0 w-[min(320px,90vw)] bg-surface border border-accent-strong shadow-card p-4 hidden flex-col gap-3 z-20` | no - simple layout/spacing |
| `.site-header__mobile-panel[data-open="true"]` | `flex` | `data-[open=true]:flex` | no - simple conditional display |
| `.site-header__mobile-panel a` | `font-display uppercase tracking-[0.08em] text-brand-purple-800` | `font-display uppercase tracking-[0.08em] text-brand-purple-800` | no - simple typography |
| `.nav-list` | `flex items-center gap-6 font-display uppercase tracking-[0.12em] text-[0.95rem]` | `flex items-center gap-6 font-display uppercase tracking-[0.12em] text-[0.95rem]` | no - simple flex + typography |
| `.nav-link` | `relative inline-flex items-center px-3 py-2 text-brand-purple-800 transition-colors duration-150 ease-in-out` | `relative inline-flex items-center px-3 py-2 text-brand-purple-800 transition-colors duration-150 ease-in-out` | yes - `::before` pseudo-element for angled divider |
| `.nav-link:hover` | `text-brand-purple-600` | `hover:text-brand-purple-600` | no - simple color change |
| `.nav-link::before` | Angled divider pseudo-element | (none - keep CSS) | yes - complex transform and color-mix |
| `.nav-link.nav-angle-1::before` | Angle variant 1 | (none - keep CSS) | yes - complex transform |
| `.nav-link.nav-angle-2::before` | Angle variant 2 | (none - keep CSS) | yes - complex transform |
| `.nav-link:first-child::before` | Hide divider | (none - keep CSS) | yes - pseudo-element control |
| `.nav-link.is-active::after` | Active underline with clip-path | (none - keep CSS) | yes - complex clip-path and color-mix |
| `.nav-link[aria-current="page"]::after` | Current page underline | (none - keep CSS) | yes - complex clip-path and color-mix |
| `.nav-list--wrap` | `flex-wrap gap-y-3` | `flex-wrap gap-y-3` | no - simple flex wrap |
| `.nav-link--footer` | Footer variant color | `text-brand-purple-800` | yes - `::before` and `::after` pseudo-elements |
| `.site-header__nav .nav-list` | `justify-center gap-[1.5rem]` | `justify-center gap-[1.5rem]` | no - simple flex alignment |
| `.site-header__nav .nav-link::before` | `hidden` | (none - keep CSS) | yes - pseudo-element control |
| `.site-header__nav .nav-list > li` | `relative` with CSS variable | `relative` | yes - CSS variable for divider angle |
| `.site-header__nav .nav-list > li::after` | Angled divider between nav items | (none - keep CSS) | yes - complex transform and color-mix |
| `.site-header__nav .nav-list > li:last-child::after` | Hide divider | (none - keep CSS) | yes - pseudo-element control |
| `.site-header__nav .nav-list > li:nth-child(4n + 1)` | Angle variant 1 | (none - keep CSS) | yes - CSS variable assignment |
| `.site-header__nav .nav-list > li:nth-child(4n + 2)` | Angle variant 2 | (none - keep CSS) | yes - CSS variable assignment |
| `.site-header__nav .nav-list > li:nth-child(4n + 3)` | Angle variant 3 | (none - keep CSS) | yes - CSS variable assignment |
| `.site-header__nav .nav-list > li:nth-child(4n + 4)` | Angle variant 4 | (none - keep CSS) | yes - CSS variable assignment |
| `.site-header__mobile-panel .nav-link::before` | `hidden` | (none - keep CSS) | yes - pseudo-element control |

## Classification table for pruning

| selector              | properties in CSS (key ones)           | Tailwind covers all? (yes/partial/no) | keep reason (if partial/no)           |
|-----------------------|----------------------------------------|----------------------------------------|---------------------------------------|
| `.site-header` | `position: relative; width: 100%; max-width: 1200px; margin: var(--space-3) auto 0; padding-inline: var(--space-4); padding-block: var(--space-3); color: var(--brand-purple-800);` | partial | `::before` pseudo-element for full-width background |
| `.site-header::before` | Full-width background pseudo-element | no | Complex pseudo-element positioning |
| `.site-header__layout` | `display: flex; align-items: center; justify-content: space-between; gap: var(--space-4);` | yes | REMOVED - fully covered by Tailwind |
| `.site-header__cluster` | `display: flex; align-items: stretch; gap: 0; min-width: 0;` | yes | REMOVED - fully covered by Tailwind |
| `.site-header__brand` | `position: relative; display: flex; align-items: center; gap: var(--space-3); text-decoration: none; color: inherit; padding: var(--space-2) 0;` | partial | `::after` pseudo-element for chamfered background |
| `.site-header__brand::after` | Chamfered background with clip-path | no | Complex clip-path and color-mix |
| `.site-header__brand-mark` | `display: inline-flex; align-items: center; justify-content: center; width: clamp(120px, 10vw, 176px);` | yes | REMOVED - fully covered by Tailwind |
| `.site-header__nav` | `position: relative; display: none; align-items: center; padding-block: var(--space-2); padding-inline: calc(var(--space-6) + var(--nav-stripe)); margin-left: -0.125rem; align-self: stretch; z-index: 1; background: color-mix(...); border: 1px solid color-mix(...); clip-path: polygon(...); box-shadow: var(--shadow-soft);` | partial | Complex background color-mix, border color-mix, clip-path |
| `.site-header__nav-divider` | `position: absolute; left: 0; top: 0; bottom: 0; width: var(--nav-stripe); background: linear-gradient(...); clip-path: polygon(...); pointer-events: none;` | no | Complex gradient and clip-path |
| `.site-header__mobile` | `display: flex; align-items: center; margin-left: auto; position: relative;` | yes | REMOVED - fully covered by Tailwind |
| `.site-header__mobile-trigger` | `display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border: none; background: color-mix(...); color: var(--brand-purple-800); box-shadow: var(--shadow-soft);` | partial | Complex background color-mix |
| `.site-header__mobile-trigger svg` | `width: 22px; height: 22px;` | yes | REMOVED - fully covered by Tailwind |
| `.site-header__mobile-panel` | `position: absolute; top: calc(100% + var(--space-2)); right: 0; width: min(320px, 90vw); background: var(--surface); border: 1px solid var(--border-accent-strong); box-shadow: var(--shadow-card); padding: var(--space-4); display: none; flex-direction: column; gap: var(--space-3); z-index: 20;` | yes | REMOVED - fully covered by Tailwind |
| `.site-header__mobile-panel[data-open="true"]` | `display: flex;` | yes | REMOVED - fully covered by Tailwind |
| `.site-header__mobile-panel a` | `font-family: var(--font-display); text-transform: uppercase; letter-spacing: 0.08em; color: var(--brand-purple-800);` | yes | REMOVED - fully covered by Tailwind |
| `.nav-list` | `display: flex; align-items: center; gap: 1.5rem; font-family: var(--font-display); text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.95rem;` | partial | Used in Footer.tsx - keep for now |
| `.nav-link` | `position: relative; display: inline-flex; align-items: center; padding: 0.5rem 0.75rem; color: var(--brand-purple-800); transition: color 150ms ease;` | partial | `::before` pseudo-element for angled divider |
| `.nav-link:hover` | `color: var(--brand-purple-600);` | partial | Used in Footer.tsx - keep for now |
| `.nav-link::before` | Angled divider pseudo-element | no | Complex transform and color-mix |
| `.nav-link.nav-angle-1::before` | Angle variant 1 | no | Complex transform |
| `.nav-link.nav-angle-2::before` | Angle variant 2 | no | Complex transform |
| `.nav-link:first-child::before` | `display: none;` | no | Pseudo-element control |
| `.nav-link.is-active::after` | Active underline with clip-path | no | Complex clip-path and color-mix |
| `.nav-link[aria-current="page"]::after` | Current page underline | no | Complex clip-path and color-mix |
| `.nav-list--wrap` | `flex-wrap: wrap; row-gap: 0.75rem;` | partial | Used in Header mobile panel - keep for now |
| `.nav-link--footer` | Footer variant color | partial | `::before` and `::after` pseudo-elements |
| `.site-header__nav .nav-list` | `gap: var(--nav-divider-gap); justify-content: center;` | yes | REMOVED - fully covered by Tailwind |
| `.site-header__nav .nav-link::before` | `display: none;` | no | Pseudo-element control |
| `.site-header__nav .nav-list > li` | `position: relative; --nav-divider-angle: -10deg;` | partial | CSS variable assignment |
| `.site-header__nav .nav-list > li::after` | Angled divider between nav items | no | Complex transform and color-mix |
| `.site-header__nav .nav-list > li:last-child::after` | `display: none;` | no | Pseudo-element control |
| `.site-header__nav .nav-list > li:nth-child(4n + 1)` | `--nav-divider-angle: -8deg;` | no | CSS variable assignment |
| `.site-header__nav .nav-list > li:nth-child(4n + 2)` | `--nav-divider-angle: -12deg;` | no | CSS variable assignment |
| `.site-header__nav .nav-list > li:nth-child(4n + 3)` | `--nav-divider-angle: -17deg;` | no | CSS variable assignment |
| `.site-header__nav .nav-list > li:nth-child(4n + 4)` | `--nav-divider-angle: -22deg;` | no | CSS variable assignment |
| `.site-header__mobile-panel .nav-link::before` | `display: none;` | no | Pseudo-element control |

