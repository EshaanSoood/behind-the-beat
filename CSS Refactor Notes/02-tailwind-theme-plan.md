# Tailwind Theme Alignment Plan

## A. High-level Goals

The `tokens.css` file serves as the single source of truth for all design tokens in the Behind the Beat project. It defines colors, typography, spacing, border radii, shadows, and other design values as CSS custom properties.

The goal of this alignment is to configure Tailwind's `theme` to mirror these tokens, enabling utilities like `text-lg`, `space-y-8`, `shadow-soft`, `bg-brand-pink-100`, etc. to visually match the existing design system. This will allow developers to use Tailwind utilities while maintaining consistency with the established design tokens.

By mapping tokens to Tailwind's theme, we can:
- Use Tailwind utilities that match our design system
- Maintain `tokens.css` as the authoritative source
- Gradually migrate from custom CSS classes to Tailwind utilities where appropriate
- Ensure visual consistency across the codebase

---

## B. Proposed Tailwind Theme Mapping

### 1. Colors

**Current state in `tailwind.config.ts`:**
- Basic brand colors are already mapped (pink100, pink300, pink500, purple600, purple800)
- Some neutral colors are mapped under `neutral.ui`

**Proposed mapping:**

```typescript
colors: {
  brand: {
    pink: {
      100: "var(--brand-pink-100)", // #FFD3E8
      300: "var(--brand-pink-300)", // #FFB0DA
      500: "var(--brand-pink-500)", // #FF8CCB
    },
    purple: {
      600: "var(--brand-purple-600)", // #7A3A8C
      800: "var(--brand-purple-800)", // #6D2B79
    },
    // Convenience aliases
    pink: "var(--brand-pink)", // alias for pink-500
    purple: "var(--brand-purple)", // alias for purple-800
    "dark-pink": "var(--brand-dark-pink)", // alias for pink-500
  },
  surface: {
    DEFAULT: "var(--surface)",
    elevated: "var(--bg-elevated)",
    offwhite: "var(--offwhite)",
    // Frosted surfaces - keep as CSS vars for now (complex color-mix)
    "frost-pink-70": "var(--surface-frost-pink-70)",
    "frost-pink-85": "var(--surface-frost-pink-85)",
    "frost-purple-30": "var(--surface-frost-purple-30)",
    "frost-white-90": "var(--surface-frost-white-90)",
  },
  text: {
    DEFAULT: "var(--text)",
    strong: "var(--text-strong)",
    muted: "var(--text-muted)",
    "deep-purple": "var(--text-deep-purple)",
  },
  border: {
    DEFAULT: "var(--border)",
    accent: "var(--border-accent)",
    "accent-strong": "var(--border-accent-strong)",
    // Card borders
    "card-review": "var(--card-border-review)",
    "card-podcast": "var(--card-border-podcast)",
    // Outlines
    "pink-outline": "var(--pink-outline)",
    "purple-outline": "var(--purple-outline)",
  },
  newsletter: {
    surface: "var(--newsletter-surface)",
    border: "var(--newsletter-border)",
  },
  // Keep gradients as CSS vars (too complex for Tailwind)
  // --gradient-card-review
  // --gradient-card-podcast
  // --gradient-hero-title
  // --brand-gradient
}
```

**Notes:**
- Use nested structure (`brand.pink.100`) for better organization
- Keep complex `color-mix()` values as CSS variables (frosted surfaces, newsletter colors)
- Keep gradients as CSS variables (they use complex `color-mix()` and `linear-gradient()`)
- Map semantic color names (`text`, `border`, `surface`) for easier use

---

### 2. Spacing

**Current state:** Not mapped in Tailwind config

**Proposed mapping:**

```typescript
spacing: {
  // Map our custom spacing scale
  1: "var(--space-1)",   // 4px
  2: "var(--space-2)",   // 8px
  3: "var(--space-3)",   // 12px
  4: "var(--space-4)",   // 16px
  6: "var(--space-6)",   // 24px
  8: "var(--space-8)",   // 32px
  10: "var(--space-10)", // 40px
  12: "var(--space-12)", // 48px
  16: "var(--space-16)", // 64px
}
```

