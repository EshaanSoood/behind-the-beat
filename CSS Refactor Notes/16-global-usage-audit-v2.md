# Global CSS class usage audit (v2)

## Utilities

| class | description (short) | used? (yes/no) | where used (paths) | tailwind equivalent / notes |
| ------------- | ---------------------------- | -------------- | --------------------------------------- | --------------------------- |
| container-page | Page container with max-width and padding | yes | components/Footer.tsx, components/Section.tsx | Custom - uses CSS variables for spacing |
| prose-measure | Max-width constraint for prose content | yes | components/EntryColumn.tsx | Custom - uses `--measure` token |
| focus-chamfer | Focus styles with chamfered outline | yes | app/(home)/components/HomeCard.tsx, components/ShareChips.tsx, components/ButtonTrapezoid.tsx, components/Breadcrumbs.tsx, components/PortableTextRenderer.tsx, app/podcast/[slug]/components/EpisodeNotes.tsx, components/ArtistLinks.tsx, app/contact/components/ContactForm.tsx, components/PodcastStrip.tsx | Custom - complex chamfered focus ring with clip-path |
| caption | Caption text styling | yes | components/Footer.tsx | Custom - uses CSS variables for text size and color |
| paper-grain | Paper texture overlay background | yes | app/(home)/components/HomeCard.tsx, app/(home)/components/NewsletterSignup.tsx, app/(home)/components/HomeHero.tsx, components/ReviewStrip.tsx, components/PodcastStrip.tsx | Custom - uses SVG texture image |
| line-clamp-2 | Two-line text truncation | yes | app/(home)/components/HomeCard.tsx | Tailwind equivalent: `line-clamp-2` (but custom implementation exists) |
| line-clamp-3 | Three-line text truncation | yes | app/(home)/components/HomeCard.tsx, components/ReviewStrip.tsx | Tailwind equivalent: `line-clamp-3` (but custom implementation exists) |
| surface-frost-pink-70 | Frosted pink background color | yes | components/TrapezoidCard.tsx, app/reviews/[slug]/components/TracklistBox.tsx | Custom - uses CSS variable `--surface-frost-pink-70` |
| surface-chamfer | Chamfered corners via clip-path | yes | app/(home)/components/HomeCard.tsx, components/TrapezoidCard.tsx, app/reviews/[slug]/components/TracklistBox.tsx, components/PortableTextRenderer.tsx | Custom - complex clip-path polygon for chamfered corners |
| button-trapezoid | Button with trapezoid styling | yes | components/ButtonTrapezoid.tsx, app/reviews/[slug]/components/ReviewHeader.tsx, components/SubscribeModal.tsx, components/TrapezoidCard.tsx, components/SkipLink.tsx, app/reviews/[slug]/components/TracklistBox.tsx, components/PortableTextRenderer.tsx, components/ArtistLinks.tsx, app/contact/components/ContactForm.tsx, components/PodcastStrip.tsx, app/podcast/[slug]/components/EpisodePlayer.tsx, app/reviews/loading.tsx, app/podcast/loading.tsx, components/Tag.tsx, components/EmptyState.tsx | Custom - removes border-radius for trapezoid shape |

## Components

