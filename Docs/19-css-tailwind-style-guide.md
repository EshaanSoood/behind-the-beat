# CSS & Tailwind Style Guide

## 1. Overview

- **Tailwind + design tokens** (`tokens.css`) are the **primary** way to style UI in this repo. Tailwind's theme is wired to CSS variables from `tokens.css`, providing a consistent, token-backed styling system.

- **`globals.css`** is a **small, intentional layer** containing only:
  - Base element/typography styles (`@layer base`) for semantic HTML defaults.
  - A handful of custom utilities (`@layer utilities`) for reusable patterns that are awkward or noisy in Tailwind.
  - Art-directed component styles (`@layer components`) for complex visual patterns like clip-paths, gradients, nth-child tricks, electric borders, review image floats, etc.

- **New styling work** should start in components with Tailwind utilities. Global CSS is the exception, not the default. Only promote patterns to global CSS when they meet specific criteria (see sections 2.2 and 2.3).

- **Any non-trivial styling refactor** should be documented under `/CSS Refactor Notes` following the established pattern: audit → migrate → prune → document.

- The design system is **token-first**: all colors, spacing, typography, shadows, and radii come from `tokens.css`, ensuring consistency and maintainability.

## 2. Styling Guidelines

### 2.1 Default: Tailwind + tokens in components

For new components and sections:

- **Use Tailwind utilities directly** in `className` for:
  - Layout: `flex`, `grid`, `gap-*`, `space-y-*`, `space-x-*`
  - Spacing: `p-*`, `m-*`, `px-*`, `py-*`, etc.
  - Typography: `text-*`, `font-*`, `leading-*`, `tracking-*`
  - Colors: `text-brand-purple-800`, `bg-brand-pink-100`, `border-accent-strong`
  - Shadows: `shadow-soft`, `shadow-card`, `shadow-card-hover`
  - Border radius: `rounded-sm`, `rounded-md`, `rounded-lg` (when needed, though chamfered corners are preferred)

- **Use Tailwind's theme tokens** that are backed by CSS variables from `tokens.css`:
  - Colors: `brand-pink-*`, `brand-purple-*`, `surface-*`, `text-*`, `border-*`
  - Spacing: `space-1` through `space-16` (maps to `--space-*`)
  - Typography: `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-caption`
  - Line heights: `leading-tight`, `leading-snug`, `leading-normal`
  - Shadows: `shadow-soft`, `shadow-card`, etc.

- **Arbitrary Tailwind values are acceptable** when necessary to match design tokens exactly:
  - `text-[clamp(2rem,2vw+1.2rem,2.75rem)]` for token-based fluid font sizes
  - `max-w-[70ch]` to match the `--measure` token
  - `bg-[color-mix(in_oklab,var(--brand-pink-100)_40%,transparent)]` to mirror complex surface tokens
  - `border-[var(--card-border-review)]` for card-specific borders

- **Prefer composition** over single-purpose classes. Combine Tailwind utilities to build up visual patterns rather than creating custom classes for each variation.

**Emphasis**: "Tailwind-first, token-backed" is the default approach. Start with Tailwind utilities, and only add global CSS when the pattern meets the criteria below.

### 2.2 When to add to `@layer utilities` in globals.css

Only add a new utility class when:

- The same visual pattern is needed in **3+ places**, AND
- It's awkward, noisy, or unreadable as raw Tailwind in components.

**Good candidates for utilities:**

- **Complex focus states**: `focus-chamfer`-style patterns with clip-path polygons and multiple pseudo-elements
- **Shared overlays/texture helpers**: `paper-grain` for consistent texture application
- **Specialized surface helpers**: `surface-frost-*`, `surface-chamfer` for chamfered corners with clip-path
- **Shape helpers**: `button-trapezoid` that define geometry more than layout
- **Layout containers**: `container-page`, `prose-measure` for consistent content width constraints

**Naming conventions:**

- Use `kebab-case`
- Make names semantic, not page-specific (`.surface-*`, `.focus-*`, `.layout-*`)
- Avoid component-specific names (prefer `.surface-chamfer` over `.home-card-chamfer`)

**Utilities should be:**

- **Small and composable**, not full component skins
- **Reusable** across multiple components or pages
- **Focused** on a single visual concern (shape, texture, focus state, etc.)

### 2.3 When to add to `@layer components` in globals.css

Use component-level global CSS only for **art-directed primitives** that are:

- **Complex visual patterns** that are difficult or impossible to express cleanly in Tailwind:
  - Electric borders with conic gradients and animations
  - Chamfer shapes / clip-path polygons with multiple points
  - Gradient hero shells and complex color-mix surfaces
  - nth-child art direction (angled dividers, nav stripes, etc.)
  - Portable text image floats and rich text layout that is easier in CSS

- **Design-system-level patterns** that are clearly reusable and not page-specific

**Component class guidelines:**

- These classes should be referenced by **named components** (`<SiteHeader>`, `<HomeHero>`, `<ReviewStrip>`, `<MissionSection>`, `<SiteFooter>`, `<ElectricBorder>`, etc.), not sprinkled arbitrarily
- Component classes can include variants (`.home-card--review`, `.home-card--podcast`) but should remain focused on visual patterns, not layout
- New page-specific layouts should still be built Tailwind-first; only promote something into `@layer components` if it's clearly reusable and design-system-level

**Examples of current component classes:**

- `site-header-*`, `nav-*`: Navigation with angled dividers and mobile panel
- `home-card-*`: Card styling with chamfered corners, overlays, and interaction states
- `home-hero-*`: Hero section with badge and credit styling
- `review-strip-*`: Review strip button variants
- `newsletter-*`: Newsletter shell styling
- `mission-*`: Mission divider with slant angles
- `site-footer-*`: Footer navigation and metadata
- `electric-border-*`: Animated border component
- `review-image-*`: Image sizing and float utilities for portable text
- `portable-text-content`: Float clearing for rich text

