# Behind The Beat — Design System

## Overview

This design system implements a cohesive, accessible visual language for Behind The Beat. It establishes clear rules for colors, typography, spacing, components, and interactions that work across all devices and contexts.

---

## 1. Color System (By Job, Not Token)

Each color has a single, consistent **role** across the entire site. Never swap roles between colors.

### Color Roles

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Page Paper** (Background) | Warm off-white | `#FAF8F5` | Overall page canvas, large content areas |
| **Panels & Cards** (Surfaces) | Blush ivory | `#F9F4FA` | Cards, rows, framed blocks |
| **Primary Text & Strong Accents** | Deep mute purple | `#654F84` | Headings, buttons, nav text, emphasis |
| **Secondary Text & Quiet Lines** | Lighter purple | `#A295B5` | Metadata, bylines, subdued UI details |
| **Trim & Subtle Highlights** | Gentle light pink | `#E8C3D6` | Borders, chamfer accents, hover flips |
| **Emphasis Pink** (Punch color) | Darker richer pink | `#CC6AA7` | Emphasis text, stronger borders, badges |
| **Supporting Accent** (Editorial purple) | Editorial accent purple | `#6E4B8E` | Feature boxes, alternate headings |

### CSS Variables

```css
:root {
  --color-page: #FAF8F5;
  --color-panel: #F9F4FA;
  --color-primary: #654F84;
  --color-secondary: #A295B5;
  --color-trim: #E8C3D6;
  --color-emphasis: #CC6AA7;
  --color-accent: #6E4B8E;
}
```

### Usage Rules

- Use **Primary** for all body text and CTAs
- Use **Secondary** for metadata and disabled states
- Use **Trim** for borders, dividers, and focus rings
- Use **Emphasis** only for high-priority interactions
- Never invert colors just to fill space
- Test all color combinations against WCAG contrast requirements

---

## 2. Typography

### Font Families

- **Display Font** (Headings, Nav): `Grobe Deutschmeister` → `Bebas Neue` (fallback)
- **Body Font** (Text, UI): `Helvetica` → `Arial` → system sans-serif

### Type Scale

| Element | Size | Line Height | Weight | Usage |
|---------|------|------------|--------|-------|
| **H1** | clamp(2rem, 6vw, 3rem) | 1.1 | 700 | Page titles, hero headlines |
| **H2** | clamp(1.5rem, 4vw, 2.25rem) | 1.2 | 700 | Section headings |
| **Body** | 1rem | 1.6 | 400 | Paragraphs, standard text |
| **Small** | 0.9rem | 1.5 | 400 | Metadata, captions, labels |
| **Meta** | 0.85rem | 1.4 | 500 | Bylines, dates, tags |

### Reading Measures

- **Long-form content**: 60–70 characters per line
- **Card/excerpt copy**: 45–60 characters per line
- **UI labels**: No limit (keep concise naturally)

### Contrast Practice

