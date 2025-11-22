# Global class usage audit

## Utilities

| class | used? (yes/no) | where it's used (paths) | tailwind-equivalent or notes |
| ------------- | -------------- | ----------------------------------- | ---------------------------- |
| `.container-page` | yes | components/Section.tsx, components/Footer.tsx, scripts/home-feed-acceptance-hardened.mjs, scripts/home-feed-acceptance.mjs, scripts/check-latest-alignment.mjs | Tailwind `container` with custom max-width and padding |
| `.prose-measure` | yes | components/EntryColumn.tsx | Tailwind `max-w-prose` or custom max-width |
| `.kicker` | no | | Typography utility, candidate for deletion |
| `.section-title` | no | | Typography utility with underline, candidate for deletion |
| `.focus-chamfer` | yes | components/ShareChips.tsx, components/ReviewStrip.tsx, components/ButtonTrapezoid.tsx, components/Breadcrumbs.tsx, components/PortableTextRenderer.tsx, app/podcast/[slug]/components/EpisodeNotes.tsx, components/ArtistLinks.tsx, app/(home)/components/HomeCard.tsx, app/contact/components/ContactForm.tsx, components/PodcastStrip.tsx | Complex chamfer focus ring helper |
| `.caption` | yes | components/Footer.tsx | Tailwind text-sm + text-muted equivalent |
| `.paper-grain` | yes | components/ReviewStrip.tsx, app/(home)/components/HomeCard.tsx, app/(home)/components/NewsletterSignup.tsx, components/PodcastStrip.tsx, app/(home)/components/HomeHero.tsx | Complex texture overlay helper |
| `.line-clamp-2` | yes | app/(home)/components/HomeCard.tsx | Tailwind `line-clamp-2` plugin |
| `.line-clamp-3` | yes | app/(home)/components/HomeCard.tsx, components/ReviewStrip.tsx | Tailwind `line-clamp-3` plugin |
| `.surface-frost-pink-70` | yes | components/TrapezoidCard.tsx | Tailwind bg utility equivalent |
| `.surface-frost-pink-85` | no | | Candidate for deletion |
| `.surface-frost-purple-30` | no | | Candidate for deletion |
| `.surface-frost-white-90` | no | | Candidate for deletion |
| `.gradient-card-review` | no | | Candidate for deletion |
| `.gradient-card-podcast` | no | | Candidate for deletion |
| `.gradient-hero-title` | no | | Candidate for deletion |
| `.surface-chamfer` | yes | app/(home)/components/HomeCard.tsx, app/(home)/components/NewsletterSignup.tsx, components/TrapezoidCard.tsx, components/PortableTextRenderer.tsx | Complex chamfer clip-path helper |
| `.chamfered` | no | | Candidate for deletion (only referenced in :where selector) |
| `.chamfered-border` | no | | Candidate for deletion |
| `.ch-14` | no | | Candidate for deletion |
| `.button-trapezoid` | yes | components/ReviewStrip.tsx, components/ButtonTrapezoid.tsx, app/reviews/[slug]/components/ReviewHeader.tsx, components/SubscribeModal.tsx, components/TrapezoidCard.tsx, components/SkipLink.tsx, app/reviews/[slug]/components/TracklistBox.tsx, components/PortableTextRenderer.tsx, components/ArtistLinks.tsx, app/(home)/components/HomeCard.tsx, app/(home)/components/NewsletterSignup.tsx, app/contact/components/ContactForm.tsx, components/PodcastStrip.tsx, app/(home)/components/HomeHero.tsx, app/podcast/[slug]/components/EpisodePlayer.tsx, app/reviews/loading.tsx, app/podcast/loading.tsx, components/Tag.tsx, components/EmptyState.tsx | Button styling utility |
| `.ratio-4x5` | no | | Tailwind `aspect-[4/5]` equivalent |
| `.ratio-1x1` | yes | app/(home)/components/HomeCard.tsx | Tailwind `aspect-square` equivalent |
| `.sr-only` | yes | components/Header.tsx | Tailwind `sr-only` utility |

## Components