**Alignment check:**
- Our `--space-1` (4px) matches Tailwind's default `1` (4px) ✓
- Our `--space-2` (8px) matches Tailwind's default `2` (8px) ✓
- Our `--space-3` (12px) matches Tailwind's default `3` (12px) ✓
- Our `--space-4` (16px) matches Tailwind's default `4` (16px) ✓
- Our `--space-6` (24px) matches Tailwind's default `6` (24px) ✓
- Our `--space-8` (32px) matches Tailwind's default `8` (32px) ✓
- Our `--space-10` (40px) matches Tailwind's default `10` (40px) ✓
- Our `--space-12` (48px) matches Tailwind's default `12` (48px) ✓
- Our `--space-16` (64px) matches Tailwind's default `16` (64px) ✓

**Recommendation:** Since our values align perfectly with Tailwind defaults, we could either:
- Option A: Map to CSS vars (ensures single source of truth)
- Option B: Use Tailwind defaults and rely on CSS vars only in custom classes

**Proposed:** Option A (map to CSS vars) for consistency and single source of truth.

---

### 3. FontFamily

**Current state:** Already mapped correctly

**Proposed mapping (confirm existing):**

```typescript
fontFamily: {
  display: ["var(--font-display)"], // GrobeDeutschmeister + fallbacks
  body: ["var(--font-body)"],      // System fonts
}
```

**Note:** Current implementation is correct. The CSS vars already contain the full font stack, so we just reference them.

---

### 4. FontSize / LineHeight

**Current state:** Not mapped in Tailwind config

**Proposed mapping:**

```typescript
fontSize: {
  // Headings with clamp() - keep as CSS vars for now
  "h1": ["var(--text-h1)", { lineHeight: "var(--lh-tight)" }],
  "h2": ["var(--text-h2)", { lineHeight: "var(--lh-tight)" }],
  "h3": ["var(--text-h3)", { lineHeight: "var(--lh-snug)" }],
  
  // Body text - can use direct values or CSS vars
  "body-lg": ["var(--text-body-lg)", { lineHeight: "var(--lh-normal)" }], // 1.125rem
  "body": ["var(--text-body)", { lineHeight: "var(--lh-normal)" }],      // 1rem
  "caption": ["var(--text-caption)", { lineHeight: "var(--lh-normal)" }], // 0.875rem
}

// Also map line heights separately for flexibility
lineHeight: {
  tight: "var(--lh-tight)",   // 1.2
  snug: "var(--lh-snug)",     // 1.3
  normal: "var(--lh-normal)",  // 1.5
}
```

**Alternative approach (encode clamp values directly):**

```typescript
fontSize: {
  "h1": [
    "clamp(2rem, 2vw + 1.2rem, 2.75rem)",
    { lineHeight: "1.2" }
  ],
  "h2": [
    "clamp(1.5rem, 1.4vw + 1rem, 2rem)",
    { lineHeight: "1.2" }
  ],
  "h3": [
    "clamp(1.25rem, 1vw + 0.9rem, 1.5rem)",
    { lineHeight: "1.3" }
  ],
  "body-lg": ["1.125rem", { lineHeight: "1.5" }],
  "body": ["1rem", { lineHeight: "1.5" }],
  "caption": ["0.875rem", { lineHeight: "1.5" }],
}
```

**Recommendation:** Use CSS vars approach (first option) to maintain single source of truth. The clamp values are defined in `tokens.css`, so referencing them keeps everything centralized.

---

### 5. BorderRadius

**Current state:** Already mapped correctly

**Proposed mapping (confirm existing):**

```typescript
borderRadius: {
  sm: "var(--radius-sm)", // 10px
  md: "var(--radius-md)", // 16px
  lg: "var(--radius-lg)", // 20px
}
```

**Note:** Current implementation is correct. However, note that many components use `clip-path` for chamfered corners instead of border-radius, so these values are used sparingly.

---

### 6. BoxShadow

**Current state:** Partially mapped (`soft` and `card`)

**Proposed mapping:**