- Always use **Primary** (#654F84) on **Page** or **Panel** backgrounds
- Use **Secondary** (#A295B5) only for truly subordinate information
- Test all text colors for WCAG AA compliance (4.5:1 minimum for body)

---

## 3. Spacing, Shape & Edges

### Spacing Rhythm

Build predictable, breathing sections with consistent increments:

```css
--spacing-xs: 8px;
--spacing-sm: 12px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

**Usage:**
- Between inline elements: `--spacing-xs` → `--spacing-sm`
- Between rows/items: `--spacing-md` → `--spacing-lg`
- Between sections: `--spacing-xl` → `--spacing-2xl`

### Chamfered Frames

Brand frames and cards use light chamfered corners (10–12px) with:
- **Outer edge**: Purple border (2–3px, `--color-secondary`)
- **Inner bevel**: Soft pink accent (4px inset, `--color-trim`)
- **Shadow**: Subtle purple drop shadow for depth

```css
clip-path: polygon(
  var(--c) 0%,
  calc(100% - var(--c)) 0%,
  100% var(--c),
  100% calc(100% - var(--c)),
  calc(100% - var(--c)) 100%,
  var(--c) 100%,
  0% calc(100% - var(--c)),
  0% var(--c)
);
```

### Trapezoid Buttons

Buttons carry a subtle diagonal snip (8px clip on top-left/bottom-right):

```css
clip-path: polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px);
```

**Never** make trapezoids aggressive or heavy-handed—keep them light and playful.

### Rounded Corners (Non-Chamfered)

When chamfers aren't used, employ gently rounded corners (6–8px `border-radius`).

---

## 4. Grid & Breakpoints

### Breakpoints

- **Mobile**: ≤ 767px (one column, stacked content)
- **Tablet**: 768px–1199px (two columns where helpful)
- **Desktop**: ≥ 1200px (three columns for listings, wider breathing room)

### Container Width

- **Max width**: 72rem (1152px)
- **Gutters**: 16px on mobile, 24px on tablet+
- **Full bleed**: Images and cards can expand to container edges

### Listing Grid

| Breakpoint | Columns | Gap |
|-----------|---------|-----|
| Mobile | 1 | 16px |
| Tablet | 2 | 16px |
| Desktop | 3 | 16px |

---

## 5. Motion & Performance

### Hover & Focus

- **Color/opacity changes**: 150ms, ease timing
- **Movement (lift/translate)**: 120–150ms, ease timing
- **Combined transitions**: 150–200ms maximum

### Lift & Press

- **Hover lift**: 2px translation up
- **Active press**: Return to rest (no lift)
- **Never**: Jarring, abrupt, or long animations

### Reduced Motion

**Always** respect `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Disable all non-essential animations and make interactions instant.

---

## 6. Accessibility (Always On)

### Structure

- Exactly **one** top-level `<h1>` per page
- Heading hierarchy: H1 → H2 → H3 (no skipping)
- Semantic HTML (`<button>`, `<a>`, `<nav>`, `<main>`, etc.)

### Focus & Keyboard

- **Skip link**: Appears on focus (top-left corner, `z-index: 9999`)
- **Focus ring**: 2px solid pink outline, 2px offset
- **Tabbing order**: Matches visual order (no absolute positioning reordering)

### Color & Meaning

- Never rely on color alone—use text labels, borders, and shape
- Trapezoid shape + text label together convey button meaning
- Icons always accompanied by text

### Testing Checklist

- [ ] All interactive elements keyboard accessible (Tab order)
- [ ] All form inputs have visible labels
- [ ] All links have descriptive text (no "click here")
- [ ] Focus visible at all times
- [ ] Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text
- [ ] Page works with `prefers-reduced-motion`

---

## 7. Components

### Buttons (Trapezoid Family)

**Default CTA:**
- Background: `--color-primary` (#654F84)
- Border: 2px `--color-secondary` (#A295B5)
- Text: `--color-trim` (#E8C3D6)
- Shape: Trapezoid (8px clip)

**Hover:**
- Background: `--color-trim` (#E8C3D6)
- Border: 2px `--color-emphasis` (#CC6AA7)
- Text: `--color-primary` (#654F84)
- Lift: 2px up

**Variants:**
- `.btn-primary`: Deep purple background (default)
- `.btn-secondary`: Light background, dark border
- `.btn-outline`: Transparent, dark border

### Cards & Panels

- Background: `--color-panel` (#F9F4FA)
- Border: 1.5px rgba(purple, 0.16)
- Padding: 16px
- Corner style: Rounded (8px) or chamfered (12px)
- Shadow: `0 2px 8px rgba(purple, 0.08)`

**On hover:**
- Lift: 2px up
- Shadow: `0 4px 16px rgba(purple, 0.12)`

### Image Frames

- Chamfered corners (10px)
- Purple outer edge (2px)
- Pink inner bevel (3px inset)
- Soft drop shadow
- Sizes: Small/Medium/Large for 16:9 and 1:1 aspect ratios

### Share & Social

- Compact pill-shaped buttons (36px height)
- Rounded corners (6px)
- Primary text on primary background
- Hover inverts to trim background

---

## 8. Page Patterns

### Homepage

1. **Hero**: Logo + welcome headline, simple and breathing
2. **Intro**: One short paragraph, centered, max 60 characters
3. **Card Grid**: 1 column (mobile), 2 (tablet), 3 (desktop), 16px gap
4. **Footer**: Social links, legal text, light border on top

### Review Entry

**Header:**
- Left column: Title, byline, date, pull-quote
- Right column: Cover image (square, centered)
- Desktop: Side-by-side grid. Mobile: Stack image first

**Body:**
- Max width: 70 characters
- Pull-quotes: Italic, left-bordered
- Tracklist: In cream-pink glassy card, chamfered
- Streaming buttons: Trapezoid shape, emphasis pink

### Podcast Entry

**Header:**
- Title + date as one unit
- Video player: 16:9 ratio, rounded corners

**About Card:**
- Blush ivory background, left-bordered
- Slightly indented from left edge

**Links:**
- Single flow row of pills
- No floating or absolute positioning

### Contact Form

- Centered card, max width 70 characters
- Labels in bold primary color, asterisks in emphasis pink
- Inputs with soft border, pink glow on focus
- Submit button uses trapezoid style

---

## 9. States & Interactions

### Focus

- Outline: 2px solid `--color-trim`
- Offset: 2px
- Visible on all interactive elements

### Hover

- Subtle color shift or 1–2px lift
- Transition: 150ms ease
- Never hide content or create jarring effects

### Active/Pressed

- Visual feedback with no lift
- Clearly feels "engaged"

### Disabled

- Reduced opacity (0.5)
- Color stays same (no desaturation)
- Pointer: `not-allowed`

---

## 10. Voice & Editorial Tone

### Headlines

- Confident and concise
- Think magazine stand blurbs
- Sentence case (unless proper noun)

### Body Copy

- Warm, plainly spoken, and informative
- Active voice where possible
- Short paragraphs (max 3–4 sentences)

### Labels & Microcopy

- Straightforward and inviting
- No jargon; if necessary, define inline
- Action-oriented (verbs over nouns)

### Examples

✅ "Read the full review"  
❌ "Click here for details"

✅ "Listen on Spotify"  
❌ "Stream now"

---

## 11. Usage Guidelines

### When to Use Each Color

| Situation | Color | Reason |
|-----------|-------|--------|
| Body text, headlines | Primary | Maximum legibility |
| Metadata, dates, bylines | Secondary | Subordinate but readable |
| Button hover, focus rings | Trim | Clear feedback |
| Strong emphasis (rare) | Emphasis | Draws attention |
| Feature backgrounds | Accent | Editorial accent |

### When to Use Chamfers

- Homepage cards: Yes
- Image frames: Yes
- Buttons: Yes (subtle 8px)
- General panels: Optional (8px border-radius is fine)

### When to Use Trapezoids

- CTA buttons: Always
- Markers/dividers: Sparingly
- General UI: Rarely

### Spacing Examples

- Between list items: `gap: 12px` (`--spacing-sm`)
- Between sections: `margin: 48px 0` (`--spacing-2xl`)
- Card padding: `padding: 16px` (`--spacing-md`)
- Header padding: `padding: 24px` (`--spacing-lg`)

---

## 12. Governance

**Core Rules:**
1. Each color keeps its job; never swap roles
2. Chamfers and trapezoids remain subtle—never heavy-handed
3. Spacing follows the rhythm (8/12/16/24/32/48px)
4. Animations respect `prefers-reduced-motion`
5. All text meets WCAG AA contrast minimums
6. Heading hierarchy is semantic and logical
7. Focus rings are always visible

**Before Deviating:**
- Ask if the change serves the user experience
- Document the exception
- Ensure accessibility isn't compromised
- Update this guide to reflect the change

---

## 13. CSS Architecture

### Custom Properties (Roots)

```css
:root {
  --color-page: #FAF8F5;
  --color-panel: #F9F4FA;
  --color-primary: #654F84;
  --color-secondary: #A295B5;
  --color-trim: #E8C3D6;
  --color-emphasis: #CC6AA7;
  --color-accent: #6E4B8E;
  
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  --font-display: 'Grobe Deutschmeister', 'Bebas Neue', ui-sans-serif, system-ui, sans-serif;
  --font-body: Helvetica, Arial, ui-sans-serif, system-ui, sans-serif;
}
```

### Utility Classes

```css
/* Text colors */
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-emphasis { color: var(--color-emphasis); }

/* Background colors */
.bg-page { background: var(--color-page); }
.bg-panel { background: var(--color-panel); }

/* Spacing */
.mt-lg { margin-top: var(--spacing-lg); }
.gap-md { gap: var(--spacing-md); }
```

### File Organization

- `build.css`: Base Tailwind output (kept as-is)
- `overrides.css`: Brand design system (all custom rules, color tokens, components)

---

## 14. Quick Reference

### Colors at a Glance

```
Page: #FAF8F5    ← Off-white background
Panel: #F9F4FA   ← Blush ivory cards
Primary: #654F84 ← Deep purple text
Secondary: #A295B5 ← Light purple meta
Trim: #E8C3D6    ← Light pink accents
Emphasis: #CC6AA7 ← Dark pink highlights
Accent: #6E4B8E  ← Editorial purple
```

### Spacing Ladder

```
xs: 8px    ← Tiny gaps
sm: 12px   ← Small gaps
md: 16px   ← Standard padding
lg: 24px   ← Medium spacing
xl: 32px   ← Large spacing
2xl: 48px  ← Section spacing
```

### Button States

```
Default:  Purple bg, light-purple border, pink text
Hover:    Light-pink bg, dark-pink border, purple text
Focus:    Pink outline, 2px offset
Active:   Same as default (no lift)
Disabled: Reduced opacity, grayed out
```

---

## 15. Changelog

### Version 1.0 (Initial Release)

- Design system launched with full visual contract implementation
- All color roles defined and documented
- Typography scale and reading measures established
- Spacing rhythm (8/12/16/24/32/48) codified
- Component patterns: Buttons, cards, frames, forms
- Accessibility checklist included
- Responsive breakpoints: Mobile, Tablet, Desktop

---

## Questions & Feedback

For questions about this design system, check the original **CONTEXT.md** or review the **overrides.css** file for implementation details. All brand decisions should be traceable back to this guide.


