# Tailwind Theme Implementation Notes

## Changes Made to `tailwind.config.ts`

### Colors
- **Reorganized brand colors** into nested structure (`brand.pink.100`, `brand.purple.600`, etc.)
- **Added convenience aliases** (`brand.pink`, `brand.purple`, `brand.dark-pink`)
- **Kept backwards compatibility** by retaining existing flat keys (`brand.pink100`, `brand.pink300`, etc.)
- **Added semantic color mappings**:
  - `surface` (with `DEFAULT`, `elevated`, `offwhite`, and frosted variants)
  - `text` (with `DEFAULT`, `strong`, `muted`, `deep-purple`)
  - `border` (with `DEFAULT`, `accent`, `accent-strong`, card borders, and outlines)
  - `newsletter` (with `surface` and `border`)
- **Kept existing `neutral.ui`** structure for backwards compatibility

### Spacing
- **Mapped spacing keys** (`1`, `2`, `3`, `4`, `6`, `8`, `10`, `12`, `16`) to corresponding CSS variables (`var(--space-1)`, etc.)
- Extended via `theme.extend.spacing` so Tailwind defaults remain available for unmapped values

### FontFamily
- **Confirmed existing mapping** is correct (`display` and `body` reference CSS variables)
- No changes needed

### FontSize + LineHeight
- **Added custom font sizes**:
  - `h1`, `h2`, `h3` (headings with clamp values, referencing CSS vars)
  - `body-lg`, `body`, `caption` (body text sizes)
- **Added lineHeight section** with `tight`, `snug`, `normal` mapped to CSS variables
- All font sizes include appropriate line heights in their definitions

### BorderRadius
- **Confirmed existing mapping** is correct (`sm`, `md`, `lg` reference CSS variables)
- No changes needed

### BoxShadow
- **Added card state variants**:
  - `card-rest` (maps to `var(--card-shadow-rest)`)
  - `card-hover` (maps to `var(--card-shadow-hover)`)
  - `card-focus` (maps to `var(--card-shadow-focus)`)
- Kept existing `soft` and `card` shadows

## Backwards Compatibility

All existing color keys have been retained to ensure backwards compatibility:
- `brand.pink100`, `brand.pink300`, `brand.pink500`, `brand.purple600`, `brand.purple800` remain available
- `neutral.ui.*` structure remains intact
- All changes are additive via `theme.extend`, so Tailwind defaults remain available