| class | description (short) | used? (yes/no) | where used (paths) | keep? (yes/no/maybe) | notes (why) |
| ------------- | ---------------------------- | -------------- | --------------------------------------- | --------------------------- | --------------------------- |
| nav-list | Navigation list styling | yes | components/Header.tsx, components/Footer.tsx | yes | Main navigation component |
| nav-link | Navigation link styling | yes | components/Header.tsx, components/Footer.tsx | yes | Navigation links with hover/active states |
| nav-list--wrap | Wrapped navigation list | yes | components/Header.tsx | yes | Mobile navigation variant |
| nav-link--footer | Footer navigation link variant | yes | components/Footer.tsx | yes | Footer-specific nav styling |
| nav-angle-1 | Navigation angle variant 1 | yes | components/Header.tsx, components/Footer.tsx | yes | Angled divider decoration |
| nav-angle-2 | Navigation angle variant 2 | yes | components/Header.tsx, components/Footer.tsx | yes | Angled divider decoration |
| site-header | Site header container | yes | components/Header.tsx | yes | Main header component |
| site-header__nav | Header navigation section | yes | components/Header.tsx | yes | Desktop navigation |
| site-header__nav-divider | Header nav divider stripe | yes | components/Header.tsx | yes | Visual divider element |
| site-header__mobile-trigger | Mobile menu trigger button | yes | components/Header.tsx | yes | Mobile menu button |
| site-header__brand | Header brand/logo link | yes | components/Header.tsx | yes | Logo container |
| site-header__mobile-panel | Mobile navigation panel | yes | components/Header.tsx | yes | Mobile menu dropdown |
| home-hero-shell | Hero section container | yes | app/(home)/components/HomeHero.tsx | yes | Hero layout wrapper |
| home-hero-badge | Hero badge/icon | yes | app/(home)/components/HomeHero.tsx | yes | Hero badge element |
| home-hero-credit | Hero credit text | yes | app/(home)/components/HomeHero.tsx | yes | Hero attribution |
| home-feed-section | Home feed section wrapper | yes | app/page.tsx | yes | Main feed section |
| home-section-heading | Section heading wrapper | yes | app/(home)/components/HomeTiles.tsx | yes | Section header layout |
| home-card-grid | Card grid layout | yes | app/(home)/components/CardGrid.tsx | yes | Grid container for cards |
| home-card | Home card base class | yes | app/(home)/components/HomeCard.tsx, app/(home)/components/CardGrid.tsx, app/(home)/components/HomeTiles.tsx, components/PodcastStrip.tsx | yes | Main card component |
| home-card--review | Review card variant | yes | app/(home)/components/HomeCard.tsx | yes | Review card styling |
| home-card--podcast | Podcast card variant | yes | app/(home)/components/HomeCard.tsx | yes | Podcast card styling |
| home-card-media | Card media container | yes | app/(home)/components/HomeCard.tsx | yes | Image/video container |
| home-card-pullquote-container | Pullquote container | yes | app/(home)/components/HomeCard.tsx | yes | Pullquote wrapper |
| home-card-media-overlay | Media overlay for hover/focus | yes | app/(home)/components/HomeCard.tsx | yes | Overlay with pullquote |
| home-card-pullquote | Pullquote text element | yes | app/(home)/components/HomeCard.tsx | yes | Pullquote text styling |
| card-actions | Card action buttons container | yes | app/(home)/components/HomeCard.tsx | yes | CTA button wrapper |
| review-strip-button | Review strip button styling | yes | components/ReviewStrip.tsx | yes | Review strip button variant |
| review-header | Review header container | yes | app/reviews/[slug]/page.tsx, app/reviews/[slug]/components/ReviewHeader.tsx | yes | Review page header |
| podcast-header | Podcast header container | yes | app/podcast/[slug]/page.tsx | yes | Podcast page header |
| tracklist-panel | Tracklist panel container | yes | app/reviews/[slug]/components/TracklistBox.tsx | yes | Tracklist aside panel |
| streaming-buttons-container | Streaming buttons wrapper | yes | components/StreamingButtons.tsx | yes | Streaming buttons layout |
| streaming-button | Streaming button styling | yes | components/StreamingButtons.tsx | yes | Individual streaming button |
| newsletter-shell | Newsletter signup container | yes | app/(home)/components/NewsletterSignup.tsx | yes | Newsletter section wrapper |
| site-footer__nav | Footer navigation | yes | components/Footer.tsx | yes | Footer nav section |
| site-footer__meta | Footer metadata section | yes | components/Footer.tsx | yes | Footer copyright/metadata |
| special-h1-wrapper | Special H1 wrapper container | yes | components/SpecialH1.tsx | yes | Special H1 layout wrapper |
| special-h1-bg-text | Special H1 background text | yes | components/SpecialH1.tsx | yes | Background decorative text |
| special-h1-background | Special H1 background container | yes | components/SpecialH1.tsx | yes | Background layer |
| special-h1-foreground | Special H1 foreground text | yes | components/SpecialH1.tsx | yes | Foreground text layer |
| mission-divider | Mission page divider | yes | app/mission/components/MissionProse.tsx | yes | Slanted divider element |
| entry-column | Entry column container | yes | components/EntryColumn.tsx | yes | Review/podcast entry layout |
| entry-column--review | Review entry variant | yes | components/EntryColumn.tsx | yes | Review column styling |
| entry-column--podcast | Podcast entry variant | yes | components/EntryColumn.tsx | yes | Podcast column styling |
| entry-header | Entry header container | yes | app/reviews/[slug]/components/ReviewHeader.tsx, app/podcast/[slug]/components/EpisodeHeader.tsx | yes | Entry header layout |
| entry-header-left | Entry header left section | yes | app/reviews/[slug]/components/ReviewHeader.tsx, app/podcast/[slug]/components/EpisodeHeader.tsx | yes | Left column layout |
| entry-header-right | Entry header right section | yes | app/reviews/[slug]/components/ReviewHeader.tsx, app/podcast/[slug]/components/EpisodeHeader.tsx | yes | Right column layout |
| electric-border | Electric border animation | yes | components/ElectricBorder.tsx | yes | Animated border component |
| electric-border--review | Review variant electric border | yes | components/ElectricBorder.tsx | yes | Review color variant |
| electric-border--podcast | Podcast variant electric border | yes | components/ElectricBorder.tsx | yes | Podcast color variant |
| review-image | Review image container | yes | components/PortableTextRenderer.tsx | yes | Review body image wrapper |
| review-image-small | Small review image size | yes | components/PortableTextRenderer.tsx | yes | Small image variant |
| review-image-medium | Medium review image size | yes | components/PortableTextRenderer.tsx | yes | Medium image variant |
| review-image-large | Large review image size | yes | components/PortableTextRenderer.tsx | yes | Large image variant |
| review-image-featured | Featured review image | yes | components/PortableTextRenderer.tsx | yes | Full-width featured image |
| review-image-left | Left-aligned review image | yes | components/PortableTextRenderer.tsx | yes | Float left variant |
| review-image-right | Right-aligned review image | yes | components/PortableTextRenderer.tsx | yes | Float right variant |
| review-image-center | Center-aligned review image | yes | components/PortableTextRenderer.tsx | yes | Centered image variant |
| portable-text-content | Portable text content wrapper | yes | components/PortableTextRenderer.tsx | yes | Portable text container with float clearing |