```typescript
boxShadow: {
  soft: "var(--shadow-soft)",
  card: "var(--shadow-card)",
  "card-rest": "var(--card-shadow-rest)",
  "card-hover": "var(--card-shadow-hover)",
  "card-focus": "var(--card-shadow-focus)",
}
```

**Note:** All shadows use `color-mix()` with purple tints, so they're best kept as CSS variables. The current mapping is good, we just need to add the card state variants.

---

## C. Recommendations / Open Questions

### Things to Implement Immediately in `tailwind.config.ts`

1. **Colors:**
   - Reorganize brand colors into nested structure (`brand.pink.100` instead of `brand.pink100`)
   - Add semantic color mappings (`text`, `border`, `surface`)
   - Add newsletter colors
   - Add card border colors

2. **Spacing:**
   - Map all spacing values (`1` through `16`) to CSS variables

3. **FontSize:**
   - Add heading sizes (`h1`, `h2`, `h3`) referencing CSS vars
   - Add body text sizes (`body-lg`, `body`, `caption`)
   - Map line heights separately

4. **BoxShadow:**
   - Add card state variants (`card-rest`, `card-hover`, `card-focus`)

### Things We Should Leave as CSS Variables for Now

1. **Complex color-mix values:**
   - `--surface-frost-pink-70`, `--surface-frost-pink-85`, etc.
   - `--newsletter-surface`, `--newsletter-border`
   - `--border-accent`, `--border-accent-strong` (though we can reference them in Tailwind)

2. **Gradients:**
   - `--gradient-card-review`
   - `--gradient-card-podcast`
   - `--gradient-hero-title`
   - `--brand-gradient`
   
   These use complex `linear-gradient()` with `color-mix()` and are better suited for CSS classes or inline styles.

3. **Layout-specific values:**
   - `--gutter-horizontal` (clamp value)
   - `--home-grid-gap`, `--home-card-padding`, `--home-card-gap`
   - `--hero-min-height` (clamp value)
   - `--ch` (chamfer size)
   - `--nav-stripe`, `--divider-thickness`
   - `--slant-base`, `--slant-1`, `--slant-2`, `--slant-3`
   - `--paper-grain-opacity`
   - `--measure` (typography measure)

   These are component-specific and don't map well to Tailwind's utility system.

4. **Border widths:**
   - `--border-strong-width` (1.5px) - non-standard value, better as CSS var

### Open Questions / Ambiguous Mappings

1. **Spacing strategy:**
   - Should we map spacing to CSS vars (ensuring single source of truth) or rely on Tailwind defaults since they match?
   - **Recommendation:** Map to CSS vars for consistency, even though values match.

2. **FontSize with clamp():**
   - Should we encode clamp values directly in Tailwind config or reference CSS vars?
   - **Recommendation:** Reference CSS vars to maintain single source of truth.

3. **Color organization:**
   - Should we flatten some color paths (e.g., `text-muted` vs `text.muted`)?
   - **Recommendation:** Use nested structure (`text.muted`) for consistency with Tailwind conventions, but consider flat aliases for common use cases.

4. **Missing Tailwind defaults:**
   - We're only mapping specific spacing values. Should we keep Tailwind's default spacing scale for values we don't define (like `5`, `7`, `9`, `11`, etc.)?
   - **Recommendation:** Keep Tailwind defaults for unmapped values, but document which values should be used from our design system.

5. **Line height mapping:**
   - Should line heights be part of `fontSize` entries or separate `lineHeight` theme entries?
   - **Recommendation:** Both - include in `fontSize` for convenience, but also map separately for flexibility.

6. **Border radius usage:**
   - Most components use `clip-path` for chamfered corners. Are the border radius values actually used?
   - **Recommendation:** Keep them mapped since they exist in tokens, but note that chamfered corners use `clip-path` instead.

---

## Next Steps

1. Review this plan and confirm approach
2. Implement mappings in `tailwind.config.ts` (in next step)
3. Test utilities to ensure they match existing design
4. Gradually migrate components to use Tailwind utilities where appropriate
5. Document which utilities are available and their usage patterns