| class | used? (yes/no) | where it's used (paths) | notes |
| ---------------- | -------------- | --------------------------------- | --------------------------- |
| `.nav-list` | yes | components/Header.tsx, components/Footer.tsx | Navigation list component |
| `.nav-link` | yes | components/Header.tsx, components/Footer.tsx | Navigation link component |
| `.nav-list--wrap` | yes | components/Header.tsx | Navigation list modifier |
| `.nav-link--footer` | yes | components/Footer.tsx | Navigation link footer variant |
| `.site-header` | yes | components/Header.tsx | Site header component |
| `.site-header__layout` | yes | components/Header.tsx | Header layout wrapper |
| `.site-header__cluster` | yes | components/Header.tsx | Header cluster wrapper |
| `.site-header__brand` | yes | components/Header.tsx | Header brand/logo link |
| `.site-header__brand-mark` | yes | components/Header.tsx | Header logo image wrapper |
| `.site-header__logo-wordmark` | no | | Candidate for deletion |
| `.site-header__nav` | yes | components/Header.tsx | Header navigation |
| `.site-header__nav-divider` | yes | components/Header.tsx | Header nav divider element |
| `.site-header__mobile` | yes | components/Header.tsx | Mobile menu wrapper |
| `.site-header__mobile-trigger` | yes | components/Header.tsx | Mobile menu button |
| `.site-header__mobile-panel` | yes | components/Header.tsx | Mobile menu panel |
| `.home-hero-section` | yes | app/(home)/components/HomeHero.tsx | Home hero section wrapper |
| `.home-hero-shell` | yes | app/(home)/components/HomeHero.tsx | Home hero container |
| `.home-hero-copy` | yes | app/(home)/components/HomeHero.tsx | Home hero text content |
| `.home-hero-badge` | yes | app/(home)/components/HomeHero.tsx | Home hero badge element |
| `.home-hero-credit` | yes | app/(home)/components/HomeHero.tsx | Home hero credit text |
| `.home-feed-section` | yes | app/page.tsx | Home feed section wrapper |
| `.home-section-heading` | yes | app/(home)/components/HomeTiles.tsx | Home section heading wrapper |
| `.home-card-grid` | yes | app/(home)/components/CardGrid.tsx | Home card grid layout |
| `.home-card` | yes | app/(home)/components/HomeCard.tsx, components/PodcastStrip.tsx | Home card component |
| `.home-card--review` | yes | app/(home)/components/HomeCard.tsx | Home card review variant |
| `.home-card--podcast` | yes | app/(home)/components/HomeCard.tsx | Home card podcast variant |
| `.home-card-head` | yes | app/(home)/components/HomeCard.tsx | Home card header section |
| `.home-card-title-heading` | yes | app/(home)/components/HomeCard.tsx | Home card title heading wrapper |
| `.home-card-title` | yes | app/(home)/components/HomeCard.tsx | Home card title link |
| `.home-card-meta` | yes | app/(home)/components/HomeCard.tsx | Home card metadata |
| `.home-card-meta-primary` | yes | app/(home)/components/HomeCard.tsx | Home card primary metadata |
| `.home-card-meta-secondary` | yes | app/(home)/components/HomeCard.tsx | Home card secondary metadata |
| `.home-card-media` | yes | app/(home)/components/HomeCard.tsx | Home card media container |
| `.home-card-media-image` | yes | app/(home)/components/HomeCard.tsx | Home card image element |
| `.home-card-youtube-embed` | yes | app/(home)/components/HomeCard.tsx | Home card YouTube embed wrapper |
| `.home-card-youtube-iframe` | yes | app/(home)/components/HomeCard.tsx | Home card YouTube iframe |
| `.home-card-pullquote-spacer` | yes | app/(home)/components/HomeCard.tsx | Home card pullquote spacer |
| `.home-card-pullquote-container` | yes | app/(home)/components/HomeCard.tsx | Home card pullquote container |
| `.home-card-pullquote-text` | yes | app/(home)/components/HomeCard.tsx | Home card pullquote text |
| `.home-card-media-overlay` | yes | app/(home)/components/HomeCard.tsx | Home card media overlay |
| `.home-card-pullquote` | yes | app/(home)/components/HomeCard.tsx | Home card pullquote element |
| `.home-card-copy` | yes | app/(home)/components/HomeCard.tsx | Home card text content |
| `.home-card-text` | yes | app/(home)/components/HomeCard.tsx | Home card summary text |
| `.card-actions` | yes | app/(home)/components/HomeCard.tsx | Card actions container |
| `.card-actions--image-button` | no | | Candidate for deletion |
| `.review-strip-button` | yes | components/ReviewStrip.tsx | Review strip button wrapper |
| `.review-strip-artwork` | yes | components/ReviewStrip.tsx | Review strip artwork container |
| `.share-copy-button` | no | | Candidate for deletion |
| `.newsletter-section` | yes | app/(home)/components/NewsletterSignup.tsx | Newsletter section wrapper |
| `.newsletter-shell` | yes | app/(home)/components/NewsletterSignup.tsx | Newsletter container |
| `.newsletter-form` | yes | app/(home)/components/NewsletterSignup.tsx | Newsletter form wrapper |
| `.site-footer` | yes | components/Footer.tsx | Site footer component |
| `.site-footer__bar` | yes | components/Footer.tsx | Footer bar container |
| `.site-footer__inner` | yes | components/Footer.tsx | Footer inner wrapper |
| `.site-footer__social` | yes | components/Footer.tsx | Footer social links container |
| `.site-footer__social-link` | yes | components/Footer.tsx | Footer social link |
| `.site-footer__nav` | yes | components/Footer.tsx | Footer navigation |
| `.site-footer__meta` | yes | components/Footer.tsx | Footer metadata section |
| `.review-header` | yes | app/reviews/[slug]/page.tsx | Review header component |
| `.podcast-header` | yes | app/podcast/[slug]/page.tsx | Podcast header component |
| `.tracklist-panel` | yes | app/reviews/[slug]/components/TracklistBox.tsx | Tracklist panel component |
| `.streaming-buttons-container` | yes | components/StreamingButtons.tsx | Streaming buttons container |
| `.streaming-button` | yes | components/StreamingButtons.tsx | Streaming button element |
| `.special-h1-wrapper` | yes | components/SpecialH1.tsx | Special H1 wrapper component |
| `.special-h1-bg-text` | yes | components/SpecialH1.tsx | Special H1 background text |
| `.special-h1-background` | yes | components/SpecialH1.tsx | Special H1 background container |
| `.special-h1-foreground` | yes | components/SpecialH1.tsx | Special H1 foreground text |
| `.mission-columns-wrapper` | yes | app/mission/components/MissionProse.tsx | Mission columns wrapper |
| `.mission-divider` | yes | app/mission/components/MissionProse.tsx | Mission divider element |
| `.entry-column` | yes | components/EntryColumn.tsx | Entry column component |
| `.entry-column--review` | yes | components/EntryColumn.tsx | Entry column review variant |
| `.entry-column--podcast` | yes | components/EntryColumn.tsx | Entry column podcast variant |
| `.entry-header` | yes | app/reviews/[slug]/components/ReviewHeader.tsx, app/podcast/[slug]/components/EpisodeHeader.tsx | Entry header component |
| `.entry-header-left` | no | | Candidate for deletion (only in CSS, not used in components) |
| `.entry-header-right` | no | | Candidate for deletion (only in CSS, not used in components) |
| `.electric-border` | yes | components/ElectricBorder.tsx | Electric border component |
| `.electric-border--review` | yes | components/ElectricBorder.tsx | Electric border review variant |
| `.electric-border--podcast` | yes | components/ElectricBorder.tsx | Electric border podcast variant |
| `.review-image` | yes | components/PortableTextRenderer.tsx | Review image wrapper |
| `.review-image-small` | yes | components/PortableTextRenderer.tsx | Review image small size |
| `.review-image-medium` | yes | components/PortableTextRenderer.tsx | Review image medium size |
| `.review-image-large` | yes | components/PortableTextRenderer.tsx | Review image large size |
| `.review-image-featured` | yes | components/PortableTextRenderer.tsx | Review image featured size |
| `.review-image-left` | yes | components/PortableTextRenderer.tsx | Review image left alignment |
| `.review-image-right` | yes | components/PortableTextRenderer.tsx | Review image right alignment |
| `.review-image-center` | yes | components/PortableTextRenderer.tsx | Review image center alignment |
| `.portable-text-content` | yes | components/PortableTextRenderer.tsx | Portable text content wrapper |

