# CSS Class & Token Map

## Purpose Summary

**`tokens.css`**: Defines CSS custom properties (design tokens) for colors, typography, spacing, shadows, and layout values. These tokens provide a centralized design system that can be referenced throughout the codebase.

**`globals.css`**: Contains base styles, utility classes, and component-specific styles. It imports Tailwind CSS and tokens.css, sets up global typography and layout defaults, and provides reusable classes for common UI patterns.

---

## Table 1 – Design Tokens (from tokens.css)

| token | category | description |
|-------|----------|-------------|
| **Brand Colors** |
| `--magazine-white` | color | Pure white (#FFFFFF) |
| `--brand-pink-100` | color | Light pink (#FFD3E8) |
| `--brand-pink-300` | color | Medium pink (#FFB0DA) |
| `--brand-pink-500` | color | Primary pink (#FF8CCB) |
| `--brand-purple-600` | color | Medium purple (#7A3A8C) |
| `--brand-purple-800` | color | Deep purple (#6D2B79) |
| `--brand-pink` | color | Alias for `--brand-pink-500` |
| `--brand-purple` | color | Alias for `--brand-purple-800` |
| `--brand-dark-pink` | color | Alias for `--brand-pink-500` |
| `--brand-gradient` | color | Gradient from pink-500 to purple-800 |
| **Surface & Backgrounds** |
| `--surface` | color | Default surface color (white) |
| `--bg` | color | Background color (white) |
| `--bg-elevated` | color | Elevated background (white) |
| `--offwhite` | color | Off-white color (white) |
| `--surface-frost-pink-70` | color | 70% pink-100 with transparency |
| `--surface-frost-pink-85` | color | 85% pink-100 with transparency |
| `--surface-frost-purple-30` | color | 30% purple-600 with transparency |
| `--surface-frost-white-90` | color | 90% white with transparency |
| `--gradient-card-review` | color | Gradient for review cards |
| `--gradient-card-podcast` | color | Gradient for podcast cards |
| `--gradient-hero-title` | color | Gradient for hero titles |
| **Text Colors** |
| `--text` | color | Default text color (deep purple) |
| `--text-strong` | color | Strong/emphasized text (deep purple) |
| `--text-muted` | color | Muted/secondary text (purple-600) |
| `--text-deep-purple` | color | Deep purple text color |
| **Borders** |
| `--border` | color | Default border color |
| `--border-accent` | color | Accent border (pink-300 at 45% opacity) |
| `--border-accent-strong` | color | Strong accent border (pink-300 at 68% opacity) |
| `--border-strong-width` | layout | Strong border width (1.5px) |
| `--border-strong-color` | color | Strong border color |
| `--pink-outline` | color | Pink outline color (#ffc3d9) |
| `--purple-outline` | color | Purple outline color (#5a2a82) |
| `--card-border-review` | color | Review card border color |
| `--card-border-podcast` | color | Podcast card border color |
| **Shadows** |
| `--shadow-soft` | shadow | Soft shadow (purple-tinted) |
| `--shadow-card` | shadow | Card shadow (purple-tinted) |
| `--card-shadow-rest` | shadow | Card shadow at rest state |
| `--card-shadow-hover` | shadow | Card shadow on hover |
| `--card-shadow-focus` | shadow | Card shadow on focus |
| **Typography** |
| `--font-display` | typography | Display font (GrobeDeutschmeister + fallbacks) |
| `--font-body` | typography | Body font (system fonts) |
| `--text-h1` | typography | H1 font size (clamp: 2rem to 2.75rem) |
| `--text-h2` | typography | H2 font size (clamp: 1.5rem to 2rem) |
| `--text-h3` | typography | H3 font size (clamp: 1.25rem to 1.5rem) |
| `--text-body-lg` | typography | Large body text (1.125rem) |
| `--text-body` | typography | Body text size (1rem) |
| `--text-caption` | typography | Caption text size (0.875rem) |
| `--lh-tight` | typography | Tight line height (1.2) |
| `--lh-snug` | typography | Snug line height (1.3) |
| `--lh-normal` | typography | Normal line height (1.5) |
| `--measure` | typography | Max line length (70ch) |
| **Spacing** |
| `--space-1` | spacing | 4px spacing |
| `--space-2` | spacing | 8px spacing |
| `--space-3` | spacing | 12px spacing |
| `--space-4` | spacing | 16px spacing |
| `--space-6` | spacing | 24px spacing |
| `--space-8` | spacing | 32px spacing |
| `--space-10` | spacing | 40px spacing |
| `--space-12` | spacing | 48px spacing |
| `--space-16` | spacing | 64px spacing |
| **Shape & Effects** |
| `--radius-sm` | radius | Small border radius (10px) |
| `--radius-md` | radius | Medium border radius (16px) |
| `--radius-lg` | radius | Large border radius (20px) |
| `--ch` | layout | Chamfer size (14px) |
| `--nav-stripe` | layout | Width of angled nav divider (12px) |
| `--slant-base` | layout | Default divider angle (-18deg) |
| `--slant-1` | layout | Slant angle variant 1 (-14deg) |
| `--slant-2` | layout | Slant angle variant 2 (-18deg) |
| `--slant-3` | layout | Slant angle variant 3 (-22deg) |
| `--divider-thickness` | layout | Hairline thickness for slanted rules (8px) |
| `--paper-grain-opacity` | misc | Paper grain texture opacity (0.12) |
| **Layout** |
| `--gutter-horizontal` | layout | Horizontal gutter (clamp: 1rem to 2.5rem) |
| `--home-grid-gap` | layout | Home card grid gap (24px) |
| `--home-card-padding` | layout | Home card padding (24px) |
| `--home-card-gap` | layout | Home card internal gap (16px) |
| `--newsletter-surface` | color | Newsletter section background |
| `--newsletter-border` | color | Newsletter section border |
| `--hero-min-height` | layout | Hero section minimum height (clamp: 184px to 240px) |
| `--asset-root` | misc | Asset root path (/) |

---

## Table 2 – Global Classes (from globals.css)

| class | category | what it does | rough Tailwind equivalent |
|-------|----------|--------------|---------------------------|
| **Base Styles** |
| `html, body` | base | Sets global background, text color, font, and disables hyphens | `bg-white text-purple-900 font-sans` |
| `*` | base | Universal box-sizing reset | `box-border` (default in Tailwind) |
| `a` | base | Removes default link styling | `no-underline text-inherit` |
| `a:focus-visible, button:focus-visible, etc.` | base | Focus outline styles for accessibility | `focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2` |
| `h1, h2, h3` | base | Sets display font and removes margins | `font-display m-0` |
| `h1` | base | H1 typography with tight line height and strong color | `text-h1 leading-tight text-strong` |
| `h2` | base | H2 typography with tight line height and strong color | `text-h2 leading-tight text-strong` |
| `h3` | base | H3 typography with snug line height and strong color | `text-h3 leading-snug text-strong` |
| `p` | base | Body text styling with normal line height | `text-base leading-normal m-0` |
| **Layout Utilities** |
| `.container-page` | layout | Centered container with max-width 1200px and responsive padding | `max-w-[1200px] mx-auto px-4 lg:px-0` |
| `.stack-lg` | utility | Adds large vertical spacing between direct children | `space-y-8` |
| `.stack-md` | utility | Adds medium vertical spacing between direct children | `space-y-6` |
| `.stack-sm` | utility | Adds small vertical spacing between direct children | `space-y-4` |
| `.prose-measure` | utility | Constrains width to readable measure (70ch) | `max-w-[70ch]` |
| **Typography Utilities** |
| `.kicker` | utility | Small caps text with letter spacing for kicker/eyebrow text | `text-sm font-medium uppercase tracking-wider` + custom color |
| `.section-title` | component | Section title with decorative underline using clip-path | TBD (custom chamfered underline) |
| `.caption` | utility | Small caption text with muted color and top margin | `text-sm text-muted mt-2` |
| `.line-clamp-2` | utility | Clamps text to 2 lines with ellipsis | `line-clamp-2` |
| `.line-clamp-3` | utility | Clamps text to 3 lines with ellipsis | `line-clamp-3` |
| **Focus & Accessibility** |
| `.focus-chamfer` | utility | Chamfered focus ring with custom clip-path border | TBD (custom chamfered focus) |
| `.sr-only` | utility | Screen reader only content (visually hidden) | `sr-only` |
| **Visual Effects** |
| `.paper-grain` | utility | Adds paper grain texture overlay using SVG background | TBD (custom texture overlay) |
| **Aspect Ratios** |
| `.ratio-4x5` | utility | 4:5 aspect ratio container | `aspect-[4/5] relative` |
| `.ratio-1x1` | utility | 1:1 aspect ratio container | `aspect-square relative` |
| **Chamfered Shapes** |
| `.chamfered` | utility | Applies chamfered corners using clip-path polygon | TBD (custom clip-path) |
| `.surface-chamfer` | utility | Sets chamfer size variable | TBD |
| `.chamfered-border` | utility | Chamfered border with configurable width and color | TBD |
| `.ch-14` | utility | Sets chamfer size to default (14px) | TBD |
| `.button-trapezoid` | component | Removes border radius for trapezoid buttons | `rounded-none` |
| **Navigation** |
| `.nav-list` | component | Flex navigation list with uppercase text and letter spacing | `flex items-center gap-6 uppercase tracking-wider font-display` |
| `.nav-link` | component | Navigation link with hover states and decorative angled divider | TBD (custom angled divider) |
| `.nav-link--footer` | component | Footer variant of nav link | Similar to `.nav-link` |
| `.nav-list--wrap` | utility | Allows nav list to wrap with row gap | `flex-wrap gap-y-3` |
| `.site-header__nav .nav-list` | component | Header-specific nav list with centered alignment | `justify-center` + custom dividers |
| **Header Components** |
| `.site-header` | component | Site header container with background and padding | `relative w-full max-w-[1200px] mx-auto px-4 py-3` + custom bg |
| `.site-header__layout` | layout | Flex layout for header content | `flex items-center justify-between gap-4` |
| `.site-header__brand` | component | Brand/logo container with chamfered background | TBD (custom chamfered bg) |
| `.site-header__nav` | component | Desktop navigation panel with chamfered shape | TBD (custom chamfered shape) |
| `.site-header__mobile` | component | Mobile menu trigger container | `flex items-center ml-auto relative` |
| `.site-header__mobile-panel` | component | Mobile menu dropdown panel | `absolute top-full right-0 w-[min(320px,90vw)] bg-surface border p-4 flex flex-col gap-3 z-20` |
| **Home Page Components** |
| `.home-hero-section` | component | Hero section (hidden on mobile) | `hidden md:block mt-8 mb-0` |
| `.home-hero-shell` | component | Hero container with flex layout and chamfered styling | `flex flex-col items-center gap-3 p-6 min-h-[clamp(184px,25vh,240px)] bg-surface shadow-soft` |
| `.home-feed-section` | component | Home feed section with padding | `py-4 pb-16` |
| `.home-section-heading` | component | Section heading container | `flex flex-col gap-2 mb-4` |
| `.home-card-grid` | component | Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` |
| `.home-card` | component | Card container with chamfered corners, padding, and shadow | TBD (custom chamfered clip-path + `p-6 flex flex-col gap-4 bg-surface shadow-soft border-2`) |
| `.home-card--review` | component | Review card variant with pink border | `.home-card` + `border-[color]` |
| `.home-card--podcast` | component | Podcast card variant with purple border | `.home-card` + `border-[color]` |
| `.home-card-head` | component | Card header section | `flex flex-col gap-2` |
| `.home-card-title` | component | Card title typography | `font-display text-[clamp(1.35rem,1vw+1rem,1.65rem)] leading-snug text-purple-800` |
| `.home-card-meta` | component | Card metadata text | `text-sm tracking-wider uppercase text-muted` |
| `.home-card-media` | component | Card media container with chamfered corners | TBD (custom chamfered clip-path) |
| `.home-card-media-overlay` | component | Overlay for card media | `absolute inset-0 flex flex-col items-center justify-center gap-3 z-2 pointer-events-none` |
| `.home-card-copy` | component | Card text content area | `flex-1 flex flex-col` |
| `.card-actions` | component | Card action buttons container | `mt-auto relative z-3` |
| **Review Components** |
| `.review-header` | component | Review page header | `mb-0` |
| `.review-image` | component | Review image container | `block overflow-hidden bg-surface` |
| `.review-image-small` | utility | Small review image max-width | `max-w-[320px]` |
| `.review-image-medium` | utility | Medium review image max-width | `max-w-[448px]` |
| `.review-image-large` | utility | Large review image max-width | `max-w-[672px]` |
| `.review-image-left` | utility | Float image left with margins | `float-left mr-4 mb-4 mt-0` |
| `.review-image-right` | utility | Float image right with margins | `float-right ml-4 mb-4 mt-0` |
| `.review-image-center` | utility | Center image with margins | `block mx-auto my-6 clear-both` |
| `.review-strip-artwork` | component | Review strip artwork container | `min-w-[200px] md:w-auto` |
| **Podcast Components** |
| `.podcast-header` | component | Podcast page header | `mb-0` |
| `.tracklist-panel` | component | Tracklist panel with list styling | `pl-4` (for ol) |
| **Editorial Typography** |
| `article, .prose-measure` | base | Base prose styling | `text-base leading-normal text-default` |
| `article h1, .prose-measure h1` | base | Prose H1 with spacing | `text-h1 leading-tight mt-8 mb-4` |
| `article h2, .prose-measure h2` | base | Prose H2 with spacing | `text-h2 leading-tight mt-6 mb-3` |
| `article h3, .prose-measure h3` | base | Prose H3 with spacing | `text-h3 leading-snug mt-6 mb-3` |
| `article p, .prose-measure p` | base | Prose paragraph spacing | `mb-4` |
| `article ul, article ol` | base | Prose list spacing | `my-4 pl-6` |
| `blockquote` | base | Blockquote styling with left border | `border-l-[3px] border-accent-strong pl-4 my-6 not-italic text-default` |
| **Surface & Gradient Utilities** |
| `.surface-frost-pink-70` | utility | Frosted pink background (70%) | `bg-[color-mix(...)]` |
| `.surface-frost-pink-85` | utility | Frosted pink background (85%) | `bg-[color-mix(...)]` |
| `.surface-frost-purple-30` | utility | Frosted purple background (30%) | `bg-[color-mix(...)]` |
| `.surface-frost-white-90` | utility | Frosted white background (90%) | `bg-[color-mix(...)]` |
| `.gradient-card-review` | utility | Review card gradient background | `bg-[linear-gradient(...)]` |
| `.gradient-card-podcast` | utility | Podcast card gradient background | `bg-[linear-gradient(...)]` |
| `.gradient-hero-title` | utility | Hero title gradient background | `bg-[linear-gradient(...)]` |
| **Streaming & Share Components** |
| `.streaming-buttons-container` | component | Streaming buttons flex container | `flex-wrap-nowrap` |
| `.streaming-button.button-trapezoid` | component | Streaming button styling | `bg-purple-800 text-pink-500 border-none px-4 py-3 min-w-[44px] inline-flex items-center justify-center` |
| `.share-copy-button .button-trapezoid` | component | Share copy button styling | `bg-pink-500 text-purple-800 border-pink-100` |
| **Newsletter** |
| `.newsletter-section` | component | Newsletter section spacing | `mt-16` |
| `.newsletter-shell` | component | Newsletter container with background and border | `grid gap-4 bg-newsletter-surface border border-newsletter-border p-6 shadow-soft` |
| `.newsletter-form` | component | Newsletter form layout | `flex items-center` |
| **Footer** |
| `.site-footer` | component | Footer container | `mt-12` |
| `.site-footer__bar` | component | Footer bar background | `bg-pink-500 w-full py-6` |
| `.site-footer__inner` | component | Footer inner layout | `flex items-center gap-6 flex-wrap` |
| `.site-footer__social` | component | Footer social links container | `flex items-center gap-4` |
| `.site-footer__social-link` | component | Footer social link styling | `inline-flex items-center justify-center text-purple-800 transition-opacity` |
| `.site-footer__meta` | component | Footer metadata text | `py-4 text-[color-mix(...)]` |
| **Special Components** |
| `.special-h1-wrapper` | component | Special H1 container with min-height | `min-h-[clamp(120px,15vh,180px)] relative` |
| `.special-h1-bg-text` | component | Background text for special H1 | TBD (custom styling) |
| `.special-h1-foreground` | component | Foreground text for special H1 | `font-display text-h1 leading-tight text-deep-purple text-center` |
| `.mission-columns-wrapper` | component | Mission page columns container | `relative` |
| `.mission-divider` | component | Slanted divider for mission page | `w-2 min-w-2 bg-[color-mix(...)] rotate-[-18deg] origin-center pointer-events-none self-stretch hidden md:block` |
| `.entry-column` | component | Entry column with side borders | `border-l-2 border-r-2 border-solid` |
| `.entry-column--review` | component | Review entry column border colors | `border-l-pink-100 border-r-pink-100` |
| `.entry-column--podcast` | component | Podcast entry column border colors | `border-l-purple-600 border-r-purple-600` |
| `.entry-header` | component | Entry header layout (column on mobile, row on desktop) | `flex flex-col gap-6 md:flex-row md:items-start md:gap-8` |
| `.entry-header-left` | component | Entry header left section | `flex-1 flex flex-col gap-4` |
| `.entry-header-right` | component | Entry header right section | `flex-shrink-0` |
| `.electric-border` | component | Animated chamfered border effect | TBD (custom clip-path + animation) |
| `.electric-border--review` | component | Review variant electric border | `.electric-border` + pink color |
| `.electric-border--podcast` | component | Podcast variant electric border | `.electric-border` + purple color |
| `.portable-text-content::after` | utility | Clearfix for portable text content | `content-[''] table clear-both` |