## 3. Working with Existing Globals & Tokens

### Core Utilities

The current utility layer (`@layer utilities`) includes:

- **Layout**: `container-page`, `prose-measure`
- **Focus states**: `focus-chamfer`
- **Typography**: `caption`
- **Textures**: `paper-grain`
- **Surfaces**: `surface-frost-pink-70`, `surface-chamfer`
- **Text truncation**: `line-clamp-2`, `line-clamp-3`
- **Shapes**: `button-trapezoid`

### Core Component Classes

The current component layer (`@layer components`) includes:

- **Navigation**: `site-header-*`, `nav-*`, `nav-link-*`
- **Home page**: `home-hero-*`, `home-feed-section`, `home-section-heading`, `home-card-grid`, `home-card-*`
- **Content**: `review-strip-*`, `review-header`, `podcast-header`, `tracklist-panel`, `streaming-button-*`
- **Newsletter**: `newsletter-shell`
- **Mission**: `mission-divider`
- **Footer**: `site-footer-*`
- **Special**: `special-h1-*`, `entry-column-*`, `entry-header-*`
- **Effects**: `electric-border-*`
- **Rich text**: `review-image-*`, `portable-text-content`

### Design Tokens

All design tokens are defined in `tokens.css` and wired to Tailwind's theme. Categories include:

- **Colors**: Brand palette (`brand-pink-*`, `brand-purple-*`), surfaces, text colors, borders
- **Typography**: Font families, font sizes (fluid and fixed), line heights, measure
- **Spacing**: `space-1` through `space-16` (4px base scale)
- **Shadows**: `shadow-soft`, `shadow-card`, card interaction shadows
- **Layout**: Chamfer size (`--ch`), nav stripe width, slant angles, divider thickness
- **Component-specific**: Home card gaps/padding, newsletter surfaces/borders, hero min-height

**For full inventories**, see:
- `16-global-usage-audit-v2.md` for all global CSS classes and their usage
- `18-tokens-usage-audit.md` for all design tokens and their usage

### Reusing Existing Patterns

- **Reuse these classes** when you want the same visual treatment as existing sections
- **Don't change or delete them casually**; any refactor should follow the established pattern:
  1. Audit usage (`16-global-usage-audit-v2.md` or `18-tokens-usage-audit.md`)
  2. Migrate to Tailwind where appropriate
  3. Prune unused code
  4. Document the changes in `/CSS Refactor Notes`

## 4. How to Deprecate a Global Class or Token Safely

### For a Global Class (in `globals.css`)

1. **Search for all usages** of the class name in the codebase:
   ```bash
   grep -r "class-name" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js"
   ```

2. **Add Tailwind utilities** to those components so the visual behavior is fully covered (layout, spacing, typography, colors, shadows, etc.). Test visually to ensure parity.

3. **Write a short note** in `/CSS Refactor Notes` documenting:
   - The class name
   - The Tailwind equivalents you used
   - The files you touched
   - Any visual differences or considerations

4. **Classify the CSS rule** as:
   - `Tailwind covers all? yes` — Fully replaceable
   - `Tailwind covers all? partial` — Some aspects need custom CSS
   - `Tailwind covers all? no` — Keep in global CSS

5. **Only delete the rule** once:
   - All usages have been migrated
   - The component has been visually verified in the app
   - The migration is documented

6. **Optional**: Keep the class in JSX with an empty CSS rule for one release cycle as a no-op, then remove it entirely later. This provides a safety net if something was missed.

### For a Token (in `tokens.css`)

1. **Update `18-tokens-usage-audit.md`** if usage has changed or you're considering removal.

2. **Ensure the token is not referenced** in:
   - `globals.css` (search for `var(--token-name)`)
   - `tailwind.config.ts` (search for the token name)
   - Any TS/JS/TSX/JSX/MDX files (search for `--token-name` or `var(--token-name)`)
   - Any other token's value in `tokens.css` (search for the token name in value expressions)

3. **Consider context**:
   - If it's part of an intentionally symmetric scale (e.g., `brand-pink-100/300/500`), keep it even if unused for consistency
   - If it's a one-off token with no references, it's safe to remove

4. **If truly unused**, remove it and log the removal in a notes file (e.g., `18-tokens-cleanup-notes.md`).

5. **Update the audit file** to reflect the removal.

## 5. "Do & Don't" Quick Reference

### ✅ Do

- **Style new components** with Tailwind utilities backed by design tokens
- **Reuse existing global utilities and component classes** when you want consistent visuals (hero, cards, nav, etc.)
- **Document non-trivial styling refactors** in `/CSS Refactor Notes` following the established pattern
- **Use arbitrary Tailwind values** when necessary to match design tokens exactly
- **Compose Tailwind utilities** to build visual patterns rather than creating custom classes
- **Audit before removing** any global class or token

### ❌ Don't

- **Add new ad-hoc classes** to `globals.css` for a single component
- **Re-implement Tailwind utilities** as CSS unless there is a specific, documented reason
- **Delete or rename tokens or global classes** without doing the audit/migration/visual-check cycle
- **Create page-specific classes** in `@layer components`; use Tailwind in components instead
- **Use raw pixel or hex values** when a design token exists
- **Skip documentation** for non-trivial styling changes

## Additional Resources

- **Token audit**: `CSS Refactor Notes/18-tokens-usage-audit.md`
- **Global class audit**: `CSS Refactor Notes/16-global-usage-audit-v2.md`
- **Previous refactor notes**: See other files in `/CSS Refactor Notes` for examples of the audit → migrate → prune → document pattern

